import React from 'react';
import { Trail } from '@/types/trail';
import { TrailCard } from './TrailCard';
import { 
    DownloadCloud, 
    HardDrive, 
    WifiOff, 
    Trash2, 
    FileText, 
    CheckCircle, 
    AlertCircle 
} from 'lucide-react';

interface OfflineVaultProps {
    savedTrails: Trail[];
    onSelectTrail: (trail: Trail) => void;
    onRemoveTrail: (trailId: string) => void;
    onClearAll: () => void;
    onDownloadGpx: (trail: Trail) => void;
}

export function OfflineVault({
    savedTrails,
    onSelectTrail,
    onRemoveTrail,
    onClearAll,
    onDownloadGpx
}: OfflineVaultProps) {
    const estimatedStorageMb = (savedTrails.length * 1.8).toFixed(1);

    return (
        <div className="space-y-6">
            {/* Banner de Status Offline */}
            <div className="rounded-2xl border border-emerald-600/30 bg-[#162920] p-5 text-white shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            <WifiOff className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-white flex items-center gap-2">
                                <span>Cofre Offline de Trilhas</span>
                                <span className="rounded-full bg-emerald-500/30 px-2 py-0.5 text-[11px] font-semibold text-emerald-300">
                                    Sem Sinal / 100% Local
                                </span>
                            </h3>
                            <p className="text-xs text-emerald-200/80 mt-0.5">
                                As trilhas e mapas salvos aqui continuam acessíveis mesmo em áreas remotas da Serra do Mar ou Cantareira.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs border-t sm:border-t-0 sm:border-l border-emerald-500/30 pt-3 sm:pt-0 sm:pl-4">
                        <div className="flex flex-col">
                            <span className="text-emerald-300/70 text-[10px] uppercase font-bold">Armazenamento</span>
                            <span className="font-extrabold text-white text-sm">~{estimatedStorageMb} MB</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-emerald-300/70 text-[10px] uppercase font-bold">Trilhas Salvas</span>
                            <span className="font-extrabold text-amber-400 text-sm">{savedTrails.length} rotas</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lista de Trilhas Salvas */}
            {savedTrails.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#ccd4ca] bg-[#f5f7f4] py-16 px-4 text-center dark:border-[#273830] dark:bg-[#121f19]">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-[#1e3a2f] mb-3 dark:bg-emerald-950 dark:text-emerald-300">
                        <DownloadCloud className="h-8 w-8" />
                    </div>
                    <h4 className="text-base font-bold text-[#142921] dark:text-[#ecf4ee]">
                        Nenhuma trilha salva para uso offline
                    </h4>
                    <p className="max-w-md text-xs text-[#52645a] dark:text-[#9bb2a4] mt-1 mb-4">
                        Navegue pelas trilhas da Capital, Interior ou Litoral e clique no ícone de coração para salvar mapas, roteiros e gráficos de elevação na memória do seu aparelho.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-[#52645a] dark:text-[#9bb2a4]">
                        <span className="font-bold uppercase tracking-wider">
                            {savedTrails.length} {savedTrails.length === 1 ? 'Trilha Disponível' : 'Trilhas Disponíveis'}
                        </span>
                        <button
                            type="button"
                            onClick={onClearAll}
                            className="flex items-center gap-1 text-rose-600 hover:text-rose-700 font-semibold"
                        >
                            <Trash2 className="h-3.5 w-3.5" />
                            <span>Limpar Cofre</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {savedTrails.map((trail) => (
                            <div key={trail.id} className="relative">
                                <TrailCard
                                    trail={trail}
                                    isFavorite={true}
                                    onToggleFavorite={() => onRemoveTrail(trail.id)}
                                    onSelectTrail={onSelectTrail}
                                />
                                <div className="mt-1 flex items-center justify-between px-2 text-[11px] text-[#55695f] dark:text-[#9bb2a4]">
                                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                                        <CheckCircle className="h-3.5 w-3.5" />
                                        Cache offline pronto
                                    </span>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDownloadGpx(trail);
                                        }}
                                        className="font-bold text-[#e06a26] hover:underline flex items-center gap-0.5"
                                    >
                                        <FileText className="h-3 w-3" />
                                        Baixar GPX
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

