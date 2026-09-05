const FALLBACK_SITE_URL = "https://talkwise-english.vercel.app";

/**
 * Resolve a URL canônica do site.
 *
 * Cuidados que o build da Vercel exige:
 * - variáveis `NEXT_PUBLIC_*` não declaradas chegam como string vazia (e não
 *   como `undefined`), então `??` não basta — é preciso testar o valor;
 * - o valor pode vir sem protocolo (`talkwise.com.br`) ao ser colado no painel;
 * - qualquer valor inválido precisa cair no padrão em vez de derrubar o build,
 *   porque `new URL("")` lança `ERR_INVALID_URL` durante a coleta de metadados.
 */
function normalize(value: string | undefined): string | null {
  const raw = value?.trim();
  if (!raw) return null;

  const candidate = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;

  try {
    return new URL(candidate).origin;
  } catch {
    return null;
  }
}

function resolveSiteUrl(): string {
  return (
    normalize(process.env.NEXT_PUBLIC_SITE_URL) ??
    /* Domínio estável de produção, injetado pela Vercel. */
    normalize(process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL) ??
    /* URL do deploy atual (previews). */
    normalize(process.env.NEXT_PUBLIC_VERCEL_URL) ??
    FALLBACK_SITE_URL
  );
}

export const SITE_URL = resolveSiteUrl();
