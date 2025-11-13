import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BidModal from "./BidModal";

const ProjectCard = ({ project, onSubmitBid, isOwnerView }) => {
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* Bid Modal */}
      {!isOwnerView && (
        <BidModal
          project={project}
          isOpen={isBidModalOpen}
          onClose={() => setIsBidModalOpen(false)}
          onSubmitBid={onSubmitBid}
        />
      )}

      <div className="bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 overflow-hidden">
        {/* Card Header */}
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3 className="text-lg font-semibold text-slate-900 line-clamp-2">
              {project.title}
            </h3>
            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full whitespace-nowrap">
              {project.type === "web" && "Web Development"}
              {project.type === "mobile" && "Mobile Development"}
              {project.type === "design" && "Design & Creative"}
              {project.type === "writing" && "Content & Writing"}
              {project.type === "data" && "Data & Analytics"}
              {project.type === "other" && "Other"}
            </span>
          </div>

          <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Card Body */}
        <div className="p-6 space-y-4">
          {/* Skills */}
          <div>
            <p className="text-xs font-medium text-slate-500 mb-2">
              Required Skills
            </p>
            <div className="flex flex-wrap gap-2">
              {project.skills?.slice(0, 5).map((skill, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs rounded-md"
                >
                  {skill}
                </span>
              ))}
              {project.skills?.length > 5 && (
                <span className="px-2.5 py-1 bg-slate-100 text-slate-500 text-xs rounded-md">
                  +{project.skills.length - 5} more
                </span>
              )}
            </div>
          </div>

          {/* Budget + Posted Date */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">
                Budget Range
              </p>
              <p className="text-lg font-semibold text-slate-900">
                ${project.budgetMin?.toLocaleString()} - $
                {project.budgetMax?.toLocaleString()}
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs text-slate-500">
                Posted{" "}
                {new Date(project.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div className="px-6 pb-6 flex gap-3">
          <button
            onClick={() => navigate(`/projects/${project._id}`)}
            className="flex-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-medium py-2.5 px-4 rounded-lg transition-colors text-sm"
          >
            View Details
          </button>

          {/* Hide Place Bid if user owns the project */}
          {!isOwnerView && (
            <button
              onClick={() => setIsBidModalOpen(true)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Place Bid
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
