import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ProtectedRoute } from "@/components/protected-route";
import { QuickActionMenu } from "@/components/quick-action-menu";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import About from "@/pages/about";
import Careers from "@/pages/careers";
import DutyCalculator from "@/pages/duty-calculator";
import ImportationEstimator from "@/pages/importation-estimator";
import ServiceEstimator from "@/pages/service-estimator";
import TransferCost from "@/pages/transfer-cost";
import MyCarsWorth from "@/pages/mycars-worth";
import BuyACar from "@/pages/buy-a-car";
import BuyACarEnhanced from "@/pages/buy-a-car-enhanced";
import CarDetails from "@/pages/car-details";
import SellMyCar from "@/pages/sell-my-car";
import VehicleLoans from "@/pages/vehicle-loans";
import LoanPreApproval from "@/pages/loan-pre-approval";
import TradeInCalculator from "@/pages/trade-in-calculator";
import LoanApplication from "@/pages/loan-application";
import LoanApplications from "@/pages/loan-applications";
import AIAdvisor from "@/pages/ai-advisor";
import PriceTrends from "@/pages/price-trends";
import SmartPricing from "@/pages/smart-pricing";
import AdminDashboard from "@/pages/admin-dashboard";


import AdminListingDetails from "@/pages/admin-listing-details";
import AdminUsers from "@/pages/admin-users";
import Dashboard from "@/pages/dashboard";
import { UserProfile } from "@/pages/user-profile";
import MyListings from "@/pages/my-listings";
import ListingAnalytics from "@/pages/listing-analytics";
import ListingManagement from "@/pages/listing-management";
import ListingDashboard from "@/pages/listing-dashboard";
import MyWishlists from "@/pages/my-wishlists";
import MyMessages from "@/pages/my-messages";
import Messages from "@/pages/messages";
import SubscriptionManagement from "@/pages/subscription-management";
import UsageDashboard from "@/pages/usage-dashboard";
import BillingDashboard from "@/pages/billing-dashboard";
import UnifiedBillingDashboard from "@/pages/unified-billing-dashboard";
import AdminBillingDashboard from "@/pages/admin-billing-dashboard";
import ExcelImport from "@/pages/excel-import";
import { ResetPassword } from "@/pages/reset-password";
import PaymentSuccess from "@/pages/payment-success-simple";
import { AuthProvider } from "@/components/auth-provider";
import { useAuthRedirect } from "@/hooks/use-auth-redirect";

function Router() {
  useAuthRedirect();  // Handle OAuth redirects globally
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/careers" component={Careers} />
          <Route path="/duty-calculator" component={DutyCalculator} />
          <Route path="/importation-estimator" component={ImportationEstimator} />
          <Route path="/service-estimator" component={ServiceEstimator} />
          <Route path="/transfer-cost" component={TransferCost} />
          <Route path="/mycars-worth" component={MyCarsWorth} />
          <Route path="/buy-a-car" component={BuyACarEnhanced} />
          <Route path="/car-details/:id" component={CarDetails} />
          <Route path="/sell-my-car" component={SellMyCar} />
          <Route path="/vehicle-loans" component={VehicleLoans} />
          <Route path="/loan-pre-approval" component={LoanPreApproval} />
          <Route path="/trade-in-calculator" component={TradeInCalculator} />
          <Route path="/loan-application/:carId/:productId" component={LoanApplication} />
          <Route path="/loan-applications">
            <ProtectedRoute>
              <LoanApplications />
            </ProtectedRoute>
          </Route>
          <Route path="/ai-advisor" component={AIAdvisor} />
          <Route path="/price-trends" component={PriceTrends} />
          <Route path="/price-heatmap" component={PriceTrends} />
          <Route path="/smart-pricing" component={SmartPricing} />
          <Route path="/dashboard">
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          </Route>
          <Route path="/profile">
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          </Route>
          <Route path="/my-listings">
            <ProtectedRoute>
              <MyListings />
            </ProtectedRoute>
          </Route>
          <Route path="/listing/:id/analytics">
            <ProtectedRoute>
              <ListingAnalytics />
            </ProtectedRoute>
          </Route>
          <Route path="/listing/:id/manage">
            <ProtectedRoute>
              <ListingManagement />
            </ProtectedRoute>
          </Route>
          <Route path="/listing/:id/dashboard">
            <ProtectedRoute>
              <ListingDashboard />
            </ProtectedRoute>
          </Route>
          <Route path="/my-wishlists">
            <ProtectedRoute>
              <MyWishlists />
            </ProtectedRoute>
          </Route>
          <Route path="/my-messages">
            <ProtectedRoute>
              <MyMessages />
            </ProtectedRoute>
          </Route>
          <Route path="/messages" component={Messages} />
          <Route path="/payment-success" component={PaymentSuccess} />
          <Route path="/subscription-management">
            <ProtectedRoute>
              <SubscriptionManagement />
            </ProtectedRoute>
          </Route>
          <Route path="/usage-dashboard">
            <ProtectedRoute>
              <UsageDashboard />
            </ProtectedRoute>
          </Route>
          <Route path="/billing">
            <ProtectedRoute>
              <UnifiedBillingDashboard />
            </ProtectedRoute>
          </Route>
          <Route path="/billing-legacy">
            <ProtectedRoute>
              <BillingDashboard />
            </ProtectedRoute>
          </Route>
          <Route path="/admin">
            <ProtectedRoute requireAdmin={true}>
              <AdminDashboard />
            </ProtectedRoute>
          </Route>
          <Route path="/admin/billing">
            <ProtectedRoute requireAdmin={true}>
              <AdminBillingDashboard />
            </ProtectedRoute>
          </Route>
          <Route path="/admin/excel-import">
            <ProtectedRoute requireAdmin={true}>
              <ExcelImport />
            </ProtectedRoute>
          </Route>


          <Route path="/admin/listings/:id">
            <ProtectedRoute requireAdmin={true}>
              <AdminListingDetails />
            </ProtectedRoute>
          </Route>
          <Route path="/admin/listing-details/:id">
            <ProtectedRoute requireAdmin={true}>
              <AdminListingDetails />
            </ProtectedRoute>
          </Route>
          <Route path="/admin/users">
            <ProtectedRoute requireAdmin={true}>
              <AdminUsers />
            </ProtectedRoute>
          </Route>
          <Route path="/reset-password" component={ResetPassword} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <QuickActionMenu />
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
