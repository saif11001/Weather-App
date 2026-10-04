"use client";

import Image from "next/image";
import { useState } from "react";
import search_icon from "../Assets/search.png";

interface SearchBarProps {
    onSearch: (city: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [city, setCity] = useState("");

    const search = () => {
        const name = city.trim();
        if (name === "") return;
        onSearch(name);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            search();
        }
    };

    return (
        <div className="flex items-center gap-2 mb-3">
            <input
                type="text"
                placeholder="Search for a city"
                aria-label="Search for a city"
                enterKeyHint="search"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 min-w-0 h-10 border-none outline-none rounded-full pl-4 text-base sm:text-sm text-slate-700 dark:text-white bg-white dark:bg-white/10 placeholder:text-slate-400"
            />
            <button
                onClick={search}
                aria-label="Search"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-white/10 shrink-0"
            >
                <Image src={search_icon} alt="" className="w-4 h-4" />
            </button>
        </div>
    );
}