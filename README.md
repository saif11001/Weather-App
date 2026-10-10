# Weather App

A responsive weather app that shows the current conditions, an hourly outlook and a 5-day forecast for any city. It works on phones and desktops, in light and dark mode.

**Live demo:** https://weather-app-nine-gamma-36.vercel.app

## Screenshots

<p>
  <img src="https://res.cloudinary.com/a57m0ysa/image/upload/v1791327199/Screenshot_2026-10-07_015101_s97ebq.png" width="49%" alt="Screenshot 1" />
  <img src="https://res.cloudinary.com/a57m0ysa/image/upload/v1791327199/Screenshot_2026-10-07_015121_oa0ufc.png" width="49%" alt="Screenshot 2" />
</p>

## Features

- Search any city by name, with Cairo loaded by default
- Current temperature, condition, humidity and wind speed
- The next 18 hours in 3-hour steps, plus a 5-day forecast with daily highs and lows
- Hours and weekdays shown in the searched city's own timezone
- Light and dark theme that remembers your choice and is applied before the page paints, so there is no flash on load
- Loading state and clear error messages for unknown cities or connection problems
- Mobile-friendly layout, tested on small screens
- The OpenWeatherMap API key stays on the server and is never sent to the browser

## Tech Stack

| Layer | Technologies |
| --- | --- |
| Framework | Next.js (App Router), React, TypeScript |
| Styling | Tailwind CSS |
| Data | OpenWeatherMap API (current weather and 5-day forecast) |
| Deployment | Vercel |

## How It Works

The browser never talks to OpenWeatherMap directly. It calls a route inside the app (`/api/weather?city=...`), and that route adds the secret API key and requests the current weather and the forecast in parallel. This keeps the key out of the client code.

The API returns times in UTC and wind speed in m/s, so the app uses each city's UTC offset to calculate the local hours and weekdays, and converts the wind speed to km/h. A new search also ignores slow responses from older searches, so a late result can't overwrite a newer one.

## Project Structure

```
Weather-App
├── app
│   ├── api/weather/route.ts   # server route that calls OpenWeatherMap with the secret key
│   ├── layout.tsx
│   ├── page.tsx
│   ├── not-found.tsx
│   └── globals.css
├── components                 # Weather, SearchBar, CurrentWeather, WeatherStats,
│                              # HourlyForecast, DailyForecast, ThemeToggle, ErrorToast, Loading
├── hooks
│   └── useWeather.ts          # state and search logic
├── lib
│   ├── weather.ts             # fetching and shaping the API data
│   └── weatherIcons.ts        # maps API icon codes to local icons
└── types
    └── weather.ts
```

## Getting Started

### Prerequisites

- Node.js 18 or newer
- A free API key from [OpenWeatherMap](https://openweathermap.org/api)

### Run locally

```bash
git clone https://github.com/saif11001/Weather-App.git
cd Weather-App
npm install
```

Create a `.env.local` file in the project root:

```env
WEATHER_API_KEY=your_openweathermap_api_key
```

Then start the dev server:

```bash
npm run dev
```

Open http://localhost:3000.

## Deployment

Deploy on Vercel and add the `WEATHER_API_KEY` environment variable in the project settings. Do not prefix it with `NEXT_PUBLIC_`, because that would expose it to the browser.