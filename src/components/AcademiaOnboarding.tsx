"use client";

import { useState, useEffect } from "react";

const COLORS = {
  darkGreen: "#2a3118",
  midGreen: "#3d4a25",
  sage: "#5c6b3a",
  lightSage: "#8a9a68",
  cream: "#f0ece0",
  warmWhite: "#faf8f3",
  orange: "#e08c0a",
  orangeHover: "#c97d09",
  orangeLight: "rgba(224,140,10,0.15)",
  textDim: "#a8b890",
};

type Group = {
  id: string;
  emoji: string;
  name: string;
  tag: string;
  desc: string;
  url: string;
  members: string;
};

const GROUPS: Group[] = [
  {
    id: "ejercicios",
    emoji: "🧠",
    name: "Grupo de Ejercicios",
    tag: "PSICOTÉCNICOS + CLASES EN DIRECTO",
    desc: "Aquí resuelves dudas de psicotécnicos y accedes a los enlaces de las clases en directo. Es tu sala de operaciones diaria.",
    url: "https://t.me/+d0ihdefLpak0ZmM0",
    members: "Activo todos los días",
  },
  {
    id: "general",
    emoji: "🎖️",
    name: "Grupo General",
    tag: "ORIENTACIÓN MILITAR",
    desc: "Dudas sobre la vida militar, especialidades y procesos de selección. Tienes 10 militares en activo de los 3 Ejércitos respondiendo.",
    url: "https://t.me/+KExecqiF5Is2NjU8",
    members: "10 militares en activo",
  },
  {
    id: "tablon",
    emoji: "📋",
    name: "Tablón de Anuncios",
    tag: "AVISOS OFICIALES",
    desc: "Solo el equipo publica aquí. Cambios de horario, convocatorias, novedades importantes. Activa las notificaciones.",
    url: "https://t.me/+hMnHLq8KychkNTZk",
    members: "Canal oficial",
  },
];

const STEPS = ["Bienvenida", "Grupos", "Telegram", "Tutorial", "¡Listo!"];

const fonts = `
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=DM+Sans:wght@300;400;500&display=swap');
`;

export default function AcademiaOnboarding() {
  const [nombre, setNombre] = useState("Soldado");
  const [step, setStep] = useState(0);
  const [joined, setJoined] = useState<Record<string, boolean>>({});
  const [nameConfirmed, setNameConfirmed] = useState(false);
  const [videoConfirmed, setVideoConfirmed] = useState(false);
  const [visible, setVisible] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const n = params.get("nombre");
      if (n) setNombre(n);
      const s = parseInt(localStorage.getItem("adc_step") || "0");
      if (!Number.isNaN(s)) setStep(s);
      setJoined(JSON.parse(localStorage.getItem("adc_joined") || "{}"));
      setNameConfirmed(localStorage.getItem("adc_name") === "1");
      setVideoConfirmed(localStorage.getItem("adc_video") === "1");
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem("adc_step", String(step));
    } catch {}
  }, [step, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem("adc_joined", JSON.stringify(joined));
    } catch {}
  }, [joined, hydrated]);

  const goTo = (next: number) => {
    setVisible(false);
    setTimeout(() => {
      setStep(next);
      setVisible(true);
    }, 280);
  };

  const joinGroup = (id: string, url: string) => {
    setJoined((prev) => ({ ...prev, [id]: true }));
    window.open(url, "_blank");
  };

  const allJoined = GROUPS.every((g) => joined[g.id]);
  const progress = step / (STEPS.length - 1);

  return (
    <>
      <style>{fonts}</style>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #1e2410; font-family: 'DM Sans', sans-serif; }
        .wrap {
          min-height: 100vh;
          background: #1e2410;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 0;
        }
        .card {
          width: 100%;
          max-width: 430px;
          min-height: 100vh;
          background: ${COLORS.darkGreen};
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }
        .noise {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          opacity: 0.6;
        }
        .progress-bar {
          height: 3px;
          background: ${COLORS.midGreen};
          position: relative;
          flex-shrink: 0;
        }
        .progress-fill {
          height: 100%;
          background: ${COLORS.orange};
          transition: width 0.5s cubic-bezier(0.4,0,0.2,1);
        }
        .header {
          padding: 20px 24px 0;
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }
        .logo-mark {
          width: 36px;
          height: 36px;
          background: ${COLORS.orange};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
        .logo-text {
          font-family: 'Oswald', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: ${COLORS.textDim};
          text-transform: uppercase;
        }
        .step-indicator {
          margin-left: auto;
          font-family: 'Oswald', sans-serif;
          font-size: 12px;
          color: ${COLORS.textDim};
          letter-spacing: 0.1em;
        }
        .content {
          flex: 1;
          padding: 32px 24px 24px;
          display: flex;
          flex-direction: column;
          gap: 0;
          transition: opacity 0.28s ease, transform 0.28s ease;
          position: relative;
          z-index: 1;
        }
        .content.hidden {
          opacity: 0;
          transform: translateY(12px);
        }
        .eyebrow {
          font-family: 'Oswald', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.18em;
          color: ${COLORS.orange};
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        h1 {
          font-family: 'Oswald', sans-serif;
          font-size: 38px;
          font-weight: 700;
          color: ${COLORS.cream};
          line-height: 1.05;
          letter-spacing: -0.01em;
          margin-bottom: 16px;
        }
        h2 {
          font-family: 'Oswald', sans-serif;
          font-size: 28px;
          font-weight: 700;
          color: ${COLORS.cream};
          line-height: 1.1;
          letter-spacing: -0.01em;
          margin-bottom: 12px;
        }
        .subtitle {
          font-size: 15px;
          font-weight: 300;
          color: ${COLORS.textDim};
          line-height: 1.6;
          margin-bottom: 32px;
        }
        .divider {
          height: 1px;
          background: ${COLORS.midGreen};
          margin: 24px 0;
        }
        .cta-btn {
          width: 100%;
          padding: 18px 24px;
          background: ${COLORS.orange};
          color: #fff;
          border: none;
          cursor: pointer;
          font-family: 'Oswald', sans-serif;
          font-size: 16px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          transition: background 0.15s, transform 0.1s;
          margin-top: auto;
          flex-shrink: 0;
        }
        .cta-btn:hover { background: ${COLORS.orangeHover}; }
        .cta-btn:active { transform: scale(0.99); }
        .cta-btn:disabled {
          background: ${COLORS.midGreen};
          color: ${COLORS.textDim};
          cursor: not-allowed;
        }
        .group-card {
          background: ${COLORS.midGreen};
          border: 1px solid ${COLORS.sage};
          padding: 16px;
          margin-bottom: 12px;
          transition: border-color 0.2s;
          position: relative;
          overflow: hidden;
        }
        .group-card.done {
          border-color: ${COLORS.orange};
          background: ${COLORS.orangeLight};
        }
        .group-card-top {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 10px;
        }
        .group-emoji {
          font-size: 24px;
          line-height: 1;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .group-meta { flex: 1; }
        .group-tag {
          font-family: 'Oswald', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.14em;
          color: ${COLORS.orange};
          margin-bottom: 3px;
        }
        .group-name {
          font-family: 'Oswald', sans-serif;
          font-size: 18px;
          font-weight: 600;
          color: ${COLORS.cream};
          line-height: 1.1;
        }
        .group-members {
          font-size: 11px;
          color: ${COLORS.textDim};
          margin-top: 2px;
        }
        .group-done-badge {
          width: 24px;
          height: 24px;
          background: ${COLORS.orange};
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .group-desc {
          font-size: 13px;
          font-weight: 300;
          color: ${COLORS.textDim};
          line-height: 1.55;
          margin-bottom: 12px;
        }
        .join-btn {
          padding: 10px 20px;
          background: transparent;
          border: 1px solid ${COLORS.orange};
          color: ${COLORS.orange};
          font-family: 'Oswald', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
          width: 100%;
        }
        .join-btn:hover { background: ${COLORS.orange}; color: #fff; }
        .join-btn.done-btn {
          border-color: ${COLORS.sage};
          color: ${COLORS.textDim};
          background: transparent;
          cursor: default;
        }
        .progress-dots {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
          align-items: center;
        }
        .dot {
          width: 28px;
          height: 3px;
          background: ${COLORS.midGreen};
          transition: background 0.3s, width 0.3s;
        }
        .dot.active { background: ${COLORS.orange}; width: 40px; }
        .dot.done { background: ${COLORS.lightSage}; }
        .check-row {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 16px;
          background: ${COLORS.midGreen};
          border: 1px solid ${COLORS.sage};
          margin-bottom: 12px;
          cursor: pointer;
          transition: border-color 0.2s;
        }
        .check-row.checked { border-color: ${COLORS.orange}; background: ${COLORS.orangeLight}; }
        .check-box {
          width: 22px;
          height: 22px;
          border: 2px solid ${COLORS.sage};
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
          transition: border-color 0.2s, background 0.2s;
        }
        .check-box.checked { border-color: ${COLORS.orange}; background: ${COLORS.orange}; }
        .check-label {
          font-size: 14px;
          font-weight: 400;
          color: ${COLORS.cream};
          line-height: 1.5;
        }
        .check-sub {
          font-size: 12px;
          color: ${COLORS.textDim};
          margin-top: 3px;
        }
        .steps-visual {
          display: flex;
          flex-direction: column;
          gap: 0;
          margin-bottom: 28px;
        }
        .step-row {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 14px 0;
          border-bottom: 1px solid ${COLORS.midGreen};
        }
        .step-row:last-child { border-bottom: none; }
        .step-num {
          width: 28px;
          height: 28px;
          background: ${COLORS.sage};
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Oswald', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: ${COLORS.cream};
          flex-shrink: 0;
        }
        .step-text { font-size: 14px; color: ${COLORS.cream}; line-height: 1.5; }
        .step-detail { font-size: 12px; color: ${COLORS.textDim}; margin-top: 3px; }
        .video-wrapper {
          position: relative;
          padding-bottom: 56.25%;
          background: ${COLORS.midGreen};
          margin-bottom: 20px;
          border: 1px solid ${COLORS.sage};
          overflow: hidden;
        }
        .video-wrapper iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: none;
        }
        .video-label {
          font-size: 12px;
          color: ${COLORS.textDim};
          text-align: center;
          margin-bottom: 20px;
          font-style: italic;
        }
        .completion-hero {
          text-align: center;
          padding: 20px 0 28px;
        }
        .medal {
          font-size: 64px;
          line-height: 1;
          margin-bottom: 16px;
          display: block;
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .badge {
          display: inline-block;
          padding: 5px 14px;
          background: ${COLORS.orangeLight};
          border: 1px solid ${COLORS.orange};
          font-family: 'Oswald', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.14em;
          color: ${COLORS.orange};
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .timeline {
          margin-bottom: 28px;
        }
        .tl-item {
          display: flex;
          gap: 16px;
          margin-bottom: 16px;
          align-items: flex-start;
        }
        .tl-dot {
          width: 10px;
          height: 10px;
          border: 2px solid ${COLORS.orange};
          border-radius: 50%;
          flex-shrink: 0;
          margin-top: 5px;
          position: relative;
        }
        .tl-dot::after {
          content: '';
          position: absolute;
          left: 3px;
          top: 10px;
          width: 1px;
          height: 30px;
          background: ${COLORS.sage};
        }
        .tl-item:last-child .tl-dot::after { display: none; }
        .tl-title { font-family: 'Oswald', sans-serif; font-size: 15px; font-weight: 600; color: ${COLORS.cream}; }
        .tl-desc { font-size: 13px; color: ${COLORS.textDim}; margin-top: 2px; }
        .dani-card {
          background: ${COLORS.midGreen};
          border: 1px solid ${COLORS.sage};
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 16px;
        }
        .dani-avatar {
          width: 44px;
          height: 44px;
          background: ${COLORS.orange};
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
        }
        .dani-name { font-family: 'Oswald', sans-serif; font-size: 16px; font-weight: 600; color: ${COLORS.cream}; }
        .dani-role { font-size: 12px; color: ${COLORS.textDim}; }
        .info-box {
          background: rgba(90,107,58,0.25);
          border-left: 3px solid ${COLORS.orange};
          padding: 14px 16px;
          margin-bottom: 20px;
        }
        .info-box-text { font-size: 13px; color: ${COLORS.textDim}; line-height: 1.6; }
        .info-box strong { color: ${COLORS.cream}; }
        .scrollable { overflow-y: auto; flex: 1; }
        .scroll-content { display: flex; flex-direction: column; }
      `}</style>

      <div className="wrap">
        <div className="card">
          <div className="noise" />

          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress * 100}%` }} />
          </div>

          <div className="header">
            <div className="logo-mark">⚔️</div>
            <span className="logo-text">Academia de Combate</span>
            {step > 0 && step < STEPS.length - 1 && (
              <span className="step-indicator">{step}/{STEPS.length - 2}</span>
            )}
          </div>

          <div className={`content ${!visible ? "hidden" : ""}`}>

            {step === 0 && (
              <>
                <div className="progress-dots">
                  {STEPS.map((_, i) => (
                    <div key={i} className={`dot ${i === 0 ? "active" : ""}`} />
                  ))}
                </div>
                <div className="eyebrow">Incorporación activa</div>
                <h1>Bienvenido,<br />{nombre}.</h1>
                <p className="subtitle">
                  Tu plaza está confirmada. Ahora activa todo tu acceso en 4 pasos rápidos para que puedas empezar desde hoy.
                </p>
                <div className="info-box">
                  <p className="info-box-text">
                    <strong>¿Qué vas a configurar?</strong><br />
                    Los 3 grupos de Telegram donde viven las clases, los profesores y los avisos importantes. Sin ellos, te pierdes todo.
                  </p>
                </div>
                <div style={{ display: "flex", gap: "20px", marginBottom: "32px" }}>
                  {["🎓 Clases en directo", "👥 10 militares activos", "📋 Avisos oficiales"].map((item) => (
                    <div key={item} style={{ flex: 1, textAlign: "center" }}>
                      <div style={{ fontSize: "22px", marginBottom: "6px" }}>{item.split(" ")[0]}</div>
                      <div style={{ fontSize: "11px", color: COLORS.textDim, lineHeight: 1.4 }}>{item.slice(3)}</div>
                    </div>
                  ))}
                </div>
                <button className="cta-btn" onClick={() => goTo(1)}>
                  ACTIVAR MI ACCESO →
                </button>
              </>
            )}

            {step === 1 && (
              <>
                <div className="progress-dots">
                  {STEPS.map((_, i) => (
                    <div key={i} className={`dot ${i === 1 ? "active" : i < 1 ? "done" : ""}`} />
                  ))}
                </div>
                <div className="eyebrow">Paso 1 de 3</div>
                <h2>Únete a los<br />3 grupos</h2>
                <p className="subtitle" style={{ marginBottom: "20px" }}>
                  Pulsa cada botón y únete. Vuelve aquí cuando hayas entrado en los tres.
                </p>

                <div style={{ flex: 1, overflowY: "auto" }}>
                  {GROUPS.map((g) => (
                    <div key={g.id} className={`group-card ${joined[g.id] ? "done" : ""}`}>
                      <div className="group-card-top">
                        <span className="group-emoji">{g.emoji}</span>
                        <div className="group-meta">
                          <div className="group-tag">{g.tag}</div>
                          <div className="group-name">{g.name}</div>
                          <div className="group-members">{g.members}</div>
                        </div>
                        {joined[g.id] && <div className="group-done-badge">✓</div>}
                      </div>
                      <p className="group-desc">{g.desc}</p>
                      <button
                        className={`join-btn ${joined[g.id] ? "done-btn" : ""}`}
                        onClick={() => !joined[g.id] && joinGroup(g.id, g.url)}
                      >
                        {joined[g.id] ? "✓ UNIDO" : "UNIRME AL GRUPO →"}
                      </button>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: "16px", marginBottom: "8px", fontSize: "12px", color: COLORS.textDim, textAlign: "center" }}>
                  {Object.values(joined).filter(Boolean).length}/3 grupos completados
                </div>
                <button className="cta-btn" onClick={() => goTo(2)} disabled={!allJoined}>
                  {allJoined ? "CONTINUAR →" : `ÚNETE A LOS ${3 - Object.values(joined).filter(Boolean).length} GRUPOS RESTANTES`}
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <div className="progress-dots">
                  {STEPS.map((_, i) => (
                    <div key={i} className={`dot ${i === 2 ? "active" : i < 2 ? "done" : ""}`} />
                  ))}
                </div>
                <div className="eyebrow">Paso 2 de 3</div>
                <h2>Pon tu nombre<br />en Telegram</h2>
                <p className="subtitle" style={{ marginBottom: "20px" }}>
                  Los profesores te identifican por tu nombre. Sin esto no saben quién eres cuando te mandan un mensaje.
                </p>

                <div className="steps-visual">
                  {[
                    ["Abre Telegram", "En tu móvil o escritorio"],
                    ["Ve a Configuración", "Toca tu foto de perfil → Editar perfil"],
                    ["Escribe nombre y apellido", `Ej: "${nombre} García"  —  así te reconocen`],
                    ["Guarda los cambios", "Toca el ✓ o 'Guardar'"],
                  ].map(([title, detail], i) => (
                    <div key={i} className="step-row">
                      <div className="step-num">{i + 1}</div>
                      <div>
                        <div className="step-text">{title}</div>
                        <div className="step-detail">{detail}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className={`check-row ${nameConfirmed ? "checked" : ""}`}
                  onClick={() => {
                    const v = !nameConfirmed;
                    setNameConfirmed(v);
                    try { localStorage.setItem("adc_name", v ? "1" : "0"); } catch {}
                  }}
                >
                  <div className={`check-box ${nameConfirmed ? "checked" : ""}`}>
                    {nameConfirmed && <span style={{ color: "#fff", fontSize: "14px" }}>✓</span>}
                  </div>
                  <div>
                    <div className="check-label">Ya he cambiado mi nombre en Telegram</div>
                    <div className="check-sub">Nombre + Primer apellido como mínimo</div>
                  </div>
                </div>

                <button className="cta-btn" onClick={() => goTo(3)} disabled={!nameConfirmed}>
                  {nameConfirmed ? "CONTINUAR →" : "CONFIRMA QUE LO HAS HECHO"}
                </button>
              </>
            )}

            {step === 3 && (
              <>
                <div className="progress-dots">
                  {STEPS.map((_, i) => (
                    <div key={i} className={`dot ${i === 3 ? "active" : i < 3 ? "done" : ""}`} />
                  ))}
                </div>
                <div className="eyebrow">Paso 3 de 3</div>
                <h2>Tutorial de<br />la plataforma</h2>
                <p className="subtitle" style={{ marginBottom: "16px" }}>
                  5 minutos que te ahorran horas de confusión. Dónde está todo, cómo acceder y qué hacer primero.
                </p>

                <div className="video-wrapper">
                  <iframe
                    src="https://www.youtube.com/embed/0KI767I2JTE"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Tutorial plataforma Academia de Combate"
                  />
                </div>
                <p className="video-label">Tutorial oficial — Academia de Combate</p>

                <div
                  className={`check-row ${videoConfirmed ? "checked" : ""}`}
                  style={{ marginBottom: "16px" }}
                  onClick={() => {
                    const v = !videoConfirmed;
                    setVideoConfirmed(v);
                    try { localStorage.setItem("adc_video", v ? "1" : "0"); } catch {}
                  }}
                >
                  <div className={`check-box ${videoConfirmed ? "checked" : ""}`}>
                    {videoConfirmed && <span style={{ color: "#fff", fontSize: "14px" }}>✓</span>}
                  </div>
                  <div>
                    <div className="check-label">He visto el tutorial</div>
                    <div className="check-sub">Ya sé cómo funciona la plataforma</div>
                  </div>
                </div>

                <button className="cta-btn" onClick={() => goTo(4)} disabled={!videoConfirmed}>
                  {videoConfirmed ? "FINALIZAR INCORPORACIÓN →" : "VE EL TUTORIAL PRIMERO"}
                </button>
              </>
            )}

            {step === 4 && (
              <>
                <div className="completion-hero">
                  <span className="medal">🎖️</span>
                  <div className="badge">INCORPORACIÓN COMPLETADA</div>
                  <h2 style={{ marginBottom: "8px" }}>Estás dentro,<br />{nombre}.</h2>
                  <p className="subtitle" style={{ marginBottom: "0" }}>
                    Has activado todo tu acceso. Esto es lo que pasa ahora:
                  </p>
                </div>

                <div className="timeline">
                  {[
                    ["En las próximas horas", "Los profesores verán tu ingreso en los grupos y se pondrán en contacto contigo"],
                    ["Hoy mismo", "Accede al temario completo. El calendario de clases se actualiza cada semana"],
                    ["Esta semana", "Participa en el grupo de Ejercicios con dudas de psicotécnicos. Los militares del Grupo General responden rápido"],
                  ].map(([when, what], i) => (
                    <div key={i} className="tl-item">
                      <div className="tl-dot" />
                      <div>
                        <div className="tl-title">{when}</div>
                        <div className="tl-desc">{what}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="dani-card">
                  <div className="dani-avatar">👨‍💼</div>
                  <div>
                    <div className="dani-name">Dani</div>
                    <div className="dani-role">Tu punto de contacto directo</div>
                    <div style={{ fontSize: "13px", color: COLORS.textDim, marginTop: "4px" }}>
                      Cualquier duda, escríbeme por WhatsApp
                    </div>
                  </div>
                </div>

                <button
                  className="cta-btn"
                  onClick={() => window.open("https://academiadecombate.com", "_blank")}
                  style={{ marginBottom: "12px" }}
                >
                  IR A LA PLATAFORMA →
                </button>
                <button
                  className="cta-btn"
                  style={{ background: "transparent", border: `1px solid ${COLORS.sage}`, color: COLORS.textDim, marginTop: "0" }}
                  onClick={() => goTo(0)}
                >
                  VOLVER AL INICIO
                </button>
              </>
            )}

          </div>
        </div>
      </div>
    </>
  );
}
