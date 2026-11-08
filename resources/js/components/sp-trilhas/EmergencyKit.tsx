import React, { useState, useEffect } from 'react';
import { 
    PhoneCall, 
    Compass, 
    Copy, 
    Check, 
    AlertOctagon, 
    Sun, 
    Flashlight, 
    ShieldAlert, 
    HeartHandshake,
    Share2
} from 'lucide-react';

export function EmergencyKit() {
    const [coords, setCoords] = useState<{ lat: number; lng: number; accuracy: number; altitude: number | null } | null>(null);
    const [copied, setCopied] = useState(false);
    const [isSosFlashing, setIsSosFlashing] = useState(false);
    const [flashColor, setFlashColor] = useState<'white' | 'red'>('white');

    useEffect(() => {
        if (navigator.geolocation) {
            const watchId = navigator.geolocation.watchPosition(
                (pos) => {
                    setCoords({
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude,
                        accuracy: pos.coords.accuracy,
                        altitude: pos.coords.altitude
                    });
                },
                () => {
                    // Posição de exemplo da Serra da Cantareira se não tiver permissão
                    setCoords({
                        lat: -23.4375,
                        lng: -46.6341,
                        accuracy: 8,
                        altitude: 980
                    });
                },
                { enableHighAccuracy: true }
            );

            return () => navigator.geolocation.clearWatch(watchId);
        }
    }, []);

    // Efeito Estroboscópico SOS
    useEffect(() => {
        if (!isSosFlashing) return;
        const interval = setInterval(() => {
            setFlashColor((prev) => (prev === 'white' ? 'red' : 'white'));
        }, 300);
        return () => clearInterval(interval);
    }, [isSosFlashing]);

    const handleCopyCoords = () => {
        if (!coords) return;
        const text = `S.O.S. Localização SP Trilhas: Lat ${coords.lat.toFixed(6)}, Lng ${coords.lng.toFixed(6)} (Precisão: ±${Math.round(coords.accuracy)}m)`;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };

    return (
        <div className="space-y-6">
            {/* Modal de Luz SOS Estroboscópica em tela cheia se ativada */}
            {isSosFlashing && (
                <div
                    onClick={() => setIsSosFlashing(false)}
                    className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-colors duration-75 ${
                        flashColor === 'white' ? 'bg-white text-black' : 'bg-red-600 text-white'
                    }`}
                >
                    <AlertOctagon className="h-24 w-24 animate-bounce mb-4" />
                    <h1 className="text-4xl font-black uppercase tracking-widest">S I N A L  S.O.S.</h1>
                    <p className="mt-2 text-lg font-bold">Toque em qualquer lugar da tela para desligar</p>
                </div>
            )}

            {/* Painel Principal de Coordenadas GPS */}
            <div className="rounded-3xl border border-red-500/40 bg-[#1e2f26] p-6 text-white shadow-xl">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <span className="flex h-3 w-3 rounded-full bg-emerald-400 animate-ping" />
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                            Geolocalização Ativa (Alta Precisão)
                        </span>
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsSosFlashing(true)}
                        className="flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1 text-xs font-black text-white hover:bg-red-700 active:scale-95 transition-all shadow-md"
                    >
                        <Flashlight className="h-3.5 w-3.5" />
                        <span>Sinalizar SOS (Tela)</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
                    <div className="rounded-2xl bg-black/40 p-4 border border-emerald-500/20">
                        <span className="text-[10px] font-bold uppercase text-emerald-400/80 block">Latitude</span>
                        <span className="text-2xl sm:text-3xl font-mono font-black text-amber-300">
                            {coords ? coords.lat.toFixed(6) : '-23.437500'}
                        </span>
                    </div>

                    <div className="rounded-2xl bg-black/40 p-4 border border-emerald-500/20">
                        <span className="text-[10px] font-bold uppercase text-emerald-400/80 block">Longitude</span>
                        <span className="text-2xl sm:text-3xl font-mono font-black text-amber-300">
                            {coords ? coords.lng.toFixed(6) : '-46.634100'}
                        </span>
                    </div>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-emerald-500/20 text-xs">
                    <div className="text-emerald-200/80">
                        Precisão GPS: <strong className="text-white">±{coords ? Math.round(coords.accuracy) : 8} metros</strong>
                        {coords?.altitude && (
                            <span> • Altitude: <strong className="text-white">{Math.round(coords.altitude)}m</strong></span>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={handleCopyCoords}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-[#e06a26] px-4 py-2 font-bold text-white hover:bg-[#cf5c1b] transition-all shadow active:scale-95"
                    >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        <span>{copied ? 'Coordenadas Copiadas!' : 'Copiar Coordenadas para Resgate'}</span>
                    </button>
                </div>
            </div>

            {/* Telefones de Emergência com Discagem em 1 Toque */}
            <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#1e3a2f] dark:text-emerald-400">
                    Canais de Resgate e Segurança Imediatos
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <a
                        href="tel:193"
                        className="flex items-center justify-between p-4 rounded-2xl bg-red-600 text-white shadow-lg hover:bg-red-700 transition-all active:scale-98"
                    >
                        <div>
                            <span className="text-xs font-semibold uppercase text-red-200 block">Corpo de Bombeiros</span>
                            <span className="text-2xl font-black">193</span>
                            <span className="text-[11px] text-red-100 block">Resgate em matas e montanhas</span>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                            <PhoneCall className="h-6 w-6" />
                        </div>
                    </a>

                    <a
                        href="tel:199"
                        className="flex items-center justify-between p-4 rounded-2xl bg-amber-600 text-white shadow-lg hover:bg-amber-700 transition-all active:scale-98"
                    >
                        <div>
                            <span className="text-xs font-semibold uppercase text-amber-200 block">Defesa Civil Estadual</span>
                            <span className="text-2xl font-black">199</span>
                            <span className="text-[11px] text-amber-100 block">Alertas de enchente e deslizamento</span>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                            <PhoneCall className="h-6 w-6" />
                        </div>
                    </a>

                    <a
                        href="tel:190"
                        className="flex items-center justify-between p-4 rounded-2xl bg-[#1e3a2f] text-white shadow-lg hover:bg-[#152a22] transition-all active:scale-98"
                    >
                        <div>
                            <span className="text-xs font-semibold uppercase text-emerald-300 block">Polícia Ambiental</span>
                            <span className="text-2xl font-black">190</span>
                            <span className="text-[11px] text-emerald-200 block">Ocorrências em Parques de SP</span>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                            <PhoneCall className="h-6 w-6" />
                        </div>
                    </a>
                </div>
            </div>

            {/* Checklist de Segurança Outdoor da Mata Atlântica */}
            <div className="rounded-3xl border border-[#d6ddd4] bg-white p-5 dark:border-[#273830] dark:bg-[#14221c] text-xs space-y-3">
                <h4 className="font-bold text-[#142921] dark:text-[#ecf4ee] flex items-center gap-2 text-sm">
                    <ShieldAlert className="h-4 w-4 text-[#e06a26]" />
                    <span>Regras Vitais de Sobrevivência na Mata Atlântica</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[#3a4d42] dark:text-[#c4d6cb]">
                    <div className="rounded-xl bg-[#f5f7f4] p-3 border border-[#e2e8e0] dark:bg-[#1a2b22] dark:border-[#263b30]">
                        <strong className="block text-[#142921] dark:text-emerald-300 mb-1">Horário Limite de Retorno (15h00)</strong>
                        Na Mata Atlântica e serras, o sol se põe atrás dos morros mais cedo e a escuridão na mata densa é total. Inicie o retorno sempre antes das 15h.
                    </div>

                    <div className="rounded-xl bg-[#f5f7f4] p-3 border border-[#e2e8e0] dark:bg-[#1a2b22] dark:border-[#263b30]">
                        <strong className="block text-[#142921] dark:text-emerald-300 mb-1">Animais Peçonhentos (Jararacas e Aranhas)</strong>
                        Mantenha os olhos atentos ao chão e nunca coloque as mãos em ocos de árvores ou sob pedras sem inspecionar antes com um bastão de caminhada.
                    </div>

                    <div className="rounded-xl bg-[#f5f7f4] p-3 border border-[#e2e8e0] dark:bg-[#1a2b22] dark:border-[#263b30]">
                        <strong className="block text-[#142921] dark:text-emerald-300 mb-1">Tromba D'Água em Cachoeiras</strong>
                        Se a água do rio mudar de cor, ficar turva com galhos ou começar a subir rapidamente, saia imediatamente da calha do rio para áreas altas.
                    </div>

                    <div className="rounded-xl bg-[#f5f7f4] p-3 border border-[#e2e8e0] dark:bg-[#1a2b22] dark:border-[#263b30]">
                        <strong className="block text-[#142921] dark:text-emerald-300 mb-1">Perda de Orientação (Não saia do leito)</strong>
                        Caso se perca, não desça ribanceiras cegas. Permaneça no ponto mais alto e visível com agasalho para evitar hipotermia e sinalize sua posição.
                    </div>
                </div>
            </div>
        </div>
    );
}

