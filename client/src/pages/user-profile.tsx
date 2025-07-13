import { useState } from "react";
import { Link } from "wouter";
import { User, Car, Search, Settings, Activity, Plus, Lock, Mail, Ban, Shield, RefreshCw, Download, Heart, MessageCircle, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/auth-provider";
import { useQuery } from "@tanstack/react-query";
export function UserProfile() {
  const [activeTab, setActiveTab] = useState("profile");
  const { user } = useAuth();
  
  // Get user's profile data
  const { data: userListings, isLoading: loadingListings } = useQuery({
    queryKey: [`/api/user/listings`],
    enabled: !!user?.id,
  });

  const { data: userFavorites, isLoading: loadingFavorites } = useQuery({
    queryKey: [`/api/user/${user?.id}/favorites`],
    enabled: !!user?.id,
  });

  const { data: userSavedSearches, isLoading: loadingSavedSearches } = useQuery({
    queryKey: [`/api/user/${user?.id}/saved-searches`],
    enabled: !!user?.id,
  });

  const { data: userMessages, isLoading: loadingMessages } = useQuery({
    queryKey: [`/api/user/messages`],
    enabled: !!user?.id,
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to view your profile</h1>
            <p className="text-gray-600">You need to be logged in to access your profile dashboard.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Profile Header */}
        <div className="mb-8 px-6 py-6 bg-gradient-to-r from-purple-600 to-cyan-400 text-white rounded-lg shadow-lg">
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
        <div className="border-b bg-white px-6 rounded-t-lg shadow-sm mb-6">
          <div className="flex space-x-1 overflow-x-auto">
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
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
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
        <div className="bg-white rounded-lg shadow-sm p-6">
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
      </div>
    </div>
  );
}