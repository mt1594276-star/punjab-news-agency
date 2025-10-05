'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Upload, FileText, Image as ImageIcon, Calendar, Tag, FolderOpen, Star, Trash2, Edit, CheckCircle, Eye, LogOut, Settings } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Magazine } from '@/lib/magazineStore';
import { isAuthenticated, setAuthenticated } from '@/lib/auth';

export default function AdminPage() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [magazines, setMagazines] = useState<Magazine[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    category: 'Current Affairs',
    rating: 4.5,
    coverColor: 'from-blue-500 to-blue-700',
  });

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated()) {
      router.push('/admin/login');
    } else {
      setIsAuth(true);
      fetchMagazines();
    }
  }, [router]);

  const fetchMagazines = async () => {
    try {
      const res = await fetch('/api/magazines');
      const data = await res.json();
      setMagazines(data);
    } catch (error) {
      console.error('Failed to fetch magazines:', error);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const res = await fetch('/api/magazines', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        setShowSuccess(true);
        setFormData({
          title: '',
          description: '',
          date: '',
          category: 'Current Affairs',
          rating: 4.5,
          coverColor: 'from-blue-500 to-blue-700',
        });
        setUploadedFile(null);
        setCoverImage(null);
        fetchMagazines();
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Failed to add magazine:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this magazine?')) return;
    
    try {
      const res = await fetch(`/api/magazines/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchMagazines();
      }
    } catch (error) {
      console.error('Failed to delete magazine:', error);
    }
  };

  const colorOptions = [
    { name: 'Blue', value: 'from-blue-500 to-blue-700' },
    { name: 'Purple', value: 'from-purple-500 to-purple-700' },
    { name: 'Green', value: 'from-green-500 to-green-700' },
    { name: 'Red', value: 'from-red-500 to-red-700' },
    { name: 'Indigo', value: 'from-indigo-500 to-indigo-700' },
    { name: 'Orange', value: 'from-orange-500 to-orange-700' },
  ];

  const handleLogout = () => {
    setAuthenticated(false);
    router.push('/admin/login');
  };

  if (!isAuth) {
    return null; // Show nothing while redirecting
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
              <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-xl text-amber-100">Upload and manage your magazine content</p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => router.push('/admin/settings')}
                variant="outline"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 gap-2"
              >
                <Settings className="w-4 h-4" />
                Settings
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upload Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* File Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload Magazine
                </CardTitle>
                <CardDescription>
                  Upload PDF files, cover images, or ZIP archives containing magazine content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                    dragActive 
                      ? 'border-amber-600 bg-amber-50' 
                      : 'border-gray-300 hover:border-amber-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept=".pdf,.zip,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center gap-4">
                      <div className="bg-amber-100 p-4 rounded-full">
                        <FolderOpen className="w-8 h-8 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-gray-700">
                          {uploadedFile ? uploadedFile.name : 'Drop files here or click to browse'}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Supports PDF, ZIP, JPG, PNG (Max 50MB)
                        </p>
                      </div>
                      <Button type="button" variant="outline">
                        Select File
                      </Button>
                    </div>
                  </label>
                </div>

                {uploadedFile && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg"
                  >
                    <p className="text-green-800 font-medium">
                      ✓ File ready: {uploadedFile.name} ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  </motion.div>
                )}
              </CardContent>
            </Card>

            {/* Magazine Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Magazine Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., Punjab Today - January 2025"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Brief description of the magazine content..."
                      rows={3}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date" className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Issue Date *
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="category" className="flex items-center gap-2">
                        <Tag className="w-4 h-4" />
                        Category *
                      </Label>
                      <select
                        id="category"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        <option>Current Affairs</option>
                        <option>Culture</option>
                        <option>Agriculture</option>
                        <option>Sports</option>
                        <option>Business</option>
                        <option>Education</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="rating" className="flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        Rating (1-5)
                      </Label>
                      <Input
                        id="rating"
                        type="number"
                        min="1"
                        max="5"
                        step="0.1"
                        value={formData.rating}
                        onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="coverColor">Cover Color</Label>
                      <select
                        id="coverColor"
                        value={formData.coverColor}
                        onChange={(e) => setFormData({ ...formData, coverColor: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        {colorOptions.map((color) => (
                          <option key={color.value} value={color.value}>
                            {color.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="coverImage" className="flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" />
                      Cover Image (Optional)
                    </Label>
                    <Input
                      id="coverImage"
                      type="file"
                      accept="image/*"
                      onChange={handleCoverImageChange}
                    />
                    {coverImage && (
                      <p className="text-sm text-green-600 mt-1">✓ {coverImage.name}</p>
                    )}
                  </div>

                  {showSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-green-800 font-medium">Magazine published successfully!</span>
                    </motion.div>
                  )}

                  <div className="pt-4">
                    <Button type="submit" size="lg" className="w-full gap-2">
                      <Upload className="w-5 h-5" />
                      Publish Magazine
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Total Magazines</p>
                    <p className="text-2xl font-bold text-blue-600">{magazines.length}</p>
                  </div>
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>

                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Total Views</p>
                    <p className="text-2xl font-bold text-green-600">
                      {(magazines.reduce((sum, m) => sum + m.views, 0) / 1000).toFixed(1)}K
                    </p>
                  </div>
                  <Upload className="w-8 h-8 text-green-600" />
                </div>

                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Avg Rating</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {magazines.length > 0 ? (magazines.reduce((sum, m) => sum + m.rating, 0) / magazines.length).toFixed(1) : '0.0'}
                    </p>
                  </div>
                  <Star className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upload Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>PDF files should be optimized for web viewing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>Cover images recommended: 800x1000px</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>Maximum file size: 50MB</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>Use descriptive titles and tags</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>Ensure content is properly formatted</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Magazine List */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Published Magazines</CardTitle>
              <CardDescription>Manage your existing magazine collection</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {magazines.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No magazines published yet. Create your first one above!</p>
                ) : (
                  magazines.map((magazine) => (
                    <motion.div
                      key={magazine.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className={`w-20 h-28 bg-gradient-to-br ${magazine.coverColor} rounded-lg flex-shrink-0`} />
                      
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{magazine.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{magazine.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(magazine.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Tag className="w-4 h-4" />
                            {magazine.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                            {magazine.rating}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {magazine.views.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDelete(magazine.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
