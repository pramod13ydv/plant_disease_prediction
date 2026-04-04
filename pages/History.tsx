import { useState } from "react";
import { Download, Filter, Search } from "lucide-react";
import { motion } from "framer-motion";

const scans = [
  { id: "SC-92841", date: "Today", patient: "Alice Smith", result: "High Risk", confidence: "96.4%" },
  { id: "SC-92840", date: "Yesterday", patient: "Emma Davis", result: "Normal", confidence: "99.1%" },
  { id: "SC-92839", date: "Oct 24, 2026", patient: "John Doe", result: "Normal", confidence: "98.5%" },
  { id: "SC-92838", date: "Oct 22, 2026", patient: "Bob Johnson", result: "Moderate", confidence: "85.2%" },
  { id: "SC-92837", date: "Oct 20, 2026", patient: "Michael Brown", result: "Normal", confidence: "99.9%" },
];

export default function History() {
  const [term, setTerm] = useState("");

  const filtered = scans.filter(s => 
    s.patient.toLowerCase().includes(term.toLowerCase()) || 
    s.id.toLowerCase().includes(term.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Scan History</h1>
          <p className="text-sm text-muted-foreground">View and manage past diagnostic results.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 border border-border rounded-xl text-muted-foreground hover:bg-secondary transition-colors">
            <Filter className="h-4 w-4" />
          </button>
          <button className="inline-flex items-center rounded-xl bg-secondary px-4 py-2 text-sm font-medium hover:bg-secondary/80 transition-colors">
            <Download className="mr-2 h-4 w-4" />
            Export All
          </button>
        </div>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-border flex items-center gap-2 bg-secondary/20">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search patient or ID..."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="w-full bg-transparent border-none focus:ring-0 text-sm focus:outline-none"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-muted-foreground">
            <thead className="bg-secondary/40 text-xs uppercase text-foreground">
              <tr>
                <th className="px-6 py-4 font-medium">Scan ID</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Patient Details</th>
                <th className="px-6 py-4 font-medium">AI Result</th>
                <th className="px-6 py-4 font-medium">Confidence</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((scan, i) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={scan.id} 
                  className="border-b border-border hover:bg-secondary/30 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-foreground">{scan.id}</td>
                  <td className="px-6 py-4">{scan.date}</td>
                  <td className="px-6 py-4">{scan.patient}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                      scan.result === 'High Risk' ? 'bg-red-50 text-red-700 ring-red-600/10 dark:bg-red-900/10 dark:text-red-400 dark:ring-red-400/20' :
                      scan.result === 'Moderate' ? 'bg-yellow-50 text-yellow-800 ring-yellow-600/20 dark:bg-yellow-900/10 dark:text-yellow-400:ring-yellow-400/20' :
                      'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-900/10 dark:text-green-400 dark:ring-green-400/20'
                    }`}>
                      {scan.result}
                    </span>
                  </td>
                  <td className="px-6 py-4">{scan.confidence}</td>
                  <td className="px-6 py-4 text-right">
                    <a href={`/result/${scan.id}`} className="font-medium text-primary hover:underline">View</a>
                  </td>
                </motion.tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                    No scans found matching "{term}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
