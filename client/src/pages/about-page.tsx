import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ZanupfLogo, ZimbabweFlag } from "@/components/ui/icons";
import { ChevronRight, Users, History, Target, Award, MapPin, File } from "lucide-react";

export default function AboutPage() {
  // Feature cards
  const features = [
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Community Focused",
      description: "Placing the needs of Kuwadzana West residents at the center of all development initiatives."
    },
    {
      icon: <History className="h-10 w-10 text-primary" />,
      title: "Rich Heritage",
      description: "Building on a proud historical foundation while embracing modern governance approaches."
    },
    {
      icon: <Target className="h-10 w-10 text-primary" />,
      title: "Progressive Vision",
      description: "Working towards sustainable development goals with clear roadmaps and strategies."
    },
    {
      icon: <Award className="h-10 w-10 text-primary" />,
      title: "Transparent Leadership",
      description: "Commitment to accountability and open communication with constituency residents."
    }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-primary-dark text-white py-24">
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute inset-0 bg-pattern"></div>
        </div>
        <div className="container mx-auto px-4 z-10 relative">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <ZanupfLogo className="h-20 w-20 mb-6" />
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">About Kuwadzana West</h1>
            <p className="text-xl text-white/90 mb-8">
              Discover our vision, history, and commitment to building a prosperous
              and inclusive constituency for all residents.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-white text-primary hover:bg-white/90" asChild>
                <Link href="/about/mission">Our Mission & Vision</Link>
              </Button>
              <Button className="bg-transparent border border-white hover:bg-white/10" asChild>
                <Link href="/about/history">Our History</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">
                Welcome to Kuwadzana West Constituency
              </h2>
              <p className="text-gray-600 mb-4">
                Kuwadzana West Constituency is located in the western part of Harare, Zimbabwe. 
                As one of the rapidly developing urban constituencies, we are committed to delivering 
                exceptional services to our residents while fostering a strong sense of community and belonging.
              </p>
              <p className="text-gray-600 mb-4">
                Under the leadership of our dedicated team, we are working tirelessly to address the challenges 
                facing our constituency and implement strategic initiatives that promote economic growth, enhance 
                social welfare, and improve infrastructure.
              </p>
              <p className="text-gray-600 mb-6">
                Our official website serves as a platform for transparent communication, community engagement, 
                and access to essential information about government services, development projects, and upcoming events.
              </p>
              <div className="flex items-center space-x-4">
                <ZimbabweFlag className="h-10 w-16" />
                <div>
                  <p className="font-semibold text-gray-900">Proudly Serving</p>
                  <p className="text-gray-600">Kuwadzana West, Harare, Zimbabwe</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg p-8">
              <h3 className="text-2xl font-heading font-semibold text-gray-900 mb-6">
                Constituency at a Glance
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary mt-1 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Location</p>
                    <p className="text-gray-600">Western Harare, Zimbabwe</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="h-5 w-5 text-primary mt-1 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Population</p>
                    <p className="text-gray-600">Approximately 50,000 residents</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <File className="h-5 w-5 text-primary mt-1 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Established</p>
                    <p className="text-gray-600">2000, following electoral reforms</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Award className="h-5 w-5 text-primary mt-1 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Recognition</p>
                    <p className="text-gray-600">Awarded for community development initiatives</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-600">
              These foundational principles guide our approach to governance and community development
              in Kuwadzana West Constituency.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-8 transition-transform hover:-translate-y-1">
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="col-span-2">
              <h2 className="text-3xl font-heading font-bold mb-4">
                Join Us in Building a Stronger Kuwadzana West
              </h2>
              <p className="text-white/90 mb-6 max-w-2xl">
                We invite all residents to participate actively in our community initiatives,
                provide feedback on our services, and contribute to the development of our constituency.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-white text-primary hover:bg-white/90" asChild>
                  <Link href="/community">Community Engagement</Link>
                </Button>
                <Button className="bg-transparent border border-white hover:bg-white/10" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-primary-dark p-8 rounded-lg">
                <h3 className="text-xl font-heading font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/about/history" className="flex items-center text-white/90 hover:text-white">
                      <ChevronRight className="h-4 w-4 mr-2" />
                      <span>Our History</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/about/mission" className="flex items-center text-white/90 hover:text-white">
                      <ChevronRight className="h-4 w-4 mr-2" />
                      <span>Mission & Vision</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/leadership" className="flex items-center text-white/90 hover:text-white">
                      <ChevronRight className="h-4 w-4 mr-2" />
                      <span>Leadership Directory</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/resources/constituency-reports" className="flex items-center text-white/90 hover:text-white">
                      <ChevronRight className="h-4 w-4 mr-2" />
                      <span>Constituency Reports</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}