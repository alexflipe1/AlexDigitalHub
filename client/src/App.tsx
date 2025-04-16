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
import Admin from "@/pages/Admin";
import Login from "@/pages/Login";
import AlexLogin from "@/pages/AlexLogin";
import MainLayout from "./layouts/MainLayout";
import { NavbarTracker } from "@/components/NavbarLinker";
import ScriptInjector from "@/components/ScriptInjector";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/alex" component={Alex} />
      <Route path="/servico" component={Servico} />
      <Route path="/entretenimento" component={Entretenimento} />
      <Route path="/sites" component={Sites} />
      <Route path="/admin" component={Admin} />
      <Route path="/login" component={Login} />
      <Route path="/alex-login" component={AlexLogin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* O NavbarTracker rastreia a navegação do usuário para poder retornar quando vier de sites externos */}
      <NavbarTracker />
      {/* Injeta o script da barra de navegação para sites externos */}
      <ScriptInjector />
      <MainLayout>
        <Router />
      </MainLayout>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
