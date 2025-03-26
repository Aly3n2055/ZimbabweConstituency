import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertFeedbackSchema, InsertFeedback } from "@shared/schema";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, User, Mail, Phone, MessageSquare } from "lucide-react";

// Extend the feedback schema with stronger validation
const feedbackFormSchema = insertFeedbackSchema.extend({
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string().optional().refine(val => !val || /^(\+\d{1,3})?\s?\(?\d{1,4}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(val), {
    message: "Please enter a valid phone number",
  }),
});

type FeedbackFormValues = z.infer<typeof feedbackFormSchema>;

export default function FeedbackForm() {
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
    <Card>
      <CardHeader>
        <CardTitle>Send Your Feedback</CardTitle>
        <CardDescription>
          Your opinion matters! Share your thoughts, suggestions, or concerns with us.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                      <Input placeholder="Enter your full name" className="pl-10" {...field} />
                    </div>
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
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                      <Input placeholder="Enter your email address" type="email" className="pl-10" {...field} />
                    </div>
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
                  <FormLabel>Phone Number (Optional)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                      <Input placeholder="Enter your phone number" className="pl-10" {...field} />
                    </div>
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
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 text-gray-500 h-4 w-4" />
                      <Textarea 
                        placeholder="Enter your message or feedback"
                        className="min-h-[120px] pl-10"
                        {...field} 
                      />
                    </div>
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
      </CardContent>
    </Card>
  );
}
