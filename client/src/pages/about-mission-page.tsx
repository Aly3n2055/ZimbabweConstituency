import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ZanupfLogo } from "@/components/ui/icons";
import {
  ChevronRight,
  Target,
  Eye,
  Heart,
  Compass,
  CheckCircle,
  BarChart,
  Users,
  Shield,
  Lightbulb
} from "lucide-react";

export default function AboutMissionPage() {
  // Core values
  const coreValues = [
    {
      icon: <Heart className="h-8 w-8 text-primary mb-4" />,
      title: "Integrity",
      description: "We uphold the highest standards of honesty, transparency, and ethical conduct in all our actions."
    },
    {
      icon: <Users className="h-8 w-8 text-primary mb-4" />,
      title: "Community",
      description: "We value inclusivity and work to ensure that every resident feels a sense of belonging and ownership."
    },
    {
      icon: <Shield className="h-8 w-8 text-primary mb-4" />,
      title: "Accountability",
      description: "We take responsibility for our decisions and remain answerable to the people we serve."
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-primary mb-4" />,
      title: "Innovation",
      description: "We embrace creative solutions and forward-thinking approaches to address community challenges."
    }
  ];

  // Strategic goals
  const strategicGoals = [
    {
      title: "Economic Empowerment",
      description: "Create sustainable opportunities for economic growth, entrepreneurship, and employment within the constituency."
    },
    {
      title: "Infrastructure Development",
      description: "Enhance public infrastructure to improve quality of life, focusing on roads, water systems, and community facilities."
    },
    {
      title: "Education Excellence",
      description: "Support high-quality education at all levels to equip our youth with the skills needed for the future."
    },
    {
      title: "Healthcare Access",
      description: "Expand access to quality healthcare services, preventive care, and health education for all residents."
    },
    {
      title: "Environmental Sustainability",
      description: "Implement green initiatives and promote sustainable practices to protect our natural resources."
    },
    {
      title: "Social Cohesion",
      description: "Foster unity, cultural appreciation, and strong community bonds across diverse groups."
    }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-primary-dark text-white py-20">
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute inset-0 bg-pattern"></div>
        </div>
        <div className="container mx-auto px-4 z-10 relative">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Our Mission & Vision</h1>
            <p className="text-xl text-white/90 mb-6">
              Guiding principles and aspirations that drive our work and shape
              the future of Kuwadzana West Constituency.
            </p>
            <div className="flex gap-4">
              <Button className="bg-white text-primary hover:bg-white/90" asChild>
                <Link href="/about">Back to About</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Mission Statement */}
            <div className="bg-gray-50 rounded-lg p-8 border-t-4 border-primary shadow-md">
              <div className="flex items-center mb-6">
                <Target className="h-10 w-10 text-primary mr-4" />
                <h2 className="text-3xl font-heading font-bold text-gray-900">Our Mission</h2>
              </div>
              <div className="space-y-4">
                <p className="text-gray-600">
                  To serve the residents of Kuwadzana West with integrity and dedication, addressing their needs through
                  effective governance, sustainable development initiatives, and inclusive community engagement.
                </p>
                <p className="text-gray-600">
                  We are committed to enhancing the quality of life for all residents by providing access to essential
                  services, creating economic opportunities, and fostering a safe, vibrant, and cohesive community.
                </p>
                <p className="text-gray-600">
                  Through transparent leadership and responsive governance, we strive to build a constituency where
                  every voice is heard, and every resident has the opportunity to thrive.
                </p>
              </div>
            </div>
            
            {/* Vision Statement */}
            <div className="bg-gray-50 rounded-lg p-8 border-t-4 border-secondary shadow-md">
              <div className="flex items-center mb-6">
                <Eye className="h-10 w-10 text-secondary mr-4" />
                <h2 className="text-3xl font-heading font-bold text-gray-900">Our Vision</h2>
              </div>
              <div className="space-y-4">
                <p className="text-gray-600">
                  To transform Kuwadzana West into a model constituency that exemplifies good governance, sustainable
                  development, and community prosperity within Zimbabwe.
                </p>
                <p className="text-gray-600">
                  We envision a future where Kuwadzana West is recognized for its excellent infrastructure, robust
                  economy, high-quality educational institutions, accessible healthcare, and vibrant cultural life.
                </p>
                <p className="text-gray-600">
                  By 2030, we aim to be a constituency where innovation thrives, where residents take pride in their
                  community, and where every child has the opportunity to achieve their full potential.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Compass className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-600">
              These foundational principles guide our decisions, shape our culture, and define how we
              serve the people of Kuwadzana West Constituency.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-8 text-center">
                {value.icon}
                <h3 className="text-xl font-heading font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Goals Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <BarChart className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
              Strategic Goals & Objectives
            </h2>
            <p className="text-gray-600">
              Our key strategic priorities for advancing the development and prosperity of
              Kuwadzana West Constituency in the coming years.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {strategicGoals.map((goal, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 border-l-4 border-primary">
                <h3 className="text-xl font-heading font-semibold text-gray-900 mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  {goal.title}
                </h3>
                <p className="text-gray-600">
                  {goal.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-12 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="relative max-w-4xl mx-auto text-center">
            <div className="text-6xl opacity-20 absolute top-0 left-0">"</div>
            <div className="text-6xl opacity-20 absolute bottom-0 right-0">"</div>
            <div className="py-8 px-4">
              <blockquote className="text-xl md:text-2xl mb-6 relative z-10">
                Our mission is rooted in the belief that good governance, community participation,
                and sustainable development are the foundations of prosperity for all residents of
                Kuwadzana West. We are committed to building a future where every citizen has the
                opportunity to thrive and contribute to our shared progress.
              </blockquote>
              <cite className="text-white/90 block">
                <span className="font-semibold">— Hon. Sithobekile Ndlovu</span><br />
                <span className="text-sm">Member of Parliament, Kuwadzana West Constituency</span>
              </cite>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
                Join Us in Achieving Our Vision
              </h2>
              <p className="text-gray-600 mb-6">
                We invite all residents of Kuwadzana West to participate actively in our journey 
                towards achieving our shared vision. Your ideas, feedback, and involvement are 
                essential to our success.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-primary hover:bg-primary/90" asChild>
                  <Link href="/community">Get Involved</Link>
                </Button>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white" asChild>
                  <Link href="/projects">View Our Projects</Link>
                </Button>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-center mb-6">
                <ZanupfLogo className="h-20 w-20" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-center text-gray-900 mb-4">Related Pages</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="flex items-center text-gray-600 hover:text-primary">
                    <ChevronRight className="h-4 w-4 mr-2 text-primary" />
                    <span>About Kuwadzana West</span>
                  </Link>
                </li>
                <li>
                  <Link href="/about/history" className="flex items-center text-gray-600 hover:text-primary">
                    <ChevronRight className="h-4 w-4 mr-2 text-primary" />
                    <span>Our History</span>
                  </Link>
                </li>
                <li>
                  <Link href="/leadership" className="flex items-center text-gray-600 hover:text-primary">
                    <ChevronRight className="h-4 w-4 mr-2 text-primary" />
                    <span>Leadership Directory</span>
                  </Link>
                </li>
                <li>
                  <Link href="/resources/constituency-reports" className="flex items-center text-gray-600 hover:text-primary">
                    <ChevronRight className="h-4 w-4 mr-2 text-primary" />
                    <span>Annual Reports</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}