import React, { useState, useEffect } from 'react';
import { Trail } from '@/types/trail';
import { ElevationChart } from './ElevationChart';
import { TrailConditionsWidget } from './TrailConditionsWidget';
import { 
    X, 
    Navigation, 
    MapPin, 
    Clock, 
    TrendingUp, 
    Mountain, 
    Heart, 
    Download, 
    AlertTriangle, 
    CheckCircle2, 
    Compass, 
    Droplet, 
    Signal, 
    ShieldAlert, 
    DollarSign,
    Share2,
    ExternalLink,
    Waves,
    Dog,
    Camera
} from 'lucide-react';

interface TrailDetailModalProps {
    trail: Trail | null;
    isFavorite: boolean;
    onClose: () => void;
    onToggleFavorite: (trail: Trail) => void;
    onDownloadGpx: (trail: Trail) => void;
    onStartLiveTracking?: (trail: Trail) => void;
}

export function TrailDetailModal({
    trail,
    isFavorite,
    onClose,
    onToggleFavorite,
    onDownloadGpx,
    onStartLiveTracking
}: TrailDetailModalProps) {
    if (!trail) return null;

    const [activePhoto, setActivePhoto] = useState<string>(trail.coverImage);

    // Atualiza a foto ativa quando a trilha muda
    useEffect(() => {
        if (trail) {
            setActivePhoto(trail.coverImage);
        }
    }, [trail]);

    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${trail.trailheadCoordinates.lat},${trail.trailheadCoordinates.lng}`;

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${trail.name} - SP Trilhas`,
                    text: `Confira a trilha ${trail.name} em ${trail.city} no SP Trilhas!`,
                    url: window.location.href
                });
            } catch (err) {
                // Compartilhamento cancelado
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copiado para a área de transferência!');
        }
    };

    const gallery = trail.galleryImages && trail.galleryImages.length > 0 
        ? trail.galleryImages 
        : [trail.coverImage];

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
            <div 
                className="relative flex flex-col w-full max-w-2xl max-h-[92vh] sm:max-h-[88vh] rounded-t-3xl sm:rounded-3xl bg-[#f5f7f4] text-[#1b2b23] shadow-2xl overflow-hidden border border-[#d2dbd0] dark:bg-[#121d18] dark:text-[#ecf4ee] dark:border-[#223329]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header com Foto Selecionada */}
                <div className="relative h-64 sm:h-72 w-full shrink-0 bg-[#162920]">
                    <img
                        src={activePhoto}
                        alt={trail.name}
                        className="h-full w-full object-cover transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                    {/* Botões Superiores */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                        <span className="rounded-full bg-[#162920]/80 px-3 py-1 text-xs font-semibold text-emerald-300 backdrop-blur-md border border-emerald-500/30">
                            {trail.parkName}
                        </span>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={handleShare}
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-md transition-colors"
                                title="Compartilhar"
                            >
                                <Share2 className="h-5 w-5" />
                            </button>
                            <button
                                type="button"
                                onClick={() => onToggleFavorite(trail)}
                                className={`flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md transition-all ${
                                    isFavorite ? 'bg-rose-500 text-white' : 'bg-black/40 text-white hover:bg-black/60'
                                }`}
                                title="Favoritar / Salvar Offline"
                            >
                                <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-md transition-colors"
                                title="Fechar"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                    </div>

                    {/* Título e Cidade sobre a foto */}
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-300 mb-0.5">
                            <MapPin className="h-3.5 w-3.5" />
                            <span>{trail.city}</span>
                            <span>•</span>
                            <span className="capitalize">{trail.trailType}</span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-black leading-tight drop-shadow-md">
                            {trail.name}
                        </h2>
                    </div>
                </div>

                {/* Miniaturas da Galeria de Fotos Reais */}
                {gallery.length > 1 && (
                    <div className="bg-[#14261e] px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-emerald-500/20">
                        <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-300 mr-1 shrink-0">
                            <Camera className="h-3.5 w-3.5" />
                            <span>Fotos Reais:</span>
                        </div>
                        {gallery.map((imgUrl, idx) => (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => setActivePhoto(imgUrl)}
                                className={`relative h-11 w-16 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                                    activePhoto === imgUrl
                                        ? 'border-[#e06a26] ring-2 ring-[#e06a26]/40 scale-105'
                                        : 'border-white/30 opacity-70 hover:opacity-100'
                                }`}
                            >
                                <img src={imgUrl} alt={`Foto ${idx + 1}`} className="h-full w-full object-cover" />
                            </button>
                        ))}
                    </div>
                )}

                {/* Corpo Rolável */}
                <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
                    {/* Grade de Estatísticas Primárias Outdoor */}
                    <div className="grid grid-cols-4 gap-2 sm:gap-3 rounded-2xl bg-[#e8ede6] p-3 text-center dark:bg-[#1a2b22] border border-[#d6ddd4] dark:border-[#263b30]">
                        <div className="flex flex-col items-center">
                            <Compass className="h-4 w-4 text-[#e06a26] mb-1" />
                            <span className="text-[10px] uppercase font-bold text-[#627368] dark:text-[#8ea496]">Distância</span>
                            <span className="font-extrabold text-sm sm:text-base">{trail.distanceKm} km</span>
                        </div>
                        <div className="flex flex-col items-center border-l border-[#d0d8ce] dark:border-[#2d4236]">
                            <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mb-1" />
                            <span className="text-[10px] uppercase font-bold text-[#627368] dark:text-[#8ea496]">Desnível</span>
                            <span className="font-extrabold text-sm sm:text-base">+{trail.elevationGainM}m</span>
                        </div>
                        <div className="flex flex-col items-center border-l border-[#d0d8ce] dark:border-[#2d4236]">
                            <Mountain className="h-4 w-4 text-sky-600 dark:text-sky-400 mb-1" />
                            <span className="text-[10px] uppercase font-bold text-[#627368] dark:text-[#8ea496]">Cota Máx</span>
                            <span className="font-extrabold text-sm sm:text-base">{trail.maxAltitudeM}m</span>
                        </div>
                        <div className="flex flex-col items-center border-l border-[#d0d8ce] dark:border-[#2d4236]">
                            <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400 mb-1" />
                            <span className="text-[10px] uppercase font-bold text-[#627368] dark:text-[#8ea496]">Duração</span>
                            <span className="font-extrabold text-sm sm:text-base">{trail.durationHours}h</span>
                        </div>
                    </div>

                    {/* Tags Rápidas de Atributos */}
                    <div className="flex flex-wrap items-center gap-1.5 text-xs">
                        {trail.activityType && (
                            <span className="rounded-full bg-[#142921] text-emerald-300 px-3 py-1 font-bold uppercase tracking-wider text-[10px]">
                                {trail.activityType === 'hiking' ? 'Caminhada / Hiking' : trail.activityType === 'trekking' ? 'Trekking / Travessia' : trail.activityType === 'mtb' ? 'Mountain Bike (MTB)' : 'Trail Running'}
                            </span>
                        )}
                        {trail.hasWaterfall && (
                            <span className="flex items-center gap-1 rounded-full bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 px-2.5 py-0.5 font-semibold text-[11px] border border-sky-300 dark:border-sky-800">
                                <Waves className="h-3 w-3" />
                                <span>Cachoeira / Banho</span>
                            </span>
                        )}
                        {trail.hasSummit && (
                            <span className="flex items-center gap-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 px-2.5 py-0.5 font-semibold text-[11px] border border-amber-300 dark:border-amber-800">
                                <Mountain className="h-3 w-3" />
                                <span>Mirante / Cume</span>
                            </span>
                        )}
                        {trail.isPetFriendly && (
                            <span className="flex items-center gap-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-2.5 py-0.5 font-semibold text-[11px] border border-emerald-300 dark:border-emerald-800">
                                <Dog className="h-3 w-3" />
                                <span>Permite Cães</span>
                            </span>
                        )}
                    </div>

                    {/* Gráfico de Relevo Altimétrico */}
                    <div>
                        <ElevationChart points={trail.elevationProfile} maxAltitude={trail.maxAltitudeM} />
                    </div>

                    {/* Informações Práticas de Infraestrutura */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                        <div className="rounded-xl border border-[#d6ddd4] bg-white/70 p-3 dark:border-[#273830] dark:bg-[#16241e]">
                            <span className="text-[#627368] dark:text-[#8ea496] block text-[10px] uppercase font-semibold">Ponto de Água</span>
                            <span className="font-bold flex items-center gap-1 mt-0.5 text-sky-700 dark:text-sky-300">
                                <Droplet className="h-3.5 w-3.5" />
                                {trail.hasWaterPoint ? 'Disponível no percurso' : 'Levar de casa'}
                            </span>
                        </div>

                        <div className="rounded-xl border border-[#d6ddd4] bg-white/70 p-3 dark:border-[#273830] dark:bg-[#16241e]">
                            <span className="text-[#627368] dark:text-[#8ea496] block text-[10px] uppercase font-semibold">Sinal Celular</span>
                            <span className="font-bold flex items-center gap-1 mt-0.5 text-emerald-700 dark:text-emerald-300">
                                <Signal className="h-3.5 w-3.5" />
                                {trail.hasCellphoneSignal === 'none' ? 'Sem sinal' : trail.hasCellphoneSignal === 'weak' ? 'Instável / Fraco' : '4G/5G Estável'}
                            </span>
                        </div>

                        <div className="rounded-xl border border-[#d6ddd4] bg-white/70 p-3 dark:border-[#273830] dark:bg-[#16241e]">
                            <span className="text-[#627368] dark:text-[#8ea496] block text-[10px] uppercase font-semibold">Guia Monitor</span>
                            <span className="font-bold flex items-center gap-1 mt-0.5 text-amber-700 dark:text-amber-300">
                                <ShieldAlert className="h-3.5 w-3.5" />
                                {trail.requiresGuide ? 'Obrigatório' : 'Autoguiada'}
                            </span>
                        </div>

                        <div className="rounded-xl border border-[#d6ddd4] bg-white/70 p-3 dark:border-[#273830] dark:bg-[#16241e]">
                            <span className="text-[#627368] dark:text-[#8ea496] block text-[10px] uppercase font-semibold">Ingresso / Taxa</span>
                            <span className="font-bold flex items-center gap-1 mt-0.5 text-emerald-800 dark:text-emerald-200">
                                <DollarSign className="h-3.5 w-3.5" />
                                {trail.entryFee}
                            </span>
                        </div>
                    </div>

                    {/* Previsão do Tempo & Relatos Comunitários */}
                    <TrailConditionsWidget trail={trail} />

                    {/* Descrição Detalhada */}
                    <div className="space-y-2">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-[#1e3a2f] dark:text-emerald-400">
                            Sobre a Trilha
                        </h4>
                        <p className="text-sm leading-relaxed text-[#3a4d42] dark:text-[#c4d6cb]">
                            {trail.fullDescription}
                        </p>
                    </div>

                    {/* Destaques (Highlights) */}
                    <div className="space-y-2">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-[#1e3a2f] dark:text-emerald-400">
                            Destaques Naturais & Atrações
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {trail.highlights.map((h, i) => (
                                <span
                                    key={i}
                                    className="flex items-center gap-1 rounded-full bg-emerald-100/80 px-3 py-1 text-xs font-semibold text-emerald-900 border border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-200 dark:border-emerald-800"
                                >
                                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                                    {h}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Alertas de Segurança */}
                    {trail.safetyAlerts.length > 0 && (
                        <div className="rounded-2xl border border-amber-300 bg-amber-50/80 p-4 text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200">
                            <div className="flex items-center gap-2 font-bold text-sm text-amber-800 dark:text-amber-400 mb-2">
                                <AlertTriangle className="h-4 w-4" />
                                <span>Avisos de Segurança & Atenção Outdoor</span>
                            </div>
                            <ul className="space-y-1.5 text-xs list-disc list-inside">
                                {trail.safetyAlerts.map((alert, i) => (
                                    <li key={i}>{alert}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Equipamentos Recomendados */}
                    <div className="rounded-2xl border border-[#d6ddd4] bg-white p-4 dark:border-[#273830] dark:bg-[#16241e]">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#52645a] dark:text-[#9bb2a4] mb-2">
                            Equipamentos Recomendados para esta Atividade
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            {trail.essentialGear.map((gear, i) => (
                                <div key={i} className="flex items-center gap-2 text-[#2c3d34] dark:text-[#c4d6cb]">
                                    <div className="h-1.5 w-1.5 rounded-full bg-[#e06a26]" />
                                    <span>{gear}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Localização do Início da Trilha */}
                    <div className="rounded-2xl border border-[#d6ddd4] bg-white p-4 dark:border-[#273830] dark:bg-[#16241e] text-xs">
                        <div className="font-bold text-[#142921] dark:text-[#ecf4ee] flex items-center gap-1.5 mb-1">
                            <MapPin className="h-4 w-4 text-[#e06a26]" />
                            <span>Ponto de Partida / Estacionamento</span>
                        </div>
                        <p className="text-[#55695f] dark:text-[#9bb2a4] mb-1">
                            {trail.trailheadCoordinates.address}
                        </p>
                        <p className="font-mono text-[11px] text-emerald-700 dark:text-emerald-400">
                            GPS: {trail.trailheadCoordinates.lat.toFixed(4)}, {trail.trailheadCoordinates.lng.toFixed(4)}
                        </p>
                    </div>
                </div>

                {/* Barra Fixa de CTAs Outdoor (Botões de Ação Imediata) */}
                <div className="p-4 sm:p-5 bg-white border-t border-[#d6ddd4] dark:bg-[#14221c] dark:border-[#273830] flex flex-col sm:flex-row gap-2.5">
                    <a
                        href={googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl bg-[#e06a26] text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-[#e06a26]/25 hover:bg-[#cf5c1b] active:scale-[0.98] transition-all"
                    >
                        <Navigation className="h-4 w-4" />
                        <span>Abrir no Google Maps / GPS</span>
                    </a>

                    {trail.wikilocUrl && (
                        <a
                            href={trail.wikilocUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 h-12 px-4 rounded-xl bg-[#4c8435] text-white hover:bg-[#3f6e2c] font-bold text-xs sm:text-sm transition-all shadow active:scale-[0.98]"
                            title="Abrir página oficial desta rota no Wikiloc"
                        >
                            <ExternalLink className="h-4 w-4" />
                            <span>Wikiloc</span>
                        </a>
                    )}

                    <button
                        type="button"
                        onClick={() => onDownloadGpx(trail)}
                        className="flex items-center justify-center gap-1.5 h-12 px-4 rounded-xl border-2 border-[#1e3a2f] text-[#1e3a2f] hover:bg-[#1e3a2f] hover:text-white dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-400 dark:hover:text-[#121d18] font-bold text-xs sm:text-sm transition-all active:scale-[0.98]"
                    >
                        <Download className="h-4 w-4" />
                        <span>GPX</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
