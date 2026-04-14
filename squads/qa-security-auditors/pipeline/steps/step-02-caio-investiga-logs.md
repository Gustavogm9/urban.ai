---
execution: subagent
agent: caio-codigo
inputFile: squads/qa-security-auditors/output/research-focus.md
outputFile: squads/qa-security-auditors/output/saida-step-2.md
---

# Step 02: Caio investiga Logs

## Context Loading
Load these files before executing:
- `squads/qa-security-auditors/output/research-focus.md` — Direcionamento do foco

## Instructions
### Process
1. Ler o input.
2. Investigar com MCP ou lendo código as validações (Sec, UX ou QA).
3. Produzir a saída de acordo com o template.

## Output Format
```
# [CATEGORIA] Título

[Análise...]
[Comandos, Prints ou Snippets de Correção]
```

## Output Example
# [CRÍTICO] Falha de Autenticação na API
O módulo X está exposto por faltar RLS na Supabase, corrigir em X.ts...

## Veto Conditions
Reject and redo if ANY of these are true:
1. Recomendar libraries inúteis
2. Falar generalidades sem atrelar a um arquivo

## Quality Criteria
- [ ] Específico, técnico e utilitarista.
- [ ] Atendeu às orientações de voz do agente.
