import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Mail, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils/index.js';

export default function CareersPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-20 md:py-32 text-center bg-gradient-to-b from-background to-background/90">
        <div className="container mx-auto px-4">
          <Badge variant="outline" className="mb-4 border-blue-500/50 text-blue-600 font-semibold py-1 px-3 rounded-full">
            Join Our Team
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Help Us Simplify Compliance
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground mb-8">
            We're building a team of passionate individuals dedicated to solving complex compliance challenges with innovative technology.
          </p>
        </div>
      </section>

      {/* No Openings Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-900">No Open Positions Currently</CardTitle>
              <CardDescription className="text-slate-600">
                Thank you for your interest in joining AkinSec.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 mb-6">
                We are not actively hiring for any roles at the moment. However, we are always on the lookout for talented individuals who are passionate about cybersecurity and compliance.
              </p>
              <p className="text-slate-700 mb-8">
                If you believe you would be a great fit for our team, please feel free to send your resume and a brief introduction to our HR department. We will keep your information on file for future opportunities.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Button asChild>
                  <a href="mailto:careers@akinsec.com" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Us Your Resume
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://www.linkedin.com/company/akinsec" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4" />
                    Follow us on LinkedIn
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why Work With Us Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Why Join AkinSec?</h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
              Be part of a team that is shaping the future of compliance.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Meaningful Work</h3>
              <p className="text-slate-600">
                Solve real-world problems and help businesses of all sizes navigate the complex world of compliance.
              </p>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Growth Opportunities</h3>
              <p className="text-slate-600">
                As a growing startup, we offer significant opportunities for professional development and career advancement.
              </p>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Collaborative Culture</h3>
              <p className="text-slate-600">
                Work in a supportive and collaborative environment where every voice is heard and valued.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}