import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  ChevronDown,
  ChevronUp,
  Search,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils/index.js';
import { SectionIndex } from '@/components/marketing/SectionIndex';
import { MARKETING_THESIS, MODELS_FAQ_SUMMARY } from '@/marketing/voice.js';
import './Home.css';

const FAQItem = ({ question, answer, isOpen, onToggle }) => (
  <Card className="card-enhanced group">
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

const CategoryCard = ({ title, count }) => (
  <Card className="card-enhanced cursor-pointer group">
    <CardContent className="p-6 text-center">
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
          <div className="mb-6 mt-24 flex justify-center md:mt-32">
            <SectionIndex index={1} label="FAQ" />
          </div>
          <h1 className="mb-6 text-5xl font-semibold leading-none tracking-tight text-foreground md:text-7xl">
            FAQ
          </h1>
          <p className="mx-auto mb-4 max-w-3xl text-xl font-light leading-relaxed text-muted-foreground">
            {MARKETING_THESIS}
          </p>
          <p className="mx-auto mb-12 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Short answers below—including how the SIEM app and AI workflows fit together. Contact us when you need depth on your environment.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 text-lg bg-gray-900/50 border-gray-700 text-white placeholder-gray-400 focus:border-gray-500 rounded-lg"
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
    <section className="py-24 bg-black/20 backdrop-blur-md relative z-10">
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
    <section className="py-24 bg-black/30 backdrop-blur-sm relative z-10">
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
              <h3 className="text-2xl font-light text-white mb-4">No results found</h3>
              <p className="text-gray-400 mb-8">
                Try different keywords or browse our categories above
              </p>
              <Button 
                variant="outline" 
                onClick={() => setSearchTerm('')}
                className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg"
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
    <section className="py-24 bg-black/20 backdrop-blur-md relative z-10">
      <div className="container mx-auto px-6">
        <Card className="max-w-2xl mx-auto card-enhanced">
          <CardContent className="p-8 text-center">
            <h3 className="text-3xl font-light text-white mb-6">Still Have Questions?</h3>
            <p className="text-gray-300 mb-8 text-lg">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl('Contact')}>
                <Button 
                  size="lg"
                  className="btn-primary-gradient rounded-button px-8 py-3 text-base border-0 group relative"
                >
                  <span className="relative z-10 flex items-center">
                    Contact Support
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>
              <Link to={createPageUrl('Contact')}>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="btn-secondary-gradient rounded-button px-8 py-3 text-base font-medium backdrop-blur-sm relative"
                >
                  <span className="relative z-10">Schedule a Demo</span>
                </Button>
              </Link>
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
          question: "What is AkinSec?",
          answer: "AkinSec is a cloud SIEM and security monitoring product you use at app.akinsec.com: connect sources, correlate and alert, run tasks and playbooks, map evidence to frameworks, and export for reviews. We sell software—not an MSP or integration consulting shop as the default offer. GRC and AI-assisted workflows sit inside that monitoring workspace."
        },
        {
          question: "Is AkinSec just a chatbot?",
          answer: "No. Monitoring and alerts come first. AI assists triage, summaries, reporting, and guided steps inside workflows. If there is a chat-style surface, it is optional—not the product category."
        },
        {
          question: "How quickly can I get started?",
          answer: "You can open an account and explore templates and tasks quickly. Deeper integration auditing and tailored reporting usually follow once you connect the systems you care about; expect that part to take a day or two depending on scope."
        },
        {
          question: "Do I need to be an engineer?",
          answer: "No. Operators, GRC leads, and IT managers use the product day to day. Engineering helps when you wire new APIs or custom log sources, but the UI is aimed at people running the program—not only developers."
        }
      ]
    },
    {
      category: "Features & Functionality",
      questions: [
        {
          question: "Which frameworks can I map work to?",
          answer: "The product supports common programs—including SOC 2, ISO 27001, GDPR, HIPAA, PCI DSS, and NIST-style control language. We help you align tasks and evidence; we do not certify your organization for you."
        },
        {
          question: "How does AI document analysis work?",
          answer: "You upload policy packs, architecture notes, or other artifacts. The assistant highlights gaps, suggests controls or tasks, and ties recommendations to the frameworks you select. It accelerates review; you still approve what ships."
        },
        {
          question: "Can I track multiple frameworks at once?",
          answer: "Yes. Tasks, owners, and reports can reference more than one framework so you are not duplicating work for every audit thread."
        },
        {
          question: "What integrations can I audit?",
          answer: "Cloud providers, identity, SaaS, code hosting, payment tools—generally any vendor you can document. The goal is a clear record of who stores what and which controls apply."
        }
      ]
    },
    {
      category: "Pricing & Plans",
      questions: [
        {
          question: "What is included in the trial?",
          answer: "Paid tiers ship with a 14-day trial so you can run real workflows. Exact caps depend on the plan you pick; start free if you only need light exploration."
        },
        {
          question: "Can I change plans later?",
          answer: "Yes. Upgrade or downgrade when your team size or workload changes. We prorate billing on the next invoice instead of locking you into a long contract."
        },
        {
          question: "Are there setup fees?",
          answer: "Standard plans do not include setup fees. Enterprise-style engagements may include scoped onboarding—spelled out before you sign."
        },
        {
          question: "How do you bill?",
          answer: "Most customers pay by card through our payments provider. Invoicing and wires are available for larger deals when needed."
        }
      ]
    },
    {
      category: "Security & Privacy",
      questions: [
        {
          question: "How do you handle AI models and data?",
          answer: MODELS_FAQ_SUMMARY + " See our Privacy Policy and DPA for retention and subprocessors; we do not claim to operate a GPU farm or proprietary foundation models unless we publish that separately."
        },
        {
          question: "How do you protect customer data?",
          answer: "We use modern encryption in transit and at rest, strict internal access controls, and logging appropriate to a security product. Specific attestations (for example SOC 2) are available as we publish them—ask for the latest details."
        },
        {
          question: "Where is data hosted?",
          answer: "Primary regions are US-based today. If you need a different region or data residency terms, talk to us before purchase."
        },
        {
          question: "Can I delete my data?",
          answer: "Yes. You can remove artifacts and workspaces, or close an account. Some retention may apply where law or backup policies require it—documented in our privacy terms."
        },
        {
          question: "Do you offer a DPA?",
          answer: "Yes. We provide a DPA for GDPR-style engagements. Enterprise customers can layer additional terms when required."
        }
      ]
    },
    {
      category: "Support & Resources",
      questions: [
        {
          question: "How do I get help?",
          answer: "Email is the default channel. Business plans get faster response targets; enterprise customers can add named contacts when negotiated."
        },
        {
          question: "Do you sell compliance consulting?",
          answer: "The software is the focus. For complex rollouts we can introduce partners or scope light advisory work—always separate from the subscription."
        },
        {
          question: "Is training available?",
          answer: "Documentation and recorded walkthroughs ship with the product. Live sessions are available for larger teams by arrangement."
        },
        {
          question: "Can you help before an audit?",
          answer: "You can export evidence packs and status reports from the workspace. We do not replace your auditor—but we make it easier to show what you did and when."
        }
      ]
    }
  ];

  const categories = [
    { title: "Getting started", count: 4 },
    { title: "Product", count: 4 },
    { title: "Pricing", count: 4 },
    { title: "Security & help", count: 9 },
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