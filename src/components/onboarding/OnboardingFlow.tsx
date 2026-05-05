"use client";

import { useCallback, useEffect, useState } from "react";

import type { Group } from "@/lib/onboarding-data";
import { STEPS, TOTAL_STEPS } from "@/lib/onboarding-data";
import { openTelegramLink } from "@/lib/telegram";
import { useOnboardingState } from "@/hooks/useOnboardingState";
import { useName } from "@/hooks/useName";

import { Header } from "./ui/Header";
import { ProgressBar } from "./ui/ProgressBar";
import { ThemeToggle } from "./ui/ThemeToggle";
import { WelcomeStep } from "./steps/WelcomeStep";
import { GroupsStep } from "./steps/GroupsStep";
import { TelegramNameStep } from "./steps/TelegramNameStep";
import { TutorialStep } from "./steps/TutorialStep";
import { CompletionStep } from "./steps/CompletionStep";

import styles from "./onboarding.module.css";

const TRANSITION_MS = 280;
/** Welcome (0) and completion (last) steps don't show a "N/M" indicator. */
const ACTIONABLE_STEPS = TOTAL_STEPS - 2;

/**
 * Top-level client component that wires together the persisted onboarding
 * state and renders the correct step. Kept minimal — per-step rendering
 * lives in `./steps/*`, reusable UI in `./ui/*`, state in the hooks.
 */
export function OnboardingFlow() {
  const name = useName();
  const {
    step,
    joined,
    joinedCount,
    allJoined,
    nameConfirmed,
    videoConfirmed,
    setStep,
    markGroupJoined,
    setNameConfirmed,
    setVideoConfirmed,
  } = useOnboardingState();

  const [visible, setVisible] = useState(true);

  const goTo = useCallback(
    (next: number) => {
      if (next === step) return;
      setVisible(false);
      window.setTimeout(() => {
        setStep(next);
        setVisible(true);
      }, TRANSITION_MS);
    },
    [step, setStep],
  );

  // Scroll back to the top whenever the user lands on a new step. Mobile
  // Safari sometimes preserves the previous scroll position on tall steps,
  // which hides the heading of the next one.
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [step]);

  const handleJoinGroup = useCallback(
    (group: Group) => {
      markGroupJoined(group.id);
      openTelegramLink(group.url);
    },
    [markGroupJoined],
  );

  const progress = TOTAL_STEPS > 1 ? step / (TOTAL_STEPS - 1) : 0;
  const stepNumber =
    step > 0 && step < TOTAL_STEPS - 1 ? step : null;

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <div className={styles.noise} aria-hidden="true" />
        <ThemeToggle />

        <ProgressBar value={progress} />
        <Header stepNumber={stepNumber} totalSteps={ACTIONABLE_STEPS} />

        <main
          className={styles.content}
          data-visible={visible ? "true" : "false"}
          aria-live="polite"
        >
          {renderStep(step, {
            name,
            joined,
            joinedCount,
            allJoined,
            nameConfirmed,
            videoConfirmed,
            goTo,
            handleJoinGroup,
            setNameConfirmed,
            setVideoConfirmed,
          })}
        </main>

        <span className={styles.srOnly} aria-live="polite">
          {STEPS[step]}
        </span>
      </div>
    </div>
  );
}

type StepHandlers = {
  name: string;
  joined: ReturnType<typeof useOnboardingState>["joined"];
  joinedCount: number;
  allJoined: boolean;
  nameConfirmed: boolean;
  videoConfirmed: boolean;
  goTo: (next: number) => void;
  handleJoinGroup: (group: Group) => void;
  setNameConfirmed: (v: boolean) => void;
  setVideoConfirmed: (v: boolean) => void;
};

function renderStep(step: number, h: StepHandlers) {
  switch (step) {
    case 0:
      return (
        <WelcomeStep
          name={h.name}
          totalDots={TOTAL_STEPS}
          onStart={() => h.goTo(1)}
        />
      );
    case 1:
      return (
        <GroupsStep
          totalDots={TOTAL_STEPS}
          joined={h.joined}
          joinedCount={h.joinedCount}
          allJoined={h.allJoined}
          onJoinGroup={h.handleJoinGroup}
          onContinue={() => h.goTo(2)}
        />
      );
    case 2:
      return (
        <TelegramNameStep
          name={h.name}
          totalDots={TOTAL_STEPS}
          confirmed={h.nameConfirmed}
          onToggleConfirmed={() => h.setNameConfirmed(!h.nameConfirmed)}
          onContinue={() => h.goTo(3)}
        />
      );
    case 3:
      return (
        <TutorialStep
          totalDots={TOTAL_STEPS}
          confirmed={h.videoConfirmed}
          onToggleConfirmed={() => h.setVideoConfirmed(!h.videoConfirmed)}
          onFinish={() => h.goTo(4)}
        />
      );
    case 4:
      return <CompletionStep name={h.name} onRestart={() => h.goTo(0)} />;
    default:
      return null;
  }
}
