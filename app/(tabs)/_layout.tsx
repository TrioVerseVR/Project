import React, { useState } from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import HomeScreen from '@/app/(tabs)/index';
import ProfileScreen from '@/app/(tabs)/DetailedScreen';
import ExploreScreen from '@/app/(tabs)/explore';
import { Card } from 'react-native-elements';
import CardDetailsPage from './CardDetailsPage';

const Tabs = createBottomTabNavigator();

export default function TabLayout() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const colorScheme = useColorScheme();
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarPosition: 'bottom',
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen 
        name="index" 
        component={HomeScreen} 
        options={{ 
          title: 'Home', 
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />, 
          headerShown: false,
        }} 
      /> 
      <Tabs.Screen 
        name="explore" 
        component={ExploreScreen} 
        options={{ 
          title: 'Explore', 
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="magnifyingglass" color={color} />, 
          headerShown: false,
        }} 
      />
      <Tabs.Screen 
        name="DetailedScreen" 
        component={ProfileScreen} 
        options={{ 
          title: 'Profile', 
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.crop.circle" color={color} />, 
          headerShown: false,
        }} 
      />
        <Tabs.Screen 
        name="CardDetailsPage" 
        component={CardDetailsPage} 
        options={{ 
          title: 'details', 
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.crop.circle" color={color} />, 
          headerShown: false,
        }} 
      />
    </Tabs.Navigator>
  );
}