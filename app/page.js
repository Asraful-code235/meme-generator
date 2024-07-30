import MemeGenerator from "@/components/MemeGenerator";
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid place-content-center h-screen w-screen bg-black overflow-y-scroll">
      <div className="bg-black flex flex-col gap-2">
        <h1 className="text-xl font-medium text-center border-2 border-red-500 bg-white text-red-500 py-2 px-2">
          MemeMaker
        </h1>
        <div className="max-w-sm mx-auto p-4 bg-white shadow-lg rounded-md">
          <MemeGenerator />
        </div>
      </div>
    </div>
  );
}
