import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Calendar, 
  Clock, 
  User,
  Search,
  ArrowRight,
  BookOpen,
  Shield,
  TrendingUp,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils/index.js';

const BlogPost = ({ title, excerpt, category, readTime, date, author, featured = false }) => (
  <Card className={`bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${featured ? 'lg:col-span-2' : ''}`}>
    <CardHeader>
      <div className="flex items-center gap-2 mb-2">
        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          {category}
        </Badge>
        {featured && (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Featured
          </Badge>
        )}
      </div>
      <CardTitle className={`font-bold text-slate-900 hover:text-blue-700 transition-colors ${featured ? 'text-2xl' : 'text-xl'}`}>
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className={`text-slate-600 mb-4 ${featured ? 'text-lg' : 'text-sm'}`}>{excerpt}</p>
      <div className="flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <User className="w-3 h-3" />
            <span>{author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{readTime}</span>
          </div>
        </div>
        <ArrowRight className="w-4 h-4 text-blue-600" />
      </div>
    </CardContent>
  </Card>
);

const CategoryCard = ({ icon: Icon, title, count, color }) => (
  <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
    <CardContent className="p-6 text-center">
      <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
      <p className="text-sm text-slate-500">{count} articles</p>
    </CardContent>
  </Card>
);

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const blogPosts = [
    {
      title: "The Complete Guide to SOC 2 Compliance in 2024",
      excerpt: "Everything you need to know about achieving SOC 2 Type II certification, from initial preparation to ongoing monitoring and maintenance.",
      category: "SOC 2",
      readTime: "8 min read",
      date: "Jan 15, 2024",
      author: "Sarah Chen",
      featured: true
    },
    {
      title: "GDPR Compliance for SaaS Companies: A Practical Approach",
      excerpt: "Navigate GDPR requirements with confidence. Learn about data mapping, consent management, and building privacy by design.",
      category: "GDPR",
      readTime: "6 min read",
      date: "Jan 12, 2024",
      author: "Dr. Emily Watson"
    },
    {
      title: "AI in Compliance: How Machine Learning is Transforming Risk Management",
      excerpt: "Discover how artificial intelligence is revolutionizing compliance monitoring, risk assessment, and regulatory reporting.",
      category: "Technology",
      readTime: "5 min read",
      date: "Jan 10, 2024",
      author: "James Wilson"
    },
    {
      title: "Building a Security Culture: Tips for Small and Medium Businesses",
      excerpt: "Create a strong security culture in your organization with practical steps that don't require a massive budget.",
      category: "Security Culture",
      readTime: "7 min read",
      date: "Jan 8, 2024",
      author: "Michael Rodriguez"
    },
    {
      title: "ISO 27001 vs SOC 2: Which Framework is Right for Your Business?",
      excerpt: "Compare these two popular security frameworks and learn how to choose the right certification path for your organization.",
      category: "ISO 27001",
      readTime: "9 min read",
      date: "Jan 5, 2024",
      author: "David Kim"
    },
    {
      title: "The Cost of Non-Compliance: Real-World Case Studies",
      excerpt: "Learn from real examples of companies that faced significant penalties and reputational damage due to compliance failures.",
      category: "Case Studies",
      readTime: "6 min read",
      date: "Jan 3, 2024",
      author: "Lisa Thompson"
    }
  ];

  const categories = [
    { icon: Shield, title: "Security", count: 12, color: "bg-blue-600" },
    { icon: FileText, title: "Compliance", count: 18, color: "bg-green-600" },
    { icon: TrendingUp, title: "Best Practices", count: 8, color: "bg-purple-600" },
    { icon: BookOpen, title: "Guides", count: 15, color: "bg-orange-600" }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-20 md:py-32 text-center bg-gradient-to-b from-background to-background/90">
        <div className="container mx-auto px-4">
          <Badge variant="outline" className="mb-4 border-blue-500/50 text-blue-600 font-semibold py-1 px-3 rounded-full">
            Compliance Blog
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Stay Informed on Compliance
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground mb-8">
            Get the latest insights, best practices, and expert advice on compliance, security, and risk management from our team of specialists.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
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

      {/* Blog Posts */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">Latest Articles</h2>
            <Button variant="outline">
              View All Posts
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <BlogPost key={index} {...post} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Stay Updated</h3>
              <p className="text-slate-600 mb-6">
                Get the latest compliance insights delivered to your inbox weekly.
              </p>
              <div className="flex gap-3">
                <Input 
                  placeholder="Enter your email address" 
                  className="flex-1"
                />
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-slate-500 mt-3">
                No spam. Unsubscribe at any time.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}