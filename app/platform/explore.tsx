import { FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React from 'react';
import { Dimensions, FlatList, ListRenderItem, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Feature = {
    id: string;
    title: string;
    icon: (color?: string) => React.ReactNode;
    bgColor: string;
    description?: string;
    fullWidth?: boolean;
};

const screenWidth = Dimensions.get('window').width;

const features: Feature[] = [
    {
        id: '1',
        title: 'AI Recipe Generator',
        icon: (color = '#333') => <Ionicons name="restaurant" size={24} color={color} />,
        bgColor: '#FFE5E5',
        description: 'Create recipes from ingredients',
    },
    {
        id: '2',
        title: 'Ingredient Swap',
        icon: (color = '#333') => <MaterialCommunityIcons name="swap-horizontal" size={24} color={color} />,
        bgColor: '#E0F7F4',
        description: 'Find alternatives for ingredients',
    },
    {
        id: '3',
        title: 'Pregnancy Nutrition',
        icon: (color = '#333') => <FontAwesome5 name="baby" size={24} color={color} />,
        bgColor: '#FFF9DB',
        description: 'Nutrition tips for pregnancy',
    },
    {
        id: '4',
        title: 'Allergy Safe',
        icon: (color = '#333') => <MaterialIcons name="health-and-safety" size={24} color={color} />,
        bgColor: '#E3F2FD',
        description: 'Find recipes safe for allergies',
    },
    {
        id: '5',
        title: 'Vegan & Vegetarian',
        icon: (color = '#333') => <MaterialCommunityIcons name="leaf" size={24} color={color} />,
        bgColor: '#EAFBF0',
        description: 'Explore vegan and vegetarian recipes',
    },
    {
        id: '6',
        title: 'Track Nutrition',
        icon: (color = '#333') => <Ionicons name="fitness" size={24} color={color} />,
        bgColor: '#F3E8FD',
        description: 'Monitor your daily nutrition intake',
    },
    {
        id: '7',
        title: 'Reduce Waste',
        icon: (color = '#333') => <FontAwesome6 name="recycle" size={24} color={color} />,
        bgColor: '#EAF7EF',
        description: 'Minimize food waste with smart recipes',
    },
    {
        id: '8',
        title: 'Leftover Recipes',
        icon: (color = '#333') => <Feather name="trash" size={24} color={color} />,
        bgColor: '#FFF0E6',
        description: 'Use leftovers creatively in recipes',
    },
    {
        id: '9',
        title: 'Meal Plan',
        icon: (color = '#333') => <MaterialCommunityIcons name="calendar-month" size={24} color={color} />,
        bgColor: '#FDEEDC',
        description: 'Plan your weekly meals easily',
        fullWidth: true,
    },
];

export default function FeatureGrid() {
    const renderItem: ListRenderItem<Feature> = ({ item, index }) => (
        <View
            style={[
                styles.card,
                {
                    backgroundColor: item.bgColor,
                    width: item.fullWidth ? screenWidth - 32 : (screenWidth - 36) / 2,
                },
                index === features.length - 1 ? { marginBottom: 80 } : {}
            ]}
        >
            {item.icon('#333')}
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
        </View>
    );

    return (
        <SafeAreaView>
            <FlatList
                data={features}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.container}
                ListHeaderComponent={
                    <>
                        <View style={styles.headerRow}>
                            <Text style={styles.title}>NutriMate</Text>

                        </View>
                        <View style={{ width: '100%', alignItems: 'center', marginBottom: 16 }}>
                            <View style={[styles.card, { width: screenWidth - 32, backgroundColor: '#E9F7EF' }]}>
                                <FontAwesome5 name="hand-holding-heart" size={24} color="#333" />
                                <Text style={styles.cardTitle}>Food Donation Platform</Text>
                                <Text style={styles.cardDescription}>Donate excess food to those in need</Text>
                            </View>
                        </View>
                    </>
                }
            />

            <View style={{ marginTop: 500 }}>
                <Text style={styles.title}>Explore Features</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
    },
    row: {
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 14,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
        marginRight: -20
    },
    card: {
        padding: 18,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 150,
        marginBottom: 8,
    },
    cardTitle: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    cardDescription: {
        marginTop: 6,
        fontSize: 13,
        color: '#555',
        textAlign: 'center',
    },
});
