import { useState } from "react";
import { useFormContext } from "../context/FormContext";
import { FaUser, FaUsers } from "react-icons/fa";

const usageOptions = [
    {
        forUser: "self",
        icon: <FaUser className="text-2xl mb-2 text-gray-600" />,
        title: "For myself",
        description: "Write better. Think more clearly. Stay organized.",
  },
  {
    forUser: "team",
    icon: <FaUsers className="text-2xl mb-2 text-gray-600" />,
    title: "With my team",
    description: "Wikis, docs, tasks & projects, all in one place.",
  },
];

const StepThree = () => {
    const { formData, updateFormData, nextStep, addFormData } = useFormContext();
    const [error, setError] = useState("");

  const handleOptionClick = (type:any) => {
    updateFormData({ usageType: type });
    setError("");
  };

  const handleNext = () => {
    if (!formData.usageType) {
        setError("Please select a usage type");
        return;
    }

    // ✅ Only add data when valid
    addFormData(formData);
    nextStep();
 };


  return (
    <div className="max-w-xl mx-auto bg-white p-6">
      <h2 className="text-3xl font-semibold mb-1 text-center">How are you planning to use Eden?</h2>
      <p className="text-sm text-gray-500 mb-6 text-center">
        We’ll streamline your setup experience accordingly.
      </p>
      <div className="max-w-xs mx-auto">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {usageOptions.map((option) => (
            <div
              key={option.forUser}
              onClick={() => handleOptionClick(option.forUser)}
              className={`cursor-pointer border rounded-md p-4 hover:border-blue-500 ${
                formData.usageType === option.forUser
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-300"
              }`}
            >
              {option.icon}
              <h3 className="font-semibold">{option.title}</h3>
              <p className="text-sm text-gray-500">{option.description}</p>
            </div>
          ))}
        </div>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <button
          className="w-full bg-customBlue hover:bg-customBrightBlue text-white py-2 px-4 rounded"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StepThree;