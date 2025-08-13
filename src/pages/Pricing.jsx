import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Check, ArrowRight, Shield, Zap, Users } from 'lucide-react';
// import { User } from '@/api/entities';

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
      description: 'For small teams getting started with compliance.',
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
      description: 'For growing businesses managing multiple frameworks.',
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
      description: 'For small teams getting started with compliance.',
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
      description: 'For growing businesses managing multiple frameworks.',
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
  <Card className={`flex flex-col ${plan.popular ? 'border-accent shadow-accent/20' : 'border-border'} shadow-lg`}>
    {plan.popular && (
      <div className="bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wider text-center py-1.5 rounded-t-lg">
        Most Popular
      </div>
    )}
    <CardHeader className="pb-4">
      <CardTitle className="flex items-center gap-2 text-2xl font-bold">
        {plan.name}
      </CardTitle>
      <CardDescription>{plan.description}</CardDescription>
    </CardHeader>
    <CardContent className="flex-1 flex flex-col justify-between">
      <div>
        <div className="mb-6">
          <span className="text-4xl font-extrabold">{plan.price}</span>
          <span className="text-muted-foreground">{plan.frequency}</span>
        </div>
        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-500" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <Button 
        className={`w-full mt-8 ${plan.popular ? 'bg-accent hover:bg-accent/90' : ''}`}
        variant={plan.popular ? 'default' : 'outline'}
        onClick={() => alert('Contact us to get started!')}
      >
        {plan.cta}
      </Button>
    </CardContent>
  </Card>
);

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  const plans = isAnnual ? pricingPlans.annually : pricingPlans.monthly;

  return (
    <div className="bg-background">
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Find the perfect plan for your business
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8">
            Start for free, then upgrade to a plan that fits your needs. All plans come with a 14-day free trial.
          </p>
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span>Monthly</span>
            <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
            <span className="flex items-center">
              Annually <span className="ml-2 bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">Save 15%</span>
            </span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <PricingCard key={plan.name} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
       <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Compare All Features</h2>
            {/* A full comparison table would be quite large, so this is a simplified representation. */}
            <Card className="shadow-lg">
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="p-4 font-semibold">Feature</th>
                                    <th className="p-4 font-semibold text-center">Free</th>
                                    <th className="p-4 font-semibold text-center">Starter</th>
                                    <th className="p-4 font-semibold text-center">Business</th>
                                    <th className="p-4 font-semibold text-center">Enterprise</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b">
                                    <td className="p-4 font-medium flex items-center gap-2"><Users className="w-4 h-4 text-muted-foreground"/>Number of Users</td>
                                    <td className="p-4 text-center">1</td>
                                    <td className="p-4 text-center">20</td>
                                    <td className="p-4 text-center">50</td>
                                    <td className="p-4 text-center">Unlimited</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="p-4 font-medium flex items-center gap-2"><Zap className="w-4 h-4 text-muted-foreground"/>AI Tokens</td>
                                    <td className="p-4 text-center">Basic</td>
                                    <td className="p-4 text-center">Basic</td>
                                    <td className="p-4 text-center">Advanced</td>
                                    <td className="p-4 text-center">Premium</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="p-4 font-medium flex items-center gap-2"><Shield className="w-4 h-4 text-muted-foreground"/>Integration Auditing</td>
                                    <td className="p-4 text-center"><Check className="w-5 h-5 text-slate-300 mx-auto"/></td>
                                    <td className="p-4 text-center"><Check className="w-5 h-5 text-slate-300 mx-auto"/></td>
                                    <td className="p-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto"/></td>
                                    <td className="p-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto"/></td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-medium flex items-center gap-2"><ArrowRight className="w-4 h-4 text-muted-foreground"/>Dedicated Support</td>
                                    <td className="p-4 text-center"><Check className="w-5 h-5 text-slate-300 mx-auto"/></td>
                                    <td className="p-4 text-center"><Check className="w-5 h-5 text-slate-300 mx-auto"/></td>
                                    <td className="p-4 text-center"><Check className="w-5 h-5 text-slate-300 mx-auto"/></td>
                                    <td className="p-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto"/></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
      </section>
    </div>
  );
}