import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { News } from "@shared/schema";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { NewsCard } from "@/components/news/news-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Loader2, Search } from "lucide-react";

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const { data: newsItems, isLoading, error } = useQuery<News[]>({
    queryKey: ['/api/news'],
  });

  // Filter news based on search query and category
  const filteredNews = newsItems?.filter(news => {
    const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         news.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || news.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter dropdown
  const categories = newsItems ? Array.from(new Set(newsItems.map(news => news.category))) : [];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-heading font-bold text-gray-900 mb-2">News & Updates</h1>
            <p className="text-gray-600">
              Stay informed about the latest developments in Kuwadzana West Constituency
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input
                  placeholder="Search news..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="w-full md:w-48">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* News Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 p-8 rounded-lg text-center">
              <h3 className="text-xl font-heading font-semibold mb-2">Error Loading News</h3>
              <p>We encountered a problem while loading the news. Please try again later.</p>
            </div>
          ) : filteredNews && filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((newsItem) => (
                <NewsCard key={newsItem.id} news={newsItem} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg text-center">
              <h3 className="text-xl font-heading font-semibold mb-2">No News Found</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery || categoryFilter !== "all" 
                  ? "Try adjusting your search or filters to find more news."
                  : "Check back soon for the latest news and updates from Kuwadzana West."}
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
