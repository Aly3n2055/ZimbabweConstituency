import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Briefcase,
  Book,
  HelpCircle,
  Phone,
  LifeBuoy,
  ExternalLink,
  ChevronRight,
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Resource categories with their pages and brief descriptions
  const resourceCategories = [
    {
      icon: <Briefcase className="h-12 w-12 text-primary" />,
      title: "Government Services",
      description: "Access essential government services including ID registration, housing applications, and social welfare programs.",
      link: "/resources/government-services",
      featured: true
    },
    {
      icon: <FileText className="h-12 w-12 text-primary" />,
      title: "Constituency Reports",
      description: "Official reports on constituency development, budget allocation, and project progress.",
      link: "/resources/constituency-reports",
      featured: true
    },
    {
      icon: <Book className="h-12 w-12 text-primary" />,
      title: "Public Documents",
      description: "Access public records, policy documents, development plans, and official publications.",
      link: "/resources/public-documents",
      featured: true
    },
    {
      icon: <LifeBuoy className="h-12 w-12 text-primary" />,
      title: "Funding Opportunities",
      description: "Information on grants, loans, and funding programs available to constituency residents and businesses.",
      link: "/resources/funding-opportunities",
      featured: true
    },
    {
      icon: <Phone className="h-12 w-12 text-primary" />,
      title: "Emergency Contacts",
      description: "Essential contact information for emergency services, healthcare facilities, and crisis support.",
      link: "/resources/emergency-contacts",
      featured: false
    },
    {
      icon: <HelpCircle className="h-12 w-12 text-primary" />,
      title: "FAQs",
      description: "Frequently asked questions about constituency services, procedures, and community programs.",
      link: "/resources/faqs",
      featured: false
    }
  ];

  // Filter resources based on search query
  const filteredResources = searchQuery
    ? resourceCategories.filter(category => 
        category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : resourceCategories;

  // Separate featured and non-featured resources
  const featuredResources = filteredResources.filter(resource => resource.featured);
  const otherResources = filteredResources.filter(resource => !resource.featured);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-heading font-bold mb-4">Resources</h1>
            <p className="text-xl mb-8">
              Access important information, documents, and services to help you navigate government 
              processes and stay informed about Kuwadzana West Constituency.
            </p>
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for resources..."
                className="pl-10 pr-4 py-6 text-gray-900 bg-white border-none rounded-full shadow-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resources Section */}
      {featuredResources.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-12 text-center">
              {searchQuery ? "Search Results" : "Featured Resources"}
            </h2>

            {filteredResources.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-2xl mx-auto">
                <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">No Resources Found</h3>
                <p className="text-gray-600 mb-4">
                  We couldn't find any resources matching your search criteria. 
                  Please try different keywords or browse all available resources.
                </p>
                <Button variant="outline" onClick={() => setSearchQuery("")}>
                  View All Resources
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featuredResources.map((resource, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
                    <div className="p-8 flex flex-col h-full">
                      <div className="flex items-center mb-4">
                        <div className="bg-primary/10 p-4 rounded-lg">
                          {resource.icon}
                        </div>
                        <h3 className="text-2xl font-heading font-semibold text-gray-900 ml-4">
                          {resource.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 mb-6 flex-grow">{resource.description}</p>
                      <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                        <Link href={resource.link}>Access Resources</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Additional Resources Section */}
      {otherResources.length > 0 && !searchQuery && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-10 text-center">
              Additional Resources
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherResources.map((resource, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div className="flex items-center mb-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      {resource.icon}
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-gray-900 ml-3">
                      {resource.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4">{resource.description}</p>
                  <Link 
                    href={resource.link}
                    className="text-primary hover:text-primary/90 font-medium flex items-center"
                  >
                    <span>Learn More</span>
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* External Resources Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-10 text-center">
            External Resources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <a 
              href="https://www.gta.gov.zw/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white rounded-lg p-6 border border-gray-200 transition-all hover:shadow-md"
            >
              <h3 className="text-xl font-heading font-semibold text-gray-900 mb-3 flex items-center">
                Government of Zimbabwe
                <ExternalLink className="ml-2 h-4 w-4 text-gray-400" />
              </h3>
              <p className="text-gray-600">
                Access official government information, services, and resources from the national government portal.
              </p>
            </a>
            
            <a 
              href="https://www.parlzim.gov.zw/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white rounded-lg p-6 border border-gray-200 transition-all hover:shadow-md"
            >
              <h3 className="text-xl font-heading font-semibold text-gray-900 mb-3 flex items-center">
                Parliament of Zimbabwe
                <ExternalLink className="ml-2 h-4 w-4 text-gray-400" />
              </h3>
              <p className="text-gray-600">
                Information on legislation, parliamentary proceedings, and elected representatives.
              </p>
            </a>
            
            <a 
              href="https://www.zanupf.org.zw/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white rounded-lg p-6 border border-gray-200 transition-all hover:shadow-md"
            >
              <h3 className="text-xl font-heading font-semibold text-gray-900 mb-3 flex items-center">
                ZANU-PF Official Website
                <ExternalLink className="ml-2 h-4 w-4 text-gray-400" />
              </h3>
              <p className="text-gray-600">
                News, information, and resources from Zimbabwe's governing political party.
              </p>
            </a>
            
            <a 
              href="https://www.hararecity.co.zw/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white rounded-lg p-6 border border-gray-200 transition-all hover:shadow-md"
            >
              <h3 className="text-xl font-heading font-semibold text-gray-900 mb-3 flex items-center">
                Harare City Council
                <ExternalLink className="ml-2 h-4 w-4 text-gray-400" />
              </h3>
              <p className="text-gray-600">
                Municipal services, local bylaws, and city development information for Harare residents.
              </p>
            </a>
            
            <a 
              href="https://www.zimstat.co.zw/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white rounded-lg p-6 border border-gray-200 transition-all hover:shadow-md"
            >
              <h3 className="text-xl font-heading font-semibold text-gray-900 mb-3 flex items-center">
                Zimbabwe Statistical Office
                <ExternalLink className="ml-2 h-4 w-4 text-gray-400" />
              </h3>
              <p className="text-gray-600">
                Official statistics on population, economy, and development indicators for Zimbabwe.
              </p>
            </a>
            
            <a 
              href="https://www.mohcc.gov.zw/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white rounded-lg p-6 border border-gray-200 transition-all hover:shadow-md"
            >
              <h3 className="text-xl font-heading font-semibold text-gray-900 mb-3 flex items-center">
                Ministry of Health
                <ExternalLink className="ml-2 h-4 w-4 text-gray-400" />
              </h3>
              <p className="text-gray-600">
                Health guidelines, vaccinations information, and healthcare resources for citizens.
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-12 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-6">
                Need Help Finding Resources?
              </h2>
              <p className="text-white/90 mb-6">
                Our constituency office staff are available to assist you in finding the right resources,
                understanding government procedures, and accessing the services you need.
              </p>
              <Button className="bg-white text-primary hover:bg-white/90" asChild>
                <Link href="/contact">Contact Our Support Team</Link>
              </Button>
            </div>
            <div className="bg-primary-dark p-8 rounded-lg">
              <h3 className="text-xl font-heading font-semibold mb-4">Resource Highlights</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/resources/government-services" className="flex items-center text-white/90 hover:text-white">
                    <ChevronRight className="h-5 w-5 mr-2" />
                    <div>
                      <span className="font-medium block">Government Services Directory</span>
                      <span className="text-sm text-white/70">Find and access essential services</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="/resources/emergency-contacts" className="flex items-center text-white/90 hover:text-white">
                    <ChevronRight className="h-5 w-5 mr-2" />
                    <div>
                      <span className="font-medium block">Emergency Contact Information</span>
                      <span className="text-sm text-white/70">Critical contacts for emergencies</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="/resources/funding-opportunities" className="flex items-center text-white/90 hover:text-white">
                    <ChevronRight className="h-5 w-5 mr-2" />
                    <div>
                      <span className="font-medium block">Funding & Financial Assistance</span>
                      <span className="text-sm text-white/70">Support for businesses and individuals</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="/resources/constituency-reports" className="flex items-center text-white/90 hover:text-white">
                    <ChevronRight className="h-5 w-5 mr-2" />
                    <div>
                      <span className="font-medium block">Constituency Performance Reports</span>
                      <span className="text-sm text-white/70">Transparency in governance</span>
                    </div>
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