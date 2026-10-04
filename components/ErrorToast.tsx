"use client";

import { useEffect, useState } from "react";

// Red message at the top of the screen. It fades out after 3 seconds.
export default function ErrorToast({ message }: { message: string }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!message) return;
        setVisible(true);
        const timer = setTimeout(() => setVisible(false), 3000);
        return () => clearTimeout(timer);
    }, [message]);

    if (!message) return null;

    return (
        <div
            role="alert"
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 w-max max-w-[90vw] transition-all duration-300 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 pointer-events-none"
            }`}
        >
            <div className="bg-red-500 text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-lg text-center">
                {message}
            </div>
        </div>
    );
}