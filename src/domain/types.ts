// Core domain types. Pure TypeScript — no React, Redux, or UI imports.

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

export type OperationalInsight = {
  id: EntityId;
  severity: "low" | "medium" | "high";
  title: string;
  description: string;
  relatedTableId?: EntityId;
};

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
        | "product_not_found"
        | "outside_business_hours";
    };
