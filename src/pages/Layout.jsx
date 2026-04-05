
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils/index.js";
import { APP_URL } from "@/marketing/voice.js";
import { ArrowRight } from "lucide-react";
import LogoPng from "@/img/AkinSec_Logo.png";
import { Button } from "@/components/ui/button";
import MarketingBackground from "@/components/MarketingBackground";
import "./Layout.css";

const landingNavItems = [
  { title: 'Why Us', page: 'Why' },
  { title: 'About', page: 'About' },
  { title: 'Pricing', page: 'Pricing' },
  { title: 'FAQ', page: 'FAQ' },
  { title: 'Contact', page: 'Contact' }
];

const LandingHeader = () => (
  <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/75">
    <div className="container mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
      <Link to={createPageUrl('Home')} className="flex items-center gap-2.5">
        <img src={LogoPng} alt="AkinSec" className="h-7 w-auto" />
        <span className="brand-wordmark text-base font-semibold tracking-tight text-foreground">
          AkinSec
        </span>
      </Link>

      <div className="flex items-center gap-6">
        <nav className="hidden items-center gap-8 md:flex">
          {landingNavItems.map(item => (
            <Link
              key={item.page}
              to={createPageUrl(item.page)}
              className="nav-link font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <a href={APP_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="font-mono text-[10px] uppercase tracking-widest">
              Open app
            </Button>
          </a>
          <Link to={createPageUrl('Pricing')}>
            <Button variant="command" size="sm" className="gap-2">
              Get Started
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </header>
);

const LandingFooter = () => (
  <footer className="relative z-20 border-t border-border/80 bg-background/90 backdrop-blur-sm">
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="mb-4 flex items-center gap-2">
            <Link to={createPageUrl('Home')} className="flex items-center gap-2">
              <img src={LogoPng} alt="AkinSec" className="h-5 w-auto" />
              <span className="brand-wordmark text-sm font-semibold text-foreground">AkinSec</span>
            </Link>
          </div>
          <p className="font-mono text-xs leading-relaxed text-muted-foreground">
            SIEM and security monitoring with AI-assisted workflows—run it in the app at app.akinsec.com.
          </p>
        </div>
        <div>
          <h3 className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Product</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to={createPageUrl('DashboardExample')} className="text-muted-foreground transition-colors hover:text-foreground">Dashboard</Link></li>
            <li><Link to={createPageUrl('FrameworksExample')} className="text-muted-foreground transition-colors hover:text-foreground">Frameworks</Link></li>
            <li><Link to={createPageUrl('TemplatesExample')} className="text-muted-foreground transition-colors hover:text-foreground">Templates</Link></li>
            <li><Link to={createPageUrl('FileAnalysisExample')} className="text-muted-foreground transition-colors hover:text-foreground">AI Analysis</Link></li>
            <li><Link to={createPageUrl('IntegrationsExample')} className="text-muted-foreground transition-colors hover:text-foreground">Integrations</Link></li>
            <li><Link to={createPageUrl('ReportsExample')} className="text-muted-foreground transition-colors hover:text-foreground">Reports</Link></li>
            <li><Link to={createPageUrl('TasksExample')} className="text-muted-foreground transition-colors hover:text-foreground">Tasks</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Company</h3>
          <ul className="space-y-2 text-sm">
            {landingNavItems.filter(item => ['About', 'Contact'].includes(item.page)).map(item => (
              <li key={item.page}><Link to={createPageUrl(item.page)} className="text-muted-foreground transition-colors hover:text-foreground">{item.title}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to={createPageUrl('FAQ')} className="text-muted-foreground transition-colors hover:text-foreground">FAQ</Link></li>
            <li><Link to={createPageUrl('Documentation')} className="text-muted-foreground transition-colors hover:text-foreground">Documentation</Link></li>
            <li><Link to={createPageUrl('Privacy')} className="text-muted-foreground transition-colors hover:text-foreground">Privacy Policy</Link></li>
            <li><Link to={createPageUrl('Terms')} className="text-muted-foreground transition-colors hover:text-foreground">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 md:flex-row">
        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} AkinSec. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
};


export default function Layout({ children }) {
    return (
      <div className="relative flex min-h-screen flex-col dark">
        <MarketingBackground />
        <ScrollToTop />
        <LandingHeader />
        <main className="relative z-10 flex-1 isolation-isolate transition-all duration-300 ease-in-out">
          {children}
        </main>
        <LandingFooter />
      </div>
    );
}
