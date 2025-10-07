import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, FileText, Calendar, AlertTriangle } from 'lucide-react';
import WaveBackground from '@/components/WaveBackground';

export default function TermsPage() {
  return (
    <div className="min-h-screen relative">
      <WaveBackground />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-transparent overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10 max-w-6xl">
          <div className="transition-all duration-1000 opacity-100 translate-y-0">
            <Badge variant="outline" className="mb-6 border-gray-600 text-gray-300 font-medium py-1 px-3 rounded-none">
              Legal & Terms
            </Badge>
            <h1 className="text-6xl md:text-8xl font-light text-white mb-8 leading-none tracking-tight">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              These terms govern your use of AkinSec's cybersecurity platform and services.
            </p>
            <p className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-black/30 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="space-y-8">
            
            {/* Acceptance of Terms */}
            <Card className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-all duration-300 hover:border-gray-700 group">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl text-white">
                  <FileText className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  Acceptance of Terms
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-400">
                  By accessing and using AkinSec's cybersecurity platform, you agree to be bound by these Terms of Service. 
                  If you do not agree to these terms, please do not use our service.
                </p>
                <p className="text-gray-400">
                  These terms apply to all users of the service, including without limitation users who are security teams, 
                  IT administrators, vendors, customers, and/or contributors of content.
                </p>
              </CardContent>
            </Card>

            {/* Service Description */}
            <Card className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-all duration-300 hover:border-gray-700 group">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl text-white">
                  <Shield className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  Service Description
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-400 mb-4">
                  AkinSec provides a comprehensive cybersecurity platform that includes:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-400 ml-4">
                  <li>AI-powered security analysis and threat detection</li>
                  <li>Automated security task management and incident response</li>
                  <li>Security policy templates and best practices library</li>
                  <li>Vendor security assessment and integration monitoring</li>
                  <li>Real-time security reporting and threat intelligence</li>
                  <li>Compliance management and audit preparation tools</li>
                  <li>Customer support and security training resources</li>
                </ul>
              </CardContent>
            </Card>

            {/* User Responsibilities */}
            <Card className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-all duration-300 hover:border-gray-700 group">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl text-white">
                  <AlertTriangle className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  User Responsibilities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-400 mb-4">
                  As a user of AkinSec, you are responsible for:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-400 ml-4">
                  <li>Providing accurate and complete information when creating your account</li>
                  <li>Maintaining the security of your account credentials</li>
                  <li>Ensuring you have the right to upload and process security data through our service</li>
                  <li>Complying with all applicable cybersecurity laws and regulations</li>
                  <li>Not using the service for any illegal or unauthorized security activities</li>
                  <li>Not interfering with or disrupting the service or servers</li>
                </ul>
              </CardContent>
            </Card>

            {/* Data and Privacy */}
            <Card className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-all duration-300 hover:border-gray-700 group">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl text-white">
                  <Shield className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  Data and Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-400 mb-4">
                  Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy.
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-400 ml-4">
                  <li>We implement enterprise-grade security measures to protect your data</li>
                  <li>We do not sell your personal or security information to third parties</li>
                  <li>You retain ownership of your data and security content</li>
                  <li>We may use anonymized security data for platform improvement</li>
                  <li>You can request deletion of your data at any time</li>
                </ul>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-all duration-300 hover:border-gray-700 group">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl text-white">
                  <Calendar className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="space-y-2 text-gray-400">
                  <p><strong className="text-white">Email:</strong> legal@akinsec.com</p>
                  <p><strong className="text-white">Address:</strong> AkinSec, Inc.</p>
                  <p>123 Security Boulevard</p>
                  <p>Cybersecurity City, SC 12345</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
} 