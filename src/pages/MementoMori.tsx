
import { useState } from "react";
import { Layout } from "@/components/Layout";

const GRID_SIZE = 52 * 7; // 52 weeks * 7 days = 364 squares (roughly a year)

const MementoMori = () => {
  const [clickedSquares, setClickedSquares] = useState<Set<number>>(new Set());

  const handleSquareClick = (index: number) => {
    const newClickedSquares = new Set(clickedSquares);
    if (newClickedSquares.has(index)) {
      newClickedSquares.delete(index);
    } else {
      newClickedSquares.add(index);
    }
    setClickedSquares(newClickedSquares);
  };

  return (
    <Layout>
      <div className="relative w-full min-h-screen flex flex-col items-center bg-[#f3f3f3] p-8">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8 glass-card backdrop-blur-sm">
          <h1 className="text-4xl md:text-5xl font-semibold mb-8 tracking-widest text-center">
            MEMENTO MORI
          </h1>
          
          <div className="grid grid-cols-[repeat(auto-fill,minmax(20px,1fr))] gap-1 p-4 bg-white rounded-md shadow-inner">
            {Array.from({ length: GRID_SIZE }).map((_, index) => (
              <button
                key={index}
                onClick={() => handleSquareClick(index)}
                className={`aspect-square border border-gray-300 transition-colors duration-300 hover:bg-gray-100 ${
                  clickedSquares.has(index) ? "bg-gray-900" : "bg-white"
                }`}
                aria-label={`Grid square ${index + 1}`}
              />
            ))}
          </div>
          
          <p className="text-center mt-4 text-gray-600 italic">
            We only live once
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default MementoMori;
