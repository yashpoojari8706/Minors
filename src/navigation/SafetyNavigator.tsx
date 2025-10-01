import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafetyDashboard, ProfileScreen, ReportHazardScreen } from '../screens';
import { NAVIGATION_ROUTES } from '../config';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Placeholder screens for safety officer-specific features
const SafetyReportsScreen = () => (
  <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <h2>Safety Reports - Coming Soon</h2>
  </div>
);

const SafetyAlertsScreen = () => (
  <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <h2>Safety Alerts - Coming Soon</h2>
  </div>
);

const BroadcastScreen = () => (
  <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <h2>Broadcast Alert - Coming Soon</h2>
  </div>
);

const VideosScreen = () => (
  <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <h2>Videos Screen - Coming Soon</h2>
  </div>
);

const SafetyTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#FF6B35',
        tabBarInactiveTintColor: '#666',
        headerShown: false,
      }}
    >
      <Tab.Screen
        name={NAVIGATION_ROUTES.SAFETY_DASHBOARD}
        component={SafetyDashboard}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color }) => <span style={{ color }}>🏠</span>,
        }}
      />
      <Tab.Screen
        name={NAVIGATION_ROUTES.SAFETY_REPORTS}
        component={SafetyReportsScreen}
        options={{
          tabBarLabel: 'Reports',
          tabBarIcon: ({ color }) => <span style={{ color }}>📊</span>,
        }}
      />
      <Tab.Screen
        name={NAVIGATION_ROUTES.VIDEOS}
        component={VideosScreen}
        options={{
          tabBarLabel: 'Videos',
          tabBarIcon: ({ color }) => <span style={{ color }}>🎥</span>,
        }}
      />
      <Tab.Screen
        name={NAVIGATION_ROUTES.PROFILE}
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => <span style={{ color }}>👤</span>,
        }}
      />
    </Tab.Navigator>
  );
};

export const SafetyNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SafetyTabs"
        component={SafetyTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NAVIGATION_ROUTES.SAFETY_ALERTS}
        component={SafetyAlertsScreen}
        options={{
          title: 'Safety Alerts',
          headerStyle: { backgroundColor: '#FF6B35' },
          headerTintColor: '#FFFFFF',
        }}
      />
      <Stack.Screen
        name={NAVIGATION_ROUTES.BROADCAST}
        component={BroadcastScreen}
        options={{
          title: 'Broadcast Alert',
          headerStyle: { backgroundColor: '#DC3545' },
          headerTintColor: '#FFFFFF',
        }}
      />
      <Stack.Screen
        name={NAVIGATION_ROUTES.REPORT_HAZARD}
        component={ReportHazardScreen}
        options={{
          title: 'Report Hazard',
          headerStyle: { backgroundColor: '#FF6B35' },
          headerTintColor: '#FFFFFF',
        }}
      />
    </Stack.Navigator>
  );
};
