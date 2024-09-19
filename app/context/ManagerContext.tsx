import React from 'react';
import { createContext, useContext, ReactNode } from 'react';

interface Manager {
  id: string;
  name: string;
  email: string;
  // Добавьте другие поля, если необходимо
}

interface ManagerContextType {
  manager: Manager | null;
}

const ManagerContext = createContext<ManagerContextType | undefined>(undefined);

export const useManager = () => {
  const context = useContext(ManagerContext);
  if (context === undefined) {
    throw new Error('useManager must be used within a ManagerProvider');
  }
};

export const ManagerProvider: React.FC<{ children: ReactNode; manager: Manager | null }> = ({ children, manager }) => {
  return (
    <ManagerContext.Provider value={{ manager }}>
      {children}
    </ManagerContext.Provider>
  );
};
