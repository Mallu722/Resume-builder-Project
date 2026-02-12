
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PersonalInfoForm } from '../components/forms/PersonalInfoForm';
import { ExperienceForm } from '../components/forms/ExperienceForm';
import { EducationForm } from '../components/forms/EducationForm';
import { SkillsForm } from '../components/forms/SkillsForm';
import { ProjectsForm } from '../components/forms/ProjectsForm';
import { ResumePreview } from '../components/preview/ResumePreview';
import { useResume } from '../context/ResumeContext';
import { useAuth } from '../context/AuthContext';
import { Download, LayoutTemplate, FileText, Moon, Sun, LogOut } from 'lucide-react';
import html2pdf from 'html2pdf.js';

export const Builder = () => {
    const { state, dispatch } = useResume();
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [showTemplates, setShowTemplates] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = async () => {
        if (!user) {
            alert("Please login to download your resume.");
            navigate('/login');
            return;
        }

        setIsDownloading(true);
        try {
            // 1. Get the element
            const element = document.getElementById('resume-preview');
            if (!element) throw new Error('Resume element not found. Please try refreshing the page.');

            // 2. Clone the element
            const clone = element.cloneNode(true);

            // 3. Reset styles on the clone
            clone.style.transform = 'none';
            clone.style.margin = '0 auto';
            clone.style.width = '210mm';
            clone.style.minHeight = '297mm';
            clone.style.height = 'auto';
            clone.style.display = 'block';
            clone.style.visibility = 'visible';
            clone.classList.remove('scale-50', 'md:scale-75', 'lg:scale-90', 'xl:scale-100');

            // 4. Create container
            const container = document.createElement('div');
            container.style.position = 'absolute';
            container.style.top = '-9999px';
            container.style.left = '-9999px';
            container.style.width = '210mm';
            container.appendChild(clone);
            document.body.appendChild(container);

            // --- COLOR FIX START ---
            // Helper to convert oklch to rgb/hex using canvas
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Function to sanitize colors
            const sanitizeColor = (colorStr) => {
                if (!colorStr) return null;
                // If it's already safe, return as is
                if (!colorStr.includes('oklch') && !colorStr.startsWith('var(')) return null;

                try {
                    ctx.fillStyle = colorStr;
                    let computed = ctx.fillStyle;

                    // If the browser returned oklch back, or didn't understand it (empty), fallback to safe color
                    if (!computed || computed.includes('oklch')) {
                        // Fallback strategy: 
                        // If it looks like a dark color (text), go black. If light (bg), go white? 
                        // Hard to know without parsing. 
                        // SAFE FALLBACK: If it's a border/text, assume dark gray. If bg, assume transparent or white.
                        // For now, let's try to return a standard color to prevent crash.
                        return '#333333';
                    }
                    return computed;
                } catch (e) {
                    return '#000000'; // Ultimate fallback
                }
            };

            // Traverse and convert colors
            const allElements = clone.querySelectorAll('*');
            [clone, ...allElements].forEach(el => {
                try {
                    const style = window.getComputedStyle(el);
                    const props = ['color', 'backgroundColor', 'borderColor', 'outlineColor'];

                    props.forEach(prop => {
                        const val = style[prop];
                        if (val && (val.includes('oklch') || val.startsWith('var(--alpha'))) {
                            const safeColor = sanitizeColor(val);
                            if (safeColor) {
                                el.style.setProperty(prop, safeColor, 'important');
                            }
                        }
                    });
                } catch (err) {
                    // Ignore element error to keep going
                }
            });
            // --- COLOR FIX END ---

            // 5. Generate PDF
            const opt = {
                margin: 0,
                filename: `${state.personalInfo.fullName.replace(/\s+/g, '_') || 'My'}_Resume.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true, logging: false },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

            await html2pdf().set(opt).from(clone).save();

            // 6. Cleanup
            document.body.removeChild(container);

        } catch (err) {
            console.error('PDF generation failed:', err);
            alert(`Download failed: ${err.message || err}`);
        } finally {
            setIsDownloading(false);
        }
    };

    const templates = [
        { id: 'modern', name: 'Modern', icon: 'M' },
        { id: 'professional', name: 'Professional', icon: 'P' },
        { id: 'minimal', name: 'Minimal', icon: 'S' },
    ];

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col transition-colors duration-300">
            {/* Toolbar */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
                <Link to="/" className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                    <FileText className="text-blue-600 dark:text-blue-400" />
                    <span>ResumeBuilder</span>
                </Link>
                <div className="flex gap-4 relative items-center">

                    {/* User Info / Login */}
                    {user ? (
                        <div className="flex items-center gap-3 mr-2 border-r border-gray-200 dark:border-gray-700 pr-4">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-200 hidden md:block">
                                Hi, {user.username}
                            </span>
                            <button
                                onClick={logout}
                                className="p-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                                title="Logout"
                            >
                                <LogOut size={18} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3 mr-2 border-r border-gray-200 dark:border-gray-700 pr-4">
                            <Link to="/login" className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
                                Login
                            </Link>
                            <Link to="/signup" className="text-sm font-medium text-white bg-blue-600 px-3 py-1.5 rounded-md hover:bg-blue-700 transition-colors">
                                Sign Up
                            </Link>
                        </div>
                    )}

                    <button
                        onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-yellow-300 transition-colors"
                        title={state.darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    >
                        {state.darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    {/* Template Switcher */}
                    <div className="relative">
                        <button
                            onClick={() => setShowTemplates(!showTemplates)}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors"
                        >
                            <LayoutTemplate size={18} />
                            <span className="hidden md:inline">Template: <span className="font-semibold capitalize text-blue-600 dark:text-blue-400">{state.activeTemplate}</span></span>
                        </button>

                        {showTemplates && (
                            <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 py-1 z-20">
                                {templates.map(t => (
                                    <button
                                        key={t.id}
                                        onClick={() => { dispatch({ type: 'SET_TEMPLATE', payload: t.id }); setShowTemplates(false); }}
                                        className={`w-full text-left px-4 py-3 text-sm hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-3 ${state.activeTemplate === t.id ? 'bg-blue-50 dark:bg-gray-700 text-blue-700 dark:text-blue-400 font-semibold' : 'text-gray-700 dark:text-gray-300'}`}
                                    >
                                        <div className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold border ${state.activeTemplate === t.id ? 'border-blue-200 bg-white' : 'border-gray-200 bg-gray-50 text-gray-500'}`}>{t.icon}</div>
                                        {t.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleDownload}
                        disabled={isDownloading}
                        className={`flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:shadow-lg transition-all transform hover:-translate-y-0.5 ${isDownloading ? 'opacity-75 cursor-wait' : 'hover:bg-blue-700'}`}
                    >
                        {isDownloading ? (
                            <>
                                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                                <span className="hidden md:inline">Generating...</span>
                            </>
                        ) : (
                            <>
                                <Download size={18} />
                                <span className="hidden md:inline">Download PDF</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 overflow-hidden h-[calc(100vh-73px)]">
                {/* Scrollable Form Section */}
                <div className="w-full lg:w-1/2 p-6 overflow-y-auto custom-scrollbar">
                    <div className="max-w-2xl mx-auto flex flex-col gap-6 pb-20">
                        <PersonalInfoForm />
                        <EducationForm />
                        <ExperienceForm />
                        <SkillsForm />
                        <ProjectsForm />
                    </div>
                </div>

                {/* Fixed Preview Section (Hidden on mobile) */}
                <div className="hidden lg:flex w-1/2 bg-gray-800 overflow-hidden relative justify-center items-start pt-8">
                    <div id="resume-preview-content" className="resume-scale shadow-2xl bg-white origin-top">
                        <ResumePreview />
                    </div>
                </div>
            </div>
        </div>
    );
};
