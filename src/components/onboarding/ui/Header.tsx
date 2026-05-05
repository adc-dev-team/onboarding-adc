import Image from "next/image";

import styles from "../onboarding.module.css";

type HeaderProps = {
  /** 1-based index of the current actionable step (1–3). `null` hides the indicator. */
  stepNumber: number | null;
  /** Total number of actionable steps (used in the `N/M` display). */
  totalSteps: number;
};

/**
 * The sticky top bar: brand logo (no text), wordmark, and (for mid-flow
 * steps) a subtle "1/3" indicator on the right.
 *
 * The logo asset is the same `*NoText` mark used across the rest of the
 * ADC platform — kept in sync with `adc-frontend-v2/public/common/`.
 * Replaces the previous hexagon-with-emoji placeholder.
 */
export function Header({ stepNumber, totalSteps }: HeaderProps) {
  return (
    <header className={styles.header}>
      <Image
        src="/AdcGreenLogoNoText.png"
        alt=""
        aria-hidden="true"
        width={36}
        height={36}
        priority
        className={styles.logoMark}
      />
      <span className={styles.logoText}>Academia de Combate</span>
      {stepNumber !== null && (
        <span className={styles.stepIndicator} aria-live="polite">
          {stepNumber}/{totalSteps}
        </span>
      )}
    </header>
  );
}
