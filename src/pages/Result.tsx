import { motion } from "framer-motion";
import { CheckCircle, AlertTriangle, Info, Download, ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, Cell } from "recharts";

const defaultScanData = [
  { name: "GLUK", value: 45, max: 100, normal: 50 },
  { name: "PROT", value: 30, max: 100, normal: 30 },
  { name: "pH", value: 65, max: 100, normal: 70 },
  { name: "LEUK", value: 85, max: 100, normal: 20 },
  { name: "NITR", value: 10, max: 100, normal: 10 },
];

export default function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  
  const serverData = location.state?.serverData;
  const status = serverData?.status || "High Risk";
  const confidence = serverData?.confidence || 96.4;
  
  const scanData = serverData?.biomarkers ? [
    { name: "GLUK", value: serverData.biomarkers.GLUK, max: 100, normal: 50 },
    { name: "PROT", value: serverData.biomarkers.PROT, max: 100, normal: 30 },
    { name: "pH", value: serverData.biomarkers.pH, max: 100, normal: 70 },
    { name: "LEUK", value: serverData.biomarkers.LEUK, max: 100, normal: 20 },
    { name: "NITR", value: serverData.biomarkers.NITR, max: 100, normal: 10 },
  ] : defaultScanData;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-secondary rounded-full transition-colors">
            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
          </button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Scan Result</h1>
            <p className="text-sm text-muted-foreground">ID: {id?.toUpperCase()} • AI Engine Output</p>
          </div>
        </div>
        <button className="inline-flex items-center rounded-xl bg-secondary px-4 py-2 text-sm font-medium hover:bg-secondary/80 transition-colors">
          <Download className="mr-2 h-4 w-4" />
          Export PDF
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Result Card */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="glass-card rounded-2xl p-8 lg:col-span-1 shadow-lg border-t-4 border-t-destructive"
        >
          <div className="flex flex-col items-center text-center">
            <div className="h-20 w-20 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
              <AlertTriangle className="h-10 w-10 text-destructive" />
            </div>
            <h2 className="text-3xl font-extrabold text-foreground mb-2">{status}</h2>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-sm font-medium mb-6">
              <CheckCircle className="h-4 w-4 mr-1" />
              {confidence}% AI Confidence
            </div>
            
            <p className="text-muted-foreground text-sm leading-relaxed text-left bg-secondary/50 p-4 rounded-xl w-full">
              <strong>Observation:</strong> {status === "High Risk" 
                  ? "Elevated levels detected, which may indicate a possible underlying anomaly. Follow-up consultation is recommended."
                  : "All parsed biomarkers appear within normal historical ranges. Continue regular checkups."}
              <br/>
              <span className="text-xs opacity-75 mt-2 inline-block">({serverData?.details || "Fallback mockup analysis."})</span>
            </p>
          </div>
        </motion.div>

        {/* Detailed Metrics */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
           className="glass-card rounded-2xl p-6 lg:col-span-2"
        >
          <h3 className="text-lg font-semibold mb-6 flex items-center">
             Biomarker Analysis 
             <Info className="h-4 w-4 text-muted-foreground ml-2" />
          </h3>
          
          <div className="h-64 w-full mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scanData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: 'var(--secondary)' }}
                  contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '12px' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {scanData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.value > entry.normal + 10 ? '#ef4444' : '#3b82f6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            {scanData.map(item => (
              <div key={item.name} className="bg-secondary/30 p-4 rounded-xl border border-border">
                <p className="text-xs text-muted-foreground font-medium mb-1">{item.name}</p>
                <div className="flex items-end justify-between">
                  <p className={`text-xl font-bold ${item.value > item.normal + 10 ? 'text-destructive' : 'text-foreground'}`}>
                    {item.value}
                  </p>
                  <span className="text-xs text-muted-foreground mb-1">/ {item.max}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recommendations */}
      <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.2 }}
         className="glass-card rounded-2xl p-6"
      >
        <h3 className="text-lg font-semibold mb-6">AI Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-r-xl border-l-4 border-blue-500 bg-secondary/50 shadow-sm">
            <h4 className="font-bold text-foreground mb-2">Immediate Action</h4>
            <p className="text-sm text-foreground/80 leading-relaxed font-medium">Schedule an appointment with a urologist to confirm infection and prescribe targeted antibiotics.</p>
          </div>
          <div className="p-5 rounded-r-xl border-l-4 border-orange-500 bg-secondary/50 shadow-sm">
            <h4 className="font-bold text-foreground mb-2">Symptomatic Relief</h4>
            <p className="text-sm text-foreground/80 leading-relaxed font-medium">Consider taking Ural (or a similar urinary alkalinizer) to help relieve the burning sensation when passing urine.</p>
          </div>
          <div className="p-5 rounded-r-xl border-l-4 border-green-500 bg-secondary/50 shadow-sm">
            <h4 className="font-bold text-foreground mb-2">Diet & Hydration</h4>
            <p className="text-sm text-foreground/80 leading-relaxed font-medium">Increase water intake to at least 2.5L daily to help flush out possible bacterial traces from the tract.</p>
          </div>
          <div className="p-5 rounded-r-xl border-l-4 border-purple-500 bg-secondary/50 shadow-sm">
            <h4 className="font-bold text-foreground mb-2">Further Testing</h4>
            <p className="text-sm text-foreground/80 leading-relaxed font-medium">A comprehensive urine culture is advised for more precise antibiotic targeting.</p>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border flex justify-end">
           <Link to="/chat" className="inline-flex items-center text-sm font-semibold text-primary hover:text-blue-600 transition-colors">
              Discuss result with AI Assistant <ArrowRight className="ml-2 h-4 w-4" />
           </Link>
        </div>
      </motion.div>
    </div>
  );
}
