// contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';

type Role = 'rider' | 'driver';

interface AuthContextType {
  isLoading: boolean;
  token: string | null;
  role: Role | null;
  signIn: (token: string, role: Role) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const t = await SecureStore.getItemAsync('token');
      const r = (await SecureStore.getItemAsync('role')) as Role | null;
      setToken(t);
      setRole(r);
      setLoading(false);
    })();
  }, []);

  const signIn = async (token: string, r: Role) => {
    await SecureStore.setItemAsync('token', token);

    await SecureStore.setItemAsync('role', r);
    setToken(token);
    setRole(r);
    router.replace( '/(root)/(tabs)/home');
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync('token');
    await SecureStore.deleteItemAsync('role');
    setToken(null);
    setRole(null);
    router.replace('/(auth)/welcome');
  };

  return (
    <AuthContext.Provider value={{ isLoading, token, role, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
