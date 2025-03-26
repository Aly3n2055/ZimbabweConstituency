import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Project } from "@shared/schema";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ProjectTimeline from "@/components/projects/project-timeline";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

export default function ProjectPage() {
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { data: projects, isLoading, error } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  // Filter projects based on status
  const filteredProjects = projects?.filter(project => {
    return statusFilter === "all" || project.status === statusFilter;
  });

  // Get project statistics
  const projectStats = {
    total: projects?.length || 0,
    inProgress: projects?.filter(p => p.status === "In Progress").length || 0,
    planning: projects?.filter(p => p.status === "Planning").length || 0,
    completed: projects?.filter(p => p.status === "Completed").length || 0,
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-heading font-bold text-gray-900 mb-2">Development Projects</h1>
            <p className="text-gray-600">
              Track the progress of infrastructure and development initiatives in Kuwadzana West
            </p>
          </div>

          {/* Project Statistics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">{projectStats.total}</div>
              <div className="text-gray-600 text-sm">Total Projects</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl font-bold text-primary mb-1">{projectStats.inProgress}</div>
              <div className="text-gray-600 text-sm">In Progress</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl font-bold text-secondary mb-1">{projectStats.planning}</div>
              <div className="text-gray-600 text-sm">Planning Phase</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl font-bold text-accent mb-1">{projectStats.completed}</div>
              <div className="text-gray-600 text-sm">Completed</div>
            </div>
          </div>

          {/* Filter */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-heading font-semibold text-gray-900">Project Timeline</h2>
              <div className="w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Projects" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Projects</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Planning">Planning</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Project Timeline */}
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 p-8 rounded-lg text-center">
              <h3 className="text-xl font-heading font-semibold mb-2">Error Loading Projects</h3>
              <p>We encountered a problem while loading the projects. Please try again later.</p>
            </div>
          ) : filteredProjects && filteredProjects.length > 0 ? (
            <ProjectTimeline projects={filteredProjects} />
          ) : (
            <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg text-center">
              <h3 className="text-xl font-heading font-semibold mb-2">No Projects Found</h3>
              <p className="text-gray-600 mb-4">
                {statusFilter !== "all" 
                  ? `There are currently no projects with "${statusFilter}" status.`
                  : "Check back soon for information about development projects in Kuwadzana West."}
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
