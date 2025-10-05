'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Eye, Download, Search, Filter, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Magazine } from '@/lib/magazineStore';

const categories = ['All', 'Current Affairs', 'Culture', 'Agriculture', 'Sports', 'Business', 'Education'];

export default function MagazinesPage() {
  const [allMagazines, setAllMagazines] = useState<Magazine[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchMagazines();
  }, []);

  const fetchMagazines = async () => {
    try {
      const res = await fetch('/api/magazines');
      const data = await res.json();
      setAllMagazines(data);
    } catch (error) {
      console.error('Failed to fetch magazines:', error);
    }
  };

  const filteredMagazines = allMagazines.filter((magazine) => {
    const matchesCategory = selectedCategory === 'All' || magazine.category === selectedCategory;
    const matchesSearch = magazine.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         magazine.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-4">Magazine Collection</h1>
            <p className="text-xl text-amber-100 max-w-2xl mx-auto">
              Browse our extensive collection of digital magazines covering various topics
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search magazines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-5 h-5 text-gray-600" />
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Magazine Grid */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMagazines.map((magazine, index) => (
            <motion.div
              key={magazine.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full group cursor-pointer">
                <CardHeader className="p-0">
                  <div className={`h-64 bg-gradient-to-br ${magazine.coverColor} rounded-t-xl relative overflow-hidden`}>
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
                          <h3 className="text-3xl font-bold leading-tight">{magazine.title.split('-')[0]}</h3>
                          {magazine.title.includes('-') && (
                            <p className="text-lg mt-2 opacity-90">{magazine.title.split('-')[1]}</p>
                          )}
                        </motion.div>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <CardTitle className="mb-2 text-xl">{magazine.title}</CardTitle>
                  <CardDescription className="text-base">{magazine.description}</CardDescription>
                  
                  <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(magazine.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{magazine.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span>{magazine.rating}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="gap-2">
                  <Button variant="default" className="flex-1 gap-2">
                    <Eye className="w-4 h-4" />
                    Read Now
                  </Button>
                  <Button variant="outline" size="icon">
                    <Download className="w-4 h-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredMagazines.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-500">No magazines found</p>
            <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </section>
    </div>
  );
}
