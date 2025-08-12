
import React from 'react';
import { 
  Shield, 
  Users, 
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { createPageUrl } from '@/utils/index.js';

export default function AboutPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-20 md:py-32 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            About AkinSec
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
            We're building the future of compliance management, making it accessible, automated, and intelligent for businesses of all sizes.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              At AkinSec, we believe that compliance shouldn't be a barrier to business growth. Our mission is to democratize access to enterprise-grade compliance tools, making it possible for startups and small businesses to achieve the same level of security and trust as Fortune 500 companies.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We're committed to building intuitive, AI-powered solutions that transform compliance from a reactive burden into a proactive business advantage.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Our Values</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 text-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Security First</h3>
              <p className="text-muted-foreground">We prioritize the security of our platform and our customers' data above all else.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 text-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Customer Success</h3>
              <p className="text-muted-foreground">Your success is our success. We're committed to helping you achieve your compliance goals.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 text-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Innovation</h3>
              <p className="text-muted-foreground">We continuously innovate to stay ahead of evolving compliance requirements and threats.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Our Team</h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
              Meet the passionate professionals behind AkinSec, dedicated to revolutionizing compliance management.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">JD</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-1">John Doe</h3>
              <p className="text-accent mb-2">CEO & Founder</p>
              <p className="text-sm text-muted-foreground">Former security consultant with 15+ years in compliance and risk management.</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">JS</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-1">Jane Smith</h3>
              <p className="text-accent mb-2">CTO</p>
              <p className="text-sm text-muted-foreground">Expert in cloud security and AI, previously led engineering at major tech companies.</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">MJ</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-1">Mike Johnson</h3>
              <p className="text-accent mb-2">Head of Product</p>
              <p className="text-sm text-muted-foreground">Product leader with deep expertise in compliance frameworks and user experience design.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Join Us in Building the Future</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Ready to transform your compliance program? Let's work together to make security and compliance accessible to everyone.
          </p>
          <div className="flex justify-center gap-4">
            <Link to={createPageUrl('Contact')}>
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Get in Touch
              </Button>
            </Link>
            <Link to={createPageUrl('Careers')}>
              <Button size="lg" variant="outline">
                View Careers
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
