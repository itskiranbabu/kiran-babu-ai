import React, { useState } from 'react';
import { ExternalLink, Tag, Plus, Edit2, Trash2, Upload, X, Loader2 } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import SEO from '../components/SEO';
import FadeIn from '../components/FadeIn';
import { useProjects, useStorage } from '../hooks/useRealTimeData';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/ToastContext';
import { Project } from '../services/database';

const Portfolio: React.FC = () => {
  const { user } = useAuth();
  const { projects, loading, addProject, updateProject, deleteProject } = useProjects();
  const { uploadFile, uploading } = useStorage('projects');
  const { addToast } = useToast();
  
  const [filter, setFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    client: '',
    category: '',
    result: '',
    images: [] as string[],
    metrics: {
      revenue: '',
      leads: 0,
      conversion: '',
      views: 0
    }
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  
  // Extract unique categories from projects
  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];
  
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  // Handle image selection
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Open modal for new project
  const handleAddNew = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      client: '',
      category: '',
      result: '',
      images: [],
      metrics: { revenue: '', leads: 0, conversion: '', views: 0 }
    });
    setImageFile(null);
    setImagePreview('');
    setShowModal(true);
  };

  // Open modal for editing
  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      client: project.client,
      category: project.category,
      result: project.result,
      images: project.images || [],
      metrics: project.metrics || { revenue: '', leads: 0, conversion: '', views: 0 }
    });
    setImagePreview(project.images?.[0] || '');
    setShowModal(true);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let imageUrl = formData.images[0] || '';
      
      // Upload image if new file selected
      if (imageFile) {
        const uploaded = await uploadFile(imageFile);
        if (uploaded) {
          imageUrl = uploaded;
        }
      }

      const projectData = {
        ...formData,
        images: imageUrl ? [imageUrl] : []
      };

      if (editingProject) {
        // Update existing project
        await updateProject(editingProject.id, projectData);
        addToast('Project updated successfully!', 'success');
      } else {
        // Create new project
        await addProject(projectData);
        addToast('Project added successfully!', 'success');
      }

      setShowModal(false);
      setImageFile(null);
      setImagePreview('');
    } catch (error: any) {
      addToast(error.message || 'Failed to save project', 'error');
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    try {
      await deleteProject(id);
      addToast('Project deleted successfully!', 'success');
    } catch (error: any) {
      addToast(error.message || 'Failed to delete project', 'error');
    }
  };

  return (
    <div className="pt-16 pb-20 px-4 max-w-7xl mx-auto">
      <SEO title="Portfolio" description="Real-time portfolio with case studies and recent work." />
      
      <FadeIn>
        <div className="flex items-center justify-between mb-8">
          <SectionHeader 
            title="Selected Work" 
            subtitle="A collection of systems, websites, and content strategies built for creators."
          />
          {user && (
            <button
              onClick={handleAddNew}
              className="flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-lg transition-colors"
            >
              <Plus size={20} />
              Add Project
            </button>
          )}
        </div>
      </FadeIn>

      {/* Filter Tabs */}
      <FadeIn delay={100}>
        <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        filter === cat 
                        ? 'bg-white text-black font-bold shadow-lg shadow-white/10 scale-105' 
                        : 'bg-dark-card text-gray-400 border border-dark-border hover:text-white hover:border-gray-500'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>
      </FadeIn>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-brand-500" size={40} />
        </div>
      )}

      {/* Projects Grid */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <FadeIn key={project.id} delay={index * 100}>
              <div className="group bg-dark-card border border-dark-border rounded-2xl overflow-hidden hover:border-brand-500/50 transition-all duration-300 flex flex-col h-full">
                  {/* Image Container */}
                  <div className="relative aspect-video overflow-hidden">
                      <img 
                          src={project.images?.[0] || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'} 
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent opacity-80" />
                      
                      {/* Floating Category Badge */}
                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur border border-white/10 px-3 py-1 rounded-full text-xs font-semibold text-white flex items-center gap-1.5">
                          <Tag size={12} className="text-brand-400" />
                          {project.category}
                      </div>

                      {/* Edit/Delete Buttons (only for authenticated user) */}
                      {user && (
                        <div className="absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEdit(project)}
                            className="p-2 bg-black/60 backdrop-blur hover:bg-brand-600 text-white rounded-lg transition-colors"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(project.id)}
                            className="p-2 bg-black/60 backdrop-blur hover:bg-red-600 text-white rounded-lg transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                      <div className="mb-4">
                          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-brand-400 transition-colors">
                              {project.title}
                          </h3>
                          <p className="text-sm text-gray-500 font-medium">
                              Client: {project.client}
                          </p>
                          {project.description && (
                            <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                              {project.description}
                            </p>
                          )}
                      </div>

                      <div className="mt-auto pt-6 border-t border-dark-border flex items-center justify-between">
                          <div>
                               <span className="block text-xs text-gray-500 uppercase tracking-wider mb-0.5">Result</span>
                               <span className="text-sm font-bold text-green-400">{project.result}</span>
                          </div>
                          <button className="p-2 text-gray-400 hover:text-white bg-dark-bg hover:bg-white/10 rounded-lg transition-colors">
                              <ExternalLink size={18} />
                          </button>
                      </div>
                  </div>
              </div>
            </FadeIn>
          ))}
        </div>
      )}
      
      {!loading && filteredProjects.length === 0 && (
          <div className="text-center py-20 bg-dark-card/30 rounded-2xl border border-dark-border border-dashed">
              <p className="text-gray-500">No projects found in this category.</p>
              {user && (
                <button
                  onClick={handleAddNew}
                  className="mt-4 px-6 py-2 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg transition-colors"
                >
                  Add Your First Project
                </button>
              )}
          </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-dark-card border border-dark-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-dark-border flex items-center justify-between sticky top-0 bg-dark-card z-10">
              <h2 className="text-xl font-bold text-white">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Project Image
                </label>
                <div className="relative">
                  {imagePreview ? (
                    <div className="relative aspect-video rounded-lg overflow-hidden border border-dark-border">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => {
                          setImageFile(null);
                          setImagePreview('');
                        }}
                        className="absolute top-2 right-2 p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center aspect-video border-2 border-dashed border-dark-border rounded-lg cursor-pointer hover:border-brand-500 transition-colors">
                      <Upload size={40} className="text-gray-500 mb-2" />
                      <span className="text-sm text-gray-500">Click to upload image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelect}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white focus:border-brand-500 focus:outline-none"
                  placeholder="e.g., Website Redesign"
                />
              </div>

              {/* Client & Category */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white focus:border-brand-500 focus:outline-none"
                    placeholder="e.g., TechCorp"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Category *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white focus:border-brand-500 focus:outline-none"
                    placeholder="e.g., Web Design"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white focus:border-brand-500 focus:outline-none resize-none"
                  placeholder="Brief description of the project..."
                />
              </div>

              {/* Result */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Result/Outcome *
                </label>
                <input
                  type="text"
                  required
                  value={formData.result}
                  onChange={(e) => setFormData({ ...formData, result: e.target.value })}
                  className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white focus:border-brand-500 focus:outline-none"
                  placeholder="e.g., +150% Conversion Rate"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 bg-dark-bg border border-dark-border text-white font-medium rounded-lg hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Uploading...
                    </>
                  ) : (
                    editingProject ? 'Update Project' : 'Add Project'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
