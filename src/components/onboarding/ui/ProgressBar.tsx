import styles from "../onboarding.module.css";

type ProgressBarProps = {
  /** Progress from `0` to `1`. Values outside the range are clamped. */
  value: number;
};

/**
 * Thin orange progress bar pinned to the top of the card, with an animated
 * shimmer that continues even after the fill reaches 100%.
 */
export function ProgressBar({ value }: ProgressBarProps) {
  const clamped = Math.min(1, Math.max(0, value));
  return (
    <div
      className={styles.progressBar}
      role="progressbar"
      aria-valuenow={Math.round(clamped * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Progreso de la incorporación"
    >
      <div
        className={styles.progressFill}
        style={{ width: `${clamped * 100}%` }}
      />
    </div>
  );
}
