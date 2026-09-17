import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { BookingInquiryModal } from '../components/BookingInquiryModal';
import { ServiceType } from '../types';

export const MainLayout: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState<{
    defaultService?: ServiceType;
    defaultDestination?: string;
    defaultTitle?: string;
    isBookingRequest?: boolean;
  }>({});

  const openInquiryModal = (config?: {
    defaultService?: ServiceType;
    defaultDestination?: string;
    defaultTitle?: string;
    isBookingRequest?: boolean;
  }) => {
    setModalConfig(config || {});
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-[#4FC3F7]/30 selection:text-[#0B1B3B]">
      <Header />
      <main className="flex-1">
        <Outlet context={{ openInquiryModal }} />
      </main>
      <Footer />
      <WhatsAppButton />

      <BookingInquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultService={modalConfig.defaultService}
        defaultDestination={modalConfig.defaultDestination}
        defaultTitle={modalConfig.defaultTitle}
        isBookingRequest={modalConfig.isBookingRequest}
      />
    </div>
  );
};
