import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, FileText, Calendar, AlertTriangle } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-20 md:py-32 text-center bg-gradient-to-b from-background to-background/90">
        <div className="container mx-auto px-4">
          <Badge variant="outline" className="mb-4 border-blue-500/50 text-blue-600 font-semibold py-1 px-3 rounded-full">
            Legal & Terms
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Terms of Service
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground mb-8">
            These terms govern your use of AkinSec's compliance management platform and services.
          </p>
          <p className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-8">
            
            {/* Acceptance of Terms */}
            <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <FileText className="w-6 h-6 text-blue-600" />
                  Acceptance of Terms
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-600">
                  By accessing and using AkinSec's platform, you agree to be bound by these Terms of Service. 
                  If you do not agree to these terms, please do not use our service.
                </p>
                <p className="text-slate-600">
                  These terms apply to all users of the service, including without limitation users who are browsers, 
                  vendors, customers, merchants, and/or contributors of content.
                </p>
              </CardContent>
            </Card>

            {/* Service Description */}
            <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Shield className="w-6 h-6 text-green-600" />
                  Service Description
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-600 mb-4">
                  AkinSec provides a comprehensive compliance management platform that includes:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                  <li>AI-powered document analysis and compliance gap identification</li>
                  <li>Task management and workflow automation</li>
                  <li>Template library for policies and procedures</li>
                  <li>Integration auditing and vendor risk assessment</li>
                  <li>Reporting and analytics capabilities</li>
                  <li>Customer support and training resources</li>
                </ul>
              </CardContent>
            </Card>

            {/* User Responsibilities */}
            <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <AlertTriangle className="w-6 h-6 text-orange-600" />
                  User Responsibilities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-600 mb-4">
                  As a user of AkinSec, you are responsible for:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                  <li>Providing accurate and complete information when creating your account</li>
                  <li>Maintaining the security of your account credentials</li>
                  <li>Ensuring you have the right to upload and process documents through our service</li>
                  <li>Complying with all applicable laws and regulations</li>
                  <li>Not using the service for any illegal or unauthorized purpose</li>
                  <li>Not interfering with or disrupting the service or servers</li>
                </ul>
              </CardContent>
            </Card>

            {/* Data and Privacy */}
            <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Shield className="w-6 h-6 text-red-600" />
                  Data and Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-600 mb-4">
                  Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy.
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                  <li>We implement appropriate security measures to protect your data</li>
                  <li>We do not sell your personal information to third parties</li>
                  <li>You retain ownership of your data and content</li>
                  <li>We may use anonymized data for service improvement</li>
                  <li>You can request deletion of your data at any time</li>
                </ul>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Calendar className="w-6 h-6 text-blue-600" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="space-y-2 text-slate-600">
                  <p><strong>Email:</strong> legal@akinsec.com</p>
                  <p><strong>Address:</strong> AkinSec, Inc.</p>
                  <p>123 Compliance Street</p>
                  <p>Security City, SC 12345</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
} 