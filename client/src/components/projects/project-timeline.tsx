import { Project } from "@shared/schema";
import { format } from "date-fns";
import { Calendar, ArrowRight } from "lucide-react";

interface ProjectTimelineProps {
  projects: Project[];
}

export default function ProjectTimeline({ projects }: ProjectTimelineProps) {
  // Sort projects by start date (oldest first)
  const sortedProjects = [...projects].sort((a, b) => {
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
  });

  // Get status color and style
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

  // Get progress bar color
  const getProgressBarColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "in progress":
        return "bg-primary";
      case "planning":
        return "bg-secondary";
      case "completed":
        return "bg-accent";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary"></div>
      
      {/* Projects */}
      <div className="space-y-12">
        {sortedProjects.map((project, index) => (
          <div key={project.id} className="relative flex flex-col md:flex-row md:items-center">
            {/* Timeline Dot */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-primary border-4 border-white"></div>
            
            {/* Left Side (even) / Right Side (odd) */}
            {index % 2 === 0 ? (
              <>
                <div className="md:w-1/2 md:pr-12 md:text-right mb-6 md:mb-0">
                  <div className="bg-white rounded-lg shadow-md p-6">
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
                          className={`${getProgressBarColor(project.status)} rounded-full h-2`}
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
                    
                    {/* Project Image */}
                    {project.imageUrl && (
                      <div className="mt-4 rounded-md overflow-hidden">
                        <img 
                          src={project.imageUrl} 
                          alt={project.title} 
                          className="w-full h-32 object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="md:w-1/2"></div>
              </>
            ) : (
              <>
                <div className="md:w-1/2"></div>
                <div className="md:w-1/2 md:pl-12 mb-6 md:mb-0">
                  <div className="bg-white rounded-lg shadow-md p-6">
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
                          className={`${getProgressBarColor(project.status)} rounded-full h-2`}
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
                    
                    {/* Project Image */}
                    {project.imageUrl && (
                      <div className="mt-4 rounded-md overflow-hidden">
                        <img 
                          src={project.imageUrl} 
                          alt={project.title} 
                          className="w-full h-32 object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
