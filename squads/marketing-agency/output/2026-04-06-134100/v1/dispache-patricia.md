# Broadcast do Dia: Checklist Operacional

**Canal(is) Trabalhados:** Instagram (Feed & Stories) e Disparo Direto (Base B2B CRM).

### 1. Instagram / Social Post Executed (POST 1 - Problema)
- **Arte acoplada:** Arquivos `post-1-reflexao-slide-1.html`, `post-1-reflexao-slide-2.html` e `post-1-reflexao-slide-3.html` no Asset Diogo (Carrossel Dark B2B, formato Portrait 1080x1440 cravado e importado via API visual).
- **Legenda (Markdown Preserved):** 
```text
A ironia de esgotar reservas enquanto esvazia lucro no bolso.  

Sorte e Instinto não existem no mercado profissional de acomodações rápidas da nova geração. O nome verdadeiro do lucro é "Lead Time" atrelado à Demanda Local. 

Muitos anfitriões se orgulham de fechar seus finais de semana na própria segunda-feira ou com meses de antecedência mantendo a mesma tarifa base sem pestanejar. Tudo movido puramente ao famoso medo de "ficar com a casa parada". 
A triste verdade? Quem comprou barato sabia o que ia acontecer na região. E quando você acordar, os gestores guiados a dados estarão cobrando o dobro do valor exato nos quartos vizinhos.

Fique de olho amanhã para um anúncio vital para o seu caixa.
```
- **Confirmação CTA:** N/A (Este post específico atua em topo de funil para o lançamento no dia seguinte).

### 2. Instagram / Social Post Executed (POST 2 - Lançamento)
- **Arte acoplada:** Asset do Post 2, validado esteticamente para a Era da Precificação Oculta.
- **Legenda (Markdown Preserved):** 
```text
O trabalho braçal na hotelaria amadora acabou. Chegou a hora de faturar como grandes redes de Revenue Management.

Lançamos oficialmente a tecnologia de automação **Urban AI**. 🚀🏢

Uma inteligência analítica que rastreia ativamente a cadeia de eventos local e regula milimetricamente os preços e tarifas diárias de sua carteira, para certificar que seus imóveis recebam os ajustes exatos antes mesmo da concorrência local entender por qual motivo estão lotando. Não é mais apenas ter uma "casa bonita", é defender agressivamente o Teto Máximo de Faturamento da via.

Nós encurralamos a demanda. Você só revisa o painel subindo.

🔗 Acesse agora no Link da Bio, conecte seu portfólio no Painel Autônomo e blinde-se na próxima alta temporada. Sem setups complexos que os sistemas arcaicos de Excel empurram. Apenas conecte e escale.
```
- **Confirmação CTA:** Link na Bio atualizado sob o endpoint seguro (`https://urba-ai.vercel.app/lancamento?utm_source=instagram&utm_medium=social_post&utm_campaign=lancamento_q2`). Payload testado com status 200 OK via redirect de linktree local.

### 3. Disparo de CRM (Via Resend Integrado)
- **Base:** Base de Anfitriões prospects High-Ticket resgatados do Mailing (14.200 Contatos em Lista Filtrada "Premium Leads").
- **Assunto:** Comemorou casa cheia? Talvez você tenha perdido 30% da receita do fim de semana.
- **Corpo Extraído:** Envelopamento HTML via Carlos Copy atrelado à Landing Page de Lançamento hospedada.
- **URL Disparada Interna:** Endpoint Landing Page trackeado via email client `https://urba-ai.vercel.app/lancamento?utm_source=resend_email&utm_campaign=lancamento_q2` 
- **Tracking / Confirmação:** UTMs acopladas. Teste interno confirmou renderização limpa do `id="cta-piloto-automatico-hero"` no front.

🚀 Operação de Dispatch finalizada. Disparos agendados nos horários requisitados (15h e 19h correspondentes no fuso GMT-3). Dados liberados em D-0 para mensuração futura do BRUNO BI.
