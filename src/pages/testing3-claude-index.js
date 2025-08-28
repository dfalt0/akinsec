import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Check, Shield, FileText, CheckSquare, Zap, BarChart3, CheckCircle, AlertTriangle, Network } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils/index.js';
import dashboardPreview from '@/img/dashboard-preview-sc.png';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <Card className="bg-card/60 backdrop-blur-md border-border/30 shadow-xl text-center p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 hover:bg-card/80">
    <div className="w-16 h-16 bg-accent/20 text-accent rounded-xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
      <Icon className="w-8 h-8" />
    </div>
    <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </Card>
);

const StepCard = ({ number, title, description }) => (
  <div className="relative">
    <div className="absolute -left-4 top-1 w-12 h-12 bg-accent/20 text-accent rounded-full flex items-center justify-center text-xl font-bold backdrop-blur-sm">
      {number}
    </div>
    <Card className="bg-card/60 backdrop-blur-md border-border/30 shadow-xl p-6 pl-12 hover:bg-card/80 hover:shadow-2xl transition-all duration-300">
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
      className={`mb-4 border-accent/50 text-accent font-semibold py-1 px-3 rounded-full ${
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
  
  const phrases = ["AkinSec", "Simple Compliance", "Simply Compliant", "Secure Your Business", "AI Compliance", "What's \"compliance\"?", "What's a computer?", "D'you check that file, Jeff?", "My cOmPliAnCe isn't running...", "Boss said I needed this?"];
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

  return (
    <div className="w-full">
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
          <RotatingBadge items={oneLiners} intervalMs={4200} transitionMs={1100} />
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight flex items-center justify-center min-h-[80px] md:min-h-[150px]">
            {text}
            <span className="blinking-cursor" aria-hidden="true">|</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground mb-8">
            AkinSec is the all-in-one platform to automate compliance tasks, manage integrations, and stay ahead of regulations with AI-driven insights.
          </p>
          <div className="flex justify-center gap-4">
            <Link to={createPageUrl('Pricing')}>
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Get Started Free <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            {/* <Link to={createPageUrl('Dashboard')}> */}
            <Link to="https://app.akinsec.com">
              <Button size="lg" variant="outline">
                Go to App
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-full rounded-2xl overflow-hidden border border-border/40 shadow-2xl bg-card/70 backdrop-blur-sm">
            <img
              src={dashboardPreview}
              alt="Compliance Dashboard preview"
              className="w-full h-auto object-cover max-w-full"
              loading="lazy"
            />
          </div>
          
          {/* Feature Highlights */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 max-w-full">
            <Card className="bg-card/70 backdrop-blur-sm border-border/40 shadow-lg">
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
            <Card className="bg-card/70 backdrop-blur-sm border-border/40 shadow-lg">
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
            <Card className="bg-card/70 backdrop-blur-sm border-border/40 shadow-lg">
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
            <Link to={createPageUrl('FileAnalysisScreenshots')} className="block">
              <FeatureCard
                icon={Zap}
                title="AI File Analysis"
                description="Instantly analyze documents for compliance gaps and get actionable recommendations."
              />
            </Link>
            <Link to={createPageUrl('TasksScreenshots')} className="block">
              <FeatureCard
                icon={CheckSquare}
                title="Automated Task Management"
                description="Create and track compliance tasks, assign owners, and monitor progress on a centralized board."
              />
            </Link>
            <Link to={createPageUrl('TemplatesScreenshots')} className="block">
              <FeatureCard
                icon={FileText}
                title="Comprehensive Templates"
                description="Access a library of pre-built policies, procedures, and forms for various frameworks."
              />
            </Link>
            <Link to={createPageUrl('IntegrationsScreenshots')} className="block">
              <FeatureCard
                icon={Shield}
                title="Integration Auditing"
                description="Assess third-party vendor risk and maintain a compliant app ecosystem."
              />
            </Link>
            <Link to={createPageUrl('frameworksscreenshots')} className="block">
              <FeatureCard
                icon={Check}
                title="Framework Alignment"
                description="Align your controls and evidence with multiple compliance frameworks like SOC 2, ISO 27001, and more."
              />
            </Link>
            <Link to={createPageUrl('ReportsScreenshots')} className="block">
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
            <StepCard
              number="1"
              title="Connect & Analyze"
              description="Integrate your tools and upload your existing documents. Our AI provides an instant baseline of your compliance posture."
            />
            <StepCard
              number="2"
              title="Implement & Remediate"
              description="Use our template library and task management system to address gaps and implement necessary controls."
            />
            <StepCard
              number="3"
              title="Monitor & Report"
              description="Continuously monitor your compliance status, manage tasks, and generate reports to prove compliance."
            />
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
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Start for Free Today <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}