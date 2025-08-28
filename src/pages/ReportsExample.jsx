import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, BarChart3, Download, PieChart, TrendingUp, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils/index.js';

export default function ReportsExample() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-purple-500/50 text-purple-600 font-semibold py-1 px-3">
            Reporting & Analytics
          </Badge>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Actionable Compliance Reporting
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Generate insightful reports on your compliance posture, share progress with stakeholders, and prepare for audits with ease.
          </p>
        </div>

        {/* Main Screenshot */}
        <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-2xl mb-12">
          <CardContent className="p-8">
            <div className="bg-gradient-to-br from-slate-100 to-purple-100 rounded-xl p-8 min-h-[600px]">
              <div className="text-center mb-8">
                <BarChart3 className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Reporting Dashboard</h3>
                <p className="text-slate-600">Create and export customizable reports for any framework or time period</p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {/* Sample Chart Cards */}
                <div className="bg-white rounded-xl p-6 shadow-lg col-span-1 lg:col-span-2">
                    <h4 className="font-semibold text-slate-900 mb-4">Framework Progress</h4>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm mb-1"><span>SOC 2 Type II</span><span>92%</span></div>
                            <Progress value={92} />
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1"><span>ISO 27001</span><span>78%</span></div>
                            <Progress value={78} />
                        </div>
                         <div>
                            <div className="flex justify-between text-sm mb-1"><span>GDPR</span><span>95%</span></div>
                            <Progress value={95} />
                        </div>
                    </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                    <h4 className="font-semibold text-slate-900 mb-4">Task Status</h4>
                    <div className="flex items-center justify-center h-full">
                        <PieChart className="w-24 h-24 text-blue-400" />
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg col-span-1 lg:col-span-3">
                    <h4 className="font-semibold text-slate-900 mb-4">Compliance Score Over Time</h4>
                     <div className="flex items-center justify-center h-32">
                        <TrendingUp className="w-full h-24 text-green-500" />
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
                <BarChart3 className="w-5 h-5 text-purple-600" />
                Customizable Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                Build reports with the specific metrics, frameworks, and time periods that matter most to your organization.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5 text-blue-600" />
                Audit-Ready Exports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                Export professional, audit-ready reports in PDF or CSV format with a single click to satisfy auditor requests.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="w-5 h-5 text-green-600" />
                Stakeholder Sharing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                Easily share report summaries and dashboards with management, board members, or external partners.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="bg-purple-50 border-purple-200 shadow-lg">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-purple-900 mb-4">
              Gain full visibility into your compliance program
            </h3>
            <p className="text-purple-700 mb-6 max-w-2xl mx-auto">
              Turn complex compliance data into clear, actionable insights that drive better decision-making.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to={createPageUrl('DemoLive')}>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Explore Reporting <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to={createPageUrl('DemoLive')}>
                <Button variant="outline" className="border-purple-200 hover:bg-purple-50">
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