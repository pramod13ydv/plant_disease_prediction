import { matchPath, useLocation, Link } from "react-router-dom";
import { LayoutDashboard, ScanLine, History, MessageSquare, Settings, Users, Activity } from "lucide-react";
import { cn } from "../lib/utils";

const navigation = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Diagnostic Scan", href: "/scan", icon: ScanLine },
  { name: "Clinical History", href: "/history", icon: History },
  { name: "AI Assistant", href: "/chat", icon: MessageSquare },
  { name: "Lab Panel", href: "/admin", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex h-full w-[280px] flex-col border-r border-white/5 bg-black/40 backdrop-blur-2xl transition-all duration-300 relative z-20">
      <div className="flex h-20 shrink-0 items-center px-8 border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent"></div>
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 relative z-10 p-2">
          <Activity className="h-full w-full text-white" strokeWidth={2.5} />
        </div>
        <span className="ml-4 text-2xl font-bold tracking-tight text-white relative z-10">
          Medisight<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">.ai</span>
        </span>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto px-4 py-6 hide-scrollbar relative">
        <nav className="flex-1 space-y-2">
          <div className="text-xs font-semibold text-white/30 tracking-wider uppercase mb-4 px-4">Menu</div>
          {navigation.map((item) => {
            const isActive = matchPath({ path: item.href, end: false }, location.pathname);
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  isActive
                    ? "bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] border border-white/5"
                    : "text-white/50 hover:bg-white/5 hover:text-white border border-transparent",
                  "group flex items-center rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-300 relative overflow-hidden"
                )}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-emerald-400 to-teal-500 rounded-r-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                )}
                <Icon
                  className={cn(
                    isActive ? "text-emerald-400" : "text-white/40 group-hover:text-emerald-300",
                    "mr-4 h-5 w-5 flex-shrink-0 transition-colors duration-300"
                  )}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span className="relative z-10">{item.name}</span>
                {isActive && (
                   <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent opacity-50"></div>
                )}
              </Link>
            );
          })}
        </nav>
        
        <div className="mt-8 px-4">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-white/5 to-white-[0.02] border border-white/5 relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
             <div className="absolute -top-10 -right-10 w-24 h-24 bg-emerald-500/20 blur-2xl rounded-full group-hover:bg-emerald-500/30 transition-colors"></div>
             <h4 className="text-sm font-semibold text-white mb-2 relative z-10">Pro Plan</h4>
             <p className="text-xs text-white/50 relative z-10 leading-relaxed mb-4">Unlimited neural diagnostics active.</p>
             <button className="w-full py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded-lg transition-colors border border-white/5">View Billing</button>
          </div>
        </div>
      </div>
    </div>
  );
}
