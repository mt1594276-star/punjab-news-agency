'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { isAuthenticated, setAuthenticated } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { LogOut, Settings, Mail } from 'lucide-react';
import { ContactSettings } from '@/components/admin/ContactSettings';
import { SiteSettings } from '@/components/admin/SiteSettings';

export default function SettingsPage() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [activeTab, setActiveTab] = useState<'contact' | 'site'>('contact');

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin/login');
    } else {
      setIsAuth(true);
    }
  }, [router]);

  const handleLogout = () => {
    setAuthenticated(false);
    router.push('/admin/login');
  };

  if (!isAuth) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-4xl font-bold mb-2">Site Settings</h1>
              <p className="text-xl text-amber-100">Manage your website configuration</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('contact')}
            className={`pb-4 px-4 font-medium transition-colors flex items-center gap-2 ${
              activeTab === 'contact'
                ? 'border-b-2 border-amber-600 text-amber-600'
                : 'text-gray-600 hover:text-amber-600'
            }`}
          >
            <Mail className="w-4 h-4" />
            Contact Information
          </button>
          <button
            onClick={() => setActiveTab('site')}
            className={`pb-4 px-4 font-medium transition-colors flex items-center gap-2 ${
              activeTab === 'site'
                ? 'border-b-2 border-amber-600 text-amber-600'
                : 'text-gray-600 hover:text-amber-600'
            }`}
          >
            <Settings className="w-4 h-4" />
            Site Overview
          </button>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'contact' && <ContactSettings />}
          {activeTab === 'site' && <SiteSettings />}
        </motion.div>

        {/* Back to Dashboard */}
        <div className="mt-8 text-center">
          <Button
            onClick={() => router.push('/admin')}
            variant="outline"
            size="lg"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
