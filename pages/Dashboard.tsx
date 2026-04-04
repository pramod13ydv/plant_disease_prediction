import { Activity, Droplets, ArrowRight, BrainCircuit, ChevronRight, Heart, FlaskConical } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', vitality: 65, bpm: 72 },
  { name: 'Feb', vitality: 70, bpm: 68 },
  { name: 'Mar', vitality: 68, bpm: 70 },
  { name: 'Apr', vitality: 78, bpm: 65 },
  { name: 'May', vitality: 85, bpm: 66 },
  { name: 'Jun', vitality: 92, bpm: 67 },
];

export default function Dashboard() {
  return (
    <div className="pb-32 max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* Intro Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mt-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 text-xs font-semibold tracking-wider uppercase">Neural Network Active</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-emerald-400 drop-shadow-sm">
            Health Metrics Overview
          </h1>
          <p className="text-white/60 text-lg max-w-xl leading-relaxed">
            Welcome back, Dr. Alexander. Your clinical diagnostic AI has processed 128 new scan segments since your last session.
          </p>
        </div>
        <Link 
          to="/scan" 
          className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-emerald-500/10 px-8 py-4 font-semibold text-emerald-300 border border-emerald-500/30 transition-all duration-300 hover:scale-[1.02] hover:bg-emerald-500/20 hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-transparent -translate-x-[100%] group-hover:animate-[shimmer_2s_infinite]"></div>
          <Activity className="w-5 h-5" />
          <span>Launch Neural Diagnostic Scan</span>
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Hero Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Avg Heart Rate', value: '72 BPM', trend: 'Stable', icon: Heart, color: 'text-rose-400', shadow: 'shadow-rose-500/20', bgGlow: 'from-rose-500/20' },
          { label: 'Oxygen Saturation', value: '98%', trend: 'Optimal', icon: Droplets, color: 'text-cyan-400', shadow: 'shadow-cyan-500/20', bgGlow: 'from-cyan-500/20' },
          { label: 'Blood Glucose', value: '92 mg/dL', trend: 'Regulated', icon: FlaskConical, color: 'text-emerald-400', shadow: 'shadow-emerald-500/20', bgGlow: 'from-emerald-500/20' },
          { label: 'Overall Wellness', value: 'Excellent', trend: 'Improved', icon: Activity, color: 'text-teal-400', shadow: 'shadow-teal-500/20', bgGlow: 'from-teal-500/20' },
        ].map((stat, i) => (
          <div key={i} className="relative group rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 p-6 overflow-hidden transition-all duration-500 hover:bg-white/[0.04] hover:-translate-y-2 hover:border-white/20">
            {/* Background Glow */}
            <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${stat.bgGlow} to-transparent blur-3xl opacity-50 group-hover:opacity-100 transition-opacity`}></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center ${stat.color} shadow-lg ${stat.shadow} backdrop-blur-md`}>
                  <stat.icon className="w-6 h-6" strokeWidth={2.5} />
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/5 border border-white/5 text-white/70">
                  {stat.trend}
                </span>
              </div>
              <p className="text-white/50 text-sm font-medium tracking-wide">{stat.label}</p>
              <h3 className="text-3xl font-bold tracking-tight text-white mt-2 font-mono">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Chart Area */}
        <div className="lg:col-span-2 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 p-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] pointer-events-none"></div>
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div>
              <h2 className="text-2xl font-semibold text-white">Patient Wellness Index</h2>
              <p className="text-white/50 text-sm mt-1">AI-predicted health trajectory over the last 6 months</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
                <span className="text-xs text-white/70 font-medium">Wellness Score</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVitality" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 12}} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.2)" tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 12}} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', backdropFilter: 'blur(10px)' }}
                  itemStyle={{ color: '#10B981' }}
                />
                <Area type="monotone" dataKey="vitality" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorVitality)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Sidebar Area */}
        <div className="flex flex-col gap-8">
          
          {/* AI Insights Engine Widget */}
          <div className="rounded-3xl bg-gradient-to-br from-green-900/20 to-black/40 backdrop-blur-xl border border-green-500/20 p-8 shadow-[0_0_40px_rgba(34,197,94,0.1)] relative overflow-hidden flex-1">
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-green-500/30 blur-[80px]"></div>
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center border border-green-500/30">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-semibold text-white">Clinical Neural Insights</h2>
            </div>
            
            <div className="space-y-4 relative z-10">
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 hover:border-emerald-500/50 transition-colors group">
                <strong className="block text-emerald-300 font-medium mb-1 group-hover:text-emerald-200 transition-colors">Pathogen Alert: Negative</strong>
                <p className="text-white/60 text-sm leading-relaxed">No abnormal pathogen markers detected in recent specimen batches. Continue monitoring.</p>
              </div>
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 hover:border-emerald-500/50 transition-colors group">
                <strong className="block text-emerald-300 font-medium mb-1 group-hover:text-emerald-200 transition-colors">Vitals Regulated</strong>
                <p className="text-white/60 text-sm leading-relaxed">Overall patient metrics are stable and trending towards baseline optimal health targets.</p>
              </div>
            </div>
            
            <Link to="/chat" className="mt-6 w-full py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 transition-all relative z-10 group">
              Consult Medical AI
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
