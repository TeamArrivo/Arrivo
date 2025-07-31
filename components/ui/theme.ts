// theme.ts
import { colorScheme } from 'nativewind';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function loadTheme() {
  const value = await AsyncStorage.getItem('theme');
  if (value) colorScheme.set(value as 'light' | 'dark');
}

export async function setAppTheme(theme: 'light' | 'dark') {
  colorScheme.set(theme);
  await AsyncStorage.setItem('theme', theme);
}
