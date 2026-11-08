import React from 'react';
import { Trail } from '@/types/trail';
import { 
    Clock, 
    TrendingUp, 
    Navigation, 
    Heart, 
    Droplet, 
    ShieldAlert, 
    Signal, 
    Star 
} from 'lucide-react';

interface TrailCardProps {
    trail: Trail;
    isFavorite: boolean;
    onToggleFavorite: (trail: Trail, e: React.MouseEvent) => void;
    onSelectTrail: (trail: Trail) => void;
}

const DIFFICULTY_STYLES = {
    easy: {
        label: 'Fácil',
        badge: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
    },
    moderate: {
        label: 'Moderada',
        badge: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300'
    },
    hard: {
        label: 'Difícil',
        badge: 'bg-orange-100 text-orange-900 border-orange-300 dark:bg-orange-950 dark:text-orange-300'
    },
    extreme: {
        label: 'Extrema',
        badge: 'bg-red-100 text-red-900 border-red-300 dark:bg-red-950 dark:text-red-300'
    }
};

export function TrailCard({ trail, isFavorite, onToggleFavorite, onSelectTrail }: TrailCardProps) {
    const diff = DIFFICULTY_STYLES[trail.difficulty];

    return (
        <article
            onClick={() => onSelectTrail(trail)}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#d6ddd4] bg-[#f8faf7] text-[#1c2c24] shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#1e3a2f] hover:shadow-md cursor-pointer dark:border-[#273830] dark:bg-[#14221c] dark:text-[#ecf4ee]"
        >
            {/* Foto de Capa */}
            <div className="relative h-48 w-full overflow-hidden bg-[#1e3a2f]/20">
                <img
                    src={trail.coverImage}
                    alt={trail.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Gradiente de proteção para textos sobre a foto */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Badge de Dificuldade */}
                <div className="absolute top-3 left-3 flex gap-1.5">
                    <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider backdrop-blur-md ${diff.badge}`}>
                        {diff.label}
                    </span>
                    {trail.isProtectedArea && (
                        <span className="rounded-full border border-emerald-500/40 bg-[#14261e]/80 px-2 py-0.5 text-xs font-medium text-emerald-200 backdrop-blur-md">
                            Unid. Conservação
                        </span>
                    )}
                </div>

                {/* Botão de Favorito / Salvar Offline */}
                <button
                    type="button"
                    onClick={(e) => onToggleFavorite(trail, e)}
                    aria-label={isFavorite ? 'Remover dos favoritos' : 'Salvar offline'}
                    className={`absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 active:scale-90 ${
                        isFavorite 
                            ? 'bg-rose-500 text-white shadow-md' 
                            : 'bg-black/40 text-white/90 hover:bg-black/60 backdrop-blur-sm'
                    }`}
                >
                    <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>

                {/* Info no rodapé da imagem */}
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white">
                    <span className="text-xs font-medium tracking-wide drop-shadow-sm text-emerald-200">
                        {trail.city}
                    </span>
                    <div className="flex items-center gap-1 text-xs font-semibold text-amber-300 drop-shadow-sm">
                        <Star className="h-3.5 w-3.5 fill-current" />
                        <span>{trail.rating.toFixed(1)}</span>
                        <span className="text-white/70">({trail.reviewCount})</span>
                    </div>
                </div>
            </div>

            {/* Conteúdo do Card */}
            <div className="flex flex-1 flex-col p-4">
                <div className="mb-2">
                    <h3 className="line-clamp-1 text-base font-bold text-[#142921] group-hover:text-[#e06a26] transition-colors dark:text-[#ecf4ee]">
                        {trail.name}
                    </h3>
                    <p className="line-clamp-2 text-xs text-[#52645a] dark:text-[#9bb2a4] mt-0.5">
                        {trail.shortDescription}
                    </p>
                </div>

                {/* Métricas Essenciais Outdoor (Luz solar alta visibilidade) */}
                <div className="mt-auto grid grid-cols-3 gap-2 border-y border-[#e2e8e0] py-2.5 my-2 text-center text-xs dark:border-[#24352c]">
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] uppercase font-bold text-[#6d7e74] dark:text-[#889e92]">Distância</span>
                        <span className="font-bold text-[#142921] dark:text-[#f0f5f1] text-sm">{trail.distanceKm} km</span>
                    </div>
                    <div className="flex flex-col items-center border-x border-[#e2e8e0] dark:border-[#24352c]">
                        <span className="text-[10px] uppercase font-bold text-[#6d7e74] dark:text-[#889e92]">Desnível</span>
                        <span className="font-bold text-[#142921] dark:text-[#f0f5f1] text-sm">+{trail.elevationGainM}m</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] uppercase font-bold text-[#6d7e74] dark:text-[#889e92]">Tempo Est.</span>
                        <span className="font-bold text-[#142921] dark:text-[#f0f5f1] text-sm">{trail.durationHours}h</span>
                    </div>
                </div>

                {/* Ícones de infraestrutura rápida */}
                <div className="flex items-center justify-between pt-1 text-[11px] text-[#55695f] dark:text-[#9bb2a4]">
                    <div className="flex items-center gap-2">
                        {trail.hasWaterPoint && (
                            <span className="flex items-center gap-0.5 text-sky-700 dark:text-sky-400" title="Possui ponto de água potável">
                                <Droplet className="h-3.5 w-3.5" />
                                <span>Água</span>
                            </span>
                        )}
                        {trail.requiresGuide && (
                            <span className="flex items-center gap-0.5 text-amber-700 dark:text-amber-400" title="Exige monitor ou guia">
                                <ShieldAlert className="h-3.5 w-3.5" />
                                <span>Guia</span>
                            </span>
                        )}
                        <span className="flex items-center gap-0.5" title={`Sinal de celular: ${trail.hasCellphoneSignal}`}>
                            <Signal className="h-3.5 w-3.5" />
                            <span>{trail.hasCellphoneSignal === 'none' ? 'Sem sinal' : trail.hasCellphoneSignal === 'weak' ? 'Sinal fraco' : '4G/5G'}</span>
                        </span>
                    </div>

                    <span className="font-semibold text-[#e06a26] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        Ver detalhes &rarr;
                    </span>
                </div>
            </div>
        </article>
    );
}

