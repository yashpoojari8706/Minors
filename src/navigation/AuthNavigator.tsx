import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen, SplashScreen } from '../screens';
import { NAVIGATION_ROUTES } from '../config';

const Stack = createNativeStackNavigator();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="Splash" 
        component={SplashScreen} 
      />
      <Stack.Screen 
        name={NAVIGATION_ROUTES.LOGIN} 
        component={LoginScreen} 
      />
    </Stack.Navigator>
  );
};
