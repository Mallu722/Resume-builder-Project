
import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Trash2, Plus, X } from 'lucide-react';

export const SkillsForm = () => {
    const { state, dispatch } = useResume();
    const [newSkill, setNewSkill] = React.useState('');

    const addSkill = (e) => {
        e.preventDefault();
        if (newSkill.trim()) {
            dispatch({ type: 'ADD_SKILL', payload: newSkill.trim() });
            setNewSkill('');
        }
    };

    const removeSkill = (index) => {
        dispatch({ type: 'REMOVE_SKILL', payload: index });
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-6 border border-gray-100 dark:border-gray-700 transition-colors">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Skills</h2>
            <form onSubmit={addSkill} className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill (e.g. React, Python)"
                    className="p-2 border rounded-md w-full focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    Add
                </button>
            </form>

            <div className="flex flex-wrap gap-2">
                {state.skills.map((skill, index) => (
                    <div key={index} className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full flex items-center text-sm font-medium">
                        {skill}
                        <button onClick={() => removeSkill(index)} className="ml-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400">
                            <X size={14} />
                        </button>
                    </div>
                ))}
                {state.skills.length === 0 && <p className="text-gray-400 dark:text-gray-500 text-sm italic">No skills added yet.</p>}
            </div>
        </div>
    );
};
