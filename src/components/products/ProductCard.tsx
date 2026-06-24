// Product card: name, category label, price, "+" add button.

import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import type { Product, ProductCategory } from "../../domain/types";
import { formatMoney } from "../../domain/money";
import { card } from "../../theme/commonStyles";
import { colors, spacing, fontSize, fontWeight } from "../../theme/tokens";

type Props = {
  product: Product;
  onAdd: () => void;
};

const categoryLabels: Record<ProductCategory, string> = {
  food: "Comida",
  drink: "Bebida",
  coffee: "Café",
  dessert: "Postre",
};

export function ProductCard({ product, onAdd }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.category}>{categoryLabels[product.category]}</Text>
      </View>
      <Text style={styles.price}>{formatMoney(product.price)}</Text>
      <Pressable style={styles.addButton} onPress={onAdd} hitSlop={8}>
        <Text style={styles.addText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    ...card,
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginVertical: spacing.xs,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
  },
  category: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  price: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.primary,
    marginRight: spacing.md,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  addText: {
    color: colors.textInverse,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    lineHeight: fontSize.xl + 2,
  },
});
