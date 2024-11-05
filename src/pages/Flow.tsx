import { useCallback, useRef, useState } from 'react';
import "tailwindcss/tailwind.css";
import ReactFlow, { 
  useNodesState, 
  useEdgesState, 
  addEdge,
  Background,
  Controls,
  MiniMap,
  Connection,
  Edge,
  ReactFlowProvider,
  Node,
} from 'reactflow';
import 'reactflow/dist/style.css';
import Tools from '../components/flowtabs/tools';
import Prompts from '@/components/flowtabs/prompts';
import LLMs from '@/components/flowtabs/llm';
import { ChevronRight, Layout, Cpu, Icon } from 'lucide-react';
import Image from 'next/image';

const getId = (() => {
  let id = 0;
  return () => `dndnode_${id++}`;
})();

export const toolNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Start' },
    position: { x: 250, y: 25 },
  },
  // ... other initial nodes
];

type NavigationButtonProps = {
  label:string;
  isActive: boolean;
  onClick: () => void;
};

type NextButtonProps = {
  text: string;
  onClick: () => void;
};


const NavigationButton: React.FC<NavigationButtonProps> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`
     flex items-center gap-2 px-4 py-2
      transition-all duration-200 ease-in-out rounded-sm
      ${isActive 
        ? "bg-slate-300 text-white shadow-lg translate-x-2" 
        : "bg-gray-400 text-gray-600 hover:bg-blue-50 hover:text-blue-600"}
    `}
  >
 
   <Image src={label} width="50" height="50" alt="Navigation" />
  </button>
);

const NextButton: React.FC<NextButtonProps> = ({ text, onClick }) => (
  <button
    onClick={onClick}
    className="
      group flex items-center gap-2 px-6 py-3 w-full
      bg-white text-black rounded-xl border-2 border-blue-700
      hover:bg-blue-700 hover:text-white transition-all  duration-200
      shadow-lg hover:shadow-xl
    "
  >
    <span className="font-medium">{text}</span>
    <ChevronRight 
      size={20} 
      className="transition-transform group-hover:translate-x-1"
    />
  </button>
);


const FlowWithPathExtractor = () => {

  const navigationItems = [
    { label: "", imageSrc: "" },
    { label: "Tools", imageSrc: "/tools.png" },
    { label: "AI", imageSrc: "/ai.png"},
  ];

  const [activeTab, setActiveTab] = useState(0);
  const nextbutton = ["Enter prompt", "Select Tools", "Select LLMs"];

  const handleNext = () => {
    setActiveTab((prevTab) => (prevTab + 1) % nextbutton.length);
  }

  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  const [nodes, setNodes, onNodesChange] = useNodesState(toolNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onInit = useCallback((instance: any) => {
    setReactFlowInstance(instance);
  }, []);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      if (!type || !reactFlowBounds || !reactFlowInstance) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode: Node = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

 


  return (
    <div className="flex h-screen bg-[#F0F2F5]">
    <div className="w-80 flex flex-col border-r border-gray-200 bg-white">
      <div className=" p-6">
        <h1 className="text-2xl font-bold text-black mb-6">Create</h1>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {navigationItems.map((item, index) => (
            <NavigationButton
              key={index}
              label={item.imageSrc}  // Passing image source to NavigationButton
              isActive={activeTab === index}
              onClick={() => setActiveTab(index)}
            />
          ))}
        </div>
      </div>
      
      <div className="flex-grow p-6 overflow-auto">
        <div className="bg-white rounded-xl shadow-sm">
          {activeTab === 0 && <Prompts />}
          {activeTab === 1 && <Tools />}
          {activeTab === 2 && <LLMs />}
        </div>
      </div>

      <div className="p-6 border-t border-gray-200">
        <NextButton text={nextbutton[activeTab]} onClick={handleNext} />
      </div>
    </div>

    <div className="flex-1">
      <ReactFlowProvider>
        <div className="w-full h-full" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={onInit}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <Controls className="bg-white shadow-lg border border-gray-200 rounded-lg" />
            <MiniMap className="bg-white shadow-lg border border-gray-200 rounded-lg" />
            <Background color="#F0F2F5" gap={16} />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  </div>
);
};

export default FlowWithPathExtractor;