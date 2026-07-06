'use client';

import { useState, useEffect } from 'react';
import resumeData from '@/data/resume.json';

const STORAGE_KEY = 'selected_resume_role';
const DEFAULT_ROLE = 'mern'; // Default variant if none is selected

export const useResume = () => {
  const [resumeUrl, setResumeUrl] = useState<string>('');

  useEffect(() => {
    // 1. Check URL hash (e.g., #mobile)
    const hash = window.location.hash.replace('#', '');
    let selectedId = '';

    const validRoles = resumeData.map(r => r.id);
    
    if (validRoles.includes(hash)) {
      selectedId = hash;
      // Store in session storage
      sessionStorage.setItem(STORAGE_KEY, selectedId);
      // Immediately clean the URL to hide the key
      window.history.replaceState(null, '', window.location.pathname);
    } else {
      // 2. Fallback to session storage
      selectedId = sessionStorage.getItem(STORAGE_KEY) || DEFAULT_ROLE;
    }

    // 3. Find the URL for the selected ID
    const resume = resumeData.find(r => r.id === selectedId) || resumeData[0];
    setResumeUrl(resume.url);
  }, []);

  return { resumeUrl };
};
