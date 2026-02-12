
import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

export const Template1 = ({ data }) => {
    const { personalInfo, summary, education, workExperience, skills, projects } = data;

    return (
        <div className="flex flex-col h-full font-sans text-gray-800">
            {/* Header */}
            <header className="bg-slate-800 text-white p-8">
                <h1 className="text-4xl font-bold uppercase tracking-wider mb-2">{personalInfo.fullName || 'Your Name'}</h1>
                <div className="flex flex-wrap gap-4 text-sm text-slate-300 mt-4">
                    {personalInfo.email && <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1 hover:text-blue-400 transition-colors"><Mail size={14} /> {personalInfo.email}</a>}
                    {personalInfo.phone && <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-1 hover:text-blue-400 transition-colors"><Phone size={14} /> {personalInfo.phone}</a>}
                    {personalInfo.address && <div className="flex items-center gap-1"><MapPin size={14} /> {personalInfo.address}</div>}
                    {personalInfo.linkedin && <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-400 transition-colors"><Linkedin size={14} /> LinkedIn</a>}
                    {personalInfo.github && <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-400 transition-colors"><Github size={14} /> GitHub</a>}
                    {personalInfo.website && <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-400 transition-colors"><Globe size={14} /> Portfolio</a>}
                </div>
            </header>

            <div className="grid grid-cols-12 gap-8 p-8 flex-1">
                {/* Main Column */}
                <div className="col-span-8 flex flex-col gap-6">
                    {summary && (
                        <section>
                            <h2 className="text-lg font-bold uppercase tracking-widest border-b-2 border-slate-800 mb-3 pb-1">Professional Summary</h2>
                            <p className="text-sm leading-relaxed text-gray-700 break-words">{summary}</p>
                        </section>
                    )}

                    {workExperience.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold uppercase tracking-widest border-b-2 border-slate-800 mb-4 pb-1">Experience</h2>
                            <div className="flex flex-col gap-4">
                                {workExperience.map((job, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-md text-slate-800 break-words">{job.position}</h3>
                                            <span className="text-xs text-slate-500 font-medium whitespace-nowrap ml-2">{job.startDate} - {job.endDate}</span>
                                        </div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm font-semibold text-slate-600 italic break-words">{job.company}</span>
                                            <span className="text-xs text-slate-400 break-words">{job.location}</span>
                                        </div>
                                        <p className="text-sm text-gray-700 whitespace-pre-line leading-snug break-words">{job.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {projects.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold uppercase tracking-widest border-b-2 border-slate-800 mb-4 pb-1">Projects</h2>
                            <div className="flex flex-col gap-4">
                                {projects.map((proj, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-md text-slate-800 break-words">{proj.title}</h3>
                                            {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline hover:text-blue-300 transition-colors ml-2 break-all">{proj.link}</a>}
                                        </div>
                                        {proj.technologies && <p className="text-xs text-slate-500 mb-1 break-words"><strong>Tech:</strong> {proj.technologies}</p>}
                                        <p className="text-sm text-gray-700 leading-snug break-words">{proj.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar Column */}
                <div className="col-span-4 flex flex-col gap-6">
                    {education.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold uppercase tracking-widest border-b-2 border-slate-800 mb-4 pb-1">Education</h2>
                            <div className="flex flex-col gap-4">
                                {education.map((edu, index) => (
                                    <div key={index}>
                                        <h3 className="font-bold text-sm text-slate-800 break-words">{edu.institution}</h3>
                                        <div className="text-sm text-slate-600 break-words">{edu.degree}</div>
                                        <div className="text-xs text-slate-500 italic break-words">{edu.fieldOfStudy}</div>
                                        <div className="flex flex-col mt-1 gap-1">
                                            <span className="text-xs text-slate-500">{edu.graduationDate}</span>
                                            <span className="text-xs text-slate-500 break-words">{edu.location}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {skills.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold uppercase tracking-widest border-b-2 border-slate-800 mb-4 pb-1">Skills</h2>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, index) => (
                                    <span key={index} className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-xs font-semibold text-slate-700 shadow-sm break-words">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};
