import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, AlertTriangle, Scale, Target, Globe, CreditCard, Heart, Building, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils/index.js';
import WaveBackground from '@/components/WaveBackground';
import RepercussionModal from '../components/frameworks/RepercussionModal';

const frameworkDetails = [
  {
    icon: Globe,
    title: "SOC 2 (Service Organization Control 2)",
    category: "Security & Availability",
    appliesTo: "Technology companies and service providers that store customer data in the cloud. Essential for B2B SaaS.",
    purpose: "Reports on an organization's controls related to security, availability, processing integrity, confidentiality, and privacy of a system.",
    requirements: [
      "Security policies and procedures",
      "Access controls",
      "Network monitoring",
      "Vendor management",
      "Disaster recovery planning"
    ]
  },
  {
    icon: Target,
    title: "ISO 27001",
    category: "Information Security Management",
    appliesTo: "Any organization, regardless of size or industry, seeking to formalize its information security management system (ISMS).",
    purpose: "Provides a systematic approach to managing sensitive company information, ensuring data security through a comprehensive ISMS.",
    requirements: [
      "Risk assessment and treatment",
      "Information security policy",
      "Asset management",
      "Cryptography",
      "Business continuity management"
    ]
  },
  {
    icon: Scale,
    title: "GDPR (General Data Protection Regulation)",
    category: "Data Privacy Law",
    appliesTo: "Organizations that process the personal data of individuals residing in the European Union (EU), regardless of the company's location.",
    purpose: "A legal framework that sets guidelines for the collection and processing of personal information from individuals who live in the EU.",
    requirements: [
      "Lawful basis for processing data",
      "Data subject rights (e.g., right to erasure)",
      "Data protection impact assessments (DPIAs)",
      "Breach notification within 72 hours",
      "Appointment of a Data Protection Officer (DPO) in some cases"
    ]
  },
  {
    icon: Heart,
    title: "HIPAA (Health Insurance Portability and Accountability Act)",
    category: "Healthcare Data",
    appliesTo: "Healthcare providers, health plans, and healthcare clearinghouses (Covered Entities) and their business associates.",
    purpose: "Protects sensitive patient health information (Protected Health Information - PHI) from being disclosed without the patient's consent or knowledge.",
    requirements: [
      "Privacy Rule (how PHI can be used and disclosed)",
      "Security Rule (safeguards for electronic PHI)",
      "Breach Notification Rule",
      "Business Associate Agreements (BAAs)",
      "Risk analysis and management"
    ]
  },
  {
    icon: CreditCard,
    title: "PCI DSS (Payment Card Industry Data Security Standard)",
    category: "Financial Data",
    appliesTo: "Any organization that accepts, transmits, or stores cardholder data, regardless of size or number of transactions.",
    purpose: "To protect cardholder data and reduce credit card fraud, mandated by credit card brands.",
    requirements: [
      "Build and maintain a secure network (firewalls)",
      "Protect cardholder data (encryption)",
      "Maintain a vulnerability management program",
      "Implement strong access control measures",
      "Regularly monitor and test networks"
    ]
  }
];

const repercussionDetails = [
    {
        title: "Financial Penalties",
        description: "Regulators can impose severe fines, often reaching millions of dollars, crippling a business before it even has a chance to scale.",
        details: "Non-compliance isn't just a slap on the wrist; it's a direct hit to your bottom line. Regulatory bodies have the authority to levy substantial fines that can be catastrophic.",
        examples: [
            "**GDPR:** Fines can reach up to €20 million or 4% of the company's annual global turnover, whichever is higher. For a major tech company, this could mean billions.",
            "**HIPAA:** Penalties for violations can range from $100 to $50,000 per violation, with an annual maximum of $1.5 million for each type of violation.",
            "**PCI DSS:** Banks can impose fines from $5,000 to $100,000 per month for compliance violations. This doesn't include the costs of reissuing cards and other associated fees."
        ]
    },
    {
        title: "Legal Action",
        description: "Non-compliance opens the door to civil lawsuits from affected customers, partners, and even criminal charges for executives.",
        details: "Beyond regulatory fines, non-compliance can lead to costly and time-consuming legal battles. This includes class-action lawsuits that can drag on for years.",
        examples: [
            "**Class-Action Lawsuits:** Following a data breach, a group of affected customers can sue for damages. A recent lawsuit against a social media company resulted in a settlement of over $500 million.",
            "**Partner Disputes:** A business partner may sue for breach of contract if your non-compliance causes them financial or reputational harm.",
            "**Executive Liability:** In cases of gross negligence, corporate officers can be held personally liable, facing both civil and, in rare cases, criminal penalties."
        ]
    },
    {
        title: "Reputational Damage",
        description: "A single compliance failure can erode customer trust, leading to churn, negative press, and difficulty attracting new business.",
        details: "In today's market, trust is a currency. A data breach or compliance failure is a public event that can permanently tarnish your brand's reputation.",
        examples: [
            "**Customer Churn:** After a major breach, a well-known credit bureau saw a significant portion of its customer base leave for competitors in a single quarter.",
            "**Negative Media Cycle:** News of non-compliance can dominate headlines, leading to a prolonged period of negative press that is difficult to recover from.",
            "**Hiring Impact:** Talented engineers and executives are often hesitant to join a company with a poor reputation for security and ethics."
        ]
    },
    {
        title: "Loss of Business",
        description: "Many enterprise customers require proof of compliance (like a SOC 2 report) before they will even consider doing business with you.",
        details: "Compliance is no longer a 'nice-to-have'; it's a prerequisite for B2B sales. Lacking key certifications means you are automatically disqualified from many valuable contracts.",
        examples: [
            "**Failed Sales Deals:** A SaaS startup lost a potential $1 million annual contract with a Fortune 500 company because they could not provide a SOC 2 Type II report.",
            "**Partnership Blocks:** A strategic partnership with a major payment processor was canceled after an audit revealed significant PCI DSS compliance gaps.",
            "**Market Access:** Expanding into new regions, particularly Europe, is nearly impossible without being able to demonstrate GDPR compliance."
        ]
    },
    {
        title: "Operational Disruption",
        description: "A security incident or regulatory investigation can halt business operations, diverting critical resources to damage control.",
        details: "The hidden cost of non-compliance is the massive internal disruption it causes. Your team's focus shifts from innovation and growth to crisis management.",
        examples: [
            "**Forensic Investigations:** Responding to a breach requires hiring expensive cybersecurity firms to investigate, which can take months and disrupt normal operations.",
            "**Mandatory Downtime:** Systems may need to be taken offline for emergency patching and security audits, leading to direct revenue loss.",
            "**Resource Drain:** Your best engineers and leaders will be pulled away from their primary projects to work on remediation, delaying your product roadmap for months."
        ]
    },
    {
        title: "Competitive Disadvantage",
        description: "While you're dealing with security issues, competitors are moving forward with innovation and capturing market share.",
        details: "Security incidents don't just cost money—they cost time and momentum. While you're in damage control mode, your competitors are advancing their products and winning customers.",
        examples: [
            "**Market Share Loss:** A fintech startup lost 30% of its customer base to a competitor after a security breach, while the competitor used the incident to highlight their superior security.",
            "**Innovation Delay:** A SaaS company had to pause all new feature development for 6 months to focus on security remediation, allowing competitors to launch similar features first.",
            "**Investor Confidence:** A promising startup saw its Series A funding round fall through after a security incident, while competitors secured funding and accelerated growth."
        ]
    }
];

export default function FrameworksPage() {
  const [selectedRepercussion, setSelectedRepercussion] = useState(null);

  return (
    <div className="min-h-screen relative">
      <WaveBackground />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-transparent overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10 max-w-6xl">
          <h1 className="text-5xl md:text-7xl font-light text-white mb-6 leading-none tracking-tight mt-32">
            Why Us?
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 mb-16 max-w-4xl mx-auto font-light leading-relaxed">
          IT Security should flow. <span className="text-white font-medium">We flow better here.</span>
          </p>
          
          {/* Why Choose AkinSec - Sleek Minimal Design */}
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {/* Card 1 - Built for Speed */}
              <div className="group">
                <div className="bg-gray-900/30 border border-gray-800/40 rounded-lg p-8 hover:bg-gray-900/50 hover:border-gray-700/60 transition-all duration-300 backdrop-blur-sm text-center">
                  <div className="w-16 h-16 bg-gray-800/60 rounded-lg flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-700/80 transition-colors duration-300">
                    <Shield className="w-8 h-8 text-gray-300 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">Built for Speed</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">Lightning-fast deployment and real-time monitoring</p>
                </div>
              </div>

              {/* Card 2 - AI-First Design */}
              <div className="group">
                <div className="bg-gray-900/30 border border-gray-800/40 rounded-lg p-8 hover:bg-gray-900/50 hover:border-gray-700/60 transition-all duration-300 backdrop-blur-sm text-center">
                  <div className="w-16 h-16 bg-gray-800/60 rounded-lg flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-700/80 transition-colors duration-300">
                    <Zap className="w-8 h-8 text-gray-300 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">AI-First Design</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">Intelligent automation and predictive analytics</p>
                </div>
              </div>

              {/* Card 3 - No Vendor Lock-in */}
              <div className="group">
                <div className="bg-gray-900/30 border border-gray-800/40 rounded-lg p-8 hover:bg-gray-900/50 hover:border-gray-700/60 transition-all duration-300 backdrop-blur-sm text-center">
                  <div className="w-16 h-16 bg-gray-800/60 rounded-lg flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-700/80 transition-colors duration-300">
                    <Target className="w-8 h-8 text-gray-300 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">No Vendor Lock-in</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">Open architecture with full data portability</p>
                </div>
              </div>
            </div>

            {/* Bottom Statement */}
            <div className="text-center">
              <div className="inline-block bg-gray-900/30 border border-gray-800/30 rounded-2xl px-8 py-6 backdrop-blur-sm shadow-[0_0_30px_rgba(255,255,255,0.06)]">
                <p className="text-gray-300 text-lg font-light">
                  Security that <span className="text-white font-medium">actually makes sense</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10">


        {/* The Cost of Inadequate Security */}
        <section className="py-24 bg-black">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-6">
                <AlertTriangle className="w-8 h-8 text-red-400" />
                <h2 className="text-4xl font-light text-white">The Cost of Inadequate Security</h2>
              </div>
              <p className="text-gray-400 text-lg max-w-3xl mx-auto">
                Weak security posture doesn't just lead to compliance violations—it creates vulnerabilities that can devastate your business. 
                These risks impact every aspect of operations, from financial stability to customer trust.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repercussionDetails.map((item, index) => (
                <Card 
                  key={index} 
                  onClick={() => setSelectedRepercussion(item)}
                  className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 hover:border-gray-700 cursor-pointer transition-all duration-300 group"
                >
                  <CardContent className="p-6">
                    <h4 className="font-medium text-white mb-3 group-hover:text-red-300 transition-colors">{item.title}</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Security Standards & Compliance Frameworks */}
        <section className="py-24 bg-black/30 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light text-white mb-4">Security Standards & Compliance Frameworks</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Essential standards and regulations that form the foundation of comprehensive cybersecurity programs
              </p>
            </div>
            <div className="space-y-8">
              {frameworkDetails.map((framework, index) => (
                <Card key={index} className="bg-gray-900/50 border-gray-800 shadow-lg overflow-hidden hover:bg-gray-900/70 transition-all duration-300">
                  <div className="md:flex">
                    <div className="md:w-1/3 bg-gray-800/50 p-8 flex flex-col justify-center">
                      <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center mb-6">
                        <framework.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-medium text-white mb-3">{framework.title}</h3>
                      <Badge variant="outline" className="bg-gray-800 text-gray-300 border-gray-600 self-start">{framework.category}</Badge>
                    </div>
                    <div className="md:w-2/3 p-8">
                      <div className="mb-6">
                        <h4 className="font-medium text-white mb-2">Who it applies to:</h4>
                        <p className="text-sm text-gray-400 leading-relaxed">{framework.appliesTo}</p>
                      </div>
                      <div className="mb-6">
                        <h4 className="font-medium text-white mb-2">Purpose:</h4>
                        <p className="text-sm text-gray-400 leading-relaxed">{framework.purpose}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-white mb-3">Key Requirements Include:</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                          {framework.requirements.map((req, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-gray-500 mr-2 mt-1">•</span>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-white relative z-10">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-light text-black mb-6">
              Ready to Strengthen Your Security Posture?
            </h2>
            <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
              AkinSec provides comprehensive cybersecurity tools, compliance management, and security automation to protect your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl('Pricing')}>
                <Button 
                  size="lg" 
                  className="bg-black text-white hover:bg-gray-800 px-8 py-3 text-base font-medium rounded-none border-0 transition-all duration-200"
                >
                  Try the App for Free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to={createPageUrl('Contact')}>
                <div className="wave-button-container">
                  <span>Schedule Demo</span>
                  <div className="wave"></div>
                </div>
              </Link>
            </div>
          </div>
        </section>

      </div>
      {selectedRepercussion && (
        <RepercussionModal
          repercussion={selectedRepercussion}
          isOpen={!!selectedRepercussion}
          onClose={() => setSelectedRepercussion(null)}
        />
      )}
    </div>
  );
}
