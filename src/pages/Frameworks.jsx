
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, AlertTriangle, Scale, Target, Globe, CreditCard, Heart, Building } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils/index.js';
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
    }
];

export default function FrameworksPage() {
  const [selectedRepercussion, setSelectedRepercussion] = useState(null);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="mb-12 text-center">
              <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
                  <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-4xl font-bold text-slate-900 mb-4">Understanding IT Compliance Frameworks</h1>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">A guide to the standards, regulations, and best practices that govern data security and privacy.</p>
          </div>

          {/* What is a Compliance Framework? */}
          <Card className="mb-12 bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
              <CardHeader>
                  <CardTitle className="text-2xl font-bold text-slate-900">What is an IT Compliance Framework?</CardTitle>
              </CardHeader>
              <CardContent>
                  <p className="text-slate-700 leading-relaxed">
                      An IT compliance framework is a structured set of guidelines, best practices, and controls that an organization follows to meet the requirements of laws, regulations, and industry standards. Think of it as a detailed roadmap for securing data and systems. By implementing a framework, a company demonstrates to its customers, partners, and regulators that it takes security and privacy seriously and has a formal program in place to manage risks.
                  </p>
              </CardContent>
          </Card>

          {/* Repercussions of Non-Compliance */}
          <Card className="mb-12 bg-red-50 border-red-200 shadow-lg">
              <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl font-bold text-red-900">
                      <AlertTriangle className="w-6 h-6" />
                      The Risks of Non-Compliance
                  </CardTitle>
              </CardHeader>
              <CardContent>
                  <p className="text-red-700 mb-6">Failing to implement and maintain compliance can have severe consequences that extend beyond just fines. These risks can impact every aspect of a business.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {repercussionDetails.map((item, index) => (
                          <div 
                            key={index} 
                            onClick={() => setSelectedRepercussion(item)}
                            className="p-4 bg-white rounded-lg border border-red-100 cursor-pointer hover:shadow-md hover:border-red-300 transition-all"
                          >
                              <h4 className="font-semibold text-red-800 mb-1">{item.title}</h4>
                              <p className="text-sm text-slate-600">{item.description}</p>
                          </div>
                      ))}
                  </div>
              </CardContent>
          </Card>

          {/* Detailed Frameworks Section */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-slate-900 text-center">Key Compliance Frameworks Explained</h2>
            {frameworkDetails.map((framework, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg overflow-hidden">
                  <div className="md:flex">
                      <div className="md:w-1/3 bg-slate-50 p-6 flex flex-col justify-center">
                          <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                              <framework.icon className="w-8 h-8 text-blue-600" />
                          </div>
                          <h3 className="text-xl font-bold text-slate-900">{framework.title}</h3>
                          <Badge variant="secondary" className="mt-2 bg-blue-100 text-blue-800 self-start">{framework.category}</Badge>
                      </div>
                      <div className="md:w-2/3 p-6">
                          <div className="mb-4">
                              <h4 className="font-semibold text-slate-800 mb-1">Who it applies to:</h4>
                              <p className="text-sm text-slate-600">{framework.appliesTo}</p>
                          </div>
                          <div className="mb-4">
                              <h4 className="font-semibold text-slate-800 mb-1">Purpose:</h4>
                              <p className="text-sm text-slate-600">{framework.purpose}</p>
                          </div>
                          <div>
                              <h4 className="font-semibold text-slate-800 mb-2">Key Requirements Include:</h4>
                              <ul className="space-y-1 list-disc list-inside text-sm text-slate-600">
                                  {framework.requirements.map((req, i) => <li key={i}>{req}</li>)}
                              </ul>
                          </div>
                      </div>
                  </div>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <Card className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                      <h3 className="text-2xl font-bold mb-2">Ready to Build Your Compliance Program?</h3>
                      <p className="opacity-90 max-w-xl">
                          AkinSec provides the tools and templates you need to implement these frameworks efficiently.
                      </p>
                  </div>
                  <Link to={createPageUrl('Pricing')}>
                      <Button size="lg" variant="secondary" className="flex-shrink-0">
                          Try the App for Free <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                  </Link>
              </CardContent>
          </Card>

        </div>
      </div>
      {selectedRepercussion && (
        <RepercussionModal
          repercussion={selectedRepercussion}
          isOpen={!!selectedRepercussion}
          onClose={() => setSelectedRepercussion(null)}
        />
      )}
    </>
  );
}
