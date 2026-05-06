import { TUTORIAL_VIMEO_ID } from "@/lib/onboarding-data";
import { ProgressDots } from "../ui/ProgressDots";
import { CtaButton } from "../ui/CtaButton";
import { CheckRow } from "../ui/CheckRow";
import { VideoEmbed } from "../ui/VideoEmbed";
import styles from "../onboarding.module.css";

type TutorialStepProps = {
  totalDots: number;
  confirmed: boolean;
  onToggleConfirmed: () => void;
  onFinish: () => void;
};

export function TutorialStep({
  totalDots,
  confirmed,
  onToggleConfirmed,
  onFinish,
}: TutorialStepProps) {
  return (
    <>
      <ProgressDots total={totalDots} current={3} />
      <div className={styles.eyebrow}>Paso 3 de 3</div>
      <h2 className={styles.h2}>
        Tutorial de
        <br />
        la plataforma
      </h2>
      <p className={styles.subtitle} style={{ marginBottom: 16 }}>
        5 minutos que te ahorran horas de confusión. Dónde está todo, cómo
        acceder y qué hacer primero.
      </p>

      <VideoEmbed
        vimeoId={TUTORIAL_VIMEO_ID}
        title="Tutorial oficial — Academia de Combate"
      />
      <p className={styles.videoLabel}>
        Tutorial oficial — Academia de Combate
      </p>

      <div style={{ marginBottom: 16 }}>
        <CheckRow
          checked={confirmed}
          onToggle={onToggleConfirmed}
          label="He visto el tutorial"
          sublabel="Ya sé cómo funciona la plataforma"
        />
      </div>

      <CtaButton onClick={onFinish} disabled={!confirmed}>
        {confirmed ? "FINALIZAR INCORPORACIÓN →" : "VE EL TUTORIAL PRIMERO"}
      </CtaButton>
    </>
  );
}
