import React, { useState } from 'react';
import { X, CheckCircle2, Send, ShieldAlert, Sparkles, Phone, Mail, User, Calendar, Users, MapPin } from 'lucide-react';
import { useCrm } from '../context/CrmContext';
import { ServiceType } from '../types';
import { COMPANY_INFO, getWhatsAppLink } from '../data/companyInfo';

interface BookingInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: ServiceType;
  defaultDestination?: string;
  defaultTitle?: string;
  isBookingRequest?: boolean;
}

export const BookingInquiryModal: React.FC<BookingInquiryModalProps> = ({
  isOpen,
  onClose,
  defaultService = 'Tourist Visa',
  defaultDestination = '',
  defaultTitle,
  isBookingRequest = false
}) => {
  const { createLead } = useCrm();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    whatsApp: '',
    service: defaultService,
    destination: defaultDestination,
    travelDate: '',
    passengers: 1,
    message: ''
  });

  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setErrorMsg('Please provide your full name and contact phone number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const newLead = createLead({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        whatsApp: formData.whatsApp || formData.phone,
        service: formData.service,
        destination: formData.destination || 'International',
        travelDate: formData.travelDate,
        passengers: Number(formData.passengers),
        source: 'Website',
        notes: `${isBookingRequest ? '[BOOKING REQUEST]' : '[WEBSITE INQUIRY]'} ${defaultTitle ? `Item: ${defaultTitle}. ` : ''}${formData.message}`
      });

      setSubmittedLeadId(newLead.id);
    } catch {
      setErrorMsg('Failed to process request. Please contact us via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedLeadId(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      whatsApp: '',
      service: defaultService,
      destination: defaultDestination,
      travelDate: '',
      passengers: 1,
      message: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1B3B]/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#0B1B3B] text-white p-6 sm:px-8 flex items-start justify-between relative">
          <div className="pr-8">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-[#4FC3F7]/20 text-[#4FC3F7] border border-[#4FC3F7]/30">
                <Sparkles className="w-3 h-3 text-[#FFB300]" />
                {isBookingRequest ? 'Booking Request' : 'Travel & Visa Inquiry'}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              {defaultTitle ? defaultTitle : isBookingRequest ? 'Request Travel Booking Assistance' : 'Inquire With SkyBridge Specialists'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Personalized itineraries, embassy-compliant documentation & quotation support.
            </p>
          </div>
          <button
            onClick={handleReset}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {submittedLeadId ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center border border-emerald-200 shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-[#0B1B3B]">
                  {isBookingRequest ? 'Booking Request Received' : 'Inquiry Submitted Successfully'}
                </h4>
                <div className="inline-block my-2 px-3 py-1 rounded-full bg-[#E3F2FD] text-[#0B1B3B] text-xs font-semibold">
                  Reference ID: <span className="font-mono text-[#0B1B3B]">{submittedLeadId}</span>
                </div>
                <p className="text-sm text-slate-600 max-w-md mx-auto mt-2 leading-relaxed">
                  Your request has been received. Our team will contact you to confirm availability and next steps.
                </p>
              </div>

              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200/70 text-left text-xs text-amber-900 flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Important Notice:</span> All bookings and reservations are subject to supplier confirmation and travel file review. No ticket or hotel reservation is finalized until formally issued with official references.
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold transition-colors"
                >
                  Done
                </button>
                <a
                  href={getWhatsAppLink(`Hello SkyBridge, I just submitted request ${submittedLeadId} regarding ${formData.service} for ${formData.destination || 'travel'}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-sm font-semibold shadow-md transition-colors"
                >
                  Fast-Track on WhatsApp
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 text-xs bg-rose-50 text-rose-700 border border-rose-200 rounded-xl">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Muhammad Tariq"
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7] focus:bg-white focus:ring-2 focus:ring-[#4FC3F7]/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone / WhatsApp <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="+92 300 1234567"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value, whatsApp: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7] focus:bg-white focus:ring-2 focus:ring-[#4FC3F7]/20"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7] focus:bg-white focus:ring-2 focus:ring-[#4FC3F7]/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Service Required
                  </label>
                  <select
                    value={formData.service}
                    onChange={e => setFormData({ ...formData, service: e.target.value as ServiceType })}
                    className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7] focus:bg-white"
                  >
                    <option value="Tourist Visa">Tourist Visa</option>
                    <option value="Family Visa">Family Visa</option>
                    <option value="Student Visa">Student Visa</option>
                    <option value="Flight Booking">Flight Booking Assistance</option>
                    <option value="Hotel Booking">Hotel Booking Assistance</option>
                    <option value="Tour Package">Tour & Holiday Package</option>
                    <option value="Honeymoon Package">Honeymoon Package</option>
                    <option value="Umrah Package">Umrah Travel Package</option>
                    <option value="Documentation Assistance">Documentation File Preparation</option>
                    <option value="Airport Transportation">Airport Transportation</option>
                    <option value="Other">Other Travel Service</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Destination
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. France / Saudi Arabia"
                      value={formData.destination}
                      onChange={e => setFormData({ ...formData, destination: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Target Travel Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="date"
                      value={formData.travelDate}
                      onChange={e => setFormData({ ...formData, travelDate: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Travelers
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="number"
                      min={1}
                      max={50}
                      value={formData.passengers}
                      onChange={e => setFormData({ ...formData, passengers: Math.max(1, parseInt(e.target.value) || 1) })}
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7] focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Specific Requirements or Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Share details such as preferred airline, hotel standard, previous visa history, or travel dates..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7] focus:bg-white resize-none"
                ></textarea>
              </div>

              <div className="text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200/60 leading-relaxed">
                {COMPANY_INFO.visaDisclaimer}
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0B1B3B] hover:bg-[#4FC3F7] hover:text-[#0B1B3B] text-white text-xs font-bold shadow-md transition-all disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  {isSubmitting ? 'Submitting...' : isBookingRequest ? 'Send Booking Request' : 'Submit Travel Inquiry'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
