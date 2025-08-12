import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Mail, Calendar, Eye } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-20 md:py-32 text-center bg-gradient-to-b from-background to-background/90">
        <div className="container mx-auto px-4">
          <Badge variant="outline" className="mb-4 border-blue-500/50 text-blue-600 font-semibold py-1 px-3 rounded-full">
            Privacy & Security
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Privacy Policy
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground mb-8">
            Your privacy is important to us. This policy explains how AkinSec collects, uses, and protects your personal information.
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
            
            {/* Information We Collect */}
            <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Eye className="w-6 h-6 text-blue-600" />
                  Information We Collect
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Personal Information</h3>
                  <p className="text-slate-600 mb-4">
                    When you create an account with AkinSec, we collect:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                    <li>Full name and email address</li>
                    <li>Company or organization name</li>
                    <li>Job title and role information</li>
                    <li>Profile picture (if provided)</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Usage Data</h3>
                  <p className="text-slate-600 mb-4">
                    We automatically collect information about how you use our service:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                    <li>Login times and frequency of use</li>
                    <li>Features accessed and actions performed</li>
                    <li>IP address and browser information</li>
                    <li>Device type and operating system</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Compliance Data</h3>
                  <p className="text-slate-600 mb-4">
                    As part of our compliance management service, we process:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                    <li>Compliance frameworks and requirements</li>
                    <li>Task assignments and completion status</li>
                    <li>Documents and files uploaded for analysis</li>
                    <li>Integration information and audit results</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Information */}
            <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Shield className="w-6 h-6 text-green-600" />
                  How We Use Your Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-600 mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                  <li>Provide and maintain our compliance management services</li>
                  <li>Process and analyze uploaded documents using AI</li>
                  <li>Send notifications about tasks, deadlines, and compliance updates</li>
                  <li>Generate reports and analytics for your organization</li>
                  <li>Improve our platform and develop new features</li>
                  <li>Provide customer support and respond to inquiries</li>
                </ul>
              </CardContent>
            </Card>

            {/* Data Protection */}
            <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Shield className="w-6 h-6 text-red-600" />
                  Data Protection & Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-600 mb-4">
                  We implement industry-standard security measures to protect your data:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Access controls and authentication measures</li>
                  <li>Compliance with SOC 2, ISO 27001, and other security standards</li>
                  <li>Regular backups and disaster recovery procedures</li>
                </ul>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Mail className="w-6 h-6 text-blue-600" />
                  Contact Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <div className="space-y-2 text-slate-600">
                  <p><strong>Email:</strong> privacy@akinsec.com</p>
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