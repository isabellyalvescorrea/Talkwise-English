import { ImageResponse } from "next/og";

export const alt = "Talkwise English — Fale inglês com confiança em 90 dias";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Busca o arquivo TrueType da Sora no Google Fonts durante o build.
 * O renderizador da imagem não lê woff2, por isso a requisição usa um
 * User-Agent antigo — que faz o Google devolver TTF. Se algo falhar ou
 * demorar demais, a imagem é gerada com a fonte padrão: o build nunca
 * depende dessa requisição para terminar.
 */
async function loadSora(weight: 400 | 700): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Sora:wght@${weight}`,
      {
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64)" },
        signal: AbortSignal.timeout(8000),
      },
    ).then((response) => response.text());

    const url = css.match(/src:\s*url\((https:[^)]+)\)/)?.[1];
    if (!url) return null;

    return await fetch(url, { signal: AbortSignal.timeout(8000) }).then((response) =>
      response.arrayBuffer(),
    );
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const [regular, bold] = await Promise.all([loadSora(400), loadSora(700)]);
  const fonts = [
    regular && { name: "Sora", data: regular, weight: 400 as const, style: "normal" as const },
    bold && { name: "Sora", data: bold, weight: 700 as const, style: "normal" as const },
  ].filter((font): font is NonNullable<typeof font> => Boolean(font));

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
          backgroundColor: "#1B3A5C",
          backgroundImage:
            "radial-gradient(900px 520px at 88% 6%, rgba(255,107,74,0.32), transparent 62%)",
          color: "#FFFFFF",
          fontFamily: fonts.length ? "Sora" : undefined,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 68,
              height: 68,
              borderRadius: 22,
              backgroundColor: "#FFFFFF",
            }}
          >
            <div style={{ display: "flex", gap: 7 }}>
              <div style={{ width: 11, height: 11, borderRadius: 6, backgroundColor: "#1B3A5C" }} />
              <div style={{ width: 11, height: 11, borderRadius: 6, backgroundColor: "#1B3A5C" }} />
              <div style={{ width: 11, height: 11, borderRadius: 6, backgroundColor: "#FF6B4A" }} />
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700, letterSpacing: -1 }}>
            Talkwise English
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div
            style={{
              display: "flex",
              fontSize: 74,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: -2,
              maxWidth: 900,
            }}
          >
            Fale inglês com confiança em 90 dias
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#C6D4E2", maxWidth: 860 }}>
            Aulas ao vivo, 100% focadas em conversação real.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              padding: "16px 30px",
              borderRadius: 999,
              backgroundColor: "#FF6B4A",
              color: "#22262B",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            Aula experimental grátis
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#C6D4E2" }}>
            Sem cartão de crédito
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined },
  );
}
