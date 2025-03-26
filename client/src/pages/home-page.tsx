import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroCarousel from "@/components/home/hero-carousel";
import InfoBoxes from "@/components/home/info-boxes";
import NewsPreview from "@/components/home/news-preview";
import ProjectsPreview from "@/components/home/projects-preview";
import LeadershipPreview from "@/components/home/leadership-preview";
import EventsPreview from "@/components/home/events-preview";
import CommunityEngagement from "@/components/home/community-engagement";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroCarousel />
        <InfoBoxes />
        <NewsPreview />
        <ProjectsPreview />
        <LeadershipPreview />
        <EventsPreview />
        <CommunityEngagement />
      </main>
      <Footer />
    </>
  );
}
