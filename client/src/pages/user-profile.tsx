import { useState } from "react";
import { Link } from "wouter";
import { User, Car, Search, Settings, Activity, Plus, Lock, Mail, Ban, Shield, RefreshCw, Download, Heart, MessageCircle, Database, Calendar, Clock, MapPin, Phone, Video, Receipt, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/auth-provider";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AppointmentActions } from "@/components/appointment-actions";
export function UserProfile() {
  const [activeTab, setActiveTab] = useState("profile");
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
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

  const { data: buyerAppointments, isLoading: loadingBuyerAppointments } = useQuery({
    queryKey: [`/api/user/buyer-appointments`],
    enabled: !!user?.id,
  });

  const { data: userTransactions, isLoading: loadingTransactions } = useQuery({
    queryKey: [`/api/user/transactions`],
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
              { id: "appointments", label: "My Appointments", icon: Calendar },
              { id: "transactions", label: "My Transactions", icon: Receipt },
              { id: "favorites", label: "My Favorites", icon: Heart },
              { id: "saved-searches", label: "Saved Searches", icon: Search },
              { id: "messages", label: "Messages", icon: MessageCircle },
              { id: "billing", label: "Billing & Plans", icon: CreditCard },
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
                    <CardTitle className="text-lg">My Appointments</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-3xl font-bold text-blue-500 mb-2">{buyerAppointments?.statistics?.total || 0}</div>
                    <div className="text-sm text-gray-600">
                      {buyerAppointments?.statistics?.upcoming || 0} upcoming, {' '}
                      {buyerAppointments?.statistics?.completed || 0} completed
                    </div>
                    <Button size="sm" className="mt-3 w-full" variant="outline" onClick={() => setActiveTab('appointments')}>View Appointments</Button>
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

          {activeTab === "appointments" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">My Appointments</h2>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-600">
                    {buyerAppointments?.statistics?.total || 0} Total
                  </Badge>
                  <Badge variant="outline" className="bg-green-50 text-green-600">
                    {buyerAppointments?.statistics?.upcoming || 0} Upcoming
                  </Badge>
                </div>
              </div>

              {/* Appointment Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-white shadow-sm">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{buyerAppointments?.statistics?.total || 0}</div>
                    <div className="text-sm text-gray-600">Total Appointments</div>
                  </CardContent>
                </Card>
                <Card className="bg-white shadow-sm">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{buyerAppointments?.statistics?.upcoming || 0}</div>
                    <div className="text-sm text-gray-600">Upcoming</div>
                  </CardContent>
                </Card>
                <Card className="bg-white shadow-sm">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600">{buyerAppointments?.statistics?.pending || 0}</div>
                    <div className="text-sm text-gray-600">Pending</div>
                  </CardContent>
                </Card>
                <Card className="bg-white shadow-sm">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">{buyerAppointments?.statistics?.completed || 0}</div>
                    <div className="text-sm text-gray-600">Completed</div>
                  </CardContent>
                </Card>
              </div>

              {/* Appointments List */}
              {loadingBuyerAppointments ? (
                <div className="text-center py-8">Loading appointments...</div>
              ) : buyerAppointments && buyerAppointments.appointments && buyerAppointments.appointments.length > 0 ? (
                <div className="space-y-4">
                  {buyerAppointments.appointments.map((appointment: any) => (
                    <Card key={`${appointment.type}-${appointment.id}`} className="bg-white shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-full bg-purple-100">
                              {appointment.type === 'test_drive' ? (
                                <Car className="h-5 w-5 text-purple-600" />
                              ) : (
                                <Video className="h-5 w-5 text-purple-600" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">
                                {appointment.type === 'test_drive' ? 'Test Drive' : 'Video Call'}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {appointment.listing?.make} {appointment.listing?.model} {appointment.listing?.year}
                              </p>
                            </div>
                          </div>
                          <Badge className={
                            appointment.status === 'completed' ? 'bg-green-500 text-white' :
                            appointment.status === 'pending' ? 'bg-yellow-500 text-white' :
                            appointment.status === 'confirmed' ? 'bg-blue-500 text-white' :
                            appointment.status === 'cancelled' ? 'bg-red-500 text-white' :
                            'bg-gray-500 text-white'
                          }>
                            {appointment.status === 'cancelled' ? 'Cancelled' : 
                             appointment.status === 'completed' ? 'Completed' :
                             appointment.status === 'confirmed' ? 'Confirmed' :
                             appointment.status === 'pending' ? 'Pending' : 
                             appointment.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span className="text-sm">
                                {new Date(appointment.appointmentDate).toLocaleString()}
                              </span>
                            </div>
                            {appointment.type === 'test_drive' && appointment.meetingLocation && (
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-gray-500" />
                                <span className="text-sm">{appointment.meetingLocation}</span>
                              </div>
                            )}
                            {appointment.type === 'video_call' && appointment.meetingLink && (
                              <div className="flex items-center gap-2">
                                <Video className="h-4 w-4 text-gray-500" />
                                <span className="text-sm">Video call scheduled</span>
                              </div>
                            )}
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-gray-500" />
                              <span className="text-sm">Seller: {appointment.sellerName}</span>
                            </div>
                            {appointment.sellerPhone && (
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-gray-500" />
                                <span className="text-sm">{appointment.sellerPhone}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="border-t pt-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium">{appointment.listing?.title}</p>
                              <p className="text-sm text-gray-600">
                                KES {appointment.listing?.price?.toLocaleString()} • {appointment.listing?.location}
                              </p>
                            </div>
                            <div className="flex gap-2 items-center">
                              <Link href={`/car-details/${appointment.listing?.id}`}>
                                <Button size="sm" variant="outline">View Listing</Button>
                              </Link>
                              {appointment.type === 'video_call' && appointment.meetingLink && appointment.status !== 'cancelled' && (
                                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                                  Join Call
                                </Button>
                              )}
                              <AppointmentActions 
                                appointment={appointment} 
                                userRole="buyer"
                                onUpdate={(updatedAppointment) => {
                                  // Refresh buyer appointments data
                                  queryClient.invalidateQueries({ queryKey: ['/api/user/buyer-appointments'] });
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="bg-white shadow-sm">
                  <CardContent className="text-center py-12">
                    <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No appointments yet</h3>
                    <p className="text-gray-500 mb-4">Schedule appointments with sellers to view cars</p>
                    <Link href="/buy-a-car">
                      <Button className="bg-purple-600 hover:bg-purple-700">
                        <Search className="h-4 w-4 mr-2" />
                        Browse Cars
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

          {activeTab === "transactions" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">My Transactions</h2>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-600">
                    {userTransactions?.length || 0} Total
                  </Badge>
                  <Badge variant="outline" className="bg-green-50 text-green-600">
                    {userTransactions?.filter((t: any) => t.status === 'completed').length || 0} Completed
                  </Badge>
                </div>
              </div>

              {/* Transaction Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-white shadow-sm">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{userTransactions?.length || 0}</div>
                    <div className="text-sm text-gray-600">Total Transactions</div>
                  </CardContent>
                </Card>
                <Card className="bg-white shadow-sm">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {userTransactions?.filter((t: any) => t.status === 'completed').length || 0}
                    </div>
                    <div className="text-sm text-gray-600">Completed</div>
                  </CardContent>
                </Card>
                <Card className="bg-white shadow-sm">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {userTransactions?.filter((t: any) => t.status === 'pending').length || 0}
                    </div>
                    <div className="text-sm text-gray-600">Pending</div>
                  </CardContent>
                </Card>
                <Card className="bg-white shadow-sm">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      KES {userTransactions?.reduce((total: number, t: any) => total + (t.status === 'completed' ? parseFloat(t.amount || 0) : 0), 0)?.toLocaleString() || 0}
                    </div>
                    <div className="text-sm text-gray-600">Total Spent</div>
                  </CardContent>
                </Card>
              </div>

              {/* Transaction History */}
              {loadingTransactions ? (
                <div className="text-center py-8">Loading transactions...</div>
              ) : userTransactions && userTransactions.length > 0 ? (
                <div className="space-y-4">
                  {userTransactions.map((transaction: any) => (
                    <Card key={transaction.id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="p-2 bg-purple-100 rounded-full">
                                <Receipt className="h-5 w-5 text-purple-600" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-lg">{transaction.description}</h3>
                                <p className="text-sm text-gray-600">
                                  {new Date(transaction.createdAt).toLocaleDateString()} • {new Date(transaction.createdAt).toLocaleTimeString()}
                                </p>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm font-medium text-gray-600">Transaction ID:</span>
                                  <span className="text-sm font-mono">{transaction.reference}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm font-medium text-gray-600">Payment Method:</span>
                                  <span className="text-sm capitalize">{transaction.method}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm font-medium text-gray-600">Transaction Type:</span>
                                  <span className="text-sm capitalize">{transaction.type}</span>
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm font-medium text-gray-600">Amount:</span>
                                  <span className="text-sm font-bold">KES {parseFloat(transaction.amount || 0).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm font-medium text-gray-600">Currency:</span>
                                  <span className="text-sm">{transaction.currency}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm font-medium text-gray-600">Status:</span>
                                  <Badge className={
                                    transaction.status === 'completed' ? 'bg-green-500' :
                                    transaction.status === 'pending' ? 'bg-yellow-500' :
                                    transaction.status === 'failed' ? 'bg-red-500' :
                                    'bg-gray-500'
                                  }>
                                    {transaction.status}
                                  </Badge>
                                </div>
                              </div>
                            </div>

                            {/* Product Details */}
                            {transaction.product && (
                              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                <h4 className="font-medium text-gray-800 mb-2">Product Details</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                  <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Product Name:</span>
                                    <span className="text-sm font-medium">{transaction.product.name}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Category:</span>
                                    <span className="text-sm">{transaction.product.category}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Billing Type:</span>
                                    <span className="text-sm capitalize">{transaction.product.billingType}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Base Price:</span>
                                    <span className="text-sm">KES {parseFloat(transaction.product.basePrice || 0).toLocaleString()}</span>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Listing Details */}
                            {transaction.listing && (
                              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                <h4 className="font-medium text-gray-800 mb-2">Listing Details</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                  <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Listing Title:</span>
                                    <span className="text-sm font-medium">{transaction.listing.title}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Vehicle:</span>
                                    <span className="text-sm">{transaction.listing.make} {transaction.listing.model}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Year:</span>
                                    <span className="text-sm">{transaction.listing.year}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Listing Price:</span>
                                    <span className="text-sm">KES {parseFloat(transaction.listing.price || 0).toLocaleString()}</span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <div className="text-right">
                            <div className="text-2xl font-bold text-purple-600">
                              KES {parseFloat(transaction.amount || 0).toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                              {transaction.paidAt ? `Paid on ${new Date(transaction.paidAt).toLocaleDateString()}` : 'Payment pending'}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="bg-white shadow-sm">
                  <CardContent className="text-center py-12">
                    <Receipt className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No transactions yet</h3>
                    <p className="text-gray-500 mb-4">Your payment history and purchases will appear here</p>
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