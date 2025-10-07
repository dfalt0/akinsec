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
  Users,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils/index.js';
import WaveBackground from '@/components/WaveBackground';

const FAQItem = ({ question, answer, isOpen, onToggle }) => (
  <Card className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-all duration-300 shadow-lg">
    <CardHeader className="cursor-pointer" onClick={onToggle}>
      <div className="flex items-center justify-between">
        <CardTitle className="text-lg font-medium text-white pr-4">{question}</CardTitle>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
        )}
      </div>
    </CardHeader>
    {isOpen && (
      <CardContent className="pt-0">
        <div className="text-gray-300 leading-relaxed">{answer}</div>
      </CardContent>
    )}
  </Card>
);

const CategoryCard = ({ icon: Icon, title, count, color }) => (
  <Card className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-all duration-300 cursor-pointer group">
    <CardContent className="p-6 text-center">
      <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-gray-700 transition-colors duration-300">
        <Icon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300" />
      </div>
      <h3 className="font-medium text-white mb-1">{title}</h3>
      <p className="text-sm text-gray-400">{count} questions</p>
    </CardContent>
  </Card>
);

// Ultra-minimal hero section
const HeroSection = ({ searchTerm, setSearchTerm }) => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-transparent overflow-hidden">
      <div className="container mx-auto px-6 text-center relative z-10 max-w-6xl">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-5xl md:text-7xl font-light text-white mb-6 leading-none tracking-tight mt-32">
            FAQ
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Find answers to common questions about AkinSec, compliance management, and getting the most out of our platform.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 text-lg bg-gray-900/50 border-gray-700 text-white placeholder-gray-400 focus:border-gray-500 rounded-none"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Clean categories section
const CategoriesSection = ({ categories }) => {
  return (
    <section className="py-24 bg-black/30 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-white mb-4">Browse by Category</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Find answers organized by topic
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {categories.map((category, index) => (
            <CategoryCard key={index} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Clean FAQ content section
const FAQContentSection = ({ faqData, filteredQuestions, searchTerm, openItems, toggleItem, setSearchTerm }) => {
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {searchTerm ? (
            <>
              <h2 className="text-3xl font-light text-white mb-2">
                Search Results for "{searchTerm}"
              </h2>
              <p className="text-gray-400 mb-12">
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
              <div key={categoryIndex} className="mb-16">
                <h2 className="text-3xl font-light text-white mb-8">{category.category}</h2>
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
            <div className="text-center py-16">
              <HelpCircle className="w-16 h-16 text-gray-500 mx-auto mb-6" />
              <h3 className="text-2xl font-light text-white mb-4">No results found</h3>
              <p className="text-gray-400 mb-8">
                Try different keywords or browse our categories above
              </p>
              <Button 
                variant="outline" 
                onClick={() => setSearchTerm('')}
                className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white rounded-none"
              >
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// Minimal CTA
const CTASection = () => {
  return (
    <section className="py-24 bg-white relative z-10">
      <div className="container mx-auto px-6">
        <Card className="max-w-2xl mx-auto bg-gray-50 border-gray-200 shadow-lg">
          <CardContent className="p-8 text-center">
            <h3 className="text-3xl font-light text-black mb-6">Still Have Questions?</h3>
            <p className="text-gray-600 mb-8 text-lg">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl('Contact')}>
                <Button 
                  size="lg"
                  className="bg-black text-white hover:bg-gray-800 px-8 py-3 text-base font-medium rounded-none border-0 transition-all duration-200"
                >
                  Contact Support
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <div className="wave-button-container">
                <span>Schedule a Demo</span>
                <div className="wave"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

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
    { icon: HelpCircle, title: "Getting Started", count: 3 },
    { icon: Shield, title: "Security", count: 4 },
    { icon: CreditCard, title: "Billing", count: 4 },
    { icon: Users, title: "Support", count: 4 }
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
    <div className="min-h-screen relative">
      <WaveBackground />
      <HeroSection searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {!searchTerm && <CategoriesSection categories={categories} />}
      <FAQContentSection 
        faqData={faqData}
        filteredQuestions={filteredQuestions}
        searchTerm={searchTerm}
        openItems={openItems}
        toggleItem={toggleItem}
        setSearchTerm={setSearchTerm}
      />
      <CTASection />
    </div>
  );
}