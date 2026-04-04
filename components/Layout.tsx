import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="flex h-screen w-full relative overflow-hidden bg-[#02040a] text-foreground font-sans selection:bg-teal-500/30">
      {/* Premium Animated Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[40%] -left-[20%] w-[70%] h-[70%] rounded-full bg-emerald-500/10 blur-[120px] animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute -bottom-[30%] -right-[10%] w-[60%] h-[60%] rounded-full bg-teal-600/10 blur-[120px] animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
        <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] rounded-full bg-indigo-500/10 blur-[100px] animate-pulse" style={{ animationDuration: '15s', animationDelay: '5s' }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      <div className="z-10 flex w-full h-full relative backdrop-blur-[1px]">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden relative">
          <Navbar />
          <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8 hide-scrollbar">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
