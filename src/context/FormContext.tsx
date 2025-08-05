import React, { createContext, useContext, useEffect, useState } from "react";

// Type for form data fields
export type UserFormData = {
  fullName: string;
  displayName: string;
  workspaceName: string;
  workspaceUrl: string;
  usageType: string;
};

// Context props including state and functions
type FormContextProps = {
  formData: UserFormData;
  formDataList: UserFormData[];
  updateFormData: (newData: Partial<UserFormData>) => void;
  addFormData: (data: UserFormData) => void;
  setFormDataList: React.Dispatch<React.SetStateAction<UserFormData[]>>; // ✅ Add this line
  goToStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  currentStep: number;
  step: number;
};

const FormContext = createContext<FormContextProps | undefined>(undefined);

// Custom hook to consume context
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
export type UserFormField = keyof UserFormData;

// Provider component
export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Create context with default undefined
  const [step, setStep] = useState<number>(1);
  const [currentStep, setCurrentStep] = useState<number>(1); // ✅ Properly inside component
  // Initialize formDataList from localStorage or empty array
  const [formDataList, setFormDataList] = useState<UserFormData[]>([]);

  const [formData, setFormData] = useState<UserFormData>({
    fullName: "",
    displayName: "",
    workspaceName: "",
    workspaceUrl: "",
    usageType: "",
  });
  useEffect(() => {
    const stored = localStorage.getItem("editableGridData");
    if (stored) {
        setFormDataList(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("editableGridData", JSON.stringify(formDataList));
  }, [formDataList]);

  const addFormData = (newData: UserFormData) => {
      setFormDataList((prevList) => [...prevList, newData]);
  };

  const updateFormData = (data: Partial<UserFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    setStep((prev) => prev + 1);
    setCurrentStep((prev) => prev + 1); // Keep in sync
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
    setCurrentStep((prev) => prev - 1);
  };

  const goToStep = (step: number) => {
    setStep(step);
    setCurrentStep(step);
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        formDataList,
        addFormData, 
        updateFormData,
        setFormDataList,
        step,
        currentStep,
        nextStep,
        prevStep,
        goToStep,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};