import { useState, useEffect } from "react";
import { Link } from "wouter";
import { News } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import { format } from "date-fns";
import { NewsCard } from "@/components/news/news-card";

export default function NewsPreview() {
  const { data: newsItems, isLoading, error } = useQuery<News[]>({
    queryKey: ['/api/news'],
  });

  // Take only the 3 most recent news items
  const recentNews = newsItems?.slice(0, 3) || [];

  // Format date
  const formatDate = (dateString: Date) => {
    return format(new Date(dateString), "MMMM d, yyyy");
  };

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-heading font-bold text-gray-900">News & Updates</h2>
          <Link 
            href="/news" 
            className="text-primary hover:text-primary/90 font-medium hidden md:flex items-center"
          >
            <span>View All News</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="w-full h-48 bg-gray-300 animate-pulse"></div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <div className="w-24 h-4 bg-gray-300 animate-pulse"></div>
                    <div className="w-20 h-6 bg-gray-300 animate-pulse"></div>
                  </div>
                  <div className="w-full h-6 bg-gray-300 animate-pulse mb-2"></div>
                  <div className="w-full h-4 bg-gray-300 animate-pulse mb-1"></div>
                  <div className="w-full h-4 bg-gray-300 animate-pulse mb-1"></div>
                  <div className="w-3/4 h-4 bg-gray-300 animate-pulse mb-4"></div>
                  <div className="w-28 h-4 bg-gray-300 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
            <p>Failed to load news. Please try again later.</p>
          </div>
        ) : recentNews.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 p-8 rounded-md text-center">
            <h3 className="text-xl font-heading font-semibold mb-2">No News Available</h3>
            <p className="text-gray-600 mb-4">
              Check back soon for the latest updates from Kuwadzana West Constituency.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentNews.map((newsItem) => (
              <NewsCard key={newsItem.id} news={newsItem} />
            ))}
          </div>
        )}
        
        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white" asChild>
            <Link href="/news">View All News</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
