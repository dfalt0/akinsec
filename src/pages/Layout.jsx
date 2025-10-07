
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils/index.js";
import { ArrowRight } from "lucide-react";
import LogoPng from "@/img/AkinSec_Logo.png";
import { Button } from "@/components/ui/button";

const landingNavItems = [
  // { title: 'Live Demo', page: 'DemoLive' },
  { title: 'Why Us', page: 'Why' },
  { title: 'About', page: 'About' },
  // { title: 'Blog', page: 'Blog' },
  { title: 'Pricing', page: 'Pricing' },
  { title: 'FAQ', page: 'FAQ' },
  { title: 'Contact', page: 'Contact' }
];

const LandingHeader = () => (
<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    {/* Announcement bar */}
    <div className="w-full bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 text-foreground/80 text-xs">
      {/* <div className="container mx-auto px-4 py-1.5 text-center">
        <span className="hidden sm:inline">AkinSec Cloud is coming. </span>
        <Link to={createPageUrl('Pricing')} className="font-medium text-accent nav-link-inline">Sign up for early access</Link>
      </div> */}
    </div>
    <div className="container flex h-14 items-center justify-between mx-auto px-4">
      <Link to={createPageUrl('Home')} className="flex items-center space-x-2">
        <img src={LogoPng} alt="AkinSec" className="h-6 w-auto" />
        <span className="font-bold brand-glow">AkinSec</span>
      </Link>
      
      <div className="flex items-center space-x-6">
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {landingNavItems.map(item => (
            <Link key={item.page} to={createPageUrl(item.page)} className="text-muted-foreground hover:text-foreground transition-colors nav-link">{item.title}</Link>
          ))}
        </nav>
        
        <div className="flex items-center space-x-4">
            <Link to={createPageUrl('Pricing')}>
              <Button className="bg-black text-white hover:bg-white hover:text-black border-2 border-black hover:border-white transition-all duration-300 group">
                Get Started <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
        </div>
      </div>
    </div>
  </header>
);

const LandingFooter = () => (
<footer className="border-t bg-background/95 backdrop-blur-sm relative z-20">
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <div className="flex items-center space-x-2 mb-4">
            <Link to={createPageUrl('Home')} className="flex items-center space-x-2">
              <img src={LogoPng} alt="AkinSec" className="h-5 w-auto" />
              <span className="font-bold">AkinSec</span>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            Making IT Security automated and accessible for businesses of all sizes.  
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Product</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to={createPageUrl('DashboardExample')} className="text-muted-foreground hover:text-foreground">Dashboard</Link></li>
            <li><Link to={createPageUrl('FrameworksExample')} className="text-muted-foreground hover:text-foreground">Frameworks</Link></li>
            <li><Link to={createPageUrl('TemplatesExample')} className="text-muted-foreground hover:text-foreground">Templates</Link></li>
            <li><Link to={createPageUrl('FileAnalysisExample')} className="text-muted-foreground hover:text-foreground">AI Analysis</Link></li>
            <li><Link to={createPageUrl('IntegrationsExample')} className="text-muted-foreground hover:text-foreground">Integrations</Link></li>
            <li><Link to={createPageUrl('ReportsExample')} className="text-muted-foreground hover:text-foreground">Reports</Link></li>
            <li><Link to={createPageUrl('TasksExample')} className="text-muted-foreground hover:text-foreground">Tasks</Link></li>
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

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
};


export default function Layout({ children, currentPageName }) {
    // Dark theme as default - inspired by roocode.com aesthetic
    const darkThemeCss = `
      --background: 0 0% 3.9%;
      --foreground: 0 0% 98%;
      --card: 0 0% 3.9%;
      --card-foreground: 0 0% 98%;
      --popover: 0 0% 3.9%;
      --popover-foreground: 0 0% 98%;
      --primary: 0 0% 98%;
      --primary-foreground: 0 0% 9%;
      --secondary: 0 0% 14.9%;
      --secondary-foreground: 0 0% 98%;
      --muted: 0 0% 14.9%;
      --muted-foreground: 0 0% 63.9%;
      --accent: 0 0% 14.9%;
      --accent-foreground: 0 0% 98%;
      --destructive: 0 62.8% 30.6%;
      --destructive-foreground: 0 0% 98%;
      --border: 0 0% 14.9%;
      --input: 0 0% 14.9%;
      --ring: 0 0% 83.1%;
      --chart-1: 220 70% 50%;
      --chart-2: 160 60% 45%;
      --chart-3: 30 80% 55%;
      --chart-4: 280 65% 60%;
      --chart-5: 340 75% 55%;
      --sidebar-background: 240 5.9% 10%;
      --sidebar-foreground: 240 4.8% 95.9%;
      --sidebar-primary: 224.3 76.3% 48%;
      --sidebar-primary-foreground: 0 0% 100%;
      --sidebar-accent: 240 3.7% 15.9%;
      --sidebar-accent-foreground: 240 4.8% 95.9%;
      --sidebar-border: 240 3.7% 15.9%;
      --sidebar-ring: 217.2 91.2% 59.8%;
    `;

    return (
      <div className={`min-h-screen flex flex-col bg-background text-foreground relative dark`}>
        <style jsx global>{`
          :root {
            ${darkThemeCss}
          }
        `}</style>
        
        <ScrollToTop />
        <LandingHeader />
        <main className="flex-1 relative z-10 transition-all duration-300 ease-in-out">{children}</main>
        <div className="relative z-50">
          <LandingFooter />
        </div>
      </div>
    );
}
