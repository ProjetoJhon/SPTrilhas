import React, { useState, useMemo } from 'react';
import { Trail, Region } from '@/types/trail';
import { MapPin, Navigation, Compass, Layers, Plus, Minus, Info, Flame } from 'lucide-react';

interface InteractiveMapProps {
    trails: Trail[];
    selectedTrail: Trail | null;
    onSelectTrail: (trail: Trail) => void;
}

export function InteractiveMap({ trails, selectedTrail, onSelectTrail }: InteractiveMapProps) {
    const [selectedRegion, setSelectedRegion] = useState<Region | 'all'>('all');
    const [mapLayer, setMapLayer] = useState<'topo' | 'terrain' | 'satellite'>('topo');
    const [activeTrailId, setActiveTrailId] = useState<string | null>(selectedTrail?.id || null);
    const [zoomLevel, setZoomLevel] = useState<number>(1);
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [showHeatmap, setShowHeatmap] = useState<boolean>(true);

    // Bounding Box cobrindo do Vale do Ribeira/PETAR (-24.5) até a Mantiqueira (-22.6) e Ubatuba (-45.1)
    const bounds = {
        minLat: -24.8,
        maxLat: -22.4,
        minLng: -48.9,
        maxLng: -44.9
    };

    const projectToMap = (lat: number, lng: number) => {
        const x = ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 100;
        // Inverte Y porque latitude cresce para o norte
        const y = ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * 100;
        return { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) };
    };

    const filteredTrails = useMemo(() => {
        if (selectedRegion === 'all') return trails;
        return trails.filter((t) => t.region === selectedRegion);
    }, [trails, selectedRegion]);

    const activeTrail = trails.find((t) => t.id === activeTrailId);

    const handleGetLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setUserLocation({
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude
                    });
                },
                () => {
                    // Fallback para o Centro de SP (Praça da Sé)
                    setUserLocation({ lat: -23.5505, lng: -46.6333 });
                }
            );
        } else {
            setUserLocation({ lat: -23.5505, lng: -46.6333 });
        }
    };

    return (
        <div className="relative flex flex-col h-[calc(100vh-140px)] w-full overflow-hidden rounded-2xl border border-[#d6ddd4] bg-[#12241b] shadow-inner dark:border-[#263b30]">
            {/* Top Toolbar com Filtros de Camadas e Regiões */}
            <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
                {/* Filtro de Região */}
                <div className="pointer-events-auto flex items-center gap-1 rounded-full bg-[#162920]/90 p-1 shadow-lg backdrop-blur-md border border-emerald-500/20 text-xs text-white">
                    <button
                        type="button"
                        onClick={() => setSelectedRegion('all')}
                        className={`rounded-full px-3 py-1 font-semibold transition-all ${
                            selectedRegion === 'all' ? 'bg-[#e06a26] text-white shadow' : 'text-emerald-200 hover:text-white'
                        }`}
                    >
                        Todas
                    </button>
                    <button
                        type="button"
                        onClick={() => setSelectedRegion('capital')}
                        className={`rounded-full px-3 py-1 font-semibold transition-all ${
                            selectedRegion === 'capital' ? 'bg-[#10b981] text-[#12241b] shadow' : 'text-emerald-200 hover:text-white'
                        }`}
                    >
                        Capital
                    </button>
                    <button
                        type="button"
                        onClick={() => setSelectedRegion('interior')}
                        className={`rounded-full px-3 py-1 font-semibold transition-all ${
                            selectedRegion === 'interior' ? 'bg-amber-500 text-[#12241b] shadow' : 'text-emerald-200 hover:text-white'
                        }`}
                    >
                        Interior / Serras
                    </button>
                    <button
                        type="button"
                        onClick={() => setSelectedRegion('litoral')}
                        className={`rounded-full px-3 py-1 font-semibold transition-all ${
                            selectedRegion === 'litoral' ? 'bg-teal-400 text-[#12241b] shadow' : 'text-emerald-200 hover:text-white'
                        }`}
                    >
                        Litoral
                    </button>
                </div>

                {/* Alternador de Camada e Mapa de Calor */}
                <div className="pointer-events-auto flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setShowHeatmap(!showHeatmap)}
                        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold backdrop-blur-md border shadow transition-all ${
                            showHeatmap
                                ? 'bg-orange-500/90 text-white border-orange-400'
                                : 'bg-[#162920]/80 text-emerald-200 border-emerald-500/20 hover:text-white'
                        }`}
                        title="Alternar manchas de calor das trilhas mais populares"
                    >
                        <Flame className="h-3.5 w-3.5" />
                        <span>Heatmap</span>
                    </button>

                    <div className="flex items-center gap-1 rounded-full bg-[#162920]/90 p-1 shadow-lg backdrop-blur-md border border-emerald-500/20 text-xs text-white">
                        <Layers className="h-3.5 w-3.5 text-emerald-400 ml-1.5" />
                        <button
                            type="button"
                            onClick={() => setMapLayer(mapLayer === 'topo' ? 'satellite' : mapLayer === 'satellite' ? 'terrain' : 'topo')}
                            className="rounded-full px-2.5 py-0.5 font-medium text-emerald-200 hover:text-white capitalize"
                        >
                            {mapLayer === 'topo' ? 'Topográfico' : mapLayer === 'satellite' ? 'Satélite' : 'Terreno'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Controles Laterais (Zoom & GPS) */}
            <div className="absolute right-4 top-20 z-20 flex flex-col gap-2">
                <button
                    type="button"
                    onClick={() => setZoomLevel(Math.min(zoomLevel + 0.25, 2))}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#162920]/90 text-emerald-200 hover:text-white shadow-lg backdrop-blur-md border border-emerald-500/20 transition-all active:scale-95"
                    title="Aumentar zoom"
                >
                    <Plus className="h-5 w-5" />
                </button>
                <button
                    type="button"
                    onClick={() => setZoomLevel(Math.max(zoomLevel - 0.25, 0.75))}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#162920]/90 text-emerald-200 hover:text-white shadow-lg backdrop-blur-md border border-emerald-500/20 transition-all active:scale-95"
                    title="Diminuir zoom"
                >
                    <Minus className="h-5 w-5" />
                </button>
                <button
                    type="button"
                    onClick={handleGetLocation}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#162920]/90 text-amber-400 hover:text-amber-300 shadow-lg backdrop-blur-md border border-emerald-500/20 transition-all active:scale-95"
                    title="Minha localização (GPS)"
                >
                    <Navigation className="h-5 w-5" />
                </button>
            </div>

            {/* Viewport do Mapa Estilizado (Cartografia Vetorial Outdoor) */}
            <div 
                className="relative flex-1 w-full h-full cursor-grab active:cursor-grabbing overflow-hidden transition-transform duration-300"
                style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
            >
                {/* SVG de Fundo Cartográfico: Relevos, Curvas de Nível e Linha de Costa de SP */}
                <svg className="absolute inset-0 h-full w-full select-none" viewBox="0 0 1000 600" preserveAspectRatio="none">
                    <defs>
                        <radialGradient id="oceanGradient" cx="70%" cy="80%" r="60%">
                            <stop offset="0%" stopColor="#0b2a33" />
                            <stop offset="100%" stopColor="#081e26" />
                        </radialGradient>

                        <linearGradient id="reliefGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#1e3a2f" />
                            <stop offset="40%" stopColor="#173026" />
                            <stop offset="80%" stopColor="#10241c" />
                        </linearGradient>

                        <filter id="glow">
                            <feGaussianBlur stdDeviation="15" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Fundo do Terreno Continental */}
                    <rect width="1000" height="600" fill="url(#reliefGradient)" />

                    {/* Oceano Atlântico / Litoral Sudeste */}
                    <path
                        d="M 500,600 C 600,520 680,480 820,430 C 920,390 980,350 1000,320 L 1000,600 Z"
                        fill="url(#oceanGradient)"
                    />

                    {/* Ilhabela (Ilha de São Sebastião) no Mapa */}
                    <path
                        d="M 780,460 C 800,450 820,460 815,480 C 805,495 785,490 775,475 Z"
                        fill="#1b3b2d"
                        stroke="#0d5143"
                        strokeWidth="2"
                    />

                    {/* Curvas de Nível da Serra do Mar e Serra da Mantiqueira */}
                    <g opacity="0.18" stroke="#34d399" strokeWidth="1" fill="none">
                        <path d="M 50,150 Q 250,80 500,100 T 900,120" />
                        <path d="M 80,220 Q 300,160 550,180 T 950,200" />
                        <path d="M 120,310 Q 380,260 620,290 T 980,310" />
                        <path d="M 200,420 Q 420,380 700,390 T 990,400" />
                        <path d="M 300,500 Q 520,470 750,450" />
                    </g>

                    {/* Malha de Rodovias Principais (Ayrton Senna, Dutra, Tamoios, Imigrantes) */}
                    <g opacity="0.25" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="6 4" fill="none">
                        {/* Rodovia dos Imigrantes / Anchieta para o Litoral */}
                        <path d="M 350,330 Q 370,400 420,480" />
                        {/* Rodovia dos Tamoios para Caraguatatuba / São Sebastião */}
                        <path d="M 360,320 Q 520,320 660,400" />
                        {/* Rodovia Fernão Dias para Atibaia */}
                        <path d="M 350,320 L 410,180" />
                        {/* Ayrton Senna / Dutra rumo ao Vale do Paraíba / Mantiqueira */}
                        <path d="M 360,320 Q 550,260 820,180" />
                    </g>

                    {/* Manchas de Calor (Heatmap) se ativado */}
                    {showHeatmap && (
                        <g filter="url(#glow)" opacity="0.55">
                            {trails.map((t) => {
                                const pos = projectToMap(t.trailheadCoordinates.lat, t.trailheadCoordinates.lng);
                                const cx = (pos.x / 100) * 1000;
                                const cy = (pos.y / 100) * 600;
                                return (
                                    <circle
                                        key={`heat-${t.id}`}
                                        cx={cx}
                                        cy={cy}
                                        r={t.difficulty === 'hard' ? 45 : 32}
                                        fill={t.region === 'litoral' ? '#06b6d4' : t.region === 'capital' ? '#10b981' : '#f59e0b'}
                                    />
                                );
                            })}
                        </g>
                    )}
                </svg>

                {/* Marcadores de Posição de cada Trilha (Pins Georreferenciados) */}
                {filteredTrails.map((trail) => {
                    const pos = projectToMap(trail.trailheadCoordinates.lat, trail.trailheadCoordinates.lng);
                    const isSelected = trail.id === activeTrailId;

                    return (
                        <div
                            key={trail.id}
                            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                            className="absolute -translate-x-1/2 -translate-y-full z-10 cursor-pointer group"
                            onClick={(e) => {
                                e.stopPropagation();
                                setActiveTrailId(trail.id);
                            }}
                        >
                            {/* Pin Ícone */}
                            <div className="relative flex flex-col items-center">
                                <div
                                    className={`flex items-center justify-center rounded-full p-2 text-white shadow-xl transition-all duration-300 group-hover:scale-125 ${
                                        isSelected
                                            ? 'bg-[#e06a26] ring-4 ring-orange-300 scale-125'
                                            : trail.region === 'capital'
                                            ? 'bg-emerald-600 hover:bg-emerald-500'
                                            : trail.region === 'interior'
                                            ? 'bg-amber-600 hover:bg-amber-500'
                                            : 'bg-teal-600 hover:bg-teal-500'
                                    }`}
                                >
                                    <MapPin className="h-4 w-4 fill-current" />
                                </div>

                                {/* Label flutuante */}
                                <div className="mt-1 whitespace-nowrap rounded-md bg-[#12241b]/95 px-2 py-0.5 text-[11px] font-bold text-white shadow-md border border-emerald-500/30 backdrop-blur-sm pointer-events-none transition-opacity group-hover:opacity-100 opacity-90">
                                    {trail.name.split('(')[0].trim()}
                                </div>

                                {/* Pontinha do Pin */}
                                <div className="h-1.5 w-1.5 rounded-full bg-black/40 blur-[1px] mt-0.5" />
                            </div>
                        </div>
                    );
                })}

                {/* Pin da Localização do Usuário */}
                {userLocation && (
                    <div
                        style={{
                            left: `${projectToMap(userLocation.lat, userLocation.lng).x}%`,
                            top: `${projectToMap(userLocation.lat, userLocation.lng).y}%`
                        }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
                    >
                        <div className="relative flex items-center justify-center">
                            <div className="h-4 w-4 rounded-full bg-sky-500 border-2 border-white shadow-lg animate-pulse" />
                            <div className="absolute h-8 w-8 rounded-full bg-sky-400/40 animate-ping" />
                        </div>
                    </div>
                )}
            </div>

            {/* Cartão de Visualização Rápida no Rodapé do Mapa */}
            {activeTrail && (
                <div className="absolute bottom-4 left-4 right-4 z-30 mx-auto max-w-lg rounded-2xl border border-emerald-500/30 bg-[#162920]/95 p-4 text-white shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-5 duration-300">
                    <div className="flex items-center gap-3">
                        <img
                            src={activeTrail.coverImage}
                            alt={activeTrail.name}
                            className="h-16 w-16 rounded-xl object-cover shrink-0 border border-emerald-500/30"
                        />
                        <div className="flex-1 min-w-0">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                                {activeTrail.city} • {activeTrail.distanceKm} km
                            </span>
                            <h4 className="text-sm font-bold truncate text-white">
                                {activeTrail.name}
                            </h4>
                            <p className="text-xs text-emerald-200/80 truncate">
                                Desnível: +{activeTrail.elevationGainM}m • {activeTrail.durationHours}h
                            </p>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <button
                                type="button"
                                onClick={() => onSelectTrail(activeTrail)}
                                className="rounded-xl bg-[#e06a26] px-3.5 py-1.5 text-xs font-bold text-white shadow hover:bg-[#cf5c1b] transition-all"
                            >
                                Detalhes
                            </button>
                            <a
                                href={`https://www.google.com/maps/dir/?api=1&destination=${activeTrail.trailheadCoordinates.lat},${activeTrail.trailheadCoordinates.lng}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-1 rounded-xl bg-emerald-700/60 px-3 py-1.5 text-xs font-semibold text-emerald-100 hover:bg-emerald-600 transition-all border border-emerald-500/40"
                            >
                                <Navigation className="h-3 w-3" />
                                <span>GPS</span>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

