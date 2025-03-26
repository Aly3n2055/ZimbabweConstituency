import { Link } from "wouter";
import { Newspaper, Calendar, HelpingHand } from "lucide-react";
import { ArrowRight } from "lucide-react";

interface InfoBox {
  title: string;
  description: string;
  icon: React.ReactNode;
  linkText: string;
  linkHref: string;
  accentColor: "primary" | "secondary" | "accent";
}

const infoBoxes: InfoBox[] = [
  {
    title: "Latest Updates",
    description: "Stay informed about the latest news and announcements from Kuwadzana West.",
    icon: <Newspaper size={24} />,
    linkText: "Read News",
    linkHref: "/news",
    accentColor: "primary"
  },
  {
    title: "Upcoming Events",
    description: "Discover events, meetings, and community gatherings in your area.",
    icon: <Calendar size={24} />,
    linkText: "View Calendar",
    linkHref: "/events",
    accentColor: "secondary"
  },
  {
    title: "Community Engagement",
    description: "Get involved in community projects and have your voice heard.",
    icon: <HelpingHand size={24} />,
    linkText: "Participate",
    linkHref: "/community",
    accentColor: "accent"
  }
];

export default function InfoBoxes() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {infoBoxes.map((box, index) => (
            <div key={index} className="bg-gray-100 rounded-lg shadow-md overflow-hidden">
              <div className={`h-2 bg-${box.accentColor}`}></div>
              <div className="p-6">
                <div className={`rounded-full bg-${box.accentColor} w-14 h-14 flex items-center justify-center text-white mb-4`}>
                  {box.icon}
                </div>
                <h3 className="text-xl font-heading font-semibold mb-2">
                  {box.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {box.description}
                </p>
                <Link 
                  href={box.linkHref}
                  className="text-primary hover:text-primary/90 font-medium flex items-center"
                >
                  <span>{box.linkText}</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
