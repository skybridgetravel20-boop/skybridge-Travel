import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  CheckCircle2,
  AlertTriangle,
  Play,
  Pause,
  RefreshCw,
  Search,
  Filter,
  Shield,
  Layers,
  Clock,
  Terminal,
  ExternalLink,
  Cpu,
  ChevronRight,
  Database,
  Sliders,
  CheckCheck
} from 'lucide-react';
import { useCrm } from '../../context/CrmContext';
import { AiAgentRegistryItem, AgentOperationalStatus } from '../../types';

export const AdminAgentControlPage: React.FC = () => {
  const { aiAgents, toggleAiAgentStatus, testAiAgent } = useCrm();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [testingAgentId, setTestingAgentId] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<{ id: string; success: boolean; message: string } | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<AiAgentRegistryItem | null>(null);

  const filteredAgents = aiAgents.filter(agent => {
    const matchesSearch =
      agent.name.toLowerCase().includes(search.toLowerCase()) ||
      agent.shortCode.toLowerCase().includes(search.toLowerCase()) ||
      agent.purpose.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || agent.operationalStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleTestAgent = async (id: string) => {
    setTestingAgentId(id);
    setTestResult(null);
    try {
      const res = await testAiAgent(id);
      setTestResult({ id, success: res.success, message: res.message });
    } catch {
      setTestResult({ id, success: false, message: 'Diagnostic test timed out or encountered an error.' });
    } finally {
      setTestingAgentId(null);
    }
  };

  const getStatusBadge = (status: AgentOperationalStatus) => {
    switch (status) {
      case 'Active and Tested':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" /> Active & Tested
          </span>
        );
      case 'Active but Not Fully Tested':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-600 border border-sky-500/20">
            <RefreshCw className="w-3.5 h-3.5" /> Testing in Progress
          </span>
        );
      case 'Needs Configuration':
      case 'API Required':
      case 'Authentication Required':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 border border-amber-500/20">
            <AlertTriangle className="w-3.5 h-3.5" /> {status}
          </span>
        );
      case 'Paused':
      case 'Disabled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-500/10 text-slate-500 border border-slate-500/20">
            <Pause className="w-3.5 h-3.5" /> {status}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-600 border border-rose-500/20">
            <AlertTriangle className="w-3.5 h-3.5" /> {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200">
              SECTION 5 • CENTRAL REGISTRY
            </span>
            <span className="text-xs text-slate-500">10 Specialized Operational Agents</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1 flex items-center gap-2.5">
            <Cpu className="w-7 h-7 text-indigo-600" />
            AI Agent Control Centre
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Supervise, diagnose, test, and control all SkyBridge Travel & Tourism AI intelligence agents under the direct oversight of Director Urwa Ali.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-medium text-slate-500">Autonomous Execution</div>
            <div className="text-sm font-bold text-slate-800">Server-Side & Grounded</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-600/20">
            <Bot className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Test Notice if triggered */}
      {testResult && (
        <div
          className={`p-4 rounded-xl border flex items-start justify-between gap-3 ${
            testResult.success
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}
        >
          <div className="flex items-start gap-2.5">
            {testResult.success ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-rose-600 mt-0.5 shrink-0" />
            )}
            <div>
              <div className="text-sm font-bold">Diagnostic Execution Report</div>
              <div className="text-xs mt-0.5">{testResult.message}</div>
            </div>
          </div>
          <button
            onClick={() => setTestResult(null)}
            className="text-xs font-semibold px-2 py-1 rounded hover:bg-black/5"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-xl border border-slate-200/80">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search agents by name, short code, or purpose..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Operational Statuses</option>
            <option value="Active and Tested">Active & Tested</option>
            <option value="Active but Not Fully Tested">Testing in Progress</option>
            <option value="Needs Configuration">Needs Configuration</option>
            <option value="Paused">Paused</option>
          </select>
        </div>
      </div>

      {/* Agent Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredAgents.map(agent => {
          const isTesting = testingAgentId === agent.id;
          return (
            <div
              key={agent.id}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-indigo-300 transition-all shadow-sm hover:shadow-md flex flex-col justify-between overflow-hidden"
            >
              <div className="p-5 space-y-4">
                {/* Top Bar */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-mono font-bold text-slate-700 text-xs">
                      {agent.id.replace('AGENT-', '#')}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base leading-snug">{agent.name}</h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="font-mono text-xs text-indigo-600 font-semibold bg-indigo-50 px-1.5 py-0.5 rounded">
                          {agent.shortCode}
                        </span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-500 font-medium">Owner: {agent.owner}</span>
                      </div>
                    </div>
                  </div>
                  <div>{getStatusBadge(agent.operationalStatus)}</div>
                </div>

                {/* Purpose */}
                <p className="text-sm text-slate-600 line-clamp-2">{agent.purpose}</p>

                {/* Responsibilities list */}
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-xs space-y-1.5">
                  <div className="font-semibold text-slate-700 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-indigo-500" />
                    Key Responsibilities:
                  </div>
                  {agent.responsibilities.slice(0, 3).map((resp, idx) => (
                    <div key={idx} className="text-slate-600 pl-4 relative before:content-['•'] before:absolute before:left-1 before:text-slate-400">
                      {resp}
                    </div>
                  ))}
                  {agent.responsibilities.length > 3 && (
                    <div className="text-slate-400 text-[11px] pl-4">
                      +{agent.responsibilities.length - 3} additional duties
                    </div>
                  )}
                </div>

                {/* Data Sources & Schedule */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-50/80 border border-slate-100">
                    <span className="text-slate-400 font-medium block text-[10px] uppercase">Schedule</span>
                    <span className="text-slate-700 font-semibold truncate block mt-0.5">{agent.schedule}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50/80 border border-slate-100">
                    <span className="text-slate-400 font-medium block text-[10px] uppercase">Model / Engine</span>
                    <span className="text-slate-700 font-semibold truncate block mt-0.5">{agent.version}</span>
                  </div>
                </div>

                {/* Tools & Permissions */}
                <div className="flex flex-wrap gap-1.5 text-[11px]">
                  {agent.permittedTools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-mono font-medium border border-slate-200/60"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Footer */}
              <div className="px-5 py-3.5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="text-[11px] text-slate-500">
                  Last tested: <strong className="text-slate-700">{agent.lastTestedDate || '2026-10-09'}</strong>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleAiAgentStatus(agent.id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-300 hover:bg-slate-100 text-slate-700 transition-colors flex items-center gap-1.5"
                  >
                    {agent.operationalStatus === 'Active and Tested' ? (
                      <>
                        <Pause className="w-3.5 h-3.5 text-slate-500" /> Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 text-emerald-600" /> Resume
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleTestAgent(agent.id)}
                    disabled={isTesting}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors flex items-center gap-1.5 shadow-sm shadow-indigo-600/20 disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
                    {isTesting ? 'Testing...' : 'Run Test'}
                  </button>

                  <button
                    onClick={() => setSelectedAgent(agent)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60"
                    title="View Full Configuration & Tools"
                  >
                    <Sliders className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Configuration Detail Modal */}
      {selectedAgent && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-indigo-600 uppercase">
                  {selectedAgent.id} • {selectedAgent.shortCode}
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-0.5">{selectedAgent.name}</h2>
              </div>
              <button
                onClick={() => setSelectedAgent(null)}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <strong className="text-slate-700 block text-xs uppercase mb-1">Purpose & Mandate</strong>
                <p className="text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200/70">
                  {selectedAgent.purpose}
                </p>
              </div>

              <div>
                <strong className="text-slate-700 block text-xs uppercase mb-1">Permitted Tools & Grounding</strong>
                <div className="flex flex-wrap gap-1.5">
                  {selectedAgent.permittedTools.map((t, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-mono font-semibold border border-indigo-200/60">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <strong className="text-slate-700 block text-xs uppercase mb-1">Read Permissions</strong>
                  <ul className="text-xs text-slate-600 space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                    {selectedAgent.readPermissions.map((r, i) => (
                      <li key={i}>• {r}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <strong className="text-slate-700 block text-xs uppercase mb-1">Write Permissions</strong>
                  <ul className="text-xs text-slate-600 space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                    {selectedAgent.writePermissions.map((w, i) => (
                      <li key={i}>• {w}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <strong className="text-slate-700 block text-xs uppercase mb-1">Data Sources</strong>
                <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                  {selectedAgent.dataSources.join(' • ')}
                </div>
              </div>

              {selectedAgent.configurationNotes && (
                <div>
                  <strong className="text-slate-700 block text-xs uppercase mb-1">Audited Notes & Health</strong>
                  <div className="text-xs text-slate-600 bg-amber-50/60 p-2.5 rounded-xl border border-amber-200/60">
                    {selectedAgent.configurationNotes}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedAgent(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-white hover:bg-slate-900"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
