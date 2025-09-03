import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Check, ArrowRight, Shield, CreditCard, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils/index.js';

export default function Setup() {
  const [step, setStep] = useState(1);
  const [plan, setPlan] = useState('starter');
  const [orgName, setOrgName] = useState('');
  const [email, setEmail] = useState('');
  const [isAnnual, setIsAnnual] = useState(false);

  const next = () => setStep((s) => Math.min(3, s + 1));
  const prev = () => setStep((s) => Math.max(1, s - 1));

  return (
    <div className="w-full py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-3">Quick Setup</Badge>
          <h1 className="text-3xl md:text-4xl font-bold">Configure Your Account</h1>
          <p className="text-muted-foreground mt-2">Three quick steps to get started with AkinSec.</p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 mb-10">
          {[1,2,3].map((n) => (
            <div key={n} className={`flex items-center gap-3 p-3 rounded-lg border ${step===n?'border-accent':'border-border/60'} bg-card/70`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step===n?'bg-accent text-accent-foreground':'bg-muted text-foreground/70'}`}>{n}</div>
              <div className="text-sm font-medium">
                {n===1 && 'Choose Plan'}
                {n===2 && 'Organization Details'}
                {n===3 && 'Confirm & Finish'}
              </div>
            </div>
          ))}
        </div>

        {step === 1 && (
          <Card className="bg-card/70 backdrop-blur border-border/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-3"><CreditCard className="w-5 h-5 text-purple-600"/> Select a plan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center gap-4 mb-6">
                <span>Monthly</span>
                <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
                <span>Annually</span>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {(isAnnual
                  ? [
                      { id: 'free', name: 'Free', price: '$0', freq: '', desc: 'Test out the platform for free.' },
                      { id: 'starter', name: 'Starter', price: '$490', freq: '/year', desc: 'For small teams getting started.' },
                      { id: 'business', name: 'Business', price: '$1990', freq: '/year', desc: 'For growing businesses.' },
                    ]
                  : [
                      { id: 'free', name: 'Free', price: '$0', freq: '', desc: 'Test out the platform for free.' },
                      { id: 'starter', name: 'Starter', price: '$49', freq: '/month', desc: 'For small teams getting started.' },
                      { id: 'business', name: 'Business', price: '$199', freq: '/month', desc: 'For growing businesses.' },
                    ]
                  ).map(p => (
                  <button
                    key={p.id}
                    onClick={() => setPlan(p.id)}
                    className={`text-left p-5 rounded-xl border transition-colors ${plan===p.id?'border-accent bg-accent/5':'border-border/60 hover:border-border'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-semibold">{p.name}</div>
                        <div className="text-sm text-muted-foreground">{p.desc}</div>
                      </div>
                      <div className="text-2xl font-bold">{p.price} <span className="text-sm font-normal text-muted-foreground">{p.freq}</span></div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={next}>
                  Continue <ArrowRight className="w-4 h-4 ml-2"/>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card className="bg-card/70 backdrop-blur border-border/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-3"><User className="w-5 h-5 text-blue-600"/> Organization details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm mb-2">Organization name</label>
                  <input value={orgName} onChange={(e)=>setOrgName(e.target.value)} placeholder="Acme Inc." className="w-full h-10 px-3 rounded-md border bg-background"/>
                </div>
                <div>
                  <label className="block text-sm mb-2">Work email</label>
                  <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@company.com" className="w-full h-10 px-3 rounded-md border bg-background"/>
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={prev}>Back</Button>
                <Button onClick={next} className="btn-gradient">Review</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card className="bg-card/70 backdrop-blur border-border/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-3"><Shield className="w-5 h-5 text-green-600"/> Confirm setup</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-green-600"/> Plan: <span className="font-semibold capitalize">{plan}</span></div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-green-600"/> Org: <span className="font-semibold">{orgName || '—'}</span></div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-green-600"/> Email: <span className="font-semibold">{email || '—'}</span></div>
              </div>
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={prev}>Back</Button>
                <Link to={createPageUrl('Pricing')}><Button className="btn-cta-unique"><span>Finish & Choose Billing</span> <ArrowRight className="w-4 h-4 ml-2"/></Button></Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}


