
import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Trash2, Plus, ChevronDown, ChevronUp, ArrowUp, ArrowDown } from 'lucide-react';

export const ExperienceForm = () => {
    const { state, dispatch } = useResume();
    const [expandedIndex, setExpandedIndex] = useState(0);

    const addExperience = () => {
        dispatch({
            type: 'ADD_WORK_EXPERIENCE',
            payload: { company: '', position: '', startDate: '', endDate: '', description: '', location: '' }
        });
        setExpandedIndex(state.workExperience.length);
    };

    const removeExperience = (index) => {
        dispatch({ type: 'REMOVE_WORK_EXPERIENCE', payload: index });
    };

    const updateExperience = (index, field, value) => {
        const data = { ...state.workExperience[index], [field]: value };
        dispatch({ type: 'UPDATE_WORK_EXPERIENCE', payload: { index, data } });
    };

    const moveExperience = (index, direction) => {
        dispatch({ type: 'MOVE_WORK_EXPERIENCE', payload: { index, direction } });
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-6 border border-gray-100 dark:border-gray-700 transition-colors">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Work Experience</h2>
                <button onClick={addExperience} className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm">
                    <Plus size={16} className="mr-1" /> Add Experience
                </button>
            </div>

            {state.workExperience.map((exp, index) => (
                <div key={index} className="mb-4 border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                    <div
                        className="bg-gray-50 dark:bg-gray-700 p-3 flex justify-between items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        onClick={() => setExpandedIndex(expandedIndex === index ? -1 : index)}
                    >
                        <span className="font-medium text-gray-700 dark:text-gray-200">{exp.company || '(New Position)'}</span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={(e) => { e.stopPropagation(); moveExperience(index, -1); }}
                                disabled={index === 0}
                                className={`p-1 rounded ${index === 0 ? 'text-gray-300 dark:text-gray-600' : 'text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-500'}`}
                            >
                                <ArrowUp size={14} />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); moveExperience(index, 1); }}
                                disabled={index === state.workExperience.length - 1}
                                className={`p-1 rounded ${index === state.workExperience.length - 1 ? 'text-gray-300 dark:text-gray-600' : 'text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-500'}`}
                            >
                                <ArrowDown size={14} />
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); removeExperience(index); }} className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 dark:hover:bg-red-900/30 rounded">
                                <Trash2 size={16} />
                            </button>
                            {expandedIndex === index ? <ChevronUp size={16} className="text-gray-500" /> : <ChevronDown size={16} className="text-gray-500" />}
                        </div>
                    </div>

                    {expandedIndex === index && (
                        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white dark:bg-gray-800">
                            <input type="text" placeholder="Company Name" value={exp.company} onChange={(e) => updateExperience(index, 'company', e.target.value)} className="p-2 border rounded-md w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                            <input type="text" placeholder="Job Title" value={exp.position} onChange={(e) => updateExperience(index, 'position', e.target.value)} className="p-2 border rounded-md w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                            <input type="text" placeholder="Location" value={exp.location} onChange={(e) => updateExperience(index, 'location', e.target.value)} className="p-2 border rounded-md w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                            <div className="flex gap-2">
                                <input type="text" placeholder="Start Date" value={exp.startDate} onChange={(e) => updateExperience(index, 'startDate', e.target.value)} className="p-2 border rounded-md w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                                <input type="text" placeholder="End Date" value={exp.endDate} onChange={(e) => updateExperience(index, 'endDate', e.target.value)} className="p-2 border rounded-md w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                            </div>
                            <textarea
                                placeholder="Job Description / Achievements"
                                value={exp.description}
                                onChange={(e) => updateExperience(index, 'description', e.target.value)}
                                className="p-2 border rounded-md w-full md:col-span-2 h-24 resize-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                    )}
                </div>
            ))}

            {state.workExperience.length === 0 && (
                <div className="text-center py-6 text-gray-500 dark:text-gray-400 text-sm">
                    No experience added yet. Click "+ Add Experience" to get started.
                </div>
            )}
        </div>
    );
};
