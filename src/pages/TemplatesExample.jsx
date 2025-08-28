import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, FileText, Download, Clock, Star, CheckSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils/index.js';

export default function TemplatesExample() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-blue-500/50 text-blue-600 font-semibold py-1 px-3">
            Compliance Templates
          </Badge>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Template Library
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Pre-built policies, procedures, forms, and checklists to accelerate your compliance program implementation.
          </p>
        </div>

        {/* Main Screenshot */}
        <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-2xl mb-12">
          <CardContent className="p-8">
            <div className="bg-gradient-to-br from-slate-100 to-blue-100 rounded-xl p-8 min-h-[500px]">
              <div className="text-center mb-8">
                <FileText className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Template Gallery</h3>
                <p className="text-slate-600">Browse and customize pre-built compliance documents</p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {/* Sample Template Cards */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <FileText className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="text-xs text-slate-500">SOC 2</div>
                    </div>
                    <Badge className="bg-green-100 text-green-800 text-xs">Easy</Badge>
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">Information Security Policy</h4>
                  <p className="text-sm text-slate-600 mb-3">Comprehensive security policy template covering access controls, data protection, and incident response.</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                    <Clock className="w-3 h-3" />
                    <span>30-45 minutes</span>
                  </div>
                  <div className="flex gap-1 mb-4">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">Policy</Badge>
                    <Badge variant="outline" className="text-xs">Security</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 text-xs">Use Template</Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <CheckSquare className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="text-xs text-slate-500">GDPR</div>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800 text-xs">Medium</Badge>
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">Data Processing Assessment</h4>
                  <p className="text-sm text-slate-600 mb-3">GDPR compliance checklist for evaluating data processing activities and privacy risks.</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                    <Clock className="w-3 h-3" />
                    <span>1-2 hours</span>
                  </div>
                  <div className="flex gap-1 mb-4">
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800 text-xs">Assessment</Badge>
                    <Badge variant="outline" className="text-xs">Privacy</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 text-xs">Use Template</Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Star className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="text-xs text-slate-500">ISO 27001</div>
                    </div>
                    <Badge className="bg-red-100 text-red-800 text-xs">Complex</Badge>
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">Risk Assessment Matrix</h4>
                  <p className="text-sm text-slate-600 mb-3">Comprehensive risk identification and assessment framework for information security management.</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                    <Clock className="w-3 h-3" />
                    <span>3-4 hours</span>
                  </div>
                  <div className="flex gap-1 mb-4">
                    <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">Assessment</Badge>
                    <Badge variant="outline" className="text-xs">Risk</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 text-xs">Use Template</Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-3 h-3" />
                    </Button>
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
                <FileText className="w-5 h-5 text-blue-600" />
                Document Types
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                Comprehensive library covering all essential compliance document types you need for your program.
              </p>
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="text-sm text-slate-500 mb-2">Available types:</div>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• Policies & Procedures</li>
                  <li>• Assessment Forms</li>
                  <li>• Compliance Checklists</li>
                  <li>• Audit Reports</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-600" />
                Time Estimates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                Each template includes estimated completion time and difficulty level to help you plan your workload.
              </p>
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="text-sm text-slate-500 mb-2">Difficulty levels:</div>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• Easy (15-45 minutes)</li>
                  <li>• Medium (1-2 hours)</li>
                  <li>• Complex (3+ hours)</li>
                  <li>• Expert guidance available</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5 text-purple-600" />
                Customization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                Templates are fully customizable and can be downloaded in multiple formats for your organization's needs.
              </p>
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="text-sm text-slate-500 mb-2">Export options:</div>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• Microsoft Word (.docx)</li>
                  <li>• PDF format</li>
                  <li>• Online form builder</li>
                  <li>• Custom branding</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="bg-blue-50 border-blue-200 shadow-lg">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">
              Accelerate your compliance documentation
            </h3>
            <p className="text-blue-700 mb-6 max-w-2xl mx-auto">
              Save weeks of work with our expertly crafted templates. Each one is reviewed by compliance professionals and regularly updated.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to={createPageUrl('Templates')}>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Browse Templates <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to={createPageUrl('Dashboard')}>
                <Button variant="outline" className="border-blue-200 hover:bg-blue-50">
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