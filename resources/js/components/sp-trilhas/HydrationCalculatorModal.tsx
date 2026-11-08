import React, { useState, useMemo } from 'react';
import { Trail } from '@/types/trail';
import { 
    Droplets, 
    X, 
    Thermometer, 
    Scale, 
    Clock, 
    CheckSquare, 
    Square, 
    ShieldCheck, 
    Backpack,
    AlertCircle
} from 'lucide-react';

interface HydrationCalculatorModalProps {
    isOpen: boolean;
    onClose: () => void;
    trails: Trail[];
    initialTrailId?: string;
}

export function HydrationCalculatorModal({
    isOpen,
    onClose,
    trails,
    initialTrailId
}: HydrationCalculatorModalProps) {
    const [selectedTrailId, setSelectedTrailId] = useState<string>(initialTrailId || trails[0]?.id || '');
    const [temperature, setTemperature] = useState<'mild' | 'warm' | 'hot'>('warm');
    const [bodyWeightKg, setBodyWeightKg] = useState<number>(75);
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
        water: true,
        boots: true,
        firstAid: false,
        headlamp: false,
        windbreaker: false,
        trashBag: true,
        sunscreen: true
    });

    if (!isOpen) return null;

    const currentTrail = trails.find((t) => t.id === selectedTrailId) || trails[0];

    // Cálculo da necessidade hídrica (Fórmula de Medicina de Montanha):
    // Base: 400ml/hora de atividade leve
    // Multiplicador de calor: mild (1.0x), warm (1.35x), hot (1.7x)
    // Multiplicador de inclinação/desnível: cada 300m de subida adiciona 250ml
    const calculatedWaterLiters = useMemo(() => {
        if (!currentTrail) return 2.0;
        const tempMultiplier = temperature === 'mild' ? 1.0 : temperature === 'warm' ? 1.35 : 1.7;
        const elevationAddition = (currentTrail.elevationGainM / 300) * 0.25;
        const baseWater = (currentTrail.durationHours * 0.45 * tempMultiplier) + elevationAddition;
        return Math.max(1.5, Math.round(baseWater * 10) / 10);
    }, [currentTrail, temperature]);

    const toggleCheck = (key: string) => {
        setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const checklist = [
        { key: 'water', label: `Água calculada (${calculatedWaterLiters} Litros)`, critical: true },
        { key: 'boots', label: 'Calçado fechado com solado aderente (amaciado)', critical: true },
        { key: 'headlamp', label: 'Lanterna de cabeça com pilhas reservas', critical: currentTrail.durationHours > 3 },
        { key: 'firstAid', label: 'Kit de primeiros socorros & antialérgico', critical: true },
        { key: 'windbreaker', label: 'Corta-vento / Anorak para o cume', critical: currentTrail.elevationGainM > 300 },
        { key: 'sunscreen', label: 'Protetor solar e repelente contra insetos', critical: false },
        { key: 'trashBag', label: 'Saco estanque para trazer todo seu lixo de volta', critical: true }
    ];

    const completedCount = checklist.filter((item) => checkedItems[item.key]).length;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200">
            <div 
                className="relative flex flex-col w-full max-w-lg rounded-3xl bg-[#f5f7f4] text-[#1b2b23] shadow-2xl border border-[#d2dbd0] overflow-hidden dark:bg-[#121f19] dark:text-[#ecf4ee] dark:border-[#24352c]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#d6ddd4] bg-[#162920] px-5 py-4 text-white dark:border-[#24352c]">
                    <div className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
                            <Droplets className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="text-base font-black text-white">Calculadora Outdoor & Mochila</h3>
                            <p className="text-[11px] text-emerald-300">Estimativa de segurança hídrica e checklist</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Conteúdo */}
                <div className="p-5 space-y-5 max-h-[80vh] overflow-y-auto text-xs sm:text-sm">
                    {/* Seleção da Trilha */}
                    <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#52645a] dark:text-[#9bb2a4] mb-1.5">
                            Trilha Selecionada
                        </label>
                        <select
                            value={selectedTrailId}
                            onChange={(e) => setSelectedTrailId(e.target.value)}
                            className="w-full rounded-xl border border-[#d0d8ce] bg-white p-2.5 text-xs font-semibold text-[#142921] shadow-sm outline-none focus:border-[#e06a26] dark:border-[#273830] dark:bg-[#16241e] dark:text-white"
                        >
                            {trails.map((t) => (
                                <option key={t.id} value={t.id}>
                                    {t.name} ({t.distanceKm}km, +{t.elevationGainM}m, {t.durationHours}h)
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Temperatura do Dia */}
                    <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#52645a] dark:text-[#9bb2a4] mb-1.5 flex items-center gap-1">
                            <Thermometer className="h-3.5 w-3.5" />
                            <span>Temperatura Esperada Durante a Subida</span>
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            <button
                                type="button"
                                onClick={() => setTemperature('mild')}
                                className={`rounded-xl p-2.5 text-center font-bold transition-all border ${
                                    temperature === 'mild'
                                        ? 'border-sky-500 bg-sky-100 text-sky-900 shadow-sm dark:bg-sky-950 dark:text-sky-300'
                                        : 'border-[#d0d8ce] bg-white text-[#384b40] hover:bg-[#e8ede6] dark:border-[#273830] dark:bg-[#16241e] dark:text-[#c4d6cb]'
                                }`}
                            >
                                <span className="block text-xs font-black">Fresco</span>
                                <span className="text-[10px] opacity-75">&lt; 22°C</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setTemperature('warm')}
                                className={`rounded-xl p-2.5 text-center font-bold transition-all border ${
                                    temperature === 'warm'
                                        ? 'border-amber-500 bg-amber-100 text-amber-900 shadow-sm dark:bg-amber-950 dark:text-amber-300'
                                        : 'border-[#d0d8ce] bg-white text-[#384b40] hover:bg-[#e8ede6] dark:border-[#273830] dark:bg-[#16241e] dark:text-[#c4d6cb]'
                                }`}
                            >
                                <span className="block text-xs font-black">Moderado</span>
                                <span className="text-[10px] opacity-75">23°C a 29°C</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setTemperature('hot')}
                                className={`rounded-xl p-2.5 text-center font-bold transition-all border ${
                                    temperature === 'hot'
                                        ? 'border-red-500 bg-red-100 text-red-900 shadow-sm dark:bg-red-950 dark:text-red-300'
                                        : 'border-[#d0d8ce] bg-white text-[#384b40] hover:bg-[#e8ede6] dark:border-[#273830] dark:bg-[#16241e] dark:text-[#c4d6cb]'
                                }`}
                            >
                                <span className="block text-xs font-black">Calor Intenso</span>
                                <span className="text-[10px] opacity-75">&gt; 30°C</span>
                            </button>
                        </div>
                    </div>

                    {/* Resultado Hídrico em Destaque */}
                    <div className="rounded-2xl border border-sky-300 bg-sky-50/90 p-4 text-sky-950 shadow-sm dark:border-sky-900/50 dark:bg-sky-950/40 dark:text-sky-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-[10px] uppercase font-bold text-sky-700 dark:text-sky-400">
                                    Volume de Água Recomendado
                                </span>
                                <div className="flex items-baseline gap-1 mt-0.5">
                                    <span className="text-3xl font-black text-sky-800 dark:text-sky-300">
                                        {calculatedWaterLiters}
                                    </span>
                                    <span className="text-sm font-bold">Litros por pessoa</span>
                                </div>
                            </div>
                            <div className="h-12 w-12 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-600 dark:text-sky-300">
                                <Droplets className="h-6 w-6" />
                            </div>
                        </div>

                        <p className="mt-2 text-[11px] text-sky-800/80 dark:text-sky-300/80 leading-relaxed">
                            {currentTrail.hasWaterPoint
                                ? '✓ Esta trilha possui ponto de água potável ou nascente confiável no caminho para reabastecimento.'
                                : '⚠️ Atenção: Não há fontes de água potável no percurso. Você deve carregar todo o volume desde o início.'}
                        </p>
                    </div>

                    {/* Checklist da Mochila */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#52645a] dark:text-[#9bb2a4] flex items-center gap-1.5">
                                <Backpack className="h-3.5 w-3.5" />
                                <span>Checklist Obrigatório da Mochila</span>
                            </span>
                            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                                {completedCount} de {checklist.length} itens prontos
                            </span>
                        </div>

                        <div className="space-y-1.5 rounded-2xl border border-[#d6ddd4] bg-white p-3 dark:border-[#273830] dark:bg-[#16241e]">
                            {checklist.map((item) => {
                                const isChecked = !!checkedItems[item.key];
                                return (
                                    <div
                                        key={item.key}
                                        onClick={() => toggleCheck(item.key)}
                                        className="flex items-center gap-2.5 p-2 rounded-xl cursor-pointer hover:bg-[#f5f7f4] dark:hover:bg-[#1a2b22] transition-colors"
                                    >
                                        {isChecked ? (
                                            <CheckSquare className="h-4 w-4 text-[#e06a26] shrink-0" />
                                        ) : (
                                            <Square className="h-4 w-4 text-[#94a39b] shrink-0" />
                                        )}
                                        <span className={`text-xs font-medium flex-1 ${isChecked ? 'line-through text-[#8fa096]' : 'text-[#1c2c24] dark:text-[#ecf4ee]'}`}>
                                            {item.label}
                                        </span>
                                        {item.critical && (
                                            <span className="rounded bg-rose-100 px-1.5 py-0.5 text-[9px] font-bold text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                                                Crítico
                                            </span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Rodapé com Fechar */}
                <div className="border-t border-[#d6ddd4] bg-white p-4 dark:border-[#24352c] dark:bg-[#14221c]">
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full flex items-center justify-center h-12 rounded-xl bg-[#142921] text-white font-bold text-xs uppercase tracking-wider shadow hover:bg-[#1d3a2f] active:scale-[0.98] transition-all"
                    >
                        Tudo Pronto para a Aventura
                    </button>
                </div>
            </div>
        </div>
    );
}

