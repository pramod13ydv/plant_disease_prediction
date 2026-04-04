import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import Scan from "./pages/Scan";
import Result from "./pages/Result";
import History from "./pages/History";
import Chat from "./pages/Chat";
import Settings from "./pages/Settings";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/result/:id" element={<Result />} />
          <Route path="/history" element={<History />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </div>
  );
}
