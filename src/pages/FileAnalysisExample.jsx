import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, Shield, Upload, Target, Lightbulb, FileText, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils/index.js';

export default function FileAnalysisExample() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-purple-500/50 text-purple-600 font-semibold py-1 px-3">
            AI File Analysis
          </Badge>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            AI-Powered Compliance Analysis
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Upload any document and get instant AI-powered compliance insights, gap analysis, and recommendations.
          </p>
        </div>

        {/* Main Screenshot */}
        <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-2xl mb-12">
          <CardContent className="p-8">
            <div className="bg-gradient-to-br from-slate-100 to-purple-100 rounded-xl p-8 min-h-[600px]">
              <div className="text-center mb-8">
                <Shield className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 mb-2">File Analysis Interface</h3>
                <p className="text-slate-600">Drag and drop any file for instant compliance analysis</p>
              </div>
              
              <div className="max-w-4xl mx-auto space-y-8">
                {/* Upload Zone */}
                <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-dashed border-purple-300">
                  <div className="text-center">
                    <Upload className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-slate-900 mb-2">Upload File for Analysis</h4>
                    <p className="text-slate-600 mb-4">Drop your file here or click to browse</p>
                    <p className="text-sm text-slate-500">Supports PDF, Word, Excel, Images, and more</p>
                  </div>
                </div>

                {/* Sample Analysis Results */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                    <div className="text-3xl font-bold text-green-600 mb-1">87%</div>
                    <div className="text-sm text-slate-600">Compliance Score</div>
                    <Progress value={87} className="mt-2 h-2" />
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                    <Badge className="bg-yellow-100 text-yellow-800 mb-2">MEDIUM</Badge>
                    <div className="text-sm text-slate-600">Risk Level</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                    <Badge className="bg-blue-100 text-blue-800 mb-2">CONFIDENTIAL</Badge>
                    <div className="text-sm text-slate-600">Data Sensitivity</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">3</div>
                    <div className="text-sm text-slate-600">Frameworks</div>
                  </div>
                </div>

                {/* Sample Findings */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-6 shadow-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <Target className="w-5 h-5 text-green-600" />
                      <h4 className="font-semibold text-slate-900">Key Findings</h4>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 p-2 bg-green-50 rounded">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <p className="text-sm text-slate-700">Document includes proper access controls</p>
                      </div>
                      <div className="flex items-start gap-2 p-2 bg-green-50 rounded">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <p className="text-sm text-slate-700">Data retention policies are clearly defined</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-6 shadow-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-5 h-5 text-amber-600" />
                      <h4 className="font-semibold text-slate-900">Gaps Identified</h4>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 p-2 bg-amber-50 rounded">
                        <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                        <p className="text-sm text-slate-700">Missing incident response procedures</p>
                      </div>
                      <div className="flex items-start gap-2 p-2 bg-amber-50 rounded">
                        <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                        <p className="text-sm text-slate-700">Encryption requirements not specified</p>
                      </div>
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
                <Shield className="w-5 h-5 text-purple-600" />
                AI-Powered Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                Advanced AI analyzes your documents against multiple compliance frameworks and provides detailed insights.
              </p>
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="text-sm text-slate-500 mb-2">Analysis includes:</div>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• Document classification</li>
                  <li>• Framework alignment</li>
                  <li>• Risk assessment</li>
                  <li>• Gap identification</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Multiple File Types
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                Support for various file formats ensures you can analyze any document in your compliance program.
              </p>
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="text-sm text-slate-500 mb-2">Supported formats:</div>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• PDF documents</li>
                  <li>• Word documents</li>
                  <li>• Excel spreadsheets</li>
                  <li>• Images (PNG, JPG)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-600" />
                Actionable Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                Get specific, prioritized recommendations to improve your compliance posture and address identified gaps.
              </p>
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="text-sm text-slate-500 mb-2">Recommendations include:</div>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• Priority levels</li>
                  <li>• Implementation effort</li>
                  <li>• Specific action items</li>
                  <li>• Related requirements</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="bg-purple-50 border-purple-200 shadow-lg">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-purple-900 mb-4">
              See what your documents reveal about compliance
            </h3>
            <p className="text-purple-700 mb-6 max-w-2xl mx-auto">
              Upload any policy, contract, or procedure to get instant AI-powered insights and recommendations.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to={createPageUrl('FileAnalysis')}>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Try File Analysis <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to={createPageUrl('Templates')}>
                <Button variant="outline" className="border-purple-200 hover:bg-purple-50">
                  Browse Templates
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}