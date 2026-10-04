"use client";

import { useWeather } from "@/hooks/useWeather";
import CurrentWeather from "./CurrentWeather";
import DailyForecast from "./DailyForecast";
import ErrorToast from "./ErrorToast";
import HourlyForecast from "./HourlyForecast";
import Loading from "./Loading";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";
import WeatherStats from "./WeatherStats";

export default function Weather() {
    const { weatherData, hourly, daily, loading, error, search } = useWeather();

    return (
        <>
            <ErrorToast message={error} />

            <div className="w-full max-w-sm rounded-3xl p-4 sm:p-5 bg-[#f6f7fc] dark:bg-linear-to-b dark:from-[#1c2340] dark:to-[#10131f] shadow-lg border border-slate-200/60 dark:border-white/5 transition-colors">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-base font-semibold text-slate-800 dark:text-white">Weather</h2>
                    <ThemeToggle />
                </div>

                <SearchBar onSearch={search} />

                {loading ? (
                    <div className="h-56 flex items-center justify-center">
                        <Loading label="Loading" />
                    </div>
                ) : weatherData ? (
                    <>
                        <CurrentWeather data={weatherData} />
                        <WeatherStats humidity={weatherData.humidity} windSpeed={weatherData.windSpeed} />
                        <HourlyForecast items={hourly} />
                        <DailyForecast items={daily} />
                    </>
                ) : (
                    <div className="h-56 flex items-center justify-center text-center text-sm text-slate-500 dark:text-slate-400">
                        Search for a city to see the weather.
                    </div>
                )}
            </div>
        </>
    );
}