# Talkwise English

Landing page de captura de lead por e-mail para uma escola de inglês online.
Construída a partir do protótipo visual aprovado (`talkwise-prototype.html`),
com fidelidade verificada medida a medida.

Sem back-end, sem banco de dados e sem persistência entre usuários: a página é
gerada estaticamente e publica na Vercel com o build padrão.

---

## Stack

| Camada      | Escolha                                              |
| ----------- | ---------------------------------------------------- |
| Framework   | Next.js 16 (App Router) + React 19                   |
| Linguagem   | TypeScript em modo estrito                           |
| Estilos     | CSS Modules + tokens em custom properties            |
| Tipografia  | `next/font` com Fraunces (títulos) e Inter (corpo)   |
| Responsivo  | Container queries, ponto de virada único em 780px    |
| Hospedagem  | Vercel, build padrão `next build`                    |

Sem Tailwind, sem UI kit e sem dependência de runtime além do próprio Next.

---

## Como rodar

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build      # build de produção
npm run start      # serve o build
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
```

---

## Deploy na Vercel

Importe o repositório em <https://vercel.com/new>. A Vercel detecta o Next.js e
usa `next build` sem nenhuma configuração extra. Não existe `vercel.json`.

---

## Variáveis de ambiente

Copie `.env.example` para `.env.local`. Todas são opcionais.

| Variável                    | Para que serve                                                                              |
| --------------------------- | ------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`      | URL canônica de metadados, Open Graph, JSON-LD, `robots.txt` e `sitemap.xml`. Aceita com ou sem `https://`. Vazia ou inválida, cai no domínio de produção que a Vercel injeta. |
| `NEXT_PUBLIC_FORM_ENDPOINT` | Endpoint de um serviço de formulários. Definido, o formulário faz `POST` real.                |

### Formulário de captura

`components/LeadForm.tsx` tem dois modos:

- **Sem `NEXT_PUBLIC_FORM_ENDPOINT`** (padrão): valida os campos, mostra o
  estado de envio e exibe a confirmação, sem enviar nada para lugar nenhum.
- **Com `NEXT_PUBLIC_FORM_ENDPOINT`**: faz `POST` com `{ nome, email, material }`
  em JSON. Para usar o Formspree, aponte a variável para
  `https://formspree.io/f/SEU_ID`.

Há um campo-armadilha chamado `empresa`, invisível para pessoas: quando vem
preenchido, o envio é descartado em silêncio.

---

## Estrutura

```
app/
  layout.tsx           metadados, fontes e JSON-LD
  page.tsx             composição da página
  globals.css          tokens, reset e primitivas (.shell, .section, .btn-primary)
  icon.svg             favicon
  opengraph-image.tsx  imagem de compartilhamento gerada no build
  robots.ts            robots.txt
  sitemap.ts           sitemap.xml
components/
  Header.tsx           faixa fixa, âncoras e menu hambúrguer
  Hero.tsx             título, CTAs e selo de aula grátis
  BoardingPass.tsx     cartão de embarque (perfuração e código de barras)
  Stats.tsx            faixa de dados operacionais
  Benefits.tsx         vantagens de falar inglês
  Method.tsx           método em quatro etapas
  About.tsx            texto institucional e professores
  LeadForm.tsx         bloco de captura em painel camel
  Testimonials.tsx     depoimentos em cartão-postal
  Faq.tsx              acordeão com <details> nativo
  Footer.tsx
  BrandMark.tsx        símbolo da marca
lib/
  content.ts           todo o texto editorial em um arquivo só
  site.ts              resolução tolerante a falhas da URL canônica
```

Para trocar textos, depoimentos, perguntas ou professores, edite apenas
`lib/content.ts`.

---

## Identidade visual

| Token          | Valor     | Uso                                                    |
| -------------- | --------- | ------------------------------------------------------ |
| `--navy`       | `#16324F` | fundo das faixas escuras                               |
| `--pastel`     | `#F1EFEC` | fundo das faixas claras                                |
| `--ink`        | `#1B2733` | texto sobre fundo claro                                |
| `--ink-muted`  | `#5F6975` | texto de apoio                                         |
| `--cream-text` | `#F5EFE6` | texto sobre marinho                                    |
| `--cream-muted`| `#AEBAC9` | texto de apoio sobre marinho                           |
| `--c1 · c2 · c3` | `#D9C4A3 · #B89768 · #8C6D45` | degradê camel dos botões e do bloco de captura |
| `--c3-ink`     | `#7A5C36` | camel escurecido, para texto pequeno sobre fundo claro |
| `--emph`       | `#E3BE8C` | a palavra "confiança" no título                        |
| `--emph-grey`  | `#AAB4C0` | "inglês" e "possibilidades" no título                  |

Fraunces nos títulos, Inter no corpo. Nenhum tom pastel ou salmão.
Nenhum travessão em nenhum texto da página.

---

## Fidelidade ao protótipo

Cada seção foi medida no navegador contra o protótipo renderizado a 1280px,
comparando topo e altura de `header`, faixa de estatísticas, `#vantagens`,
`#metodo`, `#sobre`, `#reservar`, `#alunos`, `#duvidas` e `footer`. Todas
coincidem, exceto o bloco de captura, 19px mais alto por causa da correção de
entrelinha descrita abaixo.

Desvios deliberados, todos por acessibilidade ou por defeito de renderização
do protótipo:

1. `--ink-muted` de `#6B7580` para `#5F6975`: o original dava 4,08:1 sobre o
   fundo claro e reprovava no WCAG AA.
2. Degradê do botão primário com a última parada deslocada para 128%: medido
   pixel a pixel sob o rótulo, o protótipo entregava 3,84:1 e esta versão
   entrega 4,58:1.
3. Parágrafo do bloco de captura em tinta sólida em vez de `rgba(...,0.75)`,
   e com a mesma entrelinha 1,55 dos demais parágrafos do projeto: 4,00:1
   para 6,34:1.
4. Títulos de "Vantagens" e "Método" em `--ink` em vez do preto padrão do
   navegador, alinhando com o resto do sistema de cores.
5. Selo dos cartões-postais em `--c3-ink`, por ser texto de 9,6px.
6. O código de barras do cartão de embarque é desenhado (no protótipo a `div`
   estava vazia).

---

## Acessibilidade

- 42 pares de cor auditados no navegador, zero reprovações; os textos sobre
  degradê foram medidos por amostragem de pixel.
- Navegação por teclado completa: link para pular o conteúdo, foco visível,
  `Esc` fecha o menu mobile devolvendo o foco ao botão.
- FAQ em `<details>` nativo, acessível por padrão.
- Formulário com `<label>` associado, `aria-invalid`, `aria-describedby`, foco
  automático no primeiro campo inválido e confirmação em `role="status"`.
- Animações respeitam `prefers-reduced-motion`.

---

## Responsividade

Ponto de virada único em 780px, via container queries, como no protótipo.
Validado em 375px, 768px, 1280px, 1440px e 2560px, sem rolagem horizontal em
nenhuma largura. O conteúdo é limitado a 1280px e centralizado, que é
exatamente a largura em que o protótipo foi aprovado.
