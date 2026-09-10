"use client";

import { useEffect } from "react";

/* Faixa de disparo. O recuo de baixo encurta a área considerada visível, de
   modo que o item só é revelado depois de entrar de fato na tela, e não no
   instante em que encosta na borda inferior. */
const LIMIAR = 0.2;
const RECUO = "0px 0px -12% 0px";

/**
 * Revelação por scroll, item a item.
 *
 * Um único observador atende a página inteira, mas cada elemento marcado com
 * `data-revelar` é registrado como um alvo próprio. Isso é o oposto de observar
 * o container: cada item gera sua própria entrada e aparece no momento em que
 * ele mesmo cruza a faixa, e não quando a seção inteira entra na tela.
 *
 * O observador nunca deixa de observar um alvo, então o efeito é reversível:
 * ao rolar de volta, o item some quando sai da faixa e reaparece ao voltar.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const raiz = document.documentElement;
    const itens = Array.from(document.querySelectorAll<HTMLElement>("[data-revelar]"));

    /* Sem suporte ao observador, revela tudo em vez de esconder para sempre. */
    if (itens.length === 0 || typeof IntersectionObserver === "undefined") {
      raiz.classList.remove("revelar-ativo");
      return;
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          entrada.target.classList.toggle("revelado", entrada.isIntersecting);
        });
      },
      { threshold: LIMIAR, rootMargin: RECUO },
    );

    itens.forEach((item) => observador.observe(item));
    return () => observador.disconnect();
  }, []);

  return null;
}
