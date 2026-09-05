import type { Metadata, Viewport } from "next";
import { FAQS } from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

/* URL do Google Fonts copiada caractere a caractere do protótipo aprovado.
   Não usar next/font aqui: o pedido é que o navegador carregue exatamente
   esta folha de estilo, sem reconstrução equivalente. */
const GOOGLE_FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap";

const title = "Talkwise English: fale inglês com confiança";
const description =
  "Aulas de inglês ao vivo, em grupos pequenos, com professores nativos. Você pratica desde o primeiro encontro. Baixe grátis o guia com as 100 frases essenciais pra sua primeira conversa.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s | Talkwise English",
  },
  description,
  applicationName: "Talkwise English",
  keywords: [
    "curso de inglês online",
    "aulas de conversação",
    "professores nativos",
    "inglês em grupos pequenos",
    "aula de inglês grátis",
  ],
  authors: [{ name: "Talkwise English" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "Talkwise English",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#16324F",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

const dadosEstruturados = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": `${SITE_URL}#organizacao`,
      name: "Talkwise English",
      url: SITE_URL,
      description,
      areaServed: "BR",
      slogan: "Fale inglês com confiança. Viva novas possibilidades.",
    },
    {
      "@type": "Course",
      name: "Talkwise English: programa de 90 dias",
      description:
        "Programa de 90 dias com diagnóstico de nível, aulas de conversação ao vivo em grupos pequenos, prática guiada entre as aulas e avaliação final de conversação.",
      inLanguage: "pt-BR",
      provider: { "@id": `${SITE_URL}#organizacao` },
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "online",
        courseWorkload: "P90D",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href={GOOGLE_FONTS_HREF} rel="stylesheet" />
      </head>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(dadosEstruturados) }}
        />
      </body>
    </html>
  );
}
