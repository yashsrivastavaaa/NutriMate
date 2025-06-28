import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { Tabs } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';

const CustomTabBarButton = (props: any) => (
    <TouchableOpacity
        {...props}
        activeOpacity={1}
        style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}
    />
);

export default function _layout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                headerTitle: '',
                tabBarItemStyle: {
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                tabBarIconStyle: {
                    marginTop: 25,
                    marginBottom: 0,
                },
                tabBarLabelStyle: {
                    fontSize: 10,
                    textAlign: 'center',
                },
                tabBarStyle: {
                    marginBottom: 20,
                    marginHorizontal: 20,
                    borderRadius: 50,
                    height: 60,
                    overflow: 'hidden',
                    position: 'absolute',
                },
                tabBarActiveTintColor: '#FF4D4D',
                tabBarInactiveTintColor: '#000',
                tabBarActiveBackgroundColor: '#fff',
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    tabBarButton: CustomTabBarButton,
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="home" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: 'Explore',
                    tabBarButton: CustomTabBarButton,
                    tabBarIcon: ({ color, size }) => (
                        <SimpleLineIcons name="compass" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="saved"
                options={{
                    title: 'Saved',
                    tabBarButton: CustomTabBarButton,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="bookmark-outline" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarButton: CustomTabBarButton,
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="user" size={24} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
