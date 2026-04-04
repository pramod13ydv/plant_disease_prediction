import { Activity, ArrowRight, Brain, HeartPulse, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 w-full z-50 glass border-b border-white/10 dark:border-white/5">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <Activity className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold tracking-tight text-foreground">
              Medisight<span className="text-primary">.ai</span>
            </span>
          </div>
          <div className="flex gap-4">
            <Link to="/login" className="text-sm font-semibold text-foreground/80 hover:text-foreground py-2 px-4">
              Log in
            </Link>
            <Link to="/signup" className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all">
              Sign up
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-16">
        {/* Hero Section */}
        <div className="relative px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="mx-auto max-w-2xl py-16 sm:py-24 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="hidden sm:mb-8 sm:flex sm:justify-center"
            >
              <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-muted-foreground ring-1 ring-border hover:ring-primary/50 transition-colors">
                Announcing our next-gen diagnostic model. <Link to="/signup" className="font-semibold text-primary"><span className="absolute inset-0" aria-hidden="true" />Read more <span aria-hidden="true">&rarr;</span></Link>
              </div>
            </motion.div>
            <motion.h1 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.1 }}
               className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl"
            >
              Analyze health diagnostics with <span className="text-gradient">AI Precision</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg leading-8 text-muted-foreground"
            >
              Upload test strip images and let our advanced AI models detect potential risks, provide insights, and manage patient history—all in a beautifully designed platform.
            </motion.p>
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.3 }}
               className="mt-10 flex items-center justify-center gap-x-6"
            >
              <Link
                to="/dashboard"
                className="group rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-white shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 transition-all flex items-center gap-2"
              >
                Go to Dashboard
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="#" className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors">
                View Demo <span aria-hidden="true">→</span>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Instant AI Scan", desc: "Upload test strips and receive highly accurate diagnostic results in under 5 seconds.", icon: Brain },
              { title: "Long-term Tracking", desc: "Track patient metrics over time with visual charts to identify health trends early.", icon: HeartPulse },
              { title: "Secure & Private", desc: "Enterprise-grade encryption ensures all medical data is kept fully confidential.", icon: ShieldCheck },
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  key={i} 
                  className="glass-card rounded-2xl p-8 hover:-translate-y-1 transition-transform"
                >
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
