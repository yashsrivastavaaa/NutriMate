import { RecipeCard } from '@/components/RecipeCard';
import { recipeHome } from '@/config/recipeHome';
import { recipeHomeSchema } from '@/config/recipeHomeSchema';
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ImageBackground, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { homeScreenData } from '../homeScreenData';

export default function Home() {
    type Recipe = {
        id: number;
        recipe_name: string;
        description: string;
        calories: number;
        total_time: number;
        is_veg: boolean;
        image: string;
        count: number;
    };

    const [loading, setLoading] = useState(true);
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [savedRecipes, setSavedRecipes] = useState<number[]>([]);
    const [isVeg, setIsVeg] = useState(false); // default false (gray)

    const toggleSave = (id: number) => {
        setSavedRecipes((prev) =>
            prev.includes(id) ? prev.filter((savedId) => savedId !== id) : [...prev, id]
        );
    };

    useEffect(() => {
        const loadRecipes = async () => {
            setLoading(true);
            try {
                if (isVeg) {
                    const result = await recipeHome
                        .select()
                        .from(recipeHomeSchema)
                        .where(eq(recipeHomeSchema.is_veg, isVeg)).orderBy(desc(recipeHomeSchema.count));
                    setRecipes(result as Recipe[]);
                } else {
                    const result = await recipeHome
                        .select()
                        .from(recipeHomeSchema).orderBy(desc(recipeHomeSchema.count));
                    setRecipes(result as Recipe[]);
                }
            } catch (err) {
                console.error('Error fetching recipes:', err);
            } finally {
                setLoading(false);
            }
        };

        loadRecipes();
    }, [isVeg]);


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {/* Header Row */}
                <View style={styles.headerRow}>
                    <Text style={styles.title}>NutriMate</Text>

                    <View style={styles.rightSide}>
                        <Text style={styles.vegModeText} numberOfLines={2} ellipsizeMode="tail">
                            Veg{'\n'}Mode
                        </Text>
                        <Switch style={{ marginTop: -10 }}
                            value={isVeg}
                            onValueChange={setIsVeg}
                            thumbColor={isVeg ? '#2e7d32' : '#888888'}
                            trackColor={{ false: '#cccccc', true: '#a5d6a7' }}
                        />
                    </View>
                </View>


                <View
                    style={{
                        marginHorizontal: 20,
                        marginBottom: 20,
                        borderRadius: 10,
                        overflow: 'hidden',
                        elevation: 4,

                    }}
                >
                    <ImageBackground
                        source={require('@/assets/images/bgimg.png')}
                        style={{
                            height: 190,
                            width: '100%',
                            borderRadius: 100,
                        }}
                    >
                        <View>
                            <Text style={{ marginTop: 20, marginLeft: 20, color: 'white', fontWeight: 800, fontSize: 20, fontFamily: 'Inter-Regular' }}>AI Recipe Generator</Text>
                            <Text style={{ marginTop: 10, marginLeft: 20, color: 'white', fontSize: 16, fontFamily: 'Inter-Regular', lineHeight: 22 }}>Turn any ingredients into delicious {'\n'}recipes</Text>

                            <TouchableOpacity
                                style={{
                                    backgroundColor: 'white',
                                    paddingVertical: 10,
                                    paddingHorizontal: 20,
                                    borderRadius: 100,
                                    marginTop: 20,
                                    marginLeft: 20,
                                    width: 150,
                                    alignItems: 'center',
                                }}
                                onPress={() => console.log('AI Recipe Generator Pressed')}
                            >

                                <Text style={{ color: '#3B82F6' }}>Try Now</Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>

                {/* Icon row */}
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

                <Text style={styles.subHeader}>Today's Highlights</Text>

                {loading ? (
                    <ActivityIndicator size="large" color="#2e7d32" />
                ) : (
                    recipes.map((recipe) => (
                        <RecipeCard
                            key={recipe.id}
                            recipe={recipe}
                            saved={savedRecipes.includes(recipe.id)}
                            onSaveToggle={() => toggleSave(recipe.id)}
                        />
                    ))
                )}

                <View style={{ height: 50 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 14,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginTop: -10
    },
    rightSide: {
        alignItems: 'center',
        width: 60,
        justifyContent: 'center',
    },
    vegModeText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#2e7d32',
        textAlign: 'center',
        lineHeight: 15,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        // marginTop: 30,
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
    },
    subHeader: {
        marginTop: 20,
        marginLeft: 20,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#444',
    },
});
