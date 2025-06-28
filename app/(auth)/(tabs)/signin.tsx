import LoginTopBox from '@/components/LoginTopBox';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function signin() {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>

            <KeyboardAvoidingView
                style={style.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 20}
            >
                <ScrollView
                    contentContainerStyle={style.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}>

                    <LoginTopBox />
                    <Text style={{ marginLeft: 25, fontSize: 20, marginTop: 70, fontWeight: 'bold' }}>Welcome Back!</Text>
                    <Text style={{ marginLeft: 25, fontSize: 15, marginTop: 10, color: '#757575' }}>Sign in to continue</Text>

                    <View style={style.inputContainer}>
                        <MaterialIcons name="email" size={24} color="#666" style={style.icon} />
                        <TextInput placeholder="Enter Your Email ID" style={style.input} />

                    </View>

                    <View style={style.inputContainer}>
                        <Entypo name="lock" size={22} color="#666" style={style.icon} />
                        <TextInput
                            placeholder="Password"
                            style={style.input}
                            secureTextEntry={!showPassword}
                            autoCapitalize="none"
                        />
                        <TouchableOpacity onPress={() => setShowPassword(prev => !prev)}>
                            <Entypo
                                name={showPassword ? 'eye' : 'eye-with-line'}
                                size={22}
                                color="#666"
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={() => router.replace('/platform/home')} style={{ backgroundColor: '#FF4D4D', width: '90%', height: 50, borderRadius: 50, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
                        <Text style={{ color: 'white' }}>Sign In</Text>
                    </TouchableOpacity>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView >
    )
}

const style = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        paddingBottom: 30,
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        marginHorizontal: 20,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 12,
        marginTop: 20,
    },
    icon: {
        marginRight: 10,
        backgroundColor: "#F5F5F5"
    },
    input: {
        flex: 1,
        fontSize: 15,
        backgroundColor: "#F5F5F5"
    },
})