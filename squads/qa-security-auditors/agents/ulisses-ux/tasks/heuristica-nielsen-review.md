---
task: "heuristica-nielsen-review.md"
order: 1
input: |
  - source: Codigo fonte / arquivos da pipeline
output: |
  - report: Checklist detalhado
---

# heuristica-nielsen-review.md
Analisa a estruturação do código HTML/CSS/Components frente a convenções do usuário.

## Process
1. Analisar se todos botões de risco têm state clear, modais e feedback pro real-world user.
2. Checar suporte de teclado em componentes chave e atributos ARIA a11y básicos.
3. Garantir flexibilidade no código como REMs no lugar de medidas absolutas engessadas.
4. Revisar as mensagens de loading states e a prevenção ativa de erros no Front.


## Output Format
```yaml
report: "..."
issues:
  - item: "..."
```

## Output Example
> Use as quality reference, not as rigid template.

### Example 0
Scenario: Auditoria Visual em botões Save
### [ALERTA] Usability: Loading State em falta
O botão `SaveProperty` está estático durante chamadas DB que podem demorar. Falta heurística 1 (System Status).
Abaixo indico as modificações corretas nos blocos CSS e boolean do React para habilitar um spinner e desabilitar o re-clique (evitando submit duplicado).


## Quality Criteria
- [ ] Remoção de 'jankness' visual na refatoração proposta.
- [ ] Métrica específica avaliada e confirmada
- [ ] Análise cruzada feita sem deduções fracas.

## Veto Conditions
Reject and redo if ANY are true:
1. Apresentar sugestões sem olhar o repositório ou logs.
2. Dar feedback muito abrangente sem ser específico em linhas e paths.
