---
task: "formatacao-saida-auditoria.md"
order: 1
input: |
  - source: Codigo fonte / arquivos da pipeline
output: |
  - report: Checklist detalhado
---

# formatacao-saida-auditoria.md
Agrupa erros detectados e formatados nativamente como relatórios, alertas diretos para as equipes ou tickets estilo kanban aplicáveis.

## Process
1. Ler e ponderar resumos dos achados: Sofia (Sec), Caio (QA), Ulisses (UX).
2. Categorizar o problema: [Crítico], [Atenção], [Otimização].
3. Formatar Saída I: Short Alerting (resumo em markdown pronto para canais tipo Slack).
4. Formatar Saída II: Report técnico em markdown.
5. Formatar Saída III: Tabela estilo tickets CSV/TaskList com esforço (P / M / G).


## Output Format
```yaml
report: "..."
issues:
  - item: "..."
```

## Output Example
> Use as quality reference, not as rigid template.

### Example 0
Scenario: Relatório Consolidante Final
# Resumo Executivo: Revisão de Audit #455
Tivemos 2 alertas altíssimos (Auth Boundary) mapeados na linha de API; 4 ajustes médios visuais (Loading states) e 1 gap logístico que gera N+1 detectado nos logs.

#### Task List (Tickets Exportáveis):
- [ ] [Sec] Aplicar Validação de Expire JWT no handler (Prioridade Alta)
- [ ] [QA] Substituir `.map` sequencial por `.in()` na `getProperty`  (Prioridade Alta)


## Quality Criteria
- [ ] Os tickets gerados não podem gerar ambiguidade ao desenvolvedor.
- [ ] Métrica específica avaliada e confirmada
- [ ] Análise cruzada feita sem deduções fracas.

## Veto Conditions
Reject and redo if ANY are true:
1. Apresentar sugestões sem olhar o repositório ou logs.
2. Dar feedback muito abrangente sem ser específico em linhas e paths.
