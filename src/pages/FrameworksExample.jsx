import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, Shield, CheckCircle, Target, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils/index.js';

export default function FrameworksExample() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-blue-500/50 text-blue-600 font-semibold py-1 px-3">
            Compliance Frameworks
          </Badge>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Framework Management
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Manage and track progress across multiple compliance frameworks like SOC 2, GDPR, ISO 27001, and more.
          </p>
        </div>

        {/* Main Screenshot */}
        <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-2xl mb-12">
          <CardContent className="p-8">
            <div className="bg-gradient-to-br from-slate-100 to-blue-100 rounded-xl p-8 min-h-[500px]">
              <div className="text-center mb-8">
                <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Framework Overview</h3>
                <p className="text-slate-600">Visual representation of how frameworks are organized and tracked</p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {/* Sample Framework Cards */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="font-bold text-slate-900">SOC 2 Type II</h4>
                    <Shield className="w-5 h-5 text-blue-500" />
                  </div>
                  <p className="text-sm text-slate-600 mb-4">Security and availability controls for service organizations</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-bold">73%</span>
                    </div>
                    <Progress value={73} className="h-2" />
                    <p className="text-xs text-slate-500">11 of 15 tasks completed</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className="bg-blue-100 text-blue-800 text-xs">Security</Badge>
                    <Badge variant="outline" className="text-xs">Advanced</Badge>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="font-bold text-slate-900">GDPR</h4>
                    <Shield className="w-5 h-5 text-purple-500" />
                  </div>
                  <p className="text-sm text-slate-600 mb-4">General Data Protection Regulation compliance</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-bold">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                    <p className="text-xs text-slate-500">9 of 20 tasks completed</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className="bg-purple-100 text-purple-800 text-xs">Privacy</Badge>
                    <Badge variant="outline" className="text-xs">Intermediate</Badge>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="font-bold text-slate-900">ISO 27001</h4>
                    <Shield className="w-5 h-5 text-green-500" />
                  </div>
                  <p className="text-sm text-slate-600 mb-4">Information security management system standards</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-bold">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                    <p className="text-xs text-slate-500">23 of 25 tasks completed</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className="bg-green-100 text-green-800 text-xs">Security</Badge>
                    <Badge variant="outline" className="text-xs">Advanced</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                Progress Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                Visual progress bars and completion percentages help you track implementation status across all frameworks.
              </p>
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="text-sm text-slate-500 mb-2">Tracking features:</div>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• Task completion percentages</li>
                  <li>• Visual progress indicators</li>
                  <li>• Timeline estimates</li>
                  <li>• Milestone tracking</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Task Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                Each framework automatically generates relevant tasks and requirements, or you can create custom ones.
              </p>
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="text-sm text-slate-500 mb-2">Task features:</div>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• Auto-generated task lists</li>
                  <li>• Custom task creation</li>
                  <li>• Priority assignment</li>
                  <li>• Due date management</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                Compliance Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                Frameworks are organized by category and complexity level to help you choose the right ones for your organization.
              </p>
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="text-sm text-slate-500 mb-2">Categories:</div>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• Security frameworks</li>
                  <li>• Privacy regulations</li>
                  <li>• Industry-specific standards</li>
                  <li>• Operational frameworks</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="bg-blue-50 border-blue-200 shadow-lg">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">
              Start building your compliance program
            </h3>
            <p className="text-blue-700 mb-6 max-w-2xl mx-auto">
              Choose from pre-built framework templates or create custom ones tailored to your organization's needs.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to={createPageUrl('AppFrameworks')}>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Explore Frameworks <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to={createPageUrl('Tasks')}>
                <Button variant="outline" className="border-blue-200 hover:bg-blue-50">
                  View Task Management
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}