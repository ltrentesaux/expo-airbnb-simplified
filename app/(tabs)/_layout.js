import React from 'react';
import { Tabs } from 'expo-router';
import { Image, View, StyleSheet } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ff385c',
        tabBarInactiveTintColor: '#0022ff',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#ddd',
          elevation: 8,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="explorer"
        options={{
          title: 'Explorer',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../../assets/images/home.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../../assets/images/user.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="sandbox"
        options={{
          title: 'Sandbox',
          href: '(sandbox)',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../../assets/images/search.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: '100%',
    height: 100,
    marginTop: 20,
    marginBottom: 10,
  },
});
