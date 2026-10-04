import humidity_icon from "../Assets/humidity.png";
import wind_icon from "../Assets/wind.png";
import IconBadge from "./IconBadge";

interface WeatherStatsProps {
    humidity: number;
    windSpeed: number;
}

export default function WeatherStats({ humidity, windSpeed }: WeatherStatsProps) {
    return (
        <div className="flex justify-around mb-4">
            <div className="flex items-center gap-2">
                <IconBadge icon={humidity_icon} />
                <div className="text-left">
                    <p className="text-xs font-medium text-slate-700 dark:text-slate-200">{humidity}%</p>
                    <span className="text-[10px] text-slate-400">Humidity</span>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <IconBadge icon={wind_icon} />
                <div className="text-left">
                    <p className="text-xs font-medium text-slate-700 dark:text-slate-200">{windSpeed} km/h</p>
                    <span className="text-[10px] text-slate-400">Wind</span>
                </div>
            </div>
        </div>
    );
}