
import React from 'react';
import { 
  Shield, 
  Users, 
  Zap,
  Sparkles,
  Target,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { createPageUrl } from '@/utils/index.js';
import WaveBackground from '@/components/WaveBackground';

// Ultra-minimal hero section
const HeroSection = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-transparent overflow-hidden">
      <div className="container mx-auto px-6 text-center relative z-10 max-w-6xl">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-block p-4 bg-gray-900/50 rounded-full mb-6 backdrop-blur-sm">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl md:text-7xl font-light text-white mb-6 leading-none tracking-tight">
            About AkinSec
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            We're building the future of compliance management—accessible, automated, and intelligent for teams of any size.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to={createPageUrl('Contact')}>
              <Button 
                size="lg" 
                className="bg-white text-black hover:bg-gray-100 px-8 py-3 text-base font-medium rounded-none border-0 transition-all duration-200 group backdrop-blur-sm"
              >
                Talk to us
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to={createPageUrl('Pricing')}>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-gray-600 text-gray-300 hover:bg-gray-900 hover:text-white px-8 py-3 text-base font-medium rounded-none transition-all duration-200 backdrop-blur-sm"
              >
                Get started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

// Clean mission section
const MissionSection = () => {
  return (
    <section className="py-24 bg-black/30 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          <div className="lg:col-span-2">
            <Card className="bg-gray-900/50 border-gray-800 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center gap-2 mb-4 text-white">
                  <Target className="w-5 h-5" />
                  <span className="text-sm font-medium">Our Mission</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-light text-white mb-6">Democratize Compliance</h2>
                <p className="text-lg text-gray-400 mb-6 leading-relaxed">
                  Compliance shouldn't stall innovation. We empower teams to meet and maintain standards with clarity, speed, and confidence.
                </p>
                <p className="text-lg text-gray-400 leading-relaxed">
                  By combining automation, templates, and AI-driven guidance, AkinSec turns compliance from a reactive burden into a proactive advantage.
                </p>
              </CardContent>
            </Card>
          </div>
          <Card className="bg-gray-900/50 border-gray-800 shadow-lg">
            <CardContent className="p-8 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-xl font-medium text-white mb-6">Impact in numbers</h3>
                <ul className="space-y-4">
                  <li className="flex items-center justify-between">
                    <span className="text-gray-400">Average setup time</span>
                    <span className="text-white font-medium">&lt; 1 day</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-gray-400">Policy templates</span>
                    <span className="text-white font-medium">50+</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-gray-400">Framework coverage</span>
                    <span className="text-white font-medium">SOC 2, ISO 27001, more</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 flex items-center gap-2 text-gray-400">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">Focused on meaningful outcomes</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

// Clean values section
const ValuesSection = () => {
  const values = [
    {
      icon: Shield,
      title: "Security First",
      description: "We prioritize the security of our platform and our customers' data above all else."
    },
    {
      icon: Users,
      title: "Customer Success", 
      description: "Your success is our success. We're committed to helping you achieve your compliance goals."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We continuously innovate to stay ahead of evolving compliance requirements and threats."
    }
  ];

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-white mb-4">Our Values</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-700 transition-colors duration-300">
                  <value.icon className="w-8 h-8 text-gray-400 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-medium text-white mb-4">{value.title}</h3>
                <p className="text-gray-400 leading-relaxed">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Clean timeline section
const TimelineSection = () => {
  const milestones = [
    {
      year: "2024",
      title: "AkinSec begins",
      description: "We started with a simple idea: make compliance simple and approachable for every team.",
      side: "right"
    },
    {
      year: "2024", 
      title: "First templates ship",
      description: "We launched a growing library of policy templates to help teams move faster.",
      side: "left"
    },
    {
      year: "2025",
      title: "AI-assisted workflows", 
      description: "Automations and AI guidance reduce repetitive work and help teams stay audit-ready.",
      side: "right"
    }
  ];

  return (
    <section className="py-24 bg-black/30 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-white mb-4">Our Journey</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Key moments that shaped AkinSec
          </p>
        </div>
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-1/2 -translate-x-1/2 h-full w-px bg-gray-700" />
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative">
                <div className="absolute left-1/2 -translate-x-1/2 -top-2 w-4 h-4 rounded-full bg-white" />
                <Card className={`bg-gray-900/50 border-gray-800 shadow-lg max-w-[45%] ${milestone.side === 'left' ? 'mr-auto' : 'ml-auto'}`}>
                  <CardContent className="p-6">
                    <div className="text-sm text-gray-400 mb-2">{milestone.year}</div>
                    <h4 className="font-medium text-white mb-2">{milestone.title}</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">{milestone.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Minimal CTA
const CTASection = () => {
  return (
    <section className="py-24 bg-white relative z-10">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-light text-black mb-6">
          Join Us in Building the Future
        </h2>
        <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
          Ready to transform your compliance program? Let's work together to make security and compliance accessible to everyone.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to={createPageUrl('Contact')}>
            <Button 
              size="lg" 
              className="bg-black text-white hover:bg-gray-800 px-8 py-3 text-base font-medium rounded-none border-0 transition-all duration-200"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link to={createPageUrl('Careers')}>
            <div className="wave-button-container">
              <span>View Careers</span>
              <div className="wave"></div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default function AboutPage() {
  return (
    <div className="min-h-screen relative">
      <WaveBackground />
      <HeroSection />
      <MissionSection />
      <ValuesSection />
      <TimelineSection />
      <CTASection />
    </div>
  );
}
