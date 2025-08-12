import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Book, 
  Search, 
  ChevronRight,
  Play,
  FileText,
  Users,
  Settings,
  Shield,
  Network,
  BarChart3,
  CheckSquare,
  Zap,
  Download,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils/index.js';

const DocSection = ({ icon: Icon, title, description, items, color = "text-blue-600", bgColor = "bg-blue-50" }) => (
  <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
    <CardHeader>
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-12 h-12 ${bgColor} rounded-xl flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
        <div>
          <CardTitle className="text-xl font-bold text-slate-900">{title}</CardTitle>
        </div>
      </div>
      <p className="text-slate-600">{description}</p>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 text-slate-500" />
              <div>
                <h4 className="font-medium text-slate-900">{item.title}</h4>
                <p className="text-sm text-slate-500">{item.description}</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

const QuickStartCard = ({ step, title, description, time, icon: Icon }) => (
  <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
    <CardContent className="p-6">
      <div className="flex items-start gap-4">
        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
          {step}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Icon className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-slate-900">{title}</h3>
            <Badge variant="outline" className="text-xs">{time}</Badge>
          </div>
          <p className="text-slate-600 text-sm">{description}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function DocumentationPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const documentationSections = [
    {
      icon: Play,
      title: "Getting Started",
      description: "Learn the basics of AkinSec and get up and running quickly.",
      color: "text-green-600",
      bgColor: "bg-green-50",
      items: [
        { title: "Account Setup", description: "Create your account and configure initial settings" },
        { title: "First Compliance Framework", description: "Add your first framework and understand the basics" },
        { title: "User Interface Overview", description: "Navigate the dashboard and key features" },
        { title: "Team Collaboration", description: "Invite team members and assign roles" }
      ]
    },
    {
      icon: BarChart3,
      title: "Dashboard & Analytics",
      description: "Understanding your compliance dashboard and key metrics.",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      items: [
        { title: "Compliance Score Calculation", description: "How your score is calculated and what it means" },
        { title: "Dashboard Widgets", description: "Customize and interpret dashboard information" },
        { title: "Progress Tracking", description: "Monitor framework implementation progress" },
        { title: "Risk Alerts", description: "Understanding and managing risk notifications" }
      ]
    },
    {
      icon: Shield,
      title: "Compliance Frameworks",
      description: "Managing and implementing compliance frameworks.",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      items: [
        { title: "Adding Frameworks", description: "How to add and configure compliance frameworks" },
        { title: "Framework Templates", description: "Using pre-built framework templates" },
        { title: "Custom Requirements", description: "Creating custom compliance requirements" },
        { title: "Progress Reporting", description: "Generate framework progress reports" }
      ]
    },
    {
      icon: CheckSquare,
      title: "Task Management",
      description: "Creating, assigning, and tracking compliance tasks.",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      items: [
        { title: "Creating Tasks", description: "How to create and structure compliance tasks" },
        { title: "Task Assignment", description: "Assign tasks to team members and track progress" },
        { title: "Task Categories", description: "Organize tasks by framework and priority" },
        { title: "Deadline Management", description: "Set and manage task deadlines effectively" }
      ]
    },
    {
      icon: FileText,
      title: "Templates & Documents",
      description: "Using and customizing compliance document templates.",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      items: [
        { title: "Template Library", description: "Browse and use pre-built compliance templates" },
        { title: "Document Customization", description: "Customize templates for your organization" },
        { title: "Evidence Management", description: "Organize and attach compliance evidence" },
        { title: "Document Export", description: "Export documents in various formats" }
      ]
    },
    {
      icon: Zap,
      title: "AI File Analysis",
      description: "Leverage AI to analyze compliance documents and get insights.",
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      items: [
        { title: "File Upload Process", description: "How to upload and analyze documents" },
        { title: "Analysis Results", description: "Understanding AI analysis results and recommendations" },
        { title: "Supported File Types", description: "Which file formats are supported" },
        { title: "Best Practices", description: "Tips for getting the most out of AI analysis" }
      ]
    },
    {
      icon: Network,
      title: "Integration Management",
      description: "Audit and manage third-party service integrations.",
      color: "text-teal-600",
      bgColor: "bg-teal-50",
      items: [
        { title: "Adding Integrations", description: "How to add and categorize third-party services" },
        { title: "Risk Assessment", description: "Evaluate and categorize integration risks" },
        { title: "Compliance Tracking", description: "Track vendor certifications and compliance" },
        { title: "Review Schedules", description: "Set up regular integration reviews" }
      ]
    },
    {
      icon: Users,
      title: "Team & Organization",
      description: "Managing users, roles, and organizational settings.",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      items: [
        { title: "User Management", description: "Add, remove, and manage team members" },
        { title: "Role Permissions", description: "Understanding user roles and permissions" },
        { title: "Organization Settings", description: "Configure organization-wide settings" },
        { title: "Team Collaboration", description: "Best practices for team collaboration" }
      ]
    }
  ];

  const quickStartSteps = [
    {
      step: 1,
      title: "Create Your Account",
      description: "Sign up and verify your email address to get started with AkinSec.",
      time: "2 min",
      icon: Users
    },
    {
      step: 2,
      title: "Choose Your Framework",
      description: "Select a compliance framework that matches your organization's needs.",
      time: "5 min",
      icon: Shield
    },
    {
      step: 3,
      title: "Upload Your First Document",
      description: "Use AI analysis to assess your current compliance documentation.",
      time: "3 min",
      icon: Zap
    },
    {
      step: 4,
      title: "Create Initial Tasks",
      description: "Generate or create tasks based on your compliance requirements.",
      time: "10 min",
      icon: CheckSquare
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-20 md:py-32 text-center bg-gradient-to-b from-background to-background/90">
        <div className="container mx-auto px-4">
          <Badge variant="outline" className="mb-4 border-blue-500/50 text-blue-600 font-semibold py-1 px-3 rounded-full">
            Documentation
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            AkinSec User Guide
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground mb-8">
            Complete documentation to help you master compliance management with AkinSec. From getting started to advanced features.
          </p>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground mb-8">
            This page is in development.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                placeholder="Search documentation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start Guide */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Quick Start Guide</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get up and running with AkinSec in under 20 minutes with our step-by-step guide.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {quickStartSteps.map((step, index) => (
              <QuickStartCard key={index} {...step} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Play className="w-4 h-4 mr-2" />
              Start Interactive Tutorial
            </Button>
          </div>
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Complete Documentation</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Detailed guides for every feature and aspect of the AkinSec platform.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {documentationSections.map((section, index) => (
              <DocSection key={index} {...section} />
            ))}
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Additional Resources</h2>
            <p className="text-lg text-muted-foreground">
              More ways to get help and stay updated with AkinSec.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Download className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">PDF Guides</h3>
                <p className="text-slate-600 mb-4">Download comprehensive PDF guides for offline reading.</p>
                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDFs
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Play className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Video Tutorials</h3>
                <p className="text-slate-600 mb-4">Watch step-by-step video guides for visual learners.</p>
                <Button variant="outline" className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Watch Videos
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Community Forum</h3>
                <p className="text-slate-600 mb-4">Connect with other users and get help from the community.</p>
                <Button variant="outline" className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Join Forum
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto bg-blue-50 border-blue-200 shadow-lg">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">
                Still Need Help?
              </h3>
              <p className="text-blue-700 mb-6">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <div className="flex gap-4 justify-center">
                <Link to={createPageUrl('Contact')}>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Contact Support
                  </Button>
                </Link>
                <Link to={createPageUrl('FAQ')}>
                  <Button variant="outline" className="border-blue-200 hover:bg-blue-50">
                    View FAQ
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}