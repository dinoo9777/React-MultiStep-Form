import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

type GridProps<T> = {
  data: T[];
  updateData: (index: number, updated: T) => void;
  deleteData: (index: number) => void;
};

function EditableGridData<T extends Record<string, any>>({
  data,
  updateData,
  deleteData,
}: GridProps<T>) {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedRow, setEditedRow] = useState<Partial<T>>({});
  const [gridData, setGridData] = useState<T[]>([]);

  useEffect(() => {
    setGridData(data);
  }, [data]);

  const keys = gridData.length > 0 ? Object.keys(gridData[0]) : [];

  const handleEditClick = (index: number) => {
    setEditIndex(index);
    setEditedRow({ ...gridData[index] });
  };

  const handleSaveClick = () => {
    if (editIndex !== null) {
      const values = Object.values(editedRow);
      if (values.some((v) => !v || (typeof v === "string" && v.trim() === ""))) {
        alert("All fields are required.");
        return;
      }

      const updatedGrid = [...gridData];
      updatedGrid[editIndex] = editedRow as T;
      setGridData(updatedGrid);
      localStorage.setItem("editableGridData", JSON.stringify(updatedGrid));
      updateData(editIndex, editedRow as T);
      setEditIndex(null);
    }
  };

  const handleDeleteClick = (index: number) => {
    const updatedGrid = [...gridData];
    updatedGrid.splice(index, 1);
    setGridData(updatedGrid);
    localStorage.setItem("editableGridData", JSON.stringify(updatedGrid));
    deleteData(index); // notify parent
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    key: string
  ) => {
    setEditedRow({ ...editedRow, [key]: e.target.value });
  };

  if (gridData.length === 0)
    return <p className="text-center text-gray-500">No data available</p>;

  return (
    <div className="overflow-auto text-left md:text-center">
      <div className="hidden md:grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2 font-semibold text-white p-2 border-b bg-customBlue">
        {keys.map((key) => (
          <div key={key} className="capitalize text-sm">
            {key.replace(/([A-Z])/g, " $1")}
          </div>
        ))}
        <div>Actions</div>
      </div>

      {gridData.map((row, index) => (
        <div
          key={index}
          className="grid md:grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-3 p-4 border-b"
        >
          {keys.map((key) => (
            <div key={key} className="flex flex-col md:flex-none">
              <label className="md:hidden text-sm font-semibold capitalize text-black mt-3 md:mt-0">
                {key.replace(/([A-Z])/g, " $1")}
              </label>
              {editIndex === index ? (
                key === "usageType" ? (
                  <select
                    value={(editedRow as any)[key] ?? ""}
                    onChange={(e) => handleChange(e, key)}
                    className="border px-3 py-2 w-full rounded text-sm"
                  >
                    <option value="">Select</option>
                    <option value="self">For myself</option>
                    <option value="team">With my team</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    value={(editedRow as any)[key] ?? ""}
                    onChange={(e) => handleChange(e, key)}
                    className="border px-3 py-2 w-full rounded text-sm"
                  />
                )
              ) : (
                <div className="text-gray-800 text-sm">{row[key]}</div>
              )}
            </div>
          ))}
          <div className="flex items-end justify-start md:justify-center space-x-2 mt-4 md:mt-0">
            {editIndex === index ? (
              <button
                onClick={handleSaveClick}
                className="bg-green-600 hover:bg-green-500 text-white py-1 px-3 rounded text-sm"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => handleEditClick(index)}
                className="bg-customBlue hover:bg-customBrightBlue text-white p-2 rounded text-sm"
              >
                <FaEdit />
              </button>
            )}
            <button
              onClick={() => handleDeleteClick(index)}
              className="bg-red-600 hover:bg-red-500 text-white p-2 rounded text-sm"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EditableGridData;
