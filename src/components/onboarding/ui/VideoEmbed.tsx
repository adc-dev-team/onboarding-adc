"use client";

import { useState } from "react";
import styles from "../onboarding.module.css";

type VideoEmbedProps = {
  youtubeId: string;
  title: string;
};

/**
 * Lazy YouTube facade: show a static thumbnail with a play button until
 * the user clicks it. The real (no-cookie) iframe only mounts on demand,
 * which avoids a ~1MB network cost on first paint and keeps Google from
 * receiving a page-view until the user asks to watch.
 */
export function VideoEmbed({ youtubeId, title }: VideoEmbedProps) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <div className={styles.videoWrapper}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={title}
        />
      </div>
    );
  }

  return (
    <div className={styles.videoWrapper}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
        alt=""
        loading="lazy"
      />
      <button
        type="button"
        className={styles.videoPlay}
        onClick={() => setLoaded(true)}
        aria-label={`Reproducir: ${title}`}
      >
        <span className={styles.videoPlayIcon} aria-hidden="true">
          ▶
        </span>
      </button>
    </div>
  );
}
