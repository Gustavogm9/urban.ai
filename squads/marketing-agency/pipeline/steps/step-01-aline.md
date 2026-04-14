---
execution: inline
agent: aline-analise
outputFile: squads/marketing-agency/output/dossie-aline.md
---

# Step 01: Pesquisa de ICP e Dores com Aline Análise

## Context Loading

Load these files before executing:
- `squads/marketing-agency/pipeline/data/research-brief.md` — Briefing estático contendo dores gerais levantadas anteriormente.

## Instructions

### Process
1. Solicite do usuário (se ainda não preenchido) ou extraia do briefing qual é a sazonalidade alvo atual (ex: um fim de semana comum, ou um feriado, evento específico na cidade).
2. Vasculhe ou simule análise na web sobre o que os anfitriões estão discutindo referente às tarifas neste período no PriceLabs/Wheelhouse.
3. Elabore o "Dossiê Executivo de Dores" isolando a dor principal (ex: Dinheiro deixado na mesa, falta de tempo para precificar) que será o fio condutor da campanha.
4. Identifique o Vocabulário (Dicionário) usado por eles a ser abordado pelo time.

## Output Format

O output MUST follow this exact structure:
```
# Dossiê Executivo: [Tema Central]

## 1. Dor Principal e Ângulo
- **Qual é o incômodo ativo**: [Descrição da dor B2B]
- **Abordagem da Urban AI**: [Como resolver através do dinamismo de IA]

## 2. Benchmark (Concorrência)
[Análise rápida de como o adversário não resolve isso de forma simples].

## 3. Dicionário Operacional
- [Termo 1]
- [Termo 2]
- [Termo 3]

## 4. Encaminhamento para Samanta
[Instruções de porquê focar esse vetor no SEO e Estratégia de Conteúdo]
```

## Output Example

# Dossiê Executivo: Perda de Receita na Sexta Feira

## 1. Dor Principal e Ângulo
- **Qual é o incômodo ativo**: Anfitriões estão esvaziando o calendário antes da hora por R$ 200 a diária, enquanto vizinhos com IA cobram R$ 500. Há muito medo de ficar sem hóspede, causando precificação base barata e destrutiva em feriados.
- **Abordagem da Urban AI**: Exibir a tranquilidade de não precisar ser um mago das planilhas para maximizar a margem; a IA puxa os shows do Sympla local e inflaciona a rua.

## 2. Benchmark (Concorrência)
O PriceLabs aborda isso com jargões e setups complexos que intimida o dono de casa leigo e foca excessivamente no gerente avançado. Faltam ferramentas visuais ágeis.

## 3. Dicionário Operacional
- Taxa Base Descartável
- Lead Time
- Receita Estagnada
- ADR Otimizado

## 4. Encaminhamento para Samanta
Foque e construa as URLs e peças centrais visando bater a objeção "Meu preço base já dá lucro", quebrando o ego focado no medo temporal de gerenciar via planilhas de Excel.

## Veto Conditions

Reject and redo if ANY of these are true:
1. O output é puramente teórico e não lista uma "Dor" plausível de hotelaria real.
2. O Dicionário utiliza termos infantis ou genéricos (ex: "cliente", em vez de "anfitrião/hóspede").

## Quality Criteria

- [ ] A dor principal foca em algo financeiro ou temporal?
- [ ] O dicionário operacional trouxe 3 termos tangíveis?
- [ ] O repasse sugere um norte claro pro Estrategista que vem a seguir?
