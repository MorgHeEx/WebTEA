import { useEffect, useRef } from "react";

type Options = {
  threshold?: number;
  rootMargin?: string;
};

/**
 * Dispara uma vez quando a seção entra de forma relevante na tela (leitura = "abriu").
 */
export function useSectionInView(
  onBecameVisible: () => void,
  enabled: boolean,
  options: Options = {},
) {
  const ref = useRef<HTMLElement | null>(null);
  const fired = useRef(false);
  const { threshold = 0.38, rootMargin = "0px 0px -12% 0px" } = options;

  useEffect(() => {
    fired.current = false;
  }, [enabled, onBecameVisible]);

  useEffect(() => {
    if (!enabled || fired.current) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const obs = new IntersectionObserver(
      (entries) => {
        const hit = entries.some((e) => e.isIntersecting && e.intersectionRatio >= threshold);
        if (hit && !fired.current) {
          fired.current = true;
          onBecameVisible();
          obs.disconnect();
        }
      },
      { threshold: [0, threshold, 0.6], rootMargin },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [enabled, onBecameVisible, threshold, rootMargin]);

  return ref;
}
