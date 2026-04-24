import type { Group, GroupId } from "@/lib/onboarding-data";
import { GROUPS } from "@/lib/onboarding-data";
import { ProgressDots } from "../ui/ProgressDots";
import { CtaButton } from "../ui/CtaButton";
import { GroupCard } from "../ui/GroupCard";
import styles from "../onboarding.module.css";

type GroupsStepProps = {
  totalDots: number;
  joined: Partial<Record<GroupId, boolean>>;
  joinedCount: number;
  allJoined: boolean;
  onJoinGroup: (group: Group) => void;
  onContinue: () => void;
};

export function GroupsStep({
  totalDots,
  joined,
  joinedCount,
  allJoined,
  onJoinGroup,
  onContinue,
}: GroupsStepProps) {
  const remaining = GROUPS.length - joinedCount;

  return (
    <>
      <ProgressDots total={totalDots} current={1} />
      <div className={styles.eyebrow}>Paso 1 de 3</div>
      <h2 className={styles.h2}>
        Únete a los
        <br />3 grupos
      </h2>
      <p className={styles.subtitle} style={{ marginBottom: 20 }}>
        Pulsa cada botón y únete. Vuelve aquí cuando hayas entrado en los tres.
      </p>

      <div className={styles.groupsList}>
        {GROUPS.map((group) => (
          <GroupCard
            key={group.id}
            group={group}
            joined={Boolean(joined[group.id])}
            onJoin={onJoinGroup}
          />
        ))}
      </div>

      <div className={styles.groupsCounter} aria-live="polite">
        {joinedCount}/{GROUPS.length} grupos completados
      </div>

      <CtaButton onClick={onContinue} disabled={!allJoined}>
        {allJoined
          ? "CONTINUAR →"
          : `ÚNETE A LOS ${remaining} GRUPOS RESTANTES`}
      </CtaButton>
    </>
  );
}
