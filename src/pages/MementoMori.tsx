
import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { differenceInWeeks, parseISO } from "date-fns";

const WEEKS_PER_YEAR = 52;
const YEARS_TO_SHOW = 80;
const GRID_SIZE = WEEKS_PER_YEAR * YEARS_TO_SHOW;
const BIRTH_DATE = "1995-11-16";
const YEARS_PER_GROUP = 5;
const WEEKS_PER_HALF_YEAR = WEEKS_PER_YEAR / 2;

const MementoMori = () => {
  const [clickedSquares, setClickedSquares] = useState<Set<number>>(new Set());

  useEffect(() => {
    const weeksLived = differenceInWeeks(new Date(), parseISO(BIRTH_DATE));
    const newClickedSquares = new Set<number>();
    
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
    for (let i = YEARS_PER_GROUP; i <= YEARS_TO_SHOW; i += YEARS_PER_GROUP) {
      markers.push(
        <div
          key={`year-${i}`}
          className="absolute -left-8 text-gray-400 text-sm"
          style={{ top: `${(i * 24) - 12}px` }}
        >
          {i}
        </div>
      );
    }
    return markers;
  };

  const renderGrid = () => {
    const squares = [];
    for (let year = 0; year < YEARS_TO_SHOW; year++) {
      // First half of the year
      for (let week = 0; week < WEEKS_PER_HALF_YEAR; week++) {
        const index = year * WEEKS_PER_YEAR + week;
        squares.push(renderSquare(index, year));
      }
      
      // Add spacer cell
      squares.push(
        <div
          key={`spacer-${year}`}
          className="aspect-square bg-white/5"
        />
      );
      
      // Second half of the year
      for (let week = WEEKS_PER_HALF_YEAR; week < WEEKS_PER_YEAR; week++) {
        const index = year * WEEKS_PER_YEAR + week;
        squares.push(renderSquare(index, year));
      }
    }
    return squares;
  };

  const renderSquare = (index: number, year: number) => {
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
          ${isYearMarker ? "border-b-2 border-b-gray-500" : ""}
        `}
        aria-label={`Week ${weekInYear + 1} of year ${year + 1}`}
      />
    );
  };

  return (
    <Layout>
      <div className="relative w-full min-h-screen flex flex-col items-center bg-[#1A1F2C] p-8">
        <div className="w-full max-w-5xl bg-[#222222]/80 rounded-lg shadow-lg p-8 glass-card backdrop-blur-sm">
          <h1 className="text-4xl md:text-5xl font-semibold mb-8 tracking-widest text-center text-white">
            MEMENTO MORI
          </h1>
          
          <div className="relative">
            {renderYearMarkers()}
            <div className="grid grid-cols-[repeat(53,minmax(12px,1fr))] gap-[2px] p-4 bg-[#333333] rounded-md shadow-inner">
              {renderGrid()}
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
