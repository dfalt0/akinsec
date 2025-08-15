
import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils/index.js";
import { Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const landingNavItems = [
  { title: 'Live Demo', page: 'DemoLive' },
  { title: 'Compliance', page: 'Frameworks' },
  { title: 'About', page: 'About' },
  // { title: 'Blog', page: 'Blog' },
  { title: 'Pricing', page: 'Pricing' },
  { title: 'FAQ', page: 'FAQ' },
  { title: 'Contact', page: 'Contact' }
];

const LandingHeader = () => (
<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="container flex h-14 items-center justify-between mx-auto px-4">
      <Link to={createPageUrl('Home')} className="flex items-center space-x-2">
        <Shield className="h-6 w-6 text-accent" />
        <span className="font-bold">AkinSec</span>
      </Link>
      
      <div className="flex items-center space-x-6">
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {landingNavItems.map(item => (
            <Link key={item.page} to={createPageUrl(item.page)} className="text-muted-foreground hover:text-foreground transition-colors">{item.title}</Link>
          ))}
        </nav>
        
        <div className="flex items-center space-x-4">
            <Link to={createPageUrl('Pricing')}>
              <Button className="bg-accent hover:bg-accent/90">
                Get Started <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
        </div>
      </div>
    </div>
  </header>
);

const LandingFooter = () => (
<footer className="border-t">
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <div className="flex items-center space-x-2 mb-4">
            <Link to={createPageUrl('Home')} className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-accent" />
              <span className="font-bold">AkinSec</span>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            Making compliance simple and accessible for businesses of all sizes.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Product</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to={createPageUrl('DashboardScreenshots')} className="text-muted-foreground hover:text-foreground">Dashboard</Link></li>
            <li><Link to={createPageUrl('FrameworksScreenshots')} className="text-muted-foreground hover:text-foreground">Frameworks</Link></li>
            <li><Link to={createPageUrl('TemplatesScreenshots')} className="text-muted-foreground hover:text-foreground">Templates</Link></li>
            <li><Link to={createPageUrl('FileAnalysisScreenshots')} className="text-muted-foreground hover:text-foreground">AI Analysis</Link></li>
            <li><Link to={createPageUrl('IntegrationsScreenshots')} className="text-muted-foreground hover:text-foreground">Integrations</Link></li>
            <li><Link to={createPageUrl('ReportsScreenshots')} className="text-muted-foreground hover:text-foreground">Reports</Link></li>
            <li><Link to={createPageUrl('TasksScreenshots')} className="text-muted-foreground hover:text-foreground">Tasks</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            {landingNavItems.filter(item => ['About', 'Blog', 'Contact'].includes(item.page)).map(item => (
              <li key={item.page}><Link to={createPageUrl(item.page)} className="text-muted-foreground hover:text-foreground">{item.title}</Link></li>
            ))}
            {/* <li><Link to={createPageUrl('Careers')} className="text-muted-foreground hover:text-foreground">Careers</Link></li> */}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to={createPageUrl('FAQ')} className="text-muted-foreground hover:text-foreground">FAQ</Link></li>
            <li><Link to={createPageUrl('Documentation')} className="text-muted-foreground hover:text-foreground">Documentation</Link></li>
            <li><Link to={createPageUrl('Privacy')} className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
            <li><Link to={createPageUrl('Terms')} className="text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t mt-8 pt-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} AkinSec. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);


export default function Layout({ children, currentPageName }) {
    // This style block ensures the default theme is applied, since theme switching is removed.
    const defaultThemeCss = `
      --primary: 220 13% 18%;
      --primary-foreground: 210 20% 98%;
      --secondary: 220 14% 96%;
      --secondary-foreground: 220 9% 46%;
      --muted: 220 14% 96%;
      --muted-foreground: 220 9% 46%;
      --accent: 217 91% 60%;
      --accent-foreground: 210 20% 98%;
      --destructive: 0 84% 60%;
      --destructive-foreground: 210 20% 98%;
      --border: 220 13% 91%;
      --input: 220 13% 91%;
      --ring: 217 91% 60%;
      --background: 0 0% 100%;
      --foreground: 220 13% 18%;
      --card: 0 0% 100%;
      --card-foreground: 220 13% 18%;
      --popover: 0 0% 100%;
      --popover-foreground: 220 13% 18%;
    `;

    return (
      <div className={`min-h-screen flex flex-col bg-background text-foreground relative`}>
        <style jsx global>{`
          :root {
            ${defaultThemeCss}
          }
        `}</style>
        
        {/* Vercel-style Grid Background */}
        <div className="grid-background"></div>
        <div className="grid-lines"></div>
        <div className="architectural-grid"></div>
        <div className="gradient-overlay"></div>
        <div className="floating-particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
        
        <LandingHeader />
        <main className="flex-1 relative z-10">{children}</main>
        <LandingFooter />
      </div>
    );
}
