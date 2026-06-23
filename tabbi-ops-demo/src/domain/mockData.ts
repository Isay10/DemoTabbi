// Mock data for demo. Plain objects — no factories, no builders.

import type { Sector, RestaurantTable, Product, Order } from "./types";

export const mockSectors: Sector[] = [
  { id: "s1", name: "Salón", sortOrder: 1 },
  { id: "s2", name: "Terraza", sortOrder: 2 },
  { id: "s3", name: "Bar", sortOrder: 3 },
];

export const mockTables: RestaurantTable[] = [
  // Salón — available
  { id: "t1", sectorId: "s1", number: 1, name: "Mesa 1", capacity: { min: 1, max: 4 }, status: "available", sortOrder: 1 },
  { id: "t2", sectorId: "s1", number: 2, name: "Mesa 2", capacity: { min: 1, max: 6 }, status: "available", sortOrder: 2 },
  // Salón — reserved
  { id: "t3", sectorId: "s1", number: 3, name: "Mesa 3", capacity: { min: 2, max: 4 }, status: "reserved", sortOrder: 3 },
  // Salón — in_use
  {
    id: "t4", sectorId: "s1", number: 4, name: "Mesa 4", capacity: { min: 1, max: 8 }, status: "in_use",
    partySize: 4, waiterName: "Carlos", openedAt: new Date(Date.now() - 45 * 60000).toISOString(),
    orderId: "o1", sortOrder: 4,
  },
  // Terraza — available
  { id: "t5", sectorId: "s2", number: 5, name: "Mesa 5", capacity: { min: 1, max: 4 }, status: "available", sortOrder: 1 },
  // Terraza — reserved
  { id: "t6", sectorId: "s2", number: 6, name: "Mesa 6", capacity: { min: 2, max: 6 }, status: "reserved", sortOrder: 2 },
  // Terraza — in_use
  {
    id: "t7", sectorId: "s2", number: 7, name: "Mesa 7", capacity: { min: 1, max: 4 }, status: "in_use",
    partySize: 2, waiterName: "Laura", openedAt: new Date(Date.now() - 20 * 60000).toISOString(),
    orderId: "o2", sortOrder: 3,
  },
  // Terraza — closed
  {
    id: "t8", sectorId: "s2", number: 8, name: "Mesa 8", capacity: { min: 1, max: 4 }, status: "closed",
    partySize: 3, waiterName: "Laura", openedAt: new Date(Date.now() - 90 * 60000).toISOString(),
    orderId: "o4", sortOrder: 4,
  },
  // Bar — in_use
  {
    id: "t9", sectorId: "s3", number: 9, name: "Barra 1", capacity: { min: 1, max: 2 }, status: "in_use",
    partySize: 1, waiterName: "Sofía", openedAt: new Date(Date.now() - 10 * 60000).toISOString(),
    orderId: "o3", sortOrder: 1,
  },
  // Bar — closed
  {
    id: "t10", sectorId: "s3", number: 10, name: "Barra 2", capacity: { min: 1, max: 2 }, status: "closed",
    partySize: 2, waiterName: "Sofía", openedAt: new Date(Date.now() - 60 * 60000).toISOString(),
    orderId: "o5", sortOrder: 2,
  },
];

export const mockProducts: Product[] = [
  // Food
  { id: "p1", name: "Milanesa napolitana", category: "food", price: 1800 },
  { id: "p2", name: "Ensalada mixta", category: "food", price: 900 },
  { id: "p3", name: "Hamburguesa clásica", category: "food", price: 1500 },
  { id: "p4", name: "Papas fritas", category: "food", price: 600 },
  { id: "p5", name: "Tabla de fiambres", category: "food", price: 2200 },
  // Drink
  { id: "p6", name: "Agua mineral", category: "drink", price: 350 },
  { id: "p7", name: "Coca-Cola", category: "drink", price: 450 },
  { id: "p8", name: "Cerveza tirada", category: "drink", price: 700 },
  { id: "p9", name: "Vino copa", category: "drink", price: 850 },
  { id: "p10", name: "Jugo de naranja", category: "drink", price: 500 },
  // Coffee
  { id: "p11", name: "Café solo", category: "coffee", price: 300 },
  { id: "p12", name: "Café con leche", category: "coffee", price: 380 },
  { id: "p13", name: "Cortado", category: "coffee", price: 320 },
  { id: "p14", name: "Cappuccino", category: "coffee", price: 420 },
  { id: "p15", name: "Té", category: "coffee", price: 280 },
  // Dessert
  { id: "p16", name: "Flan con dulce de leche", category: "dessert", price: 650 },
  { id: "p17", name: "Tiramisú", category: "dessert", price: 750 },
  { id: "p18", name: "Brownie con helado", category: "dessert", price: 800 },
  { id: "p19", name: "Fruta de estación", category: "dessert", price: 550 },
  { id: "p20", name: "Panqueques", category: "dessert", price: 700 },
];

const now = new Date().toISOString();

export const mockOrders: Order[] = [
  // o1 — t4 Salón in_use
  {
    id: "o1", tableId: "t4", status: "sent_to_kitchen",
    createdAt: new Date(Date.now() - 44 * 60000).toISOString(), updatedAt: now,
    items: [
      { id: "oi1", productId: "p1", name: "Milanesa napolitana", quantity: 2, unitPrice: 1800, sentToKitchen: true },
      { id: "oi2", productId: "p8", name: "Cerveza tirada", quantity: 2, unitPrice: 700, sentToKitchen: true },
      { id: "oi3", productId: "p4", name: "Papas fritas", quantity: 1, unitPrice: 600, sentToKitchen: true },
    ],
  },
  // o2 — t7 Terraza in_use
  {
    id: "o2", tableId: "t7", status: "sent_to_kitchen",
    createdAt: new Date(Date.now() - 19 * 60000).toISOString(), updatedAt: now,
    items: [
      { id: "oi4", productId: "p3", name: "Hamburguesa clásica", quantity: 2, unitPrice: 1500, sentToKitchen: true },
      { id: "oi5", productId: "p6", name: "Agua mineral", quantity: 2, unitPrice: 350, sentToKitchen: true },
    ],
  },
  // o3 — t9 Bar in_use
  {
    id: "o3", tableId: "t9", status: "draft",
    createdAt: new Date(Date.now() - 9 * 60000).toISOString(), updatedAt: now,
    items: [
      { id: "oi6", productId: "p11", name: "Café solo", quantity: 1, unitPrice: 300, sentToKitchen: false },
      { id: "oi7", productId: "p16", name: "Flan con dulce de leche", quantity: 1, unitPrice: 650, sentToKitchen: false },
    ],
  },
  // o4 — t8 Terraza closed → ready_to_bill
  {
    id: "o4", tableId: "t8", status: "ready_to_bill",
    createdAt: new Date(Date.now() - 89 * 60000).toISOString(), updatedAt: now,
    items: [
      { id: "oi8", productId: "p5", name: "Tabla de fiambres", quantity: 1, unitPrice: 2200, sentToKitchen: true },
      { id: "oi9", productId: "p9", name: "Vino copa", quantity: 3, unitPrice: 850, sentToKitchen: true },
    ],
  },
  // o5 — t10 Bar closed → ready_to_bill
  {
    id: "o5", tableId: "t10", status: "ready_to_bill",
    createdAt: new Date(Date.now() - 59 * 60000).toISOString(), updatedAt: now,
    items: [
      { id: "oi10", productId: "p14", name: "Cappuccino", quantity: 2, unitPrice: 420, sentToKitchen: true },
      { id: "oi11", productId: "p17", name: "Tiramisú", quantity: 2, unitPrice: 750, sentToKitchen: true },
    ],
  },
];
