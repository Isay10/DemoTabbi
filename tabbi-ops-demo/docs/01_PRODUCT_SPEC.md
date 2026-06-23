# 01_PRODUCT_SPEC.md — Product Specification

## Product name

Tabbi Ops Demo

## Product type

Mobile restaurant operations demo.

## Target user

- Waiters
- Cashiers
- Restaurant floor operators
- Restaurant managers

## Product goal

Help the user quickly understand and operate the state of restaurant tables during a shift.

The demo must show:

- Which tables are free
- Which tables are in use
- Which tables are reserved
- Which tables are closed and ready to bill
- What each table has ordered
- Whether kitchen command was sent
- Whether a table can be closed or paid
- Which operational issues need attention

## MVP screens

### FloorScreen

Shows restaurant tables, status, sector/status filters, search and navigation to table detail.

Each TableCard should show table number/name, sector, status, party size if open, waiter if assigned, current total, pending kitchen items and elapsed open time if applicable.

A true coordinate-based floor map is not required. A floor editor is forbidden.

### TableDetailScreen

Operates one table.

Required actions:

- Open table
- Add product
- Send command
- Close table
- Pay/free table

Optional only if time allows:

- Transfer table
- Discount
- Quick sale

### ProductPickerScreen

Lets the user search/filter products and add them to the current table order.

Required categories:

- Food
- Drink
- Coffee
- Dessert

### TimelineScreen

Shows a simple operational timeline inspired by Woki.

Required: tables as rows, time slots, status colors, optional sector filter.

Forbidden: drag & drop, resize handles, context menu, advanced zoom, scrubber and complex scroll synchronization.

### AiInsightsScreen

Shows operational intelligence, not chatbot UI.

Required insights:

- Tables open for too long
- Closed tables pending payment
- Pending kitchen items
- Highly occupied sectors
- Shift summary

## Core statuses

```ts
export type TableStatus = "available" | "reserved" | "in_use" | "closed";
export type OrderStatus = "draft" | "sent_to_kitchen" | "ready_to_bill" | "paid";
```

Spanish labels:

- Libre
- Reservada
- En uso
- Cerrada
- Pedido abierto
- Comanda enviada
- Lista para facturar
- Pagada

## Core table flow

Minimum cycle:

```txt
available -> in_use -> closed -> available
```

Extended cycle:

```txt
available -> reserved -> in_use -> closed -> paid -> available
```

## Priority order

If time is short:

1. FloorScreen
2. TableDetailScreen
3. Add product
4. Send kitchen command
5. Close/pay/free table
6. AI insights
7. Timeline
8. Transfer table
9. Quick sale
10. Discounts/surcharges

## Non-goals

No auth, no real billing, no real payments, no printer, no backend, no WebSockets, no offline-first, no push notifications, no editor visual de salón, no Play Store release, no complete POS.
