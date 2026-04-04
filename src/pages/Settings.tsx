import { User, Bell, Paintbrush } from "lucide-react";

export default function Settings() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account preferences and configurations.</p>
      </div>

      <div className="glass-card rounded-2xl divide-y divide-border overflow-hidden">
        {/* Profile */}
        <div className="p-6 md:flex gap-12">
          <div className="mb-4 md:mb-0 md:w-1/3">
            <h3 className="text-lg font-medium flex items-center gap-2"><User className="h-5 w-5"/> Profile</h3>
            <p className="text-sm text-muted-foreground mt-1">Update your clinic details and personal information.</p>
          </div>
          <div className="md:w-2/3 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">First Name</label>
                <input type="text" defaultValue="Sarah" className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:ring-primary focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <input type="text" defaultValue="Connor" className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:ring-primary focus:border-primary outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input type="email" defaultValue="dr.sarah@medisight.com" className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:ring-primary focus:border-primary outline-none" />
            </div>
            <button className="px-4 py-2 bg-secondary text-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors">
              Save Changes
            </button>
          </div>
        </div>

        {/* Notifs */}
        <div className="p-6 md:flex gap-12">
          <div className="mb-4 md:mb-0 md:w-1/3">
            <h3 className="text-lg font-medium flex items-center gap-2"><Bell className="h-5 w-5"/> Notifications</h3>
            <p className="text-sm text-muted-foreground mt-1">Decide what you want to be notified about.</p>
          </div>
          <div className="md:w-2/3 space-y-4">
            {[
              { title: "High Risk Scans", desc: "Get alerted immediately via email." },
              { title: "Weekly Summary", desc: "Receive a digest of all scans." },
              { title: "System Updates", desc: "News about Medisight AI updates." }
            ].map((nx, i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{nx.title}</p>
                  <p className="text-xs text-muted-foreground">{nx.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Security / UI (placeholder) */}
        <div className="p-6 md:flex gap-12">
           <div className="mb-4 md:mb-0 md:w-1/3">
            <h3 className="text-lg font-medium flex items-center gap-2"><Paintbrush className="h-5 w-5"/> Appearance</h3>
            <p className="text-sm text-muted-foreground mt-1">Customize your UI theme.</p>
          </div>
          <div className="md:w-2/3">
             <div className="grid grid-cols-2 gap-4">
                <button className="border-2 border-primary rounded-xl p-4 flex flex-col items-center gap-2 bg-primary/5">
                   <div className="bg-card w-full h-12 rounded-lg border border-border shadow-sm flex items-center px-2 pointer-events-none">
                      <div className="bg-secondary rounded w-1/3 h-4" />
                   </div>
                   <span className="text-sm font-medium">System / Auto</span>
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
