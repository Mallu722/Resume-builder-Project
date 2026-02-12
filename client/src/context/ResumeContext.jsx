
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const ResumeContext = createContext();

const initialState = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    github: '',
    website: '',
  },
  summary: '',
  education: [],
  workExperience: [],
  skills: [],
  projects: [],
  certifications: [],
  activeTemplate: 'modern', // 'modern', 'professional', 'minimal'
  themeColor: '#2563eb', // blue-600
  darkMode: false,
};

const resumeReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_PERSONAL_INFO':
      return { ...state, personalInfo: { ...state.personalInfo, ...action.payload } };
    case 'UPDATE_SUMMARY':
      return { ...state, summary: action.payload };

    // Educational Actions
    case 'ADD_EDUCATION':
      return { ...state, education: [...state.education, action.payload] };
    case 'REMOVE_EDUCATION':
      return { ...state, education: state.education.filter((_, index) => index !== action.payload) };
    case 'UPDATE_EDUCATION':
      const newEdu = [...state.education];
      newEdu[action.payload.index] = action.payload.data;
      return { ...state, education: newEdu };
    case 'MOVE_EDUCATION':
      {
        const { index, direction } = action.payload; // direction: -1 (up) or 1 (down)
        if (index + direction < 0 || index + direction >= state.education.length) return state;
        const newItems = [...state.education];
        [newItems[index], newItems[index + direction]] = [newItems[index + direction], newItems[index]];
        return { ...state, education: newItems };
      }

    // Work Experience Actions
    case 'ADD_WORK_EXPERIENCE':
      return { ...state, workExperience: [...state.workExperience, action.payload] };
    case 'REMOVE_WORK_EXPERIENCE':
      return { ...state, workExperience: state.workExperience.filter((_, index) => index !== action.payload) };
    case 'UPDATE_WORK_EXPERIENCE':
      const newWork = [...state.workExperience];
      newWork[action.payload.index] = action.payload.data;
      return { ...state, workExperience: newWork };
    case 'MOVE_WORK_EXPERIENCE':
      {
        const { index, direction } = action.payload;
        if (index + direction < 0 || index + direction >= state.workExperience.length) return state;
        const newItems = [...state.workExperience];
        [newItems[index], newItems[index + direction]] = [newItems[index + direction], newItems[index]];
        return { ...state, workExperience: newItems };
      }

    // Skills Actions
    case 'ADD_SKILL':
      return { ...state, skills: [...state.skills, action.payload] };
    case 'REMOVE_SKILL':
      return { ...state, skills: state.skills.filter((_, index) => index !== action.payload) };

    // Project Actions
    case 'ADD_PROJECT':
      return { ...state, projects: [...state.projects, action.payload] };
    case 'REMOVE_PROJECT':
      return { ...state, projects: state.projects.filter((_, index) => index !== action.payload) };
    case 'UPDATE_PROJECT':
      const newProj = [...state.projects];
      newProj[action.payload.index] = action.payload.data;
      return { ...state, projects: newProj };
    case 'MOVE_PROJECT':
      {
        const { index, direction } = action.payload;
        if (index + direction < 0 || index + direction >= state.projects.length) return state;
        const newItems = [...state.projects];
        [newItems[index], newItems[index + direction]] = [newItems[index + direction], newItems[index]];
        return { ...state, projects: newItems };
      }

    // Certification Actions
    case 'ADD_CERTIFICATION':
      return { ...state, certifications: [...state.certifications, action.payload] };
    case 'REMOVE_CERTIFICATION':
      return { ...state, certifications: state.certifications.filter((_, index) => index !== action.payload) };

    // Template Actions
    case 'SET_TEMPLATE':
      return { ...state, activeTemplate: action.payload };
    case 'SET_THEME_COLOR':
      return { ...state, themeColor: action.payload };
    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode };

    // Persistence
    case 'LOAD_DATA':
      return { ...state, ...action.payload };
    case 'RESET_DATA':
      return initialState;

    default:
      return state;
  }
};

export const ResumeProvider = ({ children }) => {
  // Load from local storage on initial render
  const init = () => {
    const saved = localStorage.getItem('resumeData');
    return saved ? JSON.parse(saved) : initialState;
  };

  const [state, dispatch] = useReducer(resumeReducer, initialState, init);

  // Save to local storage whenever state changes
  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(state));
    // Apply dark mode class to html element
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state]);

  return (
    <ResumeContext.Provider value={{ state, dispatch }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
