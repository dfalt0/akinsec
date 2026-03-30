import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, AlertTriangle } from 'lucide-react';
import { SectionIndex } from '@/components/marketing/SectionIndex';
import './Home.css';

export default function TermsPage() {
  return (
    <div className="min-h-screen relative">
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-transparent">
        <div className="container relative z-10 mx-auto max-w-6xl px-6 text-center">
          <div className="transition-all duration-1000 translate-y-0 opacity-100">
            <div className="mb-6 mt-20 flex justify-center md:mt-28">
              <SectionIndex index={1} label="LEGAL" />
            </div>
            <h1 className="mb-8 text-5xl font-semibold leading-none tracking-tight text-foreground md:text-7xl">
              Terms of service
            </h1>
            <p className="mx-auto mb-12 max-w-2xl text-xl font-light leading-relaxed text-muted-foreground">
              These terms govern access to the AkinSec SIEM and security monitoring product (including GRC-oriented workflows in the same workspace).
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
                <CardTitle className="text-2xl text-white">
                  Acceptance of terms
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
                  AkinSec provides software for security monitoring and compliance operations, including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-400 ml-4">
                  <li>SIEM-style log ingestion, correlation, alerting, and investigation workflows in the product</li>
                  <li>Workspace for tasks, evidence, and framework mapping</li>
                  <li>Assisted analysis of policies and artifacts you upload</li>
                  <li>Integrations and vendor documentation you connect</li>
                  <li>Reporting exports for internal review or audit support</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-all duration-300 hover:border-gray-700 group">
              <CardHeader>
                <CardTitle className="text-2xl text-white">
                  Third-party AI providers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-400">
                  Where the product offers AI-assisted features, inference is typically performed by third-party providers (for example large language model APIs) using credentials or API keys you supply or authorize in the service. Unless we publish otherwise, AkinSec does not operate proprietary foundation-model infrastructure as the product core. Your agreements with those providers govern their processing of prompts and outputs; you are responsible for lawful use and for any fees they charge.
                </p>
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
                <CardTitle className="text-2xl text-white">
                  Data and privacy
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
                <CardTitle className="text-2xl text-white">
                  Contact
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