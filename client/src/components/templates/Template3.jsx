
import React from 'react';

export const Template3 = ({ data }) => {
    const { personalInfo, summary, education, workExperience, skills, projects } = data;

    return (
        <div className="flex h-full font-sans text-gray-700 bg-white">
            {/* Left Sidebar */}
            <div className="w-[30%] bg-gray-100 p-6 flex flex-col gap-8 border-r border-gray-200">
                {/* Name & Contact */}
                <div className='flex flex-col'>
                    <h1 className="text-2xl font-light text-gray-900 mb-4 leading-tight">{personalInfo.fullName || 'Your Name'}</h1>

                    <div className="flex flex-col gap-2 text-xs text-gray-600">
                        {personalInfo.email && <a href={`mailto:${personalInfo.email}`} className="break-all hover:text-blue-600 transition-colors">{personalInfo.email}</a>}
                        {personalInfo.phone && <a href={`tel:${personalInfo.phone}`} className="hover:text-blue-600 transition-colors">{personalInfo.phone}</a>}
                        {personalInfo.address && <div className="break-words">{personalInfo.address}</div>}
                        {personalInfo.linkedin && <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="break-all text-blue-600 hover:underline">{personalInfo.linkedin}</a>}
                        {personalInfo.github && <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="break-all text-blue-600 hover:underline">{personalInfo.github}</a>}
                        {personalInfo.website && <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="break-all text-blue-600 hover:underline">{personalInfo.website}</a>}
                    </div>
                </div>

                {/* Skills */}
                {skills.length > 0 && (
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, index) => (
                                <span key={index} className="px-2 py-1 bg-white border border-gray-200 rounded-md text-xs font-medium text-gray-600 shadow-sm">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Education</h3>
                        <div className="flex flex-col gap-4">
                            {education.map((edu, index) => (
                                <div key={index}>
                                    <h4 className="font-bold text-sm text-gray-800">{edu.institution}</h4>
                                    <div className="text-xs text-gray-600">{edu.degree}</div>
                                    <div className="text-xs text-gray-500 italic mb-1">{edu.fieldOfStudy}</div>
                                    <div className="text-xs text-gray-400">{edu.graduationDate}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Right Content */}
            <div className="w-[70%] p-8 flex flex-col gap-8">

                {summary && (
                    <section>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-3">Profile</h3>
                        <p className="text-sm leading-relaxed text-gray-600 break-words">{summary}</p>
                    </section>
                )}

                {workExperience.length > 0 && (
                    <section>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-4">Experience</h3>
                        <div className="flex flex-col gap-6">
                            {workExperience.map((job, index) => (
                                <div key={index} className="relative pl-4 border-l-2 border-gray-100">
                                    <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-blue-400"></div>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className="font-bold text-md text-gray-900 break-words">{job.position}</h4>
                                        <span className="text-xs text-gray-400 font-medium whitespace-nowrap ml-2">{job.startDate} - {job.endDate}</span>
                                    </div>
                                    <div className="text-sm text-gray-500 italic mb-2 break-words">{job.company} | {job.location}</div>
                                    <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed break-words">{job.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {projects.length > 0 && (
                    <section>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-4">Projects</h3>
                        <div className="grid grid-cols-1 gap-4">
                            {projects.map((proj, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className="font-bold text-sm text-gray-900 break-words">{proj.title}</h4>
                                        {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline hover:text-blue-700 transition-colors ml-2 break-all">View Project</a>}
                                    </div>
                                    {proj.technologies && <p className="text-xs text-gray-400 mb-1 break-words">{proj.technologies}</p>}
                                    <p className="text-sm text-gray-600 leading-snug break-words">{proj.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};
