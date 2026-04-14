---
execution: subagent
agent: rita-pesquisa
inputFile: squads/finance-analytics/output/research-focus.md
outputFile: squads/finance-analytics/output/dados-pesquisa-rita.md
model_tier: fast
---
# Step 02: Rita Referência (Market Research)

## Context Loading
- `squads/finance-analytics/output/research-focus.md`

## Instructions
### Process
1. Realize buscas web focadas nas necessidades demandadas no input (benchmarks SaaS de travel tech).
2. Construa a listagem clara de achados, diferenciando a estratégia de empacotamento cobrada (PriceLabs, etc) das funcionais cosméticas.
3. Produza o arquivo compilado com fontes URLs irretocáveis.

## Output Format
```
# Pesquisa do Benchmark:
[texto]
```

## Output Example
Ver arquivo reference em discovery e example.

## Veto Conditions
1. Ausência de URLs base comprobatórios.
2. Ignorar guidelines básicas.

## Quality Criteria
- [ ] Informação com relevância de negócio, não marketing fútil.
