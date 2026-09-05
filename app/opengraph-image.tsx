import { ImageResponse } from "next/og";

export const alt = "Talkwise English: fale inglês com confiança";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Busca o arquivo TrueType da Fraunces no Google Fonts durante o build.
 * O renderizador não lê woff2, por isso a requisição usa um User-Agent antigo,
 * que faz o Google devolver TTF. Se falhar ou demorar, a imagem sai com a
 * fonte padrão: o build nunca depende dessa requisição.
 */
async function carregarFonte(familia: string, peso: number): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${familia}:wght@${peso}`,
      {
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64)" },
        signal: AbortSignal.timeout(8000),
      },
    ).then((resposta) => resposta.text());

    const url = css.match(/src:\s*url\((https:[^)]+)\)/)?.[1];
    if (!url) return null;

    return await fetch(url, { signal: AbortSignal.timeout(8000) }).then((resposta) =>
      resposta.arrayBuffer(),
    );
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const [serif, sans] = await Promise.all([
    carregarFonte("Fraunces", 600),
    carregarFonte("Inter", 400),
  ]);

  const fonts = [
    serif && { name: "Fraunces", data: serif, weight: 600 as const, style: "normal" as const },
    sans && { name: "Inter", data: sans, weight: 400 as const, style: "normal" as const },
  ].filter((fonte): fonte is NonNullable<typeof fonte> => Boolean(fonte));

  const serifFamily = serif ? "Fraunces" : undefined;
  const sansFamily = sans ? "Inter" : undefined;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#16324F",
          color: "#F5EFE6",
          fontFamily: sansFamily,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              width: 56,
              height: 56,
              borderRadius: 8,
              background: "linear-gradient(135deg, #D9C4A3, #B89768)",
            }}
          />
          <div style={{ display: "flex", fontSize: 34, fontFamily: serifFamily, fontWeight: 600 }}>
            Talkwise
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 76,
              lineHeight: 1.12,
              letterSpacing: -1,
              maxWidth: 940,
              fontFamily: serifFamily,
              fontWeight: 600,
            }}
          >
            <span>Fale&nbsp;</span>
            <span style={{ color: "#AAB4C0" }}>inglês&nbsp;</span>
            <span>com&nbsp;</span>
            <span style={{ color: "#E3BE8C" }}>confiança.</span>
          </div>
          <div style={{ display: "flex", fontSize: 29, color: "#AEBAC9", maxWidth: 800 }}>
            Aulas ao vivo, em grupos pequenos, com professores nativos.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              padding: "16px 30px",
              borderRadius: 8,
              background: "linear-gradient(135deg, #D9C4A3, #B89768)",
              color: "#1B2733",
              fontSize: 25,
              fontWeight: 600,
            }}
          >
            Reservar aula grátis
          </div>
          <div style={{ display: "flex", fontSize: 23, color: "#AEBAC9" }}>
            Sem cartão de crédito
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined },
  );
}
