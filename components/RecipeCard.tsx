import { recipeHome } from "@/config/recipeHome";
import { recipeHomeSchema } from "@/config/recipeHomeSchema";
import Ionicons from "@expo/vector-icons/Ionicons";
import { eq } from "drizzle-orm";
import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Recipe = {
    id: number;
    recipe_name: string;
    description: string;
    calories: number;
    total_time: number;
    is_veg: boolean;
    image: string;
    count: number
};

export const RecipeCard = ({
    recipe,
    saved,
    onSaveToggle,
}: {
    recipe: Recipe;
    saved: boolean;
    onSaveToggle: () => void;
}) => (
    <TouchableOpacity
        style={styles.card}
        onPress={async () => {
            try {
                await recipeHome
                    .update(recipeHomeSchema)
                    .set({ count: recipe.count + 1 })
                    .where(eq(recipeHomeSchema.id, recipe.id))
                    .execute();

                router.push(`/DetailScreen?id=${recipe.id}`);
                console.log("Recipe count updated successfully:", recipe.id);
            } catch (error) {
                console.error("Error updating recipe count:", error);
            }
        }}
    >
        <Image source={{ uri: recipe.image }} style={styles.image} />

        {/* Veg Badge - Now on Left */}
        <View style={styles.vegBadge}>
            <Text style={styles.vegBadgeText}>
                {recipe.is_veg ? '🟢 Veg' : '🔴 Non-Veg'}
            </Text>
        </View>

        {/* Save Icon - Now on Right */}
        <TouchableOpacity
            style={styles.saveIcon}
            onPress={onSaveToggle}
        >
            <Ionicons
                name={saved ? 'bookmark' : 'bookmark-outline'}
                size={24}
                color="#2e7d32"
            />
        </TouchableOpacity>

        <View style={styles.cardContent}>
            <Text style={styles.title}>{recipe.recipe_name}</Text>
            <Text style={styles.description}>{recipe.description}</Text>

            <View style={styles.iconRow}>
                <Text style={styles.iconText}>🔥 {recipe.calories} cal</Text>
                <Text style={styles.iconText}>🕒 {recipe.total_time} mins</Text>
            </View>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 20,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        position: 'relative',
        marginLeft: 20,
        marginRight: 20,
    },
    image: {
        height: 180,
        width: '100%',
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
    cardContent: {
        padding: 12,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    description: {
        fontSize: 14,
        color: '#555',
        marginBottom: 8,
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    iconText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
});
