import { SITE_URL } from "@/lib/site";

/**
 * Confirmação do pedido de aula experimental, por e-mail.
 *
 * A rota nunca aceita conteúdo de e-mail vindo do navegador: o assunto e o
 * corpo são fixos aqui, e do pedido só saem o endereço de destino e o primeiro
 * nome, usado na saudação. Isso impede que o endpoint vire relé de spam, que é
 * o risco de qualquer formulário público que dispara e-mail.
 */

const CHAVE = process.env.RESEND_API_KEY;
const REMETENTE = process.env.EMAIL_REMETENTE;

const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const LIMITE_POR_JANELA = 5;
const JANELA_MS = 10 * 60 * 1000;

/* Contador em memória. Numa função serverless cada instância tem o seu, então
   isto segura repetição óbvia, não um ataque distribuído. Para valer mesmo,
   o caminho é um limitador na borda ou um serviço externo. */
const tentativas = new Map<string, number[]>();

function excedeuLimite(chave: string): boolean {
  const agora = Date.now();
  const recentes = (tentativas.get(chave) ?? []).filter((t) => agora - t < JANELA_MS);
  recentes.push(agora);
  tentativas.set(chave, recentes);
  if (tentativas.size > 500) tentativas.clear();
  return recentes.length > LIMITE_POR_JANELA;
}

function escapar(texto: string): string {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Primeiro nome, sem quebras de linha e com tamanho limitado. */
function primeiroNome(bruto: string): string {
  return bruto.replace(/[\r\n]+/g, " ").trim().split(/\s+/)[0].slice(0, 40);
}

function corpo(nome: string): { assunto: string; html: string; texto: string } {
  const seguro = escapar(nome);

  return {
    assunto: "Recebemos seu pedido de aula experimental",
    html: `<!doctype html>
<html lang="pt-BR"><body style="margin:0;background:#16324F;padding:32px 16px;font-family:Helvetica,Arial,sans-serif">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#F5F1E8;border-radius:12px">
    <tr><td style="height:5px;background:#B89768;border-radius:12px 12px 0 0"></td></tr>
    <tr><td style="padding:32px">
      <p style="margin:0 0 20px;font-size:12px;letter-spacing:1.4px;text-transform:uppercase;color:#5F6975">Talkwise English</p>
      <h1 style="margin:0 0 16px;font-size:24px;line-height:1.3;color:#1B2733">Oi, ${seguro}. Sua aula está reservada.</h1>
      <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#1B2733">
        São 30 minutos ao vivo com um professor nativo. Você conversa desde o primeiro
        minuto, descobre seu nível e sai com o plano dos 90 dias.
      </p>
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 24px;width:100%;border-collapse:collapse">
        <tr>
          <td style="padding:10px 0;border-top:1px solid rgba(27,39,51,0.14);font-size:14px;color:#5F6975">Duração</td>
          <td style="padding:10px 0;border-top:1px solid rgba(27,39,51,0.14);font-size:14px;color:#1B2733;text-align:right">30 minutos</td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-top:1px solid rgba(27,39,51,0.14);font-size:14px;color:#5F6975">Formato</td>
          <td style="padding:10px 0;border-top:1px solid rgba(27,39,51,0.14);font-size:14px;color:#1B2733;text-align:right">Ao vivo, com professor nativo</td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-top:1px solid rgba(27,39,51,0.14);border-bottom:1px solid rgba(27,39,51,0.14);font-size:14px;color:#5F6975">Custo</td>
          <td style="padding:10px 0;border-top:1px solid rgba(27,39,51,0.14);border-bottom:1px solid rgba(27,39,51,0.14);font-size:14px;color:#1B2733;text-align:right">Gratuita, sem cartão</td>
        </tr>
      </table>
      <p style="margin:0 0 8px;font-size:14px;line-height:1.6;color:#5F6975">
        Em breve entramos em contato neste mesmo endereço para combinar o melhor horário.
        É só responder este e-mail se preferir sugerir um.
      </p>
      <p style="margin:0;font-size:14px"><a href="${SITE_URL}" style="color:#7A5C36">${SITE_URL}</a></p>
    </td></tr>
    <tr><td style="padding:0 32px 28px">
      <p style="margin:0;font-size:12px;line-height:1.5;color:#5F6975">
        Você recebeu este e-mail porque pediu uma aula experimental no site da Talkwise English.
      </p>
    </td></tr>
  </table>
</body></html>`,
    texto: `Oi, ${nome}. Sua aula está reservada.

São 30 minutos ao vivo com um professor nativo. Você conversa desde o primeiro
minuto, descobre seu nível e sai com o plano dos 90 dias.

Duração: 30 minutos
Formato: ao vivo, com professor nativo
Custo: gratuita, sem cartão

Em breve entramos em contato neste mesmo endereço para combinar o melhor horário.
É só responder este e-mail se preferir sugerir um.
${SITE_URL}

Você recebeu este e-mail porque pediu uma aula experimental no site da Talkwise English.`,
  };
}

export async function POST(request: Request) {
  let dados: unknown;
  try {
    dados = await request.json();
  } catch {
    return Response.json({ ok: false, erro: "corpo inválido" }, { status: 400 });
  }

  const { nome, email, empresa } = (dados ?? {}) as Record<string, unknown>;

  /* Campo-armadilha: preenchido, só pode ser robô. Responde 200 para não
     ensinar ao robô que a armadilha existe. */
  if (typeof empresa === "string" && empresa.trim() !== "") {
    return Response.json({ ok: true, modo: "descartado" });
  }

  if (typeof nome !== "string" || nome.trim().length < 2) {
    return Response.json({ ok: false, erro: "nome inválido" }, { status: 400 });
  }
  if (typeof email !== "string" || !EMAIL.test(email.trim()) || email.length > 254) {
    return Response.json({ ok: false, erro: "e-mail inválido" }, { status: 400 });
  }

  const origem =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "desconhecida";
  if (excedeuLimite(origem)) {
    return Response.json({ ok: false, erro: "muitas tentativas" }, { status: 429 });
  }

  /* Sem credencial configurada a página segue funcionando, mas nada é enviado.
     O aviso aparece no log da função para quem mantém o site. */
  if (!CHAVE || !REMETENTE) {
    console.warn(
      "[aula] RESEND_API_KEY ou EMAIL_REMETENTE ausente: nenhum e-mail foi enviado.",
    );
    return Response.json({ ok: true, modo: "demonstracao" });
  }

  const { assunto, html, texto } = corpo(primeiroNome(nome));

  try {
    const resposta = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CHAVE}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: REMETENTE,
        to: [email.trim()],
        subject: assunto,
        html,
        text: texto,
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!resposta.ok) {
      const detalhe = await resposta.text().catch(() => "");
      console.error("[aula] provedor recusou o envio:", resposta.status, detalhe.slice(0, 300));
      return Response.json({ ok: false, erro: "envio recusado" }, { status: 502 });
    }

    return Response.json({ ok: true, modo: "enviado" });
  } catch (erro) {
    console.error("[aula] falha ao falar com o provedor:", erro);
    return Response.json({ ok: false, erro: "provedor indisponível" }, { status: 502 });
  }
}
