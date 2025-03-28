import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "./pages/not-found";
import HomePage from "./pages/home-page";
import AuthPage from "./pages/auth-page";
import NewsPage from "./pages/news-page";
import ProjectPage from "./pages/project-page";
import LeadershipPage from "./pages/leadership-page";
import EventPage from "./pages/event-page";
import CommunityPage from "./pages/community-page";
import ContactPage from "./pages/contact-page";
import AboutPage from "./pages/about-page";
import AboutHistoryPage from "./pages/about-history-page";
import AboutMissionPage from "./pages/about-mission-page";
import ResourcesPage from "./pages/resources-page";
import GovtServicesPage from "./pages/govt-services-page";
import ConstituencyReportsPage from "./pages/constituency-reports-page";
import PublicDocumentsPage from "./pages/public-documents-page";
import FundingOpportunitiesPage from "./pages/funding-opportunities-page";
import EmergencyContactsPage from "./pages/emergency-contacts-page";
import FAQsPage from "./pages/faqs-page";
import { ProtectedRoute, AdminRoute } from "./lib/protected-route";
import { TooltipProvider } from "./hooks/use-tooltips";

function Router() {
  return (
    <Switch>
      {/* Main Navigation */}
      <Route path="/" component={HomePage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/news" component={NewsPage} />
      <Route path="/projects" component={ProjectPage} />
      <Route path="/leadership" component={LeadershipPage} />
      <Route path="/events" component={EventPage} />
      <Route path="/community" component={CommunityPage} />
      <Route path="/contact" component={ContactPage} />
      
      {/* About Section */}
      <Route path="/about" component={AboutPage} />
      <Route path="/about/history" component={AboutHistoryPage} />
      <Route path="/about/mission" component={AboutMissionPage} />
      
      {/* Resources Section */}
      <Route path="/resources" component={ResourcesPage} />
      <Route path="/resources/government-services" component={GovtServicesPage} />
      <Route path="/resources/constituency-reports" component={ConstituencyReportsPage} />
      <Route path="/resources/public-documents" component={PublicDocumentsPage} />
      <Route path="/resources/funding-opportunities" component={FundingOpportunitiesPage} />
      <Route path="/resources/emergency-contacts" component={EmergencyContactsPage} />
      <Route path="/resources/faqs" component={FAQsPage} />
      
      {/* 404 Page */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <>
      <TooltipProvider>
        <Router />
      </TooltipProvider>
      <Toaster />
    </>
  );
}

export default App;
