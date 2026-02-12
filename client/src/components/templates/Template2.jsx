
import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

export const Template2 = ({ data }) => {
    const { personalInfo, summary, education, workExperience, skills, projects } = data;

    return (
        <div className="flex flex-col h-full font-serif text-gray-900 bg-white p-10">
            {/* Header */}
            <header className="border-b-2 border-gray-800 pb-6 mb-6 text-center">
                <h1 className="text-3xl font-bold uppercase tracking-widest mb-3">{personalInfo.fullName || 'YOUR NAME'}</h1>
                <div className="flex justify-center flex-wrap gap-4 text-sm text-gray-600">
                    {personalInfo.email && <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1 hover:text-blue-600 transition-colors">{personalInfo.email}</a>}
                    {personalInfo.phone && <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-1 hover:text-blue-600 transition-colors">| {personalInfo.phone}</a>}
                    {personalInfo.address && <span className="flex items-center gap-1">| {personalInfo.address}</span>}
                </div>
                <div className="flex justify-center flex-wrap gap-4 text-sm text-gray-600 mt-2">
                    {personalInfo.linkedin && <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600 transition-colors">LinkedIn: {personalInfo.linkedin}</a>}
                    {personalInfo.github && <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600 transition-colors">| GitHub: {personalInfo.github}</a>}
                    {personalInfo.website && <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600 transition-colors">| Portfolio: {personalInfo.website}</a>}
                </div>
            </header>

            {/* Summary */}
            {summary && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 pb-1">Professional Profile</h2>
                    <p className="text-sm leading-relaxed text-gray-800 text-justify break-words">{summary}</p>
                </section>
            )}

            {/* Skills */}
            {skills.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 pb-1">Key Skills</h2>
                    <div className="flex flex-wrap gap-3">
                        {skills.map((skill, index) => (
                            <span key={index} className="px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-sm font-medium text-gray-700 shadow-sm break-words">
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>
            )}

            {/* Experience */}
            {workExperience.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 pb-1">Work Experience</h2>
                    <div className="flex flex-col gap-4">
                        {workExperience.map((job, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline font-bold text-md text-gray-800">
                                    <h3 className="break-words">{job.company}</h3>
                                    <span className="text-sm whitespace-nowrap ml-2">{job.startDate} - {job.endDate}</span>
                                </div>
                                <div className="flex justify-between items-center mb-1 text-sm italic text-gray-600">
                                    <span className="break-words">{job.position}</span>
                                    <span className="break-words">{job.location}</span>
                                </div>
                                <p className="text-sm text-gray-800 mt-1 whitespace-pre-line leading-relaxed break-words">{job.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {education.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 pb-1">Education</h2>
                    <div className="flex flex-col gap-2">
                        {education.map((edu, index) => (
                            <div key={index} className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-sm text-gray-800 break-words">{edu.institution}</h3>
                                    <div className="text-sm text-gray-700 break-words">{edu.degree}, {edu.fieldOfStudy}</div>
                                </div>
                                <div className="text-right ml-4 shrink-0">
                                    <div className="text-sm font-bold text-gray-800">{edu.graduationDate}</div>
                                    <div className="text-xs text-gray-600 break-words">{edu.location}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 pb-1">Projects</h2>
                    <div className="flex flex-col gap-3">
                        {projects.map((proj, index) => (
                            <div key={index}>
                                <div className="flex items-baseline gap-2 font-bold text-sm text-gray-800">
                                    <h3 className="break-words">{proj.title}</h3>
                                    {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-xs font-normal text-blue-600 underline hover:text-blue-800 transition-colors break-all">Link</a>}
                                </div>
                                {proj.technologies && <p className="text-xs text-gray-600 italic mb-1 break-words">{proj.technologies}</p>}
                                <p className="text-sm text-gray-800 leading-relaxed break-words">{proj.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

        </div>
    );
};
