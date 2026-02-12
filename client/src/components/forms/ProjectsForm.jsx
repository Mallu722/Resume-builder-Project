
import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Trash2, Plus, ChevronDown, ChevronUp, ArrowUp, ArrowDown } from 'lucide-react';

export const ProjectsForm = () => {
    const { state, dispatch } = useResume();
    const [expandedIndex, setExpandedIndex] = useState(0);

    const addProject = () => {
        dispatch({
            type: 'ADD_PROJECT',
            payload: { title: '', link: '', description: '', technologies: '' }
        });
        setExpandedIndex(state.projects.length);
    };

    const removeProject = (index) => {
        dispatch({ type: 'REMOVE_PROJECT', payload: index });
    };

    const updateProject = (index, field, value) => {
        const data = { ...state.projects[index], [field]: value };
        dispatch({ type: 'UPDATE_PROJECT', payload: { index, data } });
    };

    const moveProject = (index, direction) => {
        dispatch({ type: 'MOVE_PROJECT', payload: { index, direction } });
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-6 border border-gray-100 dark:border-gray-700 transition-colors">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Projects</h2>
                <button onClick={addProject} className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm">
                    <Plus size={16} className="mr-1" /> Add Project
                </button>
            </div>

            {state.projects.map((proj, index) => (
                <div key={index} className="mb-4 border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                    <div
                        className="bg-gray-50 dark:bg-gray-700 p-3 flex justify-between items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        onClick={() => setExpandedIndex(expandedIndex === index ? -1 : index)}
                    >
                        <span className="font-medium text-gray-700 dark:text-gray-200">{proj.title || '(New Project)'}</span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={(e) => { e.stopPropagation(); moveProject(index, -1); }}
                                disabled={index === 0}
                                className={`p-1 rounded ${index === 0 ? 'text-gray-300 dark:text-gray-600' : 'text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-500'}`}
                            >
                                <ArrowUp size={14} />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); moveProject(index, 1); }}
                                disabled={index === state.projects.length - 1}
                                className={`p-1 rounded ${index === state.projects.length - 1 ? 'text-gray-300 dark:text-gray-600' : 'text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-500'}`}
                            >
                                <ArrowDown size={14} />
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); removeProject(index); }} className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 dark:hover:bg-red-900/30 rounded">
                                <Trash2 size={16} />
                            </button>
                            {expandedIndex === index ? <ChevronUp size={16} className="text-gray-500" /> : <ChevronDown size={16} className="text-gray-500" />}
                        </div>
                    </div>

                    {expandedIndex === index && (
                        <div className="p-4 bg-white dark:bg-gray-800">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <input type="text" placeholder="Project Title" value={proj.title} onChange={(e) => updateProject(index, 'title', e.target.value)} className="p-2 border rounded-md w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                                <input type="text" placeholder="Link (GitHub/Live Demo)" value={proj.link} onChange={(e) => updateProject(index, 'link', e.target.value)} className="p-2 border rounded-md w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                            </div>
                            <input type="text" placeholder="Technologies Used (comma separated)" value={proj.technologies} onChange={(e) => updateProject(index, 'technologies', e.target.value)} className="p-2 border rounded-md w-full mb-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />

                            <textarea
                                placeholder="Project Description"
                                value={proj.description}
                                onChange={(e) => updateProject(index, 'description', e.target.value)}
                                className="p-2 border rounded-md w-full h-24 resize-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                    )}
                </div>
            ))}
            {state.projects.length === 0 && (
                <div className="text-center py-6 text-gray-500 dark:text-gray-400 text-sm">
                    No projects added yet.
                </div>
            )}
        </div>
    );
};
