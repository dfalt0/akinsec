import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, BarChart3, CheckCircle, AlertTriangle, Network } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils/index.js';

export default function DashboardExample() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-blue-500/50 text-blue-600 font-semibold py-1 px-3">
            Dashboard Overview
          </Badge>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Compliance Dashboard
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Get a complete view of your compliance posture with real-time metrics, task tracking, and risk alerts.
          </p>
        </div>

        {/* Main Dashboard Screenshot */}
        <Card className="bg-card/80 backdrop-blur-sm border-slate-200/50 shadow-2xl mb-12">
          <CardContent className="p-8">
            <div className="bg-gradient-to-br from-slate-100 to-blue-100 rounded-xl p-8 min-h-[500px] flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-24 h-24 text-blue-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Dashboard Overview</h3>
                <p className="text-slate-600 mb-6 max-w-md">
                  This is where users see their compliance score, active tasks, integration status, and overdue items at a glance.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                  <div className="bg-card rounded-lg p-4 shadow-sm">
                    <div className="text-2xl font-bold text-green-600">85%</div>
                    <div className="text-sm text-slate-600">Compliance Score</div>
                  </div>
                  <div className="bg-card rounded-lg p-4 shadow-sm">
                    <div className="text-2xl font-bold text-blue-600">12</div>
                    <div className="text-sm text-slate-600">Active Tasks</div>
                  </div>
                  <div className="bg-card rounded-lg p-4 shadow-sm">
                    <div className="text-2xl font-bold text-purple-600">8</div>
                    <div className="text-sm text-slate-600">Integrations</div>
                  </div>
                  <div className="bg-card rounded-lg p-4 shadow-sm">
                    <div className="text-2xl font-bold text-amber-600">3</div>
                    <div className="text-sm text-slate-600">Overdue</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <Card className="bg-card/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Real-time Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                Monitor your compliance score, task completion rates, and progress across all frameworks in real-time.
              </p>
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="text-sm text-slate-500 mb-2">Features shown:</div>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• Compliance score calculation</li>
                  <li>• Task completion tracking</li>
                  <li>• Risk level indicators</li>
                  <li>• Monthly progress trends</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                Risk Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                Stay informed about overdue tasks, high-risk integrations, and compliance gaps that need attention.
              </p>
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="text-sm text-slate-500 mb-2">Alert types:</div>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• Overdue compliance tasks</li>
                  <li>• High-risk integrations</li>
                  <li>• Framework gaps</li>
                  <li>• Upcoming deadlines</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="w-5 h-5 text-purple-600" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                Access commonly used features quickly with one-click actions for creating documents and auditing integrations.
              </p>
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="text-sm text-slate-500 mb-2">Quick actions:</div>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• Create compliance documents</li>
                  <li>• Audit integrations</li>
                  <li>• Generate reports</li>
                  <li>• Add new tasks</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="bg-blue-50 border-blue-200 shadow-lg">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">
              Ready to see the dashboard in action?
            </h3>
            <p className="text-blue-700 mb-6 max-w-2xl mx-auto">
              Experience the full power of our compliance dashboard with real data and interactive features.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to={createPageUrl('Dashboard')}>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Try Live Dashboard <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to={createPageUrl('DemoLive')}>
                <Button variant="outline" className="border-blue-200 hover:bg-blue-50">
                  Watch Demo
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}