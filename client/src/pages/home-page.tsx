import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroCarousel from "@/components/home/hero-carousel";
import InfoBoxes from "@/components/home/info-boxes";
import NewsPreview from "@/components/home/news-preview";
import ProjectsPreview from "@/components/home/projects-preview";
import LeadershipPreview from "@/components/home/leadership-preview";
import EventsPreview from "@/components/home/events-preview";
import CommunityEngagement from "@/components/home/community-engagement";
import { ContextualTooltip } from "@/components/ui/contextual-tooltip";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { HelpCircle, Settings } from "lucide-react";
import { useTooltips } from "@/hooks/use-tooltips";

export default function HomePage() {
  const { resetTooltips } = useTooltips();
  const [showWelcome, setShowWelcome] = useState(true);
  
  // Hide welcome banner after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Header />
      {showWelcome && (
        <div className="bg-primary text-primary-foreground p-4 text-center">
          <p className="font-medium">
            Welcome to the Kuwadzana West Constituency Portal!
            <Button variant="link" className="ml-2 text-primary-foreground underline" onClick={() => setShowWelcome(false)}>
              Dismiss
            </Button>
          </p>
        </div>
      )}
      <main>
        <ContextualTooltip
          id="homeIntro"
          title="Welcome to Kuwadzana West!"
          description={
            <div>
              <p>Welcome to our digital platform! Here's a quick overview:</p>
              <ul className="list-disc pl-5 mt-2 mb-2">
                <li>Use the navigation menu to find information</li>
                <li>Find constituency news, projects, and events</li>
                <li>Access resources and contact information</li>
              </ul>
              <p>Need help? Look for these highlighted tooltips around the site.</p>
            </div>
          }
          contentClassName="max-w-sm"
        >
          <HeroCarousel />
        </ContextualTooltip>

        <InfoBoxes />
        
        <ContextualTooltip
          id="newsSection"
          title="Constituency News"
          description="Stay updated with the latest news and announcements from Kuwadzana West. Click on any article to read more."
          side="right"
        >
          <NewsPreview />
        </ContextualTooltip>
        
        <ContextualTooltip
          id="projectsSection"
          title="Development Projects"
          description="Track ongoing and completed development projects in our constituency. See their progress and impact on our community."
          side="left"
        >
          <ProjectsPreview />
        </ContextualTooltip>
        
        <ContextualTooltip
          id="leadershipSection"
          title="Leadership Team"
          description="Meet the dedicated leaders working for Kuwadzana West. Click on any profile to learn more about their roles and responsibilities."
          side="right"
        >
          <LeadershipPreview />
        </ContextualTooltip>
        
        <ContextualTooltip
          id="eventsSection"
          title="Upcoming Events"
          description="Find out about upcoming events, meetings, and community gatherings. Mark your calendar to participate."
          side="left"
        >
          <EventsPreview />
        </ContextualTooltip>
        
        <CommunityEngagement />
      </main>
      
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          variant="outline"
          size="sm"
          className="mr-2 bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={resetTooltips}
        >
          <HelpCircle className="h-4 w-4 mr-2" />
          Show Help
        </Button>
      </div>
      
      <Footer />
    </>
  );
}
