import { useFormContext } from "../context/FormContext";

const steps = ["Basic Info", "Workspace", "Usage", "Summary"];

const Stepper = () => {
  const { currentStep } = useFormContext();
  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100 + (currentStep == 4 ? 0 : 20);

  return (
    <div className="relative flex items-center justify-between max-w-sm mx-auto mb-10 px-4">
      {/* Connector Line */}
      <div className="absolute top-4 left-4 right-4 h-[0.5px] bg-gray-300 z-0" style={{ 
        width: "75%",
        margin: "0 auto",
      }}>
        {/* Progress Line */}
        <div
          className="h-[0.5px] bg-customBlue absolute left-0 top-0 z-10 transition-all duration-300"
          style={{ width: `calc(${progressPercentage}%)` }}
        />
      </div>

      {/* Step Circles and Labels */}
      {steps.map((label, index) => {
        const step = index + 1;
        const isCompleted = currentStep > step;
        const isActive = currentStep === step;

        return (
          <div key={label} className="relative z-20 flex flex-col items-center flex-1">
            {/* Circle */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                ${isCompleted || isActive ? "bg-customBlue text-white" : "border border-gray-300 bg-white text-gray-600"}
              `}
            >
              {step}
            </div>

            {/* Label */}
            <div className="mt-2 text-xs sm:text-sm text-center text-gray-600">{label}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
