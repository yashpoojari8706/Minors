import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthMock } from '../hooks';
import { AuthNavigator } from './AuthNavigator';
import { RoleBasedNavigator } from './RoleBasedNavigator';
import { trackScreenView } from '../utils/analytics';

const Stack = createNativeStackNavigator();

interface AppNavigatorProps {
  theme?: any;
  linking?: any;
  onReady?: () => void;
}

export const AppNavigator: React.FC<AppNavigatorProps> = ({ 
  theme, 
  linking, 
  onReady 
}) => {
  const authData = useAuthMock();
  const { isAuthenticated, isLoading, user } = authData;
  const [forceUpdate, setForceUpdate] = useState(0);
  
  console.log('AppNavigator render - isAuthenticated:', isAuthenticated, 'isLoading:', isLoading, 'user:', user?.name);
  
  useEffect(() => {
    console.log('AppNavigator useEffect - Auth state changed:', { isAuthenticated, isLoading, user: user?.name });
    // Force a re-render when auth state changes
    setForceUpdate(prev => prev + 1);
  }, [isAuthenticated, isLoading, user]);

  const handleNavigationStateChange = (state: any) => {
    // Track screen views automatically
    if (state) {
      const currentRoute = getCurrentRouteName(state);
      if (currentRoute) {
        trackScreenView(currentRoute);
      }
    }
  };

  const getCurrentRouteName = (state: any): string | undefined => {
    if (!state || typeof state.index !== 'number') {
      return undefined;
    }

    const route = state.routes[state.index];
    
    if (route.state) {
      return getCurrentRouteName(route.state);
    }

    return route.name;
  };

  if (isLoading) {
    // Show splash screen while checking auth status
    return null;
  }

  return (
    <NavigationContainer
      theme={theme}
      linking={linking}
      onReady={onReady}
      onStateChange={handleNavigationStateChange}
    >
      <Stack.Navigator 
        screenOptions={{ headerShown: false }}
        initialRouteName={isAuthenticated ? "Main" : "Auth"}
      >
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen name="Main" component={RoleBasedNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
