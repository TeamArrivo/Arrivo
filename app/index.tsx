


// app/index.tsx
import { Redirect } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';
import { loadTheme } from '@/components/ui/theme';

export default function IndexEntry() {
  const { isLoading, token, role } = useAuth();
    useEffect(() => {
    loadTheme();
  }, []);

  if (isLoading) return null;

  if (!token) {
    return <Redirect href="/(auth)/welcome" />;
  }

  return 
   
     <Redirect href="/(root)/(tabs)/home" />;
}
