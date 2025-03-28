import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Phone,
  Search,
  AlertCircle,
  Heart,
  Shield,
  Flame,
  Droplet,
  Power,
  MapPin,
  Clock,
  ExternalLink,
  Info,
  ChevronRight,
  Copy,
  Download
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

// Emergency contact interface
interface EmergencyContact {
  id: number;
  name: string;
  description: string;
  phoneNumbers: string[];
  altPhoneNumbers?: string[];
  address?: string;
  hours?: string;
  website?: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
}

// Emergency category interface
interface EmergencyCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

export default function EmergencyContactsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  // Emergency categories
  const categories: EmergencyCategory[] = [
    { 
      id: "all", 
      name: "All Contacts", 
      icon: <Phone className="h-5 w-5" />,
      description: "All emergency and essential service contacts for Kuwadzana West Constituency."
    },
    { 
      id: "medical", 
      name: "Medical", 
      icon: <Heart className="h-5 w-5" />,
      description: "Emergency medical services, hospitals, clinics, and healthcare providers."
    },
    { 
      id: "security", 
      name: "Security", 
      icon: <Shield className="h-5 w-5" />,
      description: "Police, security services, and emergency response units."
    },
    { 
      id: "fire", 
      name: "Fire & Rescue", 
      icon: <Flame className="h-5 w-5" />,
      description: "Fire department and emergency rescue services."
    },
    { 
      id: "utilities", 
      name: "Utilities", 
      icon: <Power className="h-5 w-5" />,
      description: "Electricity, water, and essential utilities emergency services."
    },
    { 
      id: "government", 
      name: "Government", 
      icon: <AlertCircle className="h-5 w-5" />,
      description: "Local government emergency response and disaster management contacts."
    }
  ];

  // Emergency contacts data
  const contacts: EmergencyContact[] = [
    {
      id: 1,
      name: "National Emergency Hotline",
      description: "Central emergency dispatch for police, fire, and medical emergencies.",
      phoneNumbers: ["999", "112"],
      category: "security",
      priority: "high"
    },
    {
      id: 2,
      name: "Kuwadzana West Police Station",
      description: "Local police station serving the Kuwadzana West Constituency.",
      phoneNumbers: ["+263 242 123 456", "+263 242 123 457"],
      altPhoneNumbers: ["+263 77 123 4567"],
      address: "12 Central Avenue, Kuwadzana West, Harare",
      hours: "24 hours",
      website: "https://police.gov.zw/stations/kuwadzana",
      category: "security",
      priority: "high"
    },
    {
      id: 3,
      name: "Kuwadzana District Hospital",
      description: "Main public hospital serving Kuwadzana West with emergency services.",
      phoneNumbers: ["+263 242 234 567", "+263 242 234 568"],
      altPhoneNumbers: ["+263 77 234 5678"],
      address: "45 Hospital Road, Kuwadzana West, Harare",
      hours: "24 hours",
      website: "https://health.gov.zw/kuwadzana-hospital",
      category: "medical",
      priority: "high"
    },
    {
      id: 4,
      name: "Fire Brigade",
      description: "Fire and rescue services for Kuwadzana West and surrounding areas.",
      phoneNumbers: ["+263 242 345 678", "993"],
      address: "78 Main Street, Kuwadzana West, Harare",
      hours: "24 hours",
      category: "fire",
      priority: "high"
    },
    {
      id: 5,
      name: "Ambulance Services",
      description: "Emergency medical transportation services.",
      phoneNumbers: ["+263 242 456 789", "994"],
      hours: "24 hours",
      category: "medical",
      priority: "high"
    },
    {
      id: 6,
      name: "ZESA Emergency (Electricity)",
      description: "Emergency response for electricity outages and electrical hazards.",
      phoneNumbers: ["+263 242 567 890", "+263 242 567 891"],
      altPhoneNumbers: ["+263 77 567 8901"],
      website: "https://zesa.co.zw/emergencies",
      category: "utilities",
      priority: "medium"
    },
    {
      id: 7,
      name: "Harare Water Services",
      description: "Water supply emergencies, burst pipes, and contamination reporting.",
      phoneNumbers: ["+263 242 678 901", "+263 242 678 902"],
      altPhoneNumbers: ["+263 77 678 9012"],
      website: "https://hararecity.co.zw/water",
      category: "utilities",
      priority: "medium"
    },
    {
      id: 8,
      name: "Kuwadzana West Health Center",
      description: "Local health center providing primary care and minor emergency services.",
      phoneNumbers: ["+263 242 789 012"],
      address: "23 Health Street, Kuwadzana West, Harare",
      hours: "Monday to Sunday: 7:00 AM - 7:00 PM",
      category: "medical",
      priority: "medium"
    },
    {
      id: 9,
      name: "Kuwadzana Private Clinic",
      description: "Private healthcare facility with emergency services.",
      phoneNumbers: ["+263 242 890 123"],
      address: "56 Park Lane, Kuwadzana West, Harare",
      hours: "24 hours",
      website: "https://kuwadzanaclinic.co.zw",
      category: "medical",
      priority: "medium"
    },
    {
      id: 10,
      name: "Road Emergency Services",
      description: "Traffic accidents, road hazards, and vehicle breakdown assistance.",
      phoneNumbers: ["+263 242 901 234", "995"],
      hours: "24 hours",
      category: "security",
      priority: "medium"
    },
    {
      id: 11,
      name: "Disaster Management Unit",
      description: "Coordination center for natural disasters and major emergencies.",
      phoneNumbers: ["+263 242 012 345"],
      address: "Government Complex, Kuwadzana West, Harare",
      website: "https://civilprotection.gov.zw",
      category: "government",
      priority: "high"
    },
    {
      id: 12,
      name: "Child Emergency Helpline",
      description: "24-hour helpline for children in distress or danger.",
      phoneNumbers: ["+263 242 123 789", "116"],
      hours: "24 hours",
      category: "security",
      priority: "high"
    },
    {
      id: 13,
      name: "Poison Control Center",
      description: "Emergency guidance for poisoning incidents.",
      phoneNumbers: ["+263 242 234 890"],
      hours: "24 hours",
      category: "medical",
      priority: "high"
    },
    {
      id: 14,
      name: "Domestic Violence Hotline",
      description: "Support and emergency response for domestic violence victims.",
      phoneNumbers: ["+263 242 345 901", "997"],
      hours: "24 hours",
      category: "security",
      priority: "high"
    },
    {
      id: 15,
      name: "Kuwadzana West Constituency Office",
      description: "Local government office for emergencies and community support.",
      phoneNumbers: ["+263 242 456 012"],
      address: "34 Government Road, Kuwadzana West, Harare",
      hours: "Monday to Friday: 8:00 AM - 4:30 PM",
      website: "https://kuwadzanawest.gov.zw",
      category: "government",
      priority: "medium"
    },
    {
      id: 16,
      name: "Gas Emergency Services",
      description: "Response for gas leaks and related emergencies.",
      phoneNumbers: ["+263 242 567 123"],
      hours: "24 hours",
      category: "utilities",
      priority: "high"
    },
    {
      id: 17,
      name: "Environmental Emergency Response",
      description: "Response for pollution, chemical spills, and environmental hazards.",
      phoneNumbers: ["+263 242 678 234"],
      website: "https://environment.gov.zw/emergencies",
      category: "government",
      priority: "medium"
    },
    {
      id: 18,
      name: "Animal Control",
      description: "Response for dangerous animals and wildlife emergencies.",
      phoneNumbers: ["+263 242 789 345"],
      hours: "Monday to Sunday: 6:00 AM - 10:00 PM",
      category: "government",
      priority: "low"
    }
  ];

  // Filter contacts based on search query and active category
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = searchQuery === "" || 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === "all" || contact.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Sort contacts by priority
  const highPriorityContacts = filteredContacts.filter(contact => contact.priority === 'high');
  const mediumPriorityContacts = filteredContacts.filter(contact => contact.priority === 'medium');
  const lowPriorityContacts = filteredContacts.filter(contact => contact.priority === 'low');

  // Copy phone number to clipboard
  const copyToClipboard = (number: string) => {
    navigator.clipboard.writeText(number)
      .then(() => {
        setCopiedNumber(number);
        setTimeout(() => setCopiedNumber(null), 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Phone className="h-16 w-16 mx-auto mb-6" />
            <h1 className="text-4xl font-heading font-bold mb-4">Emergency Contacts</h1>
            <p className="text-xl mb-8">
              Quick access to emergency services, essential contacts, and crisis support 
              for Kuwadzana West Constituency residents.
            </p>
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search emergency contacts..."
                className="pl-10 pr-4 py-6 text-gray-900 bg-white border-none rounded-full shadow-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Critical Emergency Numbers Section */}
      <section className="py-8 bg-red-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center mb-4">
            <AlertCircle className="h-6 w-6 mr-2" />
            <h2 className="text-xl font-heading font-semibold">Critical Emergency Numbers</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {contacts
              .filter(contact => contact.priority === 'high' && ['999', '112', '993', '994', '995'].some(num => contact.phoneNumbers.includes(num)))
              .map((contact) => (
                <div 
                  key={contact.id} 
                  className="bg-white bg-opacity-10 rounded-lg p-4 text-center hover:bg-opacity-20 transition-all"
                >
                  <h3 className="font-medium mb-1">{contact.name}</h3>
                  <div className="flex flex-col items-center gap-2">
                    {contact.phoneNumbers.slice(0, 2).map((number, index) => (
                      <button
                        key={index}
                        onClick={() => copyToClipboard(number)}
                        className="inline-flex items-center justify-center"
                      >
                        <span className="text-lg font-bold">{number}</span>
                        <Copy className="h-4 w-4 ml-2" />
                        {copiedNumber === number && (
                          <span className="absolute bg-black bg-opacity-75 text-white text-xs py-1 px-2 rounded mt-8">
                            Copied!
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Category Filters Section */}
      <section className="py-10 bg-white border-b">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-heading font-semibold text-gray-900 mb-8 text-center">
            Browse by Category
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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
                ? "All Emergency Contacts" 
                : categories.find(c => c.id === activeCategory)?.name}
            </h2>
            <p className="text-gray-600 max-w-3xl">
              {categories.find(c => c.id === activeCategory)?.description}
            </p>
          </div>

          {/* No Results Message */}
          {filteredContacts.length === 0 && (
            <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-2xl mx-auto">
              <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">No Contacts Found</h3>
              <p className="text-gray-600 mb-4">
                We couldn't find any emergency contacts matching your search criteria. 
                Please try different keywords or browse all categories.
              </p>
              <Button variant="outline" onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}>
                View All Contacts
              </Button>
            </div>
          )}

          {/* Contacts List */}
          {filteredContacts.length > 0 && (
            <Tabs defaultValue="high" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="high" className="text-lg py-3">
                  High Priority ({highPriorityContacts.length})
                </TabsTrigger>
                <TabsTrigger value="medium" className="text-lg py-3">
                  Medium Priority ({mediumPriorityContacts.length})
                </TabsTrigger>
                <TabsTrigger value="low" className="text-lg py-3">
                  Low Priority ({lowPriorityContacts.length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="high">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {highPriorityContacts.length === 0 ? (
                    <div className="col-span-2 bg-white rounded-lg shadow-md p-8 text-center">
                      <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">No High Priority Contacts</h3>
                      <p className="text-gray-600 mb-4">
                        There are no high priority contacts in this category.
                      </p>
                    </div>
                  ) : (
                    highPriorityContacts.map(contact => (
                      <EmergencyContactCard 
                        key={contact.id} 
                        contact={contact} 
                        copyToClipboard={copyToClipboard}
                        copiedNumber={copiedNumber}
                      />
                    ))
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="medium">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mediumPriorityContacts.length === 0 ? (
                    <div className="col-span-2 bg-white rounded-lg shadow-md p-8 text-center">
                      <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">No Medium Priority Contacts</h3>
                      <p className="text-gray-600 mb-4">
                        There are no medium priority contacts in this category.
                      </p>
                    </div>
                  ) : (
                    mediumPriorityContacts.map(contact => (
                      <EmergencyContactCard 
                        key={contact.id} 
                        contact={contact} 
                        copyToClipboard={copyToClipboard}
                        copiedNumber={copiedNumber}
                      />
                    ))
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="low">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {lowPriorityContacts.length === 0 ? (
                    <div className="col-span-2 bg-white rounded-lg shadow-md p-8 text-center">
                      <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">No Low Priority Contacts</h3>
                      <p className="text-gray-600 mb-4">
                        There are no low priority contacts in this category.
                      </p>
                    </div>
                  ) : (
                    lowPriorityContacts.map(contact => (
                      <EmergencyContactCard 
                        key={contact.id} 
                        contact={contact} 
                        copyToClipboard={copyToClipboard}
                        copiedNumber={copiedNumber}
                      />
                    ))
                  )}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </section>

      {/* Emergency Preparedness Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6 text-center">
            Emergency Preparedness
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10">
            Being prepared for emergencies can save lives. Follow these guidelines to ensure you 
            and your family are ready to respond effectively during crisis situations.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Create an Emergency Plan",
                description: "Develop a family emergency plan including evacuation routes, meeting points, and communication strategies.",
                icon: <Planning className="h-10 w-10" />
              },
              {
                title: "Emergency Kit",
                description: "Prepare a kit with water, non-perishable food, first aid supplies, medications, flashlight, and battery-powered radio.",
                icon: <FirstAid className="h-10 w-10" />
              },
              {
                title: "Stay Informed",
                description: "Keep updated on potential emergencies through radio, television, and official government channels.",
                icon: <Radio className="h-10 w-10" />
              },
              {
                title: "Learn Basic Skills",
                description: "Learn first aid, CPR, and basic emergency response skills through community training programs.",
                icon: <PatchCheck className="h-10 w-10" />
              }
            ].map((tip, index) => (
              <div 
                key={index} 
                className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200 flex flex-col items-center text-center"
              >
                <div className="bg-primary/10 p-4 rounded-full w-fit mb-4">
                  {tip.icon}
                </div>
                <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">
                  {tip.title}
                </h3>
                <p className="text-gray-600">{tip.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Button className="bg-primary hover:bg-primary/90" asChild>
              <Link href="/resources/public-documents">
                Download Emergency Guide
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Emergency FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-10 text-center">
            Common Emergency Questions
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1" className="bg-white mb-4 rounded-lg shadow-sm">
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
                  <span className="text-gray-900">When should I call emergency services vs. non-emergency numbers?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-gray-600">
                    Call emergency services (999 or 112) when there is immediate danger to life, property, or when a crime is in progress. 
                    This includes medical emergencies, fires, accidents with injuries, or ongoing criminal activity. 
                    Use non-emergency numbers for situations that don't require immediate response such as noise complaints, 
                    reporting past crimes with no suspects present, or general inquiries.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="bg-white mb-4 rounded-lg shadow-sm">
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
                  <span className="text-gray-900">What information should I provide when calling emergency services?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-gray-600">
                    When calling emergency services, clearly provide: your exact location (address, landmarks, or GPS coordinates), 
                    the nature of the emergency, any injuries or immediate dangers, your name and callback number, 
                    and relevant details about the situation. Stay on the line until the dispatcher tells you it's okay to hang up, 
                    and follow any instructions they provide.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="bg-white mb-4 rounded-lg shadow-sm">
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
                  <span className="text-gray-900">How can I report utility emergencies like gas leaks or power outages?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-gray-600">
                    For gas leaks, evacuate the area immediately and call the Gas Emergency Services from a safe location. 
                    For power outages, contact ZESA Emergency at the numbers provided on this page. 
                    For water emergencies, call Harare Water Services. In all cases, provide your exact location, 
                    describe the problem, and follow any safety instructions given by the operator.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4" className="bg-white mb-4 rounded-lg shadow-sm">
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
                  <span className="text-gray-900">What should I do during a natural disaster or civil emergency?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-gray-600">
                    Stay calm and follow instructions from emergency officials. Tune in to local radio or television for updates. 
                    If evacuation is ordered, follow designated routes and go to official shelters. If advised to shelter in place, 
                    stay indoors, secure windows and doors, and keep emergency supplies accessible. 
                    Contact the Disaster Management Unit for guidance specific to the situation.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5" className="bg-white mb-4 rounded-lg shadow-sm">
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
                  <span className="text-gray-900">How can I assist someone having a medical emergency before help arrives?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-gray-600">
                    Call emergency services immediately. Check if the person is responsive and breathing. 
                    If trained, provide CPR if needed. Stop severe bleeding by applying direct pressure. 
                    Keep the person comfortable and reassured. Don't move them unless necessary for safety. 
                    If they're conscious, help them take any prescribed emergency medications (like asthma inhalers). 
                    Provide emergency responders with information about what happened and any medical conditions the person has.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
          <div className="mt-8 text-center">
            <Button variant="outline" className="border-primary text-primary" asChild>
              <Link href="/resources/faqs">View More FAQs</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Emergency Alert Registration Section */}
      <section className="py-12 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">
                Sign Up for Emergency Alerts
              </h2>
              <p className="text-white/90 mb-6">
                Register to receive timely notifications about emergencies, severe weather, and critical situations 
                in Kuwadzana West Constituency. Alerts can be delivered via SMS, phone call, or email.
              </p>
              <Button className="bg-white text-primary hover:bg-white/90">
                Register for Alerts
              </Button>
            </div>
            <div className="bg-primary-dark p-8 rounded-lg">
              <h3 className="text-xl font-heading font-semibold mb-4">Emergency Contacts Quick Card</h3>
              <p className="text-white/90 mb-4">
                Download and print this card containing key emergency contacts. Keep it in your wallet, 
                vehicle, and post it in your home for quick access during emergencies.
              </p>
              <div className="flex space-x-4">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  <Download className="h-4 w-4 mr-2" />
                  Print Version
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  <Download className="h-4 w-4 mr-2" />
                  Digital Version
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// Emergency Contact Card Component
interface EmergencyContactCardProps {
  contact: EmergencyContact;
  copyToClipboard: (number: string) => void;
  copiedNumber: string | null;
}

function EmergencyContactCard({ contact, copyToClipboard, copiedNumber }: EmergencyContactCardProps) {
  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'medical':
        return <Heart className="h-5 w-5 text-red-500" />;
      case 'security':
        return <Shield className="h-5 w-5 text-blue-500" />;
      case 'fire':
        return <Flame className="h-5 w-5 text-orange-500" />;
      case 'utilities':
        return <Power className="h-5 w-5 text-yellow-500" />;
      case 'government':
        return <AlertCircle className="h-5 w-5 text-purple-500" />;
      default:
        return <Phone className="h-5 w-5 text-gray-500" />;
    }
  };

  // Get priority class
  const getPriorityClass = (priority: 'high' | 'medium' | 'low') => {
    switch(priority) {
      case 'high':
        return 'border-red-500';
      case 'medium':
        return 'border-yellow-500';
      case 'low':
        return 'border-gray-500';
      default:
        return 'border-gray-200';
    }
  };

  return (
    <Card className={`h-full flex flex-col border-l-4 ${getPriorityClass(contact.priority)}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="flex items-center">
            {getCategoryIcon(contact.category)}
            <span className="ml-2">{contact.name}</span>
          </CardTitle>
        </div>
        <CardDescription>{contact.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Phone Numbers:</h4>
            <div className="space-y-2">
              {contact.phoneNumbers.map((number, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                  <span className="font-medium">{number}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => copyToClipboard(number)}
                    className="relative"
                  >
                    <Copy className="h-4 w-4" />
                    {copiedNumber === number && (
                      <span className="absolute top-full mt-1 right-0 bg-black text-white text-xs py-1 px-2 rounded">
                        Copied!
                      </span>
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </div>
          
          {contact.altPhoneNumbers && contact.altPhoneNumbers.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Alternative Numbers:</h4>
              <div className="space-y-2">
                {contact.altPhoneNumbers.map((number, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                    <span>{number}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => copyToClipboard(number)}
                      className="relative"
                    >
                      <Copy className="h-4 w-4" />
                      {copiedNumber === number && (
                        <span className="absolute top-full mt-1 right-0 bg-black text-white text-xs py-1 px-2 rounded">
                          Copied!
                        </span>
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {(contact.address || contact.hours) && (
            <div className="space-y-2 text-sm text-gray-600">
              {contact.address && (
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 mt-0.5" />
                  <span>{contact.address}</span>
                </div>
              )}
              {contact.hours && (
                <div className="flex items-start">
                  <Clock className="h-4 w-4 mr-2 mt-0.5" />
                  <span>{contact.hours}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="w-full flex flex-wrap gap-2">
          <Button className="flex-1" asChild>
            <a href={`tel:${contact.phoneNumbers[0]}`}>
              <Phone className="h-4 w-4 mr-2" />
              Call
            </a>
          </Button>
          
          {contact.website && (
            <Button variant="outline" className="flex-1" asChild>
              <a href={contact.website} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Website
              </a>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

// Custom icon components
function FirstAid(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M8 5H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3" />
      <path d="M8 5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v0H8v0Z" />
      <path d="M10 14v-3" />
      <path d="M14 14v-3" />
      <path d="M12 14v-3" />
      <path d="M12 11H9" />
      <path d="M12 11h3" />
    </svg>
  );
}

function Planning(props: React.SVGProps<SVGSVGElement>) {
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
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7 11h10" />
      <path d="M7 7h2" />
      <path d="M7 15h2" />
      <path d="M15 18v-1.5a2.5 2.5 0 0 0-5 0V18" />
    </svg>
  );
}

function Radio(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M6 9a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V9Z" />
      <path d="M7 9h10v9H7z" />
      <path d="M8 14v3" />
      <path d="M12 14v3" />
      <path d="M16 14v3" />
      <path d="M8 12v-2" />
      <path d="M16 12v-2" />
      <path d="M12 4v1" />
    </svg>
  );
}

function DownloadIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function PatchCheck(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M5.7 1.3h12.6a2.4 2.4 0 0 1 2.4 2.4v16.6a2.4 2.4 0 0 1-2.4 2.4H5.7a2.4 2.4 0 0 1-2.4-2.4V3.7a2.4 2.4 0 0 1 2.4-2.4Z" />
      <path d="m9 10 2 2 4-4" />
    </svg>
  );
}