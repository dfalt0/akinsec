import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Check, ArrowRight, Shield, Zap, Users, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils/index.js';
import WaveBackground from '@/components/WaveBackground';

const pricingPlans = {
  monthly: [
    {
      name: 'Free',
      price: '$0',
      frequency: '',
      description: 'Test out the platform for free.',
      features: [
        '1 User',
        'Basic AI File Analysis',
        'Standard Template Library',
        'Task Management',
      ],
      cta: 'Free',
      popular: true,
    },
    {
      name: 'Starter',
      price: '$49',
      frequency: '/month',
      description: 'For small teams getting started with cybersecurity.',
      features: [
        'Up to 20 Users',
        'Basic AI File Analysis',
        'Standard Template Library',
        'Task Management',
        'Community Support',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Business',
      price: '$199',
      frequency: '/month',
      description: 'For growing businesses with comprehensive security needs.',
      features: [
        'Up to 50 Users',
        'Advanced AI Analysis (more tokens)',
        'Integration Auditing',
        'Customizable Reports',
        'Priority Email Support',
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
      description: 'Test out the platform for free.',
      features: [
        '1 User',
        'Basic AI File Analysis',
        'Standard Template Library',
        'Task Management',
      ],
      cta: 'Free',
      popular: true,
    },
    {
      name: 'Starter',
      price: '$490',
      frequency: '/year',
      description: 'For small teams getting started with cybersecurity.',
      features: [
        'Up to 20 Users',
        'Basic AI File Analysis',
        'Standard Template Library',
        'Task Management',
        'Community Support',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Business',
      price: '$1990',
      frequency: '/year',
      description: 'For growing businesses with comprehensive security needs.',
      features: [
        'Up to 50 Users',
        'Advanced AI Analysis (more tokens)',
        'Integration Auditing',
        'Customizable Reports',
        'Priority Email Support',
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
  <Card className={`flex flex-col bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-all duration-300 ${plan.popular ? 'border-white shadow-white/20' : 'border-gray-800'} shadow-lg`}>
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
            <li key={index} className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-400" />
              <span className="text-sm text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <Link to={createPageUrl('Setup')}>
        <Button 
          className={`w-full mt-8 ${plan.popular ? 'bg-white text-black hover:bg-gray-100' : 'bg-gray-800 text-white hover:bg-gray-700'} rounded-none border-0 transition-all duration-200`}
        >
          {plan.cta}
        </Button>
      </Link>
    </CardContent>
  </Card>
);

// Ultra-minimal hero section
const HeroSection = ({ isAnnual, setIsAnnual, plans }) => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-transparent overflow-hidden">
      <div className="container mx-auto px-6 text-center relative z-10 max-w-6xl">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-5xl md:text-7xl font-light text-white mb-6 leading-none tracking-tight mt-32">
            Simple Pricing
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Start for free, then upgrade to a plan that fits your needs. All plans come with a 14-day free trial.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-16">
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

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {plans.map((plan) => (
              <PricingCard key={plan.name} plan={plan} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Clean comparison section
const ComparisonSection = () => {
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-white mb-4">Compare All Features</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            See what's included in each plan
          </p>
        </div>
        <Card className="bg-gray-900/50 border-gray-800 shadow-lg">
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
                    <td className="p-6 font-medium text-gray-300 flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400"/>
                      Number of Users
                    </td>
                    <td className="p-6 text-center text-white">1</td>
                    <td className="p-6 text-center text-white">20</td>
                    <td className="p-6 text-center text-white">50</td>
                    <td className="p-6 text-center text-white">Unlimited</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="p-6 font-medium text-gray-300 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-gray-400"/>
                      AI Tokens
                    </td>
                    <td className="p-6 text-center text-white">Basic</td>
                    <td className="p-6 text-center text-white">Basic</td>
                    <td className="p-6 text-center text-white">Advanced</td>
                    <td className="p-6 text-center text-white">Premium</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="p-6 font-medium text-gray-300 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-gray-400"/>
                      Integration Auditing
                    </td>
                    <td className="p-6 text-center"><Check className="w-5 h-5 text-gray-500 mx-auto"/></td>
                    <td className="p-6 text-center"><Check className="w-5 h-5 text-gray-500 mx-auto"/></td>
                    <td className="p-6 text-center"><Check className="w-5 h-5 text-green-400 mx-auto"/></td>
                    <td className="p-6 text-center"><Check className="w-5 h-5 text-green-400 mx-auto"/></td>
                  </tr>
                  <tr>
                    <td className="p-6 font-medium text-gray-300 flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 text-gray-400"/>
                      Dedicated Support
                    </td>
                    <td className="p-6 text-center"><Check className="w-5 h-5 text-gray-500 mx-auto"/></td>
                    <td className="p-6 text-center"><Check className="w-5 h-5 text-gray-500 mx-auto"/></td>
                    <td className="p-6 text-center"><Check className="w-5 h-5 text-gray-500 mx-auto"/></td>
                    <td className="p-6 text-center"><Check className="w-5 h-5 text-green-400 mx-auto"/></td>
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
    <section className="py-24 bg-white relative z-10">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-light text-black mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
          Join thousands of teams already using AkinSec to strengthen their cybersecurity posture.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to={createPageUrl('Setup')}>
            <Button 
              size="lg" 
              className="bg-black text-white hover:bg-gray-800 px-8 py-3 text-base font-medium rounded-none border-0 transition-all duration-200"
            >
              Start Free Trial
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link to={createPageUrl('Contact')}>
            <div className="wave-button-container">
              <span>Contact Sales</span>
              <div className="wave"></div>
            </div>
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
      <WaveBackground />
      <HeroSection isAnnual={isAnnual} setIsAnnual={setIsAnnual} plans={plans} />
      <ComparisonSection />
      <CTASection />
    </div>
  );
}