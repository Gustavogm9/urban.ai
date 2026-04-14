---
task: "auditoria-owasp.md"
order: 1
input: |
  - source: Codigo fonte / arquivos da pipeline
output: |
  - report: Checklist detalhado
---

# auditoria-owasp.md
Rastreio e mapeamento estático de falhas de segurança no código ou nas configurações lidas.

## Process
1. Verificar boundaries de autenticação e injeção (SQL/XSS).
2. Inspecionar uso de segredos, headers e senhas hardcoded.
3. Localizar tratamento inadequado de CORS ou permissões RBAC em aberto.
4. Checar a sanitização de inputs de usuários em controllers ou rotas expostas.
5. Diagnosticar a exposição de erros sensíveis que poderiam causar server leakage.


## Output Format
```yaml
report: "..."
issues:
  - item: "..."
```

## Output Example
> Use as quality reference, not as rigid template.

### Example 0
Scenario: Auditoria na rota de Login e Cookies
### [CRÍTICO] Escalonamento de Privilégio no Handler
O JWT assinado não valida o campo de "exp" no backend. O token pode ser reaproveitado infinitamente após logout se não houver invalidação ativa ou timeout.
**Recomendação Exata:** Adicionar validação de `exp` e blacklist no middleware principal.


## Quality Criteria
- [ ] Zero de taxa de falsos positivos reportados em vulnerabilidades gravíssimas.
- [ ] Métrica específica avaliada e confirmada
- [ ] Análise cruzada feita sem deduções fracas.

## Veto Conditions
Reject and redo if ANY are true:
1. Apresentar sugestões sem olhar o repositório ou logs.
2. Dar feedback muito abrangente sem ser específico em linhas e paths.
