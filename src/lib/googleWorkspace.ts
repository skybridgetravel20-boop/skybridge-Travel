// Google Workspace Integration Utilities for SkyBridge Travel & Tourism
// Covers Google Sheets, Drive, Gmail, Calendar, Docs, Slides, Tasks, Chat, Forms

export interface GoogleWorkspaceState {
  isAuthenticated: boolean;
  userEmail: string | null;
  accessToken: string | null;
  lastSyncTime: string;
}

export const WORKSPACE_SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/documents',
  'https://www.googleapis.com/auth/presentations',
  'https://www.googleapis.com/auth/tasks',
  'https://www.googleapis.com/auth/chat.spaces',
  'https://www.googleapis.com/auth/forms.body'
];

// Helper to generate Google Calendar Event URL
export function createGoogleCalendarUrl(event: {
  title: string;
  details: string;
  location: string;
  startDate: string; // YYYYMMDDTHHmmssZ
  endDate: string;
}) {
  const base = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
  return `${base}&text=${encodeURIComponent(event.title)}&details=${encodeURIComponent(event.details)}&location=${encodeURIComponent(event.location)}&dates=${event.startDate}/${event.endDate}`;
}

// Helper to generate Gmail compose URL
export function createGmailComposeUrl(params: {
  to: string;
  subject: string;
  body: string;
}) {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(params.to)}&su=${encodeURIComponent(params.subject)}&body=${encodeURIComponent(params.body)}`;
}

// Helper to sanitize Google Sheets cell value strictly per Section 8 guidelines:
// Fix existing problems where fields show "undefined". If information was not supplied: "Not provided".
export function cleanSheetValue(val: any): string {
  if (
    val === undefined ||
    val === null ||
    val === 'undefined' ||
    val === 'null' ||
    (typeof val === 'string' && val.trim() === '')
  ) {
    return 'Not provided';
  }
  return String(val);
}

// Helper to export CSV/Sheets format ensuring all undefined/null values are replaced with 'Not provided'
export function downloadCrmDataAsSheet(filename: string, headers: string[], rows: any[][]) {
  const csvContent = [
    headers.map(h => `"${cleanSheetValue(h).replace(/"/g, '""')}"`).join(','),
    ...rows.map(row => row.map(val => `"${cleanSheetValue(val).replace(/"/g, '""')}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
