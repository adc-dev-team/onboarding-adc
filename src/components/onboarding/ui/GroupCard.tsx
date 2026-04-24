import type { Group } from "@/lib/onboarding-data";
import styles from "../onboarding.module.css";

type GroupCardProps = {
  group: Group;
  joined: boolean;
  onJoin: (group: Group) => void;
};

/**
 * One Telegram group tile. Once `joined` flips true the card locks into
 * a "done" state — we never undo a join because the user has already
 * been taken to Telegram.
 */
export function GroupCard({ group, joined, onJoin }: GroupCardProps) {
  return (
    <article
      className={[styles.groupCard, joined && styles.groupCardDone]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={styles.groupCardTop}>
        <span className={styles.groupEmoji} aria-hidden="true">
          {group.emoji}
        </span>
        <div className={styles.groupMeta}>
          <div className={styles.groupTag}>{group.tag}</div>
          <h3 className={styles.groupName}>{group.name}</h3>
          <div className={styles.groupMembers}>{group.members}</div>
        </div>
        {joined && (
          <div className={styles.groupDoneBadge} aria-hidden="true">
            ✓
          </div>
        )}
      </div>
      <p className={styles.groupDesc}>{group.desc}</p>
      <button
        type="button"
        className={[styles.joinBtn, joined && styles.joinBtnDone]
          .filter(Boolean)
          .join(" ")}
        onClick={() => !joined && onJoin(group)}
        disabled={joined}
        aria-label={
          joined
            ? `Ya te has unido a ${group.name}`
            : `Unirme al grupo ${group.name}`
        }
      >
        {joined ? "✓ UNIDO" : "UNIRME AL GRUPO →"}
      </button>
    </article>
  );
}
