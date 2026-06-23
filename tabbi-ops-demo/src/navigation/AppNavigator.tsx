// Root navigation stack: Floor → TableDetail → ProductPicker.

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FloorScreen } from "../screens/FloorScreen";
import { TableDetailScreen } from "../screens/TableDetailScreen";
import { ProductPickerScreen } from "../screens/ProductPickerScreen";

export type RootStackParamList = {
  Floor: undefined;
  TableDetail: { tableId: string };
  ProductPicker: { tableId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Floor" component={FloorScreen} />
        <Stack.Screen name="TableDetail" component={TableDetailScreen} />
        <Stack.Screen name="ProductPicker" component={ProductPickerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
