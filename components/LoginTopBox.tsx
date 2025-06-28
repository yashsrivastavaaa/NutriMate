import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

export default function LoginTopBox() {
    return (
        <View>
            <View style={{ width: 80, height: 80, marginTop: 100, borderRadius: 100, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', backgroundColor: '#FF4D4D' }}>
                <Image source={require('../assets/images/logo_i.png')} />
            </View>

            <Text style={style.text1}>NutriMate</Text>
            <Text style={style.tagline}>
                Your Food App, Every Information in one place
            </Text>

        </View>
    )
}

const style = StyleSheet.create({
    text1: {
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 30,
        marginTop: 10
    },
    tagline: {
        fontSize: 13,
        color: '757575',
        textAlign: 'center',
        marginTop: 10,
    },
}
)