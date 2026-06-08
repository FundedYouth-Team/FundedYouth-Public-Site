import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { HomePage } from "./pages/HomePage";
import { LearnPage } from "./pages/LearnPage";
import { VolunteerPage } from "./pages/VolunteerPage";
import { DonatePage } from "./pages/DonatePage";
import { SponsorPage } from "./pages/SponsorPage";
import { StorePage } from "./pages/StorePage";
import { CompetitionsPage } from "./pages/CompetitionsPage";
import { ContactPage } from "./pages/ContactPage";
import { ImpactPage } from "./pages/ImpactPage";
import { LegalIndexPage } from "./pages/legal/LegalIndexPage";
import { WaiverPage } from "./pages/legal/WaiverPage";
import { TeachersPage } from "./pages/TeachersPage";
import { GetStartedPage } from "./pages/GetStartedPage";
import { SchedulePage } from "./pages/SchedulePage";
import { FaqPage } from "./pages/FaqPage";
import { AppsPage } from "./pages/AppsPage";
import { PrintEstimatePage } from "./pages/apps/PrintEstimatePage";

import "./styles/globals.css";

function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col font-sans antialiased">
      <Header />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/learn" element={<LearnPage />} />
          {/* Legacy URL redirects — preserve any external links */}
          <Route path="/classes" element={<Navigate to="/learn" replace />} />
          <Route path="/catalog" element={<Navigate to="/learn" replace />} />
          <Route path="/volunteer" element={<VolunteerPage />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/sponsor" element={<SponsorPage />} />
          <Route path="/store" element={<StorePage />} />
          <Route path="/competitions" element={<CompetitionsPage />} />
          <Route path="/adventures" element={<Navigate to="/competitions" replace />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/impact" element={<ImpactPage />} />
          <Route path="/teachers" element={<TeachersPage />} />
          <Route path="/get-started" element={<GetStartedPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/sessions" element={<Navigate to="/schedule" replace />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/apps" element={<AppsPage />} />
          <Route
            path="/apps/3d-print-estimate"
            element={<PrintEstimatePage />}
          />
          <Route path="/legal" element={<LegalIndexPage />} />
          <Route path="/legal/waiver" element={<WaiverPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
