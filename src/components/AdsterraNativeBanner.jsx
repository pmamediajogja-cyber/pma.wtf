import { useEffect, useRef } from "react";

const SCRIPT_SRC = "https://pl31364736.profitableratecpmnetwork.com/f8a018fff167a3338897f885d75d0d0d/invoke.js";
const CONTAINER_ID = "container-f8a018fff167a3338897f885d75d0d0d";

export default function AdsterraNativeBanner() {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    const container = document.createElement("div");
    container.id = CONTAINER_ID;
    host.appendChild(container);

    const script = document.createElement("script");
    script.async = true;
    script.dataset.cfasync = "false";
    script.src = SCRIPT_SRC;
    host.insertBefore(script, container);

    return () => {
      script.remove();
      container.remove();
    };
  }, []);

  return (
    <aside className="pma-ad-slot" aria-label="Advertisement">
      <div className="pma-ad-label">ADVERTISEMENT</div>
      <div ref={hostRef} className="pma-adsterra-native" />
    </aside>
  );
}
