import { useEffect, useState } from "react";
import { useProjectStore } from "../store/useProjectStore";
import ProjectCard from "../components/ProjectCard";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";

const ProjectListPage = () => {
  const { projects, getProjects, createProject, createBid, isLoading } =
    useProjectStore();
  const { authUser } = useAuthStore(); // Logged-in user
  const [selectedType, setSelectedType] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showMyProjects, setShowMyProjects] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skills: "",
    budgetMin: "",
    budgetMax: "",
    type: "web",
  });

  useEffect(() => {
    getProjects(selectedType);
  }, [selectedType]);

  const handleFilterChange = (type) => setSelectedType(type);

  const handleSubmitBid = async (bidData) => {
    try {
      await createBid(bidData);
    } catch (error) {
      console.error("Error in handleSubmitBid:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateProject = async () => {
    if (
      !formData.title ||
      !formData.description ||
      !formData.skills ||
      !formData.budgetMin ||
      !formData.budgetMax ||
      !formData.type
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    if (Number(formData.budgetMin) >= Number(formData.budgetMax)) {
      toast.error("Maximum budget must be greater than minimum budget");
      return;
    }

    const projectData = {
      ...formData,
      skills: formData.skills.split(",").map((s) => s.trim()).filter(Boolean),
      budgetMin: Number(formData.budgetMin),
      budgetMax: Number(formData.budgetMax),
    };

    await createProject(projectData);
    await getProjects(selectedType);

    setFormData({
      title: "",
      description: "",
      skills: "",
      budgetMin: "",
      budgetMax: "",
      type: "web",
    });
    setShowCreateModal(false);
  };

  const visibleProjects = projects.filter((p) => {
    const creatorId = String(p.createdBy?._id || p.createdBy || "");
    const userId = String(authUser?._id || "");
    return showMyProjects ? creatorId === userId : creatorId !== userId;
  });

  return (
    <div className="min-h-screen bg-white text-gray-900 px-6 md:px-16 py-16 font-sans">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-gray-300 pb-6 mb-12 gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight uppercase">
            {showMyProjects ? "My Projects" : "Projects"}
          </h1>
          <p className="text-gray-500 mt-2 text-sm uppercase tracking-wider">
            {showMyProjects
              ? "Manage the projects you created"
              : "Discover opportunities that match your skills"}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setShowMyProjects(!showMyProjects)}
            className={`border px-6 py-2.5 rounded-md text-sm font-semibold uppercase transition-all ${
              showMyProjects
                ? "bg-[#75A5FF] text-white border-[#75A5FF]"
                : "border-gray-300 text-gray-800 hover:bg-gray-100"
            }`}
          >
            {showMyProjects ? "All Projects" : "My Projects"}
          </button>

          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-[#75A5FF] hover:bg-[#6593eb] text-white px-6 py-2.5 rounded-md text-sm font-semibold tracking-wide uppercase transition-all"
          >
            + Create Project
          </button>
        </div>
      </div>

      {/* FILTER BAR */}
      {!showMyProjects && (
        <div className="border border-gray-300 rounded-lg mb-12">
          <div className="flex flex-wrap gap-3 px-6 py-4">
            {[
              { key: "", label: "All" },
              { key: "web", label: "Web" },
              { key: "mobile", label: "Mobile" },
              { key: "design", label: "Design" },
              { key: "writing", label: "Writing" },
              { key: "data", label: "Data" },
              { key: "other", label: "Other" },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => handleFilterChange(f.key)}
                className={`px-5 py-2 border text-sm font-semibold uppercase transition-all ${
                  selectedType === f.key
                    ? "bg-[#75A5FF] text-white border-[#75A5FF]"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* PROJECT GRID */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin h-10 w-10 border-4 border-[#75A5FF] border-t-transparent rounded-full"></div>
        </div>
      ) : visibleProjects.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {visibleProjects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                onSubmitBid={handleSubmitBid}
                isOwnerView={showMyProjects} // ✅ important
              />
            ))}
          </div>
        </>
      ) : (
        <div className="border border-gray-300 rounded-lg py-20 text-center">
          <h2 className="text-2xl font-bold uppercase tracking-wide">
            No {showMyProjects ? "Your" : ""} Projects Found
          </h2>
          <p className="text-gray-500 text-sm mt-3 uppercase tracking-wider">
            {showMyProjects
              ? "You haven’t created any projects yet"
              : "Try a different category or create one yourself"}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProjectListPage;
