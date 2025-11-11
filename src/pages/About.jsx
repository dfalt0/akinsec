
import React from 'react';
import { 
  Shield, 
  Users, 
  Zap,
  Target,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { createPageUrl } from '@/utils/index.js';
import WaveBackground from '@/components/WaveBackground';
import './Home.css';

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
          <h1 className="text-5xl md:text-7xl font-light text-white mb-6 leading-none tracking-tight">
            Who am I
          </h1>
            <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
              A mission to solve real security challenges for teams that need enterprise-grade protection but lack the budget for traditional solutions.
            </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to={createPageUrl('Contact')}>
              <Button 
                size="lg" 
                className="btn-primary-gradient px-8 py-3 text-base rounded-lg border-0 group relative"
              >
                <span className="relative z-10 flex items-center">
                  Talk to us
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </Link>
            <Link to={createPageUrl('Pricing')}>
              <Button 
                size="lg" 
                variant="outline" 
                className="btn-secondary-gradient px-8 py-3 text-base font-medium rounded-lg backdrop-blur-sm relative"
              >
                <span className="relative z-10">Get started</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

// Profile picture placeholder section
const ProfileSection = () => {
  return (
    <section className="py-16 bg-black/20 backdrop-blur-md relative z-10">
      <div className="container mx-auto px-6">
        <div className="flex justify-center">
          <div className="w-32 h-32 bg-gray-800 rounded-full flex items-center justify-center border-2 border-gray-700 hover:border-gray-600 transition-colors duration-300">
            <div className="text-gray-500 text-sm text-center">
              <div className="text-4xl mb-2">👤</div>
              <div>Profile Photo</div>
              <div className="text-xs mt-1">Coming Soon</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Clean mission section
const MissionSection = () => {
  return (
    <section className="py-24 bg-black/30 backdrop-blur-sm relative z-10">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          <div className="lg:col-span-2">
            <Card className="card-enhanced group">
              <CardContent className="p-8">
                <div className="flex items-center gap-2 mb-4 text-white">
                  <Target className="w-5 h-5" />
                  <span className="text-sm font-medium">Our Mission</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-light text-white mb-6">A Solo Founder's Mission</h2>
                <p className="text-lg text-gray-400 mb-6 leading-relaxed">
                  As a solo founder, I've experienced firsthand how compliance can become a bottleneck for innovation. I'm building AkinSec because I believe there's a real problem here that needs solving.
                </p>
                <p className="text-lg text-gray-400 leading-relaxed">
                  This isn't just another startup idea—it's a genuine attempt to democratize security automation and make compliance accessible to teams of all sizes. I'm convinced this business can be a real problem solver for organizations struggling with security complexity.
                </p>
              </CardContent>
            </Card>
          </div>
          <Card className="card-enhanced group h-full flex flex-col">
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
    <section className="py-24 bg-black/20 backdrop-blur-md relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-white mb-4">Our Values</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="card-enhanced group">
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
      year: "July 2025",
      title: "The idea takes shape",
      description: "As a solo founder, I recognized a real problem: compliance is too complex and time-consuming for most teams. I decided to build something that could genuinely help.",
      side: "right"
    },
    {
      year: "Aug 2025", 
      title: "Building the foundation",
      description: "Started developing the core platform with a focus on making security automation accessible and practical for real-world use cases.",
      side: "left"
    },
    {
      year: "Oct 2025",
      title: "The vision continues", 
      description: "Continuing to iterate and improve based on the belief that this business can solve real problems for organizations of all sizes.",
      side: "right"
    }
  ];

  return (
    <section className="py-24 bg-black/30 backdrop-blur-sm relative z-10">
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
                <Card className={`card-enhanced max-w-[45%] ${milestone.side === 'left' ? 'mr-auto' : 'ml-auto'}`}>
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
    <section className="py-24 bg-black/20 backdrop-blur-md relative z-10">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-light text-white mb-6">
          Join Me in Solving Real Problems
        </h2>
        <p className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto">
          As a solo founder, I'm building this because I believe in the problem we're solving. Ready to see if AkinSec can help your team? Let's explore how we can work together.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to={createPageUrl('Contact')}>
            <Button 
              size="lg" 
              className="btn-primary-gradient px-8 py-3 text-base rounded-lg border-0 group relative"
            >
              <span className="relative z-10 flex items-center">
                Get in Touch
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </Link>
          <Link to={createPageUrl('Careers')}>
            <Button 
              size="lg" 
              variant="outline" 
              className="btn-secondary-gradient px-8 py-3 text-base font-medium rounded-lg backdrop-blur-sm relative"
            >
              <span className="relative z-10">View Careers</span>
            </Button>
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
      <ProfileSection />
      <MissionSection />
      <ValuesSection />
      <TimelineSection />
      <CTASection />
    </div>
  );
}
