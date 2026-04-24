import { ProgressDots } from "../ui/ProgressDots";
import { CtaButton } from "../ui/CtaButton";
import { CheckRow } from "../ui/CheckRow";
import styles from "../onboarding.module.css";

type TelegramNameStepProps = {
  name: string;
  totalDots: number;
  confirmed: boolean;
  onToggleConfirmed: () => void;
  onContinue: () => void;
};

type Instruction = readonly [title: string, detail: string];

export function TelegramNameStep({
  name,
  totalDots,
  confirmed,
  onToggleConfirmed,
  onContinue,
}: TelegramNameStepProps) {
  const instructions: ReadonlyArray<Instruction> = [
    ["Abre Telegram", "En tu móvil o escritorio"],
    ["Ve a Configuración", "Toca tu foto de perfil → Editar perfil"],
    [
      "Escribe nombre y apellido",
      `Ej: "${name} García"  —  así te reconocen`,
    ],
    ["Guarda los cambios", "Toca el ✓ o 'Guardar'"],
  ];

  return (
    <>
      <ProgressDots total={totalDots} current={2} />
      <div className={styles.eyebrow}>Paso 2 de 3</div>
      <h2 className={styles.h2}>
        Pon tu nombre
        <br />
        en Telegram
      </h2>
      <p className={styles.subtitle} style={{ marginBottom: 20 }}>
        Los profesores te identifican por tu nombre. Sin esto no saben quién
        eres cuando te mandan un mensaje.
      </p>

      <ol className={styles.stepList}>
        {instructions.map(([title, detail], i) => (
          <li key={title} className={styles.stepRow}>
            <div className={styles.stepNum} aria-hidden="true">
              {i + 1}
            </div>
            <div>
              <div className={styles.stepText}>{title}</div>
              <div className={styles.stepDetail}>{detail}</div>
            </div>
          </li>
        ))}
      </ol>

      <CheckRow
        checked={confirmed}
        onToggle={onToggleConfirmed}
        label="Ya he cambiado mi nombre en Telegram"
        sublabel="Nombre + Primer apellido como mínimo"
      />

      <CtaButton onClick={onContinue} disabled={!confirmed}>
        {confirmed ? "CONTINUAR →" : "CONFIRMA QUE LO HAS HECHO"}
      </CtaButton>
    </>
  );
}
