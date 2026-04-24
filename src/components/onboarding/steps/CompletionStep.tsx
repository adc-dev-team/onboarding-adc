import { PLATFORM_URL } from "@/lib/onboarding-data";
import { CtaButton } from "../ui/CtaButton";
import styles from "../onboarding.module.css";

type CompletionStepProps = {
  name: string;
  onRestart: () => void;
};

type TimelineEntry = readonly [when: string, what: string];

const TIMELINE: ReadonlyArray<TimelineEntry> = [
  [
    "En las próximas horas",
    "Los profesores verán tu ingreso en los grupos y se pondrán en contacto contigo",
  ],
  [
    "Hoy mismo",
    "Accede al temario completo. El calendario de clases se actualiza cada semana",
  ],
  [
    "Esta semana",
    "Participa en el grupo de Ejercicios con dudas de psicotécnicos. Los militares del Grupo General responden rápido",
  ],
];

export function CompletionStep({ name, onRestart }: CompletionStepProps) {
  const goToPlatform = () => {
    if (typeof window !== "undefined") {
      window.open(PLATFORM_URL, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      <div className={styles.completionHero}>
        <span className={styles.medal} aria-hidden="true">
          🎖️
        </span>
        <div className={styles.badge}>INCORPORACIÓN COMPLETADA</div>
        <h2 className={styles.h2} style={{ marginBottom: 8 }}>
          Estás dentro,
          <br />
          {name}.
        </h2>
        <p className={styles.subtitle} style={{ marginBottom: 0 }}>
          Has activado todo tu acceso. Esto es lo que pasa ahora:
        </p>
      </div>

      <ol className={styles.timeline}>
        {TIMELINE.map(([when, what]) => (
          <li key={when} className={styles.tlItem}>
            <div className={styles.tlDot} aria-hidden="true" />
            <div>
              <div className={styles.tlTitle}>{when}</div>
              <div className={styles.tlDesc}>{what}</div>
            </div>
          </li>
        ))}
      </ol>

      <aside className={styles.daniCard}>
        <div className={styles.daniAvatar} aria-hidden="true">
          👨‍💼
        </div>
        <div>
          <div className={styles.daniName}>Dani</div>
          <div className={styles.daniRole}>Tu punto de contacto directo</div>
          <div className={styles.daniNote}>
            Cualquier duda, escríbeme por WhatsApp
          </div>
        </div>
      </aside>

      <CtaButton
        onClick={goToPlatform}
        style={{ marginBottom: 12 }}
      >
        IR A LA PLATAFORMA →
      </CtaButton>
      <CtaButton variant="ghost" onClick={onRestart}>
        VOLVER AL INICIO
      </CtaButton>
    </>
  );
}
