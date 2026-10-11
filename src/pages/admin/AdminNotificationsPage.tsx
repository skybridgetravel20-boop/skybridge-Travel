import React, { useState } from 'react';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Trash2,
  ExternalLink,
  Search,
  Filter,
  CheckCheck
} from 'lucide-react';
import { useCrm } from '../../context/CrmContext';

export const AdminNotificationsPage: React.FC = () => {
  const { notifications, markNotificationRead, clearNotifications } = useCrm();
  const [filterType, setFilterType] = useState('All');

  const filteredNotifications = notifications.filter(n => {
    if (filterType !== 'All' && n.type !== filterType) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
              SECTION 24 • NOTIFICATIONS
            </span>
            <span className="text-xs text-slate-500 font-medium">Real-Time Operational Alerts</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1 flex items-center gap-2.5">
            <Bell className="w-7 h-7 text-amber-600" />
            Executive Notifications & Deadline Reminders
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            System alerts for new web leads, consular tariff changes, expiring scholarship deadlines, and urgent customer follow-ups.
          </p>
        </div>

        <button
          onClick={clearNotifications}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold self-start sm:self-center transition-colors"
        >
          <Trash2 className="w-4 h-4 text-slate-400" />
          Clear All Notifications
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {['All', 'lead', 'followup', 'visa', 'price'].map(type => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterType === type
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {type === 'All' ? 'All Alerts' : type.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-sm">
        {filteredNotifications.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2 opacity-80" />
            No notifications in this queue. Everything is up to date!
          </div>
        ) : (
          filteredNotifications.map(notif => (
            <div
              key={notif.id}
              className={`p-4 flex items-start justify-between gap-3 transition-colors ${
                notif.read ? 'bg-white' : 'bg-amber-50/40'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                    notif.type === 'lead'
                      ? 'bg-blue-50 text-blue-600 border border-blue-200'
                      : notif.type === 'visa'
                      ? 'bg-purple-50 text-purple-600 border border-purple-200'
                      : 'bg-amber-50 text-amber-600 border border-amber-200'
                  }`}
                >
                  <Bell className="w-4 h-4" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 text-sm">{notif.title}</h4>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{notif.message}</p>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3" />
                    {new Date(notif.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {!notif.read && (
                  <button
                    onClick={() => markNotificationRead(notif.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                    title="Mark as read"
                  >
                    <CheckCheck className="w-4 h-4" />
                  </button>
                )}
                {notif.link && (
                  <a
                    href={notif.link}
                    className="p-1.5 rounded-lg text-indigo-600 hover:bg-indigo-50 border border-indigo-200"
                    title="Open destination"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
