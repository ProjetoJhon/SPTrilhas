import React from 'react';
import { Trees, Search, X, Wifi, WifiOff, Sun, Moon, Sparkles } from 'lucide-react';

interface HeaderProps {
    searchQuery: string;
    onSearchChange: (q: string) => void;
    isOnline: boolean;
    darkMode: boolean;
    onToggleDarkMode: () => void;
    onOpenCalculator: () => void;
}

export function Header({
    searchQuery,
    onSearchChange,
    isOnline,
    darkMode,
    onToggleDarkMode,
    onOpenCalculator
}: HeaderProps) {
    return (
        <header className="sticky top-0 z-30 border-b border-[#21382e] bg-[#142921] px-4 py-3.5 text-white shadow-md">
            <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
                {/* Logo & Marca SP Trilhas */}
                <div className="flex items-center gap-2.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#10b981] to-[#047857] text-[#12241b] shadow-md shadow-emerald-950/40">
                        <Trees className="h-6 w-6 stroke-[2.3]" />
                    </div>
                    <div>
                        <div className="flex items-center gap-1.5">
                            <h1 className="text-lg font-black tracking-tight text-white">
                                SP <span className="text-[#e06a26]">Trilhas</span>
                            </h1>
                            <span className="rounded-md bg-[#e06a26]/20 px-1.5 py-0.5 text-[10px] font-bold text-[#f58e53] border border-[#e06a26]/40 uppercase">
                                Ecoturismo
                            </span>
                        </div>
                        <p className="text-[11px] text-emerald-300/80 font-medium hidden sm:block">
                            Capital • Interior • Litoral Paulista
                        </p>
                    </div>
                </div>

                {/* Status de Conexão e Toggle de Contraste Solar */}
                <div className="flex items-center gap-2">
                    {/* Badge de Conectividade */}
                    <div
                        className={`hidden sm:flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold backdrop-blur-md border ${
                            isOnline
                                ? 'bg-emerald-950/70 text-emerald-300 border-emerald-500/30'
                                : 'bg-amber-950/70 text-amber-300 border-amber-500/30'
                        }`}
                        title={isOnline ? 'Conexão ativa' : 'Modo Offline Ativado'}
                    >
                        {isOnline ? <Wifi className="h-3.5 w-3.5" /> : <WifiOff className="h-3.5 w-3.5" />}
                        <span>{isOnline ? 'Online' : 'Offline'}</span>
                    </div>

                    {/* Alternador de Modo de Luz Solar */}
                    <button
                        type="button"
                        onClick={onToggleDarkMode}
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1d382e] text-emerald-200 hover:text-white border border-emerald-500/20 transition-all active:scale-95"
                        title={darkMode ? 'Modo Anti-Reflexo Solar (Claro)' : 'Modo Noturno (Escuro)'}
                    >
                        {darkMode ? <Sun className="h-4 w-4 text-amber-300" /> : <Moon className="h-4 w-4" />}
                    </button>
                </div>
            </div>

            {/* Barra de Busca Dinâmica */}
            <div className="mx-auto mt-3 max-w-5xl">
                <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Buscar por trilha, parque, cachoeira ou cidade (ex: Atibaia, Bonete, Jaraguá)..."
                        className="w-full rounded-xl border border-emerald-500/30 bg-[#1a342a] py-2.5 pl-10 pr-9 text-xs sm:text-sm text-white placeholder-emerald-300/50 outline-none transition-all focus:border-[#e06a26] focus:ring-2 focus:ring-[#e06a26]/30"
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={() => onSearchChange('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-300/70 hover:text-white"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}

