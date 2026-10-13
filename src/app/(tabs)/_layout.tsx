import React from 'react';
import { Tabs } from 'expo-router';
import { FloatingTabBar } from '@/components/FloatingTabBar';

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <FloatingTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          title: 'Favorite',
        }}
      />
      <Tabs.Screen
        name="add-event"
        options={{
          title: 'Add Event',
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: 'Events',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
        }}
      />
    </Tabs>
  );
}
