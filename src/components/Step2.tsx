import { useState } from "react";
import { useFormContext } from "../context/FormContext";

const StepTwo = () => {
  const { formData, updateFormData, nextStep } = useFormContext();

  const [errors, setErrors] = useState({
    workspaceName: "",
  });

  const handleNext = () => {
    const newErrors = {
      workspaceName: formData.workspaceName.trim() ? "" : "Workspace name is required",
    };

    setErrors(newErrors);

    if (!newErrors.workspaceName) {
      nextStep();
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6">
      <h2 className="text-3xl font-semibold mb-1 text-center">
        Let’s set up a home for all your work
      </h2>
      <p className="text-sm text-gray-500 mb-6 text-center">
        You can always create another workspace later.
      </p>

      <div className="max-w-xs mx-auto">
        {/* Workspace Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Workspace Name
          </label>
          <input
            type="text"
            placeholder="Workspace Name"
            value={formData.workspaceName}
            onChange={(e) =>
              updateFormData({ workspaceName: e.target.value })
            }
            className="mt-1 block w-full p-2 border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
          {errors.workspaceName && (
            <p className="text-red-500 text-sm mt-1">{errors.workspaceName}</p>
          )}
        </div>

        {/* Workspace URL */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Workspace URL <span className="text-gray-400">(optional)</span>
          </label>
          <div className="flex mt-1 rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
              www.google.com/
            </span>
            <input
              type="text"
              placeholder="workspace-url"
              value={formData.workspaceUrl}
              onChange={(e) =>
                updateFormData({ workspaceUrl: e.target.value })
              }
              className="flex-1 block w-full p-2 rounded-r-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="w-full bg-customBlue hover:bg-customBrightBlue text-white py-2 px-4 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StepTwo;
