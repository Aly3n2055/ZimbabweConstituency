import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Download,
  Filter,
  Search,
  Clock,
  Calendar,
  Users,
  GraduationCap,
  Briefcase,
  Cpu,
  Home,
  Shield,
  Leaf,
  BookOpen
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PublicDocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Document categories
  const categories = [
    { id: "all", name: "All Documents", icon: <FileText className="h-5 w-5" /> },
    { id: "policies", name: "Policy Documents", icon: <BookOpen className="h-5 w-5" /> },
    { id: "development", name: "Development Plans", icon: <Home className="h-5 w-5" /> },
    { id: "education", name: "Education", icon: <GraduationCap className="h-5 w-5" /> },
    { id: "health", name: "Health", icon: <Shield className="h-5 w-5" /> },
    { id: "business", name: "Business & Economy", icon: <Briefcase className="h-5 w-5" /> },
    { id: "environment", name: "Environment", icon: <Leaf className="h-5 w-5" /> },
    { id: "technology", name: "Technology", icon: <Cpu className="h-5 w-5" /> },
    { id: "community", name: "Community", icon: <Users className="h-5 w-5" /> }
  ];

  // Document data
  const documents = [
    {
      id: 1,
      title: "Kuwadzana West Constituency Development Strategy",
      description: "Comprehensive five-year development strategy outlining goals, initiatives, and implementation plans.",
      category: "development",
      date: "January 10, 2023",
      fileSize: "4.2 MB",
      fileType: "PDF",
      downloadUrl: "#",
      featured: true
    },
    {
      id: 2,
      title: "Community Engagement Policy",
      description: "Guidelines for community participation in decision-making processes and development initiatives.",
      category: "policies",
      date: "March 15, 2023",
      fileSize: "2.1 MB",
      fileType: "PDF",
      downloadUrl: "#",
      featured: true
    },
    {
      id: 3,
      title: "Education Improvement Plan 2023-2027",
      description: "Strategic plan for enhancing educational facilities, resources, and outcomes in the constituency.",
      category: "education",
      date: "February 22, 2023",
      fileSize: "3.5 MB",
      fileType: "PDF",
      downloadUrl: "#",
      featured: true
    },
    {
      id: 4,
      title: "Public Health Initiative Framework",
      description: "Framework for healthcare service delivery, preventive care, and health education programs.",
      category: "health",
      date: "April 8, 2023",
      fileSize: "2.8 MB",
      fileType: "PDF",
      downloadUrl: "#",
      featured: false
    },
    {
      id: 5,
      title: "Small Business Support Program Guidelines",
      description: "Guidelines for accessing business development services, financial support, and training opportunities.",
      category: "business",
      date: "May 20, 2023",
      fileSize: "1.9 MB",
      fileType: "PDF",
      downloadUrl: "#",
      featured: false
    },
    {
      id: 6,
      title: "Environmental Conservation and Sustainability Plan",
      description: "Strategies for environmental protection, green initiatives, and sustainable development practices.",
      category: "environment",
      date: "June 12, 2023",
      fileSize: "3.2 MB",
      fileType: "PDF",
      downloadUrl: "#",
      featured: false
    },
    {
      id: 7,
      title: "Digital Inclusion Strategy",
      description: "Plan for expanding digital access, technology education, and online service delivery.",
      category: "technology",
      date: "July 5, 2023",
      fileSize: "2.4 MB",
      fileType: "PDF",
      downloadUrl: "#",
      featured: false
    },
    {
      id: 8,
      title: "Youth Empowerment Framework",
      description: "Comprehensive approach to youth skill development, employment, and leadership opportunities.",
      category: "community",
      date: "August 18, 2023",
      fileSize: "2.7 MB",
      fileType: "PDF",
      downloadUrl: "#",
      featured: true
    },
    {
      id: 9,
      title: "Infrastructure Development Master Plan",
      description: "Long-term planning document for road networks, public facilities, and utility services.",
      category: "development",
      date: "September 3, 2023",
      fileSize: "5.1 MB",
      fileType: "PDF",
      downloadUrl: "#",
      featured: false
    },
    {
      id: 10,
      title: "Water and Sanitation Policy",
      description: "Policies and procedures for water service delivery, quality standards, and sanitation management.",
      category: "policies",
      date: "October 10, 2023",
      fileSize: "2.3 MB",
      fileType: "PDF",
      downloadUrl: "#",
      featured: false
    },
    {
      id: 11,
      title: "Special Education Services Framework",
      description: "Guidelines for inclusive education and support services for students with special needs.",
      category: "education",
      date: "November 15, 2023",
      fileSize: "1.8 MB",
      fileType: "PDF",
      downloadUrl: "#",
      featured: false
    },
    {
      id: 12,
      title: "Public Health Emergency Response Plan",
      description: "Strategies and protocols for responding to health emergencies and disease outbreaks.",
      category: "health",
      date: "December 1, 2023",
      fileSize: "2.5 MB",
      fileType: "PDF",
      downloadUrl: "#",
      featured: false
    },
    {
      id: 13,
      title: "Women Entrepreneurship Support Guidelines",
      description: "Specialized programs and resources for women entrepreneurs in Kuwadzana West.",
      category: "business",
      date: "January 25, 2023",
      fileSize: "1.6 MB",
      fileType: "PDF",
      downloadUrl: "#",
      featured: false
    },
    {
      id: 14,
      title: "Green Energy Adoption Plan",
      description: "Framework for transitioning to renewable energy sources in public facilities and community spaces.",
      category: "environment",
      date: "February 8, 2023",
      fileSize: "2.9 MB",
      fileType: "PDF",
      downloadUrl: "#",
      featured: false
    },
    {
      id: 15,
      title: "Public WiFi Implementation Plan",
      description: "Strategy for establishing free public WiFi zones in key community areas and public facilities.",
      category: "technology",
      date: "March 30, 2023",
      fileSize: "1.7 MB",
      fileType: "PDF",
      downloadUrl: "#",
      featured: false
    },
    {
      id: 16,
      title: "Senior Citizens Support Services Guide",
      description: "Comprehensive guide to services, programs, and benefits available to elderly residents.",
      category: "community",
      date: "April 22, 2023",
      fileSize: "2.2 MB",
      fileType: "PDF",
      downloadUrl: "#",
      featured: false
    }
  ];

  // Filter documents based on search query and category filter
  const filteredDocuments = documents.filter(document => {
    const matchesSearch = searchQuery === "" || 
      document.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      document.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || document.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  // Featured documents
  const featuredDocuments = filteredDocuments.filter(doc => doc.featured);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <FileText className="h-16 w-16 mx-auto mb-6" />
            <h1 className="text-4xl font-heading font-bold mb-4">Public Documents</h1>
            <p className="text-xl mb-8">
              Access official policy documents, development plans, forms, and publications 
              for Kuwadzana West Constituency.
            </p>
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search documents by title or description..."
                className="pl-10 pr-4 py-6 text-gray-900 bg-white border-none rounded-full shadow-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="browse" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="browse" className="text-lg py-3">Browse Documents</TabsTrigger>
              <TabsTrigger value="featured" className="text-lg py-3">Featured Documents</TabsTrigger>
            </TabsList>
            
            <TabsContent value="browse">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Categories Sidebar */}
                <div className="md:col-span-1">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-heading font-semibold text-gray-900 mb-4 flex items-center">
                      <Filter className="h-5 w-5 mr-2" />
                      Document Categories
                    </h3>
                    
                    <div className="space-y-2">
                      {categories.map(category => (
                        <button
                          key={category.id}
                          onClick={() => setCategoryFilter(category.id)}
                          className={`w-full text-left py-2 px-3 rounded-md flex items-center ${
                            categoryFilter === category.id 
                              ? 'bg-primary/10 text-primary font-medium' 
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <span className="mr-2">{category.icon}</span>
                          <span>{category.name}</span>
                          {categoryFilter === category.id && (
                            <span className="ml-auto text-xs bg-primary text-white px-2 py-0.5 rounded-full">
                              {category.id === 'all' 
                                ? documents.length 
                                : documents.filter(doc => doc.category === category.id).length}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Documents Grid */}
                <div className="md:col-span-3">
                  {filteredDocuments.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-md p-8 text-center">
                      <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">No Documents Found</h3>
                      <p className="text-gray-600 mb-4">
                        We couldn't find any documents matching your search criteria. 
                        Please try different keywords or browse all categories.
                      </p>
                      <Button variant="outline" onClick={() => {
                        setCategoryFilter("all");
                        setSearchQuery("");
                      }}>
                        View All Documents
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="mb-6 flex justify-between items-center">
                        <h2 className="text-2xl font-heading font-semibold text-gray-900">
                          {categoryFilter !== "all" 
                            ? categories.find(c => c.id === categoryFilter)?.name 
                            : "All Documents"}
                        </h2>
                        <span className="text-gray-500 text-sm">
                          Showing {filteredDocuments.length} of {documents.length} documents
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredDocuments.map(document => (
                          <Card key={document.id} className="h-full flex flex-col">
                            <CardHeader>
                              <CardTitle>{document.title}</CardTitle>
                              <CardDescription>{document.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                              <div className="space-y-3 text-sm">
                                <div className="flex items-center text-gray-500">
                                  <Calendar className="h-4 w-4 mr-2" />
                                  <span>Published: {document.date}</span>
                                </div>
                                <div className="flex items-center text-gray-500">
                                  <FileText className="h-4 w-4 mr-2" />
                                  <span>{document.fileType}, {document.fileSize}</span>
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter className="border-t pt-4">
                              <Button className="w-full bg-primary hover:bg-primary/90">
                                <Download className="h-4 w-4 mr-2" />
                                Download Document
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="featured">
              <div className="mb-6">
                <h2 className="text-2xl font-heading font-semibold text-gray-900 mb-2">
                  Featured Documents
                </h2>
                <p className="text-gray-600">
                  Key policy documents and publications that provide important information about 
                  Kuwadzana West Constituency's development plans and services.
                </p>
              </div>
              
              {featuredDocuments.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-2xl mx-auto">
                  <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">No Featured Documents Found</h3>
                  <p className="text-gray-600 mb-4">
                    There are no featured documents matching your current search criteria.
                  </p>
                  <Button variant="outline" onClick={() => {
                    setCategoryFilter("all");
                    setSearchQuery("");
                  }}>
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {featuredDocuments.map(document => (
                    <div 
                      key={document.id} 
                      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 flex flex-col md:flex-row"
                    >
                      <div className="p-6 md:w-2/3">
                        <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">
                          {document.title}
                        </h3>
                        <p className="text-gray-600 mb-4">{document.description}</p>
                        <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4 mb-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>Published: {document.date}</span>
                          </div>
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2" />
                            <span>{document.fileType}, {document.fileSize}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2" />
                            <span>Last Updated: {document.date}</span>
                          </div>
                        </div>
                        <Button className="bg-primary hover:bg-primary/90">
                          <Download className="h-4 w-4 mr-2" />
                          Download Document
                        </Button>
                      </div>
                      <div className="bg-gray-100 p-6 md:w-1/3 flex flex-col justify-center">
                        <h4 className="font-medium text-gray-900 mb-3">Related Documents</h4>
                        <ul className="space-y-2">
                          {documents
                            .filter(doc => 
                              doc.category === document.category && 
                              doc.id !== document.id
                            )
                            .slice(0, 3)
                            .map(relatedDoc => (
                              <li key={relatedDoc.id}>
                                <a 
                                  href={relatedDoc.downloadUrl}
                                  className="text-primary hover:text-primary/80 text-sm flex items-start"
                                >
                                  <FileText className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                                  <span>{relatedDoc.title}</span>
                                </a>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Key Document Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-10 text-center">
            Key Document Categories
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 flex flex-col items-center text-center">
              <BookOpen className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">
                Policy Documents
              </h3>
              <p className="text-gray-600 mb-6">
                Official policies, guidelines, and governance frameworks for constituency operations.
              </p>
              <Button 
                variant="outline" 
                className="mt-auto border-primary text-primary hover:bg-primary hover:text-white"
                onClick={() => {
                  setCategoryFilter("policies");
                  setSearchQuery("");
                }}
              >
                View Policies
              </Button>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 flex flex-col items-center text-center">
              <Home className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">
                Development Plans
              </h3>
              <p className="text-gray-600 mb-6">
                Strategic plans for infrastructure, community development, and service improvement.
              </p>
              <Button 
                variant="outline" 
                className="mt-auto border-primary text-primary hover:bg-primary hover:text-white"
                onClick={() => {
                  setCategoryFilter("development");
                  setSearchQuery("");
                }}
              >
                View Plans
              </Button>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 flex flex-col items-center text-center">
              <GraduationCap className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">
                Education Resources
              </h3>
              <p className="text-gray-600 mb-6">
                Educational improvement strategies, school resources, and learning support programs.
              </p>
              <Button 
                variant="outline" 
                className="mt-auto border-primary text-primary hover:bg-primary hover:text-white"
                onClick={() => {
                  setCategoryFilter("education");
                  setSearchQuery("");
                }}
              >
                View Resources
              </Button>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 flex flex-col items-center text-center">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">
                Community Programs
              </h3>
              <p className="text-gray-600 mb-6">
                Community engagement initiatives, youth programs, and social development frameworks.
              </p>
              <Button 
                variant="outline" 
                className="mt-auto border-primary text-primary hover:bg-primary hover:text-white"
                onClick={() => {
                  setCategoryFilter("community");
                  setSearchQuery("");
                }}
              >
                View Programs
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Document Request Section */}
      <section className="py-12 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">
                Request Specific Documents
              </h2>
              <p className="text-white/90 mb-6">
                Can't find what you're looking for? We can help you locate specific documents or 
                provide additional resources based on your requirements.
              </p>
              <Button className="bg-white text-primary hover:bg-white/90" asChild>
                <Link href="/contact">Submit Document Request</Link>
              </Button>
            </div>
            <div className="bg-primary-dark p-8 rounded-lg">
              <h3 className="text-xl font-heading font-semibold mb-4">Document Access Policy</h3>
              <p className="text-white/90 mb-4">
                Most constituency documents are available for public access in line with our commitment 
                to transparency and open governance. However, some documents may be subject to privacy 
                or confidentiality restrictions.
              </p>
              <p className="text-white/90">
                When requesting documents, please provide as much detail as possible about the specific 
                information you need. Our administrative team will process your request promptly and 
                provide guidance on document availability.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}