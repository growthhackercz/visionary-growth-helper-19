
import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { differenceInWeeks, parseISO } from "date-fns";

const WEEKS_PER_YEAR = 52;
const YEARS_TO_SHOW = 80;
const GRID_SIZE = WEEKS_PER_YEAR * YEARS_TO_SHOW;
const BIRTH_DATE = "1995-11-16";
const YEARS_PER_GROUP = 5;

const MementoMori = () => {
  const [clickedSquares, setClickedSquares] = useState<Set<number>>(new Set());

  useEffect(() => {
    // Calculate weeks lived from birth date until now
    const weeksLived = differenceInWeeks(new Date(), parseISO(BIRTH_DATE));
    const newClickedSquares = new Set<number>();
    
    // Fill in all weeks that have passed
    for (let i = 0; i < weeksLived && i < GRID_SIZE; i++) {
      newClickedSquares.add(i);
    }
    
    setClickedSquares(newClickedSquares);
  }, []);

  const handleSquareClick = (index: number) => {
    const newClickedSquares = new Set(clickedSquares);
    if (newClickedSquares.has(index)) {
      newClickedSquares.delete(index);
    } else {
      newClickedSquares.add(index);
    }
    setClickedSquares(newClickedSquares);
  };

  const renderYearMarkers = () => {
    const markers = [];
    for (let i = 0; i < YEARS_TO_SHOW; i += YEARS_PER_GROUP) {
      markers.push(
        <div
          key={`year-${i}`}
          className="absolute -left-8 text-gray-400 text-sm"
          style={{ top: `${(i * WEEKS_PER_YEAR * 24 + 12) / WEEKS_PER_YEAR}px` }}
        >
          {i}
        </div>
      );
    }
    return markers;
  };

  return (
    <Layout>
      <div className="relative w-full min-h-screen flex flex-col items-center bg-[#1A1F2C] p-8">
        <div className="w-full max-w-4xl bg-[#222222]/80 rounded-lg shadow-lg p-8 glass-card backdrop-blur-sm">
          <h1 className="text-4xl md:text-5xl font-semibold mb-8 tracking-widest text-center text-white">
            MEMENTO MORI
          </h1>
          
          <div className="relative">
            {renderYearMarkers()}
            <div className="grid grid-cols-[repeat(52,minmax(12px,1fr))] gap-[2px] p-4 bg-[#333333] rounded-md shadow-inner">
              {Array.from({ length: GRID_SIZE }).map((_, index) => {
                const year = Math.floor(index / WEEKS_PER_YEAR);
                const isYearMarker = (year + 1) % YEARS_PER_GROUP === 0;
                const weekInYear = index % WEEKS_PER_YEAR;
                
                return (
                  <button
                    key={index}
                    onClick={() => handleSquareClick(index)}
                    className={`
                      aspect-square border border-gray-700 transition-colors duration-300 
                      hover:bg-gray-700 relative
                      ${clickedSquares.has(index) ? "bg-gray-900" : "bg-[#444444]"}
                      ${isYearMarker && weekInYear === WEEKS_PER_YEAR - 1 ? "border-r-2 border-r-gray-500" : ""}
                    `}
                    aria-label={`Week ${weekInYear + 1} of year ${year + 1}`}
                  />
                );
              })}
            </div>
          </div>
          
          <p className="text-center mt-6 text-gray-400 italic">
            Každý čtverec představuje jeden týden života
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default MementoMori;
