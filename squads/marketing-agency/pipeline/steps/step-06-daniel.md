---
execution: inline
agent: daniel-desenvolvedor
inputFile: squads/marketing-agency/output/copy-carlos.md
outputFile: squads/marketing-agency/output/code-daniel.md
---

# Step 06: Implantação e Componentização com Daniel Dev

## Context Loading

Load these files before executing:
- `squads/marketing-agency/output/copy-carlos.md` — Copy da Peça longa pronta (Wireframe base web da página principal aprovado em checkpoint).

## Instructions

### Process
1. Transforme os requisitos de Texto Web Longo e a indicação visual de Cores de forma codificada mentalmente para Next.js App Router estruturado + Tailwind CSS.
2. Demonstre como a página de Landing Page (ou tela da features) seria formatada e declarada nos componentes em um Commit.
3. Garanta que o botão Call-to-Action possui as ID Labels configuradas base pra o time de BI conseguir medir conversão posterior via gerenciador de tags.
4. Aplique SSR (Server Side Rendering) e carregamento semântico (`<main>`, `<section>`, `<h1>`) se atracando firmemente aos rigores de performance.

## Output Format

O output MUST follow this exact structure:
```
# Release Notes Front-End: Landing Page Implementada

## 1. Commit e Arquitetos (Next.js / Tailwind)
**Rota Alvo da Plataforma:** `/app/landing-campaign/...`

**Extrato Estrutural Semântico (TSX simplificado do Hero):**
```tsx
// [Mostrar o snippet do componente hero/section aqui exibindo clareza estrutural com as Tags exigidas via Tailwind]
```

## 2. Injeção Visual Tailwind Empregada
[Explicação rápida das classes Tailwind que respeitaram o Design B2B. Ex: `bg-slate-900 border-green-500` e tipografia principal para contrast ratio.]

## 3. SEO e Analytics Layer Prontos
- Tag instalada do CTA para Rastreio Bruno BI: `id="..."` `data-event="..."`
- SSR Performance (First Contentful Point mantido no limite B2B).
```

## Output Example

# Release Notes Front-End: Landing Page Implementada

## 1. Commit e Arquitetos (Next.js / Tailwind)
**Rota Alvo da Plataforma:** `/app/pricing-compare/page.tsx`

**Extrato Estrutural Semântico (TSX simplificado do Hero):**
```tsx
import { ArrowRight } from "lucide-react";

export default function PricingHeroFeature() {
  return (
    <main className="flex flex-col min-h-screen bg-slate-950 text-slate-50 items-center justify-center p-8">
      <section className="max-w-4xl text-center space-y-6">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
          O Balde Furado dos Anfitriões de Fim de Semana
        </h1>
        <p className="text-xl text-slate-300">
          Você não é máquina para ficar girando planilhas, a cada 5 horas que seu calendário segue cego de dados, centenas escurecem do seu bolso.
        </p>
        <div className="pt-8">
            <button 
              id="cta-simular-perda-agora" 
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-4 px-8 rounded-full inline-flex gap-2 items-center transition-all duration-300"
            >
              Simular Receita Perdida Acumulada <ArrowRight size={20}/>
            </button>
        </div>
      </section>
    </main>
  );
}
```

## 2. Injeção Visual Tailwind Empregada
Apliquei classes globais Dark Theme pesadas `bg-slate-950` unidas a uma cor Urban Neon `bg-emerald-500`. Isto prende de cara os leitores B2B focando absurdamente o peso do olhar para o botão primary Action que preenche a cota do contraste (LWC 4.5).

## 3. SEO e Analytics Layer Prontos
- Tag instalada do CTA para Rastreio Bruno BI: `id="cta-simular-perda-agora"` instalado garantido para puxada do Tracking de Conversões.
- H1 Semântico único cravando a KeyWord e garantindo Indexabilidade Core Web Vitals sólida de carregamento sem scripts inúteis acoplados (No Swipers JS).

## Veto Conditions

Reject and redo if ANY of these are true:
1. O código FrontEnd entregue apresentar misturas de framework antigos (JSX solto estilo React-Class), usamos e abordamos App Router / Tailwind.
2. O botão vital do formulário não receber ID de tracking do Marketing prevenida.

## Quality Criteria

- [ ] O Extrato TSX exibe as cópias limpas extraídas do output do Carlos da rodada de aprovação?
- [ ] O componente obedece semânticas Web nativa (`main, section, header`) invés do velho erro de `div` hell infernal?
- [ ] A Injeção analítica pra BI foi documentada?
