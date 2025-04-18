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
import Viewer from "@/pages/Viewer";
import MainLayout from "./layouts/MainLayout";

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
      <Routes />
      <Toaster />
    </QueryClientProvider>
  );
}

// Componente para rotas que usam o MainLayout
function Routes() {
  return (
    <Switch>
      <Route path="/viewer" component={Viewer} />
      <Route>
        <MainLayout>
          <Router />
        </MainLayout>
      </Route>
    </Switch>
  );
}

export default App;
