
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
  Loader2
} from 'lucide-react';
// Contact form functionality removed for static website

const ContactCard = ({ icon: Icon, title, content, description }) => (
  <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg text-center p-6 hover:shadow-xl transition-all duration-300">
    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
      <Icon className="w-8 h-8" />
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
    <p className="text-lg font-semibold text-blue-600 mb-2">{content}</p>
    <p className="text-sm text-slate-600">{description}</p>
  </Card>
);

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
        name: '',
        email: '',
        company: '',
        subject: '',
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
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-20 md:py-32 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Get in Touch
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
            Have questions about AkinSec? Want to learn more about how we can help your business achieve compliance? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Let's Start a Conversation</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Whether you're ready to get started or just want to learn more, our team is here to help. Fill out the form and we'll get back to you within 24 hours.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent/20 text-accent rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Email Us</h3>
                      <p className="text-muted-foreground">hello@akinsec.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent/20 text-accent rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Response Time</h3>
                      <p className="text-muted-foreground">Within 24 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent/20 text-accent rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Location</h3>
                      <p className="text-muted-foreground">San Francisco, CA</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <Card className="p-8 bg-card/60 backdrop-blur-md border-border/30 shadow-xl">
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john@company.com" />
                    </div>
                    
                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" placeholder="Your Company" />
                    </div>
                    
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" placeholder="Tell us about your compliance needs..." rows={4} />
                    </div>
                    
                    <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                      Send Message
                    </Button>
                  </form>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
