import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function explore() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <View>
                <Text>explore</Text>
            </View>
        </SafeAreaView>
    )
}