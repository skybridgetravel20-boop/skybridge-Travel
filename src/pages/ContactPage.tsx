import React, { useState } from 'react';
import { PageHero } from '../components/PageHero';
import { COMPANY_INFO, getWhatsAppLink } from '../data/companyInfo';
import { SKYBRIDGE_OFFICIAL_LOGO } from '../assets/logo';
import { useCrm } from '../context/CrmContext';
import { ServiceType } from '../types';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
  MessageCircle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Facebook,
  Instagram,
  Radio,
  ExternalLink,
  Globe
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { createLead } = useCrm();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: 'Tourist Visa' as ServiceType,
    destination: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successLeadId, setSuccessLeadId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setErrorMessage('Please provide your full name and contact phone number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const newLead = createLead({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        whatsApp: formData.phone,
        service: formData.service,
        destination: formData.destination || 'International Travel',
        source: 'Website',
        notes: `[CONTACT PAGE FORM] ${formData.message}`
      });
      setSuccessLeadId(newLead.id);
    } catch {
      setErrorMessage('An unexpected error occurred. Please contact us directly via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <PageHero
        title="Contact SkyBridge Travel & Tourism"
        subtitle="Reach our international travel specialists in Lahore or connect online for flights, hotels, visa documentation, and customized holiday packages."
        badge="Direct Assistance"
        breadcrumbs={[{ label: 'Contact Us' }]}
        bgImage="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Details & Office */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                {/* Official Brand Badge */}
                <div className="flex items-center gap-3.5 p-3.5 bg-slate-50 border border-slate-200/90 rounded-2xl mb-5 w-fit">
                  <img
                    src={SKYBRIDGE_OFFICIAL_LOGO}
                    alt="SkyBridge Travel & Tourism Official Logo"
                    className="w-12 h-12 aspect-square object-contain bg-white rounded-lg border border-slate-100"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="text-xs font-black text-[#0B1B3B]">
                      SkyBridge Travel & Tourism
                    </div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Official Agency & Consultancy
                    </div>
                  </div>
                </div>

                <span className="text-xs font-bold uppercase tracking-wider text-[#4FC3F7] block mb-2">
                  Get in Touch
                </span>
                <h2 className="text-3xl font-black text-[#0B1B3B] tracking-tight">
                  We're Here to Guide Your Journey
                </h2>
                <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                  Have inquiries regarding visa document requirements, flight schedules, or Umrah arrangements? Speak directly with our dedicated travel consultants.
                </p>
              </div>

              {/* Official Details Cards */}
              <div className="space-y-4">
                {/* Pakistan Office & Google Maps */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#E3F2FD] text-[#0B1B3B] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 text-[#4FC3F7]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        🇵🇰 Registered Pakistan Office
                      </h3>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        Official HQ
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-[#0B1B3B] mt-1 leading-snug">
                      {COMPANY_INFO.addressLahore}
                    </p>
                    <a
                      href={COMPANY_INFO.officialGoogleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-2.5 text-xs font-bold text-[#0288D1] hover:text-[#0B1B3B] bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs transition-colors"
                    >
                      <MapPin className="w-3.5 h-3.5 text-[#4FC3F7]" />
                      <span>Open on Google Maps</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  </div>
                </div>

                {/* Direct Phone Lines with Pakistan & UAE labeling */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#E3F2FD] text-[#0B1B3B] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-5 h-5 text-[#4FC3F7]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      🇵🇰 Pakistan Office Phone Lines
                    </h3>
                    <div className="mt-1.5 space-y-1.5 text-sm font-semibold text-[#0B1B3B]">
                      <div className="flex items-center justify-between bg-white px-3 py-1.5 rounded-xl border border-slate-100">
                        <a href={`tel:${COMPANY_INFO.phonePakistan1.replace(/\s+/g, '')}`} className="hover:text-[#4FC3F7]">
                          {COMPANY_INFO.phonePakistan1}
                        </a>
                        <span className="text-[10px] text-slate-400 font-mono">Line 1</span>
                      </div>
                      <div className="flex items-center justify-between bg-white px-3 py-1.5 rounded-xl border border-slate-100">
                        <a href={`tel:${COMPANY_INFO.phonePakistan2.replace(/\s+/g, '')}`} className="hover:text-[#4FC3F7]">
                          {COMPANY_INFO.phonePakistan2}
                        </a>
                        <span className="text-[10px] text-slate-400 font-mono">Line 2</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#E3F2FD] text-[#0B1B3B] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-5 h-5 text-[#4FC3F7]" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Official Inquiries Email
                    </h3>
                    <p className="text-sm font-semibold text-[#0B1B3B] mt-0.5">
                      <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-[#4FC3F7]">
                        {COMPANY_INFO.email}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Official Website */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#E3F2FD] text-[#0B1B3B] flex items-center justify-center shrink-0 mt-0.5">
                    <Globe className="w-5 h-5 text-[#4FC3F7]" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Official Website
                    </h3>
                    <p className="text-sm font-semibold text-[#0B1B3B] mt-0.5">
                      <a href={COMPANY_INFO.websiteUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#4FC3F7]">
                        skybridgetravelandtourism.com
                      </a>
                    </p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#E3F2FD] text-[#0B1B3B] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-5 h-5 text-[#FFB300]" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Consultation Hours
                    </h3>
                    <p className="text-sm font-semibold text-[#0B1B3B] mt-0.5">
                      {COMPANY_INFO.workingHours}
                    </p>
                  </div>
                </div>
              </div>

              {/* Fast WhatsApp CTA */}
              <div className="p-6 rounded-3xl bg-[#25D366]/10 border border-[#25D366]/30 space-y-3">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                  <MessageCircle className="w-5 h-5 text-[#25D366]" />
                  <span>Official WhatsApp Contact</span>
                </div>
                <p className="text-xs text-emerald-900 leading-relaxed">
                  Need quick advice or want to share documents for preliminary review? Chat directly with our consultants on WhatsApp.
                </p>
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs shadow-md transition-colors"
                >
                  <span>Message SkyBridge Travel & Tourism on WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Verified Social Media & Channels */}
              <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Official Channels & Social Communities
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={COMPANY_INFO.officialWhatsAppChannelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2.5 bg-white hover:bg-emerald-50 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:text-emerald-700 transition-colors"
                  >
                    <Radio className="w-4 h-4 text-emerald-600" />
                    <span>WA Channel</span>
                  </a>
                  <a
                    href={COMPANY_INFO.officialFacebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2.5 bg-white hover:bg-blue-50 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:text-blue-700 transition-colors"
                  >
                    <Facebook className="w-4 h-4 text-blue-600" />
                    <span>Facebook</span>
                  </a>
                  <a
                    href={COMPANY_INFO.officialInstagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2.5 bg-white hover:bg-pink-50 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:text-pink-600 transition-colors"
                  >
                    <Instagram className="w-4 h-4 text-pink-600" />
                    <span>Instagram</span>
                  </a>
                  <a
                    href={COMPANY_INFO.officialGoogleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2.5 bg-white hover:bg-sky-50 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:text-sky-700 transition-colors"
                  >
                    <MapPin className="w-4 h-4 text-[#4FC3F7]" />
                    <span>Google Maps</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Interactive Contact Form */}
            <div className="lg:col-span-7 bg-slate-50 rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-md">
              {successLeadId ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center border border-emerald-200 shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0B1B3B]">
                    Inquiry Submitted Successfully
                  </h3>
                  <div className="inline-block px-3 py-1 rounded-full bg-[#E3F2FD] text-[#0B1B3B] text-xs font-semibold">
                    Inquiry Reference: <span className="font-mono">{successLeadId}</span>
                  </div>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Your request has been received. Our team will contact you to confirm availability and next steps.
                  </p>
                  <div className="pt-4 flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setSuccessLeadId(null);
                        setFormData({
                          fullName: '',
                          email: '',
                          phone: '',
                          service: 'Tourist Visa',
                          destination: '',
                          message: ''
                        });
                      }}
                      className="px-6 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-colors"
                    >
                      Send Another Message
                    </button>
                    <a
                      href={getWhatsAppLink(`Hello SkyBridge, I just submitted an inquiry on your contact page with reference ${successLeadId}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-bold hover:bg-[#1EBE5D] transition-colors"
                    >
                      Follow-up on WhatsApp
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#0B1B3B]">
                      Send Us an Inquiry
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Fill out this form and a designated consultant will respond promptly.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-3 text-xs bg-rose-50 text-rose-700 border border-rose-200 rounded-xl">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Bilal Ahmed"
                        value={formData.fullName}
                        onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Phone / WhatsApp Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+92 300 1234567"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="bilal@example.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Requested Service
                      </label>
                      <select
                        value={formData.service}
                        onChange={e => setFormData({ ...formData, service: e.target.value as ServiceType })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                      >
                        <option value="Tourist Visa">Tourist Visa Assistance</option>
                        <option value="Family Visa">Family Visa Application</option>
                        <option value="Student Visa">Student Visa File</option>
                        <option value="Flight Booking">Flight Booking Assistance</option>
                        <option value="Hotel Booking">Hotel Booking Assistance</option>
                        <option value="Tour Package">Tour / Holiday Package</option>
                        <option value="Honeymoon Package">Honeymoon Package</option>
                        <option value="Umrah Package">Umrah Travel Package</option>
                        <option value="Documentation Assistance">Documentation Clearance & Cover Letter</option>
                        <option value="Airport Transportation">Airport Transportation</option>
                        <option value="Other">General Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Destination of Interest
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. France, UK, Dubai, Turkey, Saudi Arabia"
                      value={formData.destination}
                      onChange={e => setFormData({ ...formData, destination: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Message / Specific Requirements
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your planned travel dates, number of travelers, previous travel history, or questions..."
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7] resize-none"
                    ></textarea>
                  </div>

                  <div className="p-3.5 bg-white rounded-2xl border border-slate-200 text-[11px] text-slate-500 leading-relaxed">
                    {COMPANY_INFO.visaDisclaimer}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-2xl bg-[#0B1B3B] hover:bg-[#4FC3F7] hover:text-[#0B1B3B] text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? 'Sending Request...' : 'Send Travel Inquiry'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
