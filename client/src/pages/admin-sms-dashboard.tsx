import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { 
  MessageSquare, 
  Send, 
  BarChart3, 
  Settings, 
  Plus,
  Edit,
  Trash2,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Phone
} from 'lucide-react';

// Form schemas
const smsTemplateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  category: z.enum(['message', 'listing', 'admin', 'marketing']),
  description: z.string().optional(),
  variables: z.string().optional(),
  isActive: z.boolean().default(true),
});

const sendSMSSchema = z.object({
  recipient: z.object({
    phoneNumber: z.string().min(10, 'Valid phone number required'),
    userId: z.string().optional(),
  }),
  message: z.string().min(1, 'Message is required'),
  templateId: z.number().optional(),
  provider: z.string().optional(),
});

type SMSTemplate = {
  id: number;
  name: string;
  content: string;
  category: string;
  description?: string;
  variables?: string;
  isActive: boolean;
  usageCount: number;
  createdAt: string;
  updatedAt: string;
};

type SMSLog = {
  id: number;
  phoneNumber: string;
  message: string;
  provider: string;
  success: boolean;
  messageId?: string;
  error?: string;
  cost?: string;
  isBulk: boolean;
  sentAt: string;
};

export default function AdminSMSDashboard() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedTemplate, setSelectedTemplate] = useState<SMSTemplate | null>(null);
  const [showSendDialog, setShowSendDialog] = useState(false);
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);

  // Fetch SMS templates
  const { data: templates = [], isLoading: templatesLoading } = useQuery({
    queryKey: ['/api/sms/templates'],
  });

  // Fetch SMS stats
  const { data: stats } = useQuery({
    queryKey: ['/api/sms/stats'],
  });

  // Fetch SMS logs
  const { data: logsData, isLoading: logsLoading } = useQuery({
    queryKey: ['/api/sms/logs'],
  });

  // Template form
  const templateForm = useForm<z.infer<typeof smsTemplateSchema>>({
    resolver: zodResolver(smsTemplateSchema),
    defaultValues: {
      name: '',
      content: '',
      category: 'message',
      description: '',
      variables: '',
      isActive: true,
    },
  });

  // SMS form
  const smsForm = useForm<z.infer<typeof sendSMSSchema>>({
    resolver: zodResolver(sendSMSSchema),
    defaultValues: {
      recipient: {
        phoneNumber: '',
        userId: '',
      },
      message: '',
    },
  });

  // Create template mutation
  const createTemplateMutation = useMutation({
    mutationFn: (data: z.infer<typeof smsTemplateSchema>) =>
      apiRequest('POST', '/api/sms/templates', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/sms/templates'] });
      setShowTemplateDialog(false);
      templateForm.reset();
      toast({
        title: 'Success',
        description: 'SMS template created successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Send SMS mutation
  const sendSMSMutation = useMutation({
    mutationFn: (data: z.infer<typeof sendSMSSchema>) =>
      apiRequest('POST', '/api/sms/send', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/sms/logs'] });
      queryClient.invalidateQueries({ queryKey: ['/api/sms/stats'] });
      setShowSendDialog(false);
      smsForm.reset();
      toast({
        title: 'Success',
        description: 'SMS sent successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Delete template mutation
  const deleteTemplateMutation = useMutation({
    mutationFn: (id: number) =>
      apiRequest('DELETE', `/api/sms/templates/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/sms/templates'] });
      toast({
        title: 'Success',
        description: 'SMS template deleted successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const handleCreateTemplate = (data: z.infer<typeof smsTemplateSchema>) => {
    createTemplateMutation.mutate(data);
  };

  const handleSendSMS = (data: z.infer<typeof sendSMSSchema>) => {
    sendSMSMutation.mutate(data);
  };

  const handleDeleteTemplate = (id: number) => {
    if (confirm('Are you sure you want to delete this template?')) {
      deleteTemplateMutation.mutate(id);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">SMS Management</h1>
          <p className="text-gray-600">Manage SMS templates, send messages, and track analytics</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={showSendDialog} onOpenChange={setShowSendDialog}>
            <DialogTrigger asChild>
              <Button>
                <Send className="h-4 w-4 mr-2" />
                Send SMS
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Send SMS</DialogTitle>
                <DialogDescription>
                  Send a single SMS message to a user
                </DialogDescription>
              </DialogHeader>
              <Form {...smsForm}>
                <form onSubmit={smsForm.handleSubmit(handleSendSMS)} className="space-y-4">
                  <FormField
                    control={smsForm.control}
                    name="recipient.phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="+254712345678"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Include country code for international numbers
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={smsForm.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter your SMS message..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={sendSMSMutation.isPending}>
                    {sendSMSMutation.isPending ? 'Sending...' : 'Send SMS'}
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="analytics" className="space-y-6">
        <TabsList>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="logs">SMS Logs</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total SMS Sent</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.total || 0}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats?.total ? Math.round((stats.successful / stats.total) * 100) : 0}%
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  KSh {(stats?.totalCost || 0).toFixed(2)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Templates</CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{templates.length}</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">SMS Templates</h2>
            <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Template
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle>Create SMS Template</DialogTitle>
                  <DialogDescription>
                    Create a reusable SMS template with variables
                  </DialogDescription>
                </DialogHeader>
                <Form {...templateForm}>
                  <form onSubmit={templateForm.handleSubmit(handleCreateTemplate)} className="space-y-4">
                    <FormField
                      control={templateForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Template Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter template name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={templateForm.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="message">Message</SelectItem>
                              <SelectItem value="listing">Listing</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="marketing">Marketing</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={templateForm.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message Content</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter SMS content with variables like {name}, {vehicle_make}..."
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Use curly braces for variables: {'{name}, {vehicle_make}, {price}'}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={templateForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Input placeholder="Optional description" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={templateForm.control}
                      name="isActive"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Active Template</FormLabel>
                            <FormDescription>
                              Enable this template for use in SMS campaigns
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={createTemplateMutation.isPending}>
                      {createTemplateMutation.isPending ? 'Creating...' : 'Create Template'}
                    </Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {templatesLoading ? (
              <div>Loading templates...</div>
            ) : (
              templates.map((template: SMSTemplate) => (
                <Card key={template.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline">{template.category}</Badge>
                          {template.isActive ? (
                            <Badge variant="default">Active</Badge>
                          ) : (
                            <Badge variant="secondary">Inactive</Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteTemplate(template.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                    <p className="text-sm bg-gray-50 p-3 rounded">{template.content}</p>
                    <div className="mt-3 text-xs text-gray-500">
                      Used {template.usageCount} times • Created {new Date(template.createdAt).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        {/* Logs Tab */}
        <TabsContent value="logs" className="space-y-6">
          <h2 className="text-xl font-semibold">SMS Logs</h2>
          <div className="space-y-4">
            {logsLoading ? (
              <div>Loading logs...</div>
            ) : logsData?.logs?.length > 0 ? (
              logsData.logs.map((log: SMSLog) => (
                <Card key={log.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Phone className="h-5 w-5 text-gray-400" />
                        <div>
                          <div className="font-medium">{log.phoneNumber}</div>
                          <div className="text-sm text-gray-500">
                            {log.provider} • {new Date(log.sentAt).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {log.success ? (
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Success
                          </Badge>
                        ) : (
                          <Badge variant="destructive">
                            <XCircle className="h-3 w-3 mr-1" />
                            Failed
                          </Badge>
                        )}
                        {log.cost && (
                          <Badge variant="outline">KSh {parseFloat(log.cost).toFixed(2)}</Badge>
                        )}
                      </div>
                    </div>
                    <div className="mt-3 text-sm bg-gray-50 p-3 rounded">
                      {log.message}
                    </div>
                    {log.error && (
                      <div className="mt-2 text-sm text-red-600">{log.error}</div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="pt-6 text-center text-gray-500">
                  No SMS logs found
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <h2 className="text-xl font-semibold">SMS Provider Settings</h2>
          <Card>
            <CardHeader>
              <CardTitle>Provider Configuration</CardTitle>
              <CardDescription>
                Configure SMS providers and their settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                SMS provider configuration is managed through environment variables.
                Contact your system administrator to update provider settings.
              </p>
              <div className="mt-4 space-y-2">
                <div className="text-sm"><strong>Supported Providers:</strong></div>
                <div className="text-sm text-gray-600">
                  • Africa's Talking (Kenya)<br/>
                  • Twilio (International)<br/>
                  • InfoBip (Global)<br/>
                  • Clickatell (Global)
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}