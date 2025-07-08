import { recipeHome } from '@/config/recipeHome';
import { recipeHomeSchema } from '@/config/recipeHomeSchema';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { eq } from 'drizzle-orm';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

type Ingredient = {
    ingredient: string;
    quantity: string;
    icon?: string;
};

type Recipe = {
    id: number;
    recipe_name: string;
    description: string | null;
    ingredients: Ingredient[];
    steps: string[];
    calories: number | null;
    cook_time: number | null;
    prep_time: number | null;
    total_time: number | null;
    image: string | null;
    is_veg: boolean | null;
};

type RouteParams = {
    id: number;
};

const DetailScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { id } = route.params as RouteParams;

    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState(true);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const result = await recipeHome
                    .select()
                    .from(recipeHomeSchema)
                    .where(eq(recipeHomeSchema.id, id));

                if (result && result.length > 0) {
                    const r = result[0];
                    const parsedRecipe: Recipe = {
                        ...r,
                        ingredients: Array.isArray(r.ingredients) ? r.ingredients : [],
                        steps: Array.isArray(r.steps) ? r.steps : [],
                    };
                    setRecipe(parsedRecipe);
                } else {
                    setRecipe(null);
                }
            } catch (error) {
                console.error('Error fetching recipe:', error);
                setRecipe(null);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    // Set navigation header title when recipe is available
    useLayoutEffect(() => {
        if (recipe?.recipe_name) {
            navigation.setOptions({ title: recipe.recipe_name });
        }
    }, [navigation, recipe?.recipe_name]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }

    if (!recipe) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Recipe not found.</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.imageContainer}>
                {recipe.image ? (
                    <Image source={{ uri: recipe.image }} style={styles.image} />
                ) : (
                    <View style={styles.placeholderImage}>
                        <Text>No Image Available</Text>
                    </View>
                )}
                <View style={styles.vegBadge}>
                    <Text style={styles.vegBadgeText}>
                        {recipe.is_veg ? '🟢 Veg' : '🔴 Non-Veg'}
                    </Text>
                </View>
                <TouchableOpacity style={styles.saveIcon} onPress={() => setSaved(!saved)}>
                    <Ionicons
                        name={saved ? 'bookmark' : 'bookmark-outline'}
                        size={24}
                        color="#2e7d32"
                    />
                </TouchableOpacity>
            </View>

            <Text style={styles.title}>{recipe.recipe_name}</Text>

            <View style={styles.timingBox}>
                <View style={styles.timeCol}>
                    <Text style={styles.timeTitle}>Prep Time</Text>
                    <Text style={styles.timeValue}>{recipe.prep_time} mins</Text>
                </View>
                <View style={styles.timeCol}>
                    <Text style={styles.timeTitle}>Cook Time</Text>
                    <Text style={styles.timeValue}>{recipe.cook_time} mins</Text>
                </View>
                <View style={styles.timeCol}>
                    <Text style={styles.timeTitle}>Total</Text>
                    <Text style={styles.timeValue}>{recipe.total_time} mins</Text>
                </View>
            </View>

            <Text style={styles.sectionTitle}>Ingredients</Text>
            {recipe.ingredients.map((item, index) => (
                <Text key={index} style={styles.listItem}>
                    • {item.icon ? `${item.icon} ` : ''}{item.ingredient} - {item.quantity}
                </Text>
            ))}

            <Text style={styles.sectionTitle}>Instructions</Text>
            {recipe.steps.map((step, index) => (
                <View key={index} style={styles.stepContainer}>
                    <Text style={styles.stepNumber}>{index + 1}.</Text>
                    <Text style={styles.stepText}>{step}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

export default DetailScreen;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 12,
    },
    placeholderImage: {
        width: '100%',
        height: 200,
        borderRadius: 12,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
    },
    vegBadge: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: 'rgba(255,255,255,0.9)',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 8,
    },
    vegBadgeText: {
        fontSize: 12,
        fontWeight: '600',
    },
    saveIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(255,255,255,0.9)',
        padding: 6,
        borderRadius: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    timingBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f4f4f4',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
    timeCol: {
        alignItems: 'center',
        flex: 1,
    },
    timeTitle: {
        fontSize: 14,
        color: '#888',
        marginBottom: 4,
    },
    timeValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
        color: '#222',
    },
    listItem: {
        fontSize: 16,
        marginBottom: 6,
        color: '#444',
    },
    stepContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        backgroundColor: '#f9f9f9',
        padding: 12,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    stepNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginRight: 10,
        alignSelf: 'flex-start',
    },
    stepText: {
        fontSize: 16,
        color: '#444',
        flex: 1,
    },
});
