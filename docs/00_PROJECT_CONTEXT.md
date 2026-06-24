# 00_PROJECT_CONTEXT.md — Tabbi Ops Demo

## Purpose

Tabbi Ops Demo is a small React Native + Expo + TypeScript demo built for a Senior React Native + AI Development interview.

The project is inspired by Tabbi, a restaurant operation/POS platform focused on restaurant-floor workflows. The demo must show senior judgment: understand the domain, adapt a previous web project wisely, separate business logic from UI, and avoid unnecessary scope.

The demo is not a Tabbi clone and not a complete POS.

## Background

There is a previous project called Woki Reservation Timeline.

Woki was a React web desktop app for restaurant reservations. It used React, TypeScript, Redux Toolkit, Vite, Ant Design, SCSS Modules, drag & drop, timeline slots, conflict detection and memoized selectors.

Woki and Tabbi share restaurant-domain concepts, but they solve different problems.

- Woki focused on reservations and timeline manipulation.
- Tabbi Ops Demo focuses on live restaurant operations.

## Core strategy

Do not port Woki visually.

Reuse only the valuable domain concepts:

- Tables as physical resources
- Sectors
- Statuses
- Filters
- Search
- Capacity validation
- Time helpers
- Timeline slots
- Memoized selectors
- Performance mindset

Discard the desktop-specific parts:

- Ant Design
- SCSS Modules
- DOM events
- Pointer events
- Drag & drop
- Resize handles
- Context menu
- Advanced zoom
- Scrubber
- Scroll synchronization
- Desktop layout

## MVP objective

Build a small mobile app that demonstrates this flow:

1. View tables by sector.
2. Filter tables by status.
3. Search a table.
4. Open table detail.
5. View or start an order.
6. Add products.
7. Send kitchen command.
8. Close table.
9. Simulate payment/free table.
10. View a simple operational timeline.
11. View AI-ready operational insights.

## Success definition

The project succeeds if it is small, stable, mobile-first, domain-driven, easy to explain and free of unnecessary integrations.
