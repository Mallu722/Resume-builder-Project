
import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Wand2, Download, CheckCircle2 } from 'lucide-react';

export const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white text-gray-800">
            <nav className="p-6 max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center gap-2 text-2xl font-bold text-blue-600">
                    <FileText />
                    <span>ResumeAI</span>
                </div>
                <Link to="/builder" className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition">
                    Create My Resume
                </Link>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 space-y-6">
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-gray-900">
                        Build a <span className="text-blue-600">Professional</span> Resume in Minutes
                    </h1>
                    <p className="text-xl text-gray-600 max-w-lg">
                        Create a modern, polished resume that stands out. Free to use, no signup required, and ATS-friendly.
                    </p>
                    <div className="flex gap-4 pt-4">
                        <Link to="/builder" className="px-8 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2">
                            <Wand2 size={20} />
                            Start Building
                        </Link>
                        <button className="px-8 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-all">
                            View Templates
                        </button>
                    </div>
                    <div className="pt-8 flex gap-8 text-sm font-medium text-gray-500">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 size={18} className="text-green-500" />
                            <span>Free PDF Download</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 size={18} className="text-green-500" />
                            <span>Real-time Preview</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 size={18} className="text-green-500" />
                            <span>No Signup Needed</span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 relative">
                    <div className="absolute top-0 right-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                    <div className="absolute top-0 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                    <div className="relative bg-white p-2 rounded-xl shadow-2xl border border-gray-100 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                        {/* Visual Mockup of a Resume */}
                        <div className="w-full aspect-[210/297] bg-gray-50 rounded-lg overflow-hidden border border-gray-100 flex flex-col opacity-90">
                            <div className="h-24 bg-slate-800 w-full mb-4"></div>
                            <div className="px-6 space-y-3">
                                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                                <div className="h-2 bg-gray-200 rounded w-1/2 mb-6"></div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="col-span-2 space-y-2">
                                        <div className="h-2 bg-gray-200 rounded w-full"></div>
                                        <div className="h-2 bg-gray-200 rounded w-full"></div>
                                        <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                                        <div className="h-20 bg-gray-100 rounded w-full mt-4"></div>
                                        <div className="h-20 bg-gray-100 rounded w-full mt-2"></div>
                                    </div>
                                    <div className="col-span-1 space-y-2">
                                        <div className="h-2 bg-gray-200 rounded w-full"></div>
                                        <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                                        <div className="h-32 bg-gray-100 rounded w-full mt-4"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
