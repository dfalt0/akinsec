import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { SectionIndex } from '@/components/marketing/SectionIndex';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils/index.js';
import {
  APP_URL,
  PRODUCT_SUBLINE,
  MARKETING_THESIS,
  AI_WORKFLOW_DECK,
  MODELS_FAQ_SUMMARY,
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

const HeroSection = () => {
  const [attendantText, setAttendantText] = useState('');
  const [attendantIndex, setAttendantIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const typingSpeed = 60;
  const deletingSpeed = 80;
  const pauseDuration = 4000;
  const pauseAfterDelete = 300;

  useEffect(() => {
    let timeoutId;

    const currentWord = HERO_ATTENDANT_SYNONYMS[attendantIndex % HERO_ATTENDANT_SYNONYMS.length];

    if (isDeleting) {
      if (attendantText.length > 0) {
        timeoutId = setTimeout(() => {
          setAttendantText((prev) => prev.slice(0, -1));
        }, deletingSpeed);
      } else {
        timeoutId = setTimeout(() => {
          const nextIndex = (attendantIndex + 1) % HERO_ATTENDANT_SYNONYMS.length;
          const nextWord = HERO_ATTENDANT_SYNONYMS[nextIndex];
          setAttendantIndex(nextIndex);
          setIsDeleting(false);
          setAttendantText(nextWord[0]);
        }, pauseAfterDelete);
      }
    } else {
      if (attendantText.length < currentWord.length) {
        timeoutId = setTimeout(() => {
          setAttendantText(currentWord.substring(0, attendantText.length + 1));
        }, typingSpeed);
      } else if (attendantText === currentWord) {
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
        <div className="transition-all duration-1000 opacity-100 translate-y-0">
          <div className="mb-8 flex justify-center">
            <SectionIndex index={1} label="Product" />
          </div>
          <h2
            className="mb-8 overflow-visible text-3xl font-semibold leading-relaxed tracking-tight md:text-5xl"
            style={{ paddingBottom: '0.75rem', minHeight: '1.5em' }}
          >
            <span className="text-foreground">Your Security</span>{' '}
            <span
              className="inline-block overflow-visible text-[hsl(var(--accent))]"
              style={{ paddingBottom: '1rem', lineHeight: '1.3', verticalAlign: 'baseline' }}
            >
              {attendantText}
              <span className="blinking-cursor" aria-hidden="true">
                |
              </span>
            </span>
          </h2>
          <h1 className="mb-8 text-6xl font-semibold leading-none tracking-tight text-foreground md:text-8xl">AkinSec</h1>

          <p className="mx-auto mb-6 max-w-3xl text-xl font-normal leading-relaxed text-muted-foreground md:text-2xl">
            AkinSec provides the tools that bridge the gap between AI and cybersecurity for a better, faster, more personalized
            workflow.
          </p>
          <p className="mx-auto mb-12 max-w-3xl text-lg leading-relaxed text-muted-foreground/90">{PRODUCT_SUBLINE}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href={APP_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="command" className="group px-8 py-6 text-sm">
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

const SplitWorkflowSection = () => {
  const chips = ['AWS', 'GCP', 'Microsoft 365', 'GitHub', 'Containers', 'Graph'];
  return (
    <section className="relative z-10 border-b border-border/50 bg-background/35 py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionIndex index={2} label="Workspace" className="mb-6" />
            <h2 className="text-3xl font-semibold leading-snug tracking-tight text-foreground md:text-5xl lg:text-[2.65rem] lg:leading-snug">
              Think in signals,
              <br />
              <span className="text-muted-foreground">respond from one console</span>
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Investigate and orchestrate in AkinSec—monitoring, timelines, and playbooks stay in the same surface so handoffs do not
              become shadow IT.
            </p>
            <div className="mt-8 rounded-2xl border border-zinc-600 bg-zinc-900/90 p-6 shadow-xl ring-1 ring-white/5 md:p-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex sm:flex-1">
                  <Button size="lg" variant="command" className="h-12 w-full rounded-xl px-6 text-sm font-medium sm:flex-1">
                    <span className="flex w-full items-center justify-center gap-2">
                      Open app
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Button>
                </a>
                <Link to={createPageUrl('Pricing')} className="inline-flex sm:flex-1">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 w-full rounded-xl border-border/80 bg-background/40 px-6 text-sm font-medium backdrop-blur-sm sm:flex-1"
                  >
                    View pricing
                  </Button>
                </Link>
                <Link to={createPageUrl('Contact')} className="inline-flex sm:flex-1">
                  <Button size="lg" variant="ghost" className="h-12 w-full rounded-xl text-sm text-muted-foreground hover:text-foreground sm:flex-1">
                    Talk to us
                  </Button>
                </Link>
              </div>
              <p className="mt-5 text-xs leading-relaxed text-muted-foreground/80">{PRODUCT_SUBLINE}</p>
              <div className="mt-5 flex flex-wrap gap-2 border-t border-border/50 pt-5">
                {chips.map((name) => (
                  <span
                    key={name}
                    className="rounded-full border border-border/60 bg-background/40 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none">
            <div className="home-mock-grid relative aspect-[4/3] min-h-[380px] overflow-hidden rounded-2xl border border-zinc-600 bg-zinc-950 shadow-2xl ring-1 ring-white/[0.07] md:min-h-[440px]">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-zinc-800/30 via-transparent to-[hsl(var(--accent)/0.12)]" />
              <div className="absolute left-1/2 top-5 z-20 flex -translate-x-1/2 rounded-full border border-zinc-600 bg-zinc-900 p-1 shadow-lg">
                <span className="rounded-full px-4 py-1.5 text-[11px] font-medium text-zinc-400">Alerts</span>
                <span className="rounded-full bg-zinc-100 px-4 py-1.5 text-[11px] font-medium text-zinc-900">Timeline</span>
              </div>
              <div className="absolute left-4 top-[4.5rem] z-10 w-[42%] rounded-xl border border-zinc-600 bg-zinc-900 p-3 shadow-xl md:left-6">
                <p className="mb-2 font-mono text-[9px] uppercase tracking-wider text-zinc-500">Sources</p>
                <div className="space-y-1.5">
                  {['Cloud trail', 'Identity', 'Endpoints'].map((row) => (
                    <div key={row} className="flex items-center gap-2 rounded-md border border-zinc-700 bg-zinc-950/80 px-2 py-1.5 text-[11px] text-zinc-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" />
                      {row}
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute bottom-6 left-1/2 z-10 w-[55%] -translate-x-1/2 rounded-xl border border-zinc-600 bg-zinc-900 p-3 shadow-xl">
                <p className="mb-2 font-mono text-[9px] uppercase tracking-wider text-zinc-500">Response</p>
                {['Triage owner assigned', 'Playbook attached', 'Evidence export ready'].map((t, i) => (
                  <div key={t} className="flex items-start gap-2 py-1 text-[11px] text-zinc-500">
                    <span
                      className={`mt-0.5 h-3 w-3 shrink-0 rounded-sm border ${i < 2 ? 'border-[hsl(var(--accent))] bg-[hsl(var(--accent)/0.25)]' : 'border-zinc-600'}`}
                    />
                    <span className={i < 2 ? 'text-zinc-100' : ''}>{t}</span>
                  </div>
                ))}
              </div>
              <div className="absolute right-4 top-[28%] z-10 w-[36%] rounded-xl border border-zinc-600 bg-zinc-900 p-3 shadow-xl md:right-6">
                <p className="mb-2 font-mono text-[9px] uppercase tracking-wider text-zinc-500">Context</p>
                <div className="flex flex-col gap-2">
                  {['SIEM', 'SOAR', 'MDR'].map((x) => (
                    <div
                      key={x}
                      className="rounded-md border border-zinc-700 bg-zinc-950 px-2 py-2 text-center text-[10px] font-medium tracking-wide text-zinc-200"
                    >
                      {x}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/*
  [03 Film] ProductFilmSection — restore from git history when a tour video is ready.
*/

const HOME_PRICING_TIERS = [
  {
    name: 'Free',
    price: '$0',
    period: '',
    description: 'Light exploration',
    features: ['1 seat', 'Templates & starter tasks', 'Community path'],
    cta: 'Open app',
    popular: false,
  },
  {
    name: 'Starter',
    price: '$99',
    period: '/month',
    description: 'Small teams aligning controls and evidence',
    features: ['Up to 20 seats', 'Task & template workflows', 'Email support'],
    cta: 'Get started',
    popular: true,
  },
  {
    name: 'Business',
    price: '$299',
    period: '/month',
    description: 'Programs that need depth and reporting',
    features: ['20+ seats', 'Integration auditing & reports', 'Priority support'],
    cta: 'Choose Business',
    popular: false,
  },
];

const HomePricingPreviewSection = () => (
  <section className="relative z-10 border-b border-border/50 bg-black/20 py-24 md:py-28">
    <div className="container mx-auto max-w-6xl px-6">
      <div className="mb-12 flex justify-center">
        <SectionIndex index={4} label="Plans" />
      </div>
      <h2 className="text-center text-3xl font-semibold leading-snug tracking-tight text-foreground md:text-5xl">Explore plans</h2>
      <p className="mx-auto mt-5 max-w-2xl text-center text-lg text-muted-foreground">
        Start free or scale with seats and monitoring depth. Full comparison on the pricing page.
      </p>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {HOME_PRICING_TIERS.map((plan) => (
          <div
            key={plan.name}
            className={`relative flex flex-col rounded-2xl border p-8 shadow-lg backdrop-blur-sm transition-colors ${plan.popular ? 'home-pricing-popular border-zinc-500 bg-zinc-900/70' : 'border-zinc-600 bg-zinc-900/50 hover:border-zinc-500'}`}
          >
            {plan.popular ? (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-[hsl(var(--accent)/0.4)] bg-[hsl(var(--accent)/0.12)] px-3 py-0.5 text-[10px] font-mono uppercase tracking-widest text-[hsl(var(--accent))]">
                Popular
              </span>
            ) : null}
            <h3 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">{plan.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-4xl font-semibold tracking-tight text-foreground">{plan.price}</span>
              <span className="text-sm text-muted-foreground">{plan.period}</span>
            </div>
            <ul className="mt-6 flex-1 space-y-2.5 text-sm text-muted-foreground">
              {plan.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[hsl(var(--accent))]" aria-hidden />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              {plan.name === 'Free' ? (
                <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="block">
                  <Button
                    className={`h-12 w-full rounded-xl font-medium ${plan.popular ? 'bg-foreground text-background hover:bg-foreground/90' : 'btn-secondary-gradient border border-border/80'}`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.cta}
                  </Button>
                </a>
              ) : (
                <Link to={createPageUrl('Pricing')} className="block">
                  <Button
                    className={`h-12 w-full rounded-xl font-medium ${plan.popular ? 'bg-foreground text-background hover:bg-foreground/90' : 'btn-secondary-gradient border border-border/80'}`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 flex justify-center">
        <Link
          to={createPageUrl('Pricing')}
          className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:text-[hsl(var(--accent))]"
        >
          Full pricing &amp; comparison
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  </section>
);

/* eslint-disable react/prop-types */
const DataSourceNode = ({ data }) => (
  <div className="min-w-[140px] rounded-lg border-2 border-gray-600 bg-gray-800 px-4 py-3 shadow-lg">
    <Handle id="source" type="source" position={Position.Right} style={{ background: '#9ca3af' }} />
    <div className="text-center text-sm font-medium text-white">{data.label}</div>
    <div className="text-center text-xs text-gray-300">{data.subtitle}</div>
  </div>
);

const SecurityVMNode = ({ data }) => (
  <div className="relative min-w-[200px] rounded-xl border-2 border-gray-600 bg-gray-800 px-4 pb-4 pt-6 shadow-lg">
    <Handle id="target" type="target" position={Position.Left} style={{ background: '#9ca3af' }} />
    <Handle id="source" type="source" position={Position.Right} style={{ background: '#9ca3af' }} />
    <div className="mb-3 text-center text-base font-bold text-white">Security VM</div>
    <div className="relative mb-6 grid grid-cols-2 gap-2 text-xs">
      {data.tools.map((tool) => (
        <div key={tool} className="rounded border border-gray-500 bg-gray-700 px-2 py-1 text-center font-medium text-gray-200">
          {tool}
        </div>
      ))}
    </div>
    <div className="relative mb-1 rounded border border-gray-500 bg-gray-700 px-2 py-1 text-center font-medium text-gray-200">Automation</div>
  </div>
);

const CustomerGUINode = ({ data }) => (
  <div className="min-w-[140px] rounded-lg border-2 border-gray-600 bg-gray-800 px-4 py-3 shadow-lg">
    <Handle id="target" type="target" position={Position.Left} style={{ background: '#9ca3af' }} />
    <div className="text-center text-sm font-medium text-white">{data.label}</div>
  </div>
);
/* eslint-enable react/prop-types */

const nodeTypes = {
  dataSource: DataSourceNode,
  securityVM: SecurityVMNode,
  customerGUI: CustomerGUINode,
};

const TechStackFlowchart = () => {
  const initialNodes = [
    { id: 'server', type: 'dataSource', position: { x: 100, y: 50 }, data: { label: 'Servers', subtitle: 'Data Source' } },
    { id: 'pc', type: 'dataSource', position: { x: 100, y: 150 }, data: { label: 'PCs', subtitle: 'Endpoint' } },
    { id: 'sensor', type: 'dataSource', position: { x: 100, y: 250 }, data: { label: 'Sensors', subtitle: 'IoT Device' } },
    {
      id: 'vm',
      type: 'securityVM',
      position: { x: 400, y: 150 },
      data: { tools: ['SIEM', 'HIDS', 'IR', 'EDR', 'MDR', 'XDR'] },
    },
    { id: 'gui', type: 'customerGUI', position: { x: 700, y: 150 }, data: { label: 'Customer GUI' } },
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
      markerEnd: { type: MarkerType.ArrowClosed, color: '#9ca3af' },
    },
    {
      id: 'pc-vm',
      source: 'pc',
      sourceHandle: 'source',
      target: 'vm',
      targetHandle: 'target',
      type: 'smoothstep',
      style: { stroke: '#9ca3af', strokeWidth: 2, strokeDasharray: '5,5' },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#9ca3af' },
    },
    {
      id: 'sensor-vm',
      source: 'sensor',
      sourceHandle: 'source',
      target: 'vm',
      targetHandle: 'target',
      type: 'smoothstep',
      style: { stroke: '#9ca3af', strokeWidth: 2, strokeDasharray: '5,5' },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#9ca3af' },
    },
    {
      id: 'vm-gui',
      source: 'vm',
      sourceHandle: 'source',
      target: 'gui',
      targetHandle: 'target',
      type: 'smoothstep',
      style: { stroke: '#9ca3af', strokeWidth: 2, strokeDasharray: '5,5' },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#9ca3af' },
    },
  ];

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <section className="relative z-10 border-y border-border/50 bg-background/20 py-24 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="mb-4 flex justify-center">
          <SectionIndex index={3} label="Signal flow" />
        </div>
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-semibold leading-snug tracking-tight text-foreground md:text-5xl">How monitoring signal moves</h2>
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
                markerEnd: { type: MarkerType.ArrowClosed, color: '#9ca3af' },
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

const HOME_FAQ_ITEMS = [
  {
    question: 'What is AkinSec and how does it work?',
    answer: (
      <>
        <p className="mb-3">{MARKETING_THESIS}</p>
        <p className="text-muted-foreground">
          You sign in at the app, connect telemetry and identity sources, and work alerts, timelines, tasks, and exports in one
          workspace instead of scattering context across separate consoles.
        </p>
      </>
    ),
  },
  {
    question: 'What should I use AkinSec for?',
    answer: (
      <>
        <p className="mb-3">
          Use it when you want a single operations plane for monitoring, investigation handoffs, and evidence you can show in
          reviews—without treating integration consulting as the product.
        </p>
        <p className="text-muted-foreground">
          Deeper why-us and framework context lives on the{' '}
          <Link to={createPageUrl('Why')} className="text-[hsl(var(--accent))] underline-offset-4 hover:underline">
            Why us
          </Link>{' '}
          and{' '}
          <Link to={createPageUrl('Frameworks')} className="text-[hsl(var(--accent))] underline-offset-4 hover:underline">
            Frameworks
          </Link>{' '}
          pages.
        </p>
      </>
    ),
  },
  {
    question: 'How does AI show up in AkinSec?',
    answer: (
      <>
        <p className="mb-3">{AI_WORKFLOW_DECK}</p>
        <p className="text-muted-foreground">{MODELS_FAQ_SUMMARY}</p>
      </>
    ),
  },
  {
    question: 'How much does it cost to use AkinSec?',
    answer: (
      <>
        <p className="mb-3">
          We publish Free, Starter, and Business tiers with transparent monthly (and annual) pricing—tiers scale seats, monitoring
          depth, and support.
        </p>
        <p className="text-muted-foreground">
          See live numbers and comparisons on{' '}
          <Link to={createPageUrl('Pricing')} className="text-[hsl(var(--accent))] underline-offset-4 hover:underline">
            Pricing
          </Link>
          . For procurement-specific questions, use{' '}
          <Link to={createPageUrl('Contact')} className="text-[hsl(var(--accent))] underline-offset-4 hover:underline">
            Contact
          </Link>
          .
        </p>
      </>
    ),
  },
];

const HomeFaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative z-10 border-y border-border/40 bg-background/20 py-20 md:py-28 backdrop-blur-md">
      <div className="container mx-auto max-w-3xl px-6">
        <div className="mb-12 flex justify-center">
          <SectionIndex index={5} label="FAQ" />
        </div>
        <h2 className="mb-4 text-center text-3xl font-semibold leading-snug tracking-tight text-foreground md:text-4xl">
          Common questions
        </h2>
        <p className="mb-12 text-center text-muted-foreground">
          Quick answers—full FAQ with search is on{' '}
          <Link to={createPageUrl('FAQ')} className="text-[hsl(var(--accent))] underline-offset-4 hover:underline">
            the FAQ page
          </Link>
          .
        </p>
        <div className="divide-y divide-border/60 rounded-2xl border border-border/60 bg-background/30">
          {HOME_FAQ_ITEMS.map((item, i) => {
            const open = openIndex === i;
            return (
              <div key={item.question} className="px-4 md:px-6">
                <button
                  type="button"
                  className="flex w-full items-start justify-between gap-4 py-5 text-left"
                  onClick={() => setOpenIndex(open ? -1 : i)}
                  aria-expanded={open}
                >
                  <span className="text-base font-semibold tracking-tight text-foreground md:text-lg">{item.question}</span>
                  <span className="mt-0.5 shrink-0 text-muted-foreground">
                    {open ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </span>
                </button>
                {open ? <div className="pb-5 pl-0 pr-8 text-sm leading-relaxed text-foreground/90 md:text-base">{item.answer}</div> : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section className="py-24 bg-black/20 backdrop-blur-md relative z-10">
      <div className="container mx-auto px-6 text-center">
        <h2 className="mb-6 text-3xl font-semibold leading-snug tracking-tight text-white md:text-5xl">See the SIEM in the app</h2>
        <p className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
          Open app.akinsec.com, start a trial, connect a first source, and decide if one console beats five. We meet you where your program
          is today.
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

export default function HomeRedesign() {
  return (
    <div className="relative min-h-screen">
      <HeroSection />
      <SplitWorkflowSection />
      <TechStackFlowchart key="flowchart-v2" />
      <HomePricingPreviewSection />
      <HomeFaqSection />
      <CTASection />
    </div>
  );
}
