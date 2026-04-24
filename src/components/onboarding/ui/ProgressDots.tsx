import styles from "../onboarding.module.css";

type ProgressDotsProps = {
  /** Total number of dots to render. */
  total: number;
  /** 0-based index of the active dot. Dots before it render as "done". */
  current: number;
  /** Optional stagger class for entrance animation. */
  className?: string;
};

/**
 * Horizontal dash indicator ("active" elongates, "done" is muted). Purely
 * decorative — the underlying `<ol>` is labelled for screen readers.
 */
export function ProgressDots({ total, current, className }: ProgressDotsProps) {
  return (
    <ol
      className={[styles.progressDots, className].filter(Boolean).join(" ")}
      aria-label={`Paso ${current + 1} de ${total}`}
    >
      {Array.from({ length: total }).map((_, i) => {
        const state =
          i === current
            ? styles.dotActive
            : i < current
              ? styles.dotDone
              : "";
        return (
          <li
            key={i}
            className={[styles.dot, state].filter(Boolean).join(" ")}
            aria-hidden="true"
          />
        );
      })}
    </ol>
  );
}
