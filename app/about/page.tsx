'use client';

import { motion } from 'framer-motion';
import { BookOpen, Users, Target, Award, Heart, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About Us</h1>
            <p className="text-xl text-amber-100">
              Your trusted source for news, stories, and insights from Punjab
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Our Story */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-8 h-8 text-amber-600" />
              <h2 className="text-4xl font-bold text-gray-900">Our Story</h2>
            </div>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Punjab News Agency is a premier digital magazine platform dedicated to bringing you the latest news, 
                stories, and insights from Punjab. Founded with a vision to connect communities and share authentic 
                narratives, we have grown into a trusted source of information for thousands of readers.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our mission is to provide high-quality journalism that informs, educates, and inspires. We cover a 
                wide range of topics including current affairs, culture, agriculture, business, and lifestyle, ensuring 
                that our readers stay connected with what matters most.
              </p>
              <p className="text-gray-700 leading-relaxed">
                With a team of dedicated journalists and content creators, we strive to deliver accurate, unbiased, 
                and engaging content that reflects the rich diversity and vibrant spirit of Punjab.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Our Values */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 border-amber-200 hover:shadow-xl transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Integrity</h3>
                <p className="text-gray-600">
                  We uphold the highest standards of journalistic integrity and ethical reporting.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-amber-200 hover:shadow-xl transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Community</h3>
                <p className="text-gray-600">
                  We are committed to serving our community and amplifying diverse voices.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-amber-200 hover:shadow-xl transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Excellence</h3>
                <p className="text-gray-600">
                  We strive for excellence in every story we tell and every magazine we publish.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-gradient-to-br from-amber-600 to-orange-600 rounded-3xl p-12 text-white">
            <h2 className="text-4xl font-bold text-center mb-12">Our Impact</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">500+</div>
                <div className="text-amber-100">Magazine Issues</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">50K+</div>
                <div className="text-amber-100">Active Readers</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">10+</div>
                <div className="text-amber-100">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">24/7</div>
                <div className="text-amber-100">Digital Access</div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* What We Cover */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">What We Cover</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: 'Current Affairs', icon: '📰' },
              { name: 'Culture & Heritage', icon: '🎭' },
              { name: 'Agriculture', icon: '🌾' },
              { name: 'Business', icon: '💼' },
              { name: 'Lifestyle', icon: '✨' },
              { name: 'Sports', icon: '⚽' },
            ].map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border-2 border-amber-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-gray-900">{category.name}</h3>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Join Us */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-12 border-2 border-amber-200">
            <Globe className="w-16 h-16 text-amber-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Community</h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Stay connected with Punjab's stories. Subscribe to our digital magazines and never miss an update.
            </p>
            <a
              href="/magazines"
              className="inline-block bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-shadow"
            >
              Explore Magazines
            </a>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
