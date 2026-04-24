import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "../onboarding.module.css";

type CtaVariant = "primary" | "ghost";

type CtaButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  children: ReactNode;
  /** `primary` (default) is the glowing orange CTA. `ghost` is a muted outline. */
  variant?: CtaVariant;
  /** Trims the default top-auto margin so the button sits tighter to content. */
  tight?: boolean;
};

/**
 * The primary call-to-action. Lives at the bottom of every step with an
 * ambient pulse + shine-on-hover effect. The `ghost` variant is used for
 * secondary actions on the completion screen.
 */
export function CtaButton({
  children,
  variant = "primary",
  tight = false,
  className,
  type = "button",
  ...rest
}: CtaButtonProps) {
  const classes = [
    styles.cta,
    variant === "ghost" && styles.ctaGhost,
    tight && styles.ctaTight,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
