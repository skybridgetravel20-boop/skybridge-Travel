import React, { useState } from 'react';
import { 
  Globe, 
  Github, 
  CheckCircle2, 
  Copy, 
  ExternalLink, 
  ShieldCheck, 
  AlertTriangle, 
  Server, 
  FileCode, 
  RefreshCw,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const GitHubDomainManager: React.FC = () => {
  const [domainInput, setDomainInput] = useState('skybridgetours.com');
  const [githubUser, setGithubUser] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState<number>(1);

  const cleanDomain = domainInput.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  const cnameTarget = githubUser.trim() 
    ? `${githubUser.trim().toLowerCase()}.github.io`
    : '<your-github-username>.github.io';

  const dnsRecords = [
    { type: 'A Record', host: '@', value: '185.199.108.153', ttl: 'Automatic', desc: 'GitHub Pages IP 1' },
    { type: 'A Record', host: '@', value: '185.199.109.153', ttl: 'Automatic', desc: 'GitHub Pages IP 2' },
    { type: 'A Record', host: '@', value: '185.199.110.153', ttl: 'Automatic', desc: 'GitHub Pages IP 3' },
    { type: 'A Record', host: '@', value: '185.199.111.153', ttl: 'Automatic', desc: 'GitHub Pages IP 4' },
    { type: 'CNAME Record', host: 'www', value: cnameTarget, ttl: 'Automatic', desc: 'WWW Subdomain routing' }
  ];

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const steps = [
    {
      id: 1,
      title: 'GitHub Pages Source: Select GitHub Actions',
      desc: 'In your GitHub repo > Settings > Pages, change "Source" from "Deploy from a branch" to "GitHub Actions".',
      badge: 'Auto-Configured'
    },
    {
      id: 2,
      title: 'Namecheap: Add 4 A-Records & 1 CNAME',
      desc: 'In Namecheap > Domain List > Manage > Advanced DNS, remove parking records and add GitHub IPs.',
      badge: 'Required'
    },
    {
      id: 3,
      title: 'Link Domain & Enforce HTTPS in GitHub',
      desc: 'In GitHub Pages Settings, type your domain, save, wait 10 mins, and check "Enforce HTTPS".',
      badge: 'SSL Security'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 border border-slate-700/80 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Auto-Deploy Workflow Ready
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[11px] font-bold">
                Namecheap DNS Preset
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <Github className="w-6 h-6 text-slate-200" />
              GitHub &amp; Namecheap Custom Domain Manager
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              Publish your website to GitHub Pages and bind your Namecheap domain with automated Vite builds, zero-404 SPA routing, and permanent CNAME preservation.
            </p>
          </div>

          {/* Domain Quick Input */}
          <div className="w-full lg:w-auto bg-slate-950/80 border border-slate-700 rounded-xl p-3 sm:p-4 min-w-[280px]">
            <label className="text-[11px] font-bold text-slate-400 block mb-1.5 uppercase tracking-wider">
              Your Namecheap Domain:
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Globe className="w-4 h-4 text-amber-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  value={domainInput}
                  onChange={(e) => setDomainInput(e.target.value)}
                  placeholder="e.g. yourdomain.com"
                  className="w-full pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
            <div className="mt-2 flex items-center gap-1.5">
              <input
                type="text"
                value={githubUser}
                onChange={(e) => setGithubUser(e.target.value)}
                placeholder="GitHub Username (optional)"
                className="w-full px-2.5 py-1 bg-slate-900/90 border border-slate-800 rounded text-[11px] font-mono text-slate-300 focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3 Step Interactive Progress */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {steps.map((step) => {
          const isSelected = activeStep === step.id;
          return (
            <div 
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                isSelected 
                  ? 'bg-slate-900 border-amber-400/80 shadow-lg shadow-amber-500/5' 
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                  isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}>
                  {step.id}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {step.badge}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mb-1">{step.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Step 2 Focused: Namecheap DNS Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Server className="w-5 h-5 text-amber-400" />
              Namecheap Advanced DNS Configuration Records
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Copy and paste these exact 5 records into your Namecheap Domain Dashboard under <strong>Advanced DNS &gt; Host Records</strong>.
            </p>
          </div>

          <a
            href="https://ap.www.namecheap.com/domains/domaincontrolpanel"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Open Namecheap Dashboard</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* DNS Records Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Host</th>
                <th className="py-3 px-4">Value / Target IP</th>
                <th className="py-3 px-4">TTL</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 bg-slate-900/50">
              {dnsRecords.map((rec, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">
                    {rec.type}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-300 font-bold">
                    {rec.host}
                  </td>
                  <td className="py-3 px-4 font-mono text-blue-300">
                    <span className="bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                      {rec.value}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-400">
                    {rec.ttl}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleCopy(`dns-${idx}`, rec.value)}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 text-[11px] font-bold inline-flex items-center gap-1 cursor-pointer transition-all"
                    >
                      {copiedKey === `dns-${idx}` ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Value</span>
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Warning & Important Namecheap Note */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-start gap-3 text-xs text-amber-200">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold block">Important Namecheap Clean-Up:</span>
            <p className="text-slate-300">
              Before adding the 4 A Records, make sure to <strong>delete any pre-existing default records</strong> in Namecheap (such as the default <em>ParkingPage</em> record or existing URL redirects). Having two conflicting records on the <strong>@</strong> host will prevent GitHub from verifying your domain.
            </p>
          </div>
        </div>
      </div>

      {/* Automated Repo Assets Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* GitHub Actions Status */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <FileCode className="w-4 h-4 text-blue-400" />
              Automated GitHub Actions Workflow
            </h4>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Installed (.github/workflows/deploy.yml)
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Every time you push or export to GitHub, GitHub Actions runs <code className="text-amber-300 bg-slate-950 px-1 py-0.5 rounded font-mono">npm run build</code>, bundles your React SPA, and pushes directly to GitHub Pages without requiring any manual terminal commands.
          </p>

          <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 font-mono text-[11px] text-slate-400 space-y-1">
            <div className="text-emerald-400 font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> GitHub Pages Source Mode:
            </div>
            <div className="pl-5 text-slate-300">GitHub Repo &gt; Settings &gt; Pages &gt; Source: <strong>GitHub Actions</strong></div>
          </div>
        </div>

        {/* CNAME & 404 Routing Status */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              CNAME &amp; Single Page App Fallback
            </h4>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Installed (public/CNAME &amp; public/404.html)
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            The project includes an active <code className="text-amber-300 bg-slate-950 px-1 py-0.5 rounded font-mono">public/404.html</code> redirection engine so direct visits to routes like <code className="text-blue-300 bg-slate-950 px-1 py-0.5 rounded font-mono">/packages</code>, <code className="text-blue-300 bg-slate-950 px-1 py-0.5 rounded font-mono">/visa-services</code>, and <code className="text-blue-300 bg-slate-950 px-1 py-0.5 rounded font-mono">/ceo</code> never fail.
          </p>

          <div className="flex items-center justify-between bg-slate-950 rounded-xl p-3 border border-slate-800">
            <div>
              <div className="text-[11px] text-slate-400">Current CNAME File Target:</div>
              <div className="text-xs font-mono font-bold text-white">{cleanDomain || 'skybridgetours.com'}</div>
            </div>
            <button
              onClick={() => handleCopy('cname-file', cleanDomain || 'skybridgetours.com')}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              {copiedKey === 'cname-file' ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>Copy CNAME</span>
            </button>
          </div>
        </div>
      </div>

      {/* External Verifiers & Tools */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <RefreshCw className="w-4 h-4 text-blue-400 animate-spin" />
          <span>Verify DNS propagation worldwide after configuring Namecheap:</span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`https://www.whatsmydns.net/#A/${cleanDomain || 'skybridgetours.com'}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-blue-300 rounded border border-slate-700 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>WhatsMyDNS Check</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href={`https://dns.google/resolve?name=${cleanDomain || 'skybridgetours.com'}&type=A`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-emerald-300 rounded border border-slate-700 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Google Public DNS</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
