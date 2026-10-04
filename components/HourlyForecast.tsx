import IconBadge from "./IconBadge";
import type { HourlyItem } from "@/types/weather";

export default function HourlyForecast({ items }: { items: HourlyItem[] }) {
    return (
        <div className="mb-4">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                Hourly forecast
            </p>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {items.map((h, i) => (
                    <div
                        key={i}
                        className="flex flex-col items-center gap-1 bg-white dark:bg-white/5 rounded-2xl px-2 py-2 min-w-13 shrink-0"
                    >
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">{h.time}</span>
                        <IconBadge icon={h.icon} size="w-7 h-7" imgSize="w-4 h-4" />
                        <span className="text-xs font-medium text-slate-800 dark:text-white">{h.temp}°</span>
                    </div>
                ))}
            </div>
        </div>
    );
}