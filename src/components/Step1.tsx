import { useCallback, useState } from "react";
import { useFormContext, type UserFormData } from "../context/FormContext";
type UserFormField = keyof UserFormData;
const StepOne = () => {
  const { formData, updateFormData, nextStep } = useFormContext();

  const [errors, setErrors] = useState({
    fullName: "",
    displayName: "",
  });

  const handleInputChange = useCallback(
    (field: "fullName" | "displayName", value: string) => {
      updateFormData({ [field]: value });
    },
    [updateFormData]
  );

  const handleNext = () => {
    const newErrors = {
      fullName: formData.fullName.trim() ? "" : "Full name is required",
      displayName: formData.displayName.trim() ? "" : "Display name is required",
    };

    setErrors(newErrors);

    if (!newErrors.fullName && !newErrors.displayName) {
      nextStep();
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6">
      <h2 className="text-3xl font-semibold mb-1 text-center">Welcome! First things First</h2>
      <p className="text-sm text-gray-500 mb-6 text-center">You can always change them later.</p>

      <div className="max-w-xs mx-auto">
        {["fullName", "displayName"].map((field) => (
          <div className="mb-4" key={field}>
            <label className="block text-sm font-medium text-gray-700">
              {field === "fullName" ? "Full Name" : "Display Name"}
            </label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              value={formData[field as UserFormField]}
              onChange={(e) => handleInputChange(field as "fullName" | "displayName", e.target.value)}
              placeholder={`Enter ${field === "fullName" ? "Full Name" : "Display Name"}`}
            />
            {errors[field as "fullName" | "displayName"] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[field as "fullName" | "displayName"]}
              </p>
            )}
          </div>
        ))}

        <button
          className="w-full bg-customBlue hover:bg-customBrightBlue text-white py-2 px-4 rounded"
          onClick={handleNext}
        >
          Create Workspace
        </button>
      </div>
    </div>
  );
};

export default StepOne;
