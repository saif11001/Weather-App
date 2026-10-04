import IconBadge from "./IconBadge";
import type { WeatherData } from "@/types/weather";

export default function CurrentWeather({ data }: { data: WeatherData }) {
    return (
        <div className="flex flex-col items-center text-center mb-3">
            <p className="text-slate-500 dark:text-slate-400 text-xs">
                {data.location} · Updated just now
            </p>
            <div className="my-1.5">
                <IconBadge icon={data.icon} size="w-16 h-16" imgSize="w-10 h-10" />
            </div>
            <p className="text-4xl font-semibold text-slate-800 dark:text-white leading-none">
                {data.temperature}°
            </p>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">{data.condition}</p>
        </div>
    );
}