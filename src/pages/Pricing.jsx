import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { ArrowRight, Star, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils/index.js';
import { APP_URL, MARKETING_THESIS, PRODUCT_SUBLINE, AI_WORKFLOW_DECK } from '@/marketing/voice.js';
import { SectionIndex } from '@/components/marketing/SectionIndex';
import './Home.css';

const pricingPlans = {
  monthly: [
    {
      name: 'Free',
      price: '$0',
      frequency: '',
      description: 'Try templates, tasks, and light AI-assisted analysis (BYO provider where applicable).',
      features: [
        '1 seat',
        'Starter AI-assisted workflows',
        'Template library',
        'Task workflows',
      ],
      cta: 'Free',
      popular: true,
    },
    {
      name: 'Starter',
      price: '$99',
      frequency: '/month',
      description: 'Small teams running SIEM monitoring, controls, and vendor evidence.',
      features: [
        'Up to 20 seats',
        'Starter AI-assisted workflows',
        'Template library',
        'Task workflows',
        'Community support',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Business',
      price: '$299',
      frequency: '/month',
      description: 'Growing programs that need deeper monitoring, analysis, and reporting.',
      features: [
        '20+ seats',
        'Higher AI-assisted usage limits',
        'Integration auditing',
        'Customizable reports',
        'Priority email support',
      ],
      cta: 'Choose Business',
      popular: false,
    },
    // {
    //   name: 'Enterprise',
    //   price: 'Custom',
    //   frequency: '',
    //   description: 'For large organizations with complex compliance needs.',
    //   features: [
    //     'TBD'
    //     // 'Unlimited Users',
    //     // 'Premium AI & Highest Token Limits',
    //     // 'Single Sign-On (SSO)',
    //     // 'Dedicated Account Manager',
    //     // 'Custom SLAs',
    //   ],
    //   cta: 'Contact Us',
    //   popular: false,
    // },
  ],
  annually: [
    {
      name: 'Free',
      price: '$0',
      frequency: '',
      description: 'Try templates, tasks, and light AI-assisted analysis (BYO provider where applicable).',
      features: [
        '1 seat',
        'Starter AI-assisted workflows',
        'Template library',
        'Task workflows',
      ],
      cta: 'Free',
      popular: true,
    },
    {
      name: 'Starter',
      price: '$1010',
      frequency: '/year',
      description: 'Small teams running SIEM monitoring, controls, and vendor evidence.',
      features: [
        'Up to 20 seats',
        'Starter AI-assisted workflows',
        'Template library',
        'Task workflows',
        'Community support',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Business',
      price: '$3050',
      frequency: '/year',
      description: 'Growing programs that need deeper monitoring, analysis, and reporting.',
      features: [
        'Up to 50 seats',
        'Higher AI-assisted usage limits',
        'Integration auditing',
        'Customizable reports',
        'Priority email support',
      ],
      cta: 'Choose Business',
      popular: false,
    },
    // {
    //   name: 'Enterprise',
    //   price: 'Custom',
    //   frequency: '',
    //   description: 'For large organizations with complex compliance needs.',
    //   features: [
    //     // 'Unlimited Users',
    //     // 'Premium AI & Highest Token Limits',
    //     // 'Single Sign-On (SSO)',
    //     // 'Dedicated Account Manager',
    //     // 'Custom SLAs',
    //   ],
    //   cta: 'Contact Sales',
    //   popular: false,
    // },
  ],
};

const PricingCard = ({ plan }) => (
  <Card className={`flex flex-col card-enhanced ${plan.popular ? 'border-white shadow-white/20' : ''} group`}>
      {plan.popular && (
        <div className="bg-white text-black text-xs font-bold uppercase tracking-wider text-center py-2 rounded-t-lg">
          Most Popular
        </div>
      )}
    <CardHeader className="pb-4">
      <CardTitle className="flex items-center gap-2 text-2xl font-medium text-white">
        {plan.name}
      </CardTitle>
      <CardDescription className="text-gray-400">{plan.description}</CardDescription>
    </CardHeader>
    <CardContent className="flex-1 flex flex-col justify-between">
      <div>
        <div className="mb-6">
          <span className="text-4xl font-light text-white">{plan.price}</span>
          <span className="text-gray-400">{plan.frequency}</span>
        </div>
        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gray-500" aria-hidden />
              <span className="text-sm text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="block">
        <Button 
          className={`w-full mt-8 rounded-button border-0 transition-all duration-200 group relative ${plan.popular ? 'btn-primary-gradient' : 'btn-secondary-gradient'}`}
        >
          <span className="relative z-10">{plan.cta}</span>
        </Button>
      </a>
    </CardContent>
  </Card>
);

// Ultra-minimal hero section
const HeroSection = ({ isAnnual, setIsAnnual }) => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  const earlyAdopterPrices = {
    monthly: {
      starter: '$25',
      business: '$75',
    },
    annually: {
      starter: '$253',
      business: '$763',
    }
  };

  const prices = isAnnual ? earlyAdopterPrices.annually : earlyAdopterPrices.monthly;
  const frequency = isAnnual ? '/year' : '/month';

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-transparent overflow-hidden">
      <div className="container mx-auto px-6 text-center relative z-10 max-w-6xl">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-6 mt-24 flex justify-center md:mt-32">
            <SectionIndex index={1} label="PRICING" />
          </div>
          <h1 className="mb-6 mt-0 text-5xl font-semibold leading-none tracking-tight text-foreground md:text-7xl">
            SIEM subscription pricing
          </h1>
          <p className="mx-auto mb-4 max-w-3xl text-xl font-light leading-relaxed text-muted-foreground">
            {MARKETING_THESIS}
          </p>
          <p className="mx-auto mb-2 max-w-3xl text-base leading-relaxed text-muted-foreground/90">
            {PRODUCT_SUBLINE}
          </p>
          <p className="text-sm text-gray-500 mb-12 max-w-3xl mx-auto">
            Start free. Paid plans include a 14-day trial. Tiers bundle monitoring workspace seats with governed AI-assisted workflows—not consulting packages.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span className="text-gray-300">Monthly</span>
            <Switch 
              checked={isAnnual} 
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-white"
            />
            <span className="flex items-center text-gray-300">
              Annually 
              <span className="ml-2 bg-green-500/20 text-green-400 text-xs font-medium px-2.5 py-0.5 rounded-full border border-green-500/30">
                Save 15%
              </span>
            </span>
          </div>

          {/* Early Adopter Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <Card className="card-enhanced border border-[hsl(var(--accent)/0.35)] bg-[hsl(var(--accent)/0.06)]">
              <CardContent className="p-8 md:p-12">
                <div className="text-center mb-8">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-[hsl(var(--accent)/0.35)] bg-[hsl(var(--accent)/0.12)] px-4 py-2 text-[hsl(var(--accent))]">
                    <Star className="w-4 h-4 text-[hsl(var(--accent))]" />
                    <span className="text-sm font-medium">Early Adopter Program</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
                    Join as an Early Adopter
                  </h2>
                  <p className="text-lg text-gray-300 mb-2 max-w-2xl mx-auto">
                    Be among the first to use AkinSec and lock in <span className="text-[hsl(var(--accent))] font-medium">75% off</span> for life.
                  </p>
                  <p className="text-sm text-gray-400 max-w-2xl mx-auto">
                    Limited time offer for early supporters. Your discount applies to all future renewals.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700/50">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-medium text-white">Starter</h3>
                      <div className="text-right">
                        <div className="text-2xl font-light text-[hsl(var(--accent))]">{prices.starter}</div>
                        <div className="text-sm text-gray-400">{frequency}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                      <span className="line-through">${isAnnual ? '1010' : '99'}</span>
                      <span className="text-[hsl(var(--accent))] font-medium">75% off</span>
                    </div>
                    <ul className="space-y-2 mt-4">
                      <li className="flex items-start gap-2 text-sm text-gray-300">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gray-500" aria-hidden />
                        <span>All Starter features</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-300">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gray-500" aria-hidden />
                        <span>Lifetime discount</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-300">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gray-500" aria-hidden />
                        <span>Priority feature requests</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700/50">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-medium text-white">Business</h3>
                      <div className="text-right">
                        <div className="text-2xl font-light text-[hsl(var(--accent))]">{prices.business}</div>
                        <div className="text-sm text-gray-400">{frequency}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                      <span className="line-through">${isAnnual ? '3050' : '299'}</span>
                      <span className="text-[hsl(var(--accent))] font-medium">75% off</span>
                    </div>
                    <ul className="space-y-2 mt-4">
                      <li className="flex items-start gap-2 text-sm text-gray-300">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gray-500" aria-hidden />
                        <span>All Business features</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-300">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gray-500" aria-hidden />
                        <span>Lifetime discount</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-300">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gray-500" aria-hidden />
                        <span>Priority feature requests</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="text-center">
                  <Link to={createPageUrl('Contact')}>
                    <Button 
                      size="lg" 
                      className="btn-primary-gradient rounded-button px-8 py-3 text-base border-0 group relative"
                    >
                      <span className="relative z-10 flex items-center">
                        Claim Early Adopter Discount
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                  </Link>
                  <p className="text-xs text-gray-500 mt-4">
                    Contact us to verify eligibility and activate your discount
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

// Standard Pricing Cards Section
const StandardPricingSection = ({ plans }) => {
  return (
    <section className="py-16 bg-transparent relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-4">Standard Plans</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Choose the plan that works best for your team
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Clean comparison section
const ComparisonSection = () => {
  return (
    <section className="py-24 bg-black/20 backdrop-blur-md relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-white mb-4">Compare All Features</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            See what's included in each plan
          </p>
        </div>
        <Card className="card-enhanced">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-800/50">
                  <tr>
                    <th className="p-6 font-medium text-white">Feature</th>
                    <th className="p-6 font-medium text-white text-center">Free</th>
                    <th className="p-6 font-medium text-white text-center">Starter</th>
                    <th className="p-6 font-medium text-white text-center">Business</th>
                    <th className="p-6 font-medium text-white text-center">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-700">
                    <td className="p-6 font-medium text-gray-300">
                      Seats
                    </td>
                    <td className="p-6 text-center text-white">1</td>
                    <td className="p-6 text-center text-white">20</td>
                    <td className="p-6 text-center text-white">50</td>
                    <td className="p-6 text-center text-white">Unlimited</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="p-6 font-medium text-gray-300 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-gray-400"/>
                      AI-assisted usage
                    </td>
                    <td className="p-6 text-center text-white">Basic</td>
                    <td className="p-6 text-center text-white">Basic</td>
                    <td className="p-6 text-center text-white">Advanced</td>
                    <td className="p-6 text-center text-white">Premium</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="p-6 font-medium text-gray-300">
                      Integration auditing
                    </td>
                    <td className="p-6 text-center text-gray-400">Limited</td>
                    <td className="p-6 text-center text-gray-400">Limited</td>
                    <td className="p-6 text-center text-white">Full</td>
                    <td className="p-6 text-center text-white">Full</td>
                  </tr>
                  <tr>
                    <td className="p-6 font-medium text-gray-300">
                      Dedicated support
                    </td>
                    <td className="p-6 text-center text-gray-500">—</td>
                    <td className="p-6 text-center text-gray-500">—</td>
                    <td className="p-6 text-center text-gray-500">—</td>
                    <td className="p-6 text-center text-white">Yes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

// Minimal CTA
const CTASection = () => {
  return (
    <section className="py-24 bg-black/30 backdrop-blur-sm relative z-10">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-light text-white mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
          Pick a tier, open the app, run the trial, and see whether one SIEM console beats stitching vendors together by hand.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href={APP_URL} target="_blank" rel="noopener noreferrer">
            <Button 
              size="lg" 
              className="btn-primary-gradient rounded-button px-8 py-3 text-base border-0 group relative"
            >
              <span className="relative z-10 flex items-center">
                Open app
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </a>
          <Link to={createPageUrl('Contact')}>
            <Button 
              size="lg" 
              variant="outline" 
              className="btn-secondary-gradient rounded-button px-8 py-3 text-base font-medium backdrop-blur-sm relative"
            >
              <span className="relative z-10">Contact Sales</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  const plans = isAnnual ? pricingPlans.annually : pricingPlans.monthly;

  return (
    <div className="min-h-screen relative">
      <HeroSection isAnnual={isAnnual} setIsAnnual={setIsAnnual} />
      <TierContextSection />
      <StandardPricingSection plans={plans} />
      <ComparisonSection />
      <CTASection />
    </div>
  );
}