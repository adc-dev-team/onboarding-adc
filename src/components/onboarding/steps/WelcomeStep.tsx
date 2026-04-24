import { ProgressDots } from "../ui/ProgressDots";
import { CtaButton } from "../ui/CtaButton";
import styles from "../onboarding.module.css";

type WelcomeStepProps = {
  name: string;
  totalDots: number;
  onStart: () => void;
};

const FEATURES: ReadonlyArray<readonly [emoji: string, label: string]> = [
  ["🎓", "Clases en directo"],
  ["👥", "10 militares activos"],
  ["📋", "Avisos oficiales"],
];

export function WelcomeStep({ name, totalDots, onStart }: WelcomeStepProps) {
  return (
    <>
      <ProgressDots
        total={totalDots}
        current={0}
        className={`${styles.stagger} ${styles.stagger1}`}
      />
      <div className={`${styles.eyebrow} ${styles.stagger} ${styles.stagger1}`}>
        <span className={styles.liveDot} aria-hidden="true" />
        Incorporación activa
      </div>
      <h1 className={`${styles.h1} ${styles.stagger} ${styles.stagger2}`}>
        Bienvenido/a,
        <br />
        {name}.
      </h1>
      <p
        className={`${styles.subtitle} ${styles.stagger} ${styles.stagger3}`}
        style={{ marginBottom: 20 }}
      >
        Tu plaza está confirmada. Activa tu acceso en 4 pasos rápidos para
        empezar hoy mismo.
      </p>

      <div className={`${styles.featureGrid} ${styles.stagger} ${styles.stagger4}`}>
        {FEATURES.map(([emoji, label]) => (
          <div key={label} className={styles.featureTile}>
            <div className={styles.featureEmoji} aria-hidden="true">
              {emoji}
            </div>
            <div className={styles.featureLabel}>{label}</div>
          </div>
        ))}
      </div>

      <div className={`${styles.infoBox} ${styles.stagger} ${styles.stagger5}`}>
        <p className={styles.infoBoxText}>
          <strong>¿Qué vas a configurar?</strong>
          <br />
          Los 3 grupos de Telegram donde viven las clases, los profesores y los
          avisos importantes.
        </p>
      </div>

      <CtaButton
        tight
        className={`${styles.stagger} ${styles.stagger6}`}
        onClick={onStart}
      >
        ACTIVAR MI ACCESO →
      </CtaButton>
    </>
  );
}
