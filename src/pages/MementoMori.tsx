
import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { differenceInWeeks, parseISO, format } from "date-fns";
import { cs } from "date-fns/locale";
import { motion } from "framer-motion";
import { Clock, Info, Calendar } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const WEEKS_PER_YEAR = 52;
const YEARS_TO_SHOW = 80;
const GRID_SIZE = WEEKS_PER_YEAR * YEARS_TO_SHOW;
const BIRTH_DATE = "1995-11-16";
const YEARS_PER_GROUP = 5;
const WEEKS_PER_HALF_YEAR = WEEKS_PER_YEAR / 2;

const MementoMori = () => {
  const [clickedSquares, setClickedSquares] = useState<Set<number>>(new Set());
  const [hoveredSquare, setHoveredSquare] = useState<number | null>(null);
  const [livedWeeks, setLivedWeeks] = useState<number>(0);
  const [livedYears, setLivedYears] = useState<number>(0);
  const [stats, setStats] = useState({
    livedPercentage: 0,
    remainingWeeks: 0,
  });

  useEffect(() => {
    const weeksLived = differenceInWeeks(new Date(), parseISO(BIRTH_DATE));
    const yearsLived = weeksLived / WEEKS_PER_YEAR;
    const newClickedSquares = new Set<number>();
    
    for (let i = 0; i < weeksLived && i < GRID_SIZE; i++) {
      newClickedSquares.add(i);
    }
    
    setClickedSquares(newClickedSquares);
    setLivedWeeks(weeksLived);
    setLivedYears(Math.floor(yearsLived));
    
    setStats({
      livedPercentage: (weeksLived / GRID_SIZE) * 100,
      remainingWeeks: GRID_SIZE - weeksLived,
    });
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

  const getSquareDate = (index: number) => {
    const weekInYear = index % WEEKS_PER_YEAR;
    const year = Math.floor(index / WEEKS_PER_YEAR);
    
    // Calculate date from birth date plus the weeks
    const birthDate = parseISO(BIRTH_DATE);
    const date = new Date(birthDate);
    date.setDate(date.getDate() + (index * 7));
    
    return {
      formattedDate: format(date, 'd. MMMM yyyy', { locale: cs }),
      age: year,
      weekInYear: weekInYear + 1
    };
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
    const { formattedDate, age, weekInYear } = getSquareDate(index);
    const isLived = clickedSquares.has(index);
    const isCurrentWeek = index === Math.floor(livedWeeks);
    
    return (
      <TooltipProvider key={index}>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                backgroundColor: isCurrentWeek ? '#ea384c' : isLived ? '#444444' : '#222222'
              }}
              whileHover={{ 
                scale: 1.2, 
                backgroundColor: isLived ? '#666666' : '#444444'
              }}
              transition={{ duration: 0.2 }}
              onClick={() => handleSquareClick(index)}
              onMouseEnter={() => setHoveredSquare(index)}
              onMouseLeave={() => setHoveredSquare(null)}
              className={`
                aspect-square border transition-colors duration-300 
                hover:scale-110 relative
                ${isCurrentWeek ? "border-primary glow-effect" : isLived ? "border-gray-700" : "border-gray-900"} 
                ${isYearMarker ? "border-b-2 border-b-gray-500" : ""}
              `}
              style={{ animationDelay: `${index * 0.0005}s` }}
              aria-label={`Týden ${weekInYear} v roce ${year + 1}`}
            />
          </TooltipTrigger>
          <TooltipContent side="top" className="bg-black/80 backdrop-blur-lg border-white/10 text-white">
            <div className="text-center">
              <p className="font-bold">{formattedDate}</p>
              <p className="text-sm text-gray-300">Věk: {age} let, Týden: {weekInYear}</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <Layout>
      <div className="relative w-full min-h-screen flex flex-col items-center p-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-5xl glass-card-hover rounded-lg shadow-lg p-8"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <Clock className="h-8 w-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-semibold tracking-widest text-center text-white">
              MEMENTO MORI
            </h1>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-col md:flex-row gap-8 mb-8"
          >
            <div className="bg-white/5 rounded-lg p-6 flex-1 backdrop-blur-sm border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold text-white">Statistiky</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-white/60 text-sm">Prožito</p>
                  <p className="text-2xl font-bold text-white">{livedYears} let ({Math.round(stats.livedPercentage)}%)</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Prožito týdnů</p>
                  <p className="text-2xl font-bold text-white">{livedWeeks.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Zbývající týdny (při dožití 80 let)</p>
                  <p className="text-2xl font-bold text-white">{stats.remainingWeeks.toLocaleString()}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-lg p-6 flex-1 backdrop-blur-sm border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <Info className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold text-white">O projektu</h2>
              </div>
              <p className="text-white/80 leading-relaxed">
                Memento mori je latinská fráze znamenající „pamatuj na smrt". Tento koncept nás učí, že čas je vzácný a měli 
                bychom ho využívat moudře. Každý čtverec v mřížce představuje jeden týden lidského života – vizuální připomínka
                naší smrtelnosti a výzva k uvědomělému žití.
              </p>
            </div>
          </motion.div>
          
          <div className="relative">
            {renderYearMarkers()}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="grid grid-cols-[repeat(53,minmax(12px,1fr))] gap-[2px] p-4 bg-black/50 rounded-md shadow-inner backdrop-blur-md"
            >
              {renderGrid()}
            </motion.div>
          </div>
          
          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-400">
            <p className="text-center italic">
              Každý čtverec představuje jeden týden života
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#444444] border border-gray-700"></div>
                <span>Prožité týdny</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#222222] border border-gray-900"></div>
                <span>Budoucí týdny</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-primary border border-primary"></div>
                <span>Aktuální týden</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default MementoMori;
