import React, { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Search,
  MessageCircle,
  Sparkles,
  CheckCircle2,
  Share2,
  Copy,
  Check
} from 'lucide-react';
import { COMPANY_INFO, getWhatsAppLink } from '../../data/companyInfo';
import { FAQItem } from '../../types';

export interface AeoFaqSectionProps {
  title?: string;
  subtitle?: string;
  faqs: FAQItem[];
  defaultOpenId?: string;
  categoryFilterEnabled?: boolean;
}

export const AeoFaqSection: React.FC<AeoFaqSectionProps> = ({
  title = "Frequently Asked Questions & Official Consular Answers",
  subtitle = "Direct, verified answers to top travel, visa, flight, and Umrah inquiries",
  faqs,
  defaultOpenId = 'faq-1',
  categoryFilterEnabled = true
}) => {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(faqs.map(f => f.category || 'General')))];

  const filteredFaqs = faqs.filter(f => {
    const matchesCategory = selectedCategory === 'All' || f.category === selectedCategory;
    const matchesQuery =
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const handleCopyAnswer = (faq: FAQItem) => {
    navigator.clipboard.writeText(`${faq.question}\n\n${faq.answer}\n\n— SkyBridge Travel & Tourism (${COMPANY_INFO.websiteUrl})`);
    setCopiedId(faq.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="my-16 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
      {/* Header */}
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 text-[#0B1B3B] text-xs font-bold border border-sky-100 mb-3">
          <HelpCircle className="w-3.5 h-3.5 text-cyan-600" />
          <span className="uppercase tracking-wider text-[11px]">AEO Direct Answer Core</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#0B1B3B] tracking-tight">
          {title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100">
        {categoryFilterEnabled && (
          <div className="flex flex-wrap gap-1.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#0B1B3B] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions or keywords..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>
      </div>

      {/* Accordion Questions List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200">
            <p className="text-sm font-semibold text-slate-600">No questions found matching your search.</p>
            <p className="text-xs text-slate-400 mt-1">Try searching for "Schengen", "fee", "Umrah", or "bank statement".</p>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`border rounded-2xl transition-all ${
                  isOpen
                    ? 'border-cyan-500/50 bg-sky-50/30 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-3">
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold mt-0.5 ${
                      isOpen ? 'bg-[#0B1B3B] text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      Q
                    </span>
                    <span className="font-bold text-sm sm:text-base text-[#0B1B3B] leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <span className="p-1 rounded-lg bg-slate-100 text-slate-600 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 border-t border-slate-200/60 ml-9 mr-4">
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                      {faq.answer}
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-200/40 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopyAnswer(faq)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 text-[11px] font-medium transition-colors shadow-2xs"
                        >
                          {copiedId === faq.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span className="text-emerald-700 font-semibold">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3 text-slate-500" />
                              <span>Copy Answer</span>
                            </>
                          )}
                        </button>
                      </div>

                      <a
                        href={`${getWhatsAppLink()}?text=${encodeURIComponent(`Hi SkyBridge, I have a question regarding: "${faq.question}"`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-800"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Clarify with Advisor on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};
