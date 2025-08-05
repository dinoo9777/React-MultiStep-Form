import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "../context/FormContext";
import type { UserFormData } from "../context/FormContext";
import { FaCheckCircle } from "react-icons/fa";
import EditableGrid from "./EditableGridData";

const StepFour = () => {
  const {
    formDataList,
    updateFormData,
    setFormDataList,
    goToStep,
  } = useFormContext();

  const [gridData, setGridData] = useState<UserFormData[]>([]);

  // Load from localStorage or context
  useEffect(() => {
    const stored = localStorage.getItem("editableGridData");
    if (stored) {
      setGridData(JSON.parse(stored));
    } else {
      setGridData(formDataList);
    }
  }, [formDataList]);

  const handleAddNew = () => {
    // Reset current form state before going to step 1
    updateFormData({
      fullName: "",
      displayName: "",
      workspaceName: "",
      workspaceUrl: "",
      usageType: "",
    });
    goToStep(1);
  };

  const handleUpdateData = useCallback((index: number, updated: UserFormData) => {
    const updatedRows = [...gridData];
    updatedRows[index] = updated;
    // Update both context and local state
    setGridData(updatedRows);
    setFormDataList(updatedRows);
    localStorage.setItem("editableGridData", JSON.stringify(updatedRows));
  }, [gridData]);

  const handleDelete = (indexToDelete: number) => {
    if (!confirm("Are you sure you want to delete this record?")) return;
    const updated = [...formDataList];
    updated.splice(indexToDelete, 1); // remove the item
    setFormDataList(updated); // update context
    localStorage.setItem("editableGridData", JSON.stringify(updated)); // persist
  };

  return (
    <div className="bg-white p-6 text-center">
      {gridData.length > 0 && (
        <>
        <FaCheckCircle className="text-green-500 text-4xl mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">
            Congratulations, {formDataList.at(-1)?.fullName || "User"}!
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            You have completed the onboarding.
          </p>
        </>
      )}

      <button
        onClick={handleAddNew}
        className="bg-customBlue hover:bg-customBrightBlue text-white px-4 py-2 rounded transition mb-4"
      >
        + Add New Record
      </button>
      {
        gridData.length > 0 && (
          <EditableGrid data={gridData} 
          updateData={handleUpdateData} 
          deleteData={handleDelete}
          />
        )
      }
    </div>
  );
};

export default StepFour;
