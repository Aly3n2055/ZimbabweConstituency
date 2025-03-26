import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ZanupfLogo } from "@/components/ui/icons";
import { ChevronRight, Calendar, Flag, Award, FileText } from "lucide-react";

export default function AboutHistoryPage() {
  // Timeline items
  const timelineItems = [
    {
      year: "1980",
      title: "Zimbabwe's Independence",
      description: "Zimbabwe gained independence, marking the beginning of a new era for the nation. This period saw the establishment of modern electoral constituencies."
    },
    {
      year: "1987",
      title: "Urban Development Initiatives",
      description: "Major urban development plans were implemented across Harare, including infrastructure projects that would later shape Kuwadzana West."
    },
    {
      year: "1995",
      title: "Housing Expansion",
      description: "Significant housing developments began in the Kuwadzana area, expanding the urban footprint and increasing population density."
    },
    {
      year: "2000",
      title: "Constituency Formation",
      description: "Kuwadzana West was formally established as an electoral constituency following the electoral reforms and redistricting process."
    },
    {
      year: "2008",
      title: "Infrastructure Growth",
      description: "Major investments in local infrastructure including roads, water systems, and public facilities to serve the growing community."
    },
    {
      year: "2013",
      title: "Community Leadership Programs",
      description: "Launch of community leadership initiatives aimed at increasing civic participation and local governance."
    },
    {
      year: "2018",
      title: "Modern Era Begins",
      description: "Implementation of the digital transformation strategy, including this official website to enhance communication with residents."
    },
    {
      year: "2023",
      title: "Vision 2030 Implementation",
      description: "Beginning of the Vision 2030 strategic plan implementation, focusing on sustainable development and community prosperity."
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
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Our History</h1>
            <p className="text-xl text-white/90 mb-6">
              Exploring the rich heritage and historical development of Kuwadzana West Constituency
              and its contribution to Zimbabwe's progress.
            </p>
            <div className="flex gap-4">
              <Button className="bg-white text-primary hover:bg-white/90" asChild>
                <Link href="/about">Back to About</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">
                The Story of Kuwadzana West
              </h2>
              <p className="text-gray-600 mb-4">
                Kuwadzana West has evolved significantly over the decades, from its early days as a developing 
                suburb to becoming one of the most vibrant constituencies in Harare. Our history is intertwined 
                with Zimbabwe's journey toward independence and democratic governance.
              </p>
              <p className="text-gray-600 mb-4">
                The name "Kuwadzana" itself reflects our cultural values, signifying "coming together" or "unity" 
                in Shona, one of Zimbabwe's official languages. This spirit of unity and collaboration has been 
                a guiding principle throughout our constituency's development.
              </p>
              <p className="text-gray-600 mb-6">
                Through periods of economic challenges and political transformations, the people of Kuwadzana West 
                have demonstrated remarkable resilience, community spirit, and commitment to progress. This page 
                chronicles the key milestones that have shaped our constituency's identity and continue to influence 
                our vision for the future.
              </p>
              <div className="flex items-center gap-4">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white" asChild>
                  <Link href="/resources/public-documents">View Historical Documents</Link>
                </Button>
              </div>
            </div>
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="bg-gray-100 rounded-lg p-8 w-full max-w-md">
                <div className="flex justify-center mb-6">
                  <ZanupfLogo className="h-24 w-24" />
                </div>
                <h3 className="text-2xl font-heading font-semibold text-center text-gray-900 mb-4">
                  Historical Highlights
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-primary mt-1 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Established</p>
                      <p className="text-gray-600">Formally designated in 2000</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Flag className="h-5 w-5 text-primary mt-1 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Cultural Significance</p>
                      <p className="text-gray-600">"Kuwadzana" means unity in Shona</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Award className="h-5 w-5 text-primary mt-1 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Notable Achievements</p>
                      <p className="text-gray-600">Multiple community development awards</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FileText className="h-5 w-5 text-primary mt-1 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Historical Archives</p>
                      <p className="text-gray-600">Preserved at the Constituency Office</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
              Historical Timeline
            </h2>
            <p className="text-gray-600">
              Explore the key events and milestones that have shaped the development and growth
              of Kuwadzana West Constituency over the decades.
            </p>
          </div>
          
          <div className="relative border-l-4 border-primary ml-4 md:ml-0 md:mx-auto md:max-w-4xl pl-8 pb-8">
            {timelineItems.map((item, index) => (
              <div key={index} className="mb-12 relative">
                <div className="absolute left-0 -translate-x-[calc(100%+2rem)] top-0 bg-primary text-white py-1 px-3 rounded font-semibold hidden md:block">
                  {item.year}
                </div>
                <div className="absolute top-0 left-0 -translate-x-[41px] h-10 w-10 rounded-full bg-white border-4 border-primary flex items-center justify-center text-primary font-bold">
                  <span className="md:hidden">{item.year.substring(2)}</span>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 ml-4">
                  <div className="flex items-center mb-3">
                    <span className="text-primary font-bold text-lg mr-3 md:hidden">{item.year}</span>
                    <h3 className="text-xl font-heading font-semibold text-gray-900">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Historical Figures Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
              Influential Leaders
            </h2>
            <p className="text-gray-600">
              Throughout our history, these key figures have contributed significantly to
              the development and progress of Kuwadzana West Constituency.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-400 text-5xl">📷</span>
              </div>
              <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">Hon. Elizabeth Moyo</h3>
              <p className="text-gray-500 italic mb-2">1998-2002</p>
              <p className="text-gray-600">Instrumental in establishing the constituency's boundaries and initial development plans.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-400 text-5xl">📷</span>
              </div>
              <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">Hon. James Chitura</h3>
              <p className="text-gray-500 italic mb-2">2003-2011</p>
              <p className="text-gray-600">Led major infrastructure initiatives and community development projects during a period of growth.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-400 text-5xl">📷</span>
              </div>
              <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">Hon. Martha Nyamadzawo</h3>
              <p className="text-gray-500 italic mb-2">2012-2022</p>
              <p className="text-gray-600">Championed educational reforms and youth empowerment programs within the constituency.</p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Button className="bg-primary hover:bg-primary/90" asChild>
              <Link href="/leadership">View Current Leadership</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-heading font-bold mb-4">
                Help Us Preserve Our History
              </h2>
              <p className="text-white/90 mb-6">
                Do you have historical documents, photographs, or stories about Kuwadzana West?
                We invite you to contribute to our historical archives and help us document our
                shared heritage for future generations.
              </p>
              <Button className="bg-white text-primary hover:bg-white/90" asChild>
                <Link href="/contact">Contact Our Archives Team</Link>
              </Button>
            </div>
            <div className="bg-primary-dark p-6 rounded-lg">
              <h3 className="text-xl font-heading font-semibold mb-4">Related Pages</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="flex items-center text-white/90 hover:text-white">
                    <ChevronRight className="h-4 w-4 mr-2" />
                    <span>About Kuwadzana West</span>
                  </Link>
                </li>
                <li>
                  <Link href="/about/mission" className="flex items-center text-white/90 hover:text-white">
                    <ChevronRight className="h-4 w-4 mr-2" />
                    <span>Our Mission & Vision</span>
                  </Link>
                </li>
                <li>
                  <Link href="/resources/public-documents" className="flex items-center text-white/90 hover:text-white">
                    <ChevronRight className="h-4 w-4 mr-2" />
                    <span>Historical Documents</span>
                  </Link>
                </li>
                <li>
                  <Link href="/leadership" className="flex items-center text-white/90 hover:text-white">
                    <ChevronRight className="h-4 w-4 mr-2" />
                    <span>Leadership Directory</span>
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