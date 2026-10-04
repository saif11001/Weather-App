import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title: "Page not found | Weather App",
};

export default function NotFound() {
    return (
        <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-linear-to-b from-[#7fb2e5] via-[#b9d6f0] to-[#eaf3fb] px-4 py-12 dark:from-[#1c2340] dark:via-[#141a30] dark:to-slate-950">
            {/* big 404 behind everything */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-6 flex select-none items-start justify-center gap-[2vw] text-[clamp(9rem,34vw,32rem)] leading-none font-bold text-white/80 dark:text-white/5 sm:top-10"
            >
                <span>4</span>
                <span>0</span>
                <span>4</span>
            </div>

            {/* soft clouds */}
            <div
                aria-hidden
                className="pointer-events-none absolute -bottom-10 left-[-10%] h-40 w-[55%] rounded-full bg-white/70 blur-2xl dark:bg-white/5"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute -bottom-12 right-[-10%] h-44 w-[60%] rounded-full bg-white/80 blur-2xl dark:bg-white/5"
            />

            {/* content */}
            <div className="relative z-10 mt-10 flex flex-col items-center text-center sm:mt-14">
                {/* put the transparent PNG/WebP at public/monster.webp */}
                <Image
                    src="/monster.png"
                    alt="A fluffy blue monster scratching its head, looking lost"
                    width={1024}
                    height={1536}
                    priority
                    className="monster-float w-52 drop-shadow-[0_24px_24px_rgba(30,60,120,0.3)] sm:w-64"
                />

                <h1 className="mt-2 text-2xl leading-tight font-bold text-slate-900 sm:text-3xl lg:text-4xl dark:text-white">
                    Oops, I think we&apos;re lost
                </h1>
                <p className="mt-2 text-sm text-slate-600 sm:text-base dark:text-slate-400">
                    Let&apos;s get you back to somewhere familiar...
                </p>

                <Link
                    href="/"
                    className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:scale-[1.02] hover:opacity-90 active:scale-[0.98]"
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                    >
                        <path d="m12 19-7-7 7-7" />
                        <path d="M19 12H5" />
                    </svg>
                    Back to home
                </Link>
            </div>

            {/* gentle float animation (skipped if the visitor prefers reduced motion) */}
            <style>{`
                @media (prefers-reduced-motion: no-preference) {
                    .monster-float { animation: monster-float 4s ease-in-out infinite; }
                }
                @keyframes monster-float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-8px); }
                }
            `}</style>
        </main>
    );
}