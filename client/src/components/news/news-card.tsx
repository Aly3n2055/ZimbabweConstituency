import { Link } from "wouter";
import { News } from "@shared/schema";
import { format } from "date-fns";
import { Calendar, ArrowRight } from "lucide-react";

export interface NewsCardProps {
  news: News;
  showFullContent?: boolean;
}

export function NewsCard({ news, showFullContent = false }: NewsCardProps) {
  // Format date
  const formatDate = (dateString: Date) => {
    return format(new Date(dateString), "MMMM d, yyyy");
  };

  // Default image if none provided
  const imageUrl = news.imageUrl || "https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?q=80&w=1974&auto=format&fit=crop";

  // Category badge color
  const getBadgeColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "infrastructure":
        return "bg-primary text-white";
      case "healthcare":
      case "health":
        return "bg-accent text-white";
      case "education":
        return "bg-secondary text-dark";
      default:
        return "bg-primary text-white";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={imageUrl} alt={news.title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-medium text-gray-500 flex items-center">
            <Calendar size={14} className="mr-1" />
            {formatDate(news.createdAt)}
          </span>
          <span className={`text-xs font-medium px-2 py-1 rounded ${getBadgeColor(news.category)}`}>
            {news.category}
          </span>
        </div>
        <h3 className="text-xl font-heading font-semibold mb-2">{news.title}</h3>
        <p className={`text-gray-600 mb-4 ${showFullContent ? '' : 'line-clamp-3'}`}>
          {showFullContent ? news.content : news.summary}
        </p>
        {!showFullContent && (
          <Link 
            href={`/news/${news.id}`}
            className="text-primary hover:text-primary/90 font-medium flex items-center"
          >
            <span>Read More</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
