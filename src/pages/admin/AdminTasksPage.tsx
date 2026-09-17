import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import { LeadPriority } from '../../types';
import {
  CheckSquare,
  Plus,
  Calendar,
  Clock,
  CheckCircle2,
  Trash2,
  AlertCircle
} from 'lucide-react';

export const AdminTasksPage: React.FC = () => {
  const { tasks, createTask, updateTaskStatus, deleteTask, auth } = useCrm();
  const [filterStatus, setFilterStatus] = useState<'All' | 'Pending' | 'In Progress' | 'Completed'>('All');
  const [modalOpen, setModalOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [priority, setPriority] = useState<LeadPriority>('Medium');

  const filteredTasks = tasks.filter(t => {
    if (filterStatus === 'All') return true;
    return t.status === filterStatus;
  });

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      createTask(title.trim(), dueDate, priority);
      setModalOpen(false);
      setTitle('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0B1B3B] tracking-tight">
            Staff Task Board
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Internal task assignments, document reviews, embassy submission schedules, and client reminders.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-[#0B1B3B] hover:bg-[#4FC3F7] hover:text-[#0B1B3B] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Task</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-2 flex-wrap">
        {(['All', 'Pending', 'In Progress', 'Completed'] as const).map(status => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterStatus === status
                ? 'bg-[#0B1B3B] text-white'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {status} ({status === 'All' ? tasks.length : tasks.filter(t => t.status === status).length})
          </button>
        ))}
      </div>

      {/* Tasks Table / List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-[#0B1B3B]">No tasks in this filter</h3>
            <p className="text-xs text-slate-400 mt-1">All current duties have been processed.</p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <div
              key={task.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                task.status === 'Completed'
                  ? 'bg-slate-50/70 border-slate-200/70 opacity-75'
                  : 'bg-white border-slate-200 shadow-2xs'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`font-bold text-sm ${task.status === 'Completed' ? 'line-through text-slate-400' : 'text-[#0B1B3B]'}`}>
                    {task.title}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    task.priority === 'High' ? 'bg-rose-100 text-rose-700' :
                    task.priority === 'Medium' ? 'bg-amber-100 text-amber-800' :
                    'bg-emerald-100 text-emerald-800'
                  }`}>
                    {task.priority}
                  </span>
                </div>

                <div className="text-[11px] text-slate-400 flex items-center gap-3">
                  <span>Due: <strong className="text-slate-700 font-mono">{task.dueDate}</strong></span>
                  <span>•</span>
                  <span>Assigned to: <strong className="text-slate-700">{task.assignedTo}</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <select
                  value={task.status}
                  onChange={e => updateTaskStatus(task.id, e.target.value as any)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl border focus:outline-none ${
                    task.status === 'Completed' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                    task.status === 'In Progress' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                    'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Delete Task"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* New Task Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-[#0B1B3B]">Create Staff Task</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-xs font-bold">
                Cancel
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Task Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Audit bank balance certificate for UK file"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Due Date</label>
                <input
                  type="date"
                  required
                  value={dueDate}
                  onChange={e => setDueDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Priority</label>
                <select
                  value={priority}
                  onChange={e => setPriority(e.target.value as LeadPriority)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#0B1B3B] text-white text-xs font-bold hover:bg-[#4FC3F7] hover:text-[#0B1B3B] transition-colors"
              >
                Create Task
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
