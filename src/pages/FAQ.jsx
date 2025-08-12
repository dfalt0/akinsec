import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  ChevronDown,
  ChevronUp,
  Search,
  HelpCircle,
  Shield,
  CreditCard,
  Settings,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils/index.js';

const FAQItem = ({ question, answer, isOpen, onToggle }) => (
  <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
    <CardHeader className="cursor-pointer" onClick={onToggle}>
      <div className="flex items-center justify-between">
        <CardTitle className="text-lg font-semibold text-slate-900 pr-4">{question}</CardTitle>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-slate-500 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-500 flex-shrink-0" />
        )}
      </div>
    </CardHeader>
    {isOpen && (
      <CardContent className="pt-0">
        <div className="text-slate-600 leading-relaxed">{answer}</div>
      </CardContent>
    )}
  </Card>
);

const CategoryCard = ({ icon: Icon, title, count, color }) => (
  <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
    <CardContent className="p-6 text-center">
      <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
      <p className="text-sm text-slate-500">{count} questions</p>
    </CardContent>
  </Card>
);

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const faqData = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "What is Akinsec and how does it help with compliance?",
          answer: "Akinsec is an AI-powered compliance management platform that helps businesses automate their compliance processes. We provide tools for document analysis, task management, integration auditing, and reporting across multiple frameworks like SOC 2, GDPR, ISO 27001, and more."
        },
        {
          question: "How quickly can I get started with Akinsec?",
          answer: "You can start using Akinsec immediately after signing up. Our onboarding process takes about 15 minutes, and you'll have access to templates, AI file analysis, and task management right away. For full integration auditing and custom reports, setup typically takes 1-2 business days."
        },
        {
          question: "Do I need technical expertise to use Akinsec?",
          answer: "No technical expertise is required. Akinsec is designed for compliance professionals, not developers. Our intuitive interface guides you through each step, and our AI handles the complex analysis work for you."
        }
      ]
    },
    {
      category: "Features & Functionality",
      questions: [
        {
          question: "What compliance frameworks does Akinsec support?",
          answer: "Akinsec supports major compliance frameworks including SOC 2 Type I & II, ISO 27001, GDPR, HIPAA, PCI DSS, NIST, and many others. Our AI can also analyze documents for custom or industry-specific requirements."
        },
        {
          question: "How does the AI file analysis work?",
          answer: "Upload any compliance-related document (PDF, Word, Excel, images) and our AI will analyze it for compliance gaps, risks, and recommendations. The AI examines content against multiple frameworks and provides actionable insights within minutes."
        },
        {
          question: "Can I track multiple compliance frameworks simultaneously?",
          answer: "Yes, Akinsec is designed to handle multiple frameworks at once. You can create tasks, track progress, and generate reports across all your compliance requirements from a single dashboard."
        },
        {
          question: "What types of integrations can I audit?",
          answer: "You can audit any third-party service your organization uses - cloud storage, communication tools, CRM systems, development platforms, analytics tools, and more. We help assess their compliance status, certifications, and risk levels."
        }
      ]
    },
    {
      category: "Pricing & Plans",
      questions: [
        {
          question: "What's included in the free trial?",
          answer: "The 14-day free trial includes full access to all features: AI file analysis, template library, task management, integration auditing, and basic reporting. No credit card required to start."
        },
        {
          question: "Can I change my plan at any time?",
          answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated. There are no long-term contracts or cancellation fees."
        },
        {
          question: "Is there a setup fee?",
          answer: "No setup fees for any plan. Enterprise customers get dedicated onboarding support included in their plan at no additional cost."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and wire transfers for Enterprise customers. All payments are processed securely through Stripe."
        }
      ]
    },
    {
      category: "Security & Privacy",
      questions: [
        {
          question: "How secure is my data on Akinsec?",
          answer: "Security is our top priority. We use enterprise-grade encryption (AES-256), maintain SOC 2 Type II certification, and follow strict access controls. Your data is encrypted at rest and in transit, and we never share it with third parties."
        },
        {
          question: "Where is my data stored?",
          answer: "Data is stored in secure, SOC 2 compliant data centers in the United States. Enterprise customers can request specific geographic data residency requirements."
        },
        {
          question: "Can I delete my data?",
          answer: "Yes, you have complete control over your data. You can delete individual files, documents, or your entire account at any time. Data deletion is permanent and irreversible."
        },
        {
          question: "Do you have a Data Processing Agreement (DPA)?",
          answer: "Yes, we provide a comprehensive DPA for all customers to ensure GDPR compliance. Enterprise customers can also sign custom data agreements as needed."
        }
      ]
    },
    {
      category: "Support & Resources",
      questions: [
        {
          question: "What kind of support do you provide?",
          answer: "We offer email support for all customers, with response times under 2 hours during business hours. Business and Enterprise customers get priority support, and Enterprise customers have access to dedicated account managers."
        },
        {
          question: "Do you provide compliance consulting?",
          answer: "While Akinsec automates much of the compliance process, we also offer professional consulting services for complex implementations, custom frameworks, and compliance strategy development."
        },
        {
          question: "Is training available for my team?",
          answer: "Yes, we provide comprehensive training resources including video tutorials, documentation, and webinars. Enterprise customers get personalized training sessions and ongoing education."
        },
        {
          question: "Can you help with audit preparation?",
          answer: "Absolutely. Akinsec generates audit-ready reports and evidence packages. Our team can also provide guidance on audit preparation and work with your auditors during the process."
        }
      ]
    }
  ];

  const categories = [
    { icon: HelpCircle, title: "Getting Started", count: 8, color: "bg-blue-600" },
    { icon: Shield, title: "Security", count: 12, color: "bg-green-600" },
    { icon: CreditCard, title: "Billing", count: 6, color: "bg-purple-600" },
    { icon: Users, title: "Account", count: 5, color: "bg-orange-600" }
  ];

  const allQuestions = faqData.flatMap((category, categoryIndex) =>
    category.questions.map((q, questionIndex) => ({
      ...q,
      category: category.category,
      index: `${categoryIndex}-${questionIndex}`
    }))
  );

  const filteredQuestions = searchTerm
    ? allQuestions.filter(
        q =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allQuestions;

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-20 md:py-32 text-center bg-gradient-to-b from-background to-background/90">
        <div className="container mx-auto px-4">
          <Badge variant="outline" className="mb-4 border-blue-500/50 text-blue-600 font-semibold py-1 px-3 rounded-full">
            Help Center
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground mb-8">
            Find answers to common questions about Akinsec, compliance management, and getting the most out of our platform.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      {!searchTerm && (
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {categories.map((category, index) => (
                <CategoryCard key={index} {...category} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {searchTerm ? (
              <>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Search Results for "{searchTerm}"
                </h2>
                <p className="text-muted-foreground mb-8">
                  Found {filteredQuestions.length} result{filteredQuestions.length !== 1 ? 's' : ''}
                </p>
                <div className="space-y-4">
                  {filteredQuestions.map((item) => (
                    <FAQItem
                      key={item.index}
                      question={item.question}
                      answer={item.answer}
                      isOpen={openItems[item.index]}
                      onToggle={() => toggleItem(item.index)}
                    />
                  ))}
                </div>
              </>
            ) : (
              faqData.map((category, categoryIndex) => (
                <div key={categoryIndex} className="mb-12">
                  <h2 className="text-2xl font-bold text-foreground mb-6">{category.category}</h2>
                  <div className="space-y-4">
                    {category.questions.map((item, questionIndex) => {
                      const index = `${categoryIndex}-${questionIndex}`;
                      return (
                        <FAQItem
                          key={index}
                          question={item.question}
                          answer={item.answer}
                          isOpen={openItems[index]}
                          onToggle={() => toggleItem(index)}
                        />
                      );
                    })}
                  </div>
                </div>
              ))
            )}

            {filteredQuestions.length === 0 && searchTerm && (
              <div className="text-center py-12">
                <HelpCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">No results found</h3>
                <p className="text-slate-500 mb-6">
                  Try different keywords or browse our categories above
                </p>
                <Button variant="outline" onClick={() => setSearchTerm('')}>
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Still Have Questions?</h3>
              <p className="text-slate-600 mb-6">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <div className="flex gap-3 justify-center">
                <Link to={createPageUrl('Contact')}>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Contact Support
                  </Button>
                </Link>
                <Button variant="outline">
                  Schedule a Demo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}