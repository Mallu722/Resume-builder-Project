
import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Trash2, Plus, ChevronDown, ChevronUp, ArrowUp, ArrowDown } from 'lucide-react';

export const EducationForm = () => {
    const { state, dispatch } = useResume();
    const [expandedIndex, setExpandedIndex] = useState(0);

    const addEducation = () => {
        dispatch({
            type: 'ADD_EDUCATION',
            payload: { institution: '', degree: '', fieldOfStudy: '', graduationDate: '', location: '' }
        });
        setExpandedIndex(state.education.length);
    };

    const removeEducation = (index) => {
        dispatch({ type: 'REMOVE_EDUCATION', payload: index });
    };

    const updateEducation = (index, field, value) => {
        const data = { ...state.education[index], [field]: value };
        dispatch({ type: 'UPDATE_EDUCATION', payload: { index, data } });
    };

    const moveEducation = (index, direction) => {
        dispatch({ type: 'MOVE_EDUCATION', payload: { index, direction } });
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-6 border border-gray-100 dark:border-gray-700 transition-colors">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Education</h2>
                <button onClick={addEducation} className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm">
                    <Plus size={16} className="mr-1" /> Add Education
                </button>
            </div>

            {state.education.map((edu, index) => (
                <div key={index} className="mb-4 border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                    <div
                        className="bg-gray-50 dark:bg-gray-700 p-3 flex justify-between items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        onClick={() => setExpandedIndex(expandedIndex === index ? -1 : index)}
                    >
                        <span className="font-medium text-gray-700 dark:text-gray-200">{edu.institution || '(New Education)'}</span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={(e) => { e.stopPropagation(); moveEducation(index, -1); }}
                                disabled={index === 0}
                                className={`p-1 rounded ${index === 0 ? 'text-gray-300 dark:text-gray-600' : 'text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-500'}`}
                            >
                                <ArrowUp size={14} />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); moveEducation(index, 1); }}
                                disabled={index === state.education.length - 1}
                                className={`p-1 rounded ${index === state.education.length - 1 ? 'text-gray-300 dark:text-gray-600' : 'text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-500'}`}
                            >
                                <ArrowDown size={14} />
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); removeEducation(index); }} className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 dark:hover:bg-red-900/30 rounded">
                                <Trash2 size={16} />
                            </button>
                            {expandedIndex === index ? <ChevronUp size={16} className="text-gray-500" /> : <ChevronDown size={16} className="text-gray-500" />}
                        </div>
                    </div>

                    {expandedIndex === index && (
                        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white dark:bg-gray-800">
                            <input type="text" placeholder="Institution / School" value={edu.institution} onChange={(e) => updateEducation(index, 'institution', e.target.value)} className="p-2 border rounded-md w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                            <input type="text" placeholder="Degree" value={edu.degree} onChange={(e) => updateEducation(index, 'degree', e.target.value)} className="p-2 border rounded-md w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                            <input type="text" placeholder="Field of Study" value={edu.fieldOfStudy} onChange={(e) => updateEducation(index, 'fieldOfStudy', e.target.value)} className="p-2 border rounded-md w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                            <div className="flex gap-2">
                                <input type="text" placeholder="Graduation Date" value={edu.graduationDate} onChange={(e) => updateEducation(index, 'graduationDate', e.target.value)} className="p-2 border rounded-md w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                                <input type="text" placeholder="Location" value={edu.location} onChange={(e) => updateEducation(index, 'location', e.target.value)} className="p-2 border rounded-md w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                            </div>
                        </div>
                    )}
                </div>
            ))}

            {state.education.length === 0 && (
                <div className="text-center py-6 text-gray-500 dark:text-gray-400 text-sm">
                    No education details added yet.
                </div>
            )}
        </div>
    );
};
