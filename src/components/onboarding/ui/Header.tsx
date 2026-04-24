import styles from "../onboarding.module.css";

type HeaderProps = {
  /** 1-based index of the current actionable step (1–3). `null` hides the indicator. */
  stepNumber: number | null;
  /** Total number of actionable steps (used in the `N/M` display). */
  totalSteps: number;
};

/**
 * The sticky top bar: hexagonal logo mark, wordmark, and (for mid-flow
 * steps) a subtle "1/3" indicator on the right.
 */
export function Header({ stepNumber, totalSteps }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.logoMark} aria-hidden="true">
        ⚔️
      </div>
      <span className={styles.logoText}>Academia de Combate</span>
      {stepNumber !== null && (
        <span className={styles.stepIndicator} aria-live="polite">
          {stepNumber}/{totalSteps}
        </span>
      )}
    </header>
  );
}
