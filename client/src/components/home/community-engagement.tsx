import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertFeedbackSchema, InsertFeedback } from "@shared/schema";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

// Extend the feedback schema with stronger validation
const feedbackFormSchema = insertFeedbackSchema.extend({
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string().optional().refine(val => !val || /^(\+\d{1,3})?\s?\(?\d{1,4}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(val), {
    message: "Please enter a valid phone number",
  }),
});

type FeedbackFormValues = z.infer<typeof feedbackFormSchema>;

// Community initiatives data
const initiatives = [
  {
    title: "Community Cleanup Campaign",
    description: "Join our monthly cleanup initiative to keep Kuwadzana West clean and beautiful.",
    link: "#"
  },
  {
    title: "Neighborhood Watch Program",
    description: "Volunteer to help keep our community safe through organized neighborhood watch groups.",
    link: "#"
  },
  {
    title: "Youth Mentorship Program",
    description: "Support the development of young people through guidance, coaching, and skills transfer.",
    link: "#"
  }
];

// Community stats data
const communityStats = [
  { value: "24", label: "Community Projects" },
  { value: "1,500+", label: "Volunteer Hours" },
  { value: "12", label: "Ongoing Initiatives" },
  { value: "3,200+", label: "Residents Engaged" }
];

export default function CommunityEngagement() {
  const { toast } = useToast();
  
  // Form setup
  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      topic: "",
      message: ""
    }
  });
  
  // Feedback submission mutation
  const feedbackMutation = useMutation({
    mutationFn: async (data: FeedbackFormValues) => {
      const res = await apiRequest("POST", "/api/feedback", data);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Feedback Submitted",
        description: "Thank you for your feedback. We will get back to you soon.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Submission Failed",
        description: error.message || "There was an error submitting your feedback. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  // Form submission handler
  const onSubmit = (data: FeedbackFormValues) => {
    feedbackMutation.mutate(data);
  };

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-heading font-bold text-gray-900 mb-2 text-center">Community Engagement</h2>
        <p className="text-gray-600 text-center mb-8">Get involved and make your voice heard in Kuwadzana West</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Feedback Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-heading font-semibold mb-4">Send Your Feedback</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
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
                        <Input placeholder="Enter your email address" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your phone number (optional)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="topic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Topic</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a topic" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="infrastructure">Infrastructure</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="security">Security</SelectItem>
                          <SelectItem value="social_welfare">Social Welfare</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter your message or feedback"
                          className="min-h-[120px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                  disabled={feedbackMutation.isPending}
                >
                  {feedbackMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Feedback"
                  )}
                </Button>
              </form>
            </Form>
          </div>
          
          {/* Community Initiatives */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-heading font-semibold mb-4">Get Involved</h3>
              <p className="text-gray-600 mb-6">
                There are many ways you can contribute to the development of Kuwadzana West Constituency. 
                Join one of our community initiatives today!
              </p>
              
              <div className="space-y-4">
                {initiatives.map((initiative, index) => (
                  <div key={index} className="border border-gray-200 rounded-md p-4">
                    <h4 className="font-heading font-medium mb-2">{initiative.title}</h4>
                    <p className="text-gray-600 text-sm mb-2">{initiative.description}</p>
                    <a href={initiative.link} className="text-primary hover:text-primary/90 text-sm font-medium flex items-center">
                      <span>Learn More</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Community Stats */}
            <div className="bg-primary text-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-heading font-semibold mb-4">Community Impact</h3>
              <div className="grid grid-cols-2 gap-4">
                {communityStats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <span className="block text-3xl font-bold mb-1">{stat.value}</span>
                    <span className="text-sm">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
