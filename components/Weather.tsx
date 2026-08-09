"use client";

import Image from "next/image";
import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import humidity_icon from "../Assets/humidity.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import ThemeToggle from "./ThemeToggle";

interface WeatherData {
    humidity: number;
    windSpeed: number;
    temperature: number;
    location: string;
    icon: any;
    condition: string;
}

interface HourlyItem {
    time: string;
    temp: number;
    icon: any;
}

interface DailyItem {
    day: string;
    minTemp: number;
    maxTemp: number;
    icon: any;
}

const iconMap: Record<string, any> = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
};

function IconBadge({ icon, size = "w-9 h-9", imgSize = "w-5 h-5" }: { icon: any; size?: string; imgSize?: string }) {
    return (
        <div className={`${size} rounded-full bg-[lab(57_-3.28_-10.5)] dark:bg-white/10 flex items-center justify-center shrink-0`}>
            <Image src={icon} alt="" className={imgSize} />
        </div>
    );
}

export default function Weather() {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [hourly, setHourly] = useState<HourlyItem[]>([]);
    const [daily, setDaily] = useState<DailyItem[]>([]);
    const [city, setCity] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        if (!error) return;
        setShowError(true);
        const timer = setTimeout(() => setShowError(false), 3000);
        return () => clearTimeout(timer);
    }, [error]);

    const fetchAllWeather = async (cityName: string) => {
        setLoading(true);
        try {
            const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

            const [currentRes, forecastRes] = await Promise.all([
                fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`),
                fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${apiKey}`),
            ]);

            const currentData = await currentRes.json();
            const forecastData = await forecastRes.json();

            if (!currentRes.ok || !forecastRes.ok) {
                setError(
                    currentData.cod === "404" || forecastData.cod === "404"
                        ? "City not found, try again."
                        : "Something went wrong, try again."
                );
                return;
            }

            setWeatherData({
                humidity: currentData.main.humidity,
                windSpeed: currentData.wind.speed,
                temperature: Math.round(currentData.main.temp),
                location: currentData.name,
                icon: iconMap[currentData.weather[0].icon] || clear_icon,
                condition: currentData.weather[0].main,
            });

            const hourlyItems: HourlyItem[] = forecastData.list.slice(0, 6).map((item: any) => ({
                time: new Date(item.dt * 1000).toLocaleTimeString("en-US", { hour: "numeric" }),
                temp: Math.round(item.main.temp),
                icon: iconMap[item.weather[0].icon] || clear_icon,
            }));
            setHourly(hourlyItems);

            const dailyMap: Record<string, { temps: number[]; icons: string[] }> = {};
            forecastData.list.forEach((item: any) => {
                const date = item.dt_txt.split(" ")[0];
                if (!dailyMap[date]) dailyMap[date] = { temps: [], icons: [] };
                dailyMap[date].temps.push(item.main.temp);
                if (item.dt_txt.includes("12:00:00")) {
                    dailyMap[date].icons.unshift(item.weather[0].icon);
                } else {
                    dailyMap[date].icons.push(item.weather[0].icon);
                }
            });

            const dailyItems: DailyItem[] = Object.entries(dailyMap)
                .slice(0, 5)
                .map(([date, val]) => ({
                    day: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
                    minTemp: Math.round(Math.min(...val.temps)),
                    maxTemp: Math.round(Math.max(...val.temps)),
                    icon: iconMap[val.icons[0]] || clear_icon,
                }));
            setDaily(dailyItems);
        } catch (err) {
            console.error("Error fetching weather data:", err);
            setError("Connection problem, check your internet and try again.");
        } finally {
            setLoading(false);
        }
    };

    const search = () => {
        if (city === "") return;
        fetchAllWeather(city);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            search();
        }
    };

    useEffect(() => {
        fetchAllWeather("Cairo,EG");
    }, []);

    return (
        <>
            {error && (
                <div
                    className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
                        showError ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 pointer-events-none"
                    }`}
                >
                    <div className="bg-red-500 text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-lg whitespace-nowrap">
                        {error}
                    </div>
                </div>
            )}

            <div className="w-full max-w-sm rounded-3xl p-4 sm:p-5 bg-[#f6f7fc] dark:bg-linear-to-b dark:from-[#1c2340] dark:to-[#10131f] shadow-lg border border-slate-200/60 dark:border-white/5 transition-colors">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-base font-semibold text-slate-800 dark:text-white">Weather</h2>
                    <ThemeToggle />
                </div>

                <div className="flex items-center gap-2 mb-3">
                    <input
                        type="text"
                        placeholder="Search for a city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 h-10 border-none outline-none rounded-full pl-4 text-sm text-slate-700 dark:text-white bg-white dark:bg-white/10 placeholder:text-slate-400"
                    />
                    <button
                        onClick={search}
                        aria-label="Search"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-white/10 shrink-0"
                    >
                        <Image src={search_icon} alt="" className="w-4 h-4" />
                    </button>
                </div>

                {loading ? (
                    <div className="h-56 flex items-center justify-center">
                        <Loading label="Loading" />
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col items-center text-center mb-3">
                            <p className="text-slate-500 dark:text-slate-400 text-xs">
                                {weatherData?.location} · Updated just now
                            </p>
                            <div className="my-1.5">
                                <IconBadge icon={weatherData?.icon || clear_icon} size="w-16 h-16" imgSize="w-10 h-10" />
                            </div>
                            <p className="text-4xl font-semibold text-slate-800 dark:text-white leading-none">
                                {weatherData?.temperature}°
                            </p>
                            <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">{weatherData?.condition}</p>
                        </div>

                        <div className="flex justify-around mb-4">
                            <div className="flex items-center gap-2">
                                <IconBadge icon={humidity_icon} />
                                <div className="text-left">
                                    <p className="text-xs font-medium text-slate-700 dark:text-slate-200">{weatherData?.humidity}%</p>
                                    <span className="text-[10px] text-slate-400">Humidity</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <IconBadge icon={wind_icon} />
                                <div className="text-left">
                                    <p className="text-xs font-medium text-slate-700 dark:text-slate-200">{weatherData?.windSpeed} km/h</p>
                                    <span className="text-[10px] text-slate-400">Wind</span>
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                                Hourly forecast
                            </p>
                            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                                {hourly.map((h, i) => (
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

                        <div>
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                                5-day forecast
                            </p>
                            <div className="flex flex-col divide-y divide-slate-200 dark:divide-white/5">
                                {daily.map((d, i) => (
                                    <div key={i} className="flex items-center justify-between py-1.5">
                                        <span className="w-9 text-xs text-slate-700 dark:text-slate-200">{d.day}</span>
                                        <IconBadge icon={d.icon} size="w-7 h-7" imgSize="w-4 h-4" />
                                        <span className="w-6 text-right text-xs text-slate-400">{d.minTemp}°</span>
                                        <span className="w-6 text-right text-xs font-medium text-slate-800 dark:text-white">{d.maxTemp}°</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}