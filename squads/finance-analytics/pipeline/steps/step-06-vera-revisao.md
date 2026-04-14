---
execution: inline
agent: vera-revisao
inputFile: squads/finance-analytics/output/formatacao-relatorios-marcelo.md
outputFile: squads/finance-analytics/output/veredito-oficial-vera.md
on_reject: 4
---
# Step 06: Vera Revisão e Compliance

## Context Loading
- `squads/finance-analytics/output/formatacao-relatorios-marcelo.md`
- `squads/finance-analytics/output/estrategia-pricing-paula.md`

## Instructions
### Process
1. Avalie as matemáticas, os conselhos corporativos de pricing elaborados para falhas graves, omissões "Cost-Plus" e verifique a formatação do CSV.
2. Aprove (escrevendo versão final e corrigindo falhas microscópicas diretamente sem devolver ou reescrever completamente).
3. Rejeite se as quebras de tática B2B se impuserem, forçando retorno a Paula (Step 04).

## Output Format
```
## Veredito C-Level
```

## Output Example
Veto pontual por erro crasso na conta base do payback.

## Veto Conditions
1. Rejeitada a quebra da blindagem de Unit Economics da empresa sem o alerta formal documentado ou margem "Over 40" não atingida na proposta cega.
2. Ocultar falhas estruturais nos entregáveis sem cobrar "On Reject" devido. 

## Quality Criteria
- [ ] Veto incisivo se falha estratégica capital encontrada ou emissão do selo C-Level para avançar em qualidade irretocável de CFO.
