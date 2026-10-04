import type { DailyItem, HourlyItem, WeatherData, WeatherResult } from "../types/weather";
import { getWeatherIcon } from "./weatherIcons";

const API_BASE = "https://api.openweathermap.org/data/2.5";

// An error whose message is safe to show to the user
export class WeatherError extends Error {}

interface ForecastItem {
    dt: number;
    main: { temp: number };
    weather: { icon: string }[];
}

function buildCurrent(data: any): WeatherData {
    return {
        humidity: data.main.humidity,
        // the API returns m/s when units=metric, the UI shows km/h
        windSpeed: Math.round(data.wind.speed * 3.6),
        temperature: Math.round(data.main.temp),
        location: data.name,
        icon: getWeatherIcon(data.weather[0].icon),
        condition: data.weather[0].main,
    };
}

// tz = the city's UTC offset in seconds, so times follow the city, not the visitor's device
function buildHourly(list: ForecastItem[], tz: number): HourlyItem[] {
    return list.slice(0, 6).map((item) => ({
        time: new Date((item.dt + tz) * 1000).toLocaleTimeString("en-US", { hour: "numeric", timeZone: "UTC" }),
        temp: Math.round(item.main.temp),
        icon: getWeatherIcon(item.weather[0].icon),
    }));
}

function buildDaily(list: ForecastItem[], tz: number): DailyItem[] {
    const dailyMap: Record<string, { temps: number[]; icon: string; diff: number }> = {};

    list.forEach((item) => {
        const local = new Date((item.dt + tz) * 1000);
        const date = local.toISOString().split("T")[0];
        // use the forecast closest to midday for the day's icon
        const diff = Math.abs(local.getUTCHours() - 12);

        if (!dailyMap[date]) {
            dailyMap[date] = { temps: [], icon: item.weather[0].icon, diff };
        }
        dailyMap[date].temps.push(item.main.temp);
        if (diff < dailyMap[date].diff) {
            dailyMap[date].icon = item.weather[0].icon;
            dailyMap[date].diff = diff;
        }
    });

    return Object.entries(dailyMap)
        .slice(0, 5)
        .map(([date, val]) => ({
            day: new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" }),
            minTemp: Math.round(Math.min(...val.temps)),
            maxTemp: Math.round(Math.max(...val.temps)),
            icon: getWeatherIcon(val.icon),
        }));
}

// Fetches current weather + forecast for a city.
// Throws WeatherError (user-friendly message) when the API answers with an error;
// network problems are thrown as normal errors.
export async function fetchWeather(cityName: string): Promise<WeatherResult> {
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    const q = encodeURIComponent(cityName);

    const [currentRes, forecastRes] = await Promise.all([
        fetch(`${API_BASE}/weather?q=${q}&units=metric&appid=${apiKey}`),
        fetch(`${API_BASE}/forecast?q=${q}&units=metric&appid=${apiKey}`),
    ]);

    const currentData = await currentRes.json();
    const forecastData = await forecastRes.json();

    if (!currentRes.ok || !forecastRes.ok) {
        throw new WeatherError(
            String(currentData.cod) === "404" || String(forecastData.cod) === "404"
                ? "City not found, try again."
                : "Something went wrong, try again."
        );
    }

    const tz: number = forecastData.city?.timezone ?? 0;
    const list = forecastData.list as ForecastItem[];

    return {
        current: buildCurrent(currentData),
        hourly: buildHourly(list, tz),
        daily: buildDaily(list, tz),
    };
}