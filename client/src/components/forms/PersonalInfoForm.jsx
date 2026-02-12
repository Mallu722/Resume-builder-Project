
import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Trash2, Plus } from 'lucide-react';

export const PersonalInfoForm = () => {
    const { state, dispatch } = useResume();
    const handleChange = (e) => {
        dispatch({ type: 'UPDATE_PERSONAL_INFO', payload: { [e.target.name]: e.target.value } });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6 border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Personal Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="fullName" placeholder="Full Name" value={state.personalInfo.fullName} onChange={handleChange} className="p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-500 outline-none" />
                <input type="email" name="email" placeholder="Email" value={state.personalInfo.email} onChange={handleChange} className="p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-500 outline-none" />
                <input type="text" name="phone" placeholder="Phone" value={state.personalInfo.phone} onChange={handleChange} className="p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-500 outline-none" />
                <input type="text" name="address" placeholder="Address" value={state.personalInfo.address} onChange={handleChange} className="p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-500 outline-none" />
                <input type="text" name="linkedin" placeholder="LinkedIn URL" value={state.personalInfo.linkedin} onChange={handleChange} className="p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-500 outline-none" />
                <input type="text" name="github" placeholder="GitHub URL" value={state.personalInfo.github} onChange={handleChange} className="p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-500 outline-none" />
                <input type="text" name="website" placeholder="Portfolio Website" value={state.personalInfo.website} onChange={handleChange} className="p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Professional Summary</h3>
                <textarea
                    value={state.summary}
                    onChange={(e) => dispatch({ type: 'UPDATE_SUMMARY', payload: e.target.value })}
                    placeholder="Write a brief professional summary..."
                    className="w-full p-3 border rounded-md h-32 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
            </div>
        </div>
    );
};
