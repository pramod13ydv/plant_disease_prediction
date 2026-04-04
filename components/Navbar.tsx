import { Bell, Moon, Sun, Search, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      setIsDark(true);
    }
  }, []);

  const toggleDark = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <header className="flex h-20 shrink-0 items-center justify-between border-b border-white/5 bg-black/20 backdrop-blur-xl px-8 z-50 sticky top-0">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative w-full max-w-md hidden md:block">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-white/40" aria-hidden="true" />
          </div>
          <input
            id="search-field"
            className="block h-full w-full rounded-2xl border-0 py-2.5 pl-10 pr-3 bg-white/5 text-white placeholder:text-white/40 border-white/10 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm sm:leading-6 transition-all backdrop-blur-md"
            placeholder="Search greenhouses, crops, or leaf scans..."
            type="search"
            name="search"
          />
        </div>
      </div>
      <div className="ml-4 flex items-center space-x-6">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium tracking-wide">
          <Sparkles className="w-3.5 h-3.5" />
          Botanical AI Active
        </div>

        <button
          onClick={toggleDark}
          className="relative rounded-full p-2 text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        <button className="relative rounded-full p-2 text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300">
          <span className="absolute right-2 top-2 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          <Bell className="h-5 w-5" />
        </button>

        <div className="h-8 w-[1px] bg-white/10"></div>

        <Link to="/settings" className="flex items-center gap-3 group">
          <div className="hidden md:block text-right">
            <span className="block text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">Dr. Sarah</span>
            <span className="block text-xs text-white/50">Lead Botanist</span>
          </div>
          <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-emerald-500 to-green-400 p-[2px] shadow-lg shadow-emerald-500/20">
            <div className="h-full w-full rounded-full bg-black flex items-center justify-center overflow-hidden">
              <img src="https://ui-avatars.com/api/?name=Dr+Sarah&background=0D1117&color=10B981&bold=true" alt="Profile" className="h-full w-full object-cover opacity-90 hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
}
