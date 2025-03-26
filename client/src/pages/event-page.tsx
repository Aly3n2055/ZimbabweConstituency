import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Event } from "@shared/schema";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import EventCalendar from "@/components/events/event-calendar";
import { EventCard } from "@/components/events/event-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

export default function EventPage() {
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<string>("calendar");

  const { data: events, isLoading, error } = useQuery<Event[]>({
    queryKey: ['/api/events'],
  });

  // Filter events based on category
  const filteredEvents = events?.filter(event => {
    return categoryFilter === "all" || event.category === categoryFilter;
  });

  // Sort events by date (closest first)
  const sortedEvents = filteredEvents?.sort((a, b) => {
    return new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime();
  });

  // Get unique categories for filter dropdown
  const categories = events ? Array.from(new Set(events.map(event => event.category))) : [];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-heading font-bold text-gray-900 mb-2">Event Calendar</h1>
            <p className="text-gray-600">
              Discover upcoming events and activities in Kuwadzana West
            </p>
          </div>

          {/* Filters and View Toggle */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <Tabs value={viewMode} onValueChange={setViewMode} className="w-full md:w-auto">
                <TabsList>
                  <TabsTrigger value="calendar">Calendar View</TabsTrigger>
                  <TabsTrigger value="list">List View</TabsTrigger>
                </TabsList>
              </Tabs>
              
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

          {/* Events Display (Calendar or List) */}
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 p-8 rounded-lg text-center">
              <h3 className="text-xl font-heading font-semibold mb-2">Error Loading Events</h3>
              <p>We encountered a problem while loading the events. Please try again later.</p>
            </div>
          ) : events && events.length > 0 ? (
            viewMode === "calendar" ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <EventCalendar events={filteredEvents || []} />
              </div>
            ) : (
              <div className="space-y-6">
                {sortedEvents && sortedEvents.length > 0 ? (
                  sortedEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))
                ) : (
                  <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg text-center">
                    <h3 className="text-xl font-heading font-semibold mb-2">No Events Found</h3>
                    <p className="text-gray-600 mb-4">
                      {categoryFilter !== "all" 
                        ? `There are currently no events in the "${categoryFilter}" category.`
                        : "Check back soon for upcoming events in Kuwadzana West."}
                    </p>
                  </div>
                )}
              </div>
            )
          ) : (
            <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg text-center">
              <h3 className="text-xl font-heading font-semibold mb-2">No Events Available</h3>
              <p className="text-gray-600 mb-4">
                Check back soon for information about upcoming events in Kuwadzana West.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
