import { Link, useLocation } from "wouter";
import { Database, LogOut, List, Heart, MessageCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
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
                        <Link href="/profile" className="flex items-center px-3 py-2 text-sm hover:bg-gray-50 transition-colors">
                          <User className="mr-2 h-4 w-4" />
                          <span>My Profile</span>
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
                        {/* Admin Dashboard for users with admin role */}
                        {(() => {
                          const userRole = (user as any)?.role;
                          const roleId = (user as any)?.roleId || userRole?.id;
                          const roleName = userRole?.name?.toLowerCase();
                          const isAdmin = roleId === 3 || roleId === 4 || 
                                         roleName === 'admin' || roleName === 'superadmin';
                          
                          return isAdmin ? (
                            <Link href="/admin" className="flex items-center px-3 py-2 text-sm hover:bg-gray-50 transition-colors">
                              <Database className="mr-2 h-4 w-4" />
                              <span>Admin Dashboard</span>
                            </Link>
                          ) : null;
                        })()}
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
                  
{/* Admin button removed - Admin Dashboard is now available in user dropdown menu for admin users */}
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
  
  // Get user's profile data
  const { data: userListings, isLoading: loadingListings } = useQuery({
    queryKey: [`/api/user/listings`],
    enabled: open && !!userId,
  });

  const { data: userFavorites, isLoading: loadingFavorites } = useQuery({
    queryKey: [`/api/user/${userId}/favorites`],
    enabled: open && !!userId,
  });

  const { data: userSavedSearches, isLoading: loadingSavedSearches } = useQuery({
    queryKey: [`/api/user/${userId}/saved-searches`],
    enabled: open && !!userId,
  });

  const { data: userMessages, isLoading: loadingMessages } = useQuery({
    queryKey: [`/api/user/messages`],
    enabled: open && !!userId,
  });

  const { user } = useAuth();

  if (!open || !user) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden p-0">
        {/* User Profile Header */}
        <div className="px-6 py-6 bg-gradient-to-r from-purple-600 to-cyan-400 text-white">
          <DialogTitle className="sr-only">My Profile</DialogTitle>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.profilePicture} />
              <AvatarFallback className="bg-white text-purple-600 text-xl">
                {user.firstName?.[0]}{user.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-3xl font-bold">{user.firstName} {user.lastName}</h1>
              <p className="text-purple-100">{user.email}</p>
              <p className="text-purple-100">{user.phoneNumber || "Phone not provided"}</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                  Member since {new Date(user.createdAt).toLocaleDateString()}
                </span>
                <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                  {user.location || "Location not set"}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-white/20 rounded-lg p-3">
                  <div className="text-2xl font-bold">{userListings?.length || 0}</div>
                  <div className="text-sm">Listings</div>
                </div>
                <div className="bg-white/20 rounded-lg p-3">
                  <div className="text-2xl font-bold">{userFavorites?.length || 0}</div>
                  <div className="text-sm">Favorites</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Navigation */}
        <div className="border-b bg-white px-6">
          <div className="flex space-x-1">
            {[
              { id: "profile", label: "Profile Overview", icon: User },
              { id: "my-listings", label: "My Listings", icon: Car },
              { id: "favorites", label: "My Favorites", icon: Heart },
              { id: "saved-searches", label: "Saved Searches", icon: Search },
              { id: "messages", label: "Messages", icon: MessageCircle },
              { id: "account-settings", label: "Account Settings", icon: Settings }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-600 text-purple-600 bg-purple-50'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Profile Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {activeTab === "profile" && (
            <div className="space-y-6">
              {/* Profile Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-white shadow-sm">
                  <CardHeader className="text-center">
                    <CardTitle className="text-lg">My Listings</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">{userListings?.length || 0}</div>
                    <div className="text-sm text-gray-600">
                      {userListings?.filter((l: any) => l.status === 'active').length || 0} active, {' '}
                      {userListings?.filter((l: any) => l.status === 'pending').length || 0} pending
                    </div>
                    <Link href="/my-listings">
                      <Button size="sm" className="mt-3 w-full">View All Listings</Button>
                    </Link>
                  </CardContent>
                </Card>
                
                <Card className="bg-white shadow-sm">
                  <CardHeader className="text-center">
                    <CardTitle className="text-lg">Favorite Cars</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-3xl font-bold text-red-500 mb-2">{userFavorites?.length || 0}</div>
                    <div className="text-sm text-gray-600">Cars you've saved</div>
                    <Link href="/my-wishlists">
                      <Button size="sm" className="mt-3 w-full" variant="outline">View Favorites</Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-sm">
                  <CardHeader className="text-center">
                    <CardTitle className="text-lg">Messages</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">{userMessages?.length || 0}</div>
                    <div className="text-sm text-gray-600">Conversations</div>
                    <Link href="/my-messages">
                      <Button size="sm" className="mt-3 w-full" variant="outline">View Messages</Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link href="/sell-my-car">
                      <Button className="w-full h-16 flex flex-col items-center gap-2 bg-purple-600 hover:bg-purple-700">
                        <Plus className="h-6 w-6" />
                        Sell a Car
                      </Button>
                    </Link>
                    <Link href="/buy-a-car">
                      <Button variant="outline" className="w-full h-16 flex flex-col items-center gap-2">
                        <Search className="h-6 w-6" />
                        Browse Cars
                      </Button>
                    </Link>
                    <Link href="/duty-calculator">
                      <Button variant="outline" className="w-full h-16 flex flex-col items-center gap-2">
                        <Database className="h-6 w-6" />
                        Duty Calculator
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "my-listings" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">My Listings</h2>
                <Link href="/sell-my-car">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Listing
                  </Button>
                </Link>
              </div>
              
              {loadingListings ? (
                <div className="text-center py-8">Loading listings...</div>
              ) : userListings && userListings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userListings.map((listing: any) => (
                    <Card key={listing.id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
                      <div className="aspect-video bg-gray-200 rounded-t-lg flex items-center justify-center">
                        <Car className="h-12 w-12 text-gray-400" />
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-lg truncate">{listing.title}</h3>
                          <Badge className={
                            listing.status === 'active' ? 'bg-green-500' :
                            listing.status === 'pending' ? 'bg-yellow-500' :
                            'bg-red-500'
                          }>
                            {listing.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{listing.make} {listing.model} • {listing.year}</p>
                        <p className="text-xl font-bold text-green-600 mb-3">KES {listing.price?.toLocaleString()}</p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">Edit</Button>
                          <Button size="sm" variant="outline" className="flex-1">View</Button>
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                          Created: {new Date(listing.createdAt).toLocaleDateString()}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="bg-white shadow-sm">
                  <CardContent className="text-center py-12">
                    <Car className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No listings yet</h3>
                    <p className="text-gray-500 mb-4">Start selling your car by creating your first listing</p>
                    <Link href="/sell-my-car">
                      <Button className="bg-purple-600 hover:bg-purple-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Create First Listing
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {activeTab === "favorites" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">My Favorite Cars</h2>
              
              {loadingFavorites ? (
                <div className="text-center py-8">Loading favorites...</div>
              ) : (
                <Card className="bg-white shadow-sm">
                  <CardContent className="text-center py-12">
                    <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No favorites yet</h3>
                    <p className="text-gray-500 mb-4">Save cars you're interested in to view them here</p>
                    <Link href="/buy-a-car">
                      <Button variant="outline">Browse Cars</Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {activeTab === "saved-searches" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Saved Searches</h2>
                <Button variant="outline">
                  <Search className="h-4 w-4 mr-2" />
                  Create Search Alert
                </Button>
              </div>
              
              {loadingSavedSearches ? (
                <div className="text-center py-8">Loading saved searches...</div>
              ) : (
                <Card className="bg-white shadow-sm">
                  <CardContent className="text-center py-12">
                    <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No saved searches</h3>
                    <p className="text-gray-500 mb-4">Create search alerts to get notified when new cars match your criteria</p>
                    <Button variant="outline">Create Search Alert</Button>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {activeTab === "messages" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">My Messages</h2>
              
              {loadingMessages ? (
                <div className="text-center py-8">Loading messages...</div>
              ) : (
                <Card className="bg-white shadow-sm">
                  <CardContent className="text-center py-12">
                    <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No messages yet</h3>
                    <p className="text-gray-500 mb-4">Your conversations with buyers and sellers will appear here</p>
                    <Link href="/buy-a-car">
                      <Button variant="outline">Browse Cars to Connect</Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {activeTab === "account-settings" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Account Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white shadow-sm">
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Full Name</label>
                      <p className="font-medium">{user.firstName} {user.lastName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Email</label>
                      <p className="font-medium">{user.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Phone</label>
                      <p className="font-medium">{user.phoneNumber || "Not provided"}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Location</label>
                      <p className="font-medium">{user.location || "Not set"}</p>
                    </div>
                    <Button size="sm" variant="outline" className="w-full">Edit Profile</Button>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-sm">
                  <CardHeader>
                    <CardTitle>Account Security</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <Button size="sm" variant="outline" className="w-full justify-start">
                        <Lock className="h-4 w-4 mr-2" />
                        Change Password
                      </Button>
                      <Button size="sm" variant="outline" className="w-full justify-start">
                        <Shield className="h-4 w-4 mr-2" />
                        Privacy Settings
                      </Button>
                      <Button size="sm" variant="outline" className="w-full justify-start">
                        <Mail className="h-4 w-4 mr-2" />
                        Email Preferences
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end items-center border-t p-4 bg-white">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}