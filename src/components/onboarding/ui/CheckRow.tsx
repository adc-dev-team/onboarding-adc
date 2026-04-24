import styles from "../onboarding.module.css";

type CheckRowProps = {
  checked: boolean;
  onToggle: () => void;
  label: string;
  sublabel?: string;
};

/**
 * A confirmation toggle rendered as a real `<button aria-pressed>` so
 * keyboard users can activate it with space/enter and screen readers
 * announce the pressed state.
 */
export function CheckRow({ checked, onToggle, label, sublabel }: CheckRowProps) {
  return (
    <button
      type="button"
      className={[styles.checkRow, checked && styles.checkRowChecked]
        .filter(Boolean)
        .join(" ")}
      onClick={onToggle}
      aria-pressed={checked}
    >
      <span
        className={[styles.checkBox, checked && styles.checkBoxChecked]
          .filter(Boolean)
          .join(" ")}
        aria-hidden="true"
      >
        {checked && "✓"}
      </span>
      <span>
        <span className={styles.checkLabel}>{label}</span>
        {sublabel && <span className={styles.checkSub}>{sublabel}</span>}
      </span>
    </button>
  );
}
