import { Server, Activity, Users, Database } from "lucide-react";

export default function Admin() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin Console</h1>
        <p className="text-sm text-muted-foreground">Manage AI models, users, and platform health.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Active Nodes", val: "3", icon: Server },
          { label: "Total Users", val: "42", icon: Users },
          { label: "Database Health", val: "99.9%", icon: Database },
          { label: "Avg Latency", val: "45ms", icon: Activity },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
             <div key={i} className="glass-card rounded-2xl p-6">
               <div className="flex items-center gap-4">
                 <div className="p-3 bg-primary/10 rounded-xl text-primary"><Icon className="h-6 w-6" /></div>
                 <div>
                   <p className="text-sm text-muted-foreground font-medium">{s.label}</p>
                   <p className="text-2xl font-bold">{s.val}</p>
                 </div>
               </div>
             </div>
          )
        })}
      </div>

      <div className="glass-card rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">AI Model Management</h2>
          <button className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-blue-600 transition-colors">Deploy New Version</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary/40 text-muted-foreground uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Model Name</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Version</th>
                <th className="px-4 py-3">Accuracy</th>
                <th className="px-4 py-3">Last Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr className="hover:bg-secondary/20 transition-colors">
                <td className="px-4 py-4 font-medium">UrinScan V3 (Production)</td>
                <td className="px-4 py-4"><span className="text-green-500 bg-green-500/10 px-2 py-1 rounded-full text-xs font-semibold">Active</span></td>
                <td className="px-4 py-4">v3.1.4</td>
                <td className="px-4 py-4">98.2%</td>
                <td className="px-4 py-4">2 days ago</td>
              </tr>
              <tr className="hover:bg-secondary/20 transition-colors">
                <td className="px-4 py-4 font-medium">UrinScan V4 (Beta)</td>
                <td className="px-4 py-4"><span className="text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded-full text-xs font-semibold">Shadow</span></td>
                <td className="px-4 py-4">v4.0.0-rc1</td>
                <td className="px-4 py-4">99.1%</td>
                <td className="px-4 py-4">5 hours ago</td>
              </tr>
               <tr className="hover:bg-secondary/20 transition-colors">
                <td className="px-4 py-4 font-medium">BloodSpot V1</td>
                <td className="px-4 py-4"><span className="text-muted-foreground bg-secondary px-2 py-1 rounded-full text-xs font-semibold">Training</span></td>
                <td className="px-4 py-4">v0.9.0</td>
                <td className="px-4 py-4">84.5%</td>
                <td className="px-4 py-4">10 days ago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
