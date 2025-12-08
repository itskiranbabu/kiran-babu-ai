import React, { useState, useEffect } from 'react';
import { Zap, Search, Filter, ArrowRight, Sparkles, Clock, TrendingUp } from 'lucide-react';
import { supabase } from '../services/supabaseClient';
import LoadingSpinner from './LoadingSpinner';
import { useToast } from './ToastContext';

interface AutomationRecipe {
  id: string;
  title: string;
  description: string;
  trigger: string;
  actions: Array<{ step: number; action: string }>;
  tools: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  estimatedTime: string;
  popularity: number;
}

interface AutomationRecipesLibraryProps {
  onSelectRecipe?: (recipe: AutomationRecipe) => void;
}

const AutomationRecipesLibrary: React.FC<AutomationRecipesLibraryProps> = ({ onSelectRecipe }) => {
  const [recipes, setRecipes] = useState<AutomationRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const { addToast } = useToast();

  const categories = [
    { id: 'all', label: 'All Recipes', icon: '📚' },
    { id: 'lead_gen', label: 'Lead Generation', icon: '🎯' },
    { id: 'onboarding', label: 'Client Onboarding', icon: '👋' },
    { id: 'follow_up', label: 'Follow-up', icon: '📧' },
    { id: 'payment', label: 'Payment & Billing', icon: '💳' },
    { id: 'content', label: 'Content Publishing', icon: '📝' },
    { id: 'crm', label: 'CRM Sync', icon: '🔄' }
  ];

  const difficulties = [
    { id: 'all', label: 'All Levels' },
    { id: 'beginner', label: 'Beginner', color: 'green' },
    { id: 'intermediate', label: 'Intermediate', color: 'yellow' },
    { id: 'advanced', label: 'Advanced', color: 'red' }
  ];

  // Demo recipes (replace with database fetch)
  const demoRecipes: AutomationRecipe[] = [
    {
      id: '1',
      title: 'Auto-onboard new coaching clients from Calendly + Stripe',
      description: 'Automatically onboard new clients when they book a call and make payment',
      trigger: 'New Calendly booking + Stripe payment confirmed',
      actions: [
        { step: 1, action: 'Create client record in CRM' },
        { step: 2, action: 'Send welcome email with onboarding checklist' },
        { step: 3, action: 'Add to Notion client database' },
        { step: 4, action: 'Schedule automated follow-up emails' },
        { step: 5, action: 'Send Slack notification to team' }
      ],
      tools: ['Calendly', 'Stripe', 'Make.com', 'Gmail', 'Notion', 'Slack'],
      difficulty: 'intermediate',
      category: 'onboarding',
      estimatedTime: '30 min setup',
      popularity: 95
    },
    {
      id: '2',
      title: 'Send WhatsApp reminders for property visits',
      description: 'Automatically remind clients about upcoming property viewings via WhatsApp',
      trigger: 'Property viewing scheduled in calendar',
      actions: [
        { step: 1, action: 'Send WhatsApp reminder 24h before' },
        { step: 2, action: 'Send WhatsApp reminder 2h before' },
        { step: 3, action: 'Send property details and directions' },
        { step: 4, action: 'Log interaction in CRM' }
      ],
      tools: ['Google Calendar', 'Twilio WhatsApp', 'Make.com', 'CRM'],
      difficulty: 'beginner',
      category: 'follow_up',
      estimatedTime: '20 min setup',
      popularity: 88
    },
    {
      id: '3',
      title: 'Sync Instagram leads to Notion CRM + email follow-up',
      description: 'Capture Instagram DM leads and automatically add to CRM with email sequence',
      trigger: 'New Instagram DM with keyword',
      actions: [
        { step: 1, action: 'Extract lead info from DM' },
        { step: 2, action: 'Create lead in Notion CRM' },
        { step: 3, action: 'Add to email nurture sequence' },
        { step: 4, action: 'Send auto-reply on Instagram' },
        { step: 5, action: 'Notify sales team' }
      ],
      tools: ['Instagram', 'Notion', 'ConvertKit', 'Make.com'],
      difficulty: 'intermediate',
      category: 'lead_gen',
      estimatedTime: '45 min setup',
      popularity: 92
    },
    {
      id: '4',
      title: 'Auto-publish blog to multiple platforms',
      description: 'Publish new blog posts to Medium, Dev.to, and social media automatically',
      trigger: 'New blog post published on website',
      actions: [
        { step: 1, action: 'Cross-post to Medium' },
        { step: 2, action: 'Cross-post to Dev.to' },
        { step: 3, action: 'Share on Twitter with summary' },
        { step: 4, action: 'Share on LinkedIn' },
        { step: 5, action: 'Add to content calendar' }
      ],
      tools: ['WordPress/Ghost', 'Medium API', 'Dev.to API', 'Twitter API', 'LinkedIn API', 'Zapier'],
      difficulty: 'advanced',
      category: 'content',
      estimatedTime: '60 min setup',
      popularity: 78
    },
    {
      id: '5',
      title: 'Abandoned cart recovery sequence',
      description: 'Automatically follow up with customers who abandon their cart',
      trigger: 'Cart abandoned for 1 hour',
      actions: [
        { step: 1, action: 'Send reminder email after 1 hour' },
        { step: 2, action: 'Send discount offer after 24 hours' },
        { step: 3, action: 'Send final reminder after 48 hours' },
        { step: 4, action: 'Remove from sequence if purchase completed' }
      ],
      tools: ['Shopify/WooCommerce', 'Klaviyo', 'Stripe'],
      difficulty: 'beginner',
      category: 'payment',
      estimatedTime: '25 min setup',
      popularity: 90
    },
    {
      id: '6',
      title: 'Sync new customers to CRM and accounting',
      description: 'Keep customer data synchronized across all business tools',
      trigger: 'New customer created in Stripe',
      actions: [
        { step: 1, action: 'Create customer in HubSpot CRM' },
        { step: 2, action: 'Create customer in QuickBooks' },
        { step: 3, action: 'Add to email marketing list' },
        { step: 4, action: 'Send welcome email' }
      ],
      tools: ['Stripe', 'HubSpot', 'QuickBooks', 'Mailchimp', 'Zapier'],
      difficulty: 'intermediate',
      category: 'crm',
      estimatedTime: '35 min setup',
      popularity: 85
    }
  ];

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      if (!supabase) {
        // Use demo data
        setRecipes(demoRecipes);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('automation_recipes')
        .select('*')
        .eq('is_active', true)
        .order('popularity', { ascending: false });

      if (error) throw error;
      setRecipes(data || demoRecipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setRecipes(demoRecipes);
    } finally {
      setLoading(false);
    }
  };

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || recipe.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const handleAskCopilot = (recipe: AutomationRecipe) => {
    addToast(`Opening AI Copilot to help set up: ${recipe.title}`, 'success');
    if (onSelectRecipe) {
      onSelectRecipe(recipe);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'advanced': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-500/10 border border-brand-500/20 rounded-full mb-4">
          <Zap className="text-brand-400" size={20} />
          <span className="text-brand-400 font-medium text-sm">Automation Recipes</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready-Made Automation Recipes
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Pre-built automation templates you can set up in minutes. No coding required.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search recipes..."
            className="w-full bg-dark-card border border-dark-border rounded-xl pl-12 pr-4 py-3 text-white focus:border-brand-500 focus:outline-none"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-brand-500/20 text-brand-400 border border-brand-500/30'
                  : 'bg-dark-card text-gray-400 border border-dark-border hover:border-brand-500/30'
              }`}
            >
              <span className="mr-2">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Difficulty Filter */}
        <div className="flex gap-2">
          <Filter className="text-gray-400 mt-2" size={20} />
          <div className="flex flex-wrap gap-2">
            {difficulties.map(diff => (
              <button
                key={diff.id}
                onClick={() => setSelectedDifficulty(diff.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedDifficulty === diff.id
                    ? 'bg-brand-500/20 text-brand-400 border border-brand-500/30'
                    : 'bg-dark-card text-gray-400 border border-dark-border hover:border-brand-500/30'
                }`}
              >
                {diff.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 text-sm text-gray-400">
        Showing {filteredRecipes.length} of {recipes.length} recipes
      </div>

      {/* Recipes Grid */}
      {loading ? (
        <div className="flex justify-center py-20">
          <LoadingSpinner size="lg" />
        </div>
      ) : filteredRecipes.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 mb-4">No recipes found matching your criteria</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedDifficulty('all');
            }}
            className="px-6 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map(recipe => (
            <div
              key={recipe.id}
              className="bg-dark-card border border-dark-border rounded-xl p-6 hover:border-brand-500/30 transition-all group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-400 transition-colors">
                    {recipe.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-3">{recipe.description}</p>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`text-xs px-2 py-1 rounded border ${getDifficultyColor(recipe.difficulty)}`}>
                  {recipe.difficulty}
                </span>
                <span className="text-xs px-2 py-1 rounded border bg-blue-500/20 text-blue-400 border-blue-500/30 flex items-center gap-1">
                  <Clock size={12} />
                  {recipe.estimatedTime}
                </span>
                <span className="text-xs px-2 py-1 rounded border bg-purple-500/20 text-purple-400 border-purple-500/30 flex items-center gap-1">
                  <TrendingUp size={12} />
                  {recipe.popularity}% popular
                </span>
              </div>

              {/* Trigger */}
              <div className="mb-4 p-3 bg-dark-bg rounded-lg border border-dark-border">
                <p className="text-xs text-gray-500 mb-1">TRIGGER</p>
                <p className="text-sm text-white">{recipe.trigger}</p>
              </div>

              {/* Actions */}
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">ACTIONS ({recipe.actions.length} steps)</p>
                <div className="space-y-1">
                  {recipe.actions.slice(0, 3).map(action => (
                    <div key={action.step} className="flex items-center gap-2 text-xs text-gray-400">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center text-[10px] font-bold">
                        {action.step}
                      </span>
                      <span className="truncate">{action.action}</span>
                    </div>
                  ))}
                  {recipe.actions.length > 3 && (
                    <p className="text-xs text-gray-500 ml-7">+{recipe.actions.length - 3} more steps</p>
                  )}
                </div>
              </div>

              {/* Tools */}
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">REQUIRED TOOLS</p>
                <div className="flex flex-wrap gap-1">
                  {recipe.tools.map((tool, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-white/5 text-gray-400 rounded">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => handleAskCopilot(recipe)}
                className="w-full px-4 py-3 bg-gradient-to-r from-brand-600 to-brand-500 hover:opacity-90 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 group"
              >
                <Sparkles size={18} />
                Ask Copilot to Set This Up
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutomationRecipesLibrary;
