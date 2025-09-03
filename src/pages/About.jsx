
import React from 'react';
import { 
  Shield, 
  Users, 
  Zap,
  Sparkles,
  Target,
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { createPageUrl } from '@/utils/index.js';

// Background wrapper component (mirrors Home.jsx)
const BackgroundWrapper = ({ children }) => (
  <div className="w-full">
    <div className="gradient-overlay-subtle" />
    <div className="grid-background" />
    <div className="grid-lines" />
    <div className="edge-vignette" />
    <canvas className="particle-lines" id="particle-lines-canvas-about" />
    <div className="floating-particles">
      {[...Array(9)].map((_, i) => (
        <div key={i} className="particle" />
      ))}
    </div>
    {children}
  </div>
);

export default function AboutPage() {
  React.useEffect(() => {
    const canvas = document.getElementById('particle-lines-canvas-about');
    if (!canvas) return;
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

    const count = 16;
    const particles = Array.from({ length: count }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
    }));

    const maxDist = 200;
    const repelDist = 36;
    let raf = 0;
    const step = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y; const d = Math.hypot(dx, dy);
          if (d < repelDist && d > 0.0001) {
            const f = (repelDist - d) / repelDist * 0.02;
            const ux = dx / d, uy = dy / d;
            a.vx += ux * f; a.vy += uy * f; b.vx -= ux * f; b.vy -= uy * f;
          }
          if (d < maxDist) {
            const alpha = 1 - d / maxDist;
            // Glow pass (reduced)
            ctx.save();
            ctx.strokeStyle = `rgba(139, 92, 246, ${Math.min(0.42, 0.35 * alpha)})`;
            ctx.lineWidth = 1.3;
            ctx.shadowColor = 'rgba(139, 92, 246, 0.25)';
            ctx.shadowBlur = 6;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
            ctx.restore();
            // Crisp core pass (reduced)
            ctx.strokeStyle = `rgba(139, 92, 246, ${Math.min(0.7, 0.5 * alpha)})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return (
    <BackgroundWrapper>
      {/* Hero Section */}
      <section className="py-20 md:py-32 text-center relative overflow-hidden">
        <div className="hero-gradient" />
        <div className="container mx-auto px-4 relative">
          <div className="inline-flex items-center gap-2 mx-auto mb-5 rounded-full border border-border/40 bg-card/60 backdrop-blur px-3 py-1 text-sm text-foreground/80">
            <Sparkles className="w-4 h-4 text-accent" />
            <span>Who we are</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            About AkinSec
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
            We're building the future of compliance management—accessible, automated, and intelligent for teams of any size.
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <Link to={createPageUrl('Contact')}>
              <Button size="lg" className="btn-gradient">Talk to us</Button>
            </Link>
            <Link to={createPageUrl('Pricing')}>
              <Button size="lg" variant="outline">Get started</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 items-stretch">
            <div className="lg:col-span-2">
              <div className="bg-card/60 backdrop-blur-md border border-border/30 rounded-2xl p-8 shadow-xl">
                <div className="flex items-center gap-2 mb-3 text-accent">
                  <Target className="w-5 h-5" />
                  <span className="text-sm font-medium">Our Mission</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Democratize Compliance</h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Compliance shouldn't stall innovation. We empower teams to meet and maintain standards with clarity, speed, and confidence.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  By combining automation, templates, and AI-driven guidance, AkinSec turns compliance from a reactive burden into a proactive advantage.
                </p>
              </div>
            </div>
            <div className="bg-card/60 backdrop-blur-md border border-border/30 rounded-2xl p-8 shadow-xl flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Impact in numbers</h3>
                <ul className="space-y-4">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Average setup time</span>
                    <span className="text-foreground font-bold"><span className="text-accent">&lt;</span> 1 day</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Policy templates</span>
                    <span className="text-foreground font-bold">50+</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Framework coverage</span>
                    <span className="text-foreground font-bold">SOC 2, ISO 27001, more</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 flex items-center gap-2 text-accent">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">Focused on meaningful outcomes</span>
              </div>
            </div>
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
            <div className="text-center bg-card/60 backdrop-blur-md border border-border/30 rounded-xl p-6 shadow-md hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-accent/20 text-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Security First</h3>
              <p className="text-muted-foreground">We prioritize the security of our platform and our customers' data above all else.</p>
            </div>
            <div className="text-center bg-card/60 backdrop-blur-md border border-border/30 rounded-xl p-6 shadow-md hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-accent/20 text-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Customer Success</h3>
              <p className="text-muted-foreground">Your success is our success. We're committed to helping you achieve your compliance goals.</p>
            </div>
            <div className="text-center bg-card/60 backdrop-blur-md border border-border/30 rounded-xl p-6 shadow-md hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-accent/20 text-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Innovation</h3>
              <p className="text-muted-foreground">We continuously innovate to stay ahead of evolving compliance requirements and threats.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Our Journey</h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">Key moments that shaped AkinSec.</p>
          </div>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-px bg-border/60" />
            <div className="space-y-10">
              <div className="relative">
                <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-3 h-3 rounded-full bg-accent" />
                <div className="bg-card/60 backdrop-blur-md border border-border/30 rounded-xl p-6 shadow-md max-w-[85%] ml-auto">
                  <h4 className="font-semibold text-foreground mb-1">2024 — AkinSec begins</h4>
                  <p className="text-sm text-muted-foreground">We started with a simple idea: make compliance simple and approachable for every team.</p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-3 h-3 rounded-full bg-accent" />
                <div className="bg-card/60 backdrop-blur-md border border-border/30 rounded-xl p-6 shadow-md max-w-[85%] mr-auto">
                  <h4 className="font-semibold text-foreground mb-1">2024 — First templates ship</h4>
                  <p className="text-sm text-muted-foreground">We launched a growing library of policy templates to help teams move faster.</p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-3 h-3 rounded-full bg-accent" />
                <div className="bg-card/60 backdrop-blur-md border border-border/30 rounded-xl p-6 shadow-md max-w-[85%] ml-auto">
                  <h4 className="font-semibold text-foreground mb-1">2025 — AI-assisted workflows</h4>
                  <p className="text-sm text-muted-foreground">Automations and AI guidance reduce repetitive work and help teams stay audit-ready.</p>
                </div>
              </div>
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
              <Button size="lg" className="btn-gradient">
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
    </BackgroundWrapper>
  );
}
