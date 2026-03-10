import React, { createContext, useContext, useEffect, useState } from 'react';

type PrivacyContextType = {
  privacyMode: boolean;
  togglePrivacy: () => void;
};

const PrivacyContext = createContext<PrivacyContextType | undefined>(undefined);

export function PrivacyProvider({ children }: { children: React.ReactNode }) {
  const [privacyMode, setPrivacyMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('privacy_mode');
    if (stored === 'true') {
      setPrivacyMode(true);
    }
  }, []);

  const togglePrivacy = () => {
    setPrivacyMode((prev) => {
      const next = !prev;
      localStorage.setItem('privacy_mode', String(next));
      return next;
    });
  };

  return (
    <PrivacyContext.Provider value={{ privacyMode, togglePrivacy }}>
      {children}
    </PrivacyContext.Provider>
  );
}

export function usePrivacy() {
  const context = useContext(PrivacyContext);
  if (context === undefined) {
    throw new Error('usePrivacy must be used within a PrivacyProvider');
  }
  return context;
}
