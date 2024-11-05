import { getUser } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext({ user: null });

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
