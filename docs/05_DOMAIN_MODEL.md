# 05_DOMAIN_MODEL.md — Domain Model

## Purpose

Define the business model for Tabbi Ops Demo. Keep it small and focused.

## Core entities

- Sector
- RestaurantTable
- Product
- Order
- OrderItem
- TableSession
- OperationalInsight

## Types

```ts
export type EntityId = string;
export type ISODateTime = string;
export type MoneyAmount = number;

export type TableStatus = "available" | "reserved" | "in_use" | "closed";
export type ProductCategory = "food" | "drink" | "coffee" | "dessert";
export type OrderStatus = "draft" | "sent_to_kitchen" | "ready_to_bill" | "paid";

export type Sector = {
  id: EntityId;
  name: string;
  sortOrder: number;
};

export type RestaurantTable = {
  id: EntityId;
  sectorId: EntityId;
  number: number;
  name: string;
  capacity: { min: number; max: number };
  status: TableStatus;
  partySize?: number;
  waiterName?: string;
  openedAt?: ISODateTime;
  orderId?: EntityId;
  sortOrder: number;
};

export type Product = {
  id: EntityId;
  name: string;
  category: ProductCategory;
  price: MoneyAmount;
  code?: string;
};

export type OrderItem = {
  id: EntityId;
  productId: EntityId;
  name: string;
  quantity: number;
  unitPrice: MoneyAmount;
  sentToKitchen: boolean;
  notes?: string;
};

export type Order = {
  id: EntityId;
  tableId: EntityId;
  items: OrderItem[];
  status: OrderStatus;
  discount?: { type: "percentage" | "fixed"; value: number };
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
};

export type TableSession = {
  id: EntityId;
  tableId: EntityId;
  customerName?: string;
  partySize: number;
  openedAt: ISODateTime;
  closedAt?: ISODateTime;
  status: "open" | "ready_to_bill" | "paid";
  waiterName?: string;
  notes?: string;
};

export type OperationalInsight = {
  id: EntityId;
  severity: "low" | "medium" | "high";
  title: string;
  description: string;
  relatedTableId?: EntityId;
};
```

## Table rules

- Available tables should not have `openedAt`, `waiterName`, `partySize` or `orderId`.
- In-use tables should usually have `openedAt`, `partySize`, `waiterName` and `orderId`.
- Closed tables should have an order ready to bill.
- `partySize` cannot exceed `capacity.max`.

## Transitions

### Open table

Valid if table is available or reserved and party size does not exceed capacity. Creates an order and moves table to `in_use`.

### Add product

Valid if table is `in_use`, active order exists and product exists. If product exists in order, increment quantity.

### Send kitchen command

Valid if order exists and has items. Marks items as `sentToKitchen: true` and order as `sent_to_kitchen`.

### Close table

Valid if table is `in_use` and has an order with items. Moves table to `closed` and order to `ready_to_bill`.

### Pay/free table

Valid if table is `closed`. Moves order to `paid` and table to `available`, clearing operation fields.

### Transfer table

Optional. Source must be `in_use` or `closed`; target must be `available`.

## Validation result

```ts
export type OperationalValidationResult =
  | { valid: true }
  | {
      valid: false;
      reason:
        | "table_already_in_use"
        | "capacity_exceeded"
        | "target_table_not_available"
        | "empty_order"
        | "table_not_ready_to_bill"
        | "table_not_found"
        | "order_not_found"
        | "product_not_found";
    };
```

## Helpers

Money:

```ts
formatMoney(amount: number): string
calculateOrderSubtotal(order: Order): number
calculateOrderTotal(order: Order): number
```

Time:

```ts
getMinutesBetween(start: ISODateTime, end: ISODateTime): number
formatTime(value: ISODateTime): string
formatElapsedTime(minutes: number): string
slotFromTime(value: ISODateTime): number
timeFromSlot(slot: number): string
```

## Woki mapping

```txt
PENDING    -> reserved
CONFIRMED  -> reserved
SEATED     -> in_use
FINISHED   -> closed / available
NO_SHOW    -> discarded for MVP
CANCELLED  -> discarded for MVP
```

Do not carry all Woki statuses into Tabbi Ops Demo. The demo needs clarity, not exhaustiveness.
