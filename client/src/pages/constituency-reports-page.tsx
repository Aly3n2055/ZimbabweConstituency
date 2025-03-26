import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Download,
  Calendar,
  Filter,
  ChevronDown,
  Search,
  BarChart,
  PieChart,
  TrendingUp,
  LineChart
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ConstituencyReportsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [yearFilter, setYearFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Report data
  const reports = [
    {
      id: 1,
      title: "Annual Performance Report",
      description: "Comprehensive review of constituency achievements, challenges, and financial performance for the year.",
      year: "2023",
      category: "Annual Report",
      date: "December 15, 2023",
      fileSize: "3.2 MB",
      fileType: "PDF",
      downloadUrl: "#"
    },
    {
      id: 2,
      title: "Infrastructure Development Progress",
      description: "Detailed report on infrastructure projects including roads, water systems, and public facilities.",
      year: "2023",
      category: "Sector Report",
      date: "September 30, 2023",
      fileSize: "2.8 MB",
      fileType: "PDF",
      downloadUrl: "#"
    },
    {
      id: 3,
      title: "Education Sector Performance",
      description: "Analysis of educational outcomes, resource allocation, and improvements in school infrastructure.",
      year: "2023",
      category: "Sector Report",
      date: "August 15, 2023",
      fileSize: "2.5 MB",
      fileType: "PDF",
      downloadUrl: "#"
    },
    {
      id: 4,
      title: "Constituency Development Fund (CDF) Utilization",
      description: "Breakdown of CDF expenditure, project allocation, and beneficiary impact assessment.",
      year: "2023",
      category: "Financial Report",
      date: "July 31, 2023",
      fileSize: "1.9 MB",
      fileType: "PDF",
      downloadUrl: "#"
    },
    {
      id: 5,
      title: "Healthcare Services Improvement Report",
      description: "Evaluation of healthcare initiatives, facility upgrades, and community health programs.",
      year: "2023",
      category: "Sector Report",
      date: "May 10, 2023",
      fileSize: "2.1 MB",
      fileType: "PDF",
      downloadUrl: "#"
    },
    {
      id: 6,
      title: "Mid-Year Performance Review",
      description: "Six-month progress assessment of constituency development goals and budget execution.",
      year: "2023",
      category: "Periodic Report",
      date: "June 30, 2023",
      fileSize: "2.7 MB",
      fileType: "PDF",
      downloadUrl: "#"
    },
    {
      id: 7,
      title: "Annual Performance Report",
      description: "Comprehensive review of constituency achievements, challenges, and financial performance for the year.",
      year: "2022",
      category: "Annual Report",
      date: "December 15, 2022",
      fileSize: "3.0 MB",
      fileType: "PDF",
      downloadUrl: "#"
    },
    {
      id: 8,
      title: "Agriculture and Food Security Report",
      description: "Assessment of agricultural programs, food security initiatives, and farmer support services.",
      year: "2022",
      category: "Sector Report",
      date: "November 5, 2022",
      fileSize: "2.4 MB",
      fileType: "PDF",
      downloadUrl: "#"
    },
    {
      id: 9,
      title: "Youth Development Programs Impact Assessment",
      description: "Evaluation of youth-focused initiatives, skill development programs, and employment outcomes.",
      year: "2022",
      category: "Impact Assessment",
      date: "October 20, 2022",
      fileSize: "2.2 MB",
      fileType: "PDF",
      downloadUrl: "#"
    },
    {
      id: 10,
      title: "Water and Sanitation Projects Report",
      description: "Status update on water access improvements, sanitation facilities, and hygiene programs.",
      year: "2022",
      category: "Sector Report",
      date: "August 8, 2022",
      fileSize: "2.3 MB",
      fileType: "PDF",
      downloadUrl: "#"
    },
    {
      id: 11,
      title: "Constituency Development Fund (CDF) Utilization",
      description: "Breakdown of CDF expenditure, project allocation, and beneficiary impact assessment.",
      year: "2022",
      category: "Financial Report",
      date: "July 31, 2022",
      fileSize: "1.8 MB",
      fileType: "PDF",
      downloadUrl: "#"
    },
    {
      id: 12,
      title: "Annual Performance Report",
      description: "Comprehensive review of constituency achievements, challenges, and financial performance for the year.",
      year: "2021",
      category: "Annual Report",
      date: "December 15, 2021",
      fileSize: "2.9 MB",
      fileType: "PDF",
      downloadUrl: "#"
    }
  ];

  // Filter reports based on search query and filters
  const filteredReports = reports.filter(report => {
    const matchesSearch = searchQuery === "" || 
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesYear = yearFilter === "all" || report.year === yearFilter;
    const matchesCategory = categoryFilter === "all" || report.category === categoryFilter;
    
    return matchesSearch && matchesYear && matchesCategory;
  });

  // Extract unique years and categories for filters
  const yearsSet = new Set(reports.map(report => report.year));
  const years = Array.from(yearsSet).sort().reverse();
  
  const categoriesSet = new Set(reports.map(report => report.category));
  const categories = Array.from(categoriesSet).sort();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <FileText className="h-16 w-16 mx-auto mb-6" />
            <h1 className="text-4xl font-heading font-bold mb-4">Constituency Reports</h1>
            <p className="text-xl mb-8">
              Access official reports on constituency performance, development projects, and 
              resource allocation for transparency and accountability.
            </p>
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search reports by title or description..."
                className="pl-10 pr-4 py-6 text-gray-900 bg-white border-none rounded-full shadow-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h2 className="text-xl font-heading font-semibold text-gray-900 mb-4 md:mb-0">
              <Filter className="inline h-5 w-5 mr-2" />
              Filter Reports
            </h2>
            
            <div className="flex flex-wrap gap-4">
              <div className="w-40">
                <Select value={yearFilter} onValueChange={setYearFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    {years.map(year => (
                      <SelectItem key={year} value={year}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-48">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {(yearFilter !== "all" || categoryFilter !== "all" || searchQuery) && (
                <Button 
                  variant="outline" 
                  className="border-primary text-primary"
                  onClick={() => {
                    setYearFilter("all");
                    setCategoryFilter("all");
                    setSearchQuery("");
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Reports Table Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredReports.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-2xl mx-auto">
              <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">No Reports Found</h3>
              <p className="text-gray-600 mb-4">
                We couldn't find any reports matching your search criteria. 
                Please try different keywords or adjust your filters.
              </p>
              <Button variant="outline" onClick={() => {
                setYearFilter("all");
                setCategoryFilter("all");
                setSearchQuery("");
              }}>
                View All Reports
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-2xl font-heading font-semibold text-gray-900">
                  {filteredReports.length} {filteredReports.length === 1 ? 'Report' : 'Reports'} 
                  {yearFilter !== "all" ? ` from ${yearFilter}` : ''}
                  {categoryFilter !== "all" ? ` in ${categoryFilter}` : ''}
                </h2>
                <span className="text-gray-500 text-sm">
                  Showing {filteredReports.length} of {reports.length} reports
                </span>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[40%]">Report Title & Description</TableHead>
                        <TableHead>Year</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Date Published</TableHead>
                        <TableHead>File Details</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredReports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell className="py-4">
                            <p className="font-semibold text-gray-900">{report.title}</p>
                            <p className="text-gray-600 text-sm mt-1">{report.description}</p>
                          </TableCell>
                          <TableCell>{report.year}</TableCell>
                          <TableCell>{report.category}</TableCell>
                          <TableCell>{report.date}</TableCell>
                          <TableCell>
                            <span className="text-gray-600 text-sm">{report.fileType}, {report.fileSize}</span>
                          </TableCell>
                          <TableCell className="text-right">
                            <a
                              href={report.downloadUrl}
                              className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
                            >
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </a>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Key Insights Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-10 text-center">
            Key Performance Insights
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-heading font-semibold text-gray-900">Development Budget Allocation</h3>
                <BarChart className="h-5 w-5 text-primary" />
              </div>
              <div className="mb-4 h-40 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-gray-500">Chart Visualization</span>
              </div>
              <p className="text-gray-600 text-sm">
                Budget allocation across key development sectors including education, healthcare, infrastructure, and social welfare.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-heading font-semibold text-gray-900">Project Completion Rates</h3>
                <PieChart className="h-5 w-5 text-primary" />
              </div>
              <div className="mb-4 h-40 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-gray-500">Chart Visualization</span>
              </div>
              <p className="text-gray-600 text-sm">
                Completion status of planned development projects in the current fiscal year.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-heading font-semibold text-gray-900">Yearly Budget Trends</h3>
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div className="mb-4 h-40 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-gray-500">Chart Visualization</span>
              </div>
              <p className="text-gray-600 text-sm">
                Five-year trend analysis of constituency budget allocation and utilization patterns.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-heading font-semibold text-gray-900">Community Engagement Metrics</h3>
                <LineChart className="h-5 w-5 text-primary" />
              </div>
              <div className="mb-4 h-40 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-gray-500">Chart Visualization</span>
              </div>
              <p className="text-gray-600 text-sm">
                Participation levels in community meetings, consultations, and feedback programs.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Button className="bg-primary hover:bg-primary/90" asChild>
              <Link href="/projects">View Development Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quarterly Reports Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6 text-center">
            Latest Quarterly Reports
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10">
            Our quarterly reports provide regular updates on constituency performance, project milestones, 
            and financial management for the current fiscal year.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[4, 3, 2, 1].map((quarter) => (
              <div key={quarter} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center mb-4">
                    <Calendar className="h-8 w-8 text-primary mr-3" />
                    <h3 className="text-xl font-heading font-semibold text-gray-900">
                      Q{quarter} Report 2023
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Quarterly performance update covering key achievements, challenges, and financial summary.
                  </p>
                  <p className="text-sm text-gray-500">Published: {quarter === 4 ? 'January 15, 2024' : 
                                                                    quarter === 3 ? 'October 15, 2023' : 
                                                                    quarter === 2 ? 'July 15, 2023' : 'April 15, 2023'}</p>
                </div>
                <div className="p-4 bg-gray-50 flex justify-between items-center">
                  <span className="text-sm text-gray-600">PDF, 1.8 MB</span>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reporting Commitment Section */}
      <section className="py-12 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">
                Our Commitment to Transparency
              </h2>
              <p className="text-white/90 mb-6">
                We believe in open and transparent governance. Our regular reporting ensures that 
                constituency residents have access to accurate information about development initiatives, 
                resource allocation, and performance outcomes.
              </p>
              <p className="text-white/90 mb-6">
                All reports are made available to the public as part of our commitment to accountability 
                and inclusive governance.
              </p>
              <Button className="bg-white text-primary hover:bg-white/90" asChild>
                <Link href="/contact">Request Specific Reports</Link>
              </Button>
            </div>
            <div className="bg-primary-dark p-8 rounded-lg">
              <h3 className="text-xl font-heading font-semibold mb-6">Report Request Process</h3>
              <ol className="space-y-4">
                <li className="flex">
                  <span className="bg-primary rounded-full h-6 w-6 text-center flex-shrink-0 mr-3">1</span>
                  <p>Submit a formal request through our contact form or visit the constituency office</p>
                </li>
                <li className="flex">
                  <span className="bg-primary rounded-full h-6 w-6 text-center flex-shrink-0 mr-3">2</span>
                  <p>Provide details about the specific report or information you're seeking</p>
                </li>
                <li className="flex">
                  <span className="bg-primary rounded-full h-6 w-6 text-center flex-shrink-0 mr-3">3</span>
                  <p>Our administrative team will process your request within 7 working days</p>
                </li>
                <li className="flex">
                  <span className="bg-primary rounded-full h-6 w-6 text-center flex-shrink-0 mr-3">4</span>
                  <p>Reports will be provided electronically or in printed form as requested</p>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}