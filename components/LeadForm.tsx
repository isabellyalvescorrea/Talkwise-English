"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import styles from "./LeadForm.module.css";

type Status = "idle" | "loading" | "success" | "error";

const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

/** Endpoint opcional (Formspree, por exemplo). Sem ele, o envio é simulado. */
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

export default function LeadForm() {
  const uid = useId();
  const nomeId = `${uid}-nome`;
  const emailId = `${uid}-email`;

  const nomeRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [erros, setErros] = useState<{ nome?: string; email?: string }>({});
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (status === "loading") return;

    const proximos: { nome?: string; email?: string } = {};
    if (nome.trim().length < 2) proximos.nome = "Escreva seu nome para personalizar o envio.";
    if (!EMAIL.test(email.trim())) proximos.email = "Informe um e-mail válido, como nome@email.com.";
    setErros(proximos);

    if (proximos.nome) {
      nomeRef.current?.focus();
      return;
    }
    if (proximos.email) {
      emailRef.current?.focus();
      return;
    }

    /* Campo-armadilha: só robôs preenchem. */
    const armadilha = evento.currentTarget.elements.namedItem("empresa") as HTMLInputElement | null;
    if (armadilha?.value) return;

    setStatus("loading");
    try {
      if (ENDPOINT) {
        const resposta = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            nome: nome.trim(),
            email: email.trim(),
            material: "Guia: as 100 frases essenciais",
          }),
        });
        if (!resposta.ok) throw new Error("falha no envio");
      } else {
        /* Sem back-end: a página apenas confirma visualmente. */
        await new Promise((resolve) => setTimeout(resolve, 800));
      }
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const carregando = status === "loading";

  return (
    <section id="reservar" className={`section ${styles.section}`} aria-labelledby={`${uid}-titulo`}>
      <div className="shell">
        <div className={styles.box}>
          <div>
            <h2 className="serif" id={`${uid}-titulo`}>
              As 100 frases essenciais pra sua primeira conversa em inglês.
            </h2>
            <p className={styles.lede}>
              Baixe grátis o guia e comece a praticar hoje, antes mesmo da sua primeira aula.
            </p>
            {status === "success" ? (
              <p className={styles.success} role="status">
                Guia enviado. Confira seu e-mail.
              </p>
            ) : null}
            {status === "error" ? (
              <p className={styles.success} role="alert">
                Não foi possível enviar agora. Verifique a conexão e tente de novo.
              </p>
            ) : null}
          </div>

          {status === "success" ? null : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.field}>
                <label className="sr-only" htmlFor={nomeId}>
                  Seu nome
                </label>
                <input
                  ref={nomeRef}
                  id={nomeId}
                  name="nome"
                  type="text"
                  className={styles.input}
                  placeholder="Seu nome"
                  autoComplete="given-name"
                  value={nome}
                  onChange={(evento) => {
                    setNome(evento.target.value);
                    if (erros.nome) setErros((atual) => ({ ...atual, nome: undefined }));
                  }}
                  aria-invalid={erros.nome ? "true" : undefined}
                  aria-describedby={erros.nome ? `${nomeId}-erro` : undefined}
                  required
                />
                {erros.nome ? (
                  <span className={styles.error} id={`${nomeId}-erro`}>
                    {erros.nome}
                  </span>
                ) : null}
              </div>

              <div className={styles.field}>
                <label className="sr-only" htmlFor={emailId}>
                  Seu e-mail
                </label>
                <input
                  ref={emailRef}
                  id={emailId}
                  name="email"
                  type="email"
                  className={styles.input}
                  placeholder="Seu e-mail"
                  autoComplete="email"
                  inputMode="email"
                  value={email}
                  onChange={(evento) => {
                    setEmail(evento.target.value);
                    if (erros.email) setErros((atual) => ({ ...atual, email: undefined }));
                  }}
                  aria-invalid={erros.email ? "true" : undefined}
                  aria-describedby={erros.email ? `${emailId}-erro` : undefined}
                  required
                />
                {erros.email ? (
                  <span className={styles.error} id={`${emailId}-erro`}>
                    {erros.email}
                  </span>
                ) : null}
              </div>

              <input
                type="text"
                name="empresa"
                className={styles.honeypot}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
              />

              <button type="submit" className={styles.submit} disabled={carregando}>
                {carregando ? "Enviando…" : "Baixar guia grátis"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
