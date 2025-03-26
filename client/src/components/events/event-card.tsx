import { Event } from "@shared/schema";
import { format } from "date-fns";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  // Format date to display day and month
  const eventDate = new Date(event.eventDate);
  const day = format(eventDate, 'd');
  const month = format(eventDate, 'MMM');
  const year = format(eventDate, 'yyyy');
  
  // Get background color based on category
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'community meeting':
        return 'bg-primary';
      case 'health':
      case 'healthcare':
        return 'bg-accent';
      case 'education':
      case 'youth':
        return 'bg-secondary';
      default:
        return 'bg-primary';
    }
  };

  // Add to calendar functionality
  const addToCalendar = () => {
    // Implementation for adding to calendar would go here
    alert('Calendar integration to be implemented');
  };

  return (
    <div className="bg-gray-100 rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
      <div className={`${getCategoryColor(event.category)} text-white p-6 flex flex-col items-center justify-center md:w-1/4`}>
        <span className="text-3xl font-bold">{day}</span>
        <span className="uppercase text-sm tracking-wider">{month}</span>
        <span className="text-xs mt-1">{year}</span>
      </div>
      <div className="p-6 md:w-3/4">
        <h3 className="text-xl font-heading font-semibold mb-2">{event.title}</h3>
        <div className="flex items-center text-gray-600 mb-3">
          <Clock className={`mr-2 text-${getCategoryColor(event.category).replace('bg-', '')}`} size={16} />
          <span>{event.startTime} - {event.endTime}</span>
        </div>
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className={`mr-2 text-${getCategoryColor(event.category).replace('bg-', '')}`} size={16} />
          <span>{event.location}</span>
        </div>
        <p className="text-gray-600 mb-4">{event.description}</p>
        <Button 
          className={`${getCategoryColor(event.category)} hover:opacity-90 text-${
            event.category.toLowerCase() === 'education' || event.category.toLowerCase() === 'youth' ? 'dark' : 'white'
          }`}
          onClick={addToCalendar}
        >
          <Calendar className="mr-1 h-4 w-4" /> Add to Calendar
        </Button>
      </div>
    </div>
  );
}
