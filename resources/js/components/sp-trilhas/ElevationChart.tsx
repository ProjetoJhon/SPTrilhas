import React from 'react';
import { ElevationPoint } from '@/types/trail';

interface ElevationChartProps {
    points: ElevationPoint[];
    maxAltitude: number;
}

export function ElevationChart({ points, maxAltitude }: ElevationChartProps) {
    if (!points || points.length < 2) return null;

    const minElev = Math.min(...points.map((p) => p.elevationM));
    const maxElev = Math.max(...points.map((p) => p.elevationM), maxAltitude);
    const elevRange = maxElev - minElev || 1;

    const maxDist = points[points.length - 1].distanceKm || 1;

    const width = 600;
    const height = 180;
    const padding = { top: 25, right: 30, bottom: 35, left: 45 };

    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    const getX = (dist: number) => padding.left + (dist / maxDist) * chartW;
    const getY = (elev: number) => padding.top + chartH - ((elev - minElev) / elevRange) * chartH;

    const pathPoints = points.map((p) => `${getX(p.distanceKm)},${getY(p.elevationM)}`).join(' L ');
    const linePath = `M ${pathPoints}`;
    const areaPath = `M ${getX(points[0].distanceKm)},${padding.top + chartH} L ${pathPoints} L ${getX(points[points.length - 1].distanceKm)},${padding.top + chartH} Z`;

    return (
        <div className="w-full overflow-hidden rounded-xl bg-[#14261e] p-4 text-emerald-50 shadow-inner">
            <div className="mb-2 flex items-center justify-between text-xs text-emerald-300">
                <span className="font-semibold uppercase tracking-wider">Perfil Altimétrico (Relevo)</span>
                <span>
                    Cota máx: <strong className="text-amber-400">{maxElev}m</strong> | Mín: <strong>{minElev}m</strong>
                </span>
            </div>

            <div className="relative w-full aspect-[600/180]">
                <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full overflow-visible">
                    <defs>
                        <linearGradient id="elevationGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#e06a26" stopOpacity="0.45" />
                            <stop offset="60%" stopColor="#10b981" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#064e3b" stopOpacity="0.05" />
                        </linearGradient>
                    </defs>

                    {/* Linhas de grade horizontais */}
                    {[0, 0.5, 1].map((ratio) => {
                        const y = padding.top + chartH * ratio;
                        const elev = Math.round(maxElev - ratio * elevRange);
                        return (
                            <g key={ratio}>
                                <line
                                    x1={padding.left}
                                    y1={y}
                                    x2={width - padding.right}
                                    y2={y}
                                    stroke="#1e3e31"
                                    strokeDasharray="3 3"
                                />
                                <text
                                    x={padding.left - 8}
                                    y={y + 4}
                                    fontSize="10"
                                    fill="#6ee7b7"
                                    textAnchor="end"
                                    className="font-mono opacity-70"
                                >
                                    {elev}m
                                </text>
                            </g>
                        );
                    })}

                    {/* Área sombreada */}
                    <path d={areaPath} fill="url(#elevationGradient)" />

                    {/* Linha do terreno */}
                    <path
                        d={linePath}
                        fill="none"
                        stroke="#e06a26"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Marcadores de pontos */}
                    {points.map((p, i) => {
                        const cx = getX(p.distanceKm);
                        const cy = getY(p.elevationM);
                        return (
                            <g key={i} className="group cursor-pointer">
                                <circle
                                    cx={cx}
                                    cy={cy}
                                    r="4.5"
                                    className="fill-amber-400 stroke-[#14261e] stroke-2 transition-transform duration-200 group-hover:scale-125"
                                />
                                {p.label && (
                                    <text
                                        x={cx}
                                        y={cy - 10}
                                        fontSize="9"
                                        fill="#e2e8f0"
                                        textAnchor={i === 0 ? 'start' : i === points.length - 1 ? 'end' : 'middle'}
                                        className="font-medium drop-shadow"
                                    >
                                        {p.label}
                                    </text>
                                )}
                            </g>
                        );
                    })}

                    {/* Eixo de distância */}
                    <text
                        x={padding.left}
                        y={height - 8}
                        fontSize="10"
                        fill="#94a3b8"
                        textAnchor="start"
                        className="font-mono"
                    >
                        0 km
                    </text>
                    <text
                        x={width - padding.right}
                        y={height - 8}
                        fontSize="10"
                        fill="#94a3b8"
                        textAnchor="end"
                        className="font-mono"
                    >
                        {maxDist} km
                    </text>
                </svg>
            </div>
        </div>
    );
}

