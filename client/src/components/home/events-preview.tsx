import { useState, useCallback, useMemo } from "react";
import { Link } from "wouter";
import { Event } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { EventCard } from "@/components/events/event-card";

export default function EventsPreview() {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const { data: events, isLoading, error } = useQuery<Event[]>({
    queryKey: ['/api/events'],
  });

  // Calendar navigation
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Get events for display on the right side (limit to 3)
  const upcomingEvents = useMemo(() => {
    if (!events) return [];
    
    const now = new Date();
    return events
      .filter(event => new Date(event.eventDate) >= now)
      .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime())
      .slice(0, 3);
  }, [events]);

  // Get days with events for the calendar
  const daysWithEvents = useMemo(() => {
    if (!events) return {};
    
    const eventDays: Record<string, { category: string }> = {};
    events.forEach(event => {
      const dateStr = format(new Date(event.eventDate), 'yyyy-MM-dd');
      eventDays[dateStr] = { category: event.category };
    });
    
    return eventDays;
  }, [events, currentDate]);

  // Generate calendar cells
  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    // Add header row with day names
    rows.push(
      <div key="header" className="grid grid-cols-7 gap-1">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((dayName, i) => (
          <div key={i} className="text-center font-medium text-xs text-gray-600 p-2">
            {dayName}
          </div>
        ))}
      </div>
    );

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const dateStr = format(day, 'yyyy-MM-dd');
        const cloneDay = day;
        const isCurrentMonth = isSameMonth(day, monthStart);
        
        days.push(
          <div
            key={i}
            className={`text-center text-sm p-2 ${
              !isCurrentMonth 
                ? 'text-gray-400' 
                : daysWithEvents[dateStr]
                  ? getCategoryStyle(daysWithEvents[dateStr].category)
                  : ''
            }`}
          >
            {isCurrentMonth ? format(day, 'd') : ''}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7 gap-1">
          {days}
        </div>
      );
      days = [];
    }

    return rows;
  }, [currentDate, daysWithEvents]);

  // Helper function to get styles based on event category
  const getCategoryStyle = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'community meeting':
        return 'bg-primary text-white rounded-full font-bold';
      case 'health':
      case 'healthcare':
        return 'bg-accent text-white rounded-full font-bold';
      case 'education':
      case 'youth':
        return 'bg-secondary text-dark rounded-full font-bold';
      default:
        return '';
    }
  };

  // Event category legend items
  const categoryLegend = [
    { color: 'bg-primary', label: 'Community Meeting' },
    { color: 'bg-accent', label: 'Health Awareness' },
    { color: 'bg-secondary', label: 'Youth Development' }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-heading font-bold text-gray-900 mb-8 text-center">Upcoming Events</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar Widget (Left Side on Desktop) */}
          <div className="lg:col-span-1 mb-8 lg:mb-0">
            <div className="bg-gray-100 rounded-lg shadow-md overflow-hidden">
              <div className="bg-primary text-white p-4 text-center flex justify-between items-center">
                <button 
                  onClick={prevMonth}
                  className="text-white hover:bg-primary/80 p-1 rounded"
                  aria-label="Previous month"
                >
                  <ChevronLeft size={20} />
                </button>
                <h3 className="text-xl font-heading font-semibold">
                  {format(currentDate, 'MMMM yyyy')}
                </h3>
                <button 
                  onClick={nextMonth}
                  className="text-white hover:bg-primary/80 p-1 rounded"
                  aria-label="Next month"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
              <div className="p-4">
                {/* Calendar Grid */}
                {calendarDays}
                
                <div className="mt-4 space-y-2">
                  {categoryLegend.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${item.color} mr-2`}></div>
                      <span className="text-sm">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 border-t border-gray-200">
                <Link 
                  href="/events"
                  className="block text-center text-primary hover:text-primary/90 font-medium"
                >
                  View Full Calendar
                </Link>
              </div>
            </div>
          </div>
          
          {/* Events List (Right Side on Desktop) */}
          <div className="lg:col-span-2">
            {isLoading ? (
              <div className="space-y-6">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="bg-gray-100 rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row animate-pulse">
                    <div className="bg-gray-300 p-6 md:w-1/4 h-24"></div>
                    <div className="p-6 md:w-3/4 space-y-3">
                      <div className="w-3/4 h-6 bg-gray-300"></div>
                      <div className="w-1/2 h-4 bg-gray-300"></div>
                      <div className="w-3/4 h-4 bg-gray-300"></div>
                      <div className="w-full h-16 bg-gray-300"></div>
                      <div className="w-40 h-8 bg-gray-300"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
                <p>Failed to load events. Please try again later.</p>
              </div>
            ) : upcomingEvents.length === 0 ? (
              <div className="bg-gray-50 border border-gray-200 p-8 rounded-md text-center">
                <h3 className="text-xl font-heading font-semibold mb-2">No Upcoming Events</h3>
                <p className="text-gray-600 mb-4">
                  Check back soon for information about upcoming events in Kuwadzana West Constituency.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {upcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
