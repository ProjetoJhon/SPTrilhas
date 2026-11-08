import React, { useState, useEffect, useMemo } from 'react';
import { Head } from '@inertiajs/react';
import { Trail, Region, Difficulty } from '@/types/trail';
import { TRAILS_DATA, REGIONS_META } from '@/data/trails';
import { Header } from '@/components/sp-trilhas/Header';
import { BottomNav, ActiveTab } from '@/components/sp-trilhas/BottomNav';
import { TrailCard } from '@/components/sp-trilhas/TrailCard';
import { TrailDetailModal } from '@/components/sp-trilhas/TrailDetailModal';
import { InteractiveMap } from '@/components/sp-trilhas/InteractiveMap';
import { OfflineVault } from '@/components/sp-trilhas/OfflineVault';
import { EmergencyKit } from '@/components/sp-trilhas/EmergencyKit';
import { HydrationCalculatorModal } from '@/components/sp-trilhas/HydrationCalculatorModal';
import { 
    Filter, 
    Sparkles, 
    Mountain, 
    Waves, 
    Building2, 
    Compass, 
    SlidersHorizontal,
    Trees,
    Droplets,
    Dog,
    Bike,
    ExternalLink
} from 'lucide-react';

export default function Welcome() {
    // ------------------------------------------------------------------
    // Estados Globais da Aplicação
    // ------------------------------------------------------------------
    const [activeTab, setActiveTab] = useState<ActiveTab>('explore');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRegionFilter, setSelectedRegionFilter] = useState<Region | 'all'>('all');
    const [selectedDifficultyFilter, setSelectedDifficultyFilter] = useState<Difficulty | 'all'>('all');
    const [selectedTagFilter, setSelectedTagFilter] = useState<'all' | 'waterfall' | 'summit' | 'pet' | 'mtb'>('all');
    const [selectedTrail, setSelectedTrail] = useState<Trail | null>(null);
    const [savedTrailIds, setSavedTrailIds] = useState<string[]>([]);
    const [darkMode, setDarkMode] = useState(false);
    const [isOnline, setIsOnline] = useState(true);
    const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

    // ------------------------------------------------------------------
    // Sincronização LocalStorage e Conectividade
    // ------------------------------------------------------------------
    useEffect(() => {
        try {
            const stored = localStorage.getItem('sptrilhas_saved_trails');
            if (stored) {
                setSavedTrailIds(JSON.parse(stored));
            } else {
                setSavedTrailIds(['cantareira-pedra-grande', 'ubatuba-sete-praias', 'paranapiacaba-poco-formoso']);
            }
        } catch (e) {
            console.error('Erro ao ler do localStorage', e);
        }

        setIsOnline(navigator.onLine);
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    const toggleFavorite = (trail: Trail, e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setSavedTrailIds((prev) => {
            const exists = prev.includes(trail.id);
            const next = exists ? prev.filter((id) => id !== trail.id) : [...prev, trail.id];
            try {
                localStorage.setItem('sptrilhas_saved_trails', JSON.stringify(next));
            } catch (err) {
                console.error(err);
            }
            return next;
        });
    };

    const clearAllSaved = () => {
        setSavedTrailIds([]);
        localStorage.removeItem('sptrilhas_saved_trails');
    };

    // ------------------------------------------------------------------
    // Gerador & Download de Arquivo GPX
    // ------------------------------------------------------------------
    const handleDownloadGpx = (trail: Trail) => {
        const gpxData = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="SP Trilhas - Ecoturismo SP & Wikiloc Track" xmlns="http://www.topografix.com/GPX/1/1">
  <metadata>
    <name>${trail.name}</name>
    <desc>${trail.shortDescription}</desc>
    <time>${new Date().toISOString()}</time>
  </metadata>
  <wpt lat="${trail.trailheadCoordinates.lat}" lon="${trail.trailheadCoordinates.lng}">
    <name>Início: ${trail.name}</name>
    <desc>${trail.trailheadCoordinates.address}</desc>
  </wpt>
  <trk>
    <name>${trail.name}</name>
    <trkseg>
      ${trail.elevationProfile
          .map(
              (p, idx) => `
      <trkpt lat="${trail.trailheadCoordinates.lat + idx * 0.002}" lon="${trail.trailheadCoordinates.lng + idx * 0.002}">
        <ele>${p.elevationM}</ele>
        <time>${new Date(Date.now() + idx * 1800000).toISOString()}</time>
      </trkpt>`
          )
          .join('')}
    </trkseg>
  </trk>
</gpx>`;

        const blob = new Blob([gpxData], { type: 'application/gpx+xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${trail.slug}.gpx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    // ------------------------------------------------------------------
    // Filtragem de Trilhas
    // ------------------------------------------------------------------
    const filteredTrails = useMemo(() => {
        return TRAILS_DATA.filter((trail) => {
            const matchesSearch =
                searchQuery === '' ||
                trail.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                trail.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                trail.parkName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                trail.highlights.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesRegion =
                selectedRegionFilter === 'all' || trail.region === selectedRegionFilter;

            const matchesDifficulty =
                selectedDifficultyFilter === 'all' || trail.difficulty === selectedDifficultyFilter;

            const matchesTag =
                selectedTagFilter === 'all' ||
                (selectedTagFilter === 'waterfall' && trail.hasWaterfall) ||
                (selectedTagFilter === 'summit' && trail.hasSummit) ||
                (selectedTagFilter === 'pet' && trail.isPetFriendly) ||
                (selectedTagFilter === 'mtb' && trail.activityType === 'mtb');

            return matchesSearch && matchesRegion && matchesDifficulty && matchesTag;
        });
    }, [searchQuery, selectedRegionFilter, selectedDifficultyFilter, selectedTagFilter]);

    const trailsByRegion = useMemo(() => {
        return {
            capital: filteredTrails.filter((t) => t.region === 'capital'),
            interior: filteredTrails.filter((t) => t.region === 'interior'),
            litoral: filteredTrails.filter((t) => t.region === 'litoral')
        };
    }, [filteredTrails]);

    const savedTrailsList = useMemo(() => {
        return TRAILS_DATA.filter((t) => savedTrailIds.includes(t.id));
    }, [savedTrailIds]);

    return (
        <div className={`min-h-screen ${darkMode ? 'dark bg-[#0e1713] text-[#ecf4ee]' : 'bg-[#f5f7f4] text-[#1b2b23]'}`}>
            <Head title="SP Trilhas - Guia de Trilhas, Ecoturismo e Rotas Wikiloc de São Paulo" />

            {/* Barra de Topo */}
            <Header
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                isOnline={isOnline}
                darkMode={darkMode}
                onToggleDarkMode={() => setDarkMode(!darkMode)}
                onOpenCalculator={() => setIsCalculatorOpen(true)}
            />

            {/* Conteúdo Principal */}
            <main className="mx-auto max-w-5xl px-4 pt-4 pb-28">
                {/* ======================================================== */}
                {/* ABA 1: EXPLORAR (HOME) */}
                {/* ======================================================== */}
                {activeTab === 'explore' && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                        {/* Hero Banner Outdoor */}
                        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#162920] to-[#1e3d30] p-6 text-white shadow-lg border border-emerald-500/20">
                            <div className="relative z-10 max-w-2xl space-y-3">
                                <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300 border border-emerald-500/30">
                                    <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                                    <span>Base Wikiloc & Ecoturismo de São Paulo</span>
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-black leading-tight tracking-tight">
                                    As Melhores Trilhas da Mata Atlântica Paulista
                                </h2>
                                <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
                                    Rotas clássicas e comunitárias georreferenciadas: das cavernas do PETAR e mirantes da Cantareira às cristas da Mantiqueira e às travessias costeiras de Ubatuba e Ilhabela.
                                </p>

                                <div className="pt-2 flex flex-wrap items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsCalculatorOpen(true)}
                                        className="inline-flex items-center gap-1.5 rounded-xl bg-[#e06a26] px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-[#cf5c1b] transition-all active:scale-95"
                                    >
                                        <Droplets className="h-4 w-4" />
                                        <span>Calculadora de Água & Mochila</span>
                                    </button>

                                    <a
                                        href="https://pt.wikiloc.com/trilhas/outdoor/brasil/sao-paulo"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 rounded-xl bg-[#4c8435] px-3.5 py-2 text-xs font-bold text-white shadow-md hover:bg-[#3f6e2c] transition-all border border-emerald-400/30 active:scale-95"
                                    >
                                        <ExternalLink className="h-3.5 w-3.5" />
                                        <span>Explorar no Wikiloc SP</span>
                                    </a>
                                </div>
                            </div>

                            {/* Detalhe de fundo */}
                            <div className="absolute -bottom-8 -right-8 h-48 w-48 rounded-full bg-[#e06a26]/20 blur-3xl" />
                        </div>

                        {/* Filtros Rápidos em Pílulas (Scroll Horizontal Móvel) */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-xs text-[#52645a] dark:text-[#9bb2a4]">
                                <span className="font-bold uppercase tracking-wider flex items-center gap-1">
                                    <SlidersHorizontal className="h-3.5 w-3.5" />
                                    <span>Região</span>
                                </span>
                                <span>{filteredTrails.length} de {TRAILS_DATA.length} trilhas</span>
                            </div>

                            {/* Pílulas de Região */}
                            <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-1">
                                <button
                                    type="button"
                                    onClick={() => setSelectedRegionFilter('all')}
                                    className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all shadow-sm ${
                                        selectedRegionFilter === 'all'
                                            ? 'bg-[#142921] text-white ring-2 ring-[#e06a26] dark:bg-emerald-900'
                                            : 'bg-white text-[#384b40] hover:bg-[#e8ede6] dark:bg-[#1a2b22] dark:text-[#c4d6cb]'
                                    }`}
                                >
                                    <Compass className="h-3.5 w-3.5" />
                                    <span>Todas as Regiões</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setSelectedRegionFilter('capital')}
                                    className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all shadow-sm ${
                                        selectedRegionFilter === 'capital'
                                            ? 'bg-[#142921] text-white ring-2 ring-[#e06a26] dark:bg-emerald-900'
                                            : 'bg-white text-[#384b40] hover:bg-[#e8ede6] dark:bg-[#1a2b22] dark:text-[#c4d6cb]'
                                    }`}
                                >
                                    <Building2 className="h-3.5 w-3.5 text-emerald-600" />
                                    <span>Capital & Grande SP</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setSelectedRegionFilter('interior')}
                                    className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all shadow-sm ${
                                        selectedRegionFilter === 'interior'
                                            ? 'bg-[#142921] text-white ring-2 ring-[#e06a26] dark:bg-emerald-900'
                                            : 'bg-white text-[#384b40] hover:bg-[#e8ede6] dark:bg-[#1a2b22] dark:text-[#c4d6cb]'
                                    }`}
                                >
                                    <Mountain className="h-3.5 w-3.5 text-amber-600" />
                                    <span>Interior & Serras</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setSelectedRegionFilter('litoral')}
                                    className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all shadow-sm ${
                                        selectedRegionFilter === 'litoral'
                                            ? 'bg-[#142921] text-white ring-2 ring-[#e06a26] dark:bg-emerald-900'
                                            : 'bg-white text-[#384b40] hover:bg-[#e8ede6] dark:bg-[#1a2b22] dark:text-[#c4d6cb]'
                                    }`}
                                >
                                    <Waves className="h-3.5 w-3.5 text-teal-600" />
                                    <span>Litoral Paulista</span>
                                </button>
                            </div>

                            {/* Filtros de Características / Tags */}
                            <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
                                <span className="text-[11px] font-semibold text-[#66776e] dark:text-[#8ea496] mr-1">
                                    Atrações:
                                </span>

                                <button
                                    type="button"
                                    onClick={() => setSelectedTagFilter(selectedTagFilter === 'waterfall' ? 'all' : 'waterfall')}
                                    className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-bold transition-all ${
                                        selectedTagFilter === 'waterfall'
                                            ? 'bg-sky-600 text-white shadow'
                                            : 'bg-white text-[#384b40] border border-[#d6ddd4] hover:bg-[#e8ede6] dark:bg-[#1a2b22] dark:text-[#c4d6cb] dark:border-[#273830]'
                                    }`}
                                >
                                    <Waves className="h-3 w-3" />
                                    <span>Cachoeiras</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setSelectedTagFilter(selectedTagFilter === 'summit' ? 'all' : 'summit')}
                                    className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-bold transition-all ${
                                        selectedTagFilter === 'summit'
                                            ? 'bg-amber-600 text-white shadow'
                                            : 'bg-white text-[#384b40] border border-[#d6ddd4] hover:bg-[#e8ede6] dark:bg-[#1a2b22] dark:text-[#c4d6cb] dark:border-[#273830]'
                                    }`}
                                >
                                    <Mountain className="h-3 w-3" />
                                    <span>Mirantes & Cumes</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setSelectedTagFilter(selectedTagFilter === 'pet' ? 'all' : 'pet')}
                                    className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-bold transition-all ${
                                        selectedTagFilter === 'pet'
                                            ? 'bg-emerald-700 text-white shadow'
                                            : 'bg-white text-[#384b40] border border-[#d6ddd4] hover:bg-[#e8ede6] dark:bg-[#1a2b22] dark:text-[#c4d6cb] dark:border-[#273830]'
                                    }`}
                                >
                                    <Dog className="h-3 w-3" />
                                    <span>Permite Cães</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setSelectedTagFilter(selectedTagFilter === 'mtb' ? 'all' : 'mtb')}
                                    className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-bold transition-all ${
                                        selectedTagFilter === 'mtb'
                                            ? 'bg-purple-700 text-white shadow'
                                            : 'bg-white text-[#384b40] border border-[#d6ddd4] hover:bg-[#e8ede6] dark:bg-[#1a2b22] dark:text-[#c4d6cb] dark:border-[#273830]'
                                    }`}
                                >
                                    <Bike className="h-3 w-3" />
                                    <span>Mountain Bike</span>
                                </button>

                                {/* Separador */}
                                <div className="h-4 w-px bg-[#ccd4ca] dark:bg-[#2d4236] mx-1" />

                                {/* Nível */}
                                {(['all', 'easy', 'moderate', 'hard'] as const).map((lvl) => (
                                    <button
                                        key={lvl}
                                        type="button"
                                        onClick={() => setSelectedDifficultyFilter(lvl)}
                                        className={`rounded-lg px-2.5 py-1 text-[11px] font-bold capitalize transition-all ${
                                            selectedDifficultyFilter === lvl
                                                ? 'bg-[#e06a26] text-white shadow-sm'
                                                : 'bg-[#e2e8e0] text-[#3e5045] hover:bg-[#d6ddd4] dark:bg-[#1a2b22] dark:text-[#a0b6a8]'
                                        }`}
                                    >
                                        {lvl === 'all' ? 'Nível: Todos' : lvl === 'easy' ? 'Fácil' : lvl === 'moderate' ? 'Moderada' : 'Difícil'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Seções por Região */}
                        {filteredTrails.length === 0 ? (
                            <div className="rounded-2xl border border-dashed border-[#ccd4ca] bg-white p-12 text-center dark:border-[#273830] dark:bg-[#14221c]">
                                <Trees className="mx-auto h-12 w-12 text-[#687a70] mb-2" />
                                <h3 className="text-base font-bold text-[#142921] dark:text-[#ecf4ee]">
                                    Nenhuma trilha encontrada com estes filtros
                                </h3>
                                <p className="text-xs text-[#52645a] dark:text-[#9bb2a4] mt-1">
                                    Tente alterar os filtros de atração ou limpar o campo de busca.
                                </p>
                            </div>
                        ) : (
                            <>
                                {/* REGIONAL 1: CAPITAL & GRANDE SP */}
                                {(selectedRegionFilter === 'all' || selectedRegionFilter === 'capital') &&
                                    trailsByRegion.capital.length > 0 && (
                                        <section className="space-y-3 pt-2">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="text-lg font-black text-[#142921] dark:text-[#ecf4ee] flex items-center gap-2">
                                                        <span>Capital & Grande São Paulo</span>
                                                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                                                            {trailsByRegion.capital.length}
                                                        </span>
                                                    </h3>
                                                    <p className="text-xs text-[#52645a] dark:text-[#9bb2a4]">
                                                        {REGIONS_META.capital.tagline}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {trailsByRegion.capital.map((trail) => (
                                                    <TrailCard
                                                        key={trail.id}
                                                        trail={trail}
                                                        isFavorite={savedTrailIds.includes(trail.id)}
                                                        onToggleFavorite={toggleFavorite}
                                                        onSelectTrail={setSelectedTrail}
                                                    />
                                                ))}
                                            </div>
                                        </section>
                                    )}

                                {/* REGIONAL 2: INTERIOR & SERRAS */}
                                {(selectedRegionFilter === 'all' || selectedRegionFilter === 'interior') &&
                                    trailsByRegion.interior.length > 0 && (
                                        <section className="space-y-3 pt-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="text-lg font-black text-[#142921] dark:text-[#ecf4ee] flex items-center gap-2">
                                                        <span>Entorno & Interior Próximo (Serras & Mantiqueira)</span>
                                                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                                                            {trailsByRegion.interior.length}
                                                        </span>
                                                    </h3>
                                                    <p className="text-xs text-[#52645a] dark:text-[#9bb2a4]">
                                                        {REGIONS_META.interior.tagline}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {trailsByRegion.interior.map((trail) => (
                                                    <TrailCard
                                                        key={trail.id}
                                                        trail={trail}
                                                        isFavorite={savedTrailIds.includes(trail.id)}
                                                        onToggleFavorite={toggleFavorite}
                                                        onSelectTrail={setSelectedTrail}
                                                    />
                                                ))}
                                            </div>
                                        </section>
                                    )}

                                {/* REGIONAL 3: LITORAL PAULISTA */}
                                {(selectedRegionFilter === 'all' || selectedRegionFilter === 'litoral') &&
                                    trailsByRegion.litoral.length > 0 && (
                                        <section className="space-y-3 pt-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="text-lg font-black text-[#142921] dark:text-[#ecf4ee] flex items-center gap-2">
                                                        <span>Litoral Paulista (Norte & Sul)</span>
                                                        <span className="rounded-full bg-teal-100 px-2 py-0.5 text-xs font-bold text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                                                            {trailsByRegion.litoral.length}
                                                        </span>
                                                    </h3>
                                                    <p className="text-xs text-[#52645a] dark:text-[#9bb2a4]">
                                                        {REGIONS_META.litoral.tagline}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {trailsByRegion.litoral.map((trail) => (
                                                    <TrailCard
                                                        key={trail.id}
                                                        trail={trail}
                                                        isFavorite={savedTrailIds.includes(trail.id)}
                                                        onToggleFavorite={toggleFavorite}
                                                        onSelectTrail={setSelectedTrail}
                                                    />
                                                ))}
                                            </div>
                                        </section>
                                    )}
                            </>
                        )}
                    </div>
                )}

                {/* ======================================================== */}
                {/* ABA 2: MAPA INTERATIVO & HEATMAP */}
                {/* ======================================================== */}
                {activeTab === 'map' && (
                    <div className="animate-in fade-in duration-300">
                        <InteractiveMap
                            trails={TRAILS_DATA}
                            selectedTrail={selectedTrail}
                            onSelectTrail={setSelectedTrail}
                        />
                    </div>
                )}

                {/* ======================================================== */}
                {/* ABA 3: OFFLINE & FAVORITOS */}
                {/* ======================================================== */}
                {activeTab === 'offline' && (
                    <div className="animate-in fade-in duration-300">
                        <OfflineVault
                            savedTrails={savedTrailsList}
                            onSelectTrail={setSelectedTrail}
                            onRemoveTrail={(id) => {
                                setSavedTrailIds((prev) => {
                                    const next = prev.filter((item) => item !== id);
                                    localStorage.setItem('sptrilhas_saved_trails', JSON.stringify(next));
                                    return next;
                                });
                            }}
                            onClearAll={clearAllSaved}
                            onDownloadGpx={handleDownloadGpx}
                        />
                    </div>
                )}

                {/* ======================================================== */}
                {/* ABA 4: SOS & KIT DE EMERGÊNCIA */}
                {/* ======================================================== */}
                {activeTab === 'sos' && (
                    <div className="animate-in fade-in duration-300">
                        <EmergencyKit />
                    </div>
                )}
            </main>

            {/* Modal de Detalhes da Trilha */}
            <TrailDetailModal
                trail={selectedTrail}
                isFavorite={selectedTrail ? savedTrailIds.includes(selectedTrail.id) : false}
                onClose={() => setSelectedTrail(null)}
                onToggleFavorite={(trail) => toggleFavorite(trail)}
                onDownloadGpx={handleDownloadGpx}
            />

            {/* Modal de Calculadora de Hidratação & Mochila */}
            <HydrationCalculatorModal
                isOpen={isCalculatorOpen}
                onClose={() => setIsCalculatorOpen(false)}
                trails={TRAILS_DATA}
                initialTrailId={selectedTrail?.id}
            />

            {/* Barra de Navegação Inferior (Mobile Thumb Friendly) */}
            <BottomNav
                activeTab={activeTab}
                onChangeTab={setActiveTab}
                offlineCount={savedTrailIds.length}
            />
        </div>
    );
}
