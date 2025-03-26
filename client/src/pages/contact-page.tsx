import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  
  // Initialize form
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  // Form submission handler
  function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(data);
      setIsSubmitting(false);
      setIsSuccess(true);
      form.reset();
      
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We will get back to you soon.",
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600">
            We're here to help and answer any questions you might have about Kuwadzana West Constituency.
            Feel free to reach out to us using any of the methods below.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-heading font-semibold mb-6">Send Us a Message</h2>
            
            {isSuccess ? (
              <div className="bg-green-50 border border-green-200 rounded-md p-6 text-center">
                <CheckCircle className="mx-auto text-green-500 h-12 w-12 mb-4" />
                <h3 className="text-xl font-heading font-semibold text-green-800 mb-2">
                  Message Sent Successfully!
                </h3>
                <p className="text-green-700">
                  Thank you for reaching out. We will respond to your inquiry as soon as possible.
                </p>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="your@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="+263 123 456789" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="Your message subject" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="How can we help you?" 
                            className="min-h-[150px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full md:w-auto bg-primary hover:bg-primary/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2">
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        </span>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            )}
          </div>
          
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-primary text-white rounded-lg shadow-md overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-heading font-semibold mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="mt-1 mr-3 flex-shrink-0" size={20} />
                    <div>
                      <h3 className="font-semibold mb-1">Our Address</h3>
                      <p className="text-white/90">
                        Kuwadzana West Constituency Office<br />
                        Main Road, Harare<br />
                        Zimbabwe
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="mt-1 mr-3 flex-shrink-0" size={20} />
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <p className="text-white/90">
                        +263 242 123 456<br />
                        +263 712 345 678
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="mt-1 mr-3 flex-shrink-0" size={20} />
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-white/90">
                        contact@kuwadzanawest.gov.zw<br />
                        info@kuwadzanawest.gov.zw
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="mt-1 mr-3 flex-shrink-0" size={20} />
                    <div>
                      <h3 className="font-semibold mb-1">Office Hours</h3>
                      <p className="text-white/90">
                        Monday - Friday: 8:00 AM - 4:30 PM<br />
                        Saturday: 9:00 AM - 12:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-8 bg-primary-dark mt-4">
                <h3 className="font-semibold mb-3">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full" aria-label="Facebook">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full" aria-label="Twitter">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.127 1.195A4.92 4.92 0 0011.9 7.5a13.937 13.937 0 01-10.1-5.124 4.92 4.92 0 001.523 6.57 4.923 4.923 0 01-2.23-.616 4.92 4.92 0 003.948 4.918 4.938 4.938 0 01-2.224.084 4.943 4.943 0 004.6 3.42A9.89 9.89 0 01.11 18.529a13.901 13.901 0 007.549 2.213c9.059 0 14.011-7.5 14.011-14.004 0-.213-.005-.425-.014-.636A10.007 10.007 0 0023.95 4.57"/>
                    </svg>
                  </a>
                  <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full" aria-label="Instagram">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </a>
                  <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full" aria-label="YouTube">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Map Section */}
        <div className="mt-12 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 bg-gray-100 border-b">
            <h2 className="text-2xl font-heading font-semibold">Find Us on the Map</h2>
          </div>
          <div className="aspect-video bg-gray-200 flex items-center justify-center">
            {/* Replace with actual map component or iframe */}
            <div className="text-center p-8">
              <p className="text-gray-600 mb-4">Map view will be displayed here.</p>
              <Button variant="outline">View Larger Map</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}