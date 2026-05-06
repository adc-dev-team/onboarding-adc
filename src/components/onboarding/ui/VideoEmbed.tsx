"use client";

import { useEffect, useState } from "react";
import styles from "../onboarding.module.css";

type VideoEmbedProps = {
  vimeoId: string;
  title: string;
};

/**
 * Lazy Vimeo facade: muestra el poster del vídeo con un botón de play
 * hasta que el usuario hace click. El iframe real solo se monta a
 * demanda — así Vimeo no recibe pageview ni cargamos el JS del player
 * (~150 KB) en el primer paint.
 *
 * Además pasamos `dnt=1` ("do not track") al iframe para que Vimeo no
 * setee cookies de sesión cuando el alumno por fin lo abra.
 *
 * El thumbnail viene de la API oEmbed pública de Vimeo (un fetch JSON
 * al montar). Si esa llamada falla — sin red, AdBlock, lo que sea —
 * el wrapper se queda con su fondo CSS y solo el botón de play
 * visible: el flujo no se rompe.
 */
export function VideoEmbed({ vimeoId, title }: VideoEmbedProps) {
  const [loaded, setLoaded] = useState(false);
  const [thumbUrl, setThumbUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(
      `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(
        `https://vimeo.com/${vimeoId}`,
      )}`,
    )
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { thumbnail_url?: string } | null) => {
        if (!cancelled && data?.thumbnail_url) {
          setThumbUrl(data.thumbnail_url);
        }
      })
      .catch(() => {
        // Sin thumbnail: el wrapper sigue funcionando con su fondo CSS.
      });
    return () => {
      cancelled = true;
    };
  }, [vimeoId]);

  if (loaded) {
    return (
      <div className={styles.videoWrapper}>
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&dnt=1`}
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
          allowFullScreen
          title={title}
        />
      </div>
    );
  }

  return (
    <div className={styles.videoWrapper}>
      {thumbUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={thumbUrl} alt="" loading="lazy" />
      )}
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
