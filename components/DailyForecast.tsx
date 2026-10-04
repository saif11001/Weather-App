import IconBadge from "./IconBadge";
import type { DailyItem } from "@/types/weather";

export default function DailyForecast({ items }: { items: DailyItem[] }) {
    return (
        <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                5-day forecast
            </p>
            <div className="flex flex-col divide-y divide-slate-200 dark:divide-white/5">
                {items.map((d, i) => (
                    <div key={i} className="flex items-center justify-between py-1.5">
                        <span className="w-9 text-xs text-slate-700 dark:text-slate-200">{d.day}</span>
                        <IconBadge icon={d.icon} size="w-7 h-7" imgSize="w-4 h-4" />
                        <span className="w-6 text-right text-xs text-slate-400">{d.minTemp}°</span>
                        <span className="w-6 text-right text-xs font-medium text-slate-800 dark:text-white">{d.maxTemp}°</span>
                    </div>
                ))}
            </div>
        </div>
    );
}