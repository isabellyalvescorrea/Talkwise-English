# Talkwise English — Landing page de captura de leads

Landing page de alta conversão para um curso de inglês online, com foco em
**captura de lead por e-mail** (isca digital). Não há back-end nem banco de
dados: a página é 100% estática e pode ser publicada na Vercel sem nenhuma
configuração extra.

---

## Stack

| Camada        | Escolha                                              |
| ------------- | ---------------------------------------------------- |
| Framework     | Next.js 16 (App Router) + React 19                   |
| Linguagem     | TypeScript (modo estrito)                            |
| Estilos       | CSS Modules + tokens em CSS custom properties        |
| Tipografia    | `next/font` com Sora (títulos) e Inter (corpo)       |
| Ilustrações   | SVG autoral, escrito à mão em componentes React      |
| Hospedagem    | Vercel (build padrão `next build`)                   |

Sem Tailwind, sem UI kit e sem dependências de runtime além do próprio Next —
a página inteira é gerada estaticamente no build (`○ Static`).

---

## Como rodar

```bash
npm install
npm run dev      # http://localhost:3000
```

Outros scripts:

```bash
npm run build      # build de produção
npm run start      # serve o build de produção
npm run lint       # ESLint (regras do Next + React Hooks)
npm run typecheck  # tsc --noEmit
```

---

## Deploy na Vercel

1. Importe o repositório em <https://vercel.com/new>.
2. Não altere nada: a Vercel detecta Next.js e usa `next build` automaticamente.
3. (Opcional) Defina `NEXT_PUBLIC_SITE_URL` com o domínio final do projeto. Ela
   alimenta os metadados, o `robots.txt` e o `sitemap.xml`. Deixar em branco é
   seguro: `lib/site.ts` cai no domínio de produção que a própria Vercel injeta.

Nenhum `vercel.json` é necessário.

---

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e ajuste conforme o caso. Todas são
opcionais — sem nenhuma delas o site funciona normalmente.

| Variável                   | Para que serve                                                                 |
| -------------------------- | ------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`     | URL canônica usada em metadados, Open Graph, JSON-LD, `robots.txt` e `sitemap.xml`. Aceita com ou sem `https://`. Se estiver vazia ou inválida, o site cai no domínio de produção da Vercel e, na ausência dele, em `https://talkwise-english.vercel.app` — o build nunca quebra por causa dessa variável. |
| `NEXT_PUBLIC_FORM_ENDPOINT`| Endpoint de um serviço de formulários (ex.: Formspree). Quando definido, o formulário faz `POST` real. |

### Formulário de captura

O componente `components/LeadForm.tsx` tem dois modos:

- **Sem `NEXT_PUBLIC_FORM_ENDPOINT`** (padrão): valida os campos, exibe o estado
  de carregamento e mostra a confirmação de sucesso — sem enviar nada para lugar
  nenhum. É o modo ideal para portfólio e demonstração.
- **Com `NEXT_PUBLIC_FORM_ENDPOINT`**: envia um `POST` com
  `{ nome, email, origem, material }` em JSON para o endpoint informado.
  Para usar o Formspree, crie um formulário e aponte a variável para
  `https://formspree.io/f/SEU_ID`.

O formulário também traz um campo-armadilha (*honeypot*) chamado `empresa`,
invisível para pessoas e preenchido por robôs; quando preenchido, o envio é
descartado silenciosamente.

---

## Estrutura

```
app/
  layout.tsx           metadados, fontes, JSON-LD (Organization, Course, FAQPage)
  page.tsx             composição das seções da landing page
  globals.css          tokens de design, reset, tipografia e primitivas (.btn, .container…)
  icon.svg             favicon
  opengraph-image.tsx  imagem de compartilhamento 1200×630, gerada no build
  robots.ts            robots.txt
  sitemap.ts           sitemap.xml
components/
  Header.tsx      menu fixo, âncoras, seção ativa e menu hambúrguer
  Hero.tsx        título, CTA principal e prova social
  Benefits.tsx    três diferenciais
  Method.tsx      método em quatro etapas
  About.tsx       história da escola, números e professores
  LeadForm.tsx    formulário de captura (usado duas vezes)
  Testimonials.tsx
  Faq.tsx         acordeão acessível
  Footer.tsx
  Icons.tsx       ícones de linha em SVG
  Illustrations.tsx  ilustrações flat autorais
  Reveal.tsx      revelação em scroll (progressive enhancement)
lib/
  content.ts      todo o conteúdo editorial em um único arquivo
  site.ts         resolução tolerante a falhas da URL canônica do site
```

Para trocar textos, depoimentos, perguntas do FAQ ou professores, edite apenas
`lib/content.ts`.

---

## Identidade visual

| Token                | Valor     | Uso                                             |
| -------------------- | --------- | ----------------------------------------------- |
| `--petrol`           | `#1B3A5C` | cor primária, títulos, seções escuras           |
| `--coral`            | `#FF6B4A` | CTAs e destaques                                |
| `--coral-ink`        | `#B43C1C` | coral escurecido, para **texto** sobre fundo claro |
| `--coral-onDark`     | `#FF9E85` | coral clareado, para **texto** sobre azul petróleo |
| `--bg`               | `#FAF9F6` | fundo off-white                                 |
| `--ink`              | `#22262B` | texto (grafite, nunca preto puro)               |

Tipografia: **Sora** nos títulos, botões e rótulos; **Inter** no corpo de texto.

### Acessibilidade

- Todos os pares de cor usados em texto passam no WCAG 2.1 AA (contraste ≥ 4,5:1).
  Os botões coral usam tinta grafite (5,4:1) em vez de branco (2,8:1, reprovado).
- Navegação completa por teclado: *skip link*, foco visível em todos os
  controles, `Esc` fecha o menu mobile devolvendo o foco ao botão que o abriu.
- Acordeão do FAQ segue o padrão ARIA (`aria-expanded` / `aria-controls`), e o
  conteúdo fechado sai da árvore de acessibilidade.
- Formulário com `<label>` associado, `aria-invalid`, `aria-describedby`,
  mensagens de erro em texto e foco automático no primeiro campo inválido.
- Animações respeitam `prefers-reduced-motion`; sem JavaScript, todo o conteúdo
  continua visível.

---

## Responsividade

Layout mobile-first validado em 375 px, 768 px, 1440 px e 2560 px, sem rolagem
horizontal em nenhuma largura. O conteúdo é limitado a 1180 px e centralizado,
com fundos sangrando até a borda para que telas ultrawide não fiquem vazias.
