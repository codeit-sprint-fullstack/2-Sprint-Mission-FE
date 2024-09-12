import React, { createContext, useContext, useState } from 'react';

const SortContext = createContext();

export function SortProvider({ children }) {
  const [sortOrder, setSortOrder] = useState('recent');

  return (
    <SortContext.Provider value={{ sortOrder, setSortOrder }}>
      {children}
    </SortContext.Provider>
  );
}

export function useSort() {
  const context = useContext(SortContext);
  if (!context) {
    throw new Error('useSort must be used within a SortProvider');
  }
  return context;
}
