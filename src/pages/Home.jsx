import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import WaveBackground from '@/components/WaveBackground';
import { 
  ArrowRight, 
  Shield, 
  Search, 
  AlertTriangle, 
  CheckCircle, 
  Zap, 
  BarChart3, 
  FileText, 
  Network, 
  Users, 
  Clock, 
  Target,
  Play,
  ChevronRight,
  Star,
  Globe,
  Lock,
  Eye,
  TrendingUp,
  Download
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils/index.js';


// Ultra-minimal hero section inspired by GreyNoise
const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-transparent overflow-hidden">
      <div className="container mx-auto px-6 text-center relative z-10 max-w-6xl">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Testing different additional text/taglines */}
          {/* Automated SOC-as-a-Service */}
          {/* Tagline above main headline */}
          {/* <p className="text-lg text-gray-400 mb-6 font-light tracking-wide">
            Automated SOC-as-a-Service
          </p> */}
          {/* Main headline - very clean */}
          <h1 className="text-6xl md:text-8xl font-light text-white mb-8 leading-none tracking-tight">
            AkinSec
          </h1>
          
          Automated SOC-as-a-Service
          {/* <h3 className="text-lg md:text-xl font-light text-gray-300 mb-6 tracking-wide">
            Automated SOC-as-a-Service
          </h3> */}
          {/* Subtitle - minimal */}
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            {/* AI-powered compliance intelligence for modern security teams */}
            AI-powered security intelligence for modern security teams.
          </p>
          
          {/* Simple CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to={createPageUrl('Pricing')}>
              <Button 
                size="lg" 
                className="bg-white text-black hover:bg-gray-100 px-8 py-3 text-base font-medium rounded-none border-0 transition-all duration-200 group backdrop-blur-sm"
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="https://app.akinsec.com">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-gray-600 text-gray-300 hover:bg-gray-900 hover:text-white px-8 py-3 text-base font-medium rounded-none transition-all duration-200 backdrop-blur-sm"
              >
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

// Ultra-minimal feature cards
const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <Card className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-all duration-300 hover:border-gray-700 group cursor-pointer">
        <CardContent className="p-8">
          <div className="w-8 h-8 text-gray-400 mb-6 group-hover:text-white transition-colors duration-300">
            <Icon className="w-full h-full" />
          </div>
          <h3 className="text-lg text-white font-medium mb-3">{title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
        </CardContent>
      </Card>
    </div>
  );
};

// Clean stats section
const StatsSection = () => {
  const stats = [
    { number: "99.9%", label: "Uptime" },
    { number: "500+", label: "Integrations" },
    { number: "24/7", label: "Monitoring" },
    { number: "SOC 2", label: "Compliant" }
  ];

  return (
    <section className="py-24 bg-black/60 backdrop-blur-sm relative z-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-light text-white mb-2">{stat.number}</div>
              <div className="text-gray-500 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Tech stack section
const TechStackSection = () => {
  const techStack = [
    {
      icon: Shield,
      title: "XDR Security Engine",
      description: "Advanced threat detection and response system that monitors all endpoints across your infrastructure with real-time analysis and automated remediation.",
      category: "Security"
    },
    {
      icon: Zap,
      title: "Workflow Automation",
      description: "Intelligent automation platform that processes security events, triggers responses, and orchestrates compliance workflows without manual intervention.",
      category: "Automation"
    },
    {
      icon: Network,
      title: "Isolated Infrastructure",
      description: "Dedicated virtual environments for each client, ensuring complete data isolation and secure multi-tenant architecture.",
      category: "Infrastructure"
    },
    {
      icon: Globe,
      title: "Client Dashboard",
      description: "Custom-built interface providing real-time security insights, compliance status, and actionable recommendations for your business.",
      category: "Client Portal"
    }
  ];

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
        <h2 className="text-4xl font-light text-white mb-4">Powered by Industry-Leading Technology</h2>
          {/* <h2 className="text-4xl font-light text-white mb-4">Our Tech Stack</h2> */}
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Built on proven open-source foundations and modern automation platforms for maximum reliability and performance
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {techStack.map((tech, index) => (
            <Card key={index} className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-700 transition-colors duration-300">
                  <tech.icon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300" />
                </div>
                <Badge variant="outline" className="bg-gray-800 text-gray-300 border-gray-600 mb-3 text-xs">
                  {tech.category}
                </Badge>
                <h3 className="text-lg font-medium text-white mb-3">{tech.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{tech.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm max-w-2xl mx-auto">
            Our technology stack combines battle-tested open-source security tools with modern automation platforms, 
            ensuring enterprise-grade reliability while maintaining the flexibility to adapt to your specific needs.
          </p>
        </div>
      </div>
    </section>
  );
};

// Roadmap-style how to start
const HowToStartSection = () => {
  const steps = [
    {
      number: "01",
      title: "Basic Info",
      description: "Explain your business structure, IT infrastructure, and security requirements to our team",
      icon: Users
    },
    {
      number: "02", 
      title: "Download Agent",
      description: "Install our lightweight agent on your endpoints to enable comprehensive detection and monitoring",
      icon: Download
    },
    {
      number: "03",
      title: "Access & Login to UI", 
      description: "Get real-time security and compliance insights for your business through our intuitive dashboard",
      icon: BarChart3
    }
  ];

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-light text-white mb-4">How To Start?</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Three simple steps to get your security automation up and running
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical line connecting steps */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-800 hidden md:block"></div>
            
            {steps.map((step, index) => (
              <div key={index} className="relative flex items-start mb-16 last:mb-0">
                {/* Step number circle */}
                <div className="flex-shrink-0 w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center border-2 border-gray-800 relative z-10">
                  <span className="text-white font-medium text-lg">{step.number}</span>
                </div>
                
                {/* Step content */}
                <div className="ml-8 flex-1">
                  <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:bg-gray-900/70 transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center mr-4">
                        <step.icon className="w-5 h-5 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-medium text-white">{step.title}</h3>
                    </div>
                    <p className="text-gray-400 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Startup vision section
const VisionSection = () => {
  const visionPillars = [
    {
      icon: Target,
      title: "Our Mission",
      description: "Democratize enterprise-grade security automation for businesses of all sizes, making compliance accessible and affordable."
    },
    {
      icon: TrendingUp,
      title: "Our Vision", 
      description: "A world where security compliance is automated, intelligent, and seamlessly integrated into every business workflow."
    },
    {
      icon: Users,
      title: "Our Promise",
      description: "To deliver cutting-edge AI-powered security solutions that grow with your business and adapt to your unique needs."
    }
  ];

  return (
    <section className="py-24 bg-black/60 backdrop-blur-sm relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-light text-white mb-4">Our Vision for the Future</h2>
          <p className="text-gray-400 text-lg">
            Building the next generation of security automation
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {visionPillars.map((pillar, index) => (
            <Card key={index} className="bg-gray-900/50 border-gray-800 p-8 hover:bg-gray-900/70 transition-all duration-300 group">
              <CardContent className="p-0 text-center">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-700 transition-colors duration-300">
                  <pillar.icon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-white font-medium text-lg mb-4">{pillar.title}</h3>
                <p className="text-gray-300 leading-relaxed text-sm">{pillar.description}</p>
              </CardContent>
            </Card>
          ))}
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
          Ready to Transform Your Business?
        </h2>
        <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
          Join AkinSec to get automated, streamlined security for your IT.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to={createPageUrl('Pricing')}>
            <Button 
              size="lg" 
              className="bg-black text-white hover:bg-gray-800 px-8 py-3 text-base font-medium rounded-none border-0 transition-all duration-200"
            >
              Start Free Trial
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link to={createPageUrl('Contact')}>
            <div className="wave-button-container">
              <span>Schedule Demo</span>
              <div className="wave"></div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

// Main component
export default function HomeRedesign() {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const phrases = [
    "Powerful Features",
    "AI-Powered Automation",
    "IT + Simplicity + AI", 
    "Simplify Security, Instantly",
    "Continuous Monitoring Made Easy",
    "Evidence Collection, Automated",
    "Ship Faster, Stay Compliant",
    "Compliance Made Simple",
    "Automated Compliance Intelligence",
    "This is Next-Gen Compliance",
    "AI-Driven Organization",
    "AI File Analysis",
    "Automating Trust & Security"
  ];
  const typingSpeed = 150;
  const deletingSpeed = 75;
  const pauseDuration = 2000;

  useEffect(() => {
    const handleType = () => {
      const currentPhrase = phrases[phraseIndex % phrases.length];
      const currentText = isDeleting 
        ? currentPhrase.substring(0, text.length - 1)
        : currentPhrase.substring(0, text.length + 1);

      setText(currentText);

      if (!isDeleting && currentText === currentPhrase) {
        // Pause at the end of typing
        setTimeout(() => setIsDeleting(true), pauseDuration);
      } else if (isDeleting && currentText === '') {
        // Move to next phrase after deleting
        setIsDeleting(false);
        setPhraseIndex(prevIndex => prevIndex + 1);
      }
    };

    const timeout = setTimeout(handleType, isDeleting ? deletingSpeed : typingSpeed);
    
    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex, phrases, pauseDuration, typingSpeed, deletingSpeed]);

  return (
    <div className="min-h-screen relative">
      <style>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
        .blinking-cursor {
          animation: blink 1s step-end infinite;
          font-weight: 300;
        }
      `}</style>
      <WaveBackground />
      <HeroSection />
      
      {/* Features Section */}
      <section className="py-24 bg-black/30 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-light text-white mb-4 flex items-center justify-center min-h-[60px]">
              {text}
              <span className="blinking-cursor" aria-hidden="true">|</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Everything you need to manage security with confidence.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link to={createPageUrl('FileAnalysisExample')} className="block">
              <FeatureCard
                icon={Search}
                title="AI File Analysis"
                description="Automatically analyze documents for compliance gaps and get actionable recommendations."
                delay={0}
              />
            </Link>
            <Link to={createPageUrl('TasksExample')} className="block">
              <FeatureCard
                icon={CheckCircle}
                title="Task Management"
                description="Streamline compliance tasks with automated workflows and progress tracking."
                delay={100}
              />
            </Link>
            <Link to={createPageUrl('TemplatesExample')} className="block">
              <FeatureCard
                icon={FileText}
                title="Template Library"
                description="Access pre-built policies and procedures for various compliance frameworks."
                delay={200}
              />
            </Link>
            <Link to={createPageUrl('IntegrationsExample')} className="block">
              <FeatureCard
                icon={Shield}
                title="Integration Auditing"
                description="Assess third-party vendor risk and maintain compliant app ecosystems."
                delay={300}
              />
            </Link>
            <Link to={createPageUrl('FrameworksExample')} className="block">
              <FeatureCard
                icon={Target}
                title="Framework Alignment"
                description="Align controls with SOC 2, ISO 27001, and other compliance frameworks."
                delay={400}
              />
            </Link>
            <Link to={createPageUrl('ReportsExample')} className="block">
              <FeatureCard
                icon={BarChart3}
                title="Analytics & Reporting"
                description="Generate comprehensive reports and insights on your compliance posture."
                delay={500}
              />
            </Link>
          </div>
        </div>
      </section>

      <StatsSection />
      <TechStackSection />
      <HowToStartSection />
      <VisionSection />
      <CTASection />
    </div>
  );
}