import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import FeedbackForm from "@/components/community/feedback-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

// Community initiatives data
const initiatives = [
  {
    title: "Community Cleanup Campaign",
    description: "Our monthly cleanup initiative keeps Kuwadzana West clean and beautiful. Join us every last Saturday of the month for community cleanup activities.",
    image: "https://images.unsplash.com/photo-1560780552-ba54683cb263?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    schedule: "Last Saturday of each month, 8:00 AM - 12:00 PM",
    location: "Various locations throughout Kuwadzana West",
    coordinator: "Environmental Committee",
    contact: "+263 712 345 678"
  },
  {
    title: "Neighborhood Watch Program",
    description: "Help keep our community safe through organized neighborhood watch groups. Volunteers patrol their local areas and report suspicious activities to authorities.",
    image: "https://images.unsplash.com/photo-1582213782179-e0d4d3cce817?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    schedule: "Rotating schedules, coordinated by zone leaders",
    location: "All residential areas in Kuwadzana West",
    coordinator: "Security Committee",
    contact: "+263 773 456 789"
  },
  {
    title: "Youth Mentorship Program",
    description: "Support the development of young people through guidance, coaching, and skills transfer. Experienced professionals mentor youth in various career paths.",
    image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    schedule: "Saturdays, 2:00 PM - 4:00 PM",
    location: "Kuwadzana Community Hall",
    coordinator: "Youth Development Committee",
    contact: "+263 734 567 890"
  },
  {
    title: "Adult Literacy Program",
    description: "Free literacy classes for adults who wish to improve their reading and writing skills. Classes are conducted by volunteer teachers from the community.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    schedule: "Tuesdays and Thursdays, 5:00 PM - 7:00 PM",
    location: "Kuwadzana Primary School",
    coordinator: "Education Committee",
    contact: "+263 772 345 678"
  },
  {
    title: "Community Garden Project",
    description: "Participate in growing vegetables and fruits in community gardens. Produce is shared among participants and donated to vulnerable families.",
    image: "https://images.unsplash.com/photo-1592419349758-230ac732e617?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    schedule: "Daily maintenance, organized by garden plot",
    location: "Open spaces near Kuwadzana 4 and Kuwadzana 6",
    coordinator: "Agriculture Committee",
    contact: "+263 712 456 789"
  },
  {
    title: "Health Awareness Program",
    description: "Regular health education sessions covering various topics including disease prevention, nutrition, and mental health awareness.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    schedule: "First Sunday of each month, 10:00 AM - 12:00 PM",
    location: "Kuwadzana Polyclinic",
    coordinator: "Health Committee",
    contact: "+263 773 567 890"
  }
];

// Community stats data
const communityStats = [
  { value: "24", label: "Community Projects" },
  { value: "1,500+", label: "Volunteer Hours" },
  { value: "12", label: "Ongoing Initiatives" },
  { value: "3,200+", label: "Residents Engaged" }
];

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("initiatives");

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-heading font-bold text-gray-900 mb-2">Community Engagement</h1>
            <p className="text-gray-600">
              Get involved and make your voice heard in Kuwadzana West
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full mb-8">
              <TabsTrigger value="initiatives" className="flex-1">Community Initiatives</TabsTrigger>
              <TabsTrigger value="feedback" className="flex-1">Submit Feedback</TabsTrigger>
            </TabsList>
            
            {/* Community Initiatives Tab */}
            <TabsContent value="initiatives">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {/* Stats Cards */}
                {communityStats.map((stat, index) => (
                  <div 
                    key={index} 
                    className={`bg-white p-6 rounded-lg shadow-md text-center ${
                      index === 3 ? "md:col-span-1" : index === 0 ? "md:col-span-1" : ""
                    }`}
                  >
                    <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {initiatives.map((initiative, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{initiative.title}</CardTitle>
                      <CardDescription>Join our community initiative</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4 rounded-md overflow-hidden h-48">
                        <img 
                          src={initiative.image} 
                          alt={initiative.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-gray-600 mb-4">{initiative.description}</p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-900">Schedule:</span>
                          <span className="text-gray-600">{initiative.schedule}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-900">Location:</span>
                          <span className="text-gray-600">{initiative.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-900">Coordinator:</span>
                          <span className="text-gray-600">{initiative.coordinator}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-900">Contact:</span>
                          <span className="text-gray-600">{initiative.contact}</span>
                        </div>
                      </div>
                      
                      <a href="#" className="text-primary hover:text-primary/90 font-medium flex items-center">
                        <span>Express Interest</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Feedback Tab */}
            <TabsContent value="feedback">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <FeedbackForm />
                </div>
                
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Contact Information</CardTitle>
                      <CardDescription>Alternative ways to reach us</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">Constituency Office</h3>
                        <p className="text-gray-600">
                          Kuwadzana West Constituency Office<br />
                          Main Road, Kuwadzana 5 Shopping Center<br />
                          Harare, Zimbabwe
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">Phone</h3>
                        <p className="text-gray-600">
                          +263 242 123 456<br />
                          +263 712 345 678
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">Email</h3>
                        <p className="text-gray-600">
                          contact@kuwadzanawest.gov.zw<br />
                          feedback@kuwadzanawest.gov.zw
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">Office Hours</h3>
                        <p className="text-gray-600">
                          Monday - Friday: 8:00 AM - 4:30 PM<br />
                          Saturday: 9:00 AM - 12:00 PM
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="bg-primary text-white rounded-lg shadow-md p-6 mt-6">
                    <h3 className="text-xl font-heading font-semibold mb-4">We Value Your Input</h3>
                    <p className="mb-4">
                      Your feedback helps us improve services and address community needs. 
                      All submissions are reviewed by our team.
                    </p>
                    <p className="text-sm">
                      For urgent matters requiring immediate attention, 
                      please contact our office directly by phone.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
}
