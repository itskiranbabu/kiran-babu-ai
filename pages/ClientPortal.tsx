
import React from 'react';
import SectionHeader from '../components/SectionHeader';
import FadeIn from '../components/FadeIn';
import SEO from '../components/SEO';
import { CheckCircle, FileText, Download, Clock } from 'lucide-react';

const ClientPortal: React.FC = () => {
  return (
    <div className="pt-16 pb-20 px-4 max-w-5xl mx-auto min-h-screen">
      <SEO title="Client Portal" />
      <FadeIn>
        <SectionHeader title="Client Portal" subtitle="Track your project status, view invoices, and download assets." />
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <div className="bg-dark-card border border-dark-border rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-6">Current Project: Website Redesign</h3>
                <div className="space-y-6">
                    <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center">
                                <CheckCircle size={16} />
                            </div>
                            <div className="w-0.5 h-full bg-green-500/20 my-2"></div>
                        </div>
                        <div className="pb-6">
                            <h4 className="font-bold text-white">Discovery Phase</h4>
                            <p className="text-sm text-gray-400">Completed on Sep 10</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                             <div className="w-8 h-8 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center">
                                <CheckCircle size={16} />
                            </div>
                            <div className="w-0.5 h-full bg-dark-border my-2"></div>
                        </div>
                        <div className="pb-6">
                            <h4 className="font-bold text-white">Design Concepts</h4>
                            <p className="text-sm text-gray-400">Approved on Sep 15</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 bg-brand-600 text-white rounded-full flex items-center justify-center animate-pulse">
                                <Clock size={16} />
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold text-brand-400">Development</h4>
                            <p className="text-sm text-gray-400">In Progress (Estimated completion: Oct 5)</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="space-y-6">
            <div className="bg-dark-card border border-dark-border rounded-xl p-6">
                <h3 className="font-bold text-white mb-4">Files & Assets</h3>
                <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-3 bg-dark-bg rounded-lg border border-dark-border hover:border-brand-500/50 transition-colors">
                        <div className="flex items-center gap-3">
                            <FileText size={18} className="text-brand-400" />
                            <span className="text-sm text-white">Contract.pdf</span>
                        </div>
                        <Download size={16} className="text-gray-500" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 bg-dark-bg rounded-lg border border-dark-border hover:border-brand-500/50 transition-colors">
                        <div className="flex items-center gap-3">
                            <FileText size={18} className="text-brand-400" />
                            <span className="text-sm text-white">Brand_Guidelines.pdf</span>
                        </div>
                        <Download size={16} className="text-gray-500" />
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ClientPortal;
