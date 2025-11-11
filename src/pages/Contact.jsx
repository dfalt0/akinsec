
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  MessageSquare,
  Send,
  CheckCircle,
  Loader2,
  ArrowRight
} from 'lucide-react';
import WaveBackground from '@/components/WaveBackground';
import './Home.css';
// Contact form functionality removed for static website

const ContactCard = ({ icon: Icon, title, content, description }) => (
  <Card className="card-enhanced text-center p-6 group">
    <div className="w-16 h-16 bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-700 transition-colors duration-300">
      <Icon className="w-8 h-8 text-gray-400 group-hover:text-white transition-colors duration-300" />
    </div>
    <h3 className="text-xl font-medium text-white mb-2">{title}</h3>
    <p className="text-lg font-medium text-white mb-2">{content}</p>
    <p className="text-sm text-gray-400">{description}</p>
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
          <h1 className="text-5xl md:text-7xl font-light text-white mb-6 leading-none tracking-tight mt-32">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Have questions about AkinSec? Want to learn more about how we can help your business achieve compliance? We'd love to hear from you.
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
                      className="w-full btn-primary-gradient rounded-lg border-0 transition-all duration-200 group relative"
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
      icon: Mail,
      title: "Email Support",
      content: "hello@akinsec.com",
      description: "Get help with your account"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      content: "Available 24/7",
      description: "Chat with our support team"
    },
    {
      icon: Phone,
      title: "Phone Support",
      content: "+1 (555) 123-4567",
      description: "Call us during business hours"
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
            className="btn-primary-gradient px-8 py-3 text-base rounded-lg border-0 group relative"
          >
            <span className="relative z-10 flex items-center">
              Start Free Trial
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="btn-secondary-gradient px-8 py-3 text-base font-medium rounded-lg backdrop-blur-sm relative"
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
      <WaveBackground />
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
