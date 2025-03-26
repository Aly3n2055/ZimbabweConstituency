import { useState, useEffect } from "react";
import { Event } from "@shared/schema";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays, parseISO } from "date-fns";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/events/event-card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface EventCalendarProps {
  events: Event[];
}

export default function EventCalendar({ events }: EventCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);

  // Navigation functions
  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  // Map of dates with events
  const eventsByDate = events.reduce((acc: Record<string, Event[]>, event) => {
    const dateStr = format(new Date(event.eventDate), 'yyyy-MM-dd');
    if (!acc[dateStr]) {
      acc[dateStr] = [];
    }
    acc[dateStr].push(event);
    return acc;
  }, {});

  // Update selected events when date changes
  useEffect(() => {
    if (selectedDate) {
      const dateStr = format(selectedDate, 'yyyy-MM-dd');
      setSelectedEvents(eventsByDate[dateStr] || []);
    } else {
      setSelectedEvents([]);
    }
  }, [selectedDate, events]);

  // Helper function to get class for event category indicators
  const getCategoryClass = (category: string) => {
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

  // Generate calendar
  const renderCalendar = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    // Add header row with day names
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const header = dayNames.map((dayName, i) => (
      <div key={i} className="text-center font-medium p-2 text-gray-600">
        {dayName}
      </div>
    ));
    rows.push(<div key="header" className="grid grid-cols-7">{header}</div>);

    // Generate calendar days
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'yyyy-MM-dd');
        const dayEvents = eventsByDate[formattedDate] || [];
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isToday = isSameDay(day, new Date());
        const isSelected = selectedDate && isSameDay(day, selectedDate);
        
        days.push(
          <div
            key={formattedDate}
            className={`relative border border-gray-200 min-h-[70px] hover:bg-gray-50 cursor-pointer transition-colors ${
              !isCurrentMonth ? 'text-gray-400 bg-gray-50' : ''
            } ${isToday ? 'border-primary' : ''} ${isSelected ? 'bg-primary/10' : ''}`}
            onClick={() => setSelectedDate(day)}
          >
            <div className="p-1">
              <span className={`text-sm ${isToday ? 'font-bold' : ''}`}>
                {format(day, 'd')}
              </span>
            </div>
            
            {/* Event indicators */}
            {dayEvents.length > 0 && (
              <div className="absolute bottom-1 left-1 right-1 flex flex-wrap gap-1">
                {dayEvents.slice(0, 3).map((event, idx) => (
                  <div 
                    key={idx}
                    className={`${getCategoryClass(event.category)} h-2 w-2 rounded-full`}
                    title={event.title}
                  ></div>
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-xs text-gray-500">+{dayEvents.length - 3}</div>
                )}
              </div>
            )}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7">
          {days}
        </div>
      );
      days = [];
    }

    return rows;
  };

  // Category legend items
  const categoryLegend = [
    { color: 'bg-primary', label: 'Community Meeting' },
    { color: 'bg-accent', label: 'Health Awareness' },
    { color: 'bg-secondary', label: 'Youth Development' }
  ];

  return (
    <div>
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-4">
        <Button 
          variant="outline" 
          onClick={prevMonth}
          size="icon"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-heading font-semibold">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <Button 
          variant="outline" 
          onClick={nextMonth}
          size="icon"
          aria-label="Next month"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Calendar Grid */}
      <div className="mb-6">
        {renderCalendar()}
      </div>
      
      {/* Category Legend */}
      <div className="flex flex-wrap gap-4 mb-6">
        {categoryLegend.map((item, index) => (
          <div key={index} className="flex items-center">
            <div className={`w-3 h-3 rounded-full ${item.color} mr-2`}></div>
            <span className="text-sm text-gray-600">{item.label}</span>
          </div>
        ))}
      </div>
      
      {/* Selected Day Events */}
      {selectedDate && (
        <div className="mt-6 border-t border-gray-200 pt-6">
          <h3 className="text-lg font-heading font-semibold mb-4">
            Events on {format(selectedDate, 'MMMM d, yyyy')}
          </h3>
          
          {selectedEvents.length > 0 ? (
            <div className="space-y-4">
              {selectedEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-gray-600 p-4 bg-gray-50 rounded-md text-center">
              No events scheduled for this day.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
