import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Check, Shield, FileText, CheckSquare, Zap, BarChart3, CheckCircle, AlertTriangle, Network } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils/index.js';
import dashboardPreview from '@/img/dashboard-preview-sc.png';

// Background wrapper component
const BackgroundWrapper = ({ children }) => (
  <div className="w-full">
    {/* Enhanced background layers */}
    <div className="gradient-overlay-subtle" />
    <div className="grid-background" />
    <div className="grid-lines" />
    <div className="edge-vignette" />
    <canvas className="particle-lines" id="particle-lines-canvas" />
    <div className="floating-particles">
      {[...Array(9)].map((_, i) => (
        <div key={i} className="particle" />
      ))}
    </div>
    {children}
  </div>
);

// Subtle tilt on hover wrapper
function TiltCard({ children, maxTilt = 6, hoverLift = 8, className = '' }) {
  const ref = useRef(null);
  const frameRef = useRef(0);

  const animateTo = (transform) => {
    if (!ref.current) return;
    ref.current.style.transform = transform;
  };

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;   // 0..1
    const y = (e.clientY - rect.top) / rect.height;  // 0..1

    const rotX = (0.5 - y) * (maxTilt * 2); // invert so top tilts back
    const rotY = (x - 0.5) * (maxTilt * 2);

    const transform = `perspective(900px) translateY(-${hoverLift}px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale(1.01)`;

    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => animateTo(transform));
  };

  const handleLeave = () => {
    cancelAnimationFrame(frameRef.current);
    animateTo('perspective(900px) translateY(0px) rotateX(0deg) rotateY(0deg) scale(1)');
  };

  return (
    <div
      ref={ref}
      className={`tilt-card ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  );
}

// Magnify on hover component
function MagnifyImage({ src, alt, lensSize = 160, zoom = 2, className = '', onClick }) {
  const containerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [lensPos, setLensPos] = useState({ x: 0, y: 0 });
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      setContainerSize({ width: rect.width, height: rect.height });
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handleMove = (e) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    let x = clientX - rect.left;
    let y = clientY - rect.top;

    // Allow lens center to move beyond the image bounds by up to half lens size
    const half = lensSize / 2;
    const minX = -half;
    const minY = -half;
    const maxX = rect.width + half;
    const maxY = rect.height + half;

    x = Math.max(minX, Math.min(maxX, x));
    y = Math.max(minY, Math.min(maxY, y));

    setLensPos({ x, y });
  };

  // Compute background sizing and position in pixels for accurate zoom
  const bgWidth = Math.max(1, containerSize.width * zoom);
  const bgHeight = Math.max(1, containerSize.height * zoom);

  // Clamp the sampling point to the actual image bounds (0..width/height)
  const sampleX = Math.max(0, Math.min(containerSize.width, lensPos.x));
  const sampleY = Math.max(0, Math.min(containerSize.height, lensPos.y));

  const bgPosX = -((sampleX * zoom) - lensSize / 2);
  const bgPosY = -((sampleY * zoom) - lensSize / 2);

  const bgBase = {
    backgroundImage: `url(${src})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: `${bgWidth}px ${bgHeight}px`,
    backgroundPosition: `${bgPosX}px ${bgPosY}px`,
  };

  const containerHandlers = {
    onMouseEnter: () => setIsHovering(true),
    onMouseLeave: () => setIsHovering(false),
    onMouseMove: handleMove,
    onTouchStart: (e) => { setIsHovering(true); handleMove(e); },
    onTouchMove: handleMove,
    onTouchEnd: () => setIsHovering(false),
    onClick,
  };

  const lensStyle = {
    width: `${lensSize}px`,
    height: `${lensSize}px`,
    left: `${lensPos.x - lensSize / 2}px`,
    top: `${lensPos.y - lensSize / 2}px`,
  };

  return (
    <div
      ref={containerRef}
      className={`magnifier-container cursor-zoom-in ${className}`}
      {...containerHandlers}
      aria-label={alt}
      role="img"
    >
      <img src={src} alt={alt} className="magnifier-image" loading="lazy" />
      {isHovering && (
        <div className="magnifier-lens" style={{ ...bgBase, ...lensStyle }} />
      )}
    </div>
  );
}

const FeatureCard = ({ icon: Icon, title, description }) => (
  <Card className="bg-card/60 backdrop-blur-md border-border/30 shadow-xl text-center p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 hover:bg-card/80 min-h-[200px] sm:min-h-[220px] lg:min-h-[240px] flex flex-col">
    <div className="w-16 h-16 bg-accent/20 text-accent rounded-xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm flex-shrink-0">
      <Icon className="w-8 h-8" />
    </div>
    <h3 className="text-xl font-bold text-foreground mb-2 flex-shrink-0">{title}</h3>
    <p className="text-muted-foreground text-sm leading-relaxed flex-1">{description}</p>
  </Card>
);

const StepCard = ({ number, title, description }) => (
  <div className="relative">
    <div className="absolute -left-8 top-1/2 -translate-y-1/2 z-10 w-16 h-16 rounded-full flex items-center justify-center ring-2 ring-white/70 dark:ring-neutral-800 shadow-xl bg-gradient-to-br from-indigo-500 via-purple-400 to-pink-500 text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.8)]">
      <div className="w-12 h-12 rounded-full bg-black/15 backdrop-blur-[1px] flex items-center justify-center">
        <span className="text-3xl font-extrabold leading-none">{number}</span>
      </div>
    </div>
    <Card className="bg-card/60 backdrop-blur-md border-border/30 shadow-xl p-6 pl-14 hover:bg-card/80 hover:shadow-2xl transition-all duration-300">
      <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Card>
  </div>
);

function RotatingBadge({ items, intervalMs = 5000, transitionMs = 1200 }) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState('in'); // 'in' | 'out'
  const outTimerRef = useRef(null);

  // Schedule fade-out near the end of the interval
  useEffect(() => {
    const visibleTimer = setTimeout(() => setPhase('out'), Math.max(0, intervalMs - transitionMs));
    return () => clearTimeout(visibleTimer);
  }, [index, intervalMs, transitionMs]);

  // Fallback for when animations are disabled (prefers-reduced-motion)
  useEffect(() => {
    if (phase !== 'out') return;
    outTimerRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % items.length);
      setPhase('in');
    }, transitionMs);
    return () => {
      if (outTimerRef.current) clearTimeout(outTimerRef.current);
    };
  }, [phase, transitionMs, items.length]);

  const animationStyle = { animationDuration: `${transitionMs}ms` };

  return (
    <Badge
      variant="outline"
      className={`mb-5 font-semibold py-2 px-4 rounded-full text-base 
        bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 
        border border-blue-500/40 dark:border-blue-400/30 badge-vibrant
        text-indigo-900 dark:text-fuchsia-200 shadow-md 
        ring-1 ring-blue-500/25 dark:ring-blue-400/20 
        hover:shadow-lg transition-shadow ${
        phase === 'in' ? 'one-liner-bubble-in' : 'one-liner-bubble-out'
      }`}
      style={animationStyle}
      onAnimationEnd={(e) => {
        if (phase === 'out' && e.currentTarget === e.target) {
          if (outTimerRef.current) clearTimeout(outTimerRef.current);
          setIndex((prev) => (prev + 1) % items.length);
          setPhase('in');
        }
      }}
    >
      <span className="one-liner-viewport" aria-live="polite">
        <span
          className={phase === 'in' ? 'one-liner-slide-in' : 'one-liner-slide-out'}
          style={animationStyle}
        >
          {items[index]}
        </span>
      </span>
    </Badge>
  );
}

export default function HomePage() {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const rafRef = useRef(0);
  
  const phrases = ["AkinSec", "Simple Compliance", "Simply Compliant", "Secure Your Business", "AI Compliance", "What's \"compliance\"?", "What's a computer?", "D'you check that file, Jeff?", "My cOmPliAnCe isn't running...", "Boss said I needed this?"];
  const typingSpeed = 150;
  const deletingSpeed = 75;
  const pauseDuration = 2000;

  useEffect(() => {
    // Particle line drawer: connects nearby floating particles with lines
    const canvas = document.getElementById('particle-lines-canvas');
    if (!canvas) return;
    canvasRef.current = canvas;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize pseudo-particles matching the DOM particles count with random positions/velocities
    const count = 20; // separate from DOM bubbles for smoother lines
    const particles = Array.from({ length: count }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }));
    particlesRef.current = particles;

    const maxDist = 210; // connect within this distance
    const repelDist = 40; // gently repel when too close to avoid clumping

    const step = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      // Update particle positions
      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }

      // Draw connections
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const a = particlesRef.current[i];
          const b = particlesRef.current[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);

          // Soft repel at close distances
          if (d < repelDist && d > 0.0001) {
            const f = (repelDist - d) / repelDist * 0.02;
            const ux = dx / d;
            const uy = dy / d;
            a.vx += ux * f;
            a.vy += uy * f;
            b.vx -= ux * f;
            b.vy -= uy * f;
          }

          if (d < maxDist) {
            const alpha = 1 - d / maxDist;
            // Glow pass (reduced)
            ctx.save();
            ctx.strokeStyle = `rgba(99, 102, 241, ${Math.min(0.45, 0.4 * alpha)})`;
            ctx.lineWidth = 1.4;
            ctx.shadowColor = 'rgba(99, 102, 241, 0.25)';
            ctx.shadowBlur = 6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            ctx.restore();
            // Crisp core pass (reduced)
            ctx.strokeStyle = `rgba(99, 102, 241, ${Math.min(0.7, 0.5 * alpha)})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);
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

  const oneLiners = useMemo(
    () => [
      'AI-Powered Compliance Automation',
      'IT Compliance + Simplicity + AI',
      'Simplify Audits, Instantly',
      'Continuous Monitoring Made Easy',
      'Evidence Collection, Automated',
      'Ship Faster, Stay Compliant',
      'Compliance Made Simple',
      'Automated Compliance Intelligence',
      'This is Next-Gen Compliance',
      'AI-Driven Organization',
      'AI File Analysis',
      'Automating Trust & Security'
    ],
    []
  );

  // Close on ESC when modal is open
  useEffect(() => {
    if (!isPreviewOpen) return;
    const handler = (e) => { if (e.key === 'Escape') setIsPreviewOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isPreviewOpen]);

  return (
    <BackgroundWrapper>
      <style>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
        .blinking-cursor {
          animation: blink 1s step-end infinite;
          font-weight: 300;
        }
      `}</style>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 text-center overflow-hidden">
        <div className="hero-gradient" />
        <div className="container mx-auto px-4 relative">
          <RotatingBadge items={oneLiners} intervalMs={6200} transitionMs={1100} />
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight flex items-center justify-center min-h-[80px] md:min-h-[150px]">
            {text}
            <span className="blinking-cursor" aria-hidden="true">|</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground mb-8">
            <b>AkinSec</b> is the all-in-one platform to help you understand IT Compliance, and automate it with the <span className="text-rainbow-glow">power of AI</span>.
          </p>
          <div className="flex justify-center gap-4">
            <Link to={createPageUrl('Pricing')}>
              <Button size="lg" className="btn-gradient">
                Get Started Free <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            {/* <Link to={createPageUrl('Dashboard')}> */}
            <Link to="https://app.akinsec.com">
              <Button size="lg" variant="outline" className="btn-rainbow">
                Go to App
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* {activeFeature && (
        <div
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveFeature(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[85vh] overflow-auto bg-card/95 border border-border/50 rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button
              className="absolute -top-3 -right-3 bg-white/90 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 rounded-full w-9 h-9 flex items-center justify-center shadow-md border border-neutral-200/60 dark:border-neutral-700/60"
              onClick={() => setActiveFeature(null)}
              aria-label="Close"
            >
              ✕
            </button>
            <div className="p-6">
              {activeFeature === 'metrics' && (
                <>
                  <div className="mb-4 flex items-center gap-2">
                    <span className="inline-flex items-center px-2 py-0.5 text-xs rounded-full border border-border/60 bg-card/60">Live</span>
                    <h3 className="text-2xl font-bold">Real-time Metrics</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">A single, explainable score driven by control status, evidence freshness, overdue work, and integration signals—updated on every change.</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="rounded-xl border border-border/60 p-4 bg-card/70">
                      <div className="flex items-center gap-2 font-semibold mb-2"><BarChart3 className="w-4 h-4 text-indigo-600"/> Score model</div>
                      <p className="text-sm text-muted-foreground">Weighted controls (pass/partial/fail), evidence age decay, and penalties for critical overdue tasks. Each score shows its top drivers.</p>
                    </div>
                    <div className="rounded-xl border border-border/60 p-4 bg-card/70">
                      <div className="flex items-center gap-2 font-semibold mb-2"><CheckCircle className="w-4 h-4 text-green-600"/> Task analytics</div>
                      <p className="text-sm text-muted-foreground">Rolling 7/30-day throughput, on-time vs late, and SLA-breach forecasts based on owner load and historical velocity.</p>
                    </div>
                    <div className="rounded-xl border border-border/60 p-4 bg-card/70">
                      <div className="flex items-center gap-2 font-semibold mb-2"><Shield className="w-4 h-4 text-purple-600"/> Risk map</div>
                      <p className="text-sm text-muted-foreground">Aggregate risk by framework, owner, and domain with drill downs to the specific failed control or missing artifact.</p>
                    </div>
                    <div className="rounded-xl border border-border/60 p-4 bg-card/70">
                      <div className="flex items-center gap-2 font-semibold mb-2"><FileText className="w-4 h-4 text-blue-600"/> Trends & export</div>
                      <p className="text-sm text-muted-foreground">Compare week-over-week deltas and export CSV/PNG snapshots for auditors and leadership.</p>
                    </div>
                  </div>
                </>
              )}
              {activeFeature === 'alerts' && (
                <>
                  <div className="mb-4 flex items-center gap-2">
                    <span className="inline-flex items-center px-2 py-0.5 text-xs rounded-full border border-border/60 bg-card/60">Prioritized</span>
                    <h3 className="text-2xl font-bold">Risk Alerts</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">Signals are scored by impact and proximity to deadlines. Every alert includes a one-click remediation path.</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="rounded-xl border border-border/60 p-4 bg-card/70">
                      <div className="flex items-center gap-2 font-semibold mb-2"><FileText className="w-4 h-4 text-pink-600"/> Evidence expiry</div>
                      <p className="text-sm text-muted-foreground">Notify when artifacts near expiry (e.g., SOC 2 policy attestation less than 365 days) and auto-create renewal tasks.</p>
                    </div>
                    <div className="rounded-xl border border-border/60 p-4 bg-card/70">
                      <div className="flex items-center gap-2 font-semibold mb-2"><AlertTriangle className="w-4 h-4 text-amber-600"/> Integration drift</div>
                      <p className="text-sm text-muted-foreground">Flag vendors with expiring DPAs, missing pen-test reports, or scope changes pulled from integrations.</p>
                    </div>
                    <div className="rounded-xl border border-border/60 p-4 bg-card/70">
                      <div className="flex items-center gap-2 font-semibold mb-2"><Check className="w-4 h-4 text-green-600"/> Coverage gaps</div>
                      <p className="text-sm text-muted-foreground">Highlight controls without mapped evidence, grouped by framework (SOC 2, ISO 27001, etc.).</p>
                    </div>
                    <div className="rounded-xl border border-border/60 p-4 bg-card/70">
                      <div className="flex items-center gap-2 font-semibold mb-2"><Calendar className="w-4 h-4 text-blue-600"/> Upcoming deadlines</div>
                      <p className="text-sm text-muted-foreground">Audit dates, renewals, and quarterly control tests with owners and due dates in one list.</p>
                    </div>
                  </div>
                </>
              )}
              {activeFeature === 'actions' && (
                <>
                  <div className="mb-4 flex items-center gap-2">
                    <span className="inline-flex items-center px-2 py-0.5 text-xs rounded-full border border-border/60 bg-card/60">Guided</span>
                    <h3 className="text-2xl font-bold">Quick Actions</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">Pre-wired flows that spin up the right tasks, owners, and artifacts—so work starts in seconds, not meetings.</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="rounded-xl border border-border/60 p-4 bg-card/70">
                      <div className="flex items-center gap-2 font-semibold mb-2"><CheckSquare className="w-4 h-4 text-indigo-600"/> New control</div>
                      <p className="text-sm text-muted-foreground">Pick a framework control—we generate a policy draft, evidence checklist, and an owner-routed task with due dates.</p>
                    </div>
                    <div className="rounded-xl border border-border/60 p-4 bg-card/70">
                      <div className="flex items-center gap-2 font-semibold mb-2"><Shield className="w-4 h-4 text-purple-600"/> Vendor audit</div>
                      <p className="text-sm text-muted-foreground">Collect SOC reports/DPAs, run the questionnaire, and produce a residual-risk summary with remediation tasks.</p>
                    </div>
                    <div className="rounded-xl border border-border/60 p-4 bg-card/70">
                      <div className="flex items-center gap-2 font-semibold mb-2"><FileText className="w-4 h-4 text-emerald-600"/> Report pack</div>
                      <p className="text-sm text-muted-foreground">Board-ready PDF: score trend, top risks, overdue items, next-week plan. One click to export.</p>
                    </div>
                    <div className="rounded-xl border border-border/60 p-4 bg-card/70">
                      <div className="flex items-center gap-2 font-semibold mb-2"><Zap className="w-4 h-4 text-amber-600"/> Evidence capture</div>
                      <p className="text-sm text-muted-foreground">Upload or link artifacts—we auto-tag to controls, set review cadence, and assign approvers.</p>
                    </div>
                  </div>
                </>
              )}
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setActiveFeature(null)}>Close</Button>
                <Link to={createPageUrl('Pricing')}><Button className="btn-gradient">Get Started <ArrowRight className="w-4 h-4 ml-2"/></Button></Link>
              </div>
            </div>
          </div>
        </div>
      )} */}

      {/* Dashboard Preview Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-full rounded-2xl overflow-hidden border border-border/40 shadow-2xl bg-card/70 backdrop-blur-sm">
            <MagnifyImage
              src={dashboardPreview}
              alt="Compliance Dashboard preview"
              lensSize={180}
              zoom={2.2}
              className="w-full h-auto"
              onClick={() => setIsPreviewOpen(true)}
            />
          </div>

          {/* Fullscreen popout image without magnifier */}
          {isPreviewOpen && (
            <div
              className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setIsPreviewOpen(false)}
            >
              <div
                className="relative max-w-[95vw] max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute -top-3 -right-3 bg-white/90 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 rounded-full w-9 h-9 flex items-center justify-center shadow-md border border-neutral-200/60 dark:border-neutral-700/60"
                  onClick={() => setIsPreviewOpen(false)}
                  aria-label="Close preview"
                >
                  ✕
                </button>
                <img
                  src={dashboardPreview}
                  alt="Compliance Dashboard preview (expanded)"
                  className="rounded-lg shadow-2xl max-w-[95vw] max-h-[90vh] object-contain"
                />
              </div>
            </div>
          )}
          
          {/* Feature Highlights */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 max-w-full">
            <TiltCard>
              <Card onClick={() => setActiveFeature('metrics')} role="button" tabIndex={0} onKeyDown={(e)=>{ if(e.key==='Enter' || e.key===' '){ setActiveFeature('metrics'); } }} className="bg-card/70 backdrop-blur-sm border-border/40 shadow-lg card-glow-blue cursor-pointer hover:bg-card/80">
                <CardHeader>
                  <CardTitle className="flex items-center gap-4">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Real-time Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Monitor your compliance score, task completion rates, and progress across all frameworks in real-time.
                  </p>
                  <div className="bg-muted rounded-lg p-4">
                    <div className="text-sm text-muted-foreground mb-2">Features shown:</div>
                    <ul className="text-sm text-foreground space-y-1">
                      <li>• Compliance score calculation</li>
                      <li>• Task completion tracking</li>
                      <li>• Risk level indicators</li>
                      <li>• Monthly progress trends</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TiltCard>
            <TiltCard>
              <Card onClick={() => setActiveFeature('alerts')} role="button" tabIndex={0} onKeyDown={(e)=>{ if(e.key==='Enter' || e.key===' '){ setActiveFeature('alerts'); } }} className="bg-card/70 backdrop-blur-sm border-border/40 shadow-lg card-glow-amber cursor-pointer hover:bg-card/80">
                <CardHeader>
                  <CardTitle className="flex items-center gap-4">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    Risk Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Stay informed about overdue tasks, high-risk integrations, and compliance gaps that need attention.
                  </p>
                  <div className="bg-muted rounded-lg p-4">
                    <div className="text-sm text-muted-foreground mb-2">Alert types:</div>
                    <ul className="text-sm text-foreground space-y-1">
                      <li>• Overdue compliance tasks</li>
                      <li>• High-risk integrations</li>
                      <li>• Framework gaps</li>
                      <li>• Upcoming deadlines</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TiltCard>
            <TiltCard>
              <Card onClick={() => setActiveFeature('actions')} role="button" tabIndex={0} onKeyDown={(e)=>{ if(e.key==='Enter' || e.key===' '){ setActiveFeature('actions'); } }} className="bg-card/70 backdrop-blur-sm border-border/40 shadow-lg card-glow-purple cursor-pointer hover:bg-card/80">
                <CardHeader>
                  <CardTitle className="flex items-center gap-4">
                    <Network className="w-5 h-5 text-purple-600" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Access commonly used features quickly with one-click actions for creating documents and auditing integrations.
                  </p>
                  <div className="bg-muted rounded-lg p-4">
                    <div className="text-sm text-muted-foreground mb-2">Quick actions:</div>
                    <ul className="text-sm text-foreground space-y-1">
                      <li>• Create compliance documents</li>
                      <li>• Audit integrations</li>
                      <li>• Generate reports</li>
                      <li>• Add new tasks</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">A New Era of Compliance Management</h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
              Everything you need to build, manage, and scale your compliance program.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link to={createPageUrl('FileAnalysisExample')} className="block">
              <FeatureCard
                icon={Zap}
                title="AI File Analysis"
                description="Instantly analyze documents for compliance gaps and get actionable recommendations."
              />
            </Link>
            <Link to={createPageUrl('TasksExample')} className="block">
              <FeatureCard
                icon={CheckSquare}
                title="Automated Task Management"
                description="Create and track compliance tasks, assign owners, and monitor progress on a centralized board."
              />
            </Link>
            <Link to={createPageUrl('TemplatesExample')} className="block">
              <FeatureCard
                icon={FileText}
                title="Comprehensive Templates"
                description="Access a library of pre-built policies, procedures, and forms for various frameworks."
              />
            </Link>
            <Link to={createPageUrl('IntegrationsExample')} className="block">
              <FeatureCard
                icon={Shield}
                title="Integration Auditing"
                description="Assess third-party vendor risk and maintain a compliant app ecosystem."
              />
            </Link>
            <Link to={createPageUrl('FrameworksExample')} className="block">
              <FeatureCard
                icon={Check}
                title="Framework Alignment"
                description="Align your controls and evidence with multiple compliance frameworks like SOC 2, ISO 27001, and more."
              />
            </Link>
            <Link to={createPageUrl('ReportsExample')} className="block">
              <FeatureCard
                icon={ArrowRight}
                title="Actionable Reporting"
                description="Generate insightful reports on your compliance posture and share progress with stakeholders."
              />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Get Compliant in 3 Easy Steps</h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
              Streamline your path to compliance with our intuitive platform.
            </p>
          </div>
          <div className="max-w-2xl mx-auto space-y-8">
            <TiltCard>
              <StepCard
                number="1"
                title="Connect & Analyze"
                description="Integrate your tools and upload your existing documents. Our AI provides an instant baseline of your compliance posture."
              />
            </TiltCard>
            <TiltCard>
              <StepCard
                number="2"
                title="Implement & Remediate"
                description="Use our template library and task management system to address gaps and implement necessary controls."
              />
            </TiltCard>
            <TiltCard>
              <StepCard
                number="3"
                title="Monitor & Report"
                description="Continuously monitor your compliance status, manage tasks, and generate reports to prove compliance."
              />
            </TiltCard>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Automate Your Compliance?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Join other forward-thinking companies and turn compliance from a burden into a business advantage.
          </p>
          <Link to={createPageUrl('Pricing')}>
            <Button size="lg" className="btn-cta-unique">
              <span>Start for Free Today</span> <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </BackgroundWrapper>
  );
}