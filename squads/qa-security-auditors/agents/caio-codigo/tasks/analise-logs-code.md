---
task: "analise-logs-code.md"
order: 1
input: |
  - source: Codigo fonte / arquivos da pipeline
output: |
  - report: Checklist detalhado
---

# analise-logs-code.md
Executa comandos de Log via dev tools ou CLI e relaciona com commits locais ou falhas.

## Process
1. Verificar arquivos modificados recentemente (via run_command ou read).
2. Obter logs da Railway em ambientes de produção ou staging em janelas críticas.
3. Identificar picos de erro (500s) e tracing de exceção que levem direto ao arquivo/linha originais.
4. Avaliar redundância ou gargalos no Big-O dos métodos apontados.
5. Produzir o diagnóstico de causa base.


## Output Format
```yaml
report: "..."
issues:
  - item: "..."
```

## Output Example
> Use as quality reference, not as rigid template.

### Example 0
Scenario: Memória ou N+1 detectado nas leituras do log
### Diagnóstico de Log Railway
Identificamos sobrecarga nas requests `/properties`. O N+1 está sendo derivado de um map mal-elaborado que realiza 30 queries individuais ao invés de buscar os blocos `where in ()`.
**Causa-Raiz:** `src/actions/admin.ts` Linha 122.


## Quality Criteria
- [ ] Ligar 100% dos erros catalogados à linha causadora original.
- [ ] Métrica específica avaliada e confirmada
- [ ] Análise cruzada feita sem deduções fracas.

## Veto Conditions
Reject and redo if ANY are true:
1. Apresentar sugestões sem olhar o repositório ou logs.
2. Dar feedback muito abrangente sem ser específico em linhas e paths.
