import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";

const BidModal = ({ project, isOpen, onClose, onSubmitBid }) => {
  const { authUser } = useAuthStore();
  const [bidData, setBidData] = useState({
    amount: "",
    deliveryTime: "",
    coverLetter: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setBidData({ ...bidData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    console.log("🟢 Submit button clicked");
    console.log("👤 Auth User:", authUser);
    console.log("📋 Project:", project);
    console.log("📝 Bid Data:", bidData);

    // Validation
    if (!authUser || !authUser._id) {
      console.error("❌ No authenticated user found!");
      toast.error("You must be logged in to submit a bid");
      return;
    }

    if (!bidData.amount || !bidData.deliveryTime || !bidData.coverLetter) {
      toast.error("Please fill in all fields");
      return;
    }

    const amount = Number(bidData.amount);
    if (amount < project.budgetMin || amount > project.budgetMax) {
      toast.error(
        `Bid amount must be between $${project.budgetMin} and $${project.budgetMax}`
      );
      return;
    }

    if (bidData.coverLetter.length < 50) {
      toast.error("Cover letter must be at least 50 characters");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        projectId: project._id,
        freelancerId: authUser._id,
        amount,
        deliveryTime: Number(bidData.deliveryTime),
        proposal: bidData.coverLetter.trim(),
      };

      console.log("📤 Sending payload:", payload);
      console.log("🔧 onSubmitBid function:", onSubmitBid);
      
      if (!onSubmitBid) {
        console.error("❌ onSubmitBid is undefined!");
        toast.error("Submission function not found");
        return;
      }

      const result = await onSubmitBid(payload);
      console.log("✅ Bid submission result:", result);

      setBidData({ amount: "", deliveryTime: "", coverLetter: "" });
      onClose();
    } catch (error) {
      console.error("❌ Bid submission failed:", error);
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      toast.error(error.response?.data?.message || error.message || "Failed to submit bid");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-900">Place Your Bid</h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Project Info */}
          <div className="bg-slate-50 rounded-lg p-4">
            <h3 className="font-semibold text-slate-900 mb-2">{project.title}</h3>
            <p className="text-sm text-slate-600 mb-3 line-clamp-2">{project.description}</p>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-slate-500">
                Budget:{" "}
                <span className="font-semibold text-slate-900">
                  ${project.budgetMin?.toLocaleString()} - $
                  {project.budgetMax?.toLocaleString()}
                </span>
              </span>
            </div>
          </div>

          {/* Bid Amount */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-900">
              Your Bid Amount (USD) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-medium">
                $
              </span>
              <input
                type="number"
                name="amount"
                value={bidData.amount}
                onChange={handleChange}
                placeholder={`Between ${project.budgetMin} and ${project.budgetMax}`}
                className="w-full pl-8 pr-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none text-sm"
              />
            </div>
            <p className="text-xs text-slate-500">
              Client's budget: ${project.budgetMin?.toLocaleString()} - $
              {project.budgetMax?.toLocaleString()}
            </p>
          </div>

          {/* Delivery Time */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-900">
              Delivery Time (Days) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="deliveryTime"
              value={bidData.deliveryTime}
              onChange={handleChange}
              placeholder="e.g., 7"
              min="1"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none text-sm"
            />
            <p className="text-xs text-slate-500">
              How many days will you need to complete this project?
            </p>
          </div>

          {/* Cover Letter */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-900">
              Cover Letter <span className="text-red-500">*</span>
            </label>
            <textarea
              name="coverLetter"
              value={bidData.coverLetter}
              onChange={handleChange}
              placeholder="Explain why you're the best fit for this project..."
              className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none resize-none text-sm leading-relaxed"
              rows={6}
            ></textarea>
            <p className="text-xs text-slate-500">
              Minimum 50 characters. Be specific and professional.
            </p>
          </div>

          {/* Tips Box */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <div className="flex gap-3">
              <svg
                className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="text-sm text-blue-900">
                <p className="font-medium mb-1">Bidding Tips</p>
                <ul className="text-blue-800 space-y-1 list-disc list-inside">
                  <li>Be competitive but realistic with your pricing</li>
                  <li>Highlight your relevant experience and skills</li>
                  <li>Propose a clear timeline and deliverables</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-white border-t border-slate-200 p-6 flex gap-3">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-medium py-3 px-6 rounded-lg transition-colors text-sm disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </span>
            ) : (
              "Submit Bid"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BidModal;