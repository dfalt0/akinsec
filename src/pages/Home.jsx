import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from "framer-motion";
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
  Download,
  Bot,
  Sparkles,
  Brain,
  Settings,
  Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils/index.js';
import { ReactFlow, Background, Controls, useNodesState, useEdgesState, MarkerType, addEdge, Handle, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './Home.css';


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
          {/* Security Jarvis - Big Bold Text */}
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight tracking-tight bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
            Your Security Jarvis
          </h2>
          {/* Main headline - very clean */}
          <h1 className="text-6xl md:text-8xl font-light text-white mb-8 leading-none tracking-tight">
            AkinSec
          </h1>
          
          {/* Subtitle - minimal */}
          <p className="text-xl md:text-2xl text-gray-300 mb-6 max-w-3xl mx-auto font-light leading-relaxed">
            Simple Automated Security.
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
          AI-powered security intelligence for every business.
          </p>
          
          {/* Simple CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to={createPageUrl('Pricing')}>
              <Button 
                size="lg" 
                className="btn-primary-gradient px-8 py-3 text-base rounded-lg border-0 group relative"
              >
                <span className="relative z-10 flex items-center">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </Link>
            <Link to="https://app.akinsec.com">
              <Button 
                size="lg" 
                variant="outline" 
                className="btn-secondary-gradient px-8 py-3 text-base font-medium rounded-lg backdrop-blur-sm relative"
              >
                <span className="relative z-10">Ask Akin</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

// Custom Node Components for React Flow
const DataSourceNode = ({ data }) => (
  <div className="bg-gray-800 border-2 border-gray-600 rounded-lg px-4 py-3 shadow-lg min-w-[140px]">
    <Handle 
      id="source" 
      type="source" 
      position={Position.Right} 
      style={{ background: '#9ca3af' }} 
    />
    <div className="text-sm font-medium text-white text-center">{data.label}</div>
    <div className="text-xs text-gray-300 text-center">{data.subtitle}</div>
  </div>
);

const SecurityVMNode = ({ data }) => (
  <div className="bg-gray-800 border-2 border-gray-600 rounded-xl pt-6 pb-4 px-4 shadow-lg min-w-[200px] relative">
    <Handle 
      id="target" 
      type="target" 
      position={Position.Left} 
      style={{ background: '#9ca3af' }} 
    />
    <Handle 
      id="source" 
      type="source" 
      position={Position.Right} 
      style={{ background: '#9ca3af' }} 
    />
    <div className="text-base font-bold text-white text-center mb-3">Security VM</div>
    <div className="grid grid-cols-2 gap-2 text-xs mb-6 relative">
      {data.tools.map((tool, index) => (
        <div key={tool} className="bg-gray-700 border border-gray-500 rounded px-2 py-1 text-center text-gray-200 font-medium">
          {tool}
        </div>
      ))}
      {/* Single animated dotted line from tools to automation - COMMENTED OUT FOR NOW */}
      {/* <svg className="absolute left-1/2 transform -translate-x-1/2 top-full w-2 h-6 pointer-events-none" style={{ zIndex: 10 }}>
        <defs>
          <marker
            id="automation-arrow"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="2"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path
              d="M0,0 L0,4 L6,2 z"
              fill="#9ca3af"
            />
          </marker>
        </defs>
        <line
          x1="1"
          y1="0"
          x2="1"
          y2="20"
          stroke="#9ca3af"
          strokeWidth="2"
          strokeDasharray="4,4"
          markerEnd="url(#automation-arrow)"
          className="automation-line"
        />
      </svg> */}
    </div>
    <div className="bg-gray-700 border border-gray-500 rounded px-2 py-1 text-center text-gray-200 font-medium relative mb-1">
      Automation
    </div>
  </div>
);

const CustomerGUINode = ({ data }) => (
  <div className="bg-gray-800 border-2 border-gray-600 rounded-lg px-4 py-3 shadow-lg min-w-[140px]">
    <Handle 
      id="target" 
      type="target" 
      position={Position.Left} 
      style={{ background: '#9ca3af' }} 
    />
    <div className="text-sm font-medium text-white text-center">{data.label}</div>
  </div>
);

// Define nodeTypes outside component to prevent re-creation warnings
const nodeTypes = {
  dataSource: DataSourceNode,
  securityVM: SecurityVMNode,
  customerGUI: CustomerGUINode,
};

// Tech Stack Flowchart Component with React Flow
const TechStackFlowchart = () => {



  // React Flow implementation
  const initialNodes = [
    {
      id: 'server',
      type: 'dataSource',
      position: { x: 100, y: 50 },
      data: { label: 'Servers', subtitle: 'Data Source' },
    },
    {
      id: 'pc',
      type: 'dataSource',
      position: { x: 100, y: 150 },
      data: { label: 'PCs', subtitle: 'Endpoint' },
    },
    {
      id: 'sensor',
      type: 'dataSource',
      position: { x: 100, y: 250 },
      data: { label: 'Sensors', subtitle: 'IoT Device' },
    },
    {
      id: 'vm',
      type: 'securityVM',
      position: { x: 400, y: 150 },
      data: { 
        tools: ['SIEM', 'HIDS', 'IR', 'EDR', 'MDR', 'XDR']
      },
    },
    {
      id: 'gui',
      type: 'customerGUI',
      position: { x: 700, y: 150 },
      data: { label: 'Customer GUI' },
    },
  ];

  const initialEdges = [
    {
      id: 'server-vm',
      source: 'server',
      sourceHandle: 'source',
      target: 'vm',
      targetHandle: 'target',
      type: 'smoothstep',
      style: { stroke: '#9ca3af', strokeWidth: 2, strokeDasharray: '5,5' },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#9ca3af',
      },
    },
    {
      id: 'pc-vm',
      source: 'pc',
      sourceHandle: 'source',
      target: 'vm',
      targetHandle: 'target',
      type: 'smoothstep',
      style: { stroke: '#9ca3af', strokeWidth: 2, strokeDasharray: '5,5' },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#9ca3af',
      },
    },
    {
      id: 'sensor-vm',
      source: 'sensor',
      sourceHandle: 'source',
      target: 'vm',
      targetHandle: 'target',
      type: 'smoothstep',
      style: { stroke: '#9ca3af', strokeWidth: 2, strokeDasharray: '5,5' },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#9ca3af',
      },
    },
    {
      id: 'vm-gui',
      source: 'vm',
      sourceHandle: 'source',
      target: 'gui',
      targetHandle: 'target',
      type: 'smoothstep',
      style: { stroke: '#9ca3af', strokeWidth: 2, strokeDasharray: '5,5' },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#9ca3af',
      },
    },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
      <section className="py-24 bg-black/30 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-white mb-4">Our Technology Architecture</h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              A comprehensive view of how our security automation platform processes and analyzes data
            </p>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="h-[500px] bg-gray-900/20 rounded-xl border border-gray-700">
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                fitView
                className="bg-transparent"
                defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
                defaultEdgeOptions={{
                  type: 'smoothstep',
                  style: { stroke: '#9ca3af', strokeWidth: 2, strokeDasharray: '5,5' },
                  markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: '#9ca3af',
                  },
                }}
              >
                <Background color="#374151" gap={20} />
                <Controls 
                  className="bg-gray-800 border-gray-600"
                  style={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #4b5563',
                  }}
                />
              </ReactFlow>
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
      <Card className="card-enhanced group cursor-pointer">
        <CardContent className="p-8">
          <div className="w-8 h-8 text-gray-400 mb-6 card-icon-glow">
            <Icon className="w-full h-full" />
          </div>
          <h3 className="text-lg text-white font-medium mb-3 group-hover:text-indigo-300 transition-colors duration-300">{title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">{description}</p>
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

// Automation capabilities section - NEW
const AutomationSection = () => {
  const capabilities = [
    {
      icon: Bot,
      title: "SOAR Automation",
      description: "AI automatically creates and manages playbooks, orchestrates workflows, and executes responses. No manual configuration needed—just connect your tools and let AI handle the rest.",
      benefit: "90% reduction in manual SOAR management"
    },
    {
      icon: Brain,
      title: "SIEM Intelligence",
      description: "Self-configuring SIEM that automatically parses logs, creates correlation rules, tunes alerts, and adapts to your environment. Set it up once, AI manages it forever.",
      benefit: "Zero-configuration SIEM operations"
    },
    {
      icon: Zap,
      title: "MDR Automation",
      description: "Managed Detection and Response that configures itself. AI monitors your endpoints, detects threats, and responds automatically—like having a 24/7 security team that never sleeps.",
      benefit: "Automated threat detection & response"
    },
    {
      icon: Settings,
      title: "Tool Integration & Setup",
      description: "Connect your security tools once. AI handles all the complex integrations, API configurations, and data mapping. No technical expertise required.",
      benefit: "One-click tool integration"
    }
  ];

  return (
    <section className="py-24 bg-black/30 backdrop-blur-sm relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-light text-white mb-4">Automation That Actually Works</h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Stop managing security tools. Let AI handle SOARs, SIEMs, and MDRs so you can focus on what matters—your business.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {capabilities.map((capability, index) => (
            <Card key={index} className="card-automation group">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 card-automation-icon rounded-lg flex items-center justify-center flex-shrink-0">
                    <capability.icon className="w-6 h-6 text-gray-400 group-hover:text-indigo-400 transition-colors duration-300" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-medium text-white mb-2 group-hover:text-indigo-300 transition-colors duration-300">{capability.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-3 group-hover:text-gray-300 transition-colors duration-300">{capability.description}</p>
                    <Badge variant="outline" className="badge-enhanced text-gray-300 text-xs">
                      {capability.benefit}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
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
            <Card key={index} className="card-enhanced group">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-gradient-to-br group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-300 card-icon-glow">
                  <tech.icon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300" />
                </div>
                <Badge variant="outline" className="badge-enhanced text-gray-300 mb-3 text-xs">
                  {tech.category}
                </Badge>
                <h3 className="text-lg font-medium text-white mb-3 group-hover:text-indigo-300 transition-colors duration-300">{tech.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">{tech.description}</p>
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
      title: "Connect Your Tools",
      description: "Connect your SOAR, SIEM, MDR, or other security tools. Our AI handles all the complex API configurations and integrations automatically.",
      icon: Network
    },
    {
      number: "02", 
      title: "AI Configures Everything",
      description: "Sit back while AI automatically configures your tools, creates playbooks, sets up monitoring, and optimizes settings based on your environment.",
      icon: Bot
    },
    {
      number: "03",
      title: "Monitor & Relax", 
      description: "Access your dashboard to see real-time security insights. AI handles all the monitoring, detection, and response—you just review the results.",
      icon: BarChart3
    }
  ];

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-light text-white mb-4">How To Start?</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Three simple steps to get your AI-powered security automation running—no technical expertise required
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
      description: "Eliminate the complexity of security tool management. Make enterprise-grade SOAR, SIEM, and MDR automation accessible to everyone—no technical expertise required."
    },
    {
      icon: TrendingUp,
      title: "Our Vision", 
      description: "A future where security tools are truly autonomous. Where AI handles setup, configuration, monitoring, and response—freeing security teams to focus on strategy."
    },
    {
      icon: Bot,
      title: "Our Promise",
      description: "Your security Jarvis. We promise to automate your security infrastructure so completely that you can set it and forget it—while staying fully protected."
    }
  ];

  return (
    <section className="py-24 bg-black/60 backdrop-blur-sm relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-light text-white mb-4">Our Vision for the Future</h2>
          <p className="text-gray-400 text-lg">
            A world where security tools manage themselves—where AI handles complexity so you can focus on innovation
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {visionPillars.map((pillar, index) => (
            <Card key={index} className="card-enhanced p-8 group">
              <CardContent className="p-0 text-center">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-6 group-hover:bg-gradient-to-br group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-300 card-icon-glow">
                  <pillar.icon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-white font-medium text-lg mb-4 group-hover:text-indigo-300 transition-colors duration-300">{pillar.title}</h3>
                <p className="text-gray-300 leading-relaxed text-sm group-hover:text-gray-200 transition-colors duration-300">{pillar.description}</p>
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
          Ready to Let AI Handle Your Security?
        </h2>
        <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
          Stop managing complex security tools. Connect your SOAR, SIEM, and MDR platforms once, and let our AI handle all the setup, configuration, and monitoring for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to={createPageUrl('Pricing')}>
            <Button 
              size="lg" 
              className="btn-primary-gradient px-8 py-3 text-base rounded-lg border-0 group relative"
            >
              <span className="relative z-10 flex items-center">
                Start Free Trial
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </Link>
          <Link to={createPageUrl('Contact')}>
            <Button 
              size="lg" 
              variant="outline" 
              className="btn-secondary-gradient px-8 py-3 text-base font-medium rounded-lg backdrop-blur-sm relative"
            >
              <span className="relative z-10">Schedule Demo</span>
            </Button>
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
    "Automated SOAR Management",
    "AI-Powered SIEM Operations",
    "Zero-Touch MDR Setup",
    "Your Security Jarvis",
    "Automation That Works",
    "Set It and Forget It",
    "AI Handles the Complexity",
    "Automated Threat Response",
    "Intelligent Security Operations",
    "No Configuration Required",
    "AI-Driven Security Automation",
    "Automated Monitoring & Response",
    "Security Made Autonomous"
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
      <WaveBackground />
      <HeroSection />
      <AutomationSection />
      <TechStackFlowchart key="flowchart-v2" />
      
      {/* Features Section */}
      <section className="py-24 bg-black/30 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-light text-white mb-4 flex items-center justify-center min-h-[60px]">
              {text}
              <span className="blinking-cursor" aria-hidden="true">|</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              AI and automation handle the complexity—you get enterprise-grade security without the operational burden.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Bot}
              title="Automated SOAR Operations"
              description="AI automatically configures and manages your SOAR platform—no manual playbook creation or workflow setup required."
              delay={0}
            />
            <FeatureCard
              icon={Brain}
              title="Intelligent SIEM Management"
              description="Our AI handles SIEM configuration, log parsing, correlation rules, and alert tuning—set it up once and let automation take over."
              delay={100}
            />
            <FeatureCard
              icon={Zap}
              title="Zero-Touch MDR Setup"
              description="MDR services that configure themselves. AI monitors, detects, and responds to threats without requiring your team's constant attention."
              delay={200}
            />
            <FeatureCard
              icon={Settings}
              title="Automated Configuration"
              description="No more complex setup processes. AI automatically configures security tools based on your environment and requirements."
              delay={300}
            />
            <FeatureCard
              icon={Activity}
              title="Continuous AI Monitoring"
              description="24/7 AI-powered monitoring that learns your environment, adapts to new threats, and responds automatically—no human intervention needed."
              delay={400}
            />
            <FeatureCard
              icon={Sparkles}
              title="Self-Managing Security"
              description="Security systems that optimize themselves. AI handles updates, tuning, and maintenance so you can focus on your business."
              delay={500}
            />
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="py-24 bg-black/60 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-white mb-4">Compliance Frameworks</h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">Built-in alignment with major standards and regulations.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="card-enhanced group cursor-pointer">
              <CardContent className="p-8">
                <h3 className="text-lg text-white font-medium mb-2 group-hover:text-indigo-300 transition-colors duration-300">PCI DSS</h3>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">Global security standard for entities that process, store, or transmit payment cardholder data.</p>
              </CardContent>
            </Card>
            <Card className="card-enhanced group cursor-pointer">
              <CardContent className="p-8">
                <h3 className="text-lg text-white font-medium mb-2 group-hover:text-indigo-300 transition-colors duration-300">GDPR</h3>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">Guidelines for processing personal data under the EU General Data Protection Regulation.</p>
              </CardContent>
            </Card>
            <Card className="card-enhanced group cursor-pointer">
              <CardContent className="p-8">
                <h3 className="text-lg text-white font-medium mb-2 group-hover:text-indigo-300 transition-colors duration-300">HIPAA</h3>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">US regulation providing privacy and security provisions for safeguarding medical information.</p>
              </CardContent>
            </Card>
            <Card className="card-enhanced group cursor-pointer">
              <CardContent className="p-8">
                <h3 className="text-lg text-white font-medium mb-2 group-hover:text-indigo-300 transition-colors duration-300">NIST 800-53</h3>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">Guidelines for security and privacy controls for federal information systems.</p>
              </CardContent>
            </Card>
            <Card className="card-enhanced group cursor-pointer">
              <CardContent className="p-8">
                <h3 className="text-lg text-white font-medium mb-2 group-hover:text-indigo-300 transition-colors duration-300">TSC</h3>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">Trust Services Criteria for Security, Availability, Processing Integrity, Confidentiality, and Privacy.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Security Operations Integrations */}
      <section className="py-24 bg-black relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-white mb-4">Security Operations Integrations</h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">Connect your infrastructure and SaaS to centralize visibility and response.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="card-enhanced group cursor-pointer">
              <CardContent className="p-8">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 text-gray-400 group-hover:text-indigo-400 transition-colors duration-300 card-icon-glow"><Network className="w-full h-full" /></div>
                  <div>
                    <h3 className="text-lg text-white font-medium mb-1 group-hover:text-indigo-300 transition-colors duration-300">Docker</h3>
                    <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">Monitor Docker container lifecycle events: creation, start, stop, and pause.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="card-enhanced group cursor-pointer">
              <CardContent className="p-8">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 text-gray-400 group-hover:text-indigo-400 transition-colors duration-300 card-icon-glow"><Globe className="w-full h-full" /></div>
                  <div>
                    <h3 className="text-lg text-white font-medium mb-1 group-hover:text-indigo-300 transition-colors duration-300">Amazon Web Services</h3>
                    <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">Collect security events from AWS services directly via AWS APIs.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="card-enhanced group cursor-pointer">
              <CardContent className="p-8">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 text-gray-400 group-hover:text-indigo-400 transition-colors duration-300 card-icon-glow"><Globe className="w-full h-full" /></div>
                  <div>
                    <h3 className="text-lg text-white font-medium mb-1 group-hover:text-indigo-300 transition-colors duration-300">Google Cloud</h3>
                    <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">Ingest security events from GCP services through native integrations.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="card-enhanced group cursor-pointer">
              <CardContent className="p-8">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 text-gray-400 group-hover:text-indigo-400 transition-colors duration-300 card-icon-glow"><Network className="w-full h-full" /></div>
                  <div>
                    <h3 className="text-lg text-white font-medium mb-1 group-hover:text-indigo-300 transition-colors duration-300">GitHub</h3>
                    <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">Monitor organization audit logs to track security-relevant events.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="card-enhanced group cursor-pointer">
              <CardContent className="p-8">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 text-gray-400 group-hover:text-indigo-400 transition-colors duration-300 card-icon-glow"><Network className="w-full h-full" /></div>
                  <div>
                    <h3 className="text-lg text-white font-medium mb-1 group-hover:text-indigo-300 transition-colors duration-300">Office 365</h3>
                    <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">Centralize security events related to your Office 365 services.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="card-enhanced group cursor-pointer">
              <CardContent className="p-8">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 text-gray-400 group-hover:text-indigo-400 transition-colors duration-300 card-icon-glow"><Network className="w-full h-full" /></div>
                  <div>
                    <h3 className="text-lg text-white font-medium mb-1 group-hover:text-indigo-300 transition-colors duration-300">Microsoft Graph API</h3>
                    <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">Collect security events from Microsoft Graph-powered services via API.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
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