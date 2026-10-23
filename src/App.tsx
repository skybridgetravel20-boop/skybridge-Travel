import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { CrmProvider } from './context/CrmContext';
import { LanguageProvider } from './context/LanguageContext';
import { FloatingSystemSwitcher } from './components/FloatingSystemSwitcher';

// Layouts
import { MainLayout } from './layouts/MainLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Public Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { VisaServicesPage } from './pages/VisaServicesPage';
import { FlightsPage } from './pages/FlightsPage';
import { HotelsPage } from './pages/HotelsPage';
import { TourPackagesPage } from './pages/TourPackagesPage';
import { HoneymoonPackagesPage } from './pages/HoneymoonPackagesPage';
import { UmrahPackagesPage } from './pages/UmrahPackagesPage';
import { DestinationsPage } from './pages/DestinationsPage';
import { ContactPage } from './pages/ContactPage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminLeadsPage } from './pages/admin/AdminLeadsPage';
import { AdminLeadDetailPage } from './pages/admin/AdminLeadDetailPage';
import { AdminCustomersPage } from './pages/admin/AdminCustomersPage';
import { AdminCasesPage } from './pages/admin/AdminCasesPage';
import { AdminBookingsPage } from './pages/admin/AdminBookingsPage';
import { AdminFollowUpsPage } from './pages/admin/AdminFollowUpsPage';
import { AdminTasksPage } from './pages/admin/AdminTasksPage';
import { AdminReportsPage } from './pages/admin/AdminReportsPage';
import { AdminSettingsBackupPage } from './pages/admin/AdminSettingsBackupPage';
import { AdminSuppliersPage } from './pages/admin/AdminSuppliersPage';
import { AdminPriceCheckPage } from './pages/admin/AdminPriceCheckPage';
import { AdminSupplierPortalsPage } from './pages/admin/AdminSupplierPortalsPage';
import { AdminDataImportPage } from './pages/admin/AdminDataImportPage';
import { AdminGoogleSheetsPage } from './pages/admin/AdminGoogleSheetsPage';
import { AdminPriceComparisonPage } from './pages/admin/AdminPriceComparisonPage';
import { AdminPackageCalculatorPage } from './pages/admin/AdminPackageCalculatorPage';
import { AdminVisaIntelligencePage } from './pages/admin/AdminVisaIntelligencePage';
import { AdminSchengenAgentPage } from './pages/admin/AdminSchengenAgentPage';
import { AdminManpowerAgentPage } from './pages/admin/AdminManpowerAgentPage';
import { AdminInvoicesPage } from './pages/admin/AdminInvoicesPage';
import { AdminCaseSupportPage } from './pages/admin/AdminCaseSupportPage';
import { CeoDashboardPage } from './pages/ceo/CeoDashboardPage';
import { GmailExecutiveDispatch } from './components/ceo/GmailExecutiveDispatch';

// New Master Architecture Pages
import { AdminAgentControlPage } from './pages/admin/AdminAgentControlPage';
import { AdminIntelligenceHubPage } from './pages/admin/AdminIntelligenceHubPage';
import { AdminScholarshipIntelligencePage } from './pages/admin/AdminScholarshipIntelligencePage';
import { AdminSpecialistSuppliersPage } from './pages/admin/AdminSpecialistSuppliersPage';
import { AdminAffiliateOffersPage } from './pages/admin/AdminAffiliateOffersPage';
import { AdminWebsiteOffersPage } from './pages/admin/AdminWebsiteOffersPage';
import { AdminContentCalendarPage } from './pages/admin/AdminContentCalendarPage';
import { AdminDocumentRegisterPage } from './pages/admin/AdminDocumentRegisterPage';
import { AdminIntegrationStatusPage } from './pages/admin/AdminIntegrationStatusPage';
import { AdminNotificationsPage } from './pages/admin/AdminNotificationsPage';
import { AdminAuditLogsPage } from './pages/admin/AdminAuditLogsPage';
import { AdminLeadHunterPage } from './pages/admin/AdminLeadHunterPage';
import { AdminTrafficGrowthPage } from './pages/admin/AdminTrafficGrowthPage';
import { AdminSocialMediaGrowthPage } from './pages/admin/AdminSocialMediaGrowthPage';
import { AdminCampaignCenterPage } from './pages/admin/AdminCampaignCenterPage';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

// Discreet CEO / Admin Keyboard Shortcut (Alt + A for Admin, Alt + C for CEO Dashboard)
function AdminKeyboardShortcut() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.altKey && (e.key === 'a' || e.key === 'A')) ||
        (e.ctrlKey && e.shiftKey && (e.key === 'a' || e.key === 'A'))
      ) {
        e.preventDefault();
        navigate('/admin/login');
      }

      if (
        (e.altKey && (e.key === 'c' || e.key === 'C')) ||
        (e.ctrlKey && e.shiftKey && (e.key === 'c' || e.key === 'C'))
      ) {
        e.preventDefault();
        navigate('/ceo');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return null;
}

export default function App() {
  return (
    <LanguageProvider>
      <CrmProvider>
        <BrowserRouter>
          <ScrollToTop />
          <AdminKeyboardShortcut />
          <FloatingSystemSwitcher />
          <Routes>
          {/* Public Website Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="visa-services" element={<VisaServicesPage />} />
            <Route path="flights" element={<FlightsPage />} />
            <Route path="hotels" element={<HotelsPage />} />
            <Route path="tour-packages" element={<TourPackagesPage />} />
            <Route path="honeymoon-packages" element={<HoneymoonPackagesPage />} />
            <Route path="umrah-packages" element={<UmrahPackagesPage />} />
            <Route path="destinations" element={<DestinationsPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>

          {/* Admin & Agent Login Routes & Direct Aliases */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/agent/login" element={<AdminLoginPage />} />
          <Route path="/login" element={<AdminLoginPage />} />
          <Route path="/portal" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/agent" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/dashboard" element={<Navigate to="/admin/dashboard" replace />} />

          {/* Authenticated Admin Dashboard Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="leads" element={<AdminLeadsPage />} />
            <Route path="leads/:id" element={<AdminLeadDetailPage />} />
            <Route path="customers" element={<AdminCustomersPage />} />
            <Route path="cases" element={<AdminCasesPage />} />
            <Route path="suppliers" element={<AdminSuppliersPage />} />
            <Route path="supplier-portals" element={<AdminSupplierPortalsPage />} />
            <Route path="price-check" element={<AdminPriceCheckPage />} />
            <Route path="price-comparison" element={<AdminPriceComparisonPage />} />
            <Route path="data-import" element={<AdminDataImportPage />} />
            <Route path="integrations/google-sheets" element={<AdminGoogleSheetsPage />} />
            <Route path="calculator" element={<AdminPackageCalculatorPage />} />
            <Route path="visa-intelligence" element={<AdminVisaIntelligencePage />} />
            <Route path="schengen-agent" element={<AdminSchengenAgentPage />} />
            <Route path="schengen-intelligence" element={<AdminSchengenAgentPage />} />
            <Route path="manpower-agent" element={<AdminManpowerAgentPage />} />
            <Route path="overseas-recruitment" element={<AdminManpowerAgentPage />} />
            <Route path="invoices" element={<AdminInvoicesPage />} />
            <Route path="bookings" element={<AdminBookingsPage />} />
            <Route path="follow-ups" element={<AdminFollowUpsPage />} />
            <Route path="tasks" element={<AdminTasksPage />} />
            {/* Master Sections Navigation Routes */}
            <Route path="ai-agents" element={<AdminAgentControlPage />} />
            <Route path="intelligence-hub" element={<AdminIntelligenceHubPage />} />
            <Route path="scholarships" element={<AdminScholarshipIntelligencePage />} />
            <Route path="lead-hunter" element={<AdminLeadHunterPage />} />
            <Route path="traffic-growth" element={<AdminTrafficGrowthPage />} />
            <Route path="social-media" element={<AdminSocialMediaGrowthPage />} />
            <Route path="campaigns" element={<AdminCampaignCenterPage />} />
            <Route path="flight-suppliers" element={<AdminSpecialistSuppliersPage initialCategory="Airline / Ticketing" title="Flight Suppliers & Ticketing Systems" />} />
            <Route path="umrah-suppliers" element={<AdminSpecialistSuppliersPage initialCategory="Umrah" title="Umrah Suppliers & Makkah-Madinah Operators" />} />
            <Route path="hotel-suppliers" element={<AdminSpecialistSuppliersPage initialCategory="Hotel / Bedbank" title="Hotel Inventory & Bedbank Suppliers" />} />
            <Route path="insurance-suppliers" element={<AdminSpecialistSuppliersPage initialCategory="Insurance" title="Travel Insurance Suppliers & Policies" />} />
            <Route path="other-suppliers" element={<AdminSpecialistSuppliersPage initialCategory="All" title="Other Travel & Transportation Suppliers" />} />
            <Route path="affiliate-offers" element={<AdminAffiliateOffersPage />} />
            <Route path="website-offers" element={<AdminWebsiteOffersPage />} />
            <Route path="content-calendar" element={<AdminContentCalendarPage />} />
            <Route path="document-register" element={<AdminDocumentRegisterPage />} />
            <Route path="integration-status" element={<AdminIntegrationStatusPage />} />
            <Route path="notifications" element={<AdminNotificationsPage />} />
            <Route path="audit-logs" element={<AdminAuditLogsPage />} />

            <Route path="reports" element={<AdminReportsPage />} />
            <Route path="case-support" element={<AdminCaseSupportPage />} />
            <Route path="gmail-dispatch" element={<div className="p-6 max-w-7xl mx-auto"><GmailExecutiveDispatch /></div>} />
            <Route path="settings/backup" element={<AdminSettingsBackupPage />} />
          </Route>

          {/* Direct CEO Password Protected Case Support Route */}
          <Route path="/case-support" element={<div className="min-h-screen bg-slate-900 py-12 flex items-center justify-center"><AdminCaseSupportPage /></div>} />

          {/* Dedicated CEO Dashboard Route (Secure Password-Protected Login Gate) */}
          <Route path="/ceo" element={<CeoDashboardPage />} />
          <Route path="/ceo-dashboard" element={<CeoDashboardPage />} />

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </CrmProvider>
  </LanguageProvider>
  );
}
