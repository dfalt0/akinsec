
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WaveBackground from '@/components/WaveBackground';
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp,
  Users,
  FileText,
  Network,
  BarChart3,
  Clock,
  Target,
  Zap,
  ArrowRight,
  Calendar,
  User,
  Building,
  Globe,
  Lock,
  Eye,
  Filter,
  Plus,
  Download,
  Bell
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils/index.js';

// Mock enterprise data
const enterpriseData = {
  complianceScore: 87,
  frameworks: [
    { name: 'SOC 2 Type II', progress: 92, tasks: '23/25', status: 'active', dueDate: '2024-03-15' },
    { name: 'ISO 27001', progress: 78, tasks: '47/60', status: 'active', dueDate: '2024-04-20' },
    { name: 'GDPR', progress: 95, tasks: '38/40', status: 'compliant', dueDate: '2024-02-28' },
    { name: 'HIPAA', progress: 65, tasks: '13/20', status: 'in_progress', dueDate: '2024-05-10' },
    { name: 'PCI DSS', progress: 88, tasks: '31/35', status: 'active', dueDate: '2024-06-01' }
  ],
  tasks: [
    {
      id: 1,
      title: "Implement Multi-Factor Authentication",
      framework: "SOC 2",
      status: "in_progress",
      priority: "high",
      assignee: "Security Team",
      dueDate: "2024-02-15",
      progress: 75
    },
    {
      id: 2,
      title: "Conduct Annual Risk Assessment",
      framework: "ISO 27001",
      status: "not_started",
      priority: "critical",
      assignee: "Risk Manager",
      dueDate: "2024-01-30",
      progress: 0
    },
    {
      id: 3,
      title: "Update Privacy Policy",
      framework: "GDPR",
      status: "review",
      priority: "medium",
      assignee: "Legal Team",
      dueDate: "2024-02-01",
      progress: 90
    },
    {
      id: 4,
      title: "Deploy Data Encryption",
      framework: "SOC 2",
      status: "completed",
      priority: "high",
      assignee: "DevOps",
      dueDate: "2024-01-15",
      progress: 100
    },
    {
      id: 5,
      title: "Employee Security Training",
      framework: "ISO 27001",
      status: "in_progress",
      priority: "medium",
      assignee: "HR Team",
      dueDate: "2024-02-28",
      progress: 45
    },
    {
      id: 6,
      title: "Vendor Security Assessment",
      framework: "SOC 2",
      status: "blocked",
      priority: "high",
      assignee: "Procurement",
      dueDate: "2024-02-10",
      progress: 20
    }
  ],
  integrations: [
    {
      name: "Salesforce CRM",
      vendor: "Salesforce.com",
      category: "CRM",
      status: "compliant",
      risk: "low",
      dataProcessing: "extensive",
      lastReviewed: "2024-01-15",
      certifications: ["SOC 2", "ISO 27001", "GDPR"]
    },
    {
      name: "AWS Infrastructure",
      vendor: "Amazon Web Services",
      category: "Cloud Storage",
      status: "compliant",
      risk: "low",
      dataProcessing: "extensive",
      lastReviewed: "2024-01-20",
      certifications: ["SOC 2", "ISO 27001", "PCI DSS"]
    },
    {
      name: "Slack Communications",
      vendor: "Slack Technologies",
      category: "Communication",
      status: "partial",
      risk: "medium",
      dataProcessing: "moderate",
      lastReviewed: "2024-01-10",
      certifications: ["SOC 2"]
    },
    {
      name: "Intercom Support",
      vendor: "Intercom Inc.",
      category: "Communication",
      status: "non_compliant",
      risk: "high",
      dataProcessing: "moderate",
      lastReviewed: "2023-12-15",
      certifications: ["SOC 2"]
    },
    {
      name: "GitHub Enterprise",
      vendor: "GitHub Inc.",
      category: "Development",
      status: "compliant",
      risk: "low",
      dataProcessing: "minimal",
      lastReviewed: "2024-01-18",
      certifications: ["SOC 2", "ISO 27001"]
    }
  ],
  analytics: {
    totalTasks: 156,
    completedTasks: 124,
    overdueTasks: 3,
    avgCompletionTime: 5.2,
    thisMonthProgress: 12
  }
};

// Demo Components - Dark Theme
const DemoMetric = ({ icon: Icon, label, value, change, color = "text-white" }) => (
  <Card className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-all duration-300 backdrop-blur-sm">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-400">{label}</p>
          <p className={`text-3xl font-bold ${color} mb-1`}>{value}</p>
          {change && <p className="text-xs text-green-400 font-medium">{change}</p>}
        </div>
        <div className="p-3 bg-gray-800 rounded-xl">
          <Icon className="w-6 h-6 text-gray-300" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const DemoTaskRow = ({ task }) => {
  const statusColors = {
    'completed': 'bg-green-900/50 text-green-300 border-green-800',
    'in_progress': 'bg-blue-900/50 text-blue-300 border-blue-800',
    'review': 'bg-yellow-900/50 text-yellow-300 border-yellow-800',
    'not_started': 'bg-gray-800 text-gray-400 border-gray-700',
    'blocked': 'bg-red-900/50 text-red-300 border-red-800'
  };

  const priorityColors = {
    'critical': 'text-red-400',
    'high': 'text-orange-400',
    'medium': 'text-blue-400',
    'low': 'text-green-400'
  };

  return (
    <div className="flex items-center p-4 bg-gray-900/30 rounded-lg border border-gray-800/50 hover:bg-gray-900/50 transition-all duration-300">
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-white truncate">{task.title}</h4>
        <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <Building className="w-3 h-3" />
            {task.framework}
          </span>
          <span className="flex items-center gap-1">
            <User className="w-3 h-3" />
            {task.assignee}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {task.dueDate}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <div className="text-sm font-medium text-white">{task.progress}%</div>
          <Progress value={task.progress} className="w-16 h-2" />
        </div>
        <Badge variant="outline" className={statusColors[task.status]}>
          {task.status.replace('_', ' ')}
        </Badge>
        <div className={`font-medium text-sm ${priorityColors[task.priority]}`}>
          {task.priority.toUpperCase()}
        </div>
      </div>
    </div>
  );
};

const DemoIntegrationCard = ({ integration }) => {
  const statusColors = {
    'compliant': 'bg-green-900/50 text-green-300 border-green-800',
    'partial': 'bg-yellow-900/50 text-yellow-300 border-yellow-800',
    'non_compliant': 'bg-red-900/50 text-red-300 border-red-800'
  };

  const riskColors = {
    'low': 'text-green-400',
    'medium': 'text-yellow-400',
    'high': 'text-red-400'
  };

  return (
    <Card className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-all duration-300 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h4 className="font-bold text-white">{integration.name}</h4>
            <p className="text-sm text-gray-400">{integration.vendor}</p>
            <p className="text-xs text-gray-500 capitalize">{integration.category.replace('_', ' ')}</p>
          </div>
          <Badge variant="outline" className={statusColors[integration.status]}>
            {integration.status.replace('_', ' ')}
          </Badge>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Risk Level:</span>
            <span className={`font-medium ${riskColors[integration.risk]}`}>
              {integration.risk.toUpperCase()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Data Processing:</span>
            <span className="text-sm font-medium text-gray-300 capitalize">
              {integration.dataProcessing}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Last Reviewed:</span>
            <span className="text-sm text-gray-300">{integration.lastReviewed}</span>
          </div>
          <div className="pt-2">
            <div className="text-xs text-gray-400 mb-2">Certifications:</div>
            <div className="flex flex-wrap gap-1">
              {integration.certifications.map((cert, index) => (
                <Badge key={index} variant="outline" className="text-xs bg-gray-800 text-gray-300 border-gray-600">
                  {cert}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function DemoLiveDashboard() {
  const [activeView, setActiveView] = useState('overview');

  const getTasksByStatus = (status) => {
    return enterpriseData.tasks.filter(task => task.status === status);
  };

  return (
    <div className="min-h-screen relative">
      <WaveBackground />
      
      {/* Simple Header */}
      <div className="relative z-10 bg-black/80 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-white" />
              <h1 className="text-2xl font-light text-white">AkinSec Dashboard</h1>
            </div>
            <div className="flex gap-3">
              <Link to={createPageUrl('Home')}>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-gray-600 text-gray-300 hover:bg-gray-900 hover:text-white"
                >
                  ← Back to Home
                </Button>
              </Link>
              <Link to={createPageUrl('Pricing')}>
                <Button 
                  size="sm"
                  className="bg-white text-black hover:bg-gray-100"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        {/* Dashboard Content */}
        <section className="py-12 bg-black/30 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h2 className="text-3xl font-light text-white mb-2">Security Dashboard</h2>
                <p className="text-gray-400">Real-time security monitoring and compliance status</p>
              </div>
              <div className="flex gap-3 self-start md:self-center">
                <Button variant="outline" className="gap-2 border-gray-600 text-gray-300 hover:bg-gray-900 hover:text-white">
                  <Filter className="w-4 h-4" />
                  Filter
                </Button>
                <Button variant="outline" className="gap-2 border-gray-600 text-gray-300 hover:bg-gray-900 hover:text-white">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
                <Button className="bg-white text-black hover:bg-gray-100 gap-2">
                  <Plus className="w-4 h-4" />
                  New Task
                </Button>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <DemoMetric
                icon={Shield}
                label="Compliance Score"
                value={`${enterpriseData.complianceScore}%`}
                change="+5% this month"
                color="text-green-400"
              />
              <DemoMetric
                icon={CheckCircle}
                label="Active Tasks"
                value={enterpriseData.tasks.filter(t => t.status !== 'completed').length}
                change="3 completed today"
                color="text-blue-400"
              />
              <DemoMetric
                icon={Network}
                label="Integrations"
                value={enterpriseData.integrations.length}
                change="2 new this week"
                color="text-purple-400"
              />
              <DemoMetric
                icon={AlertTriangle}
                label="Risk Items"
                value={enterpriseData.integrations.filter(i => i.risk === 'high').length + enterpriseData.tasks.filter(t => t.status === 'blocked').length}
                change="2 resolved"
                color="text-amber-400"
              />
            </div>
          </div>
        </section>

        {/* Main Content Tabs */}
        <section className="py-24 bg-black">
          <div className="container mx-auto px-6">
            <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 max-w-2xl mb-8 bg-gray-900/50 border-gray-800">
                <TabsTrigger value="overview" className="gap-2 text-xs sm:text-sm text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-800">
                  <TrendingUp className="w-4 h-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="tasks" className="gap-2 text-xs sm:text-sm text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-800">
                  <CheckCircle className="w-4 h-4" />
                  Tasks
                </TabsTrigger>
                <TabsTrigger value="integrations" className="gap-2 text-xs sm:text-sm text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-800">
                  <Network className="w-4 h-4" />
                  Integrations
                </TabsTrigger>
                <TabsTrigger value="frameworks" className="gap-2 text-xs sm:text-sm text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-800">
                  <BarChart3 className="w-4 h-4" />
                  Frameworks
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <Card className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-all duration-300 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-white">
                          <Target className="w-5 h-5 text-blue-400" />
                          Framework Progress
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {enterpriseData.frameworks.map((framework, index) => (
                            <div key={index}>
                              <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-3">
                                  <span className="font-semibold text-white">{framework.name}</span>
                                  <Badge variant="outline" className="text-xs bg-gray-800 text-gray-300 border-gray-600">
                                    Due {framework.dueDate}
                                  </Badge>
                                </div>
                                <span className="text-sm text-gray-400">{framework.progress}%</span>
                              </div>
                              <Progress value={framework.progress} className="h-3 mb-2" />
                              <p className="text-xs text-gray-500">{framework.tasks} tasks complete</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-6">
                    {/* Risk Alert */}
                    <Card className="bg-red-900/20 border-red-800/50 shadow-lg">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-red-300">
                          <AlertTriangle className="w-5 h-5" />
                          Risk Alerts
                          <Badge variant="outline" className="bg-red-900/50 text-red-300 border-red-800 ml-auto">
                            2
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="p-3 bg-gray-900/50 rounded border border-red-800/30">
                          <p className="font-medium text-sm text-white">Intercom Support</p>
                          <p className="text-xs text-red-400">Non-compliant integration</p>
                        </div>
                        <div className="p-3 bg-gray-900/50 rounded border border-red-800/30">
                          <p className="font-medium text-sm text-white">Vendor Security Assessment</p>
                          <p className="text-xs text-red-400">Blocked task - overdue</p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Quick Stats */}
                    <Card className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-all duration-300 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-lg text-white">Quick Stats</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-400">This Quarter</span>
                          <span className="font-bold text-green-400">+12%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Avg Response Time</span>
                          <span className="font-bold text-blue-400">2.1 days</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Team Performance</span>
                          <span className="font-bold text-white">94%</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
            </div>
          </TabsContent>

              {/* Tasks Tab */}
              <TabsContent value="tasks" className="space-y-6">
                <div className="grid md:grid-cols-4 gap-4 mb-6">
                  <Card className="bg-gray-900/50 border-gray-800 text-center p-4">
                    <div className="text-2xl font-bold text-white">{getTasksByStatus('not_started').length}</div>
                    <div className="text-sm text-gray-400">Not Started</div>
                  </Card>
                  <Card className="bg-blue-900/20 border-blue-800/50 text-center p-4">
                    <div className="text-2xl font-bold text-blue-400">{getTasksByStatus('in_progress').length}</div>
                    <div className="text-sm text-blue-300">In Progress</div>
                  </Card>
                  <Card className="bg-yellow-900/20 border-yellow-800/50 text-center p-4">
                    <div className="text-2xl font-bold text-yellow-400">{getTasksByStatus('review').length}</div>
                    <div className="text-sm text-yellow-300">In Review</div>
                  </Card>
                  <Card className="bg-green-900/20 border-green-800/50 text-center p-4">
                    <div className="text-2xl font-bold text-green-400">{getTasksByStatus('completed').length}</div>
                    <div className="text-sm text-green-300">Completed</div>
                  </Card>
                </div>

                <Card className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-all duration-300 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Recent Tasks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {enterpriseData.tasks.map((task) => (
                        <DemoTaskRow key={task.id} task={task} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Integrations Tab */}
              <TabsContent value="integrations" className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <Card className="bg-green-900/20 border-green-800/50 text-center p-4">
                    <div className="text-2xl font-bold text-green-400">
                      {enterpriseData.integrations.filter(i => i.status === 'compliant').length}
                    </div>
                    <div className="text-sm text-green-300">Compliant</div>
                  </Card>
                  <Card className="bg-yellow-900/20 border-yellow-800/50 text-center p-4">
                    <div className="text-2xl font-bold text-yellow-400">
                      {enterpriseData.integrations.filter(i => i.status === 'partial').length}
                    </div>
                    <div className="text-sm text-yellow-300">Partial Compliance</div>
                  </Card>
                  <Card className="bg-red-900/20 border-red-800/50 text-center p-4">
                    <div className="text-2xl font-bold text-red-400">
                      {enterpriseData.integrations.filter(i => i.status === 'non_compliant').length}
                    </div>
                    <div className="text-sm text-red-300">Non-Compliant</div>
                  </Card>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {enterpriseData.integrations.map((integration, index) => (
                    <DemoIntegrationCard key={index} integration={integration} />
                  ))}
                </div>
              </TabsContent>

              {/* Frameworks Tab */}
              <TabsContent value="frameworks" className="space-y-6">
                <div className="grid gap-6">
                  {enterpriseData.frameworks.map((framework, index) => (
                    <Card key={index} className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-all duration-300 backdrop-blur-sm">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl text-white">{framework.name}</CardTitle>
                            <p className="text-gray-400">Due: {framework.dueDate}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-bold text-blue-400">{framework.progress}%</div>
                            <p className="text-sm text-gray-400">{framework.tasks} complete</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Progress value={framework.progress} className="h-4" />
                        <div className="flex justify-between items-center mt-4">
                          <Badge variant="outline" className="capitalize bg-gray-800 text-gray-300 border-gray-600">
                            {framework.status.replace('_', ' ')}
                          </Badge>
                          <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-900 hover:text-white">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      
        {/* CTA Section */}
        <section className="py-24 bg-white relative z-10">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-light text-black mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
              This is just a preview. Get full access to enterprise features with a free trial.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl('Pricing')}>
                <Button 
                  size="lg" 
                  className="bg-black text-white hover:bg-gray-800 px-8 py-3 text-base font-medium rounded-none border-0 transition-all duration-200"
                >
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to={createPageUrl('Contact')}>
                <div className="wave-button-container">
                  <span>Schedule Demo</span>
                  <div className="wave"></div>
                </div>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
