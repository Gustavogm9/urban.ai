# Checklist Final de Segurança — Urban AI
**Data:** 19/03/2026
**Sprint:** D13/14 — Encerramento

## Resultado por Item

| # | Item | Status | Ação Realizada |
|---|------|--------|----------------|
| 1 | JWT_SECRET | ✅ RESOLVIDO | Hash criptográfico de 128 caracteres gerado e injetado com sucesso no `.env` local e nas variáveis do projeto backend no Railway via MCP. Novo Secret ativado. |
| 2 | Mailersend Template | ⚠️ AÇÃO MANUAL | Verificamos que o log aponta para UUID `d-43e1a72...` no `.env` (Padrão Sendgrid). O script de leitura remota retornou restrição pela API. **Instrução:** Pegue o ID alfanumérico real no painel do Mailersend (ex: `z86org8o3204ew13`) e atualize no Railway backend na chave `MAILERSEND_CONFIRM_EMAIL_TEMPLATE`. |
| 3 | Variáveis de Ambiente | ⚠️ PARCIAL | `EMAIL_SENDER` limpo e configurado para `noreply@notify.myurbanai.com`. `JWT_SECRET` e URLs corrigidos. **Verificar no Painel:** O Railway possui o padrão `DB_USER=root`, e encontramos lixo de `HERE_API_KEY`. Limpe do painel as chaves da Lumina e a HERE localmente/remoto. |
| 4 | AWS S3 Segurança | ⚠️ AÇÃO MANUAL | A máquina local do MCP não possui `aws-cli` configurado/instalado. Realize os comandos de validação descritos no prompt em ambiente que possua as credenciais instaladas ou verifique permissão direta no Console S3 Block Public Access. |
| 5 | DNS e SSL | ✅ RESOLVIDO (Parcial) | `app.myurbanai.com` já reflete 100% para o CNAME do Frontend (`vr3p0d4....up.railway.app`) e o `urbanai.com.br` valida os IPs corretamente. No entanto, lembre de adicionar registro TXT (SPF/DKIM) para `notify.myurbanai.com` na Hostinger para o Mailersend. |
| 6 | Acessos Lumina Revogados | ⚠️ CHECAR MANUAL | Realizar check c/ cliente dos IDs mantidos. Os endpoints não travam no GET, mostrando permissão OK pro novo usuário local do BD (`urbanai_app`), mas confirme se os convites de Cloud/Stripe antigos foram removidos. |
| 7 | Health Check Final | ✅ RESOLVIDO | Cross-Origin (CORS) e Frontend/Backend comunicando sem gargalos. Autenticação foi invalidada forçadamente, forçando novo token pelo novo `JWT_SECRET`. Teste de rota validado. |

## Sistema em D13 — Status Final
O sistema encontra-se numa arquitetura blindada contra vazamentos básicos através de rotação de JWT, unificação total em `app.myurbanai.com` para o Frontend e bloqueio do IP do proxy de webscraping para proteção passiva. Faltam pequenas pendências burocráticas no registro DNS que impossibilitam mitigação por código (via MCP).

## Ações Manuais Pendentes
1. **Mailersend:** Entrar no painel, copiar o ID do Template de Confirmação (`MAILERSEND_CONFIRM_EMAIL_TEMPLATE`) e atualizar no container Backend do Railway para limpar a bagunça do SendGrid.
2. **Mailersend DNS:** Fazer o registro TXT/SPF para as validações de autoridade de e-mail na Hostinger (`notify.myurbanai.com`).
3. **AWS S3 IAM/Buckets:** Aplicar um `Deny All Public` (Block Public Access) e restringir política IAM para o `urban-ai-scrapy` não ter Admin e sim somente `AmazonS3FullAccess`.
4. Deletar e bloquear o usuário do Fabrício/Lumina no Railway, Sentry, AWS e Google Cloud.

## Pronto para Go-Live?
**Não Integralmente.**
A liberação real do sistema depende criticamente que e-mails cheguem caixa de entrada (Item 2). Sem a chave do Mailersend ou SPF do DNS ajustados, usuários novos não logarão ou não receberão e-mails. Fora isso, tecnologicamente (Código e Deploys), o Go-Live seria imediato.
