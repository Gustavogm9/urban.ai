---
execution: inline
agent: carlos-copy
inputFile: squads/marketing-agency/output/estrategia-samanta.md
outputFile: squads/marketing-agency/output/copy-carlos.md
---

# Step 03: Redação Publicitária Mestre com Carlos Copy

## Context Loading

Load these files before executing:
- `squads/marketing-agency/output/estrategia-samanta.md` — Wireframe arquitetado contendo os formatos base.
- `squads/marketing-agency/pipeline/data/tone-of-voice.md` — Banco restritivo de modulação vocal da Urban AI.

## Instructions

### Process
1. A partir do wireframe recebido, revise imediatamente o Tom de Voz imposto ("Desafiador/Curto", etc).
2. Desdobre a Peça Longa preenchendo todos os `H1, H2, e Parágrafos (<p>)` mantidos sempre com sentenças ultra-objetivas e separação limpa.
3. Elabore a Peça Curta (Rede social), separando estritamente qual frase estará grafada "Na imagem" (para o Designer) e qual frase estará grafada na "Legenda do post".
4. Verifique contra seus antipatterns locais de nunca usar linguagem de conto de fadas ("solução fantástica"), voltando para furos de margem financeira e dores latentes.
5. Incorpore gatilhos mentais onde o CTA (Action) entra na página.

## Output Format

O output MUST follow this exact structure:
```
# Envelopamento da Copy

## PEÇA LONGA (Landing Page Web Frontend)
**H1:** [Copy]
**Body/Subheader:** [Copy]
**CTA:** [Copy]

**H2 - Seção Secundária:** [Copy]
**Lista (Bullet points p/ Benefícios B2B):**
- [Beneficio]
- [Beneficio]

## PEÇA CURTA (Assets de Social Media p/ Designer e Publisher)
**Texto Para Embutir na Arte / HTML Visual:**
[Texto em caps, negrito, slide a slide se for carrossel, layout D/F, etc.]

**Legenda do Post (Patricia Publicação):**
[Corpo do texto para os Followers]

> **Instrução pro Dev:** Daniel, por favor adote CSS com padding respirado ao encadear os Bullets.
> **Instrução pro Designer:** Diogo, garanta que no slide 2 a palavra X fique com a coloração Acento do Brand pra explodir na cara dopamina do Lead.
```

## Output Example

# Envelopamento da Copy

## PEÇA LONGA (Landing Page Web Frontend)
**H1:** O Balde Furado dos Anfitriões Manuais de Final de Semana
**Body/Subheader:** Fechar sua agenda 90 dias antes não é um troféu, é o indicativo de que você vendeu pelo teto mínimo da rua. Entenda o prejuízo que a ausência de cruzamento de dados de demanda esconde e como o Rastreamento de IA te lucra a noite toda.
**CTA:** Calcular Receita Perdida (Live Demo)

**H2 - Seção Secundária:** Automação baseada em Tráfego Regional, não em planilhas cegas.
**Lista (Bullet points p/ Benefícios B2B):**
- Interceptação diária via API das agendas Eventim e Sympla limitando min-stay e travando repasses defasados.
- Visão Dashboard em Tempo Real: de Fatores da Concorrência do seu ZipCode direto no smartphone, tudo traduzido de dados complexos para visual simples.

## PEÇA CURTA (Assets de Social Media p/ Designer e Publisher)
**Texto Para Embutir na Arte / HTML Visual:**
(Slide Lado Errado - Vermelho/Cinza): Sexta, 20h. Preço fixo na sua Casa: R$220. Show da Taylor Swift confirmado de relance e os hotéis fecharam cotas locais. Você esgotou vagas e vibrou.
(Slide Lado Acerto - Verde/Neom): Bairro congestionado detectado, Motor ativou. Seu preço flutuou em autolock pra R$480. Zero cliques seus enquanto bebe vinho. Margem otimizada com Urban AI.

**Legenda do Post (Patricia Publicação):**
A ironia de encher o calendário enquanto esvazia lucro no bolso.  

Anfitriões se gabando de agendas cheias cometeram o erro de vender o ativo a preço de banana antes da demanda explodir localmente. Apenas a visualização da oferta da sua localidade no radar diário te isenta de lucro cego. 

Quantas centenas de reais você rasgou mês passado ignorando o calendário nacional?
Acesse a aba de pricing no LINK na bio e simule o ganho regional da sua casa de temporada ⚡🏨

> **Instrução pro Dev:** Daniel, atente-se a colocar o CTA no top section (Above the Fold) antes da lista de eventos, não o esconda!
> **Instrução pro Designer:** Diogo, Template D Contraste por favor na arte visual. O lado vermelho precisa causar angústia pesada. Cor forte, texto enorme 32px e nada mais.

## Veto Conditions

Reject and redo if ANY of these are true:
1. Parágrafos contiverem mais do que 4 frases ininterruptas configurando text-walls massacrantes.
2. Não separar explicitamente o texto visual da legenda ("o que é p designer e o que é pra patricia social media").

## Quality Criteria

- [ ] Houve quebra estruturada e polida de parágrafos entre blocões para acelerar a leitura "Scanning" do usuário (Skipping technique)?
- [ ] O vocabulário "RevPAR, ADR e Flutuante" ou derivados está perene no texto, garantindo tom de voz maduro?
- [ ] Houve um Call to Action solitário, sem múltiplas requisições?
