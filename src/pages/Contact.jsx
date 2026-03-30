
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Send, CheckCircle, Loader2, ArrowRight } from 'lucide-react';
import { SectionIndex } from '@/components/marketing/SectionIndex';
import './Home.css';
// Contact form functionality removed for static website

const ContactCard = ({ title, content, description }) => (
  <Card className="card-enhanced p-6 group text-left">
    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">{title}</p>
    <p className="text-lg font-medium text-white mb-2">{content}</p>
    <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
  </Card>
);

// Ultra-minimal hero section
const HeroSection = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-transparent overflow-hidden">
      <div className="container mx-auto px-6 text-center relative z-10 max-w-6xl">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-6 mt-24 flex justify-center md:mt-32">
            <SectionIndex index={1} label="CONTACT" />
          </div>
          <h1 className="mb-6 text-5xl font-semibold leading-none tracking-tight text-foreground md:text-7xl">
            Get in touch
          </h1>
          <p className="mx-auto mb-12 max-w-3xl text-xl font-light leading-relaxed text-muted-foreground">
            Tell us what is breaking today—integrations, audits, or alert overload—and we will respond with next steps, not a generic brochure.
          </p>
        </div>
      </div>
    </section>
  );
};

// Clean contact form section
const ContactFormSection = ({ formData, setFormData, isSubmitting, isSubmitted, error, handleSubmit }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section className="py-24 bg-black/20 backdrop-blur-md relative z-10">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-light text-white mb-6">Let's Start a Conversation</h2>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Whether you're ready to get started or just want to learn more, our team is here to help. Fill out the form and we'll get back to you within 24 hours.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Email Us</h3>
                    <p className="text-gray-400">hello@akinsec.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Response Time</h3>
                    <p className="text-gray-400">Within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Location</h3>
                    <p className="text-gray-400">San Francisco, CA</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <Card className="p-8 card-enhanced">
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-medium text-white mb-2">Message Sent!</h3>
                    <p className="text-gray-400">We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="text-white">First Name</Label>
                        <Input 
                          id="firstName" 
                          name="firstName"
                          placeholder="John" 
                          value={formData.firstName || ''}
                          onChange={handleInputChange}
                          className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-gray-500 rounded-lg"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-white">Last Name</Label>
                        <Input 
                          id="lastName" 
                          name="lastName"
                          placeholder="Doe" 
                          value={formData.lastName || ''}
                          onChange={handleInputChange}
                          className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-gray-500 rounded-lg"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="text-white">Email</Label>
                      <Input 
                        id="email" 
                        name="email"
                        type="email" 
                        placeholder="john@company.com" 
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-gray-500 rounded-lg"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="company" className="text-white">Company</Label>
                      <Input 
                        id="company" 
                        name="company"
                        placeholder="Your Company" 
                        value={formData.company}
                        onChange={handleInputChange}
                        className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-gray-500 rounded-lg"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="message" className="text-white">Message</Label>
                      <Textarea 
                        id="message" 
                        name="message"
                        placeholder="Tell us about your compliance needs..." 
                        rows={4} 
                        value={formData.message}
                        onChange={handleInputChange}
                        className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-gray-500 rounded-lg"
                      />
                    </div>
                    
                    {error && (
                      <div className="text-red-400 text-sm">{error}</div>
                    )}
                    
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="btn-primary-gradient w-full rounded-button border-0 transition-all duration-200 group relative"
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </span>
                    </Button>
                  </form>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Clean contact info section
const ContactInfoSection = () => {
  const contactInfo = [
    {
      title: "Email",
      content: "hello@akinsec.com",
      description: "Best for scoped questions and follow-ups after you try the product."
    },
    {
      title: "Chat",
      content: "In-app during trial",
      description: "When live chat is enabled, you will see it in the workspace."
    },
    {
      title: "Phone",
      content: "By appointment",
      description: "Book through email first so the right person joins the call."
    }
  ];

  return (
    <section className="py-24 bg-black/30 backdrop-blur-sm relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-white mb-4">Other Ways to Reach Us</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Choose the communication method that works best for you
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {contactInfo.map((info, index) => (
            <ContactCard key={index} {...info} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Minimal CTA
const CTASection = () => {
  return (
    <section className="py-24 bg-black/20 backdrop-blur-md relative z-10">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-light text-white mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto">
          Join thousands of teams already using AkinSec to streamline their compliance workflows.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="btn-primary-gradient rounded-button px-8 py-3 text-base border-0 group relative"
          >
            <span className="relative z-10 flex items-center">
              Start Free Trial
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="btn-secondary-gradient rounded-button px-8 py-3 text-base font-medium backdrop-blur-sm relative"
          >
            <span className="relative z-10">Schedule Demo</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // For static website, we'll simulate a successful submission
      // In a real implementation, you would integrate with a form service like Formspree, Netlify Forms, or similar
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      setIsSubmitted(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        message: ''
      });
    } catch (err) {
      setError('Failed to send message. Please try again or contact us directly.');
      console.error('Contact form error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      <HeroSection />
      <ContactFormSection 
        formData={formData}
        setFormData={setFormData}
        isSubmitting={isSubmitting}
        isSubmitted={isSubmitted}
        error={error}
        handleSubmit={handleSubmit}
      />
      <ContactInfoSection />
      <CTASection />
    </div>
  );
}
