import Weather from "@/components/Weather";

export default function Home() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#eef0fa] dark:bg-slate-950 transition-colors p-4">
          <Weather />
        </div>
    );
}