---
execution: inline
agent: bruno-bi
inputFile: squads/marketing-agency/output/dispache-patricia.md
outputFile: squads/marketing-agency/output/growth-report-bruno.md
---

# Step 09: Growth & Feedback Loop com Bruno BI

## Context Loading

Load these files before executing:
- `squads/marketing-agency/output/dispache-patricia.md` — Report da carga disparada online (Onde buscar os dados de CTR).

## Instructions

### Process
1. Você atua como o pós-venda. Após X dias do disparo (fictício, gerado em dados injetados via usuário na timeline atual ou Web Searches simuladas / API Local).
2. Trace um quadro comparativo (Uma tabela markdown de Impacto) relacionando o Disparo de Patricia e Clicks VS as Form Conversions que desceram na landing page criadas/medidas pelas tags do Daniel.
3. Se hover A/B teste rolando, decrete o **WINNER** inequivocamente e mande o Daniel jogar a branch perdedora no lixo.
4. Despeje um Insight de ação futura imediata para retroalimentar a squad "Na próxima rodada, Aline e Samanta NÃO façam mais abordagem Y, foquem na Z que deu dobro do engajamento."

## Output Format

O output MUST follow this exact structure:
```
# Data Post Mortem: Retrosprectiva

## Scorecard (Métricas Centrais)
| Origem (Ads/Social) | Visualizações | Clicks Reais | Final Forms Lead | Feedback Algoritmo |
| --- | --- | --- | --- | --- |
| ... | ... | ... (%) | ... (%) | ... |
| ... | ... | ... (%) | ... (%) | ... |

## Análise Profunda
[O que foi descoberto? O que foi bem, o que fracassou miseravelmente?]

## A/B Testing Results
- **Teste Mapeado:** [Ex: Título Vermelho vs Título Verde da Landing Page].
- **Veredito:** [Winner Mode e % do boost].

## DIRETRIZ REUSÁVEL (Insight P/ Squad)
Atenção Agência: A próxima pesquisa e pauta *DEVERÁ* focar nisso [...porque...].
```

## Output Example

# Data Post Mortem: Retrosprectiva

## Scorecard (Métricas Centrais)
| Origem (Ads/Social) | Visualizações | Clicks Reais | Final Forms Lead | Feedback Algoritmo |
| --- | --- | --- | --- | --- |
| Ig Feed Organico | 12.000 Imps | 280 (2.3% CTR) | 28 Novos | Otimizado 🟡 |
| Lista CRM Bounce/Leads | 2.500 Envios (O: 42%) | 110 (4.4% CTR) | 48 Novos | High Performance 🟢 |

## Análise Profunda
A cópia agressiva em e-mail obteve respostas extremamente engajáticas acima da média do setor tech hotelaria. Todavia o visual Contraste (Diogo Visual) no Instagram parou no teto de vidro do algortimo orgânico. Faltou tráfego Top-Of-Funnel bruto.

## A/B Testing Results
- **Teste Mapeado:** A/B na Landing Page sobre "Qual Botão converte" (Renda Perdida x Ver Gráficos de Pricing).
- **Veredito:** A variante 'Renda Perdida' obteve Winner Status cravando 22% acima de engajamento base. As tags do Daniel acusaram disparo exato da URL /signup-free sem interrupuções.

## DIRETRIZ REUSÁVEL (Insight P/ Squad)
Atenção Agência: A próxima pesquisa da Aline DEVERÁ garimpar não só prejuizos mensais, mas relatos de anfitriões enlouquecidos lidando com hóspedes que "exigiram" reembolso na sexta-feira e causaram drop de receita final. O gatilho forte que pegou nas CTR's mostra que o público está focado na Conta Bancária e detesta gestão de minúcias de App. O próximo conteúdo deve espelhar isso e Daniel já deve travar o Título Win na Home.

## Veto Conditions

Reject and redo if ANY of these are true:
1. Apresentar dados felizes sem declarar nenhuma crítica construtiva para o loop do sistema (O Analista BI sempre descobre uma deficiência para atacar na proxima semana).
2. Não ditar quem foi o vencedor da Variant A/B se um teste for pautado.

## Quality Criteria

- [ ] O visual do MD exibe o Scoreboard claro pro chefe de Marketing aprovar em 10 segundos?
- [ ] Há ordens explícitas e claras orientando a pesquisadora da Rodada Que Vem na diretriz?
