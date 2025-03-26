import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Leader } from "@shared/schema";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { LeaderCard } from "@/components/leadership/leader-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Loader2, Search } from "lucide-react";

export default function LeadershipPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [positionFilter, setPositionFilter] = useState<string>("all");

  const { data: leaders, isLoading, error } = useQuery<Leader[]>({
    queryKey: ['/api/leaders'],
  });

  // Filter leaders based on search query and position
  const filteredLeaders = leaders?.filter(leader => {
    const matchesSearch = leader.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (leader.biography && leader.biography.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesPosition = positionFilter === "all" || leader.position === positionFilter;
    
    return matchesSearch && matchesPosition;
  });

  // Get unique positions for filter dropdown
  const positions = leaders ? Array.from(new Set(leaders.map(leader => leader.position))) : [];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-heading font-bold text-gray-900 mb-2">Leadership Directory</h1>
            <p className="text-gray-600">
              Meet the dedicated leaders serving Kuwadzana West Constituency
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input
                  placeholder="Search leaders..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="w-full md:w-48">
                <Select value={positionFilter} onValueChange={setPositionFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Positions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Positions</SelectItem>
                    {positions.map((position) => (
                      <SelectItem key={position} value={position}>
                        {position}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Leaders Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 p-8 rounded-lg text-center">
              <h3 className="text-xl font-heading font-semibold mb-2">Error Loading Leadership Data</h3>
              <p>We encountered a problem while loading the leadership information. Please try again later.</p>
            </div>
          ) : filteredLeaders && filteredLeaders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredLeaders.map((leader) => (
                <LeaderCard key={leader.id} leader={leader} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg text-center">
              <h3 className="text-xl font-heading font-semibold mb-2">No Leaders Found</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery || positionFilter !== "all" 
                  ? "Try adjusting your search or filters to find more leaders."
                  : "Check back soon for information about Kuwadzana West leadership."}
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
