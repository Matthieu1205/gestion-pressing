import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import NewDeposit from "./pages/NewDeposit";
import Clients from "./pages/Clients";
import Planning from "./pages/Planning";
import Atelier from "./pages/Atelier";
import Retrait from "./pages/Retrait";
import Caisse from "./pages/Caisse";
import Stocks from "./pages/Stocks";
import Rapports from "./pages/Rapports";
import Parametres from "./pages/Parametres";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/depot" element={<NewDeposit />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/planning" element={<Planning />} />
            <Route path="/atelier" element={<Atelier />} />
            <Route path="/retrait" element={<Retrait />} />
            <Route path="/caisse" element={<Caisse />} />
            <Route path="/stocks" element={<Stocks />} />
            <Route path="/rapports" element={<Rapports />} />
            <Route path="/parametres" element={<Parametres />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
