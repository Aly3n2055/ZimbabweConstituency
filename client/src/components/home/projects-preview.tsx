import { useState } from "react";
import { Link } from "wouter";
import { Project } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar, ArrowRight } from "lucide-react";

export default function ProjectsPreview() {
  const { data: projects, isLoading, error } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  if (isLoading) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-8 text-center">Development Projects</h2>
          <div className="relative h-80 animate-pulse bg-gray-200 rounded-md"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-8 text-center">Development Projects</h2>
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
            <p>Failed to load projects. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "in progress":
        return "bg-primary text-white";
      case "planning":
        return "bg-secondary text-dark";
      case "completed":
        return "bg-accent text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-heading font-bold text-gray-900 mb-8 text-center">Development Projects</h2>
        
        {/* Project Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary"></div>
          
          {/* Projects */}
          <div className="space-y-12">
            {projects && projects.length > 0 ? (
              projects.slice(0, 3).map((project, index) => (
                <div key={project.id} className="relative flex flex-col md:flex-row md:items-center">
                  {/* Timeline Dot */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-primary border-4 border-white"></div>
                  
                  {/* Left Side (even) / Right Side (odd) */}
                  {index % 2 === 0 ? (
                    <>
                      <div className="md:w-1/2 md:pr-12 md:text-right mb-6 md:mb-0">
                        <div className="bg-gray-100 rounded-lg shadow-md p-6">
                          <span className={`inline-block px-3 py-1 text-xs font-medium rounded mb-3 ${getStatusColor(project.status)}`}>
                            {project.status}
                          </span>
                          <h3 className="text-xl font-heading font-semibold mb-2">{project.title}</h3>
                          <p className="text-gray-600 mb-4">{project.description}</p>
                          <div className="flex justify-end">
                            <span className="text-xs font-medium text-gray-500 flex items-center">
                              <Calendar size={12} className="mr-1" /> 
                              Started: {format(new Date(project.startDate), "MMM yyyy")}
                            </span>
                          </div>
                          <div className="mt-4">
                            <div className="bg-gray-300 rounded-full h-2">
                              <div 
                                className={`${project.status === "Completed" ? "bg-accent" : "bg-primary"} rounded-full h-2`}
                                style={{ width: `${project.completionPercentage}%` }}
                              ></div>
                            </div>
                            <div className="flex justify-between mt-1 text-xs text-gray-500">
                              <span>{project.completionPercentage}% Complete</span>
                              <span>
                                {project.targetDate 
                                  ? `Target: ${format(new Date(project.targetDate), "MMM yyyy")}`
                                  : "Ongoing"
                                }
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="md:w-1/2"></div>
                    </>
                  ) : (
                    <>
                      <div className="md:w-1/2"></div>
                      <div className="md:w-1/2 md:pl-12 mb-6 md:mb-0">
                        <div className="bg-gray-100 rounded-lg shadow-md p-6">
                          <span className={`inline-block px-3 py-1 text-xs font-medium rounded mb-3 ${getStatusColor(project.status)}`}>
                            {project.status}
                          </span>
                          <h3 className="text-xl font-heading font-semibold mb-2">{project.title}</h3>
                          <p className="text-gray-600 mb-4">{project.description}</p>
                          <div className="flex">
                            <span className="text-xs font-medium text-gray-500 flex items-center">
                              <Calendar size={12} className="mr-1" />
                              Started: {format(new Date(project.startDate), "MMM yyyy")}
                            </span>
                          </div>
                          <div className="mt-4">
                            <div className="bg-gray-300 rounded-full h-2">
                              <div 
                                className={`${project.status === "Completed" ? "bg-accent" : project.status === "Planning" ? "bg-secondary" : "bg-primary"} rounded-full h-2`}
                                style={{ width: `${project.completionPercentage}%` }}
                              ></div>
                            </div>
                            <div className="flex justify-between mt-1 text-xs text-gray-500">
                              <span>{project.completionPercentage}% Complete</span>
                              <span>
                                {project.targetDate 
                                  ? `Target: ${format(new Date(project.targetDate), "MMM yyyy")}`
                                  : "Ongoing"
                                }
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))
            ) : (
              <div className="bg-gray-50 border border-gray-200 p-8 rounded-md text-center">
                <h3 className="text-xl font-heading font-semibold mb-2">No Projects Available</h3>
                <p className="text-gray-600 mb-4">
                  Check back soon for updates on development projects in Kuwadzana West Constituency.
                </p>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Button className="bg-primary hover:bg-primary/90 text-white" asChild>
            <Link href="/projects">
              View All Projects
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
