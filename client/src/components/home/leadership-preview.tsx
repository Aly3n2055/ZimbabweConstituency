import { Link } from "wouter";
import { Leader } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { LeaderCard } from "@/components/leadership/leader-card";

export default function LeadershipPreview() {
  const { data: leaders, isLoading, error } = useQuery<Leader[]>({
    queryKey: ['/api/leaders'],
  });

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-heading font-bold text-gray-900 mb-2 text-center">Leadership Directory</h2>
        <p className="text-gray-600 text-center mb-8">Meet the dedicated leaders serving Kuwadzana West Constituency</p>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="w-full h-64 bg-gray-300 animate-pulse"></div>
                <div className="p-6 space-y-3">
                  <div className="w-full h-5 bg-gray-300 animate-pulse"></div>
                  <div className="w-2/3 h-4 bg-gray-300 animate-pulse"></div>
                  <div className="w-full h-4 bg-gray-300 animate-pulse"></div>
                  <div className="w-full h-4 bg-gray-300 animate-pulse"></div>
                  <div className="w-full h-4 bg-gray-300 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
            <p>Failed to load leadership data. Please try again later.</p>
          </div>
        ) : leaders && leaders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leaders.slice(0, 3).map((leader) => (
              <LeaderCard key={leader.id} leader={leader} />
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-200 p-8 rounded-md text-center">
            <h3 className="text-xl font-heading font-semibold mb-2">No Leadership Data Available</h3>
            <p className="text-gray-600 mb-4">
              Check back soon for information about Kuwadzana West Constituency leadership.
            </p>
          </div>
        )}
        
        <div className="mt-12 text-center">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white" asChild>
            <Link href="/leadership">
              View Full Directory
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
