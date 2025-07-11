import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import DutyCalculator from "@/pages/duty-calculator";
import ImportationEstimator from "@/pages/importation-estimator";
import ServiceEstimator from "@/pages/service-estimator";
import TransferCost from "@/pages/transfer-cost";
import MyCarsWorth from "@/pages/mycars-worth";
import BuyACar from "@/pages/buy-a-car";
import PriceTrends from "@/pages/price-trends";
import SellMyCar from "@/pages/sell-my-car";
import VehicleLoans from "@/pages/vehicle-loans";
import AdminDashboard from "@/pages/admin-dashboard";
import Dashboard from "@/pages/dashboard";
import { ResetPassword } from "@/pages/reset-password";
import { AuthProvider } from "@/components/auth-provider";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/duty-calculator" component={DutyCalculator} />
          <Route path="/importation-estimator" component={ImportationEstimator} />
          <Route path="/service-estimator" component={ServiceEstimator} />
          <Route path="/transfer-cost" component={TransferCost} />
          <Route path="/mycars-worth" component={MyCarsWorth} />
          <Route path="/buy-a-car" component={BuyACar} />
          <Route path="/sell-my-car" component={SellMyCar} />
          <Route path="/vehicle-loans" component={VehicleLoans} />
          <Route path="/price-trends" component={PriceTrends} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/admin" component={AdminDashboard} />
          <Route path="/reset-password" component={ResetPassword} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
