import type { CSSProperties } from "react";

const titleFont: CSSProperties = { fontFamily: "var(--font-title)", fontWeight: 600 };

/* ---------------------------------------------------------------------------
   Marca
   ------------------------------------------------------------------------- */

export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden
      focusable="false"
    >
      <rect width="40" height="40" rx="12" fill="#1B3A5C" />
      <path
        d="M10 17.2A5.2 5.2 0 0 1 15.2 12h9.6a5.2 5.2 0 0 1 5.2 5.2v2.2a5.2 5.2 0 0 1-5.2 5.2h-6.2L13 29v-4.6a5.2 5.2 0 0 1-3-4.7v-2.5Z"
        fill="#FFFFFF"
      />
      <circle cx="16.4" cy="18.4" r="1.9" fill="#1B3A5C" />
      <circle cx="22" cy="18.4" r="1.9" fill="#1B3A5C" />
      <circle cx="27.6" cy="18.4" r="1.9" fill="#FF6B4A" />
    </svg>
  );
}

/* ---------------------------------------------------------------------------
   Hero — duas pessoas conversando, balões de fala e globo estilizado
   ------------------------------------------------------------------------- */

export function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 560 500"
      role="img"
      aria-label="Ilustração de duas pessoas conversando em inglês com balões de fala e um globo terrestre estilizado ao fundo."
      style={{ width: "100%", height: "auto" }}
    >
      <defs>
        <pattern id="tw-dots" width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="2.5" cy="2.5" r="2.2" fill="#1B3A5C" opacity="0.16" />
        </pattern>
        <filter id="tw-soft" x="-25%" y="-25%" width="150%" height="160%">
          <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#1B3A5C" floodOpacity="0.16" />
        </filter>
      </defs>

      {/* Fundo */}
      <circle cx="368" cy="176" r="164" fill="#EDF3FA" />
      <circle cx="118" cy="368" r="112" fill="#FFF1EC" />
      <rect x="18" y="44" width="108" height="108" fill="url(#tw-dots)" />
      <circle cx="518" cy="112" r="22" fill="none" stroke="#FF6B4A" strokeWidth="4" opacity="0.55" />
      <circle cx="500" cy="356" r="13" fill="#FF6B4A" />
      <circle cx="60" cy="286" r="9" fill="#1B3A5C" opacity="0.18" />

      {/* Globo */}
      <g>
        <circle cx="400" cy="160" r="76" fill="#FFFFFF" stroke="#1B3A5C" strokeWidth="3" />
        <ellipse
          cx="400"
          cy="160"
          rx="31"
          ry="76"
          fill="none"
          stroke="#1B3A5C"
          strokeWidth="2"
          opacity="0.35"
        />
        <path d="M324 160h152" stroke="#1B3A5C" strokeWidth="2" opacity="0.35" />
        <path
          d="M334 118c20 12 42 18 66 18s46-6 66-18"
          fill="none"
          stroke="#1B3A5C"
          strokeWidth="2"
          opacity="0.35"
        />
        <path
          d="M334 202c20-12 42-18 66-18s46 6 66 18"
          fill="none"
          stroke="#1B3A5C"
          strokeWidth="2"
          opacity="0.35"
        />
        <path
          d="M352 128c10-6 22-4 26 3s-4 12-1 18-9 14-18 9-14-24-7-30Z"
          fill="#CFE0EF"
        />
        <path
          d="M414 168c12-8 26-6 32 2s-2 16-9 20-20 6-25-2 -3-16 2-20Z"
          fill="#CFE0EF"
        />
        <path
          d="M400 96c6 0 10 4 10 9 0 6-10 15-10 15s-10-9-10-15c0-5 4-9 10-9Z"
          fill="#FF6B4A"
        />
      </g>

      {/* Chão */}
      <ellipse cx="176" cy="462" rx="74" ry="13" fill="#1B3A5C" opacity="0.08" />
      <ellipse cx="331" cy="456" rx="60" ry="11" fill="#1B3A5C" opacity="0.08" />

      {/* Pessoa da esquerda */}
      <g>
        <rect x="128" y="328" width="94" height="130" rx="42" fill="#FF6B4A" />
        <path d="M150 330c8 16 42 16 50 0" fill="#F2542F" opacity="0.55" />
        <rect x="163" y="300" width="24" height="32" rx="12" fill="#E8B189" />
        <circle cx="175" cy="286" r="36" fill="#F3C7A6" />
        <circle cx="157" cy="295" r="5.5" fill="#FF6B4A" opacity="0.28" />
        <circle cx="195" cy="295" r="5.5" fill="#FF6B4A" opacity="0.28" />
        <circle cx="164" cy="284" r="3.1" fill="#22262B" />
        <circle cx="188" cy="284" r="3.1" fill="#22262B" />
        <path
          d="M167 297c4.5 4.5 12.5 4.5 17 0"
          fill="none"
          stroke="#22262B"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <path
          d="M139 288c-3-28 14-44 36-44s39 16 36 44c-3-12-9-18-15-21-9 5-27 6-38 1-8 3-16 8-19 20Z"
          fill="#3B2F2A"
        />
      </g>

      {/* Pessoa da direita */}
      <g>
        <rect x="288" y="340" width="86" height="116" rx="38" fill="#1B3A5C" />
        <path d="M308 342c7 14 38 14 45 0" fill="#0F2337" opacity="0.5" />
        <rect x="320" y="316" width="22" height="28" rx="11" fill="#C98F67" />
        <circle cx="331" cy="304" r="32" fill="#DCA079" />
        <circle cx="322" cy="303" r="2.9" fill="#22262B" />
        <circle cx="341" cy="303" r="2.9" fill="#22262B" />
        <path
          d="M324 314c3.8 3.8 10.7 3.8 14.5 0"
          fill="none"
          stroke="#22262B"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <circle cx="331" cy="272" r="12" fill="#2A1F1B" />
        <path
          d="M299 306c-2-26 13-40 32-40s34 14 32 40c-4-13-12-19-19-21-10 4-23 4-32-1-6 4-11 10-13 22Z"
          fill="#2A1F1B"
        />
      </g>

      {/* Balão claro */}
      <g filter="url(#tw-soft)">
        <path d="M96 244l6 30 26-24-32-6Z" fill="#FFFFFF" />
        <rect x="46" y="160" width="216" height="88" rx="26" fill="#FFFFFF" />
      </g>
      <text x="70" y="196" style={titleFont} fontSize="21" fill="#22262B">
        Hi! How was
      </text>
      <text x="70" y="224" style={titleFont} fontSize="21" fill="#22262B">
        your weekend?
      </text>

      {/* Balão escuro */}
      <g filter="url(#tw-soft)">
        <path d="M388 296l-22 28 34-10-12-18Z" fill="#1B3A5C" />
        <rect x="370" y="228" width="176" height="72" rx="24" fill="#1B3A5C" />
      </g>
      <text x="394" y="262" style={titleFont} fontSize="20" fill="#FFFFFF">
        It was great —
      </text>
      <text x="394" y="286" style={titleFont} fontSize="20" fill="#FFFFFF">
        let&apos;s talk!
      </text>

      {/* Indicador de digitação */}
      <g>
        <rect x="224" y="222" width="64" height="40" rx="20" fill="#FF6B4A" />
        <circle cx="242" cy="242" r="4.5" fill="#22262B" opacity="0.75" />
        <circle cx="256" cy="242" r="4.5" fill="#22262B" opacity="0.55" />
        <circle cx="270" cy="242" r="4.5" fill="#22262B" opacity="0.35" />
      </g>
    </svg>
  );
}

/* ---------------------------------------------------------------------------
   E-book — capa do material de captura
   ------------------------------------------------------------------------- */

export function EbookIllustration() {
  return (
    <svg
      viewBox="0 0 420 400"
      role="img"
      aria-label="Ilustração da capa do e-book gratuito com as 100 frases essenciais em inglês."
      style={{ width: "100%", height: "auto" }}
    >
      <defs>
        <filter id="tw-book-shadow" x="-30%" y="-20%" width="170%" height="150%">
          <feDropShadow dx="0" dy="16" stdDeviation="18" floodColor="#1B3A5C" floodOpacity="0.24" />
        </filter>
      </defs>

      <circle cx="316" cy="96" r="76" fill="#FFE2DA" />
      <circle cx="86" cy="312" r="60" fill="#E5EDF5" />

      {/* Páginas de trás */}
      <g transform="rotate(-9 210 210)">
        <rect x="118" y="60" width="196" height="272" rx="16" fill="#FFFFFF" opacity="0.75" />
      </g>
      <g transform="rotate(-4.5 210 210)">
        <rect x="122" y="56" width="196" height="272" rx="16" fill="#FFFFFF" />
      </g>

      {/* Capa */}
      <g filter="url(#tw-book-shadow)">
        <rect x="126" y="52" width="196" height="272" rx="16" fill="#1B3A5C" />
        <rect x="126" y="52" width="14" height="272" rx="7" fill="#12283F" />
        <rect x="158" y="86" width="44" height="6" rx="3" fill="#FF6B4A" />
        <text x="158" y="140" style={titleFont} fontSize="34" fontWeight={700} fill="#FFFFFF">
          100
        </text>
        <text x="158" y="170" style={titleFont} fontSize="19" fill="#FFFFFF">
          frases
        </text>
        <text x="158" y="194" style={titleFont} fontSize="19" fill="#FFFFFF">
          essenciais
        </text>
        <rect x="158" y="214" width="120" height="2" rx="1" fill="#FFFFFF" opacity="0.25" />
        <text x="158" y="238" style={titleFont} fontSize="12.5" fill="#C6D4E2">
          para a sua primeira
        </text>
        <text x="158" y="256" style={titleFont} fontSize="12.5" fill="#C6D4E2">
          conversa em inglês
        </text>
        <g opacity="0.9">
          <rect x="158" y="278" width="26" height="26" rx="9" fill="#FF6B4A" />
          <circle cx="166" cy="291" r="2.6" fill="#22262B" />
          <circle cx="171.5" cy="291" r="2.6" fill="#22262B" />
          <circle cx="177" cy="291" r="2.6" fill="#22262B" />
        </g>
      </g>

      {/* Cartão de áudio flutuante */}
      <g filter="url(#tw-book-shadow)">
        <rect x="252" y="292" width="152" height="66" rx="18" fill="#FFFFFF" />
      </g>
      <circle cx="282" cy="325" r="17" fill="#FF6B4A" />
      <path d="M278 318l11 7-11 7v-14Z" fill="#22262B" />
      <rect x="308" y="318" width="4" height="14" rx="2" fill="#1B3A5C" opacity="0.35" />
      <rect x="316" y="312" width="4" height="26" rx="2" fill="#1B3A5C" opacity="0.55" />
      <rect x="324" y="317" width="4" height="16" rx="2" fill="#1B3A5C" opacity="0.4" />
      <rect x="332" y="308" width="4" height="34" rx="2" fill="#FF6B4A" />
      <rect x="340" y="316" width="4" height="18" rx="2" fill="#1B3A5C" opacity="0.45" />
      <rect x="348" y="321" width="4" height="8" rx="2" fill="#1B3A5C" opacity="0.3" />
      <rect x="356" y="314" width="4" height="22" rx="2" fill="#1B3A5C" opacity="0.5" />
      <rect x="364" y="319" width="4" height="12" rx="2" fill="#1B3A5C" opacity="0.35" />
      <rect x="372" y="323" width="4" height="4" rx="2" fill="#1B3A5C" opacity="0.25" />

      {/* Selo "grátis" */}
      <g>
        <circle cx="104" cy="128" r="38" fill="#FF6B4A" />
        <text
          x="104"
          y="122"
          style={titleFont}
          fontSize="15"
          fontWeight={700}
          fill="#22262B"
          textAnchor="middle"
        >
          100%
        </text>
        <text
          x="104"
          y="140"
          style={titleFont}
          fontSize="15"
          fontWeight={700}
          fill="#22262B"
          textAnchor="middle"
        >
          grátis
        </text>
      </g>
    </svg>
  );
}

/* ---------------------------------------------------------------------------
   Globo pontilhado — elemento decorativo da seção "Sobre nós"
   ------------------------------------------------------------------------- */

function buildGlobeDots() {
  const dots: { x: number; y: number; o: number }[] = [];
  const cx = 160;
  const cy = 160;
  const radius = 150;
  for (let y = 14; y <= 306; y += 15) {
    for (let x = 14; x <= 306; x += 15) {
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > radius - 8) continue;
      dots.push({ x, y, o: Number((0.42 - (dist / radius) * 0.24).toFixed(3)) });
    }
  }
  return dots;
}

const GLOBE_DOTS = buildGlobeDots();

export function DottedGlobe({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 320" className={className} aria-hidden focusable="false">
      <circle cx="160" cy="160" r="150" fill="none" stroke="#1B3A5C" strokeWidth="2" opacity="0.18" />
      {GLOBE_DOTS.map((dot) => (
        <circle
          key={`${dot.x}-${dot.y}`}
          cx={dot.x}
          cy={dot.y}
          r="3"
          fill="#1B3A5C"
          opacity={dot.o}
        />
      ))}
      <circle cx="118" cy="96" r="9" fill="#FF6B4A" />
      <circle cx="212" cy="146" r="9" fill="#FF6B4A" />
      <circle cx="146" cy="222" r="9" fill="#FF6B4A" />
    </svg>
  );
}
