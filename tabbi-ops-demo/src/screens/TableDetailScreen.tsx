// Table detail: operate one table through available → in_use → closed → available.

import React from "react";
import { View, Text, ScrollView, StyleSheet, SafeAreaView, Alert } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { RootStackParamList } from "../navigation/AppNavigator";
import type { OperationalValidationResult } from "../domain/types";
import { mockSectors } from "../domain/mockData";
import { formatElapsed } from "../domain/time";
import {
  canOpenTable,
  canSendCommand,
  canCloseTable,
  canPayTable,
} from "../domain/tableRules";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  selectTableById,
  selectTableTotal,
  selectPendingKitchenItems,
} from "../features/tables/tableSelectors";
import { selectOrderByTableId } from "../features/orders/orderSelectors";
import { openTable, closeTable, payAndFreeTable } from "../features/tables/tablesSlice";
import { sendCommand } from "../features/orders/ordersSlice";

import { AppHeader } from "../components/common/AppHeader";
import { AppButton } from "../components/common/AppButton";
import { StatusBadge } from "../components/tables/StatusBadge";
import { OrderItemRow } from "../components/orders/OrderItemRow";
import { SummaryPanel } from "../components/orders/SummaryPanel";

import { colors, spacing, fontSize, fontWeight } from "../theme/tokens";

type Props = NativeStackScreenProps<RootStackParamList, "TableDetail">;

const sectorMap: Record<string, string> = Object.fromEntries(
  mockSectors.map((s) => [s.id, s.name])
);

const reasonLabels: Record<string, string> = {
  table_already_in_use: "La mesa ya está en uso.",
  capacity_exceeded: "Se excede la capacidad de la mesa.",
  target_table_not_available: "La mesa destino no está disponible.",
  empty_order: "No hay productos en el pedido.",
  table_not_ready_to_bill: "La mesa no está lista para cobrar.",
  table_not_found: "Mesa no encontrada.",
  order_not_found: "Pedido no encontrado.",
  product_not_found: "Producto no encontrado.",
  outside_business_hours: "El local está cerrado.",
};

export function TableDetailScreen({ route, navigation }: Props) {
  const { tableId } = route.params;
  const dispatch = useAppDispatch();

  const table = useAppSelector((state) => selectTableById(state, tableId));
  const order = useAppSelector((state) => selectOrderByTableId(state, tableId));
  const total = useAppSelector((state) => selectTableTotal(state, tableId));
  const pendingItems = useAppSelector((state) => selectPendingKitchenItems(state, tableId));

  if (!table) {
    return (
      <SafeAreaView style={styles.container}>
        <AppHeader title="Mesa" onBack={() => navigation.goBack()} />
        <View style={styles.center}>
          <Text style={styles.muted}>Mesa no encontrada.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const isInUse = table.status === "in_use";
  const hasItems = !!order && order.items.length > 0;

  const handle = (result: OperationalValidationResult, onValid: () => void) => {
    if (result.valid) {
      onValid();
    } else {
      Alert.alert("No se puede", reasonLabels[result.reason] ?? "Operación no válida.");
    }
  };

  const onOpen = () => handle(canOpenTable(table), () => dispatch(openTable(tableId)));

  const onSend = () => {
    const result: OperationalValidationResult = order
      ? canSendCommand(table, order)
      : { valid: false, reason: "empty_order" };
    handle(result, () => dispatch(sendCommand({ tableId })));
  };

  const onClose = () => {
    const result: OperationalValidationResult = order
      ? canCloseTable(table, order)
      : { valid: false, reason: "empty_order" };
    handle(result, () => dispatch(closeTable(tableId)));
  };

  const onPay = () =>
    handle(canPayTable(table), () => {
      dispatch(payAndFreeTable(tableId));
      navigation.goBack();
    });

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title={table.name} onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.infoRow}>
          <Text style={styles.sector}>{sectorMap[table.sectorId] ?? ""}</Text>
          <Text style={styles.dot}>·</Text>
          <StatusBadge status={table.status} />
          {isInUse && table.partySize ? (
            <>
              <Text style={styles.dot}>·</Text>
              <Text style={styles.party}>{table.partySize} personas</Text>
            </>
          ) : null}
        </View>

        {isInUse && table.openedAt ? (
          <Text style={styles.elapsed}>Abierta hace {formatElapsed(table.openedAt)}</Text>
        ) : null}

        <View style={styles.orderSection}>
          {hasItems ? (
            order!.items.map((item) => <OrderItemRow key={item.id} item={item} />)
          ) : (
            <Text style={styles.muted}>Sin productos</Text>
          )}
        </View>

        {isInUse ? (
          <View style={styles.addButton}>
            <AppButton
              label="Agregar producto"
              variant="secondary"
              onPress={() => navigation.navigate("ProductPicker", { tableId })}
            />
          </View>
        ) : null}
      </ScrollView>

      <View style={styles.bottom}>
        {order ? <SummaryPanel total={total} itemCount={order.items.length} /> : null}

        <View style={styles.actions}>
          {table.status === "available" ? (
            <AppButton label="Abrir mesa" onPress={onOpen} />
          ) : null}

          {isInUse ? (
            <>
              <AppButton
                label="Enviar comanda"
                variant="secondary"
                onPress={onSend}
                disabled={pendingItems === 0}
              />
              <AppButton
                label="Cerrar mesa"
                onPress={onClose}
                disabled={pendingItems > 0 || !hasItems}
              />
            </>
          ) : null}

          {table.status === "closed" ? (
            <AppButton label="Cobrar y liberar" onPress={onPay} />
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    paddingBottom: spacing.lg,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    gap: spacing.sm,
  },
  sector: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    fontWeight: fontWeight.medium,
  },
  dot: {
    color: colors.textMuted,
  },
  party: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  elapsed: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  orderSection: {
    marginTop: spacing.lg,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  muted: {
    fontSize: fontSize.md,
    color: colors.textMuted,
    padding: spacing.lg,
  },
  addButton: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  bottom: {
    backgroundColor: colors.surface,
  },
  actions: {
    padding: spacing.lg,
    gap: spacing.sm,
  },
});
