import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  HelpCircle,
  Search,
  ChevronRight,
  MessageSquare,
  FileText,
  Mail
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function FAQsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // FAQ Categories and Questions
  const faqCategories = [
    {
      id: "general",
      title: "General Information",
      faqs: [
        {
          question: "What is Kuwadzana West Constituency?",
          answer: "Kuwadzana West is an electoral constituency located in the western part of Harare, Zimbabwe. It was established in 2000 following electoral reforms and redistricting. The constituency is represented by a Member of Parliament who advocates for the needs and interests of residents in national governance."
        },
        {
          question: "Who is our current Member of Parliament?",
          answer: "The current Member of Parliament for Kuwadzana West Constituency is Hon. Sithobekile Ndlovu. You can find more information about our MP and other constituency leaders on our Leadership Directory page."
        },
        {
          question: "Where is the Constituency Office located?",
          answer: "The Kuwadzana West Constituency Office is located on Main Road, Kuwadzana West, Harare, Zimbabwe. Our office is open Monday through Friday from 8:00 AM to 4:30 PM and on Saturdays from 9:00 AM to 12:00 PM."
        },
        {
          question: "How can I contact the Constituency Office?",
          answer: "You can contact our office by phone at +263 242 123 456, by email at contact@kuwadzanawest.gov.zw, or in person during our regular office hours. We also have a Contact Form on our website that you can use to send us inquiries."
        }
      ]
    },
    {
      id: "services",
      title: "Government Services",
      faqs: [
        {
          question: "How do I apply for a National ID card?",
          answer: "To apply for a National ID card, visit the Registrar General's Office, Kuwadzana Branch with your birth certificate, proof of residence, and passport-sized photographs. If you're replacing a lost ID, you'll also need a police report. The office is open Monday to Friday from 8:00 AM to 3:00 PM."
        },
        {
          question: "Where can I register a birth or obtain a birth certificate?",
          answer: "Birth registration and birth certificate applications are processed at the Registrar General's Office, Kuwadzana Branch. You'll need to bring the hospital birth record, parents' IDs, and complete the registration form available at the office."
        },
        {
          question: "How can I access social welfare assistance?",
          answer: "To access social welfare assistance, visit the Social Welfare Department at the District Center, East Wing, Kuwadzana West. Eligibility is based on household income, number of dependents, and other factors. Bring proof of identity, residence, and income status for assessment."
        },
        {
          question: "What services are available for senior citizens?",
          answer: "Senior citizens can access various services including pension assistance, healthcare subsidies, and community support programs. The Elderly Care Unit at the Social Welfare Department provides comprehensive assistance and can help seniors navigate available benefits."
        }
      ]
    },
    {
      id: "development",
      title: "Constituency Development",
      faqs: [
        {
          question: "How are development projects selected for implementation?",
          answer: "Development projects are selected through a consultative process involving community needs assessments, public consultations, and alignment with the constituency's strategic development plan. Priority is given to projects that address critical infrastructure needs and benefit the largest number of residents."
        },
        {
          question: "How is the Constituency Development Fund (CDF) used?",
          answer: "The Constituency Development Fund (CDF) is allocated to projects across various sectors including education, healthcare, infrastructure, and water and sanitation. The fund's use is guided by community priorities and oversight committees ensure transparent and effective utilization."
        },
        {
          question: "Can residents propose development projects?",
          answer: "Yes, residents can propose development projects through various channels including community meetings, written submissions to the Constituency Office, or through their local ward representatives. We encourage community participation in identifying development needs."
        },
        {
          question: "How can I track the progress of ongoing projects?",
          answer: "Progress updates on ongoing projects are shared through the Constituency Office, community notice boards, and our official website. Quarterly progress reports are also available in the Constituency Reports section of our website."
        }
      ]
    },
    {
      id: "participation",
      title: "Community Participation",
      faqs: [
        {
          question: "How can I get involved in community activities?",
          answer: "There are many ways to get involved including joining local community groups, attending public consultations and town hall meetings, volunteering for community initiatives, or participating in the constituency's youth and women's programs. Visit our Community Engagement page for current opportunities."
        },
        {
          question: "When and where are public meetings held?",
          answer: "Public meetings are typically held on the last Saturday of each month at the Community Center. Special meetings may be called as needed. Announcements are made through community notice boards, our website, and social media channels."
        },
        {
          question: "How can I provide feedback or suggestions to the constituency leadership?",
          answer: "Feedback and suggestions can be submitted through our online Feedback Form, in writing to the Constituency Office, or during public meetings and consultations. We value community input and use it to improve our services and initiatives."
        },
        {
          question: "Are there specific programs for youth and women?",
          answer: "Yes, we have dedicated programs for youth and women including skills development workshops, entrepreneurship support, mentorship programs, and special interest forums. Details of these programs can be found in the Community Engagement section of our website."
        }
      ]
    }
  ];

  // Filter FAQs based on search query
  const filteredFAQs = searchQuery
    ? faqCategories.map(category => ({
        ...category,
        faqs: category.faqs.filter(faq => 
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.faqs.length > 0)
    : faqCategories;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <HelpCircle className="h-16 w-16 mx-auto mb-6" />
            <h1 className="text-4xl font-heading font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-xl mb-8">
              Find answers to common questions about Kuwadzana West Constituency services,
              development initiatives, and community programs.
            </p>
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for answers..."
                className="pl-10 pr-4 py-6 text-gray-900 bg-white border-none rounded-full shadow-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-12 text-center">
            {searchQuery ? `Search Results for "${searchQuery}"` : "Common Questions & Answers"}
          </h2>

          {filteredFAQs.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-2xl mx-auto">
              <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">No Results Found</h3>
              <p className="text-gray-600 mb-4">
                We couldn't find any FAQs matching your search criteria. 
                Please try different keywords or browse all categories.
              </p>
              <Button variant="outline" onClick={() => setSearchQuery("")}>
                View All FAQs
              </Button>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              {filteredFAQs.map((category) => (
                <div key={category.id} className="mb-12">
                  <h3 className="text-2xl font-heading font-semibold text-gray-900 mb-6">
                    {category.title}
                  </h3>
                  
                  <Accordion type="single" collapsible className="bg-white rounded-lg shadow-md">
                    {category.faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`${category.id}-item-${index}`} className="border-b last:border-0">
                        <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 text-left">
                          <span className="text-gray-900 font-medium">{faq.question}</span>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6 pt-2">
                          <p className="text-gray-600">{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Topics Section */}
      {!searchQuery && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-12 text-center">
              Browse by Topic
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {faqCategories.map((category) => (
                <a 
                  key={category.id} 
                  href={`#${category.id}`}
                  className="bg-gray-50 rounded-lg p-6 border border-gray-200 transition-all hover:shadow-md"
                >
                  <h3 className="text-xl font-heading font-semibold text-gray-900 mb-3 flex items-center">
                    {category.title}
                    <ChevronRight className="ml-2 h-5 w-5 text-primary" />
                  </h3>
                  <p className="text-gray-600">
                    {category.faqs.length} frequently asked questions about {category.title.toLowerCase()}.
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Additional Support Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <MessageSquare className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-heading font-semibold text-gray-900 mb-3">
                Can't Find Your Answer?
              </h3>
              <p className="text-gray-600 mb-6">
                If you couldn't find the information you're looking for, please feel free to contact us directly.
                Our constituency office staff are ready to assist you.
              </p>
              <Button className="bg-primary hover:bg-primary/90" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-heading font-semibold text-gray-900 mb-3">
                Resource Documents
              </h3>
              <p className="text-gray-600 mb-6">
                Browse our collection of guides, forms, and informational documents to help you navigate government
                services and constituency programs.
              </p>
              <Button className="bg-primary hover:bg-primary/90" asChild>
                <Link href="/resources/public-documents">View Documents</Link>
              </Button>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-heading font-semibold text-gray-900 mb-3">
                Subscribe to Updates
              </h3>
              <p className="text-gray-600 mb-6">
                Stay informed about constituency news, events, and service updates by subscribing to our email
                newsletter.
              </p>
              <Button className="bg-primary hover:bg-primary/90">
                Subscribe Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="py-12 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">
                Help Us Improve
              </h2>
              <p className="text-white/90 mb-6">
                We're constantly working to improve the information and resources available to our community.
                Your feedback helps us identify areas where we can provide better answers and support.
              </p>
              <Button className="bg-white text-primary hover:bg-white/90" asChild>
                <Link href="/community">Submit Feedback</Link>
              </Button>
            </div>
            <div className="bg-primary-dark p-8 rounded-lg">
              <h3 className="text-xl font-heading font-semibold mb-4">Popular Questions</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#services" className="flex items-center text-white/90 hover:text-white">
                    <ChevronRight className="h-5 w-5 mr-2" />
                    <span>How do I apply for a National ID card?</span>
                  </a>
                </li>
                <li>
                  <a href="#development" className="flex items-center text-white/90 hover:text-white">
                    <ChevronRight className="h-5 w-5 mr-2" />
                    <span>How is the Constituency Development Fund used?</span>
                  </a>
                </li>
                <li>
                  <a href="#participation" className="flex items-center text-white/90 hover:text-white">
                    <ChevronRight className="h-5 w-5 mr-2" />
                    <span>How can I get involved in community activities?</span>
                  </a>
                </li>
                <li>
                  <a href="#general" className="flex items-center text-white/90 hover:text-white">
                    <ChevronRight className="h-5 w-5 mr-2" />
                    <span>Where is the Constituency Office located?</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}