import React, { useState } from 'react';
import { Trail } from '@/types/trail';
import { 
    CloudSun, 
    Droplets, 
    Wind, 
    Sun, 
    AlertTriangle, 
    CheckCircle, 
    MessageSquare, 
    ThumbsUp, 
    Send,
    UserCheck
} from 'lucide-react';

interface TrailConditionsWidgetProps {
    trail: Trail;
}

interface TrailReport {
    id: string;
    author: string;
    date: string;
    status: 'good' | 'muddy' | 'caution';
    statusLabel: string;
    comment: string;
    likes: number;
}

export function TrailConditionsWidget({ trail }: TrailConditionsWidgetProps) {
    // Estimativas meteorológicas com base no ecossistema e altitude da região
    const weatherData = React.useMemo(() => {
        if (trail.region === 'litoral') {
            return {
                temp: '27°C',
                condition: 'Sol entre nuvens & brisa marítima',
                rainChance: '25%',
                uvIndex: '8 (Muito Alto - use protetor solar FPS 50+)',
                wind: '14 km/h Sudeste',
                waterTemp: '24°C (Ideal para banho)',
                alert: 'Atenção aos borrachudos em áreas de cachoeira.'
            };
        } else if (trail.region === 'interior') {
            return {
                temp: '22°C (Cume pode chegar a 14°C)',
                condition: 'Céu aberto com ventos de altitude',
                rainChance: '15%',
                uvIndex: '9 (Extremo na rocha exposta)',
                wind: '22 km/h Noroeste (Rajadas no cume)',
                waterTemp: null,
                alert: 'Ventos fortes no platô rochoso. Leve casaco corta-vento.'
            };
        } else {
            return {
                temp: '24°C',
                condition: 'Tempo estável sob copa de mata nativa',
                rainChance: '20%',
                uvIndex: '7 (Alto)',
                wind: '10 km/h',
                waterTemp: null,
                alert: 'Sombra florestal agradável com umidade natural da mata.'
            };
        }
    }, [trail.region]);

    // Relatos pré-carregados da comunidade Wikiloc
    const [reports, setReports] = useState<TrailReport[]>([
        {
            id: '1',
            author: 'Marcos TrailRunner (Wikiloc)',
            date: 'Ontem às 16:30',
            status: 'good',
            statusLabel: 'Trilha Limpa & Excelente',
            comment: 'Subi pela manhã bem cedo. Terreno seco, água da nascente correndo limpa e céu sem nuvens no cume. Visual incrível!',
            likes: 14
        },
        {
            id: '2',
            author: 'Beatriz Ecoturismo',
            date: 'Há 2 dias',
            status: trail.hasWaterfall ? 'caution' : 'good',
            statusLabel: trail.hasWaterfall ? 'Atenção: Pedras Lisas' : 'Condição Boa',
            comment: trail.hasWaterfall
                ? 'Muita água na cachoeira! Atenção redobrada nas pedras úmidas do costão perto da queda. Bastão de caminhada ajudou muito.'
                : 'Brisa refrescante no topo. Levei 2L de água e foi a conta certa. Recomendo sair antes do meio-dia.',
            likes: 9
        }
    ]);

    const [newComment, setNewComment] = useState('');
    const [selectedStatus, setSelectedStatus] = useState<'good' | 'muddy' | 'caution'>('good');
    const [showForm, setShowForm] = useState(false);

    const handleSubmitReport = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const report: TrailReport = {
            id: String(Date.now()),
            author: 'Você (Trilheiro Local)',
            date: 'Agora mesmo',
            status: selectedStatus,
            statusLabel: selectedStatus === 'good' ? 'Excelente' : selectedStatus === 'muddy' ? 'Com Lama / Barrento' : 'Atenção Requerida',
            comment: newComment.trim(),
            likes: 1
        };

        setReports([report, ...reports]);
        setNewComment('');
        setShowForm(false);
    };

    return (
        <div className="space-y-4">
            {/* Box Meteorológico da Região */}
            <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-[#14261e] to-[#1c362b] p-4 text-white shadow-md">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <CloudSun className="h-5 w-5 text-amber-400" />
                        <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                            Condições Meteorológicas Previstas
                        </h4>
                    </div>
                    <span className="text-lg font-black text-amber-300 font-mono">
                        {weatherData.temp}
                    </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                    <div className="rounded-xl bg-black/25 p-2.5 border border-white/5">
                        <span className="text-[10px] uppercase font-bold text-emerald-400/80 block">Condição</span>
                        <span className="font-semibold text-white truncate block">{weatherData.condition}</span>
                    </div>

                    <div className="rounded-xl bg-black/25 p-2.5 border border-white/5">
                        <span className="text-[10px] uppercase font-bold text-emerald-400/80 block">Chuva</span>
                        <span className="font-semibold text-white">{weatherData.rainChance} de probabilidade</span>
                    </div>

                    <div className="rounded-xl bg-black/25 p-2.5 border border-white/5 col-span-2 sm:col-span-1">
                        <span className="text-[10px] uppercase font-bold text-emerald-400/80 block">Vento</span>
                        <span className="font-semibold text-white">{weatherData.wind}</span>
                    </div>
                </div>

                <div className="mt-3 flex items-start gap-2 text-[11px] text-amber-200 bg-amber-950/40 border border-amber-500/20 rounded-xl p-2.5">
                    <AlertTriangle className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
                    <span>{weatherData.alert}</span>
                </div>
            </div>

            {/* Relatos Comunitários Recentes (Crowd Reporting) */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#1e3a2f] dark:text-emerald-400 flex items-center gap-1.5">
                        <MessageSquare className="h-4 w-4" />
                        <span>Relatos de Quem Fez a Trilha Recentemente</span>
                    </h4>
                    <button
                        type="button"
                        onClick={() => setShowForm(!showForm)}
                        className="text-xs font-bold text-[#e06a26] hover:underline"
                    >
                        {showForm ? 'Cancelar' : '+ Enviar Meu Relato'}
                    </button>
                </div>

                {/* Formulário de Envio de Relato */}
                {showForm && (
                    <form onSubmit={handleSubmitReport} className="rounded-2xl border border-[#d6ddd4] bg-white p-3.5 dark:border-[#273830] dark:bg-[#16241e] space-y-2.5">
                        <span className="text-xs font-bold block text-[#142921] dark:text-white">Como está a trilha hoje?</span>
                        <div className="flex gap-1.5">
                            <button
                                type="button"
                                onClick={() => setSelectedStatus('good')}
                                className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                                    selectedStatus === 'good' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                                }`}
                            >
                                ✓ Boa / Limpa
                            </button>
                            <button
                                type="button"
                                onClick={() => setSelectedStatus('muddy')}
                                className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                                    selectedStatus === 'muddy' ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                                }`}
                            >
                                ⚠️ Com Lama
                            </button>
                            <button
                                type="button"
                                onClick={() => setSelectedStatus('caution')}
                                className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                                    selectedStatus === 'caution' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                                }`}
                            >
                                🛑 Obstáculo / Atenção
                            </button>
                        </div>
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Ex: Rio com água cristalina, trilha bem demarcada, poucos mosquitos..."
                            className="w-full rounded-xl border border-gray-200 p-2.5 text-xs outline-none focus:border-[#e06a26] dark:border-gray-700 dark:bg-[#121d18] dark:text-white"
                            rows={2}
                        />
                        <button
                            type="submit"
                            className="flex items-center justify-center gap-1.5 rounded-xl bg-[#e06a26] px-4 py-2 text-xs font-bold text-white shadow hover:bg-[#cf5c1b] transition-all"
                        >
                            <Send className="h-3.5 w-3.5" />
                            <span>Publicar Relato</span>
                        </button>
                    </form>
                )}

                {/* Lista de Relatos */}
                <div className="space-y-2">
                    {reports.map((r) => (
                        <div
                            key={r.id}
                            className="rounded-2xl border border-[#d6ddd4] bg-white p-3 dark:border-[#273830] dark:bg-[#16241e] text-xs space-y-1.5"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                    <UserCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                                    <span className="font-bold text-[#142921] dark:text-white">{r.author}</span>
                                    <span className="text-[#889b90]">• {r.date}</span>
                                </div>
                                <span
                                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                        r.status === 'good'
                                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                            : r.status === 'muddy'
                                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                                            : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                                    }`}
                                >
                                    {r.statusLabel}
                                </span>
                            </div>
                            <p className="text-[#3b4d43] dark:text-[#c4d6cb] leading-relaxed">{r.comment}</p>
                            <div className="flex items-center gap-1 text-[11px] text-[#718579] dark:text-[#8ea496] pt-0.5">
                                <ThumbsUp className="h-3 w-3 text-emerald-600" />
                                <span>{r.likes} trilheiros acharam útil</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

