import About from "@/components/About";
import Benefits from "@/components/Benefits";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LeadForm from "@/components/LeadForm";
import Method from "@/components/Method";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <a className="skipLink" href="#conteudo">
        Pular para o conteúdo
      </a>

      <Header />

      <main id="conteudo">
        <Hero />
        <Benefits />
        <Method />
        <About />

        <LeadForm
          id="ebook"
          variant="light"
          eyebrow="Material gratuito"
          title="Baixe grátis: as 100 frases essenciais para sua primeira conversa em inglês"
          description="O atalho que usamos com alunos iniciantes: frases curtas, naturais e prontas para usar já na próxima conversa — com áudio para você ouvir a pronúncia certa."
        />

        <Testimonials />
        <Faq />

        <LeadForm
          id="comecar"
          variant="dark"
          eyebrow="Comece agora"
          title="Dê o primeiro passo hoje com as 100 frases essenciais"
          description="Baixe o material gratuito, treine as frases nesta semana e receba no mesmo e-mail o convite para a sua aula experimental de 30 minutos."
        />
      </main>

      <Footer />
    </>
  );
}
