import AntDesign from '@expo/vector-icons/AntDesign';
import { Tabs } from 'expo-router';
import React from 'react';

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
                    marginTop: 5,
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
                    position: 'absolute'
                },
                tabBarActiveTintColor: '#FF4D4D',
            }}
        >
            <Tabs.Screen
                name='signin'
                options={{
                    title: 'Sign In',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="login" size={size} color={color} />
                    ),

                }}
            />
            <Tabs.Screen
                name='signup'
                options={{
                    title: 'Sign Up',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="adduser" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
