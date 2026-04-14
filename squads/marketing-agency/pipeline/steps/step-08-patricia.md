---
execution: inline
agent: patricia-publicacao
inputFile: squads/marketing-agency/output/assets-diogo.md
outputFile: squads/marketing-agency/output/dispache-patricia.md
---

# Step 08: Operação e Disparo Multicanal com Patricia Publicação

## Context Loading

Load these files before executing:
- `squads/marketing-agency/output/assets-diogo.md` — Relatório e URLs para os Assets Visuais finais criados pelo Diogo.
- `squads/marketing-agency/output/copy-carlos.md` — Legenda mestre e textos de Email aprovados na integridade.

## Instructions

### Process
1. Você extrai da entrega anterior exatamente as legendas finais cortadas e o caminho (`path`) da mídia (.png, renderizado).
2. Agende e formule de forma executada via script ou relator os pushes nas Redes Sociais com exatidão da legenda crua sem quebrar espaçamentos.
3. Elabore e dispare Email List no CRM informando os Target/Leads quentes.
4. Confirme que todos os CTAs apotando para a Web App (A landing criada pelo Daniel) estão com a ID de Rastreio (`?utm_` ou link real limpo).
5. Exiba a Tabela Final visualizando os canais impactados na ação da Campanha e a hora do Broadcast efetuado.

## Output Format

O output MUST follow this exact structure:
```
# Broadcast do Dia: Checklist Operacional

**Canal(is) Trabalhados:** [...]

### 1. Instagram / Social Post Executed
- **Arte acoplada:** [Link / Relatorio da Media Subida]
- **Legenda (Markdown Preserved):** 
[Cópia exata sem truncamento]
- **Confirmação CTA:** Check LinkInBio (Redirecionamento Validado).

### 2. Disparo de CRM (Via Resend / SendGrid Tool)
- **Base:** [Qual base? Prospect / Anfitrião / Hub local]
- **Assunto:** [...]
- **URL Disparada Interna:** [Link trackeado da LP do Dev]
- **Tracking:** UTMs acopladas.

🚀 Operação finalizada e dados liberados para mensuração futura do BRUNO. 
```

## Output Example

# Broadcast do Dia: Checklist Operacional

**Canal(is) Trabalhados:** Instagram e Email B2B.

### 1. Instagram / Social Post Executed
- **Arte acoplada:** Slide duplo do Diogo referente ao Modelo D Contraste - Carregamento do Media via App finalizado.
- **Legenda (Markdown Preserved):** 
```
A ironia de encher o calendário enquanto esvazia lucro no bolso.  

Anfitriões se gabando de agendas cheias cometeram o erro de vender o ativo a preço de banana antes da demanda explodir localmente. Apenas a visualização da oferta da sua localidade no radar diário te isenta de lucro cego...
```
- **Confirmação CTA:** A Landing Page está setada no Linktree / LinkBio com UTMs limpos para leitura do DataLayer `(utm_source=instagram)`.

### 2. Disparo de CRM (Via Resend / SendGrid Tool)
- **Base:** Leads Frios B2B Região XPTO (24.000 Contatos).
- **Assunto:** Você esgotou as vagas e se arrependeu financeiramente?
- **URL Disparada Interna:** `/app/pricing-compare` (Link puro com evento GA inserido via Dev Daniel).
- **Tracking:** UTMs atreladas para Bruno BI caçar daqui a 4 dias na base analítica.

🚀 Operação finalizada e dados liberados para mensuração futura do BRUNO. 

## Veto Conditions

Reject and redo if ANY of these are true:
1. Apresentar quebra de formatação no meio da legenda (textos grudados que destroem a Leitura flutuante na Vertical do social/mobile).
2. Ausência de validação de Link - não existe publish se o link foi pra "vazio.com".

## Quality Criteria

- [ ] Houve clareza absoluta de pra QUAL base foi despachado os e-mails?
- [ ] O relatório mostra que houve a proteção (Markdown Check) para assegurar o line-break do Copywriter?
