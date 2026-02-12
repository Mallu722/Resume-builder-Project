
import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Template1 } from '../templates/Template1';
import { Template2 } from '../templates/Template2';
import { Template3 } from '../templates/Template3';

export const ResumePreview = () => {
    const { state } = useResume();

    const renderTemplate = () => {
        switch (state.activeTemplate) {
            case 'modern':
                return <Template1 data={state} />;
            case 'professional':
                return <Template2 data={state} />;
            case 'minimal':
                return <Template3 data={state} />;
            default:
                return <Template1 data={state} />;
        }
    };

    return (
        <div className="h-full w-full bg-slate-100 overflow-auto p-4 md:p-8 flex justify-center items-start shadow-inner">
            <div
                id="resume-preview"
                className="bg-white shadow-2xl w-[210mm] min-h-[297mm] origin-top scale-50 md:scale-75 lg:scale-90 xl:scale-100 transition-transform duration-300 ease-in-out"
                style={{ width: '210mm', minHeight: '297mm' }} // A4 dimensions
            >
                {renderTemplate()}
            </div>
        </div>
    );
};
