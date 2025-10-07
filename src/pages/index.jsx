import Layout from "./Layout.jsx";

import Pricing from "./Pricing";

import About from "./About";

import Contact from "./Contact";

// import Blog from "./Blog";

import FAQ from "./FAQ";

import DemoLive from "./DemoLive";

import LegacyHome from "./LegacyHome";
import Home from "./Home";

import Why from "./Why";

import DashboardExample from "./DashboardExample.jsx";

import FrameworksExample from "./FrameworksExample.jsx";

import TemplatesExample from "./TemplatesExample.jsx";

import FileAnalysisExample from "./FileAnalysisExample.jsx";

import IntegrationsExample from "./IntegrationsExample.jsx";

import TasksExample from "./TasksExample.jsx";

import ReportsExample from "./ReportsExample.jsx";

import Careers from "./Careers";

import Documentation from "./Documentation";

import Privacy from "./Privacy";

import Terms from "./Terms";
import Setup from "./Setup.jsx";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils/index.js';
import { AnimatePresence, motion } from 'framer-motion';

const PAGES = {
    
    Pricing: Pricing,
    
    About: About,
    
    Contact: Contact,
    
    // Blog: Blog,
    
    FAQ: FAQ,
    
    DemoLive: DemoLive,
    
    LegacyHome: LegacyHome,
    Home: Home,
    
    Why: Why,
    
    DashboardExample: DashboardExample,
    
    FrameworksExample: FrameworksExample,
    
    TemplatesExample: TemplatesExample,
    
    FileAnalysisExample: FileAnalysisExample,
    
    IntegrationsExample: IntegrationsExample,

    TasksExample: TasksExample,
    
    ReportsExample: ReportsExample,
    
    Careers: Careers,
    
    Documentation: Documentation,
    
    Privacy: Privacy,
    
    Terms: Terms,
    Setup: Setup,
    
}

function _getCurrentPage(url) {
    if (url === '/' || url === '') {
        return 'Home'; // Default to Home page for root path
    }
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || 'Home'; // Default to Home if no match found
}

// Page transition variants
const pageVariants = {
    initial: {
        opacity: 0
    },
    in: {
        opacity: 1
    },
    out: {
        opacity: 0
    }
};

const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.2
};

// Loading component for smoother transitions
const PageLoader = () => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center"
    >
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-white border-t-transparent rounded-full"
        />
    </motion.div>
);

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={location.pathname}
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                    className="w-full"
                >
                    <Routes location={location}>            
                        
                            <Route path="/" element={<Home />} />
                        
                        
                        <Route path="/Pricing" element={<Pricing />} />
                        
                        <Route path="/About" element={<About />} />
                        
                        <Route path="/Contact" element={<Contact />} />
                        
                        {/* <Route path="/Blog" element={<Blog />} /> */}
                        
                        <Route path="/FAQ" element={<FAQ />} />
                        
                        <Route path="/DemoLive" element={<DemoLive />} />
                        
                        <Route path="/LegacyHome" element={<LegacyHome />} />
                        <Route path="/Home" element={<Home />} />
                        
                        <Route path="/Why" element={<Why />} />
                        
                        <Route path="/DashboardExample" element={<DashboardExample />} />
                        
                        <Route path="/FrameworksExample" element={<FrameworksExample />} />
                        
                        <Route path="/TemplatesExample" element={<TemplatesExample />} />
                        
                        <Route path="/FileAnalysisExample" element={<FileAnalysisExample />} />
                        
                        <Route path="/IntegrationsExample" element={<IntegrationsExample />} />

                        <Route path="/TasksExample" element={<TasksExample />} />

                        <Route path="/ReportsExample" element={<ReportsExample />} />
                        
                        <Route path="/Careers" element={<Careers />} />
                        
                        <Route path="/Documentation" element={<Documentation />} />
                        
                        <Route path="/Privacy" element={<Privacy />} />
                        
                        <Route path="/Terms" element={<Terms />} />
                        <Route path="/Setup" element={<Setup />} />
                        
                        {/* Catch-all route for unmatched paths */}
                        <Route path="*" element={<Home />} />
                        
                    </Routes>
                </motion.div>
            </AnimatePresence>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}