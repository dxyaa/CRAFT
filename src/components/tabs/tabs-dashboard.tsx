import { useState } from "react";
import { Poppins } from "next/font/google";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import Link from "next/link";

const pops = Poppins({
  weight: "500",
  subsets: ["latin"],
});
const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div className="w-screen p-10 h-full ">
      <div className="flex space-x-4 border-b border-gray-200 mb-4 ">
        <button
          className={`px-4 py-2 text-md transition ${
            activeTab === 0
              ? "text-black border-b-2 border-black font-semibold"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab(0)}
        >
          Recent
        </button>
        <button
          className={`px-4 py-2 text-md transition ${
            activeTab === 1
              ? "text-black border-b-2 border-black font-semibold"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab(1)}
        >
          For You
        </button>
        <button
          className={`px-4 py-2 text-md transition ${
            activeTab === 2
              ? "text-black border-b-2 border-black font-semibold"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab(2)}
        >
          All
        </button>
      </div>

      <div className="h-5/6 rounded-lg">
        {activeTab === 0 && (
          <div className="h-full flex flex-col md:flex-row md:space-y-0 md:space-x-3 space-x-0 space-y-4 justify-between">
            <div className="md:w-1/3 w-full bg-violet-100  rounded-lg flex flex-col md:space-y-0 space-y-4 justify-between p-6">
              <div className="flex flex-col">
                <div className="flex flex-row justify-between">
                  <div className="md:text-sm text-xs text-neutral-600">
                    26th September 2024
                  </div>
                  <button className="rounded-lg bg-neutral-100 hover:bg-red-200 md:p-2 p-1">
                    <MdDelete className="hidden md:block" size={20} />
                    <MdDelete className="block md:hidden" size={14} />
                  </button>
                </div>
                <div className="md:text-4xl text-xl font-semibold">
                  <h1 className={pops.className}>Self reflection RAG</h1>
                </div>
                <button className="mt-2 border-2 rounded-full p-2 border-black md:h-6 h-4 w-1/6 text-sm text-center items-center flex justify-center">
                  <div>
                    <FaLock className="block md:hidden" size={10} />
                    <FaLock className="hidden md:block" size={16} />
                  </div>
                </button>
              </div>
              <div className="">
                <Link href="/Flow">
                  {" "}
                  <button className="flex flex-row justify-between w-full bg-violet-300 md:p-3 p-1 rounded-full hover:bg-violet-200">
                    <div className="md:text-md text-sm font-semibold pl-4">
                      Edit
                    </div>
                    <div className="pr-4">
                      <MdEdit size={20} />
                    </div>
                  </button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/3 w-full bg-indigo-100  rounded-lg flex flex-col justify-between md:space-y-0 space-y-4  p-6">
              <div className="flex flex-col">
                <div className="flex flex-row justify-between">
                  <div className="md:text-sm text-xs text-neutral-600">
                    10th July 2024
                  </div>
                  <button className="rounded-lg bg-neutral-100 hover:bg-red-200  md:p-2 p-1">
                    <MdDelete className="hidden md:block" size={20} />
                    <MdDelete className="block md:hidden" size={14} />
                  </button>
                </div>
                <div className="md:text-4xl text-xl font-semibold">
                  <h1 className={pops.className}>Wikipedia Search</h1>
                </div>
                <button className="mt-2 border-2 rounded-full p-2 border-black md:h-6 h-4 w-1/6 text-sm text-center items-center flex justify-center">
                  <div>
                    <FaLock className="block md:hidden" size={10} />
                    <FaLock className="hidden md:block" size={16} />
                  </div>
                </button>
              </div>
              <div className="">
                <button className="flex flex-row justify-between w-full bg-violet-300 md:p-3 p-1 rounded-full hover:bg-violet-200">
                  <div className="md:text-md text-sm  font-semibold pl-4">
                    Edit
                  </div>
                  <div className="pr-4">
                    <MdEdit size={20} />
                  </div>
                </button>
              </div>
            </div>
            <div className="md:w-1/3 w-full bg-violet-100  rounded-lg md:space-y-0 space-y-4  flex flex-col justify-between p-6">
              <div className="flex flex-col">
                <div className="flex flex-row justify-between">
                  <div className="md:text-sm text-xs text-neutral-600">
                    30th June 2024
                  </div>
                  <button className="rounded-lg bg-neutral-100 hover:bg-red-200  md:p-2 p-1">
                    <MdDelete className="hidden md:block" size={20} />
                    <MdDelete className="block md:hidden" size={14} />
                  </button>
                </div>
                <div className="md:text-4xl text-xl font-semibold">
                  <h1 className={pops.className}>Image Search</h1>
                </div>
                <button className="mt-2 border-2 rounded-full p-2 border-black md:h-6 h-4 w-1/6 text-sm text-center items-center flex justify-center">
                  <div>
                    <FaLockOpen className="block md:hidden" size={10} />
                    <FaLockOpen className="hidden md:block" size={16} />
                  </div>
                </button>
              </div>
              <div className="">
                <button className="flex flex-row justify-between w-full bg-violet-300 md:p-3 p-1 rounded-full hover:bg-violet-200">
                  <div className="md:text-md text-sm  font-semibold pl-4">
                    Edit
                  </div>
                  <div className="pr-4">
                    <MdEdit size={20} />
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
        {activeTab === 1 && (
          <div className="h-full flex flex-col md:flex-row md:space-y-0 md:space-x-3 space-x-0 space-y-4 justify-between">
            <div className="md:w-1/3 w-full bg-violet-100  rounded-lg flex flex-col md:space-y-0 space-y-4 justify-between p-6">
              <div className="flex flex-col space-y-2">
                <div className="md:text-4xl text-2xl font-semibold text-center">
                  <h1 className={pops.className}>Math Engine</h1>
                </div>
                <div className="text-neutral-600 md:text-sm text-xs text-center">
                  Effortlessly solve complex math problems with the Math Engine
                  template, designed to simplify calculations and <br /> handle
                  mathematical operations.
                </div>
              </div>
              <div className="">
                <button className="flex flex-row justify-between w-full bg-violet-300 md:p-3 p-2 rounded-full hover:bg-violet-200">
                  <div className="md:text-md text-sm font-semibold pl-4">
                    Use this template
                  </div>
                  <div className="pr-4">
                    <MdEdit size={20} />
                  </div>
                </button>
              </div>
            </div>
            <div className="md:w-1/3 w-full bg-violet-100  rounded-lg flex flex-col md:space-y-0 space-y-4 justify-between p-6">
              <div className="flex flex-col space-y-2">
                <div className="md:text-4xl text-2xl font-semibold text-center">
                  <h1 className={pops.className}>Technical Writer</h1>
                </div>
                <div className="text-neutral-600 md:text-sm text-xs text-center">
                  Automate content creation with the AI-powered Technical Writer
                  template, crafted to generate clear, accurate, and engaging
                  <br />
                  technical documentations effortlessly.
                </div>
              </div>
              <div className="">
                <button className="flex flex-row justify-between w-full bg-violet-300 md:p-3 p-2  rounded-full hover:bg-violet-200">
                  <div className="md:text-md text-sm font-semibold pl-4">
                    Use this template
                  </div>
                  <div className="pr-4">
                    <MdEdit size={20} />
                  </div>
                </button>
              </div>
            </div>
            <div className="md:w-1/3 w-full bg-violet-100  rounded-lg flex flex-col md:space-y-0 space-y-4 justify-between p-6">
              <div className="flex flex-col space-y-2">
                <div className="md:text-4xl text-2xl font-semibold text-center">
                  <h1 className={pops.className}>SQL Query Engine</h1>
                </div>
                <div className="text-neutral-600 md:text-sm text-xs text-center">
                  Generate and optimize database queries with ease with the{" "}
                  <br />
                  SQL Query Engine template, designed to simplify
                  <br /> data retrieval and management.
                </div>
              </div>
              <div className="">
                <button className="flex flex-row justify-between w-full bg-violet-300 md:p-3 p-2 rounded-full hover:bg-violet-200">
                  <div className="md:text-md text-sm font-semibold pl-4">
                    Use this template
                  </div>
                  <div className="pr-4">
                    <MdEdit size={20} />
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
        {activeTab === 2 && <div>Content for Tab 3</div>}
      </div>
    </div>
  );
};

export default Tabs;
