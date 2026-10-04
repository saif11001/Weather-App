import Image from "next/image";
import type { WeatherIcon } from "@/types/weather";

interface IconBadgeProps {
    icon: WeatherIcon;
    size?: string;
    imgSize?: string;
}

export default function IconBadge({ icon, size = "w-9 h-9", imgSize = "w-5 h-5" }: IconBadgeProps) {
    return (
        <div className={`${size} rounded-full bg-[lab(57_-3.28_-10.5)] dark:bg-white/10 flex items-center justify-center shrink-0`}>
            <Image src={icon} alt="" className={imgSize} />
        </div>
    );
}