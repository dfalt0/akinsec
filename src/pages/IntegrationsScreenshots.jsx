import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Network, Shield, AlertTriangle, CheckCircle, Users, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils/index.js';

export default function IntegrationsScreenshots() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-purple-500/50 text-purple-600 font-semibold py-1 px-3">
            Integration Auditing
          </Badge>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Third-Party Integration Management
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Audit and manage your organization's third-party integrations to ensure compliance and minimize vendor risk.
          </p>
        </div>

        {/* Main Screenshot */}
        <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-2xl mb-12">
          <CardContent className="p-8">
            <div className="bg-gradient-to-br from-slate-100 to-purple-100 rounded-xl p-8 min-h-[600px]">
              <div className="text-center mb-8">
                <Network className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Integration Dashboard</h3>
                <p className="text-slate-600">Comprehensive view of all your third-party services and their compliance status</p>
              </div>
              
              <div className="max-w-5xl mx-auto space-y-6">
                {/* Stats Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                    <div className="text-2xl font-bold text-purple-600">24</div>
                    <div className="text-sm text-slate-600">Total Integrations</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                    <div className="text-2xl font-bold text-green-600">18</div>
                    <div className="text-sm text-slate-600">Compliant</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                    <div className="text-2xl font-bold text-amber-600">4</div>
                    <div className="text-sm text-slate-600">Need Review</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                    <div className="text-2xl font-bold text-red-600">2</div>
                    <div className="text-sm text-slate-600">High Risk</div>
                  </div>
                </div>

                {/* Sample Integration Cards */}
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-green-500">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-semibold text-slate-900">Google Workspace</h4>
                          <Badge className="bg-green-100 text-green-800">Compliant</Badge>
                          <Badge variant="outline" className="text-xs">Productivity</Badge>
                        </div>
                        <p className="text-slate-600 mb-3">Google LLC - Cloud productivity and collaboration tools</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-green-600" />
                            <span className="text-slate-600">Risk: Low</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-blue-600" />
                            <span className="text-slate-600">SOC 2, ISO 27001</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-purple-600" />
                            <span className="text-slate-600">Data: Extensive</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-amber-600" />
                            <span className="text-slate-600">Reviewed: 2 weeks ago</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Review</Button>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-amber-500">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-semibold text-slate-900">Slack</h4>
                          <Badge className="bg-amber-100 text-amber-800">Review Needed</Badge>
                          <Badge variant="outline" className="text-xs">Communication</Badge>
                        </div>
                        <p className="text-slate-600 mb-3">Slack Technologies - Team communication and collaboration platform</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-amber-600" />
                            <span className="text-slate-600">Risk: Medium</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-blue-600" />
                            <span className="text-slate-600">SOC 2</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-purple-600" />
                            <span className="text-slate-600">Data: Moderate</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-red-600" />
                            <span className="text-slate-600">Reviewed: 3 months ago</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="border-amber-200 text-amber-700">Review</Button>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-red-500">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-semibold text-slate-900">Custom Analytics Tool</h4>
                          <Badge className="bg-red-100 text-red-800">High Risk</Badge>
                          <Badge variant="outline" className="text-xs">Analytics</Badge>
                        </div>
                        <p className="text-slate-600 mb-3">Unknown Vendor - Custom analytics solution with unclear compliance status</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-red-600" />
                            <span className="text-slate-600">Risk: Critical</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-red-600" />
                            <span className="text-slate-600">No certifications</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-red-600" />
                            <span className="text-slate-600">Data: Unknown</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-red-600" />
                            <span className="text-slate-600">Never reviewed</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="destructive" size="sm">Urgent Review</Button>
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
                <Shield className="w-5 h-5 text-green-600" />
                Risk Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                Automatically assess and categorize the risk level of each integration based on data access and compliance status.
              </p>
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="text-sm text-slate-500 mb-2">Risk factors:</div>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• Data processing level</li>
                  <li>• Certification status</li>
                  <li>• Access permissions</li>
                  <li>• Vendor reputation</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                Compliance Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                Track compliance certifications, review schedules, and contract expiration dates for all your integrations.
              </p>
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="text-sm text-slate-500 mb-2">Tracking includes:</div>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• SOC 2 compliance status</li>
                  <li>• ISO 27001 certification</li>
                  <li>• GDPR compliance</li>
                  <li>• Custom requirements</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                Review Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                Schedule regular reviews and get alerts when integrations need attention or when contracts are expiring.
              </p>
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="text-sm text-slate-500 mb-2">Review features:</div>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• Automated review reminders</li>
                  <li>• Contract expiration alerts</li>
                  <li>• Review history tracking</li>
                  <li>• Action item management</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="bg-purple-50 border-purple-200 shadow-lg">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-purple-900 mb-4">
              Take control of your vendor ecosystem
            </h3>
            <p className="text-purple-700 mb-6 max-w-2xl mx-auto">
              Identify, assess, and manage compliance risks across all your third-party integrations in one centralized platform.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to={createPageUrl('Integrations')}>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Audit Integrations <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to={createPageUrl('Dashboard')}>
                <Button variant="outline" className="border-purple-200 hover:bg-purple-50">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}