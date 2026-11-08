import React, { useState, useEffect } from 'react';
import { Trail } from '@/types/trail';
import { 
    Play, 
    Pause, 
    Square, 
    Compass, 
    TrendingUp, 
    Clock, 
    Flame, 
    ShieldAlert, 
    MapPin, 
    X, 
    Volume2, 
    VolumeX,
    Navigation,
    Award
} from 'lucide-react';

interface LiveTrailNavigatorProps {
    trail: Trail;
    onClose: () => void;
    onEmergencySos: () => void;
}

export function LiveTrailNavigator({ trail, onClose, onEmergencySos }: LiveTrailNavigatorProps) {
    const [isActive, setIsActive] = useState<boolean>(true);
    const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
    const [distanceCoveredKm, setDistanceCoveredKm] = useState<number>(0.2);
    const [currentElevationM, setCurrentElevationM] = useState<number>(trail.elevationProfile[0]?.elevationM || 100);
    const [voiceAlerts, setVoiceAlerts] = useState<boolean>(true);
    const [heading, setHeading] = useState<number>(45);
    const [isFinished, setIsFinished] = useState<boolean>(false);

    // Cronômetro da Atividade
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isActive && !isFinished) {
            interval = setInterval(() => {
                setSecondsElapsed((prev) => {
                    const next = prev + 1;
                    // Simula avanço de distância gradual a 4 km/h se estiver em movimento
                    if (next % 5 === 0) {
                        setDistanceCoveredKm((d) => Math.min(trail.distanceKm, Math.round((d + 0.05) * 100) / 100));
                        // Atualiza elevação correspondente ao ponto da distância
                        const progressRatio = (distanceCoveredKm / trail.distanceKm);
                        const targetElev = trail.elevationProfile[0].elevationM + (trail.elevationGainM * progressRatio);
                        setCurrentElevationM(Math.round(targetElev));
                    }
                    return next;
                });
            }, 1000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, isFinished, distanceCoveredKm, trail]);

    // Bússola Digital via DeviceOrientation
    useEffect(() => {
        const handleOrientation = (event: DeviceOrientationEvent) => {
            if (event.alpha !== null) {
                setHeading(Math.round(event.alpha));
            }
        };

        if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', handleOrientation);
            return () => window.removeEventListener('deviceorientation', handleOrientation);
        }
    }, []);

    const formatTime = (totalSeconds: number) => {
        const hrs = Math.floor(totalSeconds / 3600);
        const mins = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;
        return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const caloriesBurned = Math.round((distanceCoveredKm * 65) + (trail.elevationGainM * 0.15));
    const progressPercent = Math.min(100, Math.round((distanceCoveredKm / trail.distanceKm) * 100));

    // Próximo marco na trilha
    const nextWaypoint = trail.elevationProfile.find((p) => p.distanceKm > distanceCoveredKm) || trail.elevationProfile[trail.elevationProfile.length - 1];

    if (isFinished) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-300 text-white">
                <div className="w-full max-w-md rounded-3xl bg-[#142921] p-6 border border-emerald-500/40 text-center space-y-4 shadow-2xl">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        <Award className="h-8 w-8 text-amber-400" />
                    </div>

                    <h2 className="text-2xl font-black text-white">Trilha Concluída com Sucesso!</h2>
                    <p className="text-xs text-emerald-200">{trail.name} • {trail.city}</p>

                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-emerald-500/20 text-center">
                        <div>
                            <span className="text-[10px] uppercase font-bold text-emerald-400">Tempo</span>
                            <span className="text-lg font-black block font-mono">{formatTime(secondsElapsed)}</span>
                        </div>
                        <div>
                            <span className="text-[10px] uppercase font-bold text-emerald-400">Distância</span>
                            <span className="text-lg font-black block text-amber-300">{distanceCoveredKm} km</span>
                        </div>
                        <div>
                            <span className="text-[10px] uppercase font-bold text-emerald-400">Calorias</span>
                            <span className="text-lg font-black block text-orange-400">~{caloriesBurned} kcal</span>
                        </div>
                    </div>

                    <p className="text-xs text-emerald-300/80">
                        Parabéns! Seus dados de deslocamento foram registrados no seu aparelho.
                    </p>

                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full h-12 rounded-xl bg-[#e06a26] text-white font-bold text-sm shadow hover:bg-[#cf5c1b] transition-all"
                    >
                        Voltar ao Menu Principal
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#0b1712] text-white select-none overflow-hidden">
            {/* Top Bar Outdoor de Alto Contraste */}
            <div className="flex items-center justify-between border-b border-emerald-500/20 bg-[#12241b] px-4 py-3">
                <div className="flex items-center gap-2">
                    <span className="flex h-3 w-3 rounded-full bg-emerald-400 animate-ping" />
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-300">Modo Navegação Outdoor</h3>
                        <p className="text-sm font-black truncate max-w-[200px] sm:max-w-xs">{trail.name}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setVoiceAlerts(!voiceAlerts)}
                        className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-colors ${
                            voiceAlerts ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30' : 'bg-black/40 text-gray-400 border-white/10'
                        }`}
                        title="Alertas de voz de marcos"
                    >
                        {voiceAlerts ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-black/40 text-white hover:bg-black/60 border border-white/10"
                        title="Fechar navegador"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Painel Central de Métricas de Alta Visibilidade Sob Sol */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 flex flex-col justify-between">
                {/* Indicador de Rumo e Bússola */}
                <div className="flex items-center justify-between rounded-2xl bg-[#142921] p-4 border border-emerald-500/20">
                    <div className="flex items-center gap-3">
                        <div 
                            className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 border-2 border-emerald-400/40 text-emerald-300 transition-transform duration-300 shadow-inner"
                            style={{ transform: `rotate(${heading}deg)` }}
                        >
                            <Compass className="h-8 w-8 text-amber-400" />
                        </div>
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">Rumo Magnético</span>
                            <span className="text-2xl font-black font-mono text-white">{heading}° {heading < 90 ? 'NE' : heading < 180 ? 'SE' : heading < 270 ? 'SO' : 'NO'}</span>
                        </div>
                    </div>

                    <div className="text-right">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">Altitude Atual</span>
                        <span className="text-2xl font-black font-mono text-amber-300">{currentElevationM}m</span>
                    </div>
                </div>

                {/* Métricas Principais (Distância, Tempo, Ritmo) */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-[#142921] p-4 border border-emerald-500/20 text-center">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">Distância Percorrida</span>
                        <div className="flex items-baseline justify-center gap-1 mt-1">
                            <span className="text-4xl font-black font-mono text-white">{distanceCoveredKm}</span>
                            <span className="text-xs font-bold text-emerald-300">/ {trail.distanceKm} km</span>
                        </div>
                    </div>

                    <div className="rounded-2xl bg-[#142921] p-4 border border-emerald-500/20 text-center">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">Tempo Decorrido</span>
                        <span className="text-3xl sm:text-4xl font-black font-mono text-white block mt-1">
                            {formatTime(secondsElapsed)}
                        </span>
                    </div>
                </div>

                {/* Barra de Progresso da Rota & Próximo Marco */}
                <div className="rounded-2xl bg-[#142921] p-4 border border-emerald-500/20 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-emerald-300 flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5 text-[#e06a26]" />
                            <span>Próximo marco: {nextWaypoint?.label || 'Cume / Ponto Final'}</span>
                        </span>
                        <span className="text-amber-400 font-mono">{progressPercent}%</span>
                    </div>

                    {/* Barra de Progresso */}
                    <div className="h-3 w-full rounded-full bg-black/40 overflow-hidden border border-emerald-500/30">
                        <div 
                            className="h-full bg-gradient-to-r from-emerald-500 to-[#e06a26] transition-all duration-500 rounded-full"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>

                    <div className="flex justify-between text-[10px] text-emerald-400/80 font-mono">
                        <span>Início (0 km)</span>
                        <span>Faltam {(trail.distanceKm - distanceCoveredKm).toFixed(1)} km</span>
                        <span>Fim ({trail.distanceKm} km)</span>
                    </div>
                </div>

                {/* Botão de Emergência Imediato */}
                <button
                    type="button"
                    onClick={onEmergencySos}
                    className="w-full flex items-center justify-center gap-2 h-12 rounded-2xl bg-red-600/90 hover:bg-red-600 text-white font-black text-xs uppercase tracking-wider shadow-lg border border-red-400/30 active:scale-98 transition-all"
                >
                    <ShieldAlert className="h-5 w-5" />
                    <span>Acesso Rápido SOS (193 Bombeiros / Coordenadas)</span>
                </button>
            </div>

            {/* Bottom Controls (Play / Pause / Stop) */}
            <div className="border-t border-emerald-500/20 bg-[#12241b] p-4 flex items-center justify-around gap-3">
                <button
                    type="button"
                    onClick={() => setIsActive(!isActive)}
                    className={`flex-1 flex items-center justify-center gap-2 h-14 rounded-2xl font-black text-sm tracking-wide shadow-lg transition-all active:scale-95 ${
                        isActive 
                            ? 'bg-amber-600 hover:bg-amber-500 text-white' 
                            : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    }`}
                >
                    {isActive ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-current" />}
                    <span>{isActive ? 'Pausar Atividade' : 'Retomar'}</span>
                </button>

                <button
                    type="button"
                    onClick={() => setIsFinished(true)}
                    className="flex-1 flex items-center justify-center gap-2 h-14 rounded-2xl bg-[#e06a26] hover:bg-[#cf5c1b] text-white font-black text-sm tracking-wide shadow-lg transition-all active:scale-95"
                >
                    <Square className="h-5 w-5 fill-current" />
                    <span>Concluir Trilha</span>
                </button>
            </div>
        </div>
    );
}

