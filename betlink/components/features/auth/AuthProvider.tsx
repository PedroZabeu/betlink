"use client";

import { createContext, useContext, ReactNode } from 'react';

// Placeholder auth context for Feature 1.4
// Will be implemented with full authentication state management

type AuthContextType = {
  user: null;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  signIn: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  // TODO: Feature 1.4 - Implement auth state management
  return (
    <AuthContext.Provider value={{ user: null, loading: false, signIn: async () => {}, signOut: async () => {} }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);