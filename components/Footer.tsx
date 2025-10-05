'use client';

import Link from 'next/link';
import { BookOpen, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { ContactInfo } from '@/lib/contactStore';

export function Footer() {
  const [contact, setContact] = useState<ContactInfo>({
    email: 'info@punjabnews.com',
    phone: '+92 XXX XXX XXXX',
    address: 'Punjab, Pakistan',
    facebook: '#',
    twitter: '#',
    instagram: '#',
    youtube: '#',
  });

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    try {
      const res = await fetch('/api/contact');
      const data = await res.json();
      setContact(data);
    } catch (error) {
      console.error('Failed to fetch contact:', error);
    }
  };
  return (
    <footer className="bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-amber-600 p-2 rounded-lg">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-xl">Punjab News Agency</h3>
                <p className="text-xs text-amber-200">Your Trusted Source</p>
              </div>
            </div>
            <p className="text-sm text-amber-100">
              Delivering quality journalism and digital magazines to readers across Punjab and beyond.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-amber-100 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/magazines" className="text-amber-100 hover:text-white transition-colors">
                  Magazines
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-amber-100 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-amber-100 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-lg mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-amber-100">Current Affairs</li>
              <li className="text-amber-100">Culture & Heritage</li>
              <li className="text-amber-100">Agriculture</li>
              <li className="text-amber-100">Sports</li>
              <li className="text-amber-100">Business</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-amber-100">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>{contact.address}</span>
              </li>
              <li className="flex items-center gap-2 text-amber-100">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>{contact.email}</span>
              </li>
              <li className="flex items-center gap-2 text-amber-100">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>{contact.phone}</span>
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex gap-3 mt-4">
              <a href={contact.facebook} target="_blank" rel="noopener noreferrer" className="bg-amber-700 hover:bg-amber-600 p-2 rounded-lg transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href={contact.twitter} target="_blank" rel="noopener noreferrer" className="bg-amber-700 hover:bg-amber-600 p-2 rounded-lg transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="bg-amber-700 hover:bg-amber-600 p-2 rounded-lg transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={contact.youtube} target="_blank" rel="noopener noreferrer" className="bg-amber-700 hover:bg-amber-600 p-2 rounded-lg transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-amber-700 mt-8 pt-8 text-center text-sm text-amber-200">
          <p>&copy; {new Date().getFullYear()} Punjab News Agency. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
