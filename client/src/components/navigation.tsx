import { Link, useLocation } from "wouter";
import { Database, LogOut, List, Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/components/auth-provider";
import { AuthForms } from "@/components/auth-forms";
import gariyangu from "@assets/gylogo_1752064168868.png";

export function Navigation() {
  const [location] = useLocation();
  const { user, isAuthenticated, logout, isAdminAuthenticated } = useAuth();
  
  // Check if current page is an admin page
  const isAdminPage = location.startsWith('/admin');

  const handleLogout = () => {
    logout();
  };

  const getUserInitials = (user: any) => {
    if (!user) return "U";
    return `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase();
  };

  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      {/* Header with Logo */}
      <div className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6">
              <Link href="/">
                <img 
                  src={gariyangu} 
                  alt="Gariyangu Logo" 
                  className="h-20 lg:h-32 w-auto object-contain cursor-pointer hover:opacity-90 transition-opacity"
                />
              </Link>
              <div className="text-center lg:text-left">
                <Link href="/">
                  <h1 className="text-xl lg:text-4xl font-bold text-gray-900 cursor-pointer hover:text-purple-600 transition-colors">Kenya's Car Marketplace</h1>
                </Link>
                <p className="text-sm lg:text-lg text-gray-600">we get super excited about cars</p>
              </div>
            </div>
            
            {/* Auth Section */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  {/* User Menu */}
                  <div className="relative group">
                    <div className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-purple-100 transition-colors cursor-pointer">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.profileImageUrl || ""} alt={user?.firstName || ""} />
                        <AvatarFallback className="bg-purple-600 text-white">
                          {getUserInitials(user)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-gray-900">
                        {user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.email?.split('@')[0] || 'User'}
                      </span>
                    </div>
                    
                    {/* Dropdown Menu - appears on hover */}
                    <div className="absolute right-0 top-full mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="p-3 border-b border-gray-100">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{user?.firstName} {user?.lastName}</p>
                          <p className="text-xs leading-none text-gray-500">{user?.email}</p>
                        </div>
                      </div>
                      <div className="py-1">
                        <Link href="/dashboard" className="flex items-center px-3 py-2 text-sm hover:bg-gray-50 transition-colors">
                          <Database className="mr-2 h-4 w-4" />
                          <span>Dashboard</span>
                        </Link>
                        <Link href="/my-listings" className="flex items-center px-3 py-2 text-sm hover:bg-gray-50 transition-colors">
                          <List className="mr-2 h-4 w-4" />
                          <span>My Listings</span>
                        </Link>
                        <Link href="/my-wishlists" className="flex items-center px-3 py-2 text-sm hover:bg-gray-50 transition-colors">
                          <Heart className="mr-2 h-4 w-4" />
                          <span>My Wishlists</span>
                        </Link>
                        <Link href="/my-messages" className="flex items-center px-3 py-2 text-sm hover:bg-gray-50 transition-colors">
                          <MessageCircle className="mr-2 h-4 w-4" />
                          <span>My Messages</span>
                        </Link>
                        <button 
                          onClick={handleLogout}
                          className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-50 transition-colors text-left"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Log out</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Admin Link (only show if admin is authenticated) */}
                  {isAdminAuthenticated && (
                    <Link href="/admin">
                      <Button variant="outline" size="sm" className="flex items-center gap-2 border-purple-300 text-purple-700 hover:bg-purple-50">
                        <Database className="h-4 w-4" />
                        Admin
                      </Button>
                    </Link>
                  )}
                </>
              ) : (
                !isAdminPage && <AuthForms />
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Import Call to Action - Hide on admin pages */}
      {!isAdminPage && (
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
              <div className="text-center sm:text-left">
                <p className="text-sm sm:text-base font-medium">
                  Do you wish to import a car from Japan/UK/South Africa/Dubai/Australia/Singapore/Thailand? I'm your plug!
                </p>
                <p className="text-xs sm:text-sm text-cyan-100 mt-1">
                  Professional car import services with competitive rates
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm font-semibold">Call or WhatsApp:</span>
                <a
                  href="https://wa.me/254736272719?text=Hi%2C%20I%27m%20interested%20in%20importing%20a%20car.%20Can%20you%20help%20me%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors duration-200"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 2c-5.5 0-9.973 4.473-9.973 9.973 0 1.756.459 3.406 1.263 4.832l-1.341 4.89 5.011-1.314a9.924 9.924 0 004.04.835c5.5 0 9.973-4.473 9.973-9.973S17.517 2 12.017 2zm5.941 14.665c-.254.714-1.267 1.315-2.083 1.484-.563.117-1.297.106-2.089-.276-1.372-.662-2.854-1.815-3.93-3.246-1.077-1.431-1.789-3.13-1.789-4.89 0-1.364.553-2.6 1.45-3.5.258-.258.564-.387.904-.387.225 0 .45.008.647.016.209.009.488-.079.765.583.291.696.983 2.4 1.071 2.576.087.176.146.38.029.614-.117.234-.176.38-.351.586-.176.206-.369.46-.527.62-.175.176-.358.366-.154.717.204.351.906 1.495 1.944 2.42 1.336 1.189 2.462 1.557 2.812 1.732.351.176.556.147.759-.088.204-.234.87-.871 1.102-1.17.234-.3.468-.251.789-.15.322.1 2.038 0.961 2.389 1.136.35.176.584.263.671.41.087.146.087.844-.167 1.558z"/>
                  </svg>
                  0736 272719
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}