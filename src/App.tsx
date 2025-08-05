import Stepper from "./components/Stepper";
import StepOne from "./components/Step1";
import StepTwo from "./components/Step2";
import StepThree from "./components/Step3";
import StepFour from "./components/Step4";
import { useFormContext } from "./context/FormContext";

const App = () => {
  const { currentStep } = useFormContext();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      {/* Outer White Panel - 85% width */}
      <div className="w-[90%] bg-white rounded-xl shadow-xl py-10 px-4 sm:px-10">
        {/* Inner Centered Content - Small Form */}
        <div className="">
          {/* Stepper */}
          <div className="mb-10">
            <Stepper />
          </div>

          {/* Step Form */}
          <div>
            {currentStep === 1 && <StepOne />}
            {currentStep === 2 && <StepTwo />}
            {currentStep === 3 && <StepThree />}
            {currentStep === 4 && <StepFour />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
