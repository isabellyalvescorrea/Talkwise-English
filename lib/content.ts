export type NavLink = {
  label: string;
  href: string;
};

export const NAV_LINKS: NavLink[] = [
  { label: "Início", href: "#inicio" },
  { label: "Metodologia", href: "#metodologia" },
  { label: "Sobre nós", href: "#sobre" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Dúvidas Frequentes", href: "#duvidas" },
];

/** Âncora usada por todos os CTAs de conversão do topo da página. */
export const PRIMARY_CTA_HREF = "#ebook";

/** Âncora usada pelos CTAs do fim da página (segundo formulário). */
export const SECONDARY_CTA_HREF = "#comecar";

export type Benefit = {
  icon: "globe" | "chat" | "clock";
  title: string;
  description: string;
};

export const BENEFITS: Benefit[] = [
  {
    icon: "globe",
    title: "Professores nativos",
    description:
      "Aulas com professores nativos e certificados, que ajustam o vocabulário ao seu objetivo — trabalho, viagem ou intercâmbio.",
  },
  {
    icon: "chat",
    title: "Método 100% conversação",
    description:
      "Você fala desde o primeiro dia. Nada de lista de verbos: a gramática entra só quando resolve um problema real da sua fala.",
  },
  {
    icon: "clock",
    title: "Flexibilidade total de horário",
    description:
      "Agenda aberta das 6h às 23h, com remarcação até duas horas antes. O inglês encaixa na sua rotina — e não o contrário.",
  },
];

export type MethodStep = {
  number: string;
  icon: "compass" | "chat" | "repeat" | "medal";
  title: string;
  description: string;
  duration: string;
};

export const METHOD_STEPS: MethodStep[] = [
  {
    number: "01",
    icon: "compass",
    title: "Diagnóstico de nível",
    description:
      "Uma conversa de 30 minutos com um professor mapeia seu nível real, seus objetivos e os pontos exatos que travam a sua fala.",
    duration: "Semana 1",
  },
  {
    number: "02",
    icon: "chat",
    title: "Aulas de conversação",
    description:
      "Encontros ao vivo de 50 minutos, individuais ou em dupla, com temas tirados da sua rotina — reunião, viagem, entrevista.",
    duration: "Semanas 1 a 12",
  },
  {
    number: "03",
    icon: "repeat",
    title: "Prática guiada",
    description:
      "Entre as aulas, missões de 10 minutos: áudios curtos, roleplays e correções comentadas pelo seu próprio professor.",
    duration: "Todos os dias",
  },
  {
    number: "04",
    icon: "medal",
    title: "Certificação",
    description:
      "Ao final dos 90 dias, uma banca avalia sua fluência e emite o certificado Talkwise, alinhado ao Quadro Europeu (CEFR).",
    duration: "Semana 13",
  },
];

export type Teacher = {
  name: string;
  specialty: string;
  origin: string;
};

export const TEACHERS: Teacher[] = [
  {
    name: "Erin Callahan",
    specialty: "Conversação do dia a dia",
    origin: "Dublin, Irlanda",
  },
  {
    name: "Marcus Bell",
    specialty: "Inglês para entrevistas",
    origin: "Toronto, Canadá",
  },
  {
    name: "Priya Raman",
    specialty: "Business English",
    origin: "Manchester, Reino Unido",
  },
];

export type Stat = {
  value: string;
  label: string;
};

export const STATS: Stat[] = [
  { value: "2.400+", label: "alunos formados" },
  { value: "4,9/5", label: "nota média das aulas" },
  { value: "18", label: "professores certificados" },
  { value: "92%", label: "concluem os 90 dias" },
];

export type Testimonial = {
  name: string;
  since: string;
  quote: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Camila Ferraz",
    since: "aluna há 7 meses",
    quote:
      "Tinha nove anos de curso de inglês e travava em qualquer conversa. Na Talkwise eu falei já na primeira aula. Hoje conduzo reuniões com o time da Irlanda sem suar frio.",
  },
  {
    name: "Rodrigo Sanches",
    since: "aluno há 4 meses",
    quote:
      "O diagnóstico foi certeiro. Em vez de me jogarem num nível genérico, montaram a trilha em cima do vocabulário que eu de fato uso no trabalho.",
  },
  {
    name: "Letícia Amorim",
    since: "aluna há 11 meses",
    quote:
      "As missões de 10 minutos entre as aulas mudaram tudo. É pouco tempo por dia, mas é constante — e a diferença apareceu em umas três semanas.",
  },
  {
    name: "Thiago Nunes",
    since: "aluno há 3 meses",
    quote:
      "Trabalho em escala 12x36 e achava que nunca conseguiria estudar. Como dá para remarcar até duas horas antes, não perdi uma aula sequer.",
  },
  {
    name: "Priscila Rangel",
    since: "aluna há 6 meses",
    quote:
      "Passei na entrevista em inglês de uma vaga remota. O professor simulou a conversa comigo três vezes antes; no dia, parecia só mais uma aula.",
  },
];

export type Faq = {
  question: string;
  answer: string;
};

export const FAQS: Faq[] = [
  {
    question: "Preciso ter algum nível de inglês para começar?",
    answer:
      "Não. Recebemos desde quem nunca estudou até quem já fala e quer destravar. A aula de diagnóstico define o seu nível real, do A1 ao C1, e a trilha das 12 semanas é montada a partir dele — ninguém entra num pacote genérico.",
  },
  {
    question: "As aulas são ao vivo ou gravadas?",
    answer:
      "Todas as aulas são ao vivo, com professor na tela, em encontros de 50 minutos. O que fica gravado é a sua própria aula: você recebe o vídeo e as correções comentadas para revisar quando quiser.",
  },
  {
    question: "No fim do curso eu recebo certificado?",
    answer:
      "Sim. Depois da avaliação final de fluência você recebe o Certificado Talkwise com o nível alcançado segundo o Quadro Europeu Comum de Referência (CEFR), em versão digital e com código de verificação.",
  },
  {
    question: "Qual é a duração do curso?",
    answer:
      "O programa completo tem 90 dias, com duas aulas ao vivo por semana e prática guiada nos dias intercalados. Quem quiser acelerar pode fazer três aulas semanais e concluir em cerca de 60 dias.",
  },
  {
    question: "Como funciona a aula experimental gratuita?",
    answer:
      "É uma conversa de 30 minutos, ao vivo, com um dos nossos professores. Você fala desde o primeiro minuto e sai com um diagnóstico do seu nível por escrito. Não pedimos cartão de crédito e não existe compromisso de contratar.",
  },
];

export const EBOOK_BULLETS: string[] = [
  "100 frases prontas, separadas por situação: apresentação, small talk, trabalho e viagem.",
  "Guia de pronúncia simplificado, sem alfabeto fonético.",
  "Áudio de cada frase gravado por professor nativo.",
  "PDF e áudios enviados na hora, direto no seu e-mail.",
];
