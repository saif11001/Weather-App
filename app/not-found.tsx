import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
    title: "Page not found | Saif El-Deen",
};

function LostMonster() {
    return (
        <svg
            viewBox="0 0 300 350"
            role="img"
            aria-label="A fluffy monster scratching its head, looking lost"
            className="monster-float w-52 text-accent sm:w-64"
        >
            <defs>
                {/* rough edges = fur */}
                <filter id="fur" x="-10%" y="-10%" width="120%" height="120%">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.9"
                        numOctaves="2"
                        result="noise"
                    />
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="noise"
                        scale="7"
                        xChannelSelector="R"
                        yChannelSelector="G"
                    />
                </filter>
                {/* light from the top left */}
                <radialGradient id="shade" cx="35%" cy="25%" r="85%">
                    <stop offset="0" stopColor="#fff" stopOpacity="0.35" />
                    <stop offset="1" stopColor="#000" stopOpacity="0.18" />
                </radialGradient>
            </defs>

            {/* ground shadow */}
            <ellipse cx="150" cy="338" rx="78" ry="8" fill="#000" opacity="0.12" />

            {/* fur */}
            <g filter="url(#fur)">
                {/* tail */}
                <path
                    d="M80 300 C 22 305, 0 245, 24 205"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="26"
                    strokeLinecap="round"
                />
                {/* legs */}
                <ellipse cx="118" cy="322" rx="25" ry="18" fill="currentColor" />
                <ellipse cx="182" cy="322" rx="25" ry="18" fill="currentColor" />
                {/* body */}
                <ellipse cx="150" cy="215" rx="82" ry="105" fill="currentColor" />
                <ellipse cx="150" cy="215" rx="82" ry="105" fill="url(#shade)" />
                {/* left arm (hanging) */}
                <ellipse
                    cx="72"
                    cy="245"
                    rx="16"
                    ry="48"
                    transform="rotate(12 72 245)"
                    fill="currentColor"
                />
                {/* head */}
                <ellipse cx="150" cy="125" rx="78" ry="68" fill="currentColor" />
                <ellipse cx="150" cy="125" rx="78" ry="68" fill="url(#shade)" />
                {/* right arm (scratching the head) */}
                <g className="monster-hand">
                    <line
                        x1="222"
                        y1="200"
                        x2="207"
                        y2="98"
                        stroke="currentColor"
                        strokeWidth="30"
                        strokeLinecap="round"
                    />
                    <circle cx="204" cy="84" r="18" fill="currentColor" />
                </g>
            </g>

            {/* face (kept crisp) */}
            <circle cx="125" cy="128" r="17" fill="#fff" />
            <circle cx="172" cy="128" r="19" fill="#fff" />
            <circle cx="130" cy="124" r="7" fill="#1a1a1a" />
            <circle cx="178" cy="124" r="8" fill="#1a1a1a" />
            <circle cx="132" cy="121" r="2.2" fill="#fff" />
            <circle cx="180" cy="121" r="2.5" fill="#fff" />
            {/* worried brows */}
            <path
                d="M108 102 Q122 96 138 104"
                fill="none"
                stroke="#1a1a1a"
                strokeWidth="3.5"
                strokeLinecap="round"
                opacity="0.55"
            />
            <path
                d="M158 106 Q174 96 192 102"
                fill="none"
                stroke="#1a1a1a"
                strokeWidth="3.5"
                strokeLinecap="round"
                opacity="0.55"
            />
            {/* mouth */}
            <path
                d="M138 164 Q151 154 164 164"
                fill="none"
                stroke="#1a1a1a"
                strokeWidth="4"
                strokeLinecap="round"
            />
        </svg>
    );
}

export default function NotFound() {
    return (
        <main className="relative flex min-h-[calc(100dvh-4rem)] flex-col items-center justify-center overflow-hidden bg-linear-to-b from-accent/15 via-accent/5 to-background px-4 py-12 sm:min-h-[calc(100dvh-5rem)]">
            {/* big 404 behind everything */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-6 flex select-none items-start justify-center gap-[2vw] font-serif text-[clamp(9rem,34vw,32rem)] leading-none font-bold text-background/80 sm:top-10"
            >
                <span>4</span>
                <span>0</span>
                <span>4</span>
            </div>

            {/* soft clouds */}
            <div
                aria-hidden
                className="pointer-events-none absolute -bottom-10 left-[-10%] h-40 w-[55%] rounded-full bg-background/70 blur-2xl"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute -bottom-12 right-[-10%] h-44 w-[60%] rounded-full bg-background/80 blur-2xl"
            />

            {/* content */}
            <div className="relative z-10 mt-10 flex flex-col items-center text-center sm:mt-14">
                <LostMonster />

                <h1 className="mt-2 font-serif text-2xl leading-tight font-bold sm:text-3xl lg:text-4xl">
                    Oops, I think we&apos;re lost
                </h1>
                <p className="mt-2 text-sm text-muted sm:text-base">
                    Let&apos;s get you back to somewhere familiar...
                </p>

                <Link
                    href="/"
                    className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:scale-[1.02] hover:opacity-90 active:scale-[0.98]"
                >
                    <ArrowLeft size={16} />
                    Back to home
                </Link>
            </div>

            {/* small float / scratch animation (skipped if the visitor prefers reduced motion) */}
            <style>{`
                @media (prefers-reduced-motion: no-preference) {
                    .monster-float { animation: monster-float 4s ease-in-out infinite; }
                    .monster-hand { transform-origin: 222px 200px; animation: monster-scratch 2.4s ease-in-out infinite; }
                }
                @keyframes monster-float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-8px); }
                }
                @keyframes monster-scratch {
                    0%, 100% { transform: rotate(0deg); }
                    50% { transform: rotate(-6deg); }
                }
            `}</style>
        </main>
    );
}