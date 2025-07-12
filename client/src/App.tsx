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
import CarDetails from "@/pages/car-details";
import SellMyCar from "@/pages/sell-my-car";
import VehicleLoans from "@/pages/vehicle-loans";
import AIAdvisor from "@/pages/ai-advisor";
import PriceTrends from "@/pages/price-trends";
import AdminDashboard from "@/pages/admin-dashboard";
import AdminListings from "@/pages/admin-listings";
import AdminUsers from "@/pages/admin-users";
import Dashboard from "@/pages/dashboard";
import MyListings from "@/pages/my-listings";
import MyWishlists from "@/pages/my-wishlists";
import MyMessages from "@/pages/my-messages";
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
          <Route path="/car-details/:id" component={CarDetails} />
          <Route path="/sell-my-car" component={SellMyCar} />
          <Route path="/vehicle-loans" component={VehicleLoans} />
          <Route path="/ai-advisor" component={AIAdvisor} />
          <Route path="/price-trends" component={PriceTrends} />
          <Route path="/price-heatmap" component={PriceTrends} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/my-listings" component={MyListings} />
          <Route path="/my-wishlists" component={MyWishlists} />
          <Route path="/my-messages" component={MyMessages} />
          <Route path="/admin" component={AdminDashboard} />
          <Route path="/admin/listings" component={AdminListings} />
          <Route path="/admin/users" component={AdminUsers} />
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
