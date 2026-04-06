import { useMemo, useState } from "react";
import { buildChampionSplashCandidates } from "../../utils/tft/buildChampionSplashCandidates";

interface Props {
  characterId?: string | null;
  fallbackSrc?: string;
  alt: string;
  className?: string;
}

export function TftChampionArtwork({
  characterId,
  fallbackSrc,
  alt,
  className = "",
}: Props) {
  const candidates = useMemo(
    () => buildChampionSplashCandidates(characterId),
    [characterId]
  );

  const [index, setIndex] = useState(0);

  const isUsingFallback = index >= candidates.length;

  const currentSrc = isUsingFallback
    ? fallbackSrc ?? ""
    : candidates[index] ?? "";

  return (
    <img
      key={characterId}
      src={currentSrc}
      alt={alt}
      className={className}
      onError={() => {
        if (index <= candidates.length) {
          setIndex((prev) => prev + 1);
        }
      }}
    />
  );
}