import React from 'react';
import { Compass, Map, Heart, ShieldAlert } from 'lucide-react';

export type ActiveTab = 'explore' | 'map' | 'offline' | 'sos';

interface BottomNavProps {
    activeTab: ActiveTab;
    onChangeTab: (tab: ActiveTab) => void;
    offlineCount: number;
}

export function BottomNav({ activeTab, onChangeTab, offlineCount }: BottomNavProps) {
    const tabs = [
        {
            id: 'explore' as ActiveTab,
            label: 'Explorar',
            icon: Compass
        },
        {
            id: 'map' as ActiveTab,
            label: 'Mapa',
            icon: Map
        },
        {
            id: 'offline' as ActiveTab,
            label: 'Offline',
            icon: Heart,
            badge: offlineCount > 0 ? offlineCount : null
        },
        {
            id: 'sos' as ActiveTab,
            label: 'SOS & Ajuda',
            icon: ShieldAlert,
            isDestructive: true
        }
    ];

    return (
        <nav
            aria-label="Navegação Principal do Aplicativo"
            className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#d6ddd4] bg-[#f8faf7]/95 backdrop-blur-lg px-2 sm:px-6 py-2 pb-safe dark:border-[#24352c] dark:bg-[#121f19]/95"
        >
            <div className="mx-auto flex max-w-lg items-center justify-around">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    const Icon = tab.icon;

                    return (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => onChangeTab(tab.id)}
                            className={`relative flex min-h-[50px] min-w-[64px] flex-col items-center justify-center rounded-2xl py-1 text-xs font-bold transition-all duration-200 active:scale-95 ${
                                isActive
                                    ? tab.isDestructive
                                        ? 'text-red-600 dark:text-red-400'
                                        : 'text-[#e06a26] dark:text-[#f27e3d]'
                                    : 'text-[#5f7065] hover:text-[#1e3a2f] dark:text-[#8ea496] dark:hover:text-[#ecf4ee]'
                            }`}
                        >
                            {/* Indicador de fundo ativo */}
                            {isActive && (
                                <div
                                    className={`absolute inset-0 rounded-2xl opacity-15 ${
                                        tab.isDestructive ? 'bg-red-500' : 'bg-[#e06a26]'
                                    }`}
                                />
                            )}

                            <div className="relative">
                                <Icon className={`h-5 w-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />

                                {tab.badge && (
                                    <span className="absolute -top-1.5 -right-2.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-black text-white shadow">
                                        {tab.badge}
                                    </span>
                                )}
                            </div>

                            <span className="mt-1 text-[11px] tracking-tight">{tab.label}</span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}

