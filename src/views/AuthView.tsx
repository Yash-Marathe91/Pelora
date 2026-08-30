import React, { useState } from 'react';
import { usePeloraStore } from '@/store/usePeloraStore';
import { ShieldCheck, Anchor, Compass, User, Lock, ArrowRight, Sparkles, CheckCircle2, Building2, Fish, MapPin } from 'lucide-react';

export const AuthView: React.FC = () => {
  const { setActivePage } = usePeloraStore();
  const [role, setRole] = useState<'captain' | 'fleet' | 'scientist' | 'disaster'>('captain');
  const [email, setEmail] = useState('devraj.singh@pelora.marine');
  const [password, setPassword] = useState('••••••••••••');
  const [jetty, setJetty] = useState('Ratnagiri South Jetty (MH-RTG-01)');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate straight to the operational platform (Map or Ask Pelora)
    setActivePage('map');
  };

  return (
    <div className="min-h-screen bg-[#06131A] text-[#EAF6F7] flex flex-col justify-between p-4 sm:p-6 lg:p-8 relative overflow-hidden font-sans">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-biolum-radial pointer-events-none -z-10" />

      {/* Public Header Bar */}
      <header className="max-w-7xl w-full mx-auto flex items-center justify-between py-4">
        <div
          onClick={() => setActivePage('landing')}
          className="flex items-center space-x-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#39D6D0] to-[#116579] flex items-center justify-center text-[#06131A] font-bold font-manrope shadow-md group-hover:scale-105 transition-transform">
            P
          </div>
          <div>
            <span className="text-lg font-extrabold tracking-wider font-manrope text-[#EAF6F7]">
              PELORA
            </span>
            <span className="text-[10px] block font-data-label text-[#39D6D0] font-semibold tracking-widest uppercase">
              ORCA PLATFORM
            </span>
          </div>
        </div>

        <button
          onClick={() => setActivePage('landing')}
          className="text-xs font-bold font-manrope text-[#9BB3B8] hover:text-[#39D6D0] transition-colors"
        >
          ← Back to Product Introduction
        </button>
      </header>

      {/* Main Auth Card Container */}
      <main className="max-w-4xl w-full mx-auto my-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center py-8">
        {/* Left Value Proposition (5 Cols) */}
        <div className="md:col-span-5 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#39D6D0]/10 border border-[#39D6D0]/30 text-xs font-data-label text-[#39D6D0]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Encrypted Marine Authentication</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold font-manrope leading-tight text-[#EAF6F7]">
            Access Pelora <br />
            <span className="text-gradient-cyan">Intelligence Hub</span>
          </h1>

          <p className="text-sm text-[#9BB3B8] font-body leading-relaxed">
            Connect to verified satellite hydrographics, INCOIS buoy streams, and multi-agent reasoning for marine decision support.
          </p>

          <div className="space-y-3 text-xs font-manrope text-[#EAF6F7]">
            <div className="flex items-center space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#75E6B5]" />
              <span>Real-time PFZ catch potential forecasts</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#75E6B5]" />
              <span>Risk-aware coastal hazard early warnings</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#75E6B5]" />
              <span>Multi-agent AI evidence lineage audit</span>
            </div>
          </div>
        </div>

        {/* Right Auth Form (7 Cols) */}
        <div className="md:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#081C24] border border-[#24404A] shadow-2xl space-y-6">
          {/* Role Switcher */}
          <div>
            <label className="block text-xs font-bold text-[#9BB3B8] font-data-label uppercase tracking-wider mb-2">
              Select Operational Role
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'captain', label: 'Captain', icon: Anchor },
                { id: 'fleet', label: 'Fleet Admin', icon: Building2 },
                { id: 'scientist', label: 'Scientist', icon: Compass },
                { id: 'disaster', label: 'Disaster Cmd', icon: ShieldCheck },
              ].map((r) => {
                const Icon = r.icon;
                const isSelected = role === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRole(r.id as any)}
                    className={`p-2.5 rounded-xl border text-center text-xs font-bold font-manrope transition-all flex flex-col items-center justify-center space-y-1 ${
                      isSelected
                        ? 'bg-[#39D6D0]/10 border-[#39D6D0] text-[#39D6D0]'
                        : 'bg-[#06131A] border-[#24404A] text-[#9BB3B8] hover:text-[#EAF6F7]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-[11px]">{r.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#9BB3B8] mb-1 font-data-label">
                Operational Email / Vessel ID
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#06131A] border border-[#24404A] focus:border-[#39D6D0] rounded-xl px-4 py-2.5 text-sm text-[#EAF6F7] focus:outline-none font-manrope pl-10"
                />
                <User className="w-4 h-4 text-[#9BB3B8] absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#9BB3B8] mb-1 font-data-label">
                Security Credentials
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#06131A] border border-[#24404A] focus:border-[#39D6D0] rounded-xl px-4 py-2.5 text-sm text-[#EAF6F7] focus:outline-none font-manrope pl-10"
                />
                <Lock className="w-4 h-4 text-[#9BB3B8] absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#9BB3B8] mb-1 font-data-label">
                Primary Home Port / Base Jetty
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={jetty}
                  onChange={(e) => setJetty(e.target.value)}
                  className="w-full bg-[#06131A] border border-[#24404A] focus:border-[#39D6D0] rounded-xl px-4 py-2.5 text-sm text-[#EAF6F7] focus:outline-none font-manrope pl-10"
                />
                <MapPin className="w-4 h-4 text-[#39D6D0] absolute left-3.5 top-3" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#39D6D0] to-[#6AE7E2] text-[#06131A] font-extrabold text-sm font-manrope rounded-xl hover:brightness-110 transition-all flex items-center justify-center space-x-2 shadow-lg"
            >
              <span>Enter Pelora Platform Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick One-Click Demo Credentials */}
          <div className="pt-2 border-t border-[#24404A]/60 flex items-center justify-between text-xs text-[#9BB3B8] font-data-label">
            <span>Fast-track Demo Entry:</span>
            <button
              onClick={() => setActivePage('map')}
              className="text-[#39D6D0] font-bold hover:underline"
            >
              Log in as Demo Captain Devraj →
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl w-full mx-auto text-center text-xs text-[#9BB3B8]/60 py-4 font-data-label">
        Pelora Marine Intelligence Platform • Security Level: Class-A Encrypted Telemetry Node
      </footer>
    </div>
  );
};
