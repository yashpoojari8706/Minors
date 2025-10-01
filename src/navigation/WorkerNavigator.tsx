import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WorkerDashboard, ProfileScreen, ReportHazardScreen } from '../screens';
import { NAVIGATION_ROUTES } from '../config';
import { useAuthMock } from '../hooks';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Placeholder screens for tabs
const VideosScreen = () => (
  <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <h2>Videos Screen - Coming Soon</h2>
  </div>
);

const ReportsScreen = () => (
  <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <h2>Reports Screen - Coming Soon</h2>
  </div>
);

const WorkerTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#FF6B35',
        tabBarInactiveTintColor: '#666',
        headerShown: false,
      }}
    >
      <Tab.Screen
        name={NAVIGATION_ROUTES.WORKER_DASHBOARD}
        component={WorkerDashboard}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color }) => <span style={{ color }}>🏠</span>,
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
        name={NAVIGATION_ROUTES.REPORTS}
        component={ReportsScreen}
        options={{
          tabBarLabel: 'Reports',
          tabBarIcon: ({ color }) => <span style={{ color }}>📊</span>,
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

export const WorkerNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WorkerTabs"
        component={WorkerTabNavigator}
        options={{ headerShown: false }}
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
