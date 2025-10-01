import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AdminDashboard, ProfileScreen } from '../screens';
import { NAVIGATION_ROUTES } from '../config';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Placeholder screens for admin-specific features
const ContentManagementScreen = () => (
  <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <h2>Content Management - Coming Soon</h2>
    <p>Upload videos, manage training materials</p>
  </div>
);

const UserManagementScreen = () => (
  <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <h2>User Management - Coming Soon</h2>
    <p>Manage users, roles, and permissions</p>
  </div>
);

const AnalyticsScreen = () => (
  <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <h2>Analytics Dashboard - Coming Soon</h2>
    <p>Safety metrics, usage statistics, compliance reports</p>
  </div>
);

const VideosScreen = () => (
  <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <h2>Videos Screen - Coming Soon</h2>
  </div>
);

const AdminTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#FF6B35',
        tabBarInactiveTintColor: '#666',
        headerShown: false,
      }}
    >
      <Tab.Screen
        name={NAVIGATION_ROUTES.ADMIN_DASHBOARD}
        component={AdminDashboard}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color }) => <span style={{ color }}>🏠</span>,
        }}
      />
      <Tab.Screen
        name={NAVIGATION_ROUTES.ANALYTICS}
        component={AnalyticsScreen}
        options={{
          tabBarLabel: 'Analytics',
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

export const AdminNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AdminTabs"
        component={AdminTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NAVIGATION_ROUTES.CONTENT_MANAGEMENT}
        component={ContentManagementScreen}
        options={{
          title: 'Content Management',
          headerStyle: { backgroundColor: '#FF6B35' },
          headerTintColor: '#FFFFFF',
        }}
      />
      <Stack.Screen
        name={NAVIGATION_ROUTES.USER_MANAGEMENT}
        component={UserManagementScreen}
        options={{
          title: 'User Management',
          headerStyle: { backgroundColor: '#FF6B35' },
          headerTintColor: '#FFFFFF',
        }}
      />
    </Stack.Navigator>
  );
};
