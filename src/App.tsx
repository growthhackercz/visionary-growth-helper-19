
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/AuthProvider";
import { PrivateRoute } from "@/components/PrivateRoute";
import Index from "./pages/index";
import Vision from "./pages/Vision";
import Habits from "./pages/Habits";
import Todos from "./pages/Todos";
import Weekly from "./pages/Weekly";
import Gratitude from "./pages/Gratitude";
import MementoMori from "./pages/MementoMori";
import Notes from "./pages/Notes";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Index />
                </PrivateRoute>
              }
            />
            <Route
              path="/vision"
              element={
                <PrivateRoute>
                  <Vision />
                </PrivateRoute>
              }
            />
            <Route
              path="/habits"
              element={
                <PrivateRoute>
                  <Habits />
                </PrivateRoute>
              }
            />
            <Route
              path="/todos"
              element={
                <PrivateRoute>
                  <Todos />
                </PrivateRoute>
              }
            />
            <Route
              path="/weekly"
              element={
                <PrivateRoute>
                  <Weekly />
                </PrivateRoute>
              }
            />
            <Route
              path="/gratitude"
              element={
                <PrivateRoute>
                  <Gratitude />
                </PrivateRoute>
              }
            />
            <Route
              path="/memento-mori"
              element={
                <PrivateRoute>
                  <Memento />
                </PrivateRoute>
              }
            />
            <Route
              path="/notes"
              element={
                <PrivateRoute>
                  <Notes />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
