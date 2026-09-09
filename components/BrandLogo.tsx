import Image from "next/image";
import logo from "@/public/logo-talkwise.png";

/* O arquivo é 660 x 198, ou seja, exatamente 10:3. Toda altura múltipla de 3
   resulta em largura inteira, o que evita reamostragem por fração de pixel. */
const PROPORCAO = 10 / 3;

type Props = {
  /** Altura em px. Múltiplos de 3 mantêm a largura inteira. */
  height: number;
  className?: string;
  /**
   * Texto alternativo. Vazio quando o elemento que envolve a logo já carrega o
   * nome acessível, como o link do topo, para não anunciar a marca duas vezes.
   */
  alt?: string;
  /** A logo da faixa fixa está acima da dobra e não deve esperar o lazy load. */
  eager?: boolean;
};

/**
 * Marca da Talkwise English. O arquivo é o próprio material da marca, recortado
 * no limite do conteúdo para que o espaçamento venha do CSS e não de área
 * transparente dentro da imagem.
 *
 * As medidas vão nos atributos, e não no CSS: assim o Next gera um srcset curto,
 * de 1x e 2x da largura real de exibição, em vez da lista inteira de larguras.
 */
export default function BrandLogo({ height, className, alt = "Talkwise English", eager = false }: Props) {
  return (
    <Image
      src={logo}
      alt={alt}
      width={Math.round(height * PROPORCAO)}
      height={height}
      className={className}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
    />
  );
}
