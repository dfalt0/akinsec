import { useEffect, useState } from "react";
import DarkVeil from "@/components/DarkVeil";

/**
 * Full-viewport background: React Bits–style Dark Veil (WebGL) when allowed,
 * with CSS static fallback for reduced motion, narrow viewports, or preference.
 */
export default function MarketingBackground() {
  const [useWebGL, setUseWebGL] = useState(false);

  useEffect(() => {
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const decide = () => {
      const narrow = window.innerWidth < 768;
      setUseWebGL(!mqReduce.matches && !narrow);
    };
    decide();
    mqReduce.addEventListener("change", decide);
    window.addEventListener("resize", decide);
    return () => {
      mqReduce.removeEventListener("change", decide);
      window.removeEventListener("resize", decide);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden
    >
      <div className="marketing-bg-static absolute inset-0" />
      {useWebGL && (
        <div className="absolute inset-0 opacity-90">
          <DarkVeil
            hueShift={0}
            noiseIntensity={0.035}
            scanlineIntensity={0.1}
            scanlineFrequency={0.45}
            speed={0.32}
            warpAmount={0.16}
            resolutionScale={1}
          />
        </div>
      )}
    </div>
  );
}
