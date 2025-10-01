import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { WorkerDashboard, ProfileScreen, ReportHazardScreen, VideoScreen } from '../screens';
import { NAVIGATION_ROUTES } from '../config';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Placeholder screens for tabs
const VideosScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Videos Screen - Coming Soon</Text>
  </View>
);

const ReportsScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Reports Screen - Coming Soon</Text>
  </View>
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
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name={NAVIGATION_ROUTES.VIDEOS}
        component={VideoScreen}
        options={{
          tabBarLabel: 'Videos',
          tabBarIcon: ({ color, size }) => <Ionicons name="play-circle" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name={NAVIGATION_ROUTES.REPORTS}
        component={ReportsScreen}
        options={{
          tabBarLabel: 'Reports',
          tabBarIcon: ({ color, size }) => <Ionicons name="bar-chart" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name={NAVIGATION_ROUTES.PROFILE}
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
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
