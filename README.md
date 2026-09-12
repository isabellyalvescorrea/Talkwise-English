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
| Tipografia  | Playfair Display (títulos) e Inter (corpo), via Google Fonts |
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
| `RESEND_API_KEY`            | Chave da Resend. Sem ela a rota de envio responde em modo demonstração e nada é enviado.       |
| `EMAIL_REMETENTE`           | Remetente, no formato `Talkwise English <guia@seudominio.com>`. Precisa ser de um domínio verificado. |

Só `NEXT_PUBLIC_SITE_URL` tem o prefixo `NEXT_PUBLIC_`, porque é a única que o
navegador precisa ler. A chave da Resend nunca sai do servidor.

### Formulário de captura

O formulário faz `POST` para `/api/aula`, uma rota do próprio projeto
(`app/api/aula/route.ts`). É ela que fala com o provedor de e-mail, para a
credencial ficar só no servidor.

O que o bloco oferece precisa ser o que os CTAs prometem. Os três botões que
levam até ele, na faixa fixa, no hero e no cartão de embarque, falam em aula
grátis, então é a aula experimental que está escrita ali e é ela que o e-mail
confirma. Todo o texto do bloco mora em `LEAD`, em `lib/content.ts`.

A rota tem dois modos:

- **Sem `RESEND_API_KEY` ou `EMAIL_REMETENTE`** (padrão): valida tudo, registra
  um aviso no log da função e responde `{ ok: true, modo: "demonstracao" }`.
  A página confirma normalmente, mas **nenhum e-mail é enviado**.
- **Com as duas definidas**: envia de verdade, pela API da Resend, e responde
  `{ ok: true, modo: "enviado" }`. Falha do provedor vira `502`, e a página
  mostra o estado de erro em vez de uma confirmação falsa.

#### Como ligar o envio de verdade

1. Criar conta na [Resend](https://resend.com) e gerar uma chave de API.
2. **Verificar um domínio próprio** na Resend, apontando os registros DNS que
   ela indica. Este passo não é opcional: sem domínio verificado a Resend só
   deixa enviar para o e-mail da própria conta, o que serve para testar mas não
   para atender visitantes. Um domínio `.vercel.app` não serve, porque o DNS
   não é seu.
3. Na Vercel, em Settings, Environment Variables, definir `RESEND_API_KEY` e
   `EMAIL_REMETENTE`, e republicar.

#### Fundo e moldura

O bloco tem fundo em `--pastel` e leva o degradê camel na moldura, e não no
preenchimento. São duas camadas de fundo, ambas funções de degradê, recortadas
uma na caixa de conteúdo e a outra na caixa da borda, que fica transparente:

```css
background:
  linear-gradient(var(--pastel), var(--pastel)) padding-box,
  linear-gradient(135deg, var(--c1), var(--c2) 60%, var(--c3)) border-box;
border: 2px solid transparent;
```

É esse par de recortes que preserva o canto arredondado, coisa que
`border-image` não faz.

A troca mexeu em dois detalhes que dependiam do camel para existir. Sobre o
degradê, o branco dos campos se destacava sozinho; sobre o cinza claro ele
quase some, então quem delimita o campo passa a ser a borda, que subiu para
`rgba(27, 39, 51, 0.55)` e dá 3,44:1, acima dos 3:1 que o WCAG pede para
contorno de componente. Pelo mesmo motivo a pílula branca das mensagens de erro
ganhou contorno.

Em compensação, o texto do bloco saltou de 4,6:1 a 6,3:1 sobre o camel para
13:1 a 15:1 sobre o cinza claro.

#### O que protege a rota

Um endpoint público que dispara e-mail é um convite a virar relé de spam. As
defesas:

- o assunto e o corpo são fixos no servidor. Do pedido só saem o endereço de
  destino e o primeiro nome, usado na saudação, escapado e limitado a 40
  caracteres. Não há como fazer a rota enviar texto arbitrário para terceiros;
- validação de nome e e-mail no servidor, independente da validação da página;
- campo-armadilha `empresa`, invisível para pessoas. Preenchido, o pedido é
  descartado, mas a resposta é `200`, para não ensinar ao robô que a armadilha
  existe;
- limite de 5 pedidos por IP a cada 10 minutos. O contador vive na memória da
  instância, então segura repetição óbvia, e não um ataque distribuído. Para
  valer mesmo, o caminho é um limitador na borda.

---

## Estrutura

```
public/
  logo-talkwise.png    arte da marca, recortada no limite do conteúdo
app/
  api/aula/route.ts    confirmação da aula experimental, via Resend
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
  BoardingPass.tsx     cartão de embarque animado, com gatilho por scroll
  Stats.tsx            faixa de dados operacionais
  Benefits.tsx         vantagens de falar inglês
  Method.tsx           método em quatro etapas
  About.tsx            texto institucional e professores
  LeadForm.tsx         bloco de captura, cinza claro com moldura camel
  Testimonials.tsx     depoimentos em cartão-postal
  Faq.tsx              acordeão com <details> nativo
  Footer.tsx
  BrandLogo.tsx        marca, servida por next/image
  ScrollReveal.tsx     revelação item a item, um alvo por elemento
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
| `--c1 · c2 · c3` | `#D9C4A3 · #B89768 · #8C6D45` | degradê camel do botão primário e da moldura do bloco de captura |
| `--c3-ink`     | `#7A5C36` | camel escurecido, para texto pequeno sobre fundo claro |
| `--emph`       | `#E3BE8C` | a palavra "confiança" no título                        |
| `--emph-grey`  | `#AAB4C0` | "inglês" e "possibilidades" no título                  |

Playfair Display nos títulos de seção e nos numerais, Inter no corpo e nos
títulos dos cards. Nenhum tom pastel ou salmão.
Nenhum travessão em nenhum texto da página.

As fontes são carregadas pela mesma folha de estilo do Google Fonts que o
protótipo usa, com a URL copiada caractere a caractere e inserida no `<head>`
do layout raiz:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

O projeto **não** usa `next/font`. A escolha é deliberada: o requisito é que o
navegador carregue exatamente essa folha, sem reconstrução equivalente. O custo
é uma requisição a terceiros e o salto de fonte do `display=swap`, que a
auto-hospedagem do `next/font` evitaria.

A Playfair Display tem apenas o eixo de peso, sem eixo de tamanho óptico. É
essa a razão da escolha: a forma da letra não muda com o tamanho do texto.
Verificado por medição: a largura da palavra "confiança" por em, no peso 600,
é 4.43066 a 16px, 4.43008 a 40px e 4.43001 a 96px. Praticamente constante, e
igual à do protótipo nos três tamanhos.

As duas regras de base de família são as do protótipo:

```css
body { font-family: 'Inter', sans-serif; }
h1, h2, h3, .serif { font-family: 'Playfair Display', serif; }
```

Duas regras do projeto sobrescrevem essa família, nos mesmos dois seletores em
que o protótipo a sobrescreve, e com o mesmo valor:

```css
.step h3    { font-family: 'Inter', sans-serif; font-size: 1.1rem;  font-weight: 600; }
.benefit h3 { font-family: 'Inter', sans-serif; font-size: 1.05rem; font-weight: 600; }
```

São os títulos dos quatro cards do Método e dos quatro cards de Vantagens. Em
corpo de texto curto e repetido, a Inter em 600 lê melhor que a serifada e
separa com mais clareza o título da descrição logo abaixo. O H1 do hero, todos
os H2 de seção e todos os numerais continuam em Playfair Display. No projeto
esses dois seletores usam o token `var(--font-sans)`, que resolve para
`'Inter', sans-serif`, o mesmo valor que o protótipo escreve literalmente.

Os demais elementos serifados (marca, numerais das estatísticas e do Método, e
a rota do cartão de embarque) usam o token `--font-serif`, que resolve para
`'Playfair Display', serif`, exatamente como o protótipo os declara.

O `html` não declara `-webkit-text-size-adjust`, também como no protótipo. Essa
propriedade trava o ajuste automático de tamanho de texto do navegador no
celular. Declará-la fazia o título render menor no aparelho do que no
protótipo, que deixa o navegador inflar o texto livremente. A contrapartida é
que o tamanho do título no mobile passa a depender do navegador e das
preferências de acessibilidade do aparelho.

Todos os títulos usam o peso 600 declarado no protótipo. A única exceção é
`.emph-grey` ("inglês" e "possibilidades" no título do hero), que o protótipo
declara em 700.

---

## Marca

A logo é a arte fornecida pelo cliente, um arquivo raster com fundo
transparente. Ela vai para `public/logo-talkwise.png` recortada no limite exato
do conteúdo, sem a moldura transparente do original: assim o espaçamento na
faixa e no rodapé vem do CSS e não de área vazia dentro da imagem.

O arquivo é 660 x 198, exatamente 10:3. O componente `BrandLogo` recebe a
altura e calcula a largura por essa proporção, mandando as duas medidas nos
atributos da imagem em vez de redimensionar por CSS. Com isso o `next/image`
gera um srcset curto, de 1x e 2x da largura real de exibição, em vez da lista
inteira de larguras do projeto. São 39px de altura na faixa fixa e 42px no
rodapé.

A logo da faixa está acima da dobra e usa `loading="eager"` com
`fetchPriority="high"`. O `priority` foi depreciado no Next 16 em favor de
`preload`, e a própria documentação recomenda `eager` para casos como este, em
que a imagem não é o maior elemento da tela.

Na faixa o `alt` é vazio de propósito: o link que envolve a logo já carrega o
nome acessível pelo `aria-label`, e um `alt` preenchido faria o leitor de tela
anunciar a marca duas vezes. No rodapé, onde não há link, o `alt` é
"Talkwise English".

O favicon (`app/icon.svg`) segue sendo o quadrado camel com o chevron vazado.
É deliberado: o formato quadrado funciona a 16px, onde a marca deitada não
funcionaria, e a cor conversa com o resto da paleta do site.

---

## Revelação por scroll

Os 22 itens repetidos das seções (3 da faixa de estatísticas, 4 de Vantagens,
4 do Método, 3 professores, 3 depoimentos e 5 perguntas) nascem invisíveis e
aparecem com esmaecimento e uma subida de 20px quando cruzam a faixa de
disparo.

O ponto que decide se o efeito fica bom é **o que se observa**. Observar a
seção, ou o container da lista, faz todos os filhos aparecerem em bloco no
instante em que o container entra na tela. Aqui cada item marcado com
`data-revelar` é registrado como um alvo próprio do `IntersectionObserver`, e
por isso gera a própria entrada e aparece no seu próprio momento. Um único
observador atende a página inteira, o que é só economia de instâncias e não
muda nada disso.

O observador nunca deixa de observar um alvo, então o efeito é reversível nos
dois sentidos: o item some ao sair da faixa e volta a aparecer ao entrar de
novo. Faixa de disparo: `threshold: 0.2` com `rootMargin: 0px 0px -12% 0px`.

A hero entra no mesmo sistema, com uma diferença: os quatro blocos da coluna
de texto já estão na tela quando a página abre, então revelariam todos no mesmo
instante. Um atraso escalonado de 0, 90, 180 e 270ms, lido da propriedade
`--atraso` pela transição, transforma isso numa cascata de título, texto,
botões e selo. O cartão de embarque ao lado fica de fora: ele já tem a própria
entrada, que é a dobra do cartão.

Medido a 375px, onde tudo empilha: os 22 itens das seções aparecem em **22
posições de scroll distintas**, nenhuma simultânea. A 1280px os únicos grupos que aparecem
juntos são os que estão lado a lado (a faixa de estatísticas em linha, as
vantagens em duas colunas e os depoimentos em linha), o que é o comportamento
correto para itens que entram na tela ao mesmo tempo.

O deslocamento usa `translate`, e não `transform`. São propriedades
independentes, então a revelação e os realces de hover, que usam `transform`,
se somam em vez de uma anular a outra.

Duas quedas de segurança, porque um efeito assim escondendo conteúdo é pior
que não ter efeito nenhum:

- o estado invisível só existe sob a classe `revelar-ativo`, que um script
  síncrono no `<head>` coloca na raiz antes da primeira pintura. Sem
  JavaScript o script não roda, a classe nunca entra e todo o conteúdo aparece
  normalmente. Conferido: 0 de 22 itens invisíveis com o JavaScript desligado;
- `prefers-reduced-motion: reduce` deixa tudo visível e parado.

---

## Realces de ponteiro

Todos os realces novos ficam dentro de `@media (hover: hover)`. Em aparelho de
toque a consulta é falsa, então eles nem são aplicados e não existe estado de
hover preso depois de um toque. No celular o que dá vida à página é a
revelação por scroll acima, não uma imitação de hover.

| Onde | Efeito |
| ---- | ------ |
| links do menu | cor e sublinhado que cresce da esquerda, animando `transform` e não a largura |
| itens de Método e Vantagens | barra camel à esquerda, fundo em `--realce` e conteúdo deslocando 4px |
| professores | fundo em `--realce` e deslocamento de 3px |
| faixa de estatísticas | fundo em `--realce` |
| perguntas do FAQ | texto passa para `--c3-ink` |
| depoimentos | sobem 4px e ganham sombra |
| botões e logo | opacidade e elevação de 1px |

Os dois botões do hero seguem pesos diferentes de propósito. O primário leva o
degradê camel e uma sombra curta e rente; o secundário é vazado, com contorno
em `rgba(245, 239, 230, 0.45)`, que dá 3,56:1 sobre o navy e cumpre o mínimo de
3:1 para contorno de componente. Dois blocos preenchidos lado a lado disputavam
a mesma atenção e não diziam qual é a ação principal.

A barra à esquerda dos itens é desenhada por pseudo-elemento posicionado fora
da caixa de conteúdo, em `left: -14px`. Uma `border-left` de verdade empurraria
o texto, e alargaria o filete que separa os itens.

---

## Cartão de embarque

O cartão do hero é uma animação em laço de 8s, copiada do protótipo com os
valores intactos: cores, tempos e porcentagens de keyframe estão como no
arquivo original, sem arredondamento. São oito animações rodando juntas:

| Animação        | O que faz |
| --------------- | --------- |
| `ticketCycle`   | dobra e desdobra o cartão, com a batida do carimbo em 44% a 46% |
| `creaseFade`    | sombra do vinco, que some conforme o cartão abre |
| `shineSweep`    | brilho que atravessa o cartão entre 27% e 33% |
| `revealLabel`   | rótulo "Cartão de embarque", em 24% |
| `revealRoute`   | rota De/Para, em 27% |
| `revealDetails` | grade de detalhes, em 30% |
| `revealBottom`  | código de barras, referência e botão, em 33% |
| `stampCycle`    | carimbo "Aula confirmada", que bate em 38% e assenta em 47% |

Cada elemento tem seu próprio keyframe com o tempo absoluto do ciclo, em vez
de `animation-delay`. É isso que mantém tudo sincronizado em laço infinito: com
`animation-delay` as animações se dessincronizariam depois da primeira volta.

O disparo é o mesmo `IntersectionObserver` do protótipo, com `threshold: 0.4`,
em `useEffect`. Ele solta a animação quando o cartão entra na tela e para de
observar.

A única diferença de estrutura é a queda sem JavaScript. No protótipo as
animações nascem pausadas por CSS, o que deixaria o cartão dobrado para sempre
em quem estiver sem JavaScript, escondendo o principal elemento gráfico do
hero. Aqui a classe que pausa entra só depois que o componente monta: no HTML
servido as animações correm soltas, e quem tem JavaScript vê exatamente o
comportamento do protótipo. Nenhum valor de animação muda por causa disso.

`prefers-reduced-motion: reduce` desliga as oito animações e deixa o cartão
aberto, com o carimbo assentado, como no protótipo.

O fundo do cartão leva uma textura de papel, duas camadas de linhas cruzadas
sobre a cor `--ticket`:

```css
background:
  repeating-linear-gradient(45deg, rgba(20, 32, 43, 0.045) 0 1px, transparent 1px 11px),
  repeating-linear-gradient(-45deg, rgba(20, 32, 43, 0.03) 0 1px, transparent 1px 15px)
  var(--ticket);
```

A cor sólida fica dentro da última camada, colada no segundo gradiente e sem
vírgula antes dela. Isso não é estilo, é sintaxe: numa lista de camadas
separadas por vírgula a cor só é válida na última. Escrita antes dos
gradientes, a declaração inteira fica inválida, o navegador a descarta, e o
cartão perde o fundo e fica transparente. Já aconteceu uma vez neste projeto.

A textura deixa 85% da área no creme puro; o pixel mais escuro dela é
`rgb(235, 232, 223)`, 8,45% mais escuro que o creme. Isso encosta no limite
do contraste dos textos em `--ink-muted`, que caem de 4,95:1 para 4,55:1
quando a letra cruza uma linha, ainda acima do mínimo de 4,5:1.

A animação roda em laço sem controle de pausa na tela. O critério 2.2.2 do
WCAG pede um mecanismo de pausa para movimento automático acima de 5s; o que
existe aqui é o respeito a `prefers-reduced-motion`, que é a mitigação que o
protótipo adota.

---

## Fidelidade ao protótipo

Cada seção é comparada pixel a pixel com o protótipo renderizado a 1280px e a
375px, com a faixa fixa oculta para não interferir no recorte. Os números
abaixo são de antes de duas mudanças pedidas depois da aprovação do protótipo,
que fazem a página divergir dele de propósito:

- a marca do protótipo (quadrado camel mais a palavra "Talkwise" em texto) deu
  lugar à logo do cliente, na faixa e no rodapé;
- os rótulos de seção ("Talkwise English" no hero, "Vantagens", "Método",
  "Sobre", "Alunos" e "Dúvidas") foram removidos. Cada seção ficou entre 29px e
  36px mais curta e passou a começar direto pelo título.

| Seção         | 1280px            | 375px             | Causa da diferença |
| ------------- | ----------------- | ----------------- | ------------------ |
| hero          | 0,338%            | 1,097%            | canto do botão |
| estatísticas  | **0%**            | **0%**            | idêntico |
| vantagens     | 0,588%            | 1,419%            | cor dos títulos |
| método        | 0,280%            | 1,337%            | cor dos títulos |
| sobre         | **0%**            | **0%**            | idêntico |
| reservar      | 3,638%            | 5,366%            | cor do parágrafo e fonte dos campos |
| alunos        | 0,011%            | 0,023%            | cor do selo dos cartões-postais |
| dúvidas       | **0%**            | **0%**            | idêntico |
| rodapé        | 0,022%            | **0%**            | antialiasing de um glifo |

Desvios deliberados, todos por acessibilidade ou por defeito de renderização
do protótipo:

1. `--ink-muted` de `#6B7580` para `#5F6975`: o original dava 4,08:1 sobre o
   fundo claro e reprovava no WCAG AA.
2. Degradê do botão primário com a última parada deslocada para 128%: medido
   pixel a pixel sob o rótulo, o protótipo entregava 3,84:1 e esta versão
   entrega 4,58:1.
3. Parágrafo do bloco de captura em tinta sólida em vez de `rgba(...,0.75)`:
   de 4,00:1 para 6,34:1. Espaçamento e entrelinha seguem os do protótipo,
   para não deslocar as seções seguintes.
4. Campos do formulário herdam a Inter (`input { font-family: inherit }`). No
   protótipo eles ficam na fonte padrão do navegador, o que os deixa 2px mais
   baixos e com um tipo diferente do resto da página.
5. Títulos de "Vantagens" e "Método" em `--ink` em vez do preto padrão do
   navegador, alinhando com o resto do sistema de cores.
6. Selo dos cartões-postais em `--c3-ink`, por ser texto de 9,6px.
7. Os pontos finais do título do hero ficam dentro dos trechos coloridos, em
   vez de soltos no creme do título como no protótipo. Soltos, o ponto de
   "confiança." e o de "possibilidades." destoavam da palavra que encerram.
8. Selo "TW" removido dos cartões de depoimento, e com ele o recuo de 40px que
   só existia para abrir espaço ao selo.
9. Os elementos camel sólidos do cartão de embarque ("Fluência", o carimbo
   "Aula confirmada" e a seta do avião) usam `--c3-ink` (`#7A5C36`) em vez do
   `--c3` do protótipo. Em `--c3` os dois textos davam 4,25:1 sobre o creme do
   cartão e reprovavam o mínimo de 4,5:1 do WCAG AA: "Fluência" tem 18,4px no
   peso 600, logo abaixo dos dois critérios de texto grande (24px, ou 18,66px
   em negrito), e o carimbo é texto de 10px. Com `--c3-ink` sobem para 5,46:1,
   ou 5,02:1 quando a letra cruza uma linha da textura. A seta entrou junto,
   embora já passasse como elemento não textual, para não sobrar `--c3` sólido
   no cartão convivendo com o tom escurecido. Os dois degradês, o friso do topo
   e o sublinhado de "Fluência", seguem com `--c3` na última parada: são
   decorativos e compartilham o degradê usado no resto do site.

---

## Acessibilidade

- 40 pares de cor auditados no navegador, **zero reprovações**; os textos
  sobre degradê foram medidos por amostragem de pixel.
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
