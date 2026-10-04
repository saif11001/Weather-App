import { useCallback, useEffect, useRef, useState } from "react";
import { fetchWeather, WeatherError } from "@/lib/weather";
import type { DailyItem, HourlyItem, WeatherData } from "@/types/weather";

const DEFAULT_CITY = "Cairo,EG";

// Holds all the weather state and the search logic, so the components only render
export function useWeather() {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [hourly, setHourly] = useState<HourlyItem[]>([]);
    const [daily, setDaily] = useState<DailyItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const latestRequest = useRef(0);

    const search = useCallback(async (cityName: string) => {
        // used to ignore a slow response when a newer search has already started
        const requestId = ++latestRequest.current;
        setLoading(true);
        setError("");

        try {
            const result = await fetchWeather(cityName);
            if (requestId !== latestRequest.current) return;

            setWeatherData(result.current);
            setHourly(result.hourly);
            setDaily(result.daily);
        } catch (err) {
            if (requestId !== latestRequest.current) return;

            if (err instanceof WeatherError) {
                setError(err.message);
            } else {
                console.error("Error fetching weather data:", err);
                setError("Connection problem, check your internet and try again.");
            }
        } finally {
            if (requestId === latestRequest.current) setLoading(false);
        }
    }, []);

    useEffect(() => {
        search(DEFAULT_CITY);
    }, [search]);

    return { weatherData, hourly, daily, loading, error, search };
}