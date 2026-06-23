# Tabbi Ops Demo

Demo mobile de **operación de salón de restaurante**, construida en React Native + Expo + TypeScript para una entrevista Senior React Native + AI.

No es un POS completo ni un clon de Tabbi: es una vertical chica, coherente y defendible que muestra criterio de dominio, separación de capas y una capa de IA "AI-ready" sin integraciones innecesarias.

---

## Utilidad

Ayuda a un operador de salón (mozo, cajero, encargado) a entender y operar el estado de las mesas durante un turno:

- Ver qué mesas están **libres / reservadas / en uso / cerradas**, por sector.
- Buscar y filtrar mesas.
- Abrir una mesa, cargar productos, **enviar comanda** a cocina, **cerrar** y **cobrar/liberar**.
- Ver una **línea de tiempo operacional** del turno (mesas × horas).
- Ver **insights operacionales** (mesas abiertas hace mucho, pagos pendientes, sectores saturados, etc.) generados a partir del estado.

Ciclo central de una mesa:

```
available → in_use → closed → available
            (reserved como estado previo opcional; paid al cobrar)
```

---

## Cómo se construyó: Spec-Driven Development (SDD) con agentes de IA

Este proyecto se construyó con un agente de codificación (Claude Code) bajo una disciplina **Spec-Driven Development**. El punto no es "la IA escribió el código", sino que **el humano definió specs, guardrails y roles de agente acotados por adelantado**, y la IA ejecutó dentro de esos rieles con gates de verificación en cada paso. Las carpetas `docs/` y `agents/` son la evidencia de ese proceso, no un agregado posterior.

> Tesis para el rol Sr FE + IA: dominar la IA es **dirigirla, acotarla y verificarla** — no delegar a ciegas. El valor está en el control de scope, la prevención de alucinación/scope-creep y la trazabilidad de decisiones.

### El bucle de trabajo (por cada feature)

```
1. Leer contexto          (CLAUDE.md → docs/*)
2. Chequear guardrails     (docs/10_GUARDRAILS.md)
3. Definir scope mínimo    (un vertical slice, nada de infra futura)
4. Specs antes que código  (actualizar docs si cambia la arquitectura)
5. Implementar el slice más chico útil
6. Gate: tsc --noEmit en CERO
7. Actualizar TASKS / DECISIONS
8. Pase de QA (qa-reviewer) antes de dar por cerrada la feature
```

Cada feature se entregó como **vertical slice** siguiendo `docs/06_FEATURE_ROADMAP.md` (dominio → store → FloorScreen → TableDetail → ProductPicker → Insights → Timeline), nunca como infraestructura especulativa.

### Specs como fuente de verdad — `docs/`

13 documentos numerados; el código se deriva de ellos, no al revés.

| Doc | Rol |
|---|---|
| `00_PROJECT_CONTEXT` | Propósito, estrategia, qué reusar de Woki y qué descartar |
| `01_PRODUCT_SPEC` | Pantallas, estados, copy operacional |
| `02_TECH_SPEC` | Stack, reglas de estado y de TypeScript |
| `03_UI_STYLE_CONTEXT` | Tokens de diseño y personalidad visual POS |
| `04_ARCHITECTURE` | Capas, data flow y frontera del servicio de IA |
| `05_DOMAIN_MODEL` | Entidades, tipos, transiciones de estado |
| `06_FEATURE_ROADMAP` | Fases / orden de vertical slices |
| `07_ACCEPTANCE_CRITERIA` | Criterios por pantalla + demo path |
| `08_TASKS` | Tareas agrupadas por commit |
| `09_DECISIONS` | 14 decisiones técnicas con su justificación |
| `10_GUARDRAILS` | Lo que **no** se debe hacer |
| `11_PROMPTS` | Plantillas de prompt por feature |
| `12_AGENT_WORKFLOW` | Modos de falla → agente que los previene |

### Agentes como roles acotados — `agents/`

Cada agente es un **guardrail contra un modo de falla concreto** (`docs/12_AGENT_WORKFLOW.md`), no un "asistente genérico".

| Agente | Responsabilidad | Modo de falla que previene |
|---|---|---|
| `product-owner` | Valida scope y valor MVP | Explosión de scope (POS completo, auth, pagos) |
| `rn-architect` | Estructura RN y navegación | Port web→mobile |
| `woki-adapter` | Reusa conceptos de Woki sin portar UI desktop | Port web→mobile |
| `domain-modeler` | Tipos, mock data, reglas puras | Lógica de negocio dentro de la UI |
| `redux-state-agent` | Slices, selectors, estado derivado | Lógica de negocio dentro de la UI |
| `ui-ux-agent` | Consistencia visual POS | Deriva visual (violeta, dark, fintech) |
| `ai-insights-agent` | Insights rule-based detrás de servicio tipado | IA falsa/peligrosa (chatbot, SDK, claves) |
| `feature-implementer` | Implementa vertical slices acotados | Cambios fuera de los archivos permitidos |
| `qa-reviewer` | Criterios, edge cases, regresiones, guardrails | Todos los anteriores (gate final) |

### Disciplina de prompts — `docs/11_PROMPTS.md`

Ningún prompt es "construí la app". Todos siguen la misma plantilla:

```txt
Use the [agent-name] agent.
Read: docs/[relevantes].md + docs/10_GUARDRAILS.md
Task: [tarea específica]
Allowed files: [lista]
Forbidden: [acciones prohibidas]
Acceptance criteria: [checklist verificable]
```

Esto fija **scope, archivos permitidos y criterios de aceptación** antes de tocar código.

### Verificación y anti-alucinación

- **Gate de tipos**: `tsc --noEmit` en cero errores después de cada slice (sin `any`, payloads tipados, uniones para los `reason` de validación).
- **`qa-reviewer`** corre 7 niveles de review (scope, flujo, reglas de negocio, arquitectura, RN, UI, tipos/tests), clasifica hallazgos por severidad y aplica un **"hallucination firewall"**: no afirma que algo funciona/compila sin haberlo corrido o inspeccionado (`Verified by running: ...` / `Not verified: ...`).

### Guardrails en acción (ejemplos reales de este build)

- **Pedido de gradiente violeta**: se pidió el botón con el gradiente naranja→violeta oficial de Tabbi y "sin agregar libs". Chocaba con dos guardrails (`no violet brand` y el de dependencias — un gradiente real necesita `expo-linear-gradient`). En lugar de implementarlo a ciegas, se **explicitó el conflicto y se propuso una alternativa MVP-safe** (pill blanco + ícono *magic wand* de `@expo/vector-icons`, sin lib nueva ni violeta).
- **Regla de horario comercial**: agregar el gate `canOpenTable` requirió **extender la unión `OperationalValidationResult`** con un literal `reason` nuevo en vez de usar `any` — type-safe y verificado por `tsc`.
- **Pase de QA**: encontró y corrigió un bug de estado (una mesa liberada volvía a mostrar su pedido viejo) ajustando la relación selector/reducer vía `table.orderId`, y lo **verificó con un smoke test del bundle (HTTP 200)** — no solo afirmado.

---

## Stack

| Área | Tecnología |
|---|---|
| Runtime | Expo SDK 54 (Expo Go, sin build nativo) |
| UI | React Native 0.81 · React 19 |
| Lenguaje | TypeScript 5.9 (strict) |
| Estado | Redux Toolkit 2.12 · React Redux 9 |
| Datos derivados | Reselect (`createSelector`) |
| Navegación | React Navigation 7 (native-stack) |
| Íconos | `@expo/vector-icons` (FontAwesome5) |
| Datos | Mock local determinista (sin backend) |

No se usan: Ant Design, SCSS Modules, drag & drop, APIs DOM, SDKs de IA, ni claves de API.

---

## Cómo correr

```bash
npm install
npx expo start        # escanear el QR con Expo Go
```

Typecheck:

```bash
npx tsc --noEmit
# en este entorno (node_modules híbrido npm/pnpm) usar:
# node node_modules/typescript/bin/tsc --noEmit
```

> El gate del proyecto es **typecheck en cero errores**. No hay tests automatizados (fuera del scope del MVP).

---

## Arquitectura

Separación estricta de capas; el dominio no conoce React ni Redux.

```
Componentes (presentación)
   ↓
Pantallas (composición, dispatch, navegación)
   ↓
Selectors / Actions (datos derivados memoizados)
   ↓
Slices (mutación de estado)
   ↓
Dominio (tipos, reglas puras, helpers)
   ↓
Mock data  (← futura API)
```

### Estructura

```
src/
  app/          store.ts, hooks.ts (hooks tipados)
  domain/       types, mockData, tableRules, orderRules, time, money  (PUROS)
  features/
    tables/     tablesSlice + tableSelectors
    orders/     ordersSlice + orderSelectors
    products/   productsSlice + productSelectors
    ui/         uiSlice + uiSelectors (filtros/búsqueda)
    insights/   insightTypes, insightService, insightSelectors
  screens/      Floor, TableDetail, ProductPicker, AiInsights, Timeline
  components/    common/ tables/ orders/ products/ timeline/ insights/
  navigation/   AppNavigator (native-stack)
  theme/        tokens (colores/spacing/tipografía) + commonStyles
  services/     aiInsightApi.ts (placeholder de integración)
```

Regla de oro: los componentes **no calculan** totales, ítems pendientes ni ocupación — eso vive en selectors. El dominio no importa React/Redux/UI.

---

## Pantallas

### FloorScreen
Grilla de mesas (2 columnas) con búsqueda, filtro por sector, filtro por estado y empty state. Cada `TableCard` muestra número, sector, estado (color semántico), total y tiempo abierto si aplica. En el header: acceso **"Horarios"** (izquierda → Timeline) e **"Insights"** (derecha → AiInsights). Tocar una mesa abre su detalle.

### TableDetailScreen
Opera una mesa. Muestra info, ítems del pedido y total. La acción primaria depende del estado:

| Estado | Acción | Validación |
|---|---|---|
| available | Abrir mesa | `canOpenTable` (horario + estado) |
| in_use | Enviar comanda | `canSendCommand` (requiere ítems); deshabilitada si no hay pendientes |
| in_use | Cerrar mesa | `canCloseTable`; deshabilitada si hay ítems sin enviar |
| closed | Cobrar y liberar | `canPayTable` (mesa cerrada) |

Las validaciones inválidas se muestran con `Alert` en español (ej. "El local está cerrado.").

### ProductPickerScreen
Búsqueda + filtro por categoría (Comida / Bebida / Café / Postre) sobre el catálogo. Cada `ProductCard` tiene un botón "+": un toque agrega una unidad y vuelve al detalle. Agregar un producto repetido **incrementa la cantidad** (no duplica fila).

### AiInsightsScreen
Panel operacional (no chatbot). Resumen por severidad (`X críticos · Y advertencias · Z informativos`) y tarjetas ordenadas **crítico → advertencia → info**, con borde izquierdo por severidad y "Ver mesa →" cuando aplica.

### TimelineScreen
Línea de tiempo read-only inspirada en Woki: **filas = mesas**, **columnas = horas (09:00–23:00)**. Adaptaciones móviles:
- Color por estado; hora actual marcada con borde naranja.
- Tocar cualquier slot navega al detalle de esa mesa.
- Regla: en horas **posteriores a la actual** solo aparecen mesas **reservadas** (nunca abiertas).
- Glosario fijo con el significado de cada color.
- Fuera del horario (09:00–00:00) muestra banner "El local está cerrado".

Sin drag, resize, zoom, scrubber ni eventos de puntero (scope desechado de Woki desktop).

---

## Datos mockeados

Todo el estado inicial sale de `src/domain/mockData.ts` (objetos planos, deterministas):

- **3 sectores**: Salón, Terraza, Bar.
- **10 mesas**: 3 libres, 2 reservadas, 3 en uso, 2 cerradas. Las `openedAt` son relativas a `Date.now()` para que el "tiempo abierto" y la timeline se vean realistas en cualquier momento.
- **20 productos** en 4 categorías.
- **5 pedidos**: uno por mesa en uso/cerrada, con ítems.

Horario de negocio: `BUSINESS_HOURS = { open: 9, close: 24 }` (en `domain/time.ts`). `canOpenTable` y la Timeline dependen de la hora real del dispositivo, así que **la demo debe correrse dentro de 09:00–00:00**.

---

## Feature mockeada: AI Insights

Los insights se generan **localmente con reglas**, no con un proveedor de IA. La clave es que la **frontera está diseñada para ser reemplazable por un backend real** sin tocar la UI.

### Implementación actual

`generateRuleBasedInsights(tables, orders)` (`features/insights/insightService.ts`) — función pura que aplica reglas sobre el estado:

| Severidad | Regla |
|---|---|
| critical | Mesa `in_use` abierta hace > 90 min |
| critical | Mesa `closed` con pedido `ready_to_bill` (pago pendiente) |
| warning | Mesa `in_use` con pedido `draft` con ítems (comanda sin enviar) |
| info | Sector con ocupación > 80% |

`selectInsights` (memoizado con `createSelector`) la expone a la pantalla; recalcula solo cuando cambian `tables` u `orders`.

### Frontera AI-ready

```
Demo:        App → generateRuleBasedInsights (reglas locales)
Producción:  App → Backend API → proveedor IA → Backend API → App
```

- `src/services/aiInsightApi.ts` es un **placeholder** (`fetchInsights(...)` hace `throw`) que documenta el contrato (`InsightServiceResponse`) y los pasos de integración.
- El tipo de retorno (`Insight[]`) es el mismo en ambos modos, así que migrar a IA real **no requiere cambios** en `InsightCard` ni `AiInsightsScreen`.
- Nunca se llama a OpenAI/Gemini/Claude desde la app móvil, ni se incluyen claves: el proveedor de IA viviría detrás del backend.

---

## Trade-offs y decisiones

- **Mock data + reglas locales en vez de backend/IA real.** Mantiene el scope del demo, evita claves en el cliente y deja la frontera AI-ready explícita y defendible.
- **Redux Toolkit** para estado compartido (mesas/pedidos/productos/UI). Reuso coherente del patrón de Woki (el proyecto web previo); selectors para todo lo derivado.
- **Normalización manual `byId/allIds`** sin `normalizr` — suficiente para datos chicos y más fácil de explicar.
- **`addItemToOrder` con `prepare`**: genera el `orderId` por adelantado para que `tablesSlice` lo enganche vía `extraReducer`. Solo `tablesSlice` importa de `ordersSlice` → sin dependencia circular.
- **Selectors por-fila** (`selectTableTotal`, `selectPendingKitchenItems`) no memoizados por argumento: se llaman dentro de un subcomponente conectado por mesa. Pragmático para listas chicas; se puede migrar a selector-factory si crece.
- **Native-stack** en vez de tabs: navegación más simple y estable; los accesos a Timeline/Insights viven en el header de Floor.
- **Timeline**: `.map()` en vez de `FlatList` anidada (evita el warning de VirtualizedList dentro de ScrollView con ~10 filas), y `ScrollView` vertical + horizontal sin librerías de sincronización.
- **Gate de horario time-dependent**: simple y realista, pero obliga a demostrar dentro del horario comercial.
- **Sin tests automatizados**: fuera del scope del MVP; el gate de calidad es `tsc --noEmit` en cero.

---

## Reuso de Woki y scope descartado

Reusado del proyecto web previo (Woki Reservation Timeline): concepto de mesas/sectores, validación de capacidad, filtros/búsqueda, slots de timeline, helpers de tiempo y estrategia de selectors memoizados.

Descartado por no aportar al demo móvil: Ant Design, SCSS Modules, CSS Grid, drag & drop, resize, context menu, zoom avanzado, scrubber, scroll sync y layout desktop.

**No incluye** (no-goals): POS completo, facturación fiscal, pagos reales, backend, auth/roles, editor de salón, impresoras, push, offline-first ni publicación en stores.
