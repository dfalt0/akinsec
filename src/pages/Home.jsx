import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SectionIndex } from '@/components/marketing/SectionIndex';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils/index.js';
import {
  APP_URL,
  MARKETING_THESIS,
  OPERATIONS_PLANE_TAGLINE,
  PRODUCT_SUBLINE,
  AI_WORKFLOW_DECK,
} from '@/marketing/voice.js';
import { ReactFlow, Background, useNodesState, useEdgesState, MarkerType, Handle, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './Home.css';

const HERO_ATTENDANT_SYNONYMS = [
  'Attendant.',
  'SIEM.',
  'Workflow.',
  'Timeline.',
  'Assistant.',
  'Advisor.',
  'Analyst.',
  'Operator.',
  'Guardian.',
];

const HOME_FEATURE_PHRASES = [
  "SIEM that stays readable",
  "AI-assisted triage in workflow",
  "BYO model APIs in settings",
  "From alert to owned task",
  "MDR context in one timeline",
  "Framework mapping you can show",
  "Evidence that travels with the case",
  "Fewer tabs. Clearer owners.",
];

// Ultra-minimal hero section inspired by GreyNoise
const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  // Start empty so the first synonym types in cleanly.
  const [attendantText, setAttendantText] = useState('');
  const [attendantIndex, setAttendantIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const typingSpeed = 60;
  const deletingSpeed = 80;
  const pauseDuration = 4000;
  const pauseAfterDelete = 300;

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    let timeoutId;
    
    const currentWord = HERO_ATTENDANT_SYNONYMS[attendantIndex % HERO_ATTENDANT_SYNONYMS.length];
    
    if (isDeleting) {
      // Deleting: remove one character at a time
      if (attendantText.length > 0) {
        timeoutId = setTimeout(() => {
          setAttendantText(prev => prev.slice(0, -1));
        }, deletingSpeed);
      } else {
        // Finished deleting, pause with just cursor blinking before moving to next word
        timeoutId = setTimeout(() => {
          const nextIndex = (attendantIndex + 1) % HERO_ATTENDANT_SYNONYMS.length;
          const nextWord = HERO_ATTENDANT_SYNONYMS[nextIndex];
          setAttendantIndex(nextIndex);
          setIsDeleting(false);
          // Start typing the first character
          setAttendantText(nextWord[0]);
        }, pauseAfterDelete);
      }
    } else {
      // Typing: add one character at a time
      if (attendantText.length < currentWord.length) {
        timeoutId = setTimeout(() => {
          setAttendantText(currentWord.substring(0, attendantText.length + 1));
        }, typingSpeed);
      } else if (attendantText === currentWord) {
        // Finished typing current word, pause then start deleting
        timeoutId = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [attendantText, isDeleting, attendantIndex, typingSpeed, deletingSpeed, pauseDuration, pauseAfterDelete]);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-transparent">
      <div className="container relative z-10 mx-auto max-w-6xl px-6 text-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-8 flex justify-center">
            <SectionIndex index={1} label="Product" />
          </div>
          <h2 className="mb-8 overflow-visible text-3xl font-semibold leading-relaxed tracking-tight md:text-5xl" style={{ paddingBottom: '0.75rem', minHeight: '1.5em' }}>
            <span className="text-foreground">
              Your Security
            </span>
            {' '}
            <span className="inline-block overflow-visible text-[hsl(var(--accent))]" style={{ paddingBottom: '1rem', lineHeight: '1.3', verticalAlign: 'baseline' }}>
              {attendantText}
              <span className="blinking-cursor" aria-hidden="true">|</span>
            </span>
          </h2>
          <h1 className="mb-8 text-6xl font-semibold leading-none tracking-tight text-foreground md:text-8xl">
            AkinSec
          </h1>

          <p className="mx-auto mb-6 max-w-3xl text-xl font-normal leading-relaxed text-muted-foreground md:text-2xl">
            AkinSec provides the tools that bridge the gap between AI and cybersecurity for a better, faster, more personalized workflow.
          </p>
          <p className="mx-auto mb-12 max-w-3xl text-lg leading-relaxed text-muted-foreground/90">
            {PRODUCT_SUBLINE}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href={APP_URL} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="command"
                className="group px-8 py-6 text-sm"
              >
                <span className="relative z-10 flex items-center">
                  Open app
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </a>
            <Link to={createPageUrl('Pricing')}>
              <Button
                size="lg"
                variant="outline"
                className="rounded-button border-border px-8 py-6 font-mono text-xs uppercase tracking-widest"
              >
                <span className="relative z-10">View pricing</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProofStrip = () => {
  const chips = ['Amazon Web Services', 'Google Cloud', 'Microsoft 365', 'GitHub', 'Docker', 'Microsoft Graph'];
  return (
    <section className="relative z-10 border-b border-border/40 bg-background/25 py-10 backdrop-blur-sm">
      <div className="container mx-auto max-w-6xl px-6">
        <p className="mb-6 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          Connect sources you already run
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {chips.map((name) => (
            <span
              key={name}
              className="rounded-full border border-border/60 bg-card/40 px-4 py-2 text-xs font-medium text-muted-foreground"
            >
              {name}
            </span>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-xl text-center text-sm text-muted-foreground">
          Connect LLM providers in-app with credentials you control—governed workflows and audit-friendly exports for reviews.
        </p>
      </div>
    </section>
  );
};

// Custom Node Components for React Flow (`data` is provided by React Flow node defs)
/* eslint-disable react/prop-types */
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
      {data.tools.map((tool) => (
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
/* eslint-enable react/prop-types */

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

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
      <section className="relative z-10 border-y border-border/50 bg-background/20 py-24 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="mb-4 flex justify-center">
            <SectionIndex index={2} label="Signal flow" />
          </div>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">How monitoring signal moves</h2>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
              Sources feed the SIEM workspace; your team works alerts, timelines, and tasks from one console instead of parallel tabs.
            </p>
          </div>
          <div className="mx-auto max-w-6xl">
            <div className="h-[500px] overflow-hidden rounded-md border border-border bg-card/30">
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                fitView
                className="bg-transparent"
                defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
                nodesDraggable
                nodesConnectable={false}
                elementsSelectable={false}
                panOnDrag={false}
                panOnScroll={false}
                zoomOnScroll={false}
                zoomOnPinch={false}
                zoomOnDoubleClick={false}
                preventScrolling
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
              </ReactFlow>
            </div>
          </div>
        </div>
    </section>
  );
};

const ProductProofBento = () => {
  const cells = [
    'Cloud and SaaS telemetry',
    'Identity and Graph signals',
    'Endpoint and container events',
    'OpenAI / Anthropic (your API keys)',
    'Audit-ready exports',
    'Playbooks and owned tasks',
  ];
  return (
    <section className="relative z-10 border-y border-border/40 bg-black/25 py-20 backdrop-blur-md">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="grid items-stretch gap-8 lg:grid-cols-5">
          <div className="flex flex-col justify-center lg:col-span-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Proof</p>
            <h2 className="mt-3 text-left text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              Your sources, your model APIs
            </h2>
            <p className="mt-4 text-left text-lg leading-relaxed text-muted-foreground">
              {AI_WORKFLOW_DECK} Inference runs through providers you configure in settings—we do not operate inference as the core product.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-3">
            {cells.map((label) => (
              <div
                key={label}
                className="rounded-xl border border-border/50 bg-card/30 p-5 text-left text-sm text-muted-foreground"
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* eslint-disable react/prop-types -- local presentation component */
const FeatureCard = ({ title, description, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`h-full transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <Card className="card-enhanced group cursor-pointer h-full flex flex-col">
        <CardContent className="p-8 flex flex-col flex-1">
          <h3 className="text-lg text-white font-medium mb-3 group-hover:text-[hsl(var(--accent))] transition-colors duration-300 flex-shrink-0">{title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300 flex-1">{description}</p>
        </CardContent>
      </Card>
    </div>
  );
};

const StatsSection = () => (
  <section className="py-24 bg-black/30 backdrop-blur-sm relative z-10">
    <div className="container mx-auto max-w-3xl px-6 text-center">
      <h2 className="text-3xl font-light text-white mb-4">Built for steady operations</h2>
      <p className="text-gray-400 text-sm leading-relaxed">
        We design paid tiers around high-availability workspaces, monitoring that matches your sources, and framework mapping you can show in reviews—without placeholder numbers on the page.
      </p>
    </div>
  </section>
);

const AutomationSection = () => {
  const capabilities = [
    {
      title: 'SOAR',
      description: 'Runbooks and case flow with less repetitive wiring between tools.',
      label: 'Orchestration',
    },
    {
      title: 'SIEM',
      description: 'Normalized logs and correlation so alerts point to work you can finish.',
      label: 'Signal',
    },
    {
      title: 'MDR',
      description: 'Endpoint and cloud context on the same timeline as the rest of your stack.',
      label: 'Response',
    },
    {
      title: 'Onboarding',
      description: 'Connect sources once; expand coverage without rebuilding everything by hand.',
      label: 'Integration',
    },
  ];

  return (
    <section className="py-24 bg-black/20 backdrop-blur-md relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-light text-white mb-4">Modern SIEM, one console</h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            {MARKETING_THESIS}
          </p>
          <p className="text-gray-500 text-base max-w-3xl mx-auto leading-relaxed mt-4">
            {OPERATIONS_PLANE_TAGLINE}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {capabilities.map((capability, index) => (
            <Card key={index} className="card-automation group">
              <CardContent className="p-8 space-y-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{capability.label}</p>
                <h3 className="text-xl font-medium text-white group-hover:text-[hsl(var(--accent))] transition-colors duration-300">{capability.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">{capability.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const TechStackSection = () => {
  const techStack = [
    {
      title: 'Detection fabric',
      description: 'Cross-source detections and context so investigations start with evidence, not guesswork.',
      category: 'Security',
    },
    {
      title: 'Event automation',
      description: 'Routing from alert to task to playbook—fewer stale tickets, clearer owners.',
      category: 'Automation',
    },
    {
      title: 'Tenant isolation',
      description: 'Separate workspaces so customer data and policies do not cross streams.',
      category: 'Infrastructure',
    },
    {
      title: 'Operations console',
      description: 'Tasks, reports, and status in one UI instead of a pile of vendor tabs.',
      category: 'Product',
    },
  ];

  return (
    <section className="py-24 bg-black/30 backdrop-blur-sm relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-light text-white mb-4">What sits under the hood</h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Open components and automation you can reason about—no black-box magic words required.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {techStack.map((tech, index) => (
            <Card key={index} className="card-enhanced group">
              <CardContent className="p-6 text-left">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">{tech.category}</p>
                <h3 className="text-lg font-medium text-white mb-3 group-hover:text-[hsl(var(--accent))] transition-colors duration-300">{tech.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">{tech.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowToStartSection = () => {
  const steps = [
    {
      number: '01',
      title: 'Connect sources',
      description: 'Link cloud, identity, SaaS, and endpoints. We normalize what the plane needs for detections and evidence.',
    },
    {
      number: '02',
      title: 'Tune and align',
      description: 'Map control families to the frameworks you care about. Turn defaults into something operators can run week over week.',
    },
    {
      number: '03',
      title: 'Operate from one console',
      description: 'Review timelines, tasks, and exports where stakeholders already look—without re-exporting from five tools.',
    },
  ];

  return (
    <section className="py-24 bg-black/20 backdrop-blur-md relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-light text-white mb-4">How you get going</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Three practical steps. Depth lives in the product—not in another paragraph here.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-800 hidden md:block" />

            {steps.map((step, index) => (
              <div key={index} className="relative flex items-center mb-16 last:mb-0">
                <div className="flex-shrink-0 w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center border-2 border-gray-800 relative z-10 self-center">
                  <span className="text-white font-medium text-lg">{step.number}</span>
                </div>

                <div className="ml-8 flex-1">
                  <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:bg-gray-900/70 transition-all duration-300">
                    <h3 className="text-xl font-medium text-white mb-3">{step.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
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

const VisionSection = () => (
  <section className="py-24 bg-black/30 backdrop-blur-sm relative z-10">
    <div className="container mx-auto max-w-2xl px-6 text-center">
      <h2 className="text-4xl font-light text-white mb-6">What we believe</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Credible monitoring should not take a services engagement before you see value. Connect sources, run the SIEM workspace,
        and ship evidence—with AI assisting where you wire your own providers, not a black-box model farm on our side.
      </p>
      <p className="text-gray-400 text-sm leading-relaxed">
        Timelines, tasks, and exports stay linked so smaller teams can run a defensible program without living in parallel panes of glass.
      </p>
    </div>
  </section>
);

const CTASection = () => {
  return (
    <section className="py-24 bg-black/20 backdrop-blur-md relative z-10">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-light text-white mb-6">
          See the SIEM in the app
        </h2>
        <p className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
          Open app.akinsec.com, start a trial, connect a first source, and decide if one console beats five. We meet you where your program is today.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <a href={APP_URL} target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="command" className="group px-8 py-6 text-sm">
              <span className="relative z-10 flex items-center">
                Open app
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
          </a>
          <Link to={createPageUrl('Pricing')}>
            <Button size="lg" variant="outline" className="rounded-button border-border px-8 py-6 font-mono text-xs uppercase tracking-widest">
              <span className="relative z-10">View pricing</span>
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

  const typingSpeed = 150;
  const deletingSpeed = 75;
  const pauseDuration = 2000;

  useEffect(() => {
    const handleType = () => {
      const currentPhrase = HOME_FEATURE_PHRASES[phraseIndex % HOME_FEATURE_PHRASES.length];
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
  }, [text, isDeleting, phraseIndex, pauseDuration, typingSpeed, deletingSpeed]);

  return (
    <div className="relative min-h-screen">
      <HeroSection />
      <ProofStrip />
      <AutomationSection />
      <TechStackFlowchart key="flowchart-v2" />
      <ProductProofBento />
      
      {/* Features Section */}
      <section className="relative z-10 border-y border-border/40 bg-background/15 py-24 backdrop-blur-md">
        <div className="container mx-auto px-6">
          <div className="mb-6 flex justify-center">
            <SectionIndex index={3} label="Surface" />
          </div>
          <div className="mb-20 text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Capabilities across the detection loop
            </h2>
            <p className="mx-auto mt-4 flex min-h-[3rem] items-center justify-center gap-0 font-mono text-sm text-[hsl(var(--accent))] md:text-base">
              <span>{text}</span>
              <span className="blinking-cursor" aria-hidden="true">|</span>
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              From ingest through response, each block covers a different part of the loop—alerts, ownership, and exports stay linked.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Playbook-ready handoffs"
              description="Cases pick up owners, runbooks, and status so SOAR work does not die in chat threads."
              delay={0}
            />
            <FeatureCard
              title="Correlation you can explain"
              description="Rules and enrichments stay visible enough that auditors and peers understand why an alert fired."
              delay={100}
            />
            <FeatureCard
              title="Endpoint and cloud in frame"
              description="MDR-style context lands next to identity and SaaS signal—not in another siloed inbox."
              delay={200}
            />
            <FeatureCard
              title="Control mapping"
              description="Tie tasks and evidence to the frameworks your customers ask about—SOC 2, ISO, GDPR, and friends."
              delay={300}
            />
            <FeatureCard
              title="Watch the paths you own"
              description="Subscriptions and integrations get a clear owner so drift is a ticket, not a surprise."
              delay={400}
            />
            <FeatureCard
              title="Exports stay portable"
              description="Reports and proof leave with you—they are yours to hand to legal, GRC, or an assessor."
              delay={500}
            />
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="py-24 bg-black/20 backdrop-blur-md relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-white mb-4">Compliance frameworks</h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              We map workflows to common control families so you can show readiness—we do not certify your org on your behalf.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="card-enhanced group cursor-pointer">
              <CardContent className="p-8">
                <h3 className="text-lg text-white font-medium mb-2 group-hover:text-[hsl(var(--accent))] transition-colors duration-300">SOC 2</h3>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">For vendors who need trust-service criteria coverage customers can review.</p>
              </CardContent>
            </Card>
            <Card className="card-enhanced group cursor-pointer">
              <CardContent className="p-8">
                <h3 className="text-lg text-white font-medium mb-2 group-hover:text-[hsl(var(--accent))] transition-colors duration-300">PCI DSS</h3>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">For teams handling cardholder environments who must show technical and operational controls.</p>
              </CardContent>
            </Card>
            <Card className="card-enhanced group cursor-pointer">
              <CardContent className="p-8">
                <h3 className="text-lg text-white font-medium mb-2 group-hover:text-[hsl(var(--accent))] transition-colors duration-300">GDPR</h3>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">For EU-facing data processing—subject rights, processing records, and breach workflows.</p>
              </CardContent>
            </Card>
            <Card className="card-enhanced group cursor-pointer">
              <CardContent className="p-8">
                <h3 className="text-lg text-white font-medium mb-2 group-hover:text-[hsl(var(--accent))] transition-colors duration-300">HIPAA</h3>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">For US healthcare and associates safeguarding PHI alongside technical safeguards.</p>
              </CardContent>
            </Card>
            <Card className="card-enhanced group cursor-pointer">
              <CardContent className="p-8">
                <h3 className="text-lg text-white font-medium mb-2 group-hover:text-[hsl(var(--accent))] transition-colors duration-300">NIST 800-53</h3>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">For federal-style control baselines or teams aligning to NIST language.</p>
              </CardContent>
            </Card>
            <Card className="card-enhanced group cursor-pointer">
              <CardContent className="p-8">
                <h3 className="text-lg text-white font-medium mb-2 group-hover:text-[hsl(var(--accent))] transition-colors duration-300">TSC</h3>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">Trust Services Criteria buckets that pair cleanly with SOC 2 conversations.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Security Operations Integrations */}
      <section className="py-24 bg-black/30 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-white mb-4">Integrations</h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">Representative sources we connect today—expand coverage as your estate grows.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="card-enhanced group cursor-pointer">
              <CardContent className="p-8">
                <h3 className="text-lg text-white font-medium mb-1 group-hover:text-[hsl(var(--accent))] transition-colors duration-300">Docker</h3>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">Container lifecycle events—create, start, stop, pause—for workload visibility.</p>
              </CardContent>
            </Card>
            <Card className="card-enhanced group cursor-pointer">
              <CardContent className="p-8">
                <h3 className="text-lg text-white font-medium mb-1 group-hover:text-[hsl(var(--accent))] transition-colors duration-300">Amazon Web Services</h3>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">Security-relevant AWS API events for accounts you authorize.</p>
              </CardContent>
            </Card>
            <Card className="card-enhanced group cursor-pointer">
              <CardContent className="p-8">
                <h3 className="text-lg text-white font-medium mb-1 group-hover:text-[hsl(var(--accent))] transition-colors duration-300">Google Cloud</h3>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">GCP audit and security signals through supported integration paths.</p>
              </CardContent>
            </Card>
            <Card className="card-enhanced group cursor-pointer">
              <CardContent className="p-8">
                <h3 className="text-lg text-white font-medium mb-1 group-hover:text-[hsl(var(--accent))] transition-colors duration-300">GitHub</h3>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">Org audit activity for code and identity changes that matter to security.</p>
              </CardContent>
            </Card>
            <Card className="card-enhanced group cursor-pointer">
              <CardContent className="p-8">
                <h3 className="text-lg text-white font-medium mb-1 group-hover:text-[hsl(var(--accent))] transition-colors duration-300">Microsoft 365</h3>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">Security events from productivity tenants you connect.</p>
              </CardContent>
            </Card>
            <Card className="card-enhanced group cursor-pointer">
              <CardContent className="p-8">
                <h3 className="text-lg text-white font-medium mb-1 group-hover:text-[hsl(var(--accent))] transition-colors duration-300">Microsoft Graph</h3>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">Graph-backed identity and security signals where your tenant allows.</p>
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