import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import { FAQS } from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const title = "Talkwise English — Fale inglês com confiança em 90 dias";
const description =
  "Aulas ao vivo focadas em conversação real, com professores nativos e horários flexíveis. Baixe grátis as 100 frases essenciais para a sua primeira conversa em inglês.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s | Talkwise English",
  },
  description,
  applicationName: "Talkwise English",
  keywords: [
    "curso de inglês",
    "inglês online",
    "aulas de conversação",
    "professores nativos",
    "fluência em inglês",
    "aula de inglês grátis",
  ],
  authors: [{ name: "Talkwise English" }],
  alternates: {
    canonical: "/",
  },
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
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF9F6",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": `${SITE_URL}#organizacao`,
      name: "Talkwise English",
      url: SITE_URL,
      description,
      areaServed: "BR",
      slogan: "Fale inglês com confiança em 90 dias",
    },
    {
      "@type": "Course",
      name: "Talkwise English — Programa de 90 dias",
      description:
        "Programa de 90 dias focado em conversação, com diagnóstico de nível, aulas ao vivo, prática guiada e certificação alinhada ao CEFR.",
      inLanguage: "pt-BR",
      provider: {
        "@id": `${SITE_URL}#organizacao`,
      },
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
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${sora.variable} ${inter.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
