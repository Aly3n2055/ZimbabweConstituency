import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  LifeBuoy,
  Search,
  Calendar,
  LucideIcon,
  Clock,
  Users,
  Building,
  Briefcase,
  GraduationCap,
  Heart,
  Home,
  Leaf,
  ExternalLink,
  ChevronRight,
  AlertCircle,
  Download,
  FileText
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Badge
} from "@/components/ui/badge";

// Funding opportunity interface
interface FundingOpportunity {
  id: number;
  title: string;
  description: string;
  organization: string;
  eligibility: string[];
  amount: string;
  deadline: string;
  applicationUrl?: string;
  contactEmail: string;
  contactPhone: string;
  category: string;
  status: 'open' | 'upcoming' | 'closed';
  featured: boolean;
}

// Funding category interface
interface FundingCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

export default function FundingOpportunitiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Funding categories
  const categories: FundingCategory[] = [
    { 
      id: "all", 
      name: "All Opportunities", 
      icon: <LifeBuoy className="h-5 w-5" />,
      description: "Browse all available funding opportunities for Kuwadzana West residents and organizations."
    },
    { 
      id: "business", 
      name: "Business & Entrepreneurship", 
      icon: <Briefcase className="h-5 w-5" />,
      description: "Grants, loans, and investment opportunities for small businesses and entrepreneurs."
    },
    { 
      id: "education", 
      name: "Education & Training", 
      icon: <GraduationCap className="h-5 w-5" />,
      description: "Scholarships, bursaries, and educational support for students and learning institutions."
    },
    { 
      id: "community", 
      name: "Community Development", 
      icon: <Users className="h-5 w-5" />,
      description: "Funding for community projects, infrastructure, and local initiatives."
    },
    { 
      id: "housing", 
      name: "Housing & Property", 
      icon: <Home className="h-5 w-5" />,
      description: "Housing assistance, renovation grants, and property development funding."
    },
    { 
      id: "agriculture", 
      name: "Agriculture & Environment", 
      icon: <Leaf className="h-5 w-5" />,
      description: "Support for farming, environmental conservation, and sustainable practices."
    },
    { 
      id: "health", 
      name: "Healthcare", 
      icon: <Heart className="h-5 w-5" />,
      description: "Funding for health initiatives, medical support, and wellness programs."
    }
  ];

  // Funding opportunities data
  const opportunities: FundingOpportunity[] = [
    {
      id: 1,
      title: "Small Business Start-up Grant",
      description: "Financial support for new small business ventures in Kuwadzana West. Provides seed capital for qualifying entrepreneurs to launch viable business ideas.",
      organization: "Kuwadzana West Business Development Fund",
      eligibility: [
        "Residents of Kuwadzana West Constituency",
        "Business plan that demonstrates viability",
        "Aged 18-45 years",
        "No prior business funding from government sources"
      ],
      amount: "$500 - $2,000 USD equivalent",
      deadline: "April 30, 2023",
      applicationUrl: "https://kuwadzanawest.gov.zw/business-grants",
      contactEmail: "business@kuwadzanawest.gov.zw",
      contactPhone: "+263 242 123 456",
      category: "business",
      status: "open",
      featured: true
    },
    {
      id: 2,
      title: "Youth Vocational Training Scholarship",
      description: "Full scholarships for vocational training in high-demand trades including construction, electrical work, plumbing, and automotive repair.",
      organization: "Ministry of Youth Development",
      eligibility: [
        "Youth aged 18-35 years",
        "Resident of Kuwadzana West for at least 1 year",
        "Completed secondary education (Form 4)",
        "No prior technical training"
      ],
      amount: "Full tuition and stipend (valued at $1,200 USD equivalent)",
      deadline: "May 15, 2023",
      applicationUrl: "https://youth.gov.zw/scholarships",
      contactEmail: "vocational@youth.gov.zw",
      contactPhone: "+263 242 234 567",
      category: "education",
      status: "open",
      featured: true
    },
    {
      id: 3,
      title: "Community Center Renovation Grant",
      description: "Funding for the renovation and improvement of community centers, sports facilities, and public spaces in Kuwadzana West.",
      organization: "Constituency Development Fund",
      eligibility: [
        "Registered community organizations",
        "Facility must be accessible to all community members",
        "Clear renovation plan and budget",
        "Community contribution (in-kind or financial)"
      ],
      amount: "Up to $10,000 USD equivalent",
      deadline: "June 30, 2023",
      applicationUrl: "https://kuwadzanawest.gov.zw/community-grants",
      contactEmail: "development@kuwadzanawest.gov.zw",
      contactPhone: "+263 242 345 678",
      category: "community",
      status: "open",
      featured: true
    },
    {
      id: 4,
      title: "Women Entrepreneurs Micro-Loan Program",
      description: "Low-interest loans for women-owned businesses or business ideas with potential for growth and employment creation.",
      organization: "Women's Development Fund",
      eligibility: [
        "Women-owned businesses (at least 51% ownership)",
        "Resident of Kuwadzana West",
        "Viable business plan or existing business",
        "Willingness to participate in business training"
      ],
      amount: "$200 - $1,000 USD equivalent",
      deadline: "Ongoing (monthly review)",
      applicationUrl: "https://wdf.org.zw/micro-loans",
      contactEmail: "loans@wdf.org.zw",
      contactPhone: "+263 242 456 789",
      category: "business",
      status: "open",
      featured: false
    },
    {
      id: 5,
      title: "Higher Education Scholarship",
      description: "Comprehensive scholarship for university education covering tuition, accommodation, books, and stipend.",
      organization: "Kuwadzana Education Trust",
      eligibility: [
        "Exceptional academic performance (minimum 5 As at O-Level)",
        "Resident of Kuwadzana West for at least 3 years",
        "Acceptance to a recognized university",
        "Demonstrated financial need"
      ],
      amount: "Full university costs (approximately $3,000 USD equivalent per year)",
      deadline: "July 31, 2023",
      applicationUrl: "https://kuwadzanawest.gov.zw/education-trust",
      contactEmail: "scholarships@kuwadzanawest.gov.zw",
      contactPhone: "+263 242 567 890",
      category: "education",
      status: "open",
      featured: false
    },
    {
      id: 6,
      title: "Home Improvement Assistance",
      description: "Financial assistance for essential home repairs and improvements for vulnerable households.",
      organization: "Housing Support Initiative",
      eligibility: [
        "Low-income households",
        "Property owners in Kuwadzana West",
        "Critical repairs needed for safety or habitability",
        "No previous housing assistance in past 5 years"
      ],
      amount: "Up to $1,500 USD equivalent",
      deadline: "August 15, 2023",
      applicationUrl: "https://housing.gov.zw/assistance",
      contactEmail: "housing@kuwadzanawest.gov.zw",
      contactPhone: "+263 242 678 901",
      category: "housing",
      status: "open",
      featured: false
    },
    {
      id: 7,
      title: "Agricultural Input Support Program",
      description: "Provision of seeds, fertilizer, and farming tools for small-scale farmers in the constituency.",
      organization: "Ministry of Agriculture",
      eligibility: [
        "Resident farmers in Kuwadzana West",
        "Access to arable land (at least 0.5 hectare)",
        "Commitment to sustainable farming practices",
        "Participation in agricultural training"
      ],
      amount: "Input package valued at $300 USD equivalent",
      deadline: "September 1, 2023",
      applicationUrl: "https://agriculture.gov.zw/input-support",
      contactEmail: "farming@agriculture.gov.zw",
      contactPhone: "+263 242 789 012",
      category: "agriculture",
      status: "upcoming",
      featured: false
    },
    {
      id: 8,
      title: "Youth Innovation Challenge Grant",
      description: "Funding for innovative solutions to community challenges developed by young residents.",
      organization: "Innovation Zimbabwe",
      eligibility: [
        "Youth aged 18-35 years",
        "Resident of Kuwadzana West",
        "Original innovation addressing local challenges",
        "Prototype or concept demonstration"
      ],
      amount: "$1,000 - $5,000 USD equivalent",
      deadline: "October 15, 2023",
      applicationUrl: "https://innovation.org.zw/challenge",
      contactEmail: "grants@innovation.org.zw",
      contactPhone: "+263 242 890 123",
      category: "community",
      status: "upcoming",
      featured: false
    },
    {
      id: 9,
      title: "Healthcare Worker Training Scholarship",
      description: "Scholarships for training as nurses, community health workers, and other healthcare professionals.",
      organization: "Health Services Board",
      eligibility: [
        "Resident of Kuwadzana West",
        "Minimum educational qualifications (varies by program)",
        "Commitment to serve in local healthcare facilities after training",
        "Good health status"
      ],
      amount: "Full training costs plus monthly stipend",
      deadline: "November 30, 2023",
      applicationUrl: "https://health.gov.zw/training",
      contactEmail: "training@health.gov.zw",
      contactPhone: "+263 242 901 234",
      category: "health",
      status: "upcoming",
      featured: false
    },
    {
      id: 10,
      title: "Clean Energy Adoption Grant",
      description: "Financial support for households and businesses transitioning to renewable energy solutions.",
      organization: "Environmental Protection Agency",
      eligibility: [
        "Residents or businesses in Kuwadzana West",
        "Plan for solar, biogas, or other renewable energy installation",
        "Property suitable for installation",
        "Commitment to maintenance"
      ],
      amount: "40% of installation costs (maximum $2,000 USD equivalent)",
      deadline: "March 15, 2023",
      applicationUrl: "https://environment.gov.zw/clean-energy",
      contactEmail: "energy@environment.gov.zw",
      contactPhone: "+263 242 012 345",
      category: "agriculture",
      status: "closed",
      featured: false
    },
    {
      id: 11,
      title: "Teacher Professional Development Grant",
      description: "Funding for teachers to pursue advanced qualifications and specialized training.",
      organization: "Education Enhancement Fund",
      eligibility: [
        "Certified teachers working in Kuwadzana West schools",
        "Minimum 2 years teaching experience",
        "Commitment to continue teaching locally for 3 years after training",
        "Acceptance to relevant training program"
      ],
      amount: "Up to $2,000 USD equivalent",
      deadline: "February 28, 2023",
      applicationUrl: "https://education.gov.zw/teachers",
      contactEmail: "development@education.gov.zw",
      contactPhone: "+263 242 123 456",
      category: "education",
      status: "closed",
      featured: false
    },
    {
      id: 12,
      title: "COVID-19 Business Recovery Fund",
      description: "Financial assistance for businesses affected by the COVID-19 pandemic to rebuild and recover operations.",
      organization: "Economic Recovery Initiative",
      eligibility: [
        "Established businesses in Kuwadzana West",
        "Proof of adverse impact from COVID-19",
        "Viable recovery plan",
        "Minimum 2 employees"
      ],
      amount: "$1,000 - $3,000 USD equivalent",
      deadline: "January 31, 2023",
      applicationUrl: "https://recovery.gov.zw/business",
      contactEmail: "recovery@economy.gov.zw",
      contactPhone: "+263 242 234 567",
      category: "business",
      status: "closed",
      featured: false
    }
  ];

  // Filter opportunities based on search query, active category, and status
  const filteredOpportunities = opportunities.filter(opportunity => {
    const matchesSearch = searchQuery === "" || 
      opportunity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opportunity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opportunity.organization.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === "all" || opportunity.category === activeCategory;
    const matchesStatus = statusFilter === "all" || opportunity.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Open opportunities
  const openOpportunities = filteredOpportunities.filter(opportunity => opportunity.status === 'open');
  
  // Upcoming opportunities
  const upcomingOpportunities = filteredOpportunities.filter(opportunity => opportunity.status === 'upcoming');
  
  // Closed opportunities
  const closedOpportunities = filteredOpportunities.filter(opportunity => opportunity.status === 'closed');
  
  // Featured opportunities
  const featuredOpportunities = opportunities.filter(opportunity => 
    opportunity.featured && opportunity.status === 'open'
  );

  // Format date for display
  const formatDeadline = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  // Get status badge
  const getStatusBadge = (status: 'open' | 'upcoming' | 'closed') => {
    switch(status) {
      case 'open':
        return <Badge className="bg-green-500">Open</Badge>;
      case 'upcoming':
        return <Badge className="bg-blue-500">Upcoming</Badge>;
      case 'closed':
        return <Badge className="bg-gray-500">Closed</Badge>;
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <LifeBuoy className="h-16 w-16 mx-auto mb-6" />
            <h1 className="text-4xl font-heading font-bold mb-4">Funding Opportunities</h1>
            <p className="text-xl mb-8">
              Discover grants, loans, scholarships, and financial support programs available to 
              Kuwadzana West residents, businesses, and community organizations.
            </p>
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for funding opportunities..."
                className="pl-10 pr-4 py-6 text-gray-900 bg-white border-none rounded-full shadow-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Funding Categories Section */}
      <section className="py-10 bg-white border-b">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-heading font-semibold text-gray-900 mb-8 text-center">
            Funding Categories
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
                ? "All Funding Opportunities" 
                : categories.find(c => c.id === activeCategory)?.name}
            </h2>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <p className="text-gray-600 max-w-3xl">
                {categories.find(c => c.id === activeCategory)?.description}
              </p>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Status:</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setStatusFilter("all")}
                    className={`px-3 py-1 text-sm rounded-full ${
                      statusFilter === "all" 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setStatusFilter("open")}
                    className={`px-3 py-1 text-sm rounded-full ${
                      statusFilter === "open" 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Open
                  </button>
                  <button
                    onClick={() => setStatusFilter("upcoming")}
                    className={`px-3 py-1 text-sm rounded-full ${
                      statusFilter === "upcoming" 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Upcoming
                  </button>
                  <button
                    onClick={() => setStatusFilter("closed")}
                    className={`px-3 py-1 text-sm rounded-full ${
                      statusFilter === "closed" 
                        ? 'bg-gray-500 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Closed
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* No Results Message */}
          {filteredOpportunities.length === 0 && (
            <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-2xl mx-auto">
              <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">No Funding Opportunities Found</h3>
              <p className="text-gray-600 mb-4">
                We couldn't find any funding opportunities matching your search criteria. 
                Please try different keywords or browse all categories.
              </p>
              <Button variant="outline" onClick={() => {
                setActiveCategory("all");
                setStatusFilter("all");
                setSearchQuery("");
              }}>
                View All Opportunities
              </Button>
            </div>
          )}

          {/* Opportunities Tabs Section */}
          {filteredOpportunities.length > 0 && (
            <Tabs defaultValue={statusFilter === "all" ? "open" : statusFilter} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger 
                  value="open" 
                  className="text-lg py-3"
                  onClick={() => statusFilter !== "open" && setStatusFilter("open")}
                >
                  Open ({openOpportunities.length})
                </TabsTrigger>
                <TabsTrigger 
                  value="upcoming" 
                  className="text-lg py-3"
                  onClick={() => statusFilter !== "upcoming" && setStatusFilter("upcoming")}
                >
                  Upcoming ({upcomingOpportunities.length})
                </TabsTrigger>
                <TabsTrigger 
                  value="closed" 
                  className="text-lg py-3"
                  onClick={() => statusFilter !== "closed" && setStatusFilter("closed")}
                >
                  Closed ({closedOpportunities.length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="open">
                <div className="space-y-6">
                  {openOpportunities.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-md p-8 text-center">
                      <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">No Open Opportunities</h3>
                      <p className="text-gray-600 mb-4">
                        There are currently no open funding opportunities in this category.
                        Please check upcoming opportunities or explore other categories.
                      </p>
                    </div>
                  ) : (
                    openOpportunities.map(opportunity => (
                      <OpportunityCard 
                        key={opportunity.id} 
                        opportunity={opportunity} 
                        formatDeadline={formatDeadline}
                        getStatusBadge={getStatusBadge}
                      />
                    ))
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="upcoming">
                <div className="space-y-6">
                  {upcomingOpportunities.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-md p-8 text-center">
                      <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">No Upcoming Opportunities</h3>
                      <p className="text-gray-600 mb-4">
                        There are currently no upcoming funding opportunities in this category.
                        Please check open opportunities or explore other categories.
                      </p>
                    </div>
                  ) : (
                    upcomingOpportunities.map(opportunity => (
                      <OpportunityCard 
                        key={opportunity.id} 
                        opportunity={opportunity} 
                        formatDeadline={formatDeadline}
                        getStatusBadge={getStatusBadge}
                      />
                    ))
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="closed">
                <div className="space-y-6">
                  {closedOpportunities.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-md p-8 text-center">
                      <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">No Closed Opportunities</h3>
                      <p className="text-gray-600 mb-4">
                        There are currently no closed funding opportunities in this category.
                        Please check open or upcoming opportunities.
                      </p>
                    </div>
                  ) : (
                    closedOpportunities.map(opportunity => (
                      <OpportunityCard 
                        key={opportunity.id} 
                        opportunity={opportunity} 
                        formatDeadline={formatDeadline}
                        getStatusBadge={getStatusBadge}
                      />
                    ))
                  )}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </section>

      {/* Featured Opportunities Section */}
      {!searchQuery && activeCategory === "all" && statusFilter === "all" && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-10 text-center">
              Highlighted Funding Opportunities
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredOpportunities.map(opportunity => (
                <Card key={opportunity.id} className="h-full flex flex-col">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{opportunity.title}</CardTitle>
                      {getStatusBadge(opportunity.status)}
                    </div>
                    <CardDescription>{opportunity.organization}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-700 mb-4">{opportunity.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-gray-500">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>Deadline: {formatDeadline(opportunity.deadline)}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <LifeBuoy className="h-4 w-4 mr-2" />
                        <span>Amount: {opportunity.amount}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                      <a href={`#opportunity-${opportunity.id}`}>View Details</a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Application Guide Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6 text-center">
            Funding Application Guide
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10">
            Follow these steps to improve your chances of securing funding for your project, 
            business, or educational needs.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Research Opportunities",
                description: "Identify funding opportunities that align with your needs and eligibility. Review all requirements and deadlines carefully.",
                icon: <Search className="h-10 w-10" />
              },
              {
                title: "Prepare Documentation",
                description: "Gather all required documents including identification, proof of residence, business plans, or academic records.",
                icon: <FileText className="h-10 w-10" />
              },
              {
                title: "Submit Application",
                description: "Complete the application form with accurate information and submit all required documents before the deadline.",
                icon: <Upload className="h-10 w-10" />
              },
              {
                title: "Follow Up",
                description: "Check application status regularly and respond promptly to any requests for additional information.",
                icon: <Clock className="h-10 w-10" />
              }
            ].map((step, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col items-center text-center"
              >
                <div className="bg-primary/10 p-4 rounded-full w-fit mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Button className="bg-primary hover:bg-primary/90" asChild>
              <Link href="/resources/public-documents">
                <Download className="h-4 w-4 mr-2" />
                Download Application Templates
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* External Funding Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-10 text-center">
            Additional Funding Resources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "National Development Fund",
                description: "Government-backed funding for large-scale development projects and community initiatives.",
                url: "https://ndf.gov.zw/",
                icon: <Building className="h-10 w-10" />
              },
              {
                title: "Zimbabwe SME Development Agency",
                description: "Support programs for small and medium enterprises including funding, mentorship, and training.",
                url: "https://smedco.co.zw/",
                icon: <Briefcase className="h-10 w-10" />
              },
              {
                title: "International NGO Partners",
                description: "Various international organizations offering grants and support for community development.",
                url: "https://nango.org.zw/partners",
                icon: <Globe className="h-10 w-10" />
              }
            ].map((resource, index) => (
              <div 
                key={index} 
                className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200 flex flex-col h-full"
              >
                <div className="bg-primary/10 p-4 rounded-full w-fit mb-4">
                  {resource.icon}
                </div>
                <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">
                  {resource.title}
                </h3>
                <p className="text-gray-600 mb-6 flex-grow">{resource.description}</p>
                <a 
                  href={resource.url}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
                >
                  <span>Visit Website</span>
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-12 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">
                Need Help with Funding Applications?
              </h2>
              <p className="text-white/90 mb-6">
                Our constituency office provides support for residents seeking funding opportunities. 
                We offer guidance on application processes, document preparation, and proposal development 
                to increase your chances of securing financial support.
              </p>
              <Button className="bg-white text-primary hover:bg-white/90" asChild>
                <Link href="/contact">Request Application Assistance</Link>
              </Button>
            </div>
            <div className="bg-primary-dark p-8 rounded-lg">
              <h3 className="text-xl font-heading font-semibold mb-4">Common Funding Questions</h3>
              <Accordion type="single" collapsible className="text-white">
                <AccordionItem value="item-1" className="border-white/20">
                  <AccordionTrigger className="hover:text-white/90">
                    What documents do I need for most funding applications?
                  </AccordionTrigger>
                  <AccordionContent className="text-white/80">
                    Most funding applications require proof of identity (National ID), proof of residence, 
                    project or business proposal, budget plan, and evidence of eligibility for the specific 
                    funding program. Additional documents may be required based on the type of funding.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-white/20">
                  <AccordionTrigger className="hover:text-white/90">
                    How long do funding applications take to process?
                  </AccordionTrigger>
                  <AccordionContent className="text-white/80">
                    Processing times vary by program, typically ranging from 2 weeks to 3 months. 
                    Larger grants and loans generally take longer to review and approve than smaller 
                    funding opportunities. Application status updates are usually provided to applicants.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border-white/20">
                  <AccordionTrigger className="hover:text-white/90">
                    What improves my chances of securing funding?
                  </AccordionTrigger>
                  <AccordionContent className="text-white/80">
                    Clear, well-documented applications with realistic budgets and well-defined objectives 
                    have higher success rates. Demonstrating community impact, sustainability, and alignment 
                    with program goals also strengthens applications. Meeting all eligibility requirements 
                    and submitting before deadlines is essential.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// Opportunity Card Component
interface OpportunityCardProps {
  opportunity: FundingOpportunity;
  formatDeadline: (date: string) => string;
  getStatusBadge: (status: 'open' | 'upcoming' | 'closed') => React.ReactNode;
}

function OpportunityCard({ opportunity, formatDeadline, getStatusBadge }: OpportunityCardProps) {
  return (
    <div 
      id={`opportunity-${opportunity.id}`} 
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h4 className="text-xl font-heading font-semibold text-gray-900">
            {opportunity.title}
          </h4>
          {getStatusBadge(opportunity.status)}
        </div>
        <p className="text-gray-600 mb-6">{opportunity.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h5 className="font-medium text-gray-900 mb-3">Details</h5>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <Users className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                <span><strong>Provider:</strong> {opportunity.organization}</span>
              </li>
              <li className="flex items-start">
                <LifeBuoy className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                <span><strong>Amount:</strong> {opportunity.amount}</span>
              </li>
              <li className="flex items-start">
                <Calendar className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                <span>
                  <strong>Deadline:</strong> {formatDeadline(opportunity.deadline)}
                  {opportunity.status === 'closed' && ' (Closed)'}
                </span>
              </li>
              <li className="flex items-start">
                <FileText className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                <span>
                  <strong>Category:</strong> {
                    opportunity.category.charAt(0).toUpperCase() + opportunity.category.slice(1)
                  }
                </span>
              </li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-medium text-gray-900 mb-3">Eligibility Requirements</h5>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {opportunity.eligibility.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {opportunity.status === 'open' && (
            <Button className="bg-primary hover:bg-primary/90" asChild>
              <a 
                href={opportunity.applicationUrl} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Apply Now
              </a>
            </Button>
          )}
          
          {opportunity.status === 'upcoming' && (
            <Button variant="outline" className="border-primary text-primary">
              Set Reminder
            </Button>
          )}
          
          <Button variant="outline">
            <EmailIcon className="h-4 w-4 mr-2" />
            Contact Provider
          </Button>
          
          <Button variant="ghost" asChild>
            <Link href="/resources/public-documents">
              <FileText className="h-4 w-4 mr-2" />
              View Required Forms
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 border-t border-gray-200">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Contact:</span> {opportunity.contactEmail} | {opportunity.contactPhone}
          </div>
          <div>
            <Button size="sm" variant="ghost" className="text-primary hover:text-primary/80" asChild>
              <Link href="/resources/faqs">
                <ChevronRight className="h-4 w-4 mr-1" />
                View Similar Opportunities
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Upload icon component
function Upload(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}

// Email icon component
function EmailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

// Globe icon component
function Globe(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}