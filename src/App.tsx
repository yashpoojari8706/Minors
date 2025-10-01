import { Assets as NavigationAssets } from '@react-navigation/elements';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { Asset } from 'expo-asset';
import { createURL } from 'expo-linking';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { useColorScheme } from 'react-native';
import { Navigation } from './navigation';

Asset.loadAsync([
  ...NavigationAssets,
  require('./assets/newspaper.png'),
  require('./assets/bell.png'),
]);

SplashScreen.preventAutoHideAsync();

const prefix = createURL('/');

// Custom theme for MineLy
const MinelyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF6B35',
    background: '#F5F7FA',
    card: '#FFFFFF',
    text: '#333333',
    border: '#E0E0E0',
  },
};

const MinelyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#FF6B35',
    background: '#1A1A1A',
    card: '#2D2D2D',
    text: '#FFFFFF',
    border: '#404040',
  },
};

export function App() {
  const colorScheme = useColorScheme();

  const theme = colorScheme === 'dark' ? MinelyDarkTheme : MinelyTheme;

  return (
    <Navigation
      theme={theme}
      linking={{
        enabled: 'auto',
        prefixes: [prefix],
      }}
      onReady={() => {
        SplashScreen.hideAsync();
      }}
    />
  );
}
