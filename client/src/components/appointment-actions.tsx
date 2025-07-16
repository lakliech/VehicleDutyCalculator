import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  Edit, 
  X, 
  CheckCircle, 
  Calendar, 
  Clock, 
  Star, 
  MapPin,
  Video,
  Car,
  RefreshCw 
} from 'lucide-react';

interface AppointmentActionsProps {
  appointment: any;
  userRole: 'buyer' | 'seller';
  onUpdate?: (updatedAppointment: any) => void;
}

export function AppointmentActions({ appointment, userRole, onUpdate }: AppointmentActionsProps) {
  const [actionDialog, setActionDialog] = useState<'modify' | 'cancel' | 'complete' | null>(null);
  const [formData, setFormData] = useState<any>({});
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const isVideoCall = appointment.type === 'video_call' || 'meetingLink' in appointment;
  const baseUrl = isVideoCall ? '/api/video-calls' : '/api/test-drives';

  // Update appointment mutation
  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest('PATCH', `${baseUrl}/${appointment.id}`, data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: data.message || "Appointment updated successfully",
      });
      setActionDialog(null);
      setFormData({});
      onUpdate?.(data.appointment);
      queryClient.invalidateQueries({ queryKey: [baseUrl] });
      queryClient.invalidateQueries({ queryKey: ['/api/user/buyer-appointments'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update appointment",
        variant: "destructive",
      });
    },
  });

  // Quick action mutations
  const cancelMutation = useMutation({
    mutationFn: async (reason: string) => {
      const response = await apiRequest('POST', `${baseUrl}/${appointment.id}/cancel`, { reason });
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Cancelled",
        description: data.message || "Appointment cancelled successfully",
      });
      onUpdate?.(data.appointment);
      queryClient.invalidateQueries({ queryKey: [baseUrl] });
      queryClient.invalidateQueries({ queryKey: ['/api/user/buyer-appointments'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to cancel appointment",
        variant: "destructive",
      });
    },
  });

  const completeMutation = useMutation({
    mutationFn: async (data: { notes?: string; rating?: number }) => {
      const response = await apiRequest('POST', `${baseUrl}/${appointment.id}/complete`, data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Completed",
        description: data.message || "Appointment marked as completed",
      });
      onUpdate?.(data.appointment);
      queryClient.invalidateQueries({ queryKey: [baseUrl] });
      queryClient.invalidateQueries({ queryKey: ['/api/user/buyer-appointments'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to complete appointment",
        variant: "destructive",
      });
    },
  });

  const handleQuickCancel = () => {
    const reason = prompt("Please provide a reason for cancellation:");
    if (reason !== null) {
      cancelMutation.mutate(reason);
    }
  };

  const handleQuickComplete = () => {
    if (isVideoCall) {
      completeMutation.mutate({});
    } else {
      // For test drives, show a dialog to collect rating and notes
      setActionDialog('complete');
    }
  };

  const handleModifySubmit = () => {
    updateMutation.mutate(formData);
  };

  const canModify = appointment.status === 'pending' || appointment.status === 'confirmed';
  const canCancel = appointment.status !== 'cancelled' && appointment.status !== 'completed';
  const canComplete = appointment.status === 'confirmed' || appointment.status === 'pending';

  return (
    <div className="flex gap-2">
      {/* Quick Actions */}
      {canCancel && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleQuickCancel}
          disabled={cancelMutation.isPending}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          {cancelMutation.isPending ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <X className="h-4 w-4" />
          )}
          Cancel
        </Button>
      )}

      {canComplete && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleQuickComplete}
          disabled={completeMutation.isPending}
          className="text-green-600 hover:text-green-700 hover:bg-green-50"
        >
          {completeMutation.isPending ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <CheckCircle className="h-4 w-4" />
          )}
          Complete
        </Button>
      )}

      {/* Modify Dialog */}
      {canModify && (
        <Dialog open={actionDialog === 'modify'} onOpenChange={(open) => setActionDialog(open ? 'modify' : null)}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4" />
              Modify
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {isVideoCall ? <Video className="h-5 w-5" /> : <Car className="h-5 w-5" />}
                Modify {isVideoCall ? 'Video Call' : 'Test Drive'} Appointment
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              {/* Reschedule */}
              <div>
                <Label htmlFor="appointment-date">Reschedule Date & Time</Label>
                <Input
                  id="appointment-date"
                  type="datetime-local"
                  value={formData.appointmentDate || ''}
                  onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                />
              </div>

              {/* Duration */}
              <div>
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Select
                  value={formData.duration?.toString() || ''}
                  onValueChange={(value) => setFormData({ ...formData, duration: parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {isVideoCall ? (
                      <>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                        <SelectItem value="90">90 minutes</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Video Call specific fields */}
              {isVideoCall && userRole === 'seller' && (
                <div>
                  <Label htmlFor="meeting-link">Meeting Link</Label>
                  <Input
                    id="meeting-link"
                    type="url"
                    placeholder="https://zoom.us/j/... or https://meet.google.com/..."
                    value={formData.meetingLink || ''}
                    onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
                  />
                </div>
              )}

              {/* Test Drive specific fields */}
              {!isVideoCall && (
                <div>
                  <Label htmlFor="meeting-location">Meeting Location</Label>
                  <Input
                    id="meeting-location"
                    placeholder="Update meeting location..."
                    value={formData.meetingLocation || ''}
                    onChange={(e) => setFormData({ ...formData, meetingLocation: e.target.value })}
                  />
                </div>
              )}

              {/* Notes */}
              <div>
                <Label htmlFor="notes">
                  {userRole === 'buyer' ? 'Your Notes' : 'Seller Notes'}
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Add or update notes..."
                  value={formData[userRole === 'buyer' ? 'notes' : 'sellerNotes'] || ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    [userRole === 'buyer' ? 'notes' : 'sellerNotes']: e.target.value 
                  })}
                  rows={3}
                />
              </div>

              {/* Actions */}
              <div className="flex gap-2 justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => setActionDialog(null)}
                  disabled={updateMutation.isPending}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleModifySubmit}
                  disabled={updateMutation.isPending}
                >
                  {updateMutation.isPending ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Update Appointment
                    </>
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Complete Dialog for Test Drives */}
      {!isVideoCall && (
        <Dialog open={actionDialog === 'complete'} onOpenChange={(open) => setActionDialog(open ? 'complete' : null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Complete Test Drive
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              {userRole === 'buyer' && (
                <div>
                  <Label htmlFor="rating">Rate Your Experience</Label>
                  <div className="flex gap-1 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className={`p-1 rounded ${
                          (formData.rating || 0) >= star 
                            ? 'text-yellow-500' 
                            : 'text-gray-300 hover:text-yellow-400'
                        }`}
                      >
                        <Star className="h-6 w-6 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="completion-notes">Notes</Label>
                <Textarea
                  id="completion-notes"
                  placeholder="How was the test drive? Any observations..."
                  value={formData.notes || ''}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="flex gap-2 justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => setActionDialog(null)}
                  disabled={completeMutation.isPending}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={() => completeMutation.mutate(formData)}
                  disabled={completeMutation.isPending}
                >
                  {completeMutation.isPending ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Completing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark Complete
                    </>
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}