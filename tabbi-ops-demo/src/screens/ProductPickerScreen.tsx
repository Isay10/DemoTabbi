// Product picker: search + category filter, tap "+" to add one unit to the table order.

import React, { useState } from "react";
import { FlatList, StyleSheet, SafeAreaView } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { RootStackParamList } from "../navigation/AppNavigator";
import type { Product } from "../domain/types";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectAllProducts } from "../features/products/productSelectors";
import { addItemToOrder } from "../features/orders/ordersSlice";

import { AppHeader } from "../components/common/AppHeader";
import { SearchInput } from "../components/common/SearchInput";
import { EmptyState } from "../components/common/EmptyState";
import { CategoryFilter } from "../components/products/CategoryFilter";
import { ProductCard } from "../components/products/ProductCard";

import { colors, spacing } from "../theme/tokens";

type Props = NativeStackScreenProps<RootStackParamList, "ProductPicker">;

export function ProductPickerScreen({ route, navigation }: Props) {
  const { tableId } = route.params;
  const dispatch = useAppDispatch();
  const allProducts = useAppSelector(selectAllProducts);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const query = searchQuery.trim().toLowerCase();
  const filtered = allProducts.filter((product) => {
    if (selectedCategory && product.category !== selectedCategory) return false;
    if (query && !product.name.toLowerCase().includes(query)) return false;
    return true;
  });

  const onAdd = (product: Product) => {
    dispatch(addItemToOrder(tableId, product));
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Agregar producto" onBack={() => navigation.goBack()} />
      <SearchInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Buscar producto"
      />
      <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard product={item} onAdd={() => onAdd(item)} />}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<EmptyState message="No hay productos para este filtro." />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingVertical: spacing.sm,
    flexGrow: 1,
  },
});
