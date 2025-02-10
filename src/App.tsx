
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/index";
import Vision from "./pages/Vision";
import Habits from "./pages/Habits";
import Todos from "./pages/Todos";
import Weekly from "./pages/Weekly";
import Gratitude from "./pages/Gratitude";
import MementoMori from "./pages/MementoMori";
import Notes from "./pages/Notes";
import NoteDetail from "./pages/NoteDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/vision" element={<Vision />} />
          <Route path="/habits" element={<Habits />} />
          <Route path="/todos" element={<Todos />} />
          <Route path="/weekly" element={<Weekly />} />
          <Route path="/gratitude" element={<Gratitude />} />
          <Route path="/memento-mori" element={<MementoMori />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/notes/:id" element={<NoteDetail />} />
          <Route path="/auth" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
