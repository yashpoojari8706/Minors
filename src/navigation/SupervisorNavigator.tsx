import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SupervisorDashboard, ProfileScreen, ReportHazardScreen } from '../screens';
import { NAVIGATION_ROUTES } from '../config';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Placeholder screens for supervisor-specific features
const TeamChecklistsScreen = () => (
  <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <h2>Team Checklists - Coming Soon</h2>
  </div>
);

const HazardReviewsScreen = () => (
  <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <h2>Hazard Reviews - Coming Soon</h2>
  </div>
);

const VideosScreen = () => (
  <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <h2>Videos Screen - Coming Soon</h2>
  </div>
);

const SupervisorTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#FF6B35',
        tabBarInactiveTintColor: '#666',
        headerShown: false,
      }}
    >
      <Tab.Screen
        name={NAVIGATION_ROUTES.SUPERVISOR_DASHBOARD}
        component={SupervisorDashboard}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color }) => <span style={{ color }}>🏠</span>,
        }}
      />
      <Tab.Screen
        name={NAVIGATION_ROUTES.TEAM_CHECKLISTS}
        component={TeamChecklistsScreen}
        options={{
          tabBarLabel: 'Team',
          tabBarIcon: ({ color }) => <span style={{ color }}>👥</span>,
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

export const SupervisorNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SupervisorTabs"
        component={SupervisorTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NAVIGATION_ROUTES.HAZARD_REVIEWS}
        component={HazardReviewsScreen}
        options={{
          title: 'Hazard Reviews',
          headerStyle: { backgroundColor: '#FF6B35' },
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
