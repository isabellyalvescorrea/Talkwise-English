"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { EBOOK_BULLETS } from "@/lib/content";
import {
  IconAlert,
  IconCheck,
  IconCheckCircle,
  IconDownload,
  IconMail,
  IconShield,
  IconSparkle,
  IconUser,
  IconVideo,
} from "./Icons";
import { EbookIllustration } from "./Illustrations";
import Reveal from "./Reveal";
import styles from "./LeadForm.module.css";

type LeadFormProps = {
  id: string;
  variant?: "light" | "dark";
  eyebrow: string;
  title: string;
  description: string;
};

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

/** Endpoint opcional (ex.: Formspree). Sem ele, o envio é apenas simulado. */
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

export default function LeadForm({
  id,
  variant = "light",
  eyebrow,
  title,
  description,
}: LeadFormProps) {
  const uid = useId();
  const nameId = `${uid}-nome`;
  const emailId = `${uid}-email`;
  const titleId = `${uid}-titulo`;

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [status, setStatus] = useState<Status>("idle");
  const [sentTo, setSentTo] = useState({ name: "", email: "" });

  function validate() {
    const next: { name?: string; email?: string } = {};
    if (name.trim().length < 2) {
      next.name = "Escreva o seu nome para personalizarmos o envio.";
    }
    if (!EMAIL_PATTERN.test(email.trim())) {
      next.email = "Informe um e-mail válido, como nome@email.com.";
    }
    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;

    const nextErrors = validate();
    setErrors(nextErrors);

    if (nextErrors.name) {
      nameRef.current?.focus();
      return;
    }
    if (nextErrors.email) {
      emailRef.current?.focus();
      return;
    }

    /* Campo-armadilha: preenchido apenas por robôs. */
    const form = event.currentTarget;
    const honeypot = form.elements.namedItem("empresa") as HTMLInputElement | null;
    if (honeypot?.value) return;

    setStatus("loading");

    try {
      if (ENDPOINT) {
        const response = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            nome: name.trim(),
            email: email.trim(),
            origem: id,
            material: "E-book: 100 frases essenciais",
          }),
        });
        if (!response.ok) throw new Error("Falha no envio");
      } else {
        /* Sem back-end: a landing page apenas simula a confirmação. */
        await new Promise((resolve) => setTimeout(resolve, 900));
      }

      setSentTo({ name: name.trim(), email: email.trim() });
      setStatus("success");
      /* Leva o foco para a confirmação, para quem navega por teclado ou leitor de tela. */
      window.setTimeout(() => successRef.current?.focus(), 60);
      setName("");
      setEmail("");
      setErrors({});
    } catch {
      setStatus("error");
    }
  }

  const loading = status === "loading";

  return (
    <section
      id={id}
      className={`section ${styles.section}`}
      data-variant={variant}
      aria-labelledby={titleId}
    >
      <div className="container">
        <Reveal className={styles.card}>
          <div className={styles.showcase}>
            <div className={styles.showcaseArt}>
              <EbookIllustration />
            </div>
            <ul className={styles.badges}>
              <li>
                <IconDownload width={14} height={14} />
                PDF + áudios
              </li>
              <li>
                <IconSparkle width={14} height={14} />
                32 páginas
              </li>
              <li>
                <IconVideo width={14} height={14} />
                Entrega imediata
              </li>
            </ul>
          </div>

          <div className={styles.panel}>
            <p className="eyebrow">{eyebrow}</p>
            <h2 id={titleId}>{title}</h2>
            <p className={styles.description}>{description}</p>

            <ul className={styles.bullets}>
              {EBOOK_BULLETS.map((bullet) => (
                <li key={bullet}>
                  <IconCheck width={18} height={18} />
                  {bullet}
                </li>
              ))}
            </ul>

            {status === "success" ? (
              <div className={styles.success} role="status" ref={successRef} tabIndex={-1}>
                <span className={styles.successIcon} aria-hidden>
                  <IconCheckCircle width={26} height={26} />
                </span>
                <h3>Pronto, {sentTo.name.split(" ")[0]}! Seu e-book está a caminho.</h3>
                <p>
                  Enviamos o PDF e os áudios para <strong>{sentTo.email}</strong>. No mesmo e-mail
                  vai o link para agendar a sua aula experimental gratuita de 30 minutos.
                </p>
                <p>Não chegou em alguns minutos? Vale conferir a caixa de promoções ou spam.</p>
                <button
                  type="button"
                  className={styles.successAgain}
                  onClick={() => setStatus("idle")}
                >
                  Enviar para outro e-mail
                </button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor={nameId}>
                    Nome
                  </label>
                  <span className={styles.inputWrap}>
                    <IconUser width={19} height={19} />
                    <input
                      ref={nameRef}
                      id={nameId}
                      name="nome"
                      type="text"
                      className={styles.input}
                      placeholder="Seu primeiro nome"
                      autoComplete="given-name"
                      value={name}
                      onChange={(event) => {
                        setName(event.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      aria-invalid={errors.name ? "true" : undefined}
                      aria-describedby={errors.name ? `${nameId}-erro` : undefined}
                      required
                    />
                  </span>
                  {errors.name ? (
                    <span className={styles.error} id={`${nameId}-erro`}>
                      <IconAlert width={14} height={14} />
                      {errors.name}
                    </span>
                  ) : null}
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor={emailId}>
                    E-mail
                  </label>
                  <span className={styles.inputWrap}>
                    <IconMail width={19} height={19} />
                    <input
                      ref={emailRef}
                      id={emailId}
                      name="email"
                      type="email"
                      className={styles.input}
                      placeholder="voce@email.com"
                      autoComplete="email"
                      inputMode="email"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      aria-invalid={errors.email ? "true" : undefined}
                      aria-describedby={errors.email ? `${emailId}-erro` : undefined}
                      required
                    />
                  </span>
                  {errors.email ? (
                    <span className={styles.error} id={`${emailId}-erro`}>
                      <IconAlert width={14} height={14} />
                      {errors.email}
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

                {status === "error" ? (
                  <p className={styles.formError} role="alert">
                    <IconAlert width={18} height={18} />
                    Não conseguimos enviar agora. Verifique a conexão e tente novamente em alguns
                    segundos.
                  </p>
                ) : null}

                <button
                  type="submit"
                  className={`btn btn--primary btn--block ${styles.submit}`}
                  data-loading={loading}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className={styles.spinner} aria-hidden />
                      Enviando…
                    </>
                  ) : (
                    <>
                      <IconDownload width={20} height={20} />
                      Baixar e-book
                    </>
                  )}
                </button>

                <p className={styles.privacy}>
                  <IconShield width={15} height={15} />
                  Sem spam, sem ligação de vendedor. Você sai da lista com um clique, quando quiser.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
