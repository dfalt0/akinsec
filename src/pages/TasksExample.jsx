import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckSquare, ListTodo, User, Calendar, Bell, SlidersHorizontal, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils/index.js';

export default function TasksExample() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-blue-500/50 text-blue-600 font-semibold py-1 px-3">
            Task Management
          </Badge>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Automated Task Management
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Create, assign, and track all your compliance tasks in one centralized platform. Never miss a deadline again.
          </p>
        </div>

        {/* Main Screenshot */}
        <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-2xl mb-12">
          <CardContent className="p-8">
            <div className="bg-gradient-to-br from-slate-100 to-blue-100 rounded-xl p-8 min-h-[600px]">
              <div className="text-center mb-8">
                <ListTodo className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Compliance Task Board</h3>
                <p className="text-slate-600">Visualize your workflow with Kanban-style boards or a simple list view</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {/* Kanban Columns */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-700 text-center">To Do</h4>
                  <div className="bg-white rounded-lg p-4 shadow-md space-y-2">
                    <p className="font-semibold text-sm">Conduct Risk Assessment</p>
                    <Badge variant="outline" className="text-xs">ISO 27001</Badge>
                    <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                      <User className="w-3 h-3" /> <span>Alex</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-700 text-center">In Progress</h4>
                   <div className="bg-white rounded-lg p-4 shadow-md space-y-2">
                    <p className="font-semibold text-sm">Implement MFA Policy</p>
                    <Badge variant="outline" className="text-xs bg-red-100 text-red-800 border-red-200">High Priority</Badge>
                    <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                      <User className="w-3 h-3" /> <span>Sarah</span>
                    </div>
                  </div>
                   <div className="bg-white rounded-lg p-4 shadow-md space-y-2">
                    <p className="font-semibold text-sm">Update Privacy Policy</p>
                    <Badge variant="outline" className="text-xs">GDPR</Badge>
                    <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                      <User className="w-3 h-3" /> <span>Michael</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-700 text-center">In Review</h4>
                   <div className="bg-white rounded-lg p-4 shadow-md space-y-2">
                    <p className="font-semibold text-sm">Employee Security Training</p>
                    <Badge variant="outline" className="text-xs">SOC 2</Badge>
                    <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                      <User className="w-3 h-3" /> <span>HR Team</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-700 text-center">Done</h4>
                   <div className="bg-white rounded-lg p-4 shadow-md space-y-2">
                    <p className="font-semibold text-sm line-through text-slate-500">Deploy Data Encryption</p>
                    <Badge variant="outline" className="text-xs">SOC 2</Badge>
                     <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                      <User className="w-3 h-3" /> <span>DevOps</span>
                    </div>
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
                <ListTodo className="w-5 h-5 text-blue-600" />
                Kanban & List Views
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                Choose between a visual Kanban board or a traditional list to manage your tasks in a way that suits your workflow.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-amber-600" />
                Automated Reminders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                Get automatic notifications for upcoming and overdue tasks to ensure deadlines are never missed.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-green-600" />
                Framework Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                Tasks are directly linked to compliance framework requirements, making it easy to track progress and gather evidence.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="bg-blue-50 border-blue-200 shadow-lg">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">
              Streamline your compliance workflow
            </h3>
            <p className="text-blue-700 mb-6 max-w-2xl mx-auto">
              Transform your compliance process from a manual burden into an automated, efficient system.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to={createPageUrl('DemoLive')}>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Try Task Management <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to={createPageUrl('DemoLive')}>
                <Button variant="outline" className="border-blue-200 hover:bg-blue-50">
                  View Live Demo
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}