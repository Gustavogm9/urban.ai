---
execution: inline
agent: diogo-design
inputFile: squads/marketing-agency/output/copy-carlos.md
outputFile: squads/marketing-agency/output/assets-diogo.md
---

# Step 05: Composição Visual HTML e assets com Diogo Design

## Context Loading

Load these files before executing:
- `squads/marketing-agency/output/copy-carlos.md` — Cópias Mestre (Legendas, HTML embed text e diretrizes aprovadas).
- `squads/marketing-agency/pipeline/data/visual-identity.md` — Manual da marca e diretórios referenciados dos 6 templates prontos (A ao F).

## Instructions

### Process
1. A partir dos textos divididos pelo Carlos Copy "Textos a embalar no Visual", decida e indique de imediato qual das matrizes vai usar: Template A (Editorial), B (Guia), C (Dash), D (Contraste), E (Prova) ou F (Checklist). 
2. Atualize localmente via ferramenta ou simule a indicação exata de código HTML preenchendo o texto do Template alvo onde existiam as variáveis cruas de Título e Subtítulos mantendo legibilidade alta. 
3. Caso a copy seja muito longa para um só slide sem perder o tamanho da fonte (+42px ideal h1, +30px h2), fraciona em "Carrosseis" Slides 1, 2 e 3 de forma fluída.
4. Explique e compile os caminhos do material de saída formatado com exatidão da paleta de cores B2B Dark Theme.

## Output Format

O output MUST follow this exact structure:
```
# Assets Visuais (Social e UI Elements)

*Material Processado e Renderizado com Sucesso.*

## 1. Peça Primária [Nome/Rede Social]
**Template Escolhido:** [A, B, C, D, E ou F]
**Tamanho de Tela:** 1080x1440 Portrait (Padronizado Brand Book).

**Estrutura Adaptada nas Mídias (HTML / PNG):**
- **Arte/Slide 01:**
   **Fundo:** [Cor do Fundo ex: Dark Theme]
   **Texto Renderizado:** "[...]" 
   **Cores e Destaques:** Palavras em Neon/Accent Green.

- **Arte/Slide 02 etc:**
   **Fundo:** [...]
   **Texto Renderizado:** "[...]" 

## 2. Relatório de Execução de UX Design
[Mini report de Por que usou essa fonte, esse padding e como isso atende as regras visuais rígidas do repositório, deixando avisos prontos para o Code Development do Daniel caso tenha links ou imagens].
```

## Output Example

# Assets Visuais (Social e UI Elements)

*Material Processado e Renderizado com Sucesso.*

## 1. Peça Primária [Post Instgram O Abismo da Quinta]
**Template Escolhido:** Template D (Contraste Lado a Lado) adaptado para Redes Verticais.
**Tamanho de Tela:** 1080x1440 Portrait (Padronizado Brand Book).

**Estrutura Adaptada nas Mídias (HTML / PNG):**
- **Arte/Slide 01:**
   **Fundo:** Metade Superior Vermelho Escuro "Alerta" e Metade Inferior "Urban Dark Base".
   **Texto Renderizado:** "Você vs. O Algoritmo." "Por que seu calendario te traiu..."
   **Cores e Destaques:** A palavra "traiu" foi submetida em weight Bold a 60px para esmagar a barreira de foco em quem desliza. 

- **Arte/Slide 02:**
   **Fundo:** Urban Accent Green puro, brilhante mas com baixo brilho branco central para não ofuscar. Letras Negras Dark puro. Texto descrevendo a solução da flutuação limpa. Margem lateral protegida de cliques (Safety Zone).

## 2. Relatório de Execução de UX Design
O espaçamento imposto de padding horizontal obedeceu rigorosamente os `60px` exigidos pela diretriz mobile-first, impossibilitando que o texto corte em iphones de Notch agressivos. Eu usei um corte na preposição para descer a Headline pro Slide 2 com fontes `48px`, pois meter a mensagem gigante que o Carlos pediu esmagaria a visualização abaixo da margem legível de 20px. Pronta para Patricia Publicar.

## Veto Conditions

Reject and redo if ANY of these are true:
1. O texto inserido na arte descrita estourar as margens visuais de espaçamento causando textos diminutivos ilegíveis em dispositivos menores.
2. Usar Templates soltos da cabeça do agente ignorando o pacote restrito fechado de Brand templates da agência (A ao F). Mantenha a restrição!

## Quality Criteria

- [ ] A cor do Destaque (Accent color) foi listada como utilizada pra guiar os olhos na palavra principal pedida pelo Carlos?
- [ ] Houve adaptação em carrossel e fracionamento da arte se o texto era espesso demais para uma placa única HTML?
- [ ] O Tom dark e inovador / premium se manteve fiel invés de peças genéricas e ruidosas?
