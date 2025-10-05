'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Calendar, Eye, Download, Star } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import type { Magazine } from '@/lib/magazineStore';

function MagazineCard3D({ magazine, index }: { magazine: Magazine; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['5deg', '-5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-5deg', '5deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
    >
      <Card className="h-full group cursor-pointer shadow-xl" style={{ transform: 'translateZ(50px)' }}>
        <CardHeader className="p-0">
          <div className={`h-48 bg-gradient-to-br ${magazine.coverColor} rounded-t-xl relative overflow-hidden`}>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            {magazine.coverImage ? (
              <img src={magazine.coverImage} alt={magazine.title} className="w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="text-white text-center p-6"
                >
                  <p className="text-sm font-medium mb-2 uppercase tracking-wider">{magazine.category}</p>
                  <h3 className="text-2xl font-bold leading-tight">{magazine.title.split('-')[0]}</h3>
                </motion.div>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <CardTitle className="mb-2 text-lg">{magazine.title}</CardTitle>
          <CardDescription>{magazine.description}</CardDescription>
          
          <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(magazine.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{magazine.rating}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="gap-2">
          <Link href={`/magazines/${magazine.id}`} className="flex-1">
            <Button variant="default" className="w-full gap-2">
              <Eye className="w-4 h-4" />
              Read
            </Button>
          </Link>
          <Button variant="outline" size="icon">
            <Download className="w-4 h-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export function FeaturedMagazines() {
  const [magazines, setMagazines] = useState<Magazine[]>([]);

  useEffect(() => {
    fetchMagazines();
  }, []);

  const fetchMagazines = async () => {
    try {
      const res = await fetch('/api/magazines');
      const data = await res.json();
      setMagazines(data.slice(0, 4)); // Show only first 4
    } catch (error) {
      console.error('Failed to fetch magazines:', error);
    }
  };
  return (
    <section className="py-20 bg-gradient-to-b from-amber-50/50 via-orange-50/30 to-amber-50/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Magazines
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse our latest digital publications covering news, culture, and more
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {magazines.map((magazine, index) => (
            <MagazineCard3D key={magazine.id} magazine={magazine} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/magazines">
            <Button size="lg" variant="outline">
              View All Magazines
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
