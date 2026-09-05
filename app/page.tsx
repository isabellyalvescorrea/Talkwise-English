import About from "@/components/About";
import Benefits from "@/components/Benefits";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LeadForm from "@/components/LeadForm";
import Method from "@/components/Method";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <div className="page">
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>

      <Header />

      <main id="conteudo">
        <Hero />
        <Stats />
        <Benefits />
        <Method />
        <About />
        <LeadForm />
        <Testimonials />
        <Faq />
      </main>

      <Footer />
    </div>
  );
}
