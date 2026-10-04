import type { ImageProps } from "next/image";

// Anything next/image accepts as `src` (our icons are static imports)
export type WeatherIcon = ImageProps["src"];

export interface WeatherData {
    humidity: number;
    windSpeed: number; // km/h
    temperature: number;
    location: string;
    icon: WeatherIcon;
    condition: string;
}

export interface HourlyItem {
    time: string;
    temp: number;
    icon: WeatherIcon;
}

export interface DailyItem {
    day: string;
    minTemp: number;
    maxTemp: number;
    icon: WeatherIcon;
}

export interface WeatherResult {
    current: WeatherData;
    hourly: HourlyItem[];
    daily: DailyItem[];
}