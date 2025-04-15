import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Alex from "@/pages/Alex";
import Servico from "@/pages/Servico";
import Entretenimento from "@/pages/Entretenimento";
import Sites from "@/pages/Sites";
import MainLayout from "./layouts/MainLayout";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/alex" component={Alex} />
      <Route path="/servico" component={Servico} />
      <Route path="/entretenimento" component={Entretenimento} />
      <Route path="/sites" component={Sites} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainLayout>
        <Router />
      </MainLayout>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
