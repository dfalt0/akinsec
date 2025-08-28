
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

// Demo Components
const DemoMetric = ({ icon: Icon, label, value, change, color = "text-slate-900" }) => (
  <Card className="bg-white/90 backdrop-blur-sm border-slate-200/50 shadow-lg hover:shadow-xl transition-all">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-600">{label}</p>
          <p className={`text-3xl font-bold ${color} mb-1`}>{value}</p>
          {change && <p className="text-xs text-green-600 font-medium">{change}</p>}
        </div>
        <div className="p-3 bg-blue-50 rounded-xl">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const DemoTaskRow = ({ task }) => {
  const statusColors = {
    'completed': 'bg-green-100 text-green-800',
    'in_progress': 'bg-blue-100 text-blue-800',
    'review': 'bg-yellow-100 text-yellow-800',
    'not_started': 'bg-slate-100 text-slate-800',
    'blocked': 'bg-red-100 text-red-800'
  };

  const priorityColors = {
    'critical': 'text-red-600',
    'high': 'text-orange-600',
    'medium': 'text-blue-600',
    'low': 'text-green-600'
  };

  return (
    <div className="flex items-center p-4 bg-white/80 rounded-lg border border-slate-200/50 hover:shadow-md transition-all">
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-slate-900 truncate">{task.title}</h4>
        <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
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
          <div className="text-sm font-medium text-slate-900">{task.progress}%</div>
          <Progress value={task.progress} className="w-16 h-2" />
        </div>
        <Badge className={statusColors[task.status]}>
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
    'compliant': 'bg-green-100 text-green-800',
    'partial': 'bg-yellow-100 text-yellow-800',
    'non_compliant': 'bg-red-100 text-red-800'
  };

  const riskColors = {
    'low': 'text-green-600',
    'medium': 'text-yellow-600',
    'high': 'text-red-600'
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg hover:shadow-xl transition-all">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h4 className="font-bold text-slate-900">{integration.name}</h4>
            <p className="text-sm text-slate-600">{integration.vendor}</p>
            <p className="text-xs text-slate-500 capitalize">{integration.category.replace('_', ' ')}</p>
          </div>
          <Badge className={statusColors[integration.status]}>
            {integration.status.replace('_', ' ')}
          </Badge>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Risk Level:</span>
            <span className={`font-medium ${riskColors[integration.risk]}`}>
              {integration.risk.toUpperCase()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Data Processing:</span>
            <span className="text-sm font-medium text-slate-900 capitalize">
              {integration.dataProcessing}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Last Reviewed:</span>
            <span className="text-sm text-slate-900">{integration.lastReviewed}</span>
          </div>
          <div className="pt-2">
            <div className="text-xs text-slate-600 mb-2">Certifications:</div>
            <div className="flex flex-wrap gap-1">
              {integration.certifications.map((cert, index) => (
                <Badge key={index} variant="outline" className="text-xs">
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Demo Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">AkinSec Enterprise Demo</h1>
              <p className="text-blue-100 text-sm sm:text-base">Experience the full-featured compliance management platform</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link to={createPageUrl('Home')}>
              <Button variant="secondary" size="sm" className="w-full sm:w-auto">
                ← Back to Home
              </Button>
            </Link>
            <Link to={createPageUrl('Pricing')}>
              <Button variant="secondary" size="sm" className="w-full sm:w-auto">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Main Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Enterprise Dashboard</h2>
            <p className="text-slate-600">Comprehensive compliance management for Fortune 500</p>
          </div>
          <div className="flex gap-3 self-start md:self-center">
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
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
            color="text-green-600"
          />
          <DemoMetric
            icon={CheckCircle}
            label="Active Tasks"
            value={enterpriseData.tasks.filter(t => t.status !== 'completed').length}
            change="3 completed today"
            color="text-blue-600"
          />
          <DemoMetric
            icon={Network}
            label="Integrations"
            value={enterpriseData.integrations.length}
            change="2 new this week"
            color="text-purple-600"
          />
          <DemoMetric
            icon={AlertTriangle}
            label="Risk Items"
            value={enterpriseData.integrations.filter(i => i.risk === 'high').length + enterpriseData.tasks.filter(t => t.status === 'blocked').length}
            change="2 resolved"
            color="text-amber-600"
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 max-w-2xl mb-8 bg-white/80">
            <TabsTrigger value="overview" className="gap-2 text-xs sm:text-sm">
              <TrendingUp className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="tasks" className="gap-2 text-xs sm:text-sm">
              <CheckCircle className="w-4 h-4" />
              Tasks
            </TabsTrigger>
            <TabsTrigger value="integrations" className="gap-2 text-xs sm:text-sm">
              <Network className="w-4 h-4" />
              Integrations
            </TabsTrigger>
            <TabsTrigger value="frameworks" className="gap-2 text-xs sm:text-sm">
              <BarChart3 className="w-4 h-4" />
              Frameworks
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-blue-600" />
                      Framework Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {enterpriseData.frameworks.map((framework, index) => (
                        <div key={index}>
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-3">
                              <span className="font-semibold text-slate-900">{framework.name}</span>
                              <Badge variant="outline" className="text-xs">
                                Due {framework.dueDate}
                              </Badge>
                            </div>
                            <span className="text-sm text-slate-600">{framework.progress}%</span>
                          </div>
                          <Progress value={framework.progress} className="h-3 mb-2" />
                          <p className="text-xs text-slate-500">{framework.tasks} tasks complete</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {/* Risk Alert */}
                <Card className="bg-red-50 border-red-200 shadow-lg">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-red-900">
                      <AlertTriangle className="w-5 h-5" />
                      Risk Alerts
                      <Badge variant="secondary" className="bg-red-100 text-red-800 ml-auto">
                        2
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-white rounded border border-red-100">
                      <p className="font-medium text-sm text-slate-900">Intercom Support</p>
                      <p className="text-xs text-red-600">Non-compliant integration</p>
                    </div>
                    <div className="p-3 bg-white rounded border border-red-100">
                      <p className="font-medium text-sm text-slate-900">Vendor Security Assessment</p>
                      <p className="text-xs text-red-600">Blocked task - overdue</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-slate-600">This Quarter</span>
                      <span className="font-bold text-green-600">+12%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Avg Response Time</span>
                      <span className="font-bold text-blue-600">2.1 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Team Performance</span>
                      <span className="font-bold text-slate-900">94%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-6">
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <Card className="bg-white/80 text-center p-4">
                <div className="text-2xl font-bold text-slate-900">{getTasksByStatus('not_started').length}</div>
                <div className="text-sm text-slate-600">Not Started</div>
              </Card>
              <Card className="bg-blue-50 text-center p-4">
                <div className="text-2xl font-bold text-blue-600">{getTasksByStatus('in_progress').length}</div>
                <div className="text-sm text-blue-700">In Progress</div>
              </Card>
              <Card className="bg-yellow-50 text-center p-4">
                <div className="text-2xl font-bold text-yellow-600">{getTasksByStatus('review').length}</div>
                <div className="text-sm text-yellow-700">In Review</div>
              </Card>
              <Card className="bg-green-50 text-center p-4">
                <div className="text-2xl font-bold text-green-600">{getTasksByStatus('completed').length}</div>
                <div className="text-sm text-green-700">Completed</div>
              </Card>
            </div>

            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle>Recent Tasks</CardTitle>
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
              <Card className="bg-green-50 text-center p-4">
                <div className="text-2xl font-bold text-green-600">
                  {enterpriseData.integrations.filter(i => i.status === 'compliant').length}
                </div>
                <div className="text-sm text-green-700">Compliant</div>
              </Card>
              <Card className="bg-yellow-50 text-center p-4">
                <div className="text-2xl font-bold text-yellow-600">
                  {enterpriseData.integrations.filter(i => i.status === 'partial').length}
                </div>
                <div className="text-sm text-yellow-700">Partial Compliance</div>
              </Card>
              <Card className="bg-red-50 text-center p-4">
                <div className="text-2xl font-bold text-red-600">
                  {enterpriseData.integrations.filter(i => i.status === 'non_compliant').length}
                </div>
                <div className="text-sm text-red-700">Non-Compliant</div>
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
                <Card key={index} className="bg-white/80 backdrop-blur-sm shadow-lg">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{framework.name}</CardTitle>
                        <p className="text-slate-600">Due: {framework.dueDate}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-blue-600">{framework.progress}%</div>
                        <p className="text-sm text-slate-500">{framework.tasks} complete</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Progress value={framework.progress} className="h-4" />
                    <div className="flex justify-between items-center mt-4">
                      <Badge variant="outline" className="capitalize">
                        {framework.status.replace('_', ' ')}
                      </Badge>
                      <Button variant="outline" size="sm">
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
      
      {/* Call to Action */}
      <div className="content-section with-ship-animation">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white mt-8 relative overflow-hidden">
          {/* Business icons animation container */}
          <div className="ship-container">
            <div className="ship">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z" fill="#A5B4FC" stroke="#6366F1" strokeWidth="1"/>
                <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="ship">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="#86EFAC" stroke="#4ADE80" strokeWidth="1"/>
                <path d="M14 2V8H20" stroke="#4ADE80" strokeWidth="1"/>
                <path d="M16 13H8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M16 17H8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M10 9H9H8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="ship">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1"/>
                <path d="M12 6V12L16 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="ship">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#C4B5FD" stroke="#A78BFA" strokeWidth="1"/>
                <path d="M2 17L12 22L22 17" fill="#C4B5FD" stroke="#A78BFA" strokeWidth="1"/>
                <path d="M2 12L12 17L22 12" fill="#C4B5FD" stroke="#A78BFA" strokeWidth="1"/>
                <path d="M12 2V22" stroke="#A78BFA" strokeWidth="1"/>
              </svg>
            </div>
            <div className="ship">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10" stroke="#FCA5A5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="10" fill="none" stroke="#FCA5A5" strokeWidth="2"/>
              </svg>
            </div>
            <div className="ship">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="#99F6E4" stroke="#5EEAD4" strokeWidth="1"/>
                <path d="M12 4L10.5 8L6 9L10.5 10L12 14L13.5 10L18 9L13.5 8L12 4Z" fill="#F9A8D4" stroke="#F472B6" strokeWidth="1"/>
              </svg>
            </div>
          </div>
          
          {/* Text overlay to mute icons when they pass over text */}
          <div className="text-overlay"></div>
          
          <div className="max-w-7xl mx-auto p-8 text-center relative z-10">
              <h3 className="text-2xl font-bold mb-2 cta-text-glow">Ready to Get Started?</h3>
              <p className="text-blue-100 mb-6 cta-text-glow">
                This is just a preview. Get full access to enterprise features with a free trial.
              </p>
              <div className="flex justify-center gap-4">
                <Link to={createPageUrl('Pricing')}>
                  <Button size="lg" variant="secondary">
                    Start Free Trial
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to={createPageUrl('Contact')}>
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                    Schedule Demo
                  </Button>
                </Link>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
