# 12_AGENT_WORKFLOW.md — Agent Workflow

## Purpose

Agents are guardrails against specific failure modes.

## Failure modes and agents

### Scope explosion

Symptom: Claude starts building a full POS, auth, real billing, payments or backend.

Use: product-owner, qa-reviewer.

### Web-to-mobile port

Symptom: Claude copies Woki desktop patterns into React Native.

Use: woki-adapter, rn-architect, ui-ux-agent.

### Logic inside UI

Symptom: components calculate totals, transitions, validations or insights.

Use: domain-modeler, redux-state-agent, qa-reviewer.

### Fake/dangerous AI

Symptom: chatbot UI, provider SDKs or API keys.

Use: ai-insights-agent, product-owner, qa-reviewer.

### Visual drift

Symptom: fintech/SaaS, dark, violet, tiny, over-designed or desktop-like UI.

Use: ui-ux-agent.

## Agent prompt template

```txt
Use the [agent-name] agent.

Read:
- docs/[relevant-doc].md
- docs/10_GUARDRAILS.md

Task:
[Specific task]

Allowed files:
- [list files]

Forbidden:
- [list forbidden actions]

Acceptance criteria:
- [clear checklist]

Do not edit unrelated files.
Do not add dependencies unless justified.
Do not implement future scope.
```

## Review checklist

Before accepting agent output, check:

- Did it follow allowed files?
- Did it add forbidden scope?
- Did it invent requirements?
- Did it add dependencies?
- Did it mix UI and business logic?
- Did it preserve mobile-first assumptions?
- Did it preserve Expo compatibility?
- Did it update docs if architecture changed?

## Strong instruction

If documentation and user request conflict, stop and ask for clarification unless the user explicitly overrides docs.

If a feature is outside MVP, propose a smaller MVP-safe alternative.

If unsure about Tabbi behavior, do not invent. Use documented direction and keep the MVP generic.
