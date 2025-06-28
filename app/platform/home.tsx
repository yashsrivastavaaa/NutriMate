import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { homeScreenData } from '../homeScreenData';

export default function Home() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>NutriMate</Text>

            <View style={styles.row}>
                {homeScreenData.map((item) => (
                    <View key={item.id} style={styles.itemContainer}>
                        <View style={[styles.iconCircle, { backgroundColor: item.color }]}>
                            <Image source={{ uri: item.icon }} style={styles.iconImage} />
                        </View>
                        <Text style={styles.iconTitle} numberOfLines={2} ellipsizeMode="tail">
                            {item.title}
                        </Text>
                    </View>
                ))}
            </View>

            <View>
                <Text style={styles.subHeader}>Today's Highlights</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 20,
        marginTop: 20,
        color: '#333',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        marginTop: 30,
    },
    itemContainer: {
        alignItems: 'center',
        width: '23%',
        paddingHorizontal: 5,
    },
    iconCircle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 6,
    },
    iconImage: {
        width: 36,
        height: 36,
        resizeMode: 'contain',
    },
    iconTitle: {
        fontSize: 12,
        textAlign: 'center',
        color: '#333',
        fontWeight: '500',
        width: '100%',
        lineHeight: 16,
    }, subHeader: {
        marginTop: 20,
        marginLeft: 20,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#444',
    },
});
