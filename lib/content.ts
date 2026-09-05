export type NavLink = { label: string; href: string };

export const NAV_LINKS: NavLink[] = [
  { label: "Vantagens", href: "#vantagens" },
  { label: "Método", href: "#metodo" },
  { label: "Sobre", href: "#sobre" },
  { label: "Alunos", href: "#alunos" },
  { label: "Dúvidas", href: "#duvidas" },
];

/** Âncora do bloco de captura, alvo de todos os CTAs. */
export const CTA_HREF = "#reservar";

export type TicketDetail = { k: string; v: string };

export const TICKET = {
  label: "Cartão de embarque",
  from: { k: "De", v: "Insegurança" },
  to: { k: "Para", v: "Fluência" },
  details: [
    { k: "Duração", v: "90 dias" },
    { k: "Formato", v: "Ao vivo" },
    { k: "Turma", v: "Em breve" },
    { k: "Nível", v: "Todos" },
  ] satisfies TicketDetail[],
  action: "Embarcar",
};

export type Stat = { num: string; label: string };

export const STATS: Stat[] = [
  { num: "6", label: "alunos, no máximo, por turma" },
  { num: "8", label: "países de origem dos professores" },
  { num: "2x", label: "aulas ao vivo por semana" },
];

export type Benefit = { title: string; text: string };

export const BENEFITS: Benefit[] = [
  {
    title: "Mais oportunidades de trabalho",
    text: "Muitas vagas remotas e internacionais colocam o inglês como pré-requisito, não como diferencial.",
  },
  {
    title: "Acesso direto ao conhecimento",
    text: "Boa parte do conteúdo técnico, acadêmico e cultural do mundo é produzida em inglês, sem tradução.",
  },
  {
    title: "Mais liberdade pra viajar",
    text: "Resolver imprevistos, pedir informação e se virar sozinho fica muito mais simples em qualquer país.",
  },
  {
    title: "Networking sem fronteiras",
    text: "Conversar com pessoas de outras culturas abre portas profissionais e pessoais que não apareceriam de outro jeito.",
  },
];

export type Step = { n: string; title: string; text: string };

export const STEPS: Step[] = [
  {
    n: "01",
    title: "Diagnóstico de nível",
    text: "Uma conversa de 20 minutos define exatamente onde você está e o que falta pra chegar aonde quer.",
  },
  {
    n: "02",
    title: "Aulas de conversação",
    text: "Encontros ao vivo, em grupos pequenos, guiados por situações reais, não por apostilas.",
  },
  {
    n: "03",
    title: "Prática guiada",
    text: "Entre aulas, exercícios curtos de fala, com correção de professor, pra fixar o que foi praticado.",
  },
  {
    n: "04",
    title: "Certificação",
    text: "Ao final dos 90 dias, uma avaliação de conversação confirma seu novo nível.",
  },
];

export type Teacher = { name: string; from: string; spec: string };

export const TEACHERS: Teacher[] = [
  {
    name: "Alex Turner",
    from: "Manchester, Reino Unido",
    spec: "Conversação para viagens e negócios",
  },
  { name: "Priya Shah", from: "Toronto, Canadá", spec: "Preparação para entrevistas" },
  { name: "Sam Okafor", from: "Austin, EUA", spec: "Apresentações e pitches" },
];

export type Testimonial = { quote: string; meta: string };

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Depois de anos travando, fechei negócio em inglês na terceira semana de aula. Nunca mais tive vergonha de errar.",
    meta: "Camila R., aluna há 5 meses",
  },
  {
    quote:
      "O método é direto: você fala muito mais do que estuda gramática no papel. Foi o que funcionou pra mim depois de três cursos que não deram certo.",
    meta: "Rafael L., aluno há 3 meses",
  },
  {
    quote:
      "Os professores corrigem sem constranger. Isso mudou completamente minha vontade de tentar falar.",
    meta: "Beatriz A., aluna há 8 meses",
  },
];

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: "Preciso ter algum nível de inglês?",
    a: "Não. O diagnóstico inicial encontra o ponto de partida certo pra você, do zero ao avançado.",
  },
  {
    q: "As aulas são ao vivo ou gravadas?",
    a: "Sempre ao vivo, em grupos pequenos. É isso que sustenta a prática de conversação real.",
  },
  {
    q: "Tem certificado?",
    a: "Sim, emitido após a avaliação de conversação ao final dos 90 dias.",
  },
  {
    q: "Qual a duração de cada aula?",
    a: "50 minutos, duas vezes por semana, com horários flexíveis pra encaixar na sua rotina.",
  },
  {
    q: "Posso cancelar quando quiser?",
    a: "Sim, sem multa e sem burocracia. Basta avisar com uma semana de antecedência.",
  },
];
