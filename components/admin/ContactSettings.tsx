'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import type { ContactInfo } from '@/lib/contactStore';

export function ContactSettings() {
  const [contact, setContact] = useState<ContactInfo>({
    email: '',
    phone: '',
    address: '',
    facebook: '',
    twitter: '',
    instagram: '',
    youtube: '',
  });
  const [saved, setSaved] = useState(false);

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

  const handleSave = async () => {
    try {
      const res = await fetch('/api/contact', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact),
      });
      
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      console.error('Failed to save contact:', error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
        <CardDescription>Update your contact details shown in the footer</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Email */}
        <div>
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
            placeholder="info@punjabnews.com"
          />
        </div>

        {/* Phone */}
        <div>
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Phone Number
          </Label>
          <Input
            id="phone"
            value={contact.phone}
            onChange={(e) => setContact({ ...contact, phone: e.target.value })}
            placeholder="+92 XXX XXX XXXX"
          />
        </div>

        {/* Address */}
        <div>
          <Label htmlFor="address" className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Address
          </Label>
          <Input
            id="address"
            value={contact.address}
            onChange={(e) => setContact({ ...contact, address: e.target.value })}
            placeholder="Punjab, Pakistan"
          />
        </div>

        {/* Social Media */}
        <div className="space-y-4 pt-4 border-t">
          <h4 className="font-semibold text-sm">Social Media Links</h4>
          
          <div>
            <Label htmlFor="facebook" className="flex items-center gap-2">
              <Facebook className="w-4 h-4" />
              Facebook
            </Label>
            <Input
              id="facebook"
              value={contact.facebook}
              onChange={(e) => setContact({ ...contact, facebook: e.target.value })}
              placeholder="https://facebook.com/yourpage"
            />
          </div>

          <div>
            <Label htmlFor="twitter" className="flex items-center gap-2">
              <Twitter className="w-4 h-4" />
              Twitter
            </Label>
            <Input
              id="twitter"
              value={contact.twitter}
              onChange={(e) => setContact({ ...contact, twitter: e.target.value })}
              placeholder="https://twitter.com/yourhandle"
            />
          </div>

          <div>
            <Label htmlFor="instagram" className="flex items-center gap-2">
              <Instagram className="w-4 h-4" />
              Instagram
            </Label>
            <Input
              id="instagram"
              value={contact.instagram}
              onChange={(e) => setContact({ ...contact, instagram: e.target.value })}
              placeholder="https://instagram.com/yourprofile"
            />
          </div>

          <div>
            <Label htmlFor="youtube" className="flex items-center gap-2">
              <Youtube className="w-4 h-4" />
              YouTube
            </Label>
            <Input
              id="youtube"
              value={contact.youtube}
              onChange={(e) => setContact({ ...contact, youtube: e.target.value })}
              placeholder="https://youtube.com/yourchannel"
            />
          </div>
        </div>

        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 font-medium"
          >
            ✓ Contact information saved successfully!
          </motion.div>
        )}

        <Button onClick={handleSave} size="lg" className="w-full gap-2">
          <Save className="w-5 h-5" />
          Save Contact Information
        </Button>
      </CardContent>
    </Card>
  );
}
