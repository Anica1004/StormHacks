import React, { useState, useEffect, useContext } from 'react';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons, AntDesign, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesome6 } from '@expo/vector-icons';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';



const Main = ({ navigation }: any) => {

    const colorScheme = useColorScheme();
    return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="chorelists"
          options={{
            title: 'Chores',
            tabBarIcon: ({ color, focused }) => (
              <FontAwesome5 name="tasks" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="mychores"
          options={{
            title: 'My Chores',
            tabBarIcon: ({ color, focused }) => (
              <FontAwesome5 name="user-alt" size={24} color={color} />
            ),
          }}
        />

<Tabs.Screen
          name="whisper"
          options={{
            title: 'Whisper',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name="logo-snapchat" size={24} color={color} />
            ),
          }}
        />

<Tabs.Screen
          name="createChore"
          options={{
            title: 'Create Chore',
            tabBarIcon: ({ color, focused }) => (
              <MaterialIcons name="add-task" size={24} color={color} />
            ),
          }}
        />


  
      </Tabs>
    );
  }
  export default Main;