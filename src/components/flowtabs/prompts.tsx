import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { MdEditDocument } from "react-icons/md";

type PromptsProps = {
  onpromptsChange: (type: string | null) => void;
};

const selfprompt = "tempcontent";

const initialOptions = [
  { value: "option1", label: "Option 1", content: "This is Option 1 content." },
  { value: "option2", label: "Option 2", content: "This is Option 2 content." },
  { value: "option3", label: "Option 3", content: "This is Option 3 content." },
];
export default function Prompts({ onpromptsChange }: PromptsProps) {
  const [selectedOption, setSelectedOption] = useState<string>(""); // Radio button state
  const [customText, setCustomText] = useState<string>(selfprompt); // Toast text state
  const [selectedDropdown, setSelectedDropdown] = useState<string>(""); // Dropdown state

  const handleEditClick = () => {
    const selected = initialOptions.find(
      (opt) => opt.value === selectedDropdown
    );

    if (selected) {
      setCustomText(selected.content);
      toast(
        (t) => (
          <div className="p-4">
            <h2 className="font-semibold text-lg mb-2">{selected.label}</h2>
            <textarea
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-3"
              rows={4}
            />
            <button
              onClick={() => {
                toast.dismiss(t.id);
                alert(`Saved text for ${selected.label}: ${customText}`);
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        ),
        { duration: Infinity }
      );
    } else {
      toast.error("Please select an option from the dropdown.");
    }
  };

  const handleChange = (option: string) => {
    setSelectedOption(option);
    if (option !== "custom") {
      setSelectedDropdown(""); // Reset dropdown when not in custom mode
    }
  };

  return (
    <div className="">
      <Toaster />
      {/* Radio Buttons */}
      <div className="flex flex-col space-y-2 ">
        <label className="flex items-center cursor-pointer group">
          <div className="relative">
            <input
              type="radio"
              name="option"
              value="default"
              checked={selectedOption === "default"}
              onChange={() => handleChange("default")}
              className="sr-only"
            />
            <div className="w-5 h-5 border-2 border-violet-400 rounded-full group-hover:border-violet-600 transition-colors">
              {selectedOption === "default" && (
                <div
                  className={`
                  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                  w-3 h-3 rounded-full bg-violet-500 
                  transition-transform duration-200 ease-in-out
                `}
                ></div>
              )}
            </div>
          </div>
          <span className="pl-3 text-gray-700 capitalize">
            Default Template
          </span>
        </label>

        <label className="flex items-center cursor-pointer group">
          <div className="relative">
            <input
              type="radio"
              name="option"
              value="custom"
              checked={selectedOption === "custom"}
              onChange={() => handleChange("custom")}
              className="sr-only"
            />
            <div className="w-5 h-5 border-2 border-violet-400 rounded-full group-hover:border-violet-600 transition-colors">
              {selectedOption === "custom" && (
                <div
                  className={`
                  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                  w-3 h-3 rounded-full bg-violet-500 
                  transition-transform duration-200 ease-in-out
                `}
                ></div>
              )}
            </div>
          </div>
          <span className="pl-3 text-gray-700 capitalize">Custom Template</span>
        </label>
      </div>

      {selectedOption === "custom" && (
        <div className="pt-2 flex justify-between pb-2 space-x-2">
          <select
            value={selectedDropdown}
            onChange={(e) => setSelectedDropdown(e.target.value)}
            className="w-2/3 p-2 border border-gray-300 rounded-md"
          >
            <option value="" disabled className="">
              Select an option
            </option>
            {initialOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button
            onClick={handleEditClick}
            className="py-1 px-3 bg-violet-500 text-white rounded-full items-center text-center hover:bg-gray-800"
          >
            <MdEditDocument size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
