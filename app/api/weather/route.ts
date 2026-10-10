import { NextRequest, NextResponse } from "next/server";

const API_BASE = "https://api.openweathermap.org/data/2.5";

// The browser calls this route instead of OpenWeatherMap,
// so the API key stays on the server and is never sent to the visitor.
export async function GET(request: NextRequest) {
    const city = request.nextUrl.searchParams.get("city")?.trim();

    if (!city || city.length > 100) {
        return NextResponse.json({ message: "A valid city name is required" }, { status: 400 });
    }

    const apiKey = process.env.WEATHER_API_KEY;
    if (!apiKey) {
        console.error("WEATHER_API_KEY is not set");
        return NextResponse.json({ message: "Server is not configured" }, { status: 500 });
    }

    const q = encodeURIComponent(city);

    try {
        const [currentRes, forecastRes] = await Promise.all([
            fetch(`${API_BASE}/weather?q=${q}&units=metric&appid=${apiKey}`, { cache: "no-store" }),
            fetch(`${API_BASE}/forecast?q=${q}&units=metric&appid=${apiKey}`, { cache: "no-store" }),
        ]);

        const current = await currentRes.json();
        const forecast = await forecastRes.json();

        if (String(current?.cod) === "404" || String(forecast?.cod) === "404") {
            return NextResponse.json({ message: "City not found" }, { status: 404 });
        }

        if (!currentRes.ok || !forecastRes.ok) {
            return NextResponse.json({ message: "Weather service error" }, { status: 502 });
        }

        return NextResponse.json({ current, forecast });
    } catch (error) {
        console.error("Weather request failed:", error);
        return NextResponse.json({ message: "Weather service unreachable" }, { status: 502 });
    }
}