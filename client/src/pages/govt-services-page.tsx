import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Search,
  ExternalLink,
  Clock,
  Calendar,
  MapPin,
  Phone,
  Mail,
  FileText,
  User,
  Home,
  Heart,
  BookOpen,
  Landmark,
  Users,
  LucideIcon,
  ChevronRight
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Service category interface
interface ServiceCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

// Service interface
interface Service {
  id: number;
  title: string;
  description: string;
  category: string;
  location: string;
  contactPhone: string;
  contactEmail: string;
  hours: string;
  website?: string;
  requirements?: string[];
  process?: string[];
  fees?: string;
  featured: boolean;
}

export default function GovtServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // Service categories
  const categories: ServiceCategory[] = [
    { 
      id: "all", 
      name: "All Services", 
      icon: <Briefcase className="h-5 w-5" />,
      description: "View all government services available to Kuwadzana West Constituency residents."
    },
    { 
      id: "identification", 
      name: "Identification & Registration", 
      icon: <User className="h-5 w-5" />,
      description: "Services related to national identification, birth and death registration, and citizenship."
    },
    { 
      id: "housing", 
      name: "Housing & Property", 
      icon: <Home className="h-5 w-5" />,
      description: "Property registration, housing applications, and land-related services."
    },
    { 
      id: "health", 
      name: "Healthcare Services", 
      icon: <Heart className="h-5 w-5" />,
      description: "Public health services, medical assistance programs, and health insurance."
    },
    { 
      id: "education", 
      name: "Education & Training", 
      icon: <BookOpen className="h-5 w-5" />,
      description: "Educational resources, scholarship programs, and vocational training opportunities."
    },
    { 
      id: "business", 
      name: "Business & Licensing", 
      icon: <Landmark className="h-5 w-5" />,
      description: "Business registration, permits, licenses, and entrepreneurship support."
    },
    { 
      id: "social", 
      name: "Social Welfare", 
      icon: <Users className="h-5 w-5" />,
      description: "Social assistance programs, pension services, and community support initiatives."
    }
  ];

  // Government services data
  const services: Service[] = [
    {
      id: 1,
      title: "National ID Registration",
      description: "Apply for a new national ID card or replace a lost or expired ID.",
      category: "identification",
      location: "Registrar General's Office, Kuwadzana Branch",
      contactPhone: "+263 242 123 456",
      contactEmail: "registry@kuwadzanawest.gov.zw",
      hours: "Monday to Friday, 8:00 AM - 3:00 PM",
      requirements: [
        "Birth certificate (original)",
        "Proof of residence",
        "Two passport-sized photographs",
        "Police report (for lost IDs)"
      ],
      process: [
        "Complete application form available at the office",
        "Submit required documents",
        "Pay application fee",
        "Receive collection date",
        "Collect ID on specified date"
      ],
      fees: "New ID: $5 USD equivalent, Replacement: $10 USD equivalent",
      featured: true
    },
    {
      id: 2,
      title: "Birth Registration",
      description: "Register a newborn child and obtain a birth certificate.",
      category: "identification",
      location: "Registrar General's Office, Kuwadzana Branch",
      contactPhone: "+263 242 123 456",
      contactEmail: "registry@kuwadzanawest.gov.zw",
      hours: "Monday to Friday, 8:00 AM - 3:00 PM",
      requirements: [
        "Hospital birth record",
        "Parents' IDs",
        "Marriage certificate (if applicable)"
      ],
      process: [
        "Complete birth registration form",
        "Submit required documents",
        "Pay registration fee",
        "Receive birth certificate"
      ],
      fees: "Registration within 42 days: Free, Late registration: $2 USD equivalent",
      featured: true
    },
    {
      id: 3,
      title: "Death Registration",
      description: "Register a death and obtain a death certificate.",
      category: "identification",
      location: "Registrar General's Office, Kuwadzana Branch",
      contactPhone: "+263 242 123 456",
      contactEmail: "registry@kuwadzanawest.gov.zw",
      hours: "Monday to Friday, 8:00 AM - 3:00 PM",
      requirements: [
        "Medical certificate of death",
        "Deceased's national ID",
        "Informant's ID"
      ],
      process: [
        "Complete death notification form",
        "Submit required documents",
        "Receive death certificate"
      ],
      fees: "Registration within 30 days: Free, Late registration: $2 USD equivalent",
      featured: false
    },
    {
      id: 4,
      title: "Housing Application",
      description: "Apply for public housing or housing improvement assistance.",
      category: "housing",
      location: "Housing Department, Kuwadzana West District Office",
      contactPhone: "+263 242 234 567",
      contactEmail: "housing@kuwadzanawest.gov.zw",
      hours: "Monday to Friday, 8:30 AM - 4:00 PM",
      requirements: [
        "National ID",
        "Proof of income",
        "Proof of residence",
        "Family composition declaration"
      ],
      process: [
        "Complete housing application form",
        "Submit required documents",
        "Receive application confirmation",
        "Await assessment and notification"
      ],
      fees: "Application processing fee: $5 USD equivalent",
      featured: false
    },
    {
      id: 5,
      title: "Property Registration",
      description: "Register property ownership or transfer property titles.",
      category: "housing",
      location: "Land Registry Office, Kuwadzana West District Center",
      contactPhone: "+263 242 345 678",
      contactEmail: "landregistry@kuwadzanawest.gov.zw",
      hours: "Monday to Friday, 8:00 AM - 3:30 PM",
      requirements: [
        "Proof of identity",
        "Property documents",
        "Payment of applicable fees",
        "Completed property registration forms"
      ],
      process: [
        "Submit application with required documents",
        "Pay registration fees",
        "Property inspection (if applicable)",
        "Certificate of registration issued"
      ],
      fees: "Registration fee: 4% of property value",
      featured: false
    },
    {
      id: 6,
      title: "Primary Healthcare Services",
      description: "Access primary healthcare services including preventive care, immunizations, and basic treatment.",
      category: "health",
      location: "Kuwadzana West Health Center",
      contactPhone: "+263 242 456 789",
      contactEmail: "health@kuwadzanawest.gov.zw",
      hours: "Monday to Sunday, 24 hours",
      requirements: [
        "National ID or health card",
        "Child health card (for children)"
      ],
      process: [
        "Register at reception",
        "Triage assessment",
        "Doctor/nurse consultation",
        "Treatment or referral"
      ],
      fees: "Basic consultation: $1 USD equivalent, Some services free (immunizations, maternal care)",
      featured: true
    },
    {
      id: 7,
      title: "Public Health Insurance Registration",
      description: "Register for the National Health Insurance Scheme for subsidized healthcare.",
      category: "health",
      location: "National Health Insurance Office, Kuwadzana West",
      contactPhone: "+263 242 567 890",
      contactEmail: "insurance@kuwadzanawest.gov.zw",
      hours: "Monday to Friday, 8:00 AM - 4:00 PM",
      requirements: [
        "National ID",
        "Employment details or income verification",
        "Proof of residence",
        "Family members' details (if family coverage)"
      ],
      process: [
        "Complete registration form",
        "Submit required documents",
        "Pay initial premium",
        "Receive insurance card"
      ],
      fees: "Monthly premium: Based on income assessment",
      featured: false
    },
    {
      id: 8,
      title: "School Enrollment",
      description: "Enroll children in public primary and secondary schools.",
      category: "education",
      location: "District Education Office, Kuwadzana West",
      contactPhone: "+263 242 678 901",
      contactEmail: "education@kuwadzanawest.gov.zw",
      hours: "Monday to Friday, 8:00 AM - 4:00 PM",
      requirements: [
        "Child's birth certificate",
        "Immunization records",
        "Previous school reports (for transfers)",
        "Parent/guardian ID"
      ],
      process: [
        "Obtain enrollment form from preferred school",
        "Submit completed form with required documents",
        "Pay enrollment fee",
        "Receive confirmation of placement"
      ],
      fees: "Enrollment fee: Varies by school, Financial assistance available for eligible families",
      featured: true
    },
    {
      id: 9,
      title: "Scholarship Applications",
      description: "Apply for government and constituency-sponsored educational scholarships.",
      category: "education",
      location: "Education Support Office, Kuwadzana West Community Center",
      contactPhone: "+263 242 789 012",
      contactEmail: "scholarships@kuwadzanawest.gov.zw",
      hours: "Monday to Friday, 9:00 AM - 3:00 PM",
      requirements: [
        "Academic records",
        "Proof of residence in Kuwadzana West",
        "Financial need assessment",
        "Personal statement"
      ],
      process: [
        "Submit application during annual application period",
        "Attend interview (if shortlisted)",
        "Await selection results",
        "Scholarship awarded based on merit and need"
      ],
      fees: "Application: Free",
      featured: false
    },
    {
      id: 10,
      title: "Business Registration",
      description: "Register a new business or company within the constituency.",
      category: "business",
      location: "Business Registry, Kuwadzana West District Office",
      contactPhone: "+263 242 890 123",
      contactEmail: "business@kuwadzanawest.gov.zw",
      hours: "Monday to Friday, 8:30 AM - 3:30 PM",
      requirements: [
        "Business proposal/plan",
        "Proof of identity of business owner(s)",
        "Address verification",
        "Sector-specific requirements (if applicable)"
      ],
      process: [
        "Complete business registration form",
        "Submit required documents",
        "Pay registration fee",
        "Receive business registration certificate"
      ],
      fees: "Registration fee: Starts at $50 USD equivalent (varies by business type)",
      featured: true
    },
    {
      id: 11,
      title: "Trading License Application",
      description: "Apply for licenses and permits required for business operations.",
      category: "business",
      location: "Business Licensing Office, Kuwadzana West",
      contactPhone: "+263 242 901 234",
      contactEmail: "licensing@kuwadzanawest.gov.zw",
      hours: "Monday to Friday, 8:30 AM - 3:30 PM",
      requirements: [
        "Business registration certificate",
        "Premises inspection certificate",
        "Sector-specific compliance documents",
        "Tax clearance certificate"
      ],
      process: [
        "Submit application with required documents",
        "Premises inspection (if applicable)",
        "Pay license fee",
        "Receive trading license"
      ],
      fees: "License fee: Varies by business category",
      featured: false
    },
    {
      id: 12,
      title: "Social Welfare Assistance",
      description: "Apply for social assistance programs for vulnerable households.",
      category: "social",
      location: "Social Welfare Department, Kuwadzana West District Center",
      contactPhone: "+263 242 012 345",
      contactEmail: "welfare@kuwadzanawest.gov.zw",
      hours: "Monday to Friday, 8:00 AM - 4:00 PM",
      requirements: [
        "National ID",
        "Proof of residence",
        "Income verification",
        "Household assessment"
      ],
      process: [
        "Register at Social Welfare Office",
        "Complete assessment interview",
        "Home visit by social worker",
        "Determination of assistance eligibility"
      ],
      fees: "Application: Free",
      featured: true
    },
    {
      id: 13,
      title: "Elderly Care Support",
      description: "Access support services and benefits for senior citizens.",
      category: "social",
      location: "Elderly Care Unit, Social Welfare Department",
      contactPhone: "+263 242 123 456",
      contactEmail: "elderly@kuwadzanawest.gov.zw",
      hours: "Monday to Friday, 8:30 AM - 3:30 PM",
      requirements: [
        "National ID proving age above 65",
        "Residence verification",
        "Medical assessment (for health-related assistance)"
      ],
      process: [
        "Register with Elderly Care Unit",
        "Assessment of needs",
        "Assignment of support services",
        "Regular follow-up visits"
      ],
      fees: "Registration: Free",
      featured: false
    },
    {
      id: 14,
      title: "Disability Services",
      description: "Support services, assistive devices, and benefits for persons with disabilities.",
      category: "social",
      location: "Disability Services Center, Kuwadzana West",
      contactPhone: "+263 242 234 567",
      contactEmail: "disability@kuwadzanawest.gov.zw",
      hours: "Monday to Friday, 8:00 AM - 4:00 PM",
      requirements: [
        "National ID",
        "Medical assessment or disability certificate",
        "Needs assessment form"
      ],
      process: [
        "Register at Disability Services Center",
        "Complete needs assessment",
        "Determination of appropriate services",
        "Service delivery and follow-up"
      ],
      fees: "Registration: Free, Some specialized services may have subsidized fees",
      featured: false
    }
  ];

  // Filter services based on search query and active category
  const filteredServices = services.filter(service => {
    const matchesSearch = searchQuery === "" || 
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === "all" || service.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Featured services
  const featuredServices = filteredServices.filter(service => service.featured);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Briefcase className="h-16 w-16 mx-auto mb-6" />
            <h1 className="text-4xl font-heading font-bold mb-4">Government Services</h1>
            <p className="text-xl mb-8">
              Access essential government services and resources available to Kuwadzana West residents.
              Find information on how to apply, requirements, and service locations.
            </p>
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for services..."
                className="pl-10 pr-4 py-6 text-gray-900 bg-white border-none rounded-full shadow-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories Section */}
      <section className="py-10 bg-white border-b">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-heading font-semibold text-gray-900 mb-8 text-center">
            Browse Services by Category
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex flex-col items-center p-4 rounded-lg transition-all ${
                  activeCategory === category.id 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className={`p-3 rounded-full mb-3 ${
                  activeCategory === category.id 
                    ? 'bg-primary-dark' 
                    : 'bg-white'
                }`}>
                  {category.icon}
                </div>
                <span className="text-center font-medium text-sm">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Active Category Description */}
          <div className="mb-8">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
              {activeCategory === "all" 
                ? "All Government Services" 
                : categories.find(c => c.id === activeCategory)?.name}
            </h2>
            <p className="text-gray-600 max-w-3xl">
              {categories.find(c => c.id === activeCategory)?.description}
            </p>
          </div>

          {/* No Results Message */}
          {filteredServices.length === 0 && (
            <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-2xl mx-auto">
              <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">No Services Found</h3>
              <p className="text-gray-600 mb-4">
                We couldn't find any services matching your search criteria. 
                Please try different keywords or browse all service categories.
              </p>
              <Button variant="outline" onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}>
                View All Services
              </Button>
            </div>
          )}

          {/* Featured Services Section */}
          {filteredServices.length > 0 && featuredServices.length > 0 && activeCategory === "all" && !searchQuery && (
            <div className="mb-12">
              <h3 className="text-2xl font-heading font-semibold text-gray-900 mb-6">
                Featured Services
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredServices.map(service => (
                  <Card key={service.id} className="h-full flex flex-col">
                    <CardHeader className="pb-2">
                      <CardTitle>{service.title}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="space-y-3 text-sm">
                        <div className="flex items-start">
                          <MapPin className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                          <span>{service.location}</span>
                        </div>
                        <div className="flex items-start">
                          <Clock className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                          <span>{service.hours}</span>
                        </div>
                        <div className="flex items-start">
                          <Phone className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                          <span>{service.contactPhone}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                        <a href={`#service-${service.id}`}>View Details</a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* All Services Section */}
          {filteredServices.length > 0 && (
            <div>
              <h3 className="text-2xl font-heading font-semibold text-gray-900 mb-6">
                {searchQuery 
                  ? `Search Results (${filteredServices.length})` 
                  : activeCategory !== "all" 
                    ? `${categories.find(c => c.id === activeCategory)?.name} Services` 
                    : "All Available Services"}
              </h3>
              
              <div className="space-y-6">
                {filteredServices.map(service => (
                  <div key={service.id} id={`service-${service.id}`} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6">
                      <h4 className="text-xl font-heading font-semibold text-gray-900 mb-2">
                        {service.title}
                      </h4>
                      <p className="text-gray-600 mb-6">{service.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h5 className="font-medium text-gray-900 mb-3">Service Location & Contact</h5>
                          <div className="space-y-3 text-sm">
                            <div className="flex items-start">
                              <MapPin className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                              <span>{service.location}</span>
                            </div>
                            <div className="flex items-start">
                              <Clock className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                              <span>{service.hours}</span>
                            </div>
                            <div className="flex items-start">
                              <Phone className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                              <span>{service.contactPhone}</span>
                            </div>
                            <div className="flex items-start">
                              <Mail className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                              <span>{service.contactEmail}</span>
                            </div>
                            {service.website && (
                              <div className="flex items-start">
                                <ExternalLink className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                                <a href={service.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                  Visit Website
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h5 className="font-medium text-gray-900 mb-3">Fees & Requirements</h5>
                          {service.fees && (
                            <div className="mb-3">
                              <span className="font-medium text-sm text-gray-700 block mb-1">Fees:</span>
                              <p className="text-sm">{service.fees}</p>
                            </div>
                          )}
                          {service.requirements && (
                            <div>
                              <span className="font-medium text-sm text-gray-700 block mb-1">Required Documents:</span>
                              <ul className="list-disc pl-5 text-sm space-y-1">
                                {service.requirements.map((req, index) => (
                                  <li key={index}>{req}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {service.process && (
                        <Accordion type="single" collapsible>
                          <AccordionItem value="process" className="border border-gray-200 rounded-lg">
                            <AccordionTrigger className="px-4">
                              <span className="text-gray-900 font-medium">
                                Application Process
                              </span>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-4">
                              <ol className="list-decimal pl-5 space-y-2">
                                {service.process.map((step, index) => (
                                  <li key={index}>{step}</li>
                                ))}
                              </ol>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      )}
                    </div>
                    
                    <div className="bg-gray-50 p-4 border-t border-gray-200 flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Category: {categories.find(c => c.id === service.category)?.name}
                      </span>
                      <div className="space-x-3">
                        <Button size="sm" variant="outline" asChild>
                          <Link href="/contact">
                            Ask a Question
                          </Link>
                        </Button>
                        <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
                          <Link href="/resources/public-documents">
                            <FileText className="h-4 w-4 mr-2" />
                            Related Forms
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Service Centers Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6 text-center">
            Government Service Centers
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10">
            Visit these government service centers in Kuwadzana West Constituency to access 
            various public services and get assistance from government representatives.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Kuwadzana West District Office",
                address: "Main Street, Kuwadzana West, Harare",
                phone: "+263 242 123 456",
                email: "info@kuwadzanawest.gov.zw",
                hours: "Monday to Friday: 8:00 AM - 4:30 PM\nSaturday: 8:00 AM - 12:00 PM",
                services: ["Administrative Services", "Business Licensing", "Housing Applications", "Revenue Collection"]
              },
              {
                name: "Kuwadzana West Health Center",
                address: "Health Avenue, Kuwadzana West, Harare",
                phone: "+263 242 234 567",
                email: "health@kuwadzanawest.gov.zw",
                hours: "Monday to Sunday: 24 Hours (Emergency Services)\nOutpatient: 8:00 AM - 5:00 PM",
                services: ["Primary Healthcare", "Maternal Care", "Immunizations", "Health Education"]
              },
              {
                name: "Registrar's Office - Kuwadzana Branch",
                address: "Government Complex, Kuwadzana West, Harare",
                phone: "+263 242 345 678",
                email: "registry@kuwadzanawest.gov.zw",
                hours: "Monday to Friday: 8:00 AM - 3:00 PM",
                services: ["Birth Registration", "Death Registration", "National ID Services", "Marriage Certificates"]
              }
            ].map((center, index) => (
              <Card key={index} className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle>{center.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                      <span>{center.address}</span>
                    </div>
                    <div className="flex items-start">
                      <Phone className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                      <span>{center.phone}</span>
                    </div>
                    <div className="flex items-start">
                      <Mail className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                      <span>{center.email}</span>
                    </div>
                    <div className="flex items-start">
                      <Clock className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                      <div>
                        {center.hours.split('\n').map((line, i) => (
                          <div key={i}>{line}</div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4">
                      <span className="font-medium text-gray-900 block mb-2">Available Services:</span>
                      <ul className="list-disc pl-5 space-y-1">
                        {center.services.map((service, i) => (
                          <li key={i}>{service}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    <MapPin className="h-4 w-4 mr-2" />
                    Get Directions
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline" className="border-primary text-primary">
              View All Service Centers
            </Button>
          </div>
        </div>
      </section>

      {/* Online Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6 text-center">
            Online Government Services
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10">
            Save time by accessing these government services online. These digital services allow you 
            to complete applications, make payments, and access information without visiting an office.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "e-Document Portal",
                description: "Request and download official documents including birth certificates, ID replacements, and residence certificates.",
                url: "https://documents.gov.zw",
                icon: <FileText className="h-10 w-10" />
              },
              {
                title: "Online Fee Payment",
                description: "Make secure payments for government services, licenses, and permits using mobile money or bank transfers.",
                url: "https://payments.gov.zw",
                icon: <Briefcase className="h-10 w-10" />
              },
              {
                title: "Service Status Checker",
                description: "Track the status of your service applications and document processing in real-time.",
                url: "https://status.gov.zw",
                icon: <Clock className="h-10 w-10" />
              }
            ].map((service, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col h-full"
              >
                <div className="bg-primary/10 p-4 rounded-full w-fit mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 flex-grow">{service.description}</p>
                <a 
                  href={service.url}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
                >
                  <span>Access Service</span>
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Support Section */}
      <section className="py-12 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">
                Need Help with Government Services?
              </h2>
              <p className="text-white/90 mb-6">
                Our constituency office staff are available to help you navigate government services, 
                complete applications, and understand requirements. We can provide guidance in English, 
                Shona, and Ndebele to ensure all residents can access the services they need.
              </p>
              <Button className="bg-white text-primary hover:bg-white/90" asChild>
                <Link href="/contact">Contact Our Support Team</Link>
              </Button>
            </div>
            <div className="bg-primary-dark p-8 rounded-lg">
              <h3 className="text-xl font-heading font-semibold mb-4">Common Service Questions</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/resources/faqs" className="flex items-center text-white/90 hover:text-white">
                    <ChevronRight className="h-5 w-5 mr-2" />
                    <span>How do I apply for a National ID card?</span>
                  </Link>
                </li>
                <li>
                  <Link href="/resources/faqs" className="flex items-center text-white/90 hover:text-white">
                    <ChevronRight className="h-5 w-5 mr-2" />
                    <span>What documents do I need for birth registration?</span>
                  </Link>
                </li>
                <li>
                  <Link href="/resources/faqs" className="flex items-center text-white/90 hover:text-white">
                    <ChevronRight className="h-5 w-5 mr-2" />
                    <span>How can I access social welfare assistance?</span>
                  </Link>
                </li>
                <li>
                  <Link href="/resources/faqs" className="flex items-center text-white/90 hover:text-white">
                    <ChevronRight className="h-5 w-5 mr-2" />
                    <span>What is the process for registering a business?</span>
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