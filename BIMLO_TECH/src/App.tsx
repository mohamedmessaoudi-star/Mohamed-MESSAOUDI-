import { useState } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=Barlow+Condensed:wght@400;600;700;800&family=Barlow:wght@400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0a0c0f; }
  .app { min-height: 100vh; background: #0a0c0f; color: #e0e4ec; font-family: 'Barlow', sans-serif; padding: 24px; }

  .header { border-left: 4px solid #00c8ff; padding: 0 0 0 20px; margin-bottom: 36px; }
  .header-logo { font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: 11px; letter-spacing: 0.3em; color: #00c8ff; text-transform: uppercase; margin-bottom: 4px; }
  .header-title { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 28px; color: #fff; line-height: 1; margin-bottom: 6px; }
  .header-sub { font-size: 13px; color: #6b7a94; font-family: 'IBM Plex Mono', monospace; }

  .pipeline { display: flex; align-items: flex-start; gap: 0; margin-bottom: 40px; overflow-x: auto; padding-bottom: 8px; }
  .pipeline-step { display: flex; align-items: center; gap: 0; flex-shrink: 0; }
  .pipeline-node { display: flex; flex-direction: column; align-items: center; }
  .pipeline-badge { width: 52px; height: 52px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: 16px; border: 2px solid; transition: all 0.3s; }
  .pipeline-badge.cad    { border-color: #f59e0b; background: rgba(245,158,11,0.12); color: #f59e0b; }
  .pipeline-badge.struct { border-color: #a78bfa; background: rgba(167,139,250,0.12); color: #a78bfa; }
  .pipeline-badge.ceo    { border-color: #00c8ff; background: rgba(0,200,255,0.12); color: #00c8ff; }
  .pipeline-badge.active { transform: scale(1.1); box-shadow: 0 0 24px currentColor; }
  .pipeline-label { font-size: 10px; text-align: center; margin-top: 8px; width: 80px; line-height: 1.3; color: #8896aa; font-family: 'IBM Plex Mono', monospace; }
  .pipeline-label strong { display: block; color: #c8d0de; font-size: 11px; }
  .pipeline-arrow { width: 44px; height: 2px; background: linear-gradient(90deg, #1e2d3d, #2a3f55); position: relative; margin-bottom: 28px; flex-shrink: 0; }
  .pipeline-arrow::after { content: '▶'; position: absolute; right: -6px; top: -8px; font-size: 10px; color: #2a3f55; }

  .grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; }
  @media (max-width: 1000px) { .grid { grid-template-columns: 1fr; } }

  .card { background: #0f1520; border: 1px solid #1a2535; border-radius: 8px; overflow: hidden; }
  .card.cad-card    { border-top: 3px solid #f59e0b; }
  .card.struct-card { border-top: 3px solid #a78bfa; }
  .card.ceo-card    { border-top: 3px solid #00c8ff; }

  .card-header { padding: 16px 20px 12px; border-bottom: 1px solid #1a2535; display: flex; align-items: center; gap: 12px; }
  .role-icon { width: 40px; height: 40px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
  .cad    .role-icon { background: rgba(245,158,11,0.15); }
  .struct .role-icon { background: rgba(167,139,250,0.15); }
  .ceo    .role-icon { background: rgba(0,200,255,0.15); }
  .role-info { flex: 1; }
  .role-name  { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 16px; color: #fff; }
  .role-title { font-size: 11px; color: #6b7a94; font-family: 'IBM Plex Mono', monospace; }
  .status-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .status-dot.pending { background: #374151; }
  .status-dot.active  { background: #f59e0b; box-shadow: 0 0 8px #f59e0b; animation: pulse 1.5s infinite; }
  .status-dot.done    { background: #10b981; box-shadow: 0 0 8px #10b981; }
  @keyframes pulse { 0%,100%{ opacity:1; } 50%{ opacity:0.4; } }

  .card-body { padding: 16px 20px; }
  .section-title { font-family: 'Barlow Condensed', sans-serif; font-weight: 600; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #4a5568; margin-bottom: 10px; margin-top: 14px; }
  .section-title:first-child { margin-top: 0; }

  .checklist { display: flex; flex-direction: column; gap: 6px; }
  .check-item { display: flex; align-items: flex-start; gap: 10px; padding: 8px 10px; border-radius: 5px; background: #0a0c0f; border: 1px solid #1a2535; cursor: pointer; transition: all 0.15s; font-size: 12.5px; line-height: 1.4; }
  .check-item:hover   { border-color: #2a3f55; background: #111825; }
  .check-item.checked { background: rgba(16,185,129,0.06); border-color: rgba(16,185,129,0.25); }
  .check-icon { width: 18px; height: 18px; border-radius: 3px; border: 1.5px solid #374151; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 10px; margin-top: 1px; transition: all 0.15s; }
  .check-item.checked .check-icon { background: #10b981; border-color: #10b981; }
  .check-text { flex: 1; color: #c8d0de; }
  .check-badge { font-size: 9px; padding: 2px 6px; border-radius: 10px; font-family: 'IBM Plex Mono', monospace; flex-shrink: 0; align-self: flex-start; margin-top: 2px; }
  .badge-human { background: rgba(245,158,11,0.15); color: #f59e0b; }
  .badge-cross { background: rgba(167,139,250,0.15); color: #a78bfa; }
  .badge-final { background: rgba(16,185,129,0.15); color: #10b981; }

  .ai-block { margin-top: 14px; background: #060810; border: 1px solid #0a1a2a; border-radius: 6px; padding: 12px; }
  .ai-header { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }
  .ai-label  { font-family: 'IBM Plex Mono', monospace; font-size: 10px; color: #00c8ff; letter-spacing: 0.1em; }
  .ai-scan-bar { height: 4px; background: #0d1929; border-radius: 2px; overflow: hidden; margin-bottom: 10px; }
  .ai-scan-fill { height: 100%; border-radius: 2px; transition: width 0.8s ease; }
  .fill-cad    { background: linear-gradient(90deg, #f59e0b, #fcd34d); }
  .fill-struct { background: linear-gradient(90deg, #a78bfa, #c4b5fd); }
  .fill-ceo    { background: linear-gradient(90deg, #00c8ff, #67e8f9); }

  .ai-findings { display: flex; flex-direction: column; gap: 4px; }
  .finding { font-size: 11px; font-family: 'IBM Plex Mono', monospace; padding: 5px 8px; border-radius: 3px; display: flex; gap: 8px; align-items: flex-start; line-height: 1.5; }
  .finding.ok   { color: #10b981; background: rgba(16,185,129,0.06); }
  .finding.warn { color: #f59e0b; background: rgba(245,158,11,0.07); }
  .finding.err  { color: #ef4444; background: rgba(239,68,68,0.07); }
  .finding.info { color: #6b7a94; background: rgba(107,122,148,0.06); }

  .action-bar { margin-top: 16px; display: flex; gap: 8px; flex-wrap: wrap; }
  .btn { padding: 8px 14px; border-radius: 5px; border: none; cursor: pointer; font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 13px; letter-spacing: 0.05em; transition: all 0.15s; display: flex; align-items: center; gap: 6px; }
  .btn-primary-cad    { background: #f59e0b; color: #0a0c0f; }
  .btn-primary-cad:hover    { background: #fbbf24; }
  .btn-primary-struct { background: #a78bfa; color: #0a0c0f; }
  .btn-primary-struct:hover { background: #c4b5fd; }
  .btn-primary-ceo    { background: #00c8ff; color: #0a0c0f; }
  .btn-primary-ceo:hover    { background: #38d9f5; }
  .btn-outline { background: transparent; border: 1px solid #1a2535; color: #8896aa; font-size: 12px; }
  .btn-outline:hover  { border-color: #2a3f55; color: #c8d0de; }
  .btn:disabled { opacity: 0.4; cursor: not-allowed; }

  .progress-summary { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; margin-bottom: 28px; }
  .prog-card { background: #0f1520; border: 1px solid #1a2535; border-radius: 7px; padding: 14px 16px; display: flex; align-items: center; gap: 12px; }
  .prog-num   { font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: 32px; line-height: 1; }
  .prog-label { font-size: 11px; color: #6b7a94; line-height: 1.4; }
  .prog-label strong { display: block; font-size: 13px; color: #c8d0de; font-weight: 600; }

  .tag-row { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 10px; }
  .tag { font-size: 10px; font-family: 'IBM Plex Mono', monospace; padding: 3px 8px; border-radius: 3px; background: #111825; border: 1px solid #1a2535; color: #6b7a94; }
  .divider { height: 1px; background: #1a2535; margin: 14px 0; }

  .validated-banner { margin-top: 10px; font-size: 11px; font-family: 'IBM Plex Mono', monospace; color: #10b981; padding: 8px 10px; background: rgba(16,185,129,0.08); border-radius: 4px; border: 1px solid rgba(16,185,129,0.2); }

  .notification { position: fixed; bottom: 24px; right: 24px; background: #0f1520; border: 1px solid #10b981; border-left: 3px solid #10b981; border-radius: 6px; padding: 12px 16px; font-size: 13px; color: #10b981; font-family: 'IBM Plex Mono', monospace; z-index: 100; animation: slideIn 0.3s ease; max-width: 360px; line-height: 1.5; }
  @keyframes slideIn { from { transform: translateX(20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

  .reset-btn { float: right; background: transparent; border: 1px solid #1a2535; color: #4a5568; border-radius: 4px; padding: 4px 10px; font-size: 11px; cursor: pointer; font-family: 'IBM Plex Mono', monospace; transition: all 0.15s; }
  .reset-btn:hover { border-color: #ef4444; color: #ef4444; }

  .ai-badge { display: inline-flex; align-items: center; gap: 4px; font-size: 9px; padding: 2px 7px; border-radius: 10px; background: rgba(0,200,255,0.12); color: #00c8ff; font-family: 'IBM Plex Mono', monospace; margin-left: 8px; }
  .typing { display: inline-block; animation: blink 1s infinite; }
  @keyframes blink { 0%,100%{ opacity:1; } 50%{ opacity:0; } }
`;

const ROLES = {
  cad: {
    name: "WALA",
    title: "Ingénieur Mécanique / CAD",
    emoji: "⚙️",
    docs: ["PDF Plans Fab", "IFC v2x3/4", "DWG/DXF", "Rapport paysager"],
    checks: [
      {
        id: 1,
        text: "Plans PDF exportés avec cartouche et révision",
        type: "human",
      },
      {
        id: 2,
        text: "Fichier IFC v2x3 ou IFC4 conforme BIM BIMLO",
        type: "human",
      },
      {
        id: 3,
        text: "Dimensions pylône conformes aux specs client",
        type: "human",
      },
      {
        id: 4,
        text: "Nomenclature matériaux acier S355/S235 complète",
        type: "human",
      },
      {
        id: 5,
        text: "Tolérances de fabrication annotées (ISO 2768)",
        type: "human",
      },
      {
        id: 6,
        text: "Intégration paysagère — gabarit visuel validé",
        type: "human",
      },
    ],
    aiPrompt: `Tu es un ingénieur BIM expert chez BIMLO spécialisé en pylônes télécoms.
Analyse cette liste de vérification pour les PLANS DE FABRICATION (PDF + IFC).
Points cochés par l'ingénieur CAD WALA: {CHECKED}
Points non cochés: {UNCHECKED}

Génère exactement 5 lignes de vérification IA au format JSON array:
[{"type":"ok|warn|err|info","msg":"texte court max 60 chars"}]

Règles:
- ok = point conforme
- warn = attention requise
- err = erreur bloquante
- info = observation
- Sois précis, technique, concis. Mentionne EN, ISO, IFC si pertinent.
- Si des points ne sont pas cochés, signale-les comme err ou warn.
Réponds UNIQUEMENT avec le JSON array, rien d'autre.`,
  },
  struct: {
    name: "SEIF",
    title: "Ingénieur Structure",
    emoji: "🏗️",
    docs: ["Note de calcul PDF", "EN1993 rapport", "Cross-check FAB"],
    checks: [
      {
        id: 1,
        text: "Note de calcul charges permanentes G conforme EN1991",
        type: "human",
      },
      {
        id: 2,
        text: "Charges climatiques vent/neige zone calculées",
        type: "human",
      },
      {
        id: 3,
        text: "Vérification ELU/ELS acier EN1993-3-1 pylônes",
        type: "human",
      },
      {
        id: 4,
        text: "Fondations béton — descente de charge OK",
        type: "human",
      },
      {
        id: 5,
        text: "Connexion calcul ↔ plans fabrication vérifiée",
        type: "cross",
      },
    ],
    aiPrompt: `Tu es un ingénieur structure expert chez BIMLO spécialisé pylônes télécoms (EN1993-3-1).
Analyse cette vérification de NOTE DE CALCUL structure.
Points cochés par SEIF: {CHECKED}
Points non cochés: {UNCHECKED}

Génère exactement 4 lignes de vérification IA au format JSON array:
[{"type":"ok|warn|err|info","msg":"texte court max 60 chars"}]

Règles:
- Vérifie la cohérence avec les normes EN1991, EN1993, Eurocodes
- Mentionne ELU/ELS, coefficients γ, combinaisons de charges si pertinent
- Si des points ne sont pas cochés, c'est une erreur bloquante
Réponds UNIQUEMENT avec le JSON array, rien d'autre.`,
  },
  bimlo: {
    name: "BIMLO (CEO)",
    title: "Directeur Technique — Visa Final",
    emoji: "👁️",
    docs: [
      "Dossier complet FAB",
      "Note calcul visée",
      "Rapport IA synthèse",
      "Visa final BIMLO",
    ],
    checks: [
      {
        id: 1,
        text: "Cohérence globale plans + calculs + IFC vérifiée",
        type: "final",
      },
      {
        id: 2,
        text: "Conformité réglementaire pylônes télécoms (ICPE/Urbanisme)",
        type: "final",
      },
      {
        id: 3,
        text: "Intégration paysagère approuvée — rapport photo joint",
        type: "final",
      },
      { id: 4, text: "Rapport IA synthèse lu et validé", type: "final" },
      {
        id: 5,
        text: "Signature électronique & archivage BIMLO confirmé",
        type: "final",
      },
    ],
    aiPrompt: `Tu es le système IA de validation finale BIMLO pour un dossier pylône télécom.
SYNTHÈSE GLOBALE DU DOSSIER:
Points CEO validés: {CHECKED}
Points CEO non validés: {UNCHECKED}

Génère exactement 5 lignes de synthèse finale au format JSON array:
[{"type":"ok|warn|err|info","msg":"texte court max 65 chars"}]

Règles:
- Évalue la conformité globale du dossier (plans FAB + calcul structure + IFC + paysager)
- Vérifie conformité réglementaire ICPE, PLU, Urbanisme pylônes télécoms France
- Calcule un score global de conformité en %
- Indique si le dossier est prêt pour visa final BIMLO
Réponds UNIQUEMENT avec le JSON array, rien d'autre.`,
  },
};

const makeInitialState = () => ({
  cad: {
    checks: ROLES.cad.checks.map((c) => ({ ...c, done: false })),
    aiResults: [],
    aiScore: 0,
    aiRun: false,
    validated: false,
    sentToStruct: false,
  },
  struct: {
    checks: ROLES.struct.checks.map((c) => ({ ...c, done: false })),
    aiResults: [],
    aiScore: 0,
    aiRun: false,
    validated: false,
    sentToBimlo: false,
  },
  bimlo: {
    checks: ROLES.bimlo.checks.map((c) => ({ ...c, done: false })),
    aiResults: [],
    aiScore: 0,
    aiRun: false,
    validated: false,
  },
});

export default function App() {
  const [state, setState] = useState(makeInitialState());
  const [scanning, setScanning] = useState({
    cad: false,
    struct: false,
    bimlo: false,
  });
  const [notification, setNotification] = useState<string | null>(null);

  const showNotif = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4500);
  };

  const resetAll = () => {
    setState(makeInitialState());
    showNotif("↺ Nouveau projet initialisé");
  };

  const toggleCheck = (role: string, id: number) => {
    if (state[role].validated) return;
    setState((s) => ({
      ...s,
      [role]: {
        ...s[role],
        checks: s[role].checks.map((c) =>
          c.id === id ? { ...c, done: !c.done } : c
        ),
      },
    }));
  };

  const runAI = async (role: string) => {
    setScanning((s) => ({ ...s, [role]: true }));
    setState((s) => ({
      ...s,
      [role]: { ...s[role], aiResults: [], aiScore: 0, aiRun: false },
    }));

    const r = state[role];
    const checked =
      r.checks
        .filter((c) => c.done)
        .map((c) => c.text)
        .join(", ") || "Aucun";
    const unchecked =
      r.checks
        .filter((c) => !c.done)
        .map((c) => c.text)
        .join(", ") || "Aucun";
    const prompt = ROLES[role].aiPrompt
      .replace("{CHECKED}", checked)
      .replace("{UNCHECKED}", unchecked);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.REACT_APP_ANTHROPIC_KEY || "",
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await response.json();
      const text = data.content
        .map((i) => i.text || "")
        .join("")
        .trim();
      const clean = text.replace(/```json|```/g, "").trim();
      const results = JSON.parse(clean);
      const score = Math.min(
        99,
        results.reduce(
          (acc, r) =>
            acc +
            (r.type === "ok"
              ? 20
              : r.type === "warn"
              ? 8
              : r.type === "info"
              ? 5
              : 0),
          0
        )
      );
      setScanning((s) => ({ ...s, [role]: false }));
      setState((s) => ({
        ...s,
        [role]: { ...s[role], aiResults: results, aiScore: score, aiRun: true },
      }));
      showNotif(
        `🤖 IA ${ROLES[role].name} — Analyse réelle terminée · Score ${score}%`
      );
    } catch (err) {
      setScanning((s) => ({ ...s, [role]: false }));
      setState((s) => ({
        ...s,
        [role]: {
          ...s[role],
          aiResults: [
            { type: "err", msg: "Erreur API — vérifier la connexion" },
          ],
          aiRun: true,
          aiScore: 0,
        },
      }));
      showNotif("⚠ Erreur connexion API Claude");
    }
  };

  const validate = (role: string) => {
    setState((s) => ({ ...s, [role]: { ...s[role], validated: true } }));
    if (role === "cad") {
      setTimeout(
        () =>
          setState((s) => ({ ...s, cad: { ...s.cad, sentToStruct: true } })),
        400
      );
      showNotif("✅ Plans FAB transmis à SEIF — Ingénieur Structure");
    }
    if (role === "struct") {
      setTimeout(
        () =>
          setState((s) => ({
            ...s,
            struct: { ...s.struct, sentToBimlo: true },
          })),
        400
      );
      showNotif("✅ Note de calcul transmise à BIMLO — Visa final");
    }
    if (role === "bimlo")
      showNotif("🏆 DOSSIER VALIDÉ BIMLO — Archivage lancé !");
  };

  const totalDone = Object.values(state).reduce(
    (a, r) => a + r.checks.filter((c) => c.done).length,
    0
  );
  const totalItems = Object.values(ROLES).reduce(
    (a, r) => a + r.checks.length,
    0
  );
  const aiDone = [
    state.cad.aiRun,
    state.struct.aiRun,
    state.bimlo.aiRun,
  ].filter(Boolean).length;
  const valDone = [
    state.cad.validated,
    state.struct.validated,
    state.bimlo.validated,
  ].filter(Boolean).length;

  const RoleCard = ({ role, cardClass }: { role: string; cardClass: string }) => {
    const R = ROLES[role];
    const r = state[role];
    const colors = { cad: "#f59e0b", struct: "#a78bfa", bimlo: "#00c8ff" };
    const color = colors[role];
    const isScanning = scanning[role];
    const allDone = r.checks.every((c) => c.done);
    const canValidate = allDone && r.aiRun && !r.validated;
    const isLocked =
      (role === "struct" && !state.cad.sentToStruct) ||
      (role === "bimlo" && !state.struct.sentToBimlo);

    return (
      <div
        className={`card ${cardClass}`}
        style={isLocked ? { opacity: 0.4, pointerEvents: "none" } : {}}
      >
        <div className={`card-header ${role}`}>
          <div className="role-icon">{R.emoji}</div>
          <div className="role-info">
            <div className="role-name">{R.name}</div>
            <div className="role-title">{R.title}</div>
          </div>
          {isLocked ? (
            <span
              style={{
                fontSize: 10,
                color: "#374151",
                fontFamily: "monospace",
              }}
            >
              🔒 EN ATTENTE
            </span>
          ) : (
            <div
              className={`status-dot ${
                r.validated ? "done" : allDone && r.aiRun ? "active" : "pending"
              }`}
            />
          )}
        </div>

        <div className="card-body">
          <div className="section-title">📁 Documents livrables</div>
          <div className="tag-row">
            {R.docs.map((d) => (
              <span key={d} className="tag">
                {d}
              </span>
            ))}
          </div>
          <div className="divider" />

          <div className="section-title">
            🔧 Auto-vérification — {R.name.split(" ")[0]}
            <span
              style={{
                fontSize: 10,
                color: "#374151",
                fontFamily: "monospace",
                marginLeft: 8,
              }}
            >
              {r.checks.filter((c) => c.done).length}/{r.checks.length}
            </span>
          </div>
          <div className="checklist">
            {r.checks.map((c) => (
              <div
                key={c.id}
                className={`check-item ${c.done ? "checked" : ""}`}
                onClick={() => toggleCheck(role, c.id)}
              >
                <div className="check-icon">{c.done ? "✓" : ""}</div>
                <span className="check-text">{c.text}</span>
                <span className={`check-badge badge-${c.type}`}>
                  {c.type === "human"
                    ? "PERSO"
                    : c.type === "cross"
                    ? "CROISÉ"
                    : "FINAL"}
                </span>
              </div>
            ))}
          </div>

          <div className="ai-block">
            <div className="ai-header">
              <span style={{ fontSize: 14 }}>🤖</span>
              <span className="ai-label">VÉRIFICATION IA RÉELLE — CLAUDE</span>
              {r.aiRun && (
                <span
                  style={{
                    marginLeft: "auto",
                    fontSize: 12,
                    color,
                    fontFamily: "monospace",
                    fontWeight: 600,
                  }}
                >
                  {r.aiScore}%
                </span>
              )}
              {isScanning && (
                <span
                  style={{
                    marginLeft: "auto",
                    fontSize: 10,
                    color: "#6b7a94",
                    fontFamily: "monospace",
                  }}
                >
                  analyse<span className="typing">▋</span>
                </span>
              )}
            </div>

            {(isScanning || r.aiRun) && (
              <div className="ai-scan-bar">
                <div
                  className={`ai-scan-fill fill-${role}`}
                  style={{ width: isScanning ? "65%" : "100%" }}
                />
              </div>
            )}

            <div className="ai-findings">
              {!isScanning && !r.aiRun && (
                <div className="finding info">
                  ○ &nbsp;Cliquez "Lancer IA" pour analyse Claude réelle…
                </div>
              )}
              {isScanning && (
                <div className="finding info">
                  ⟳ &nbsp;Claude analyse vos données en temps réel…
                </div>
              )}
              {!isScanning &&
                r.aiRun &&
                r.aiResults.map((f, i) => (
                  <div key={i} className={`finding ${f.type}`}>
                    {f.type === "ok"
                      ? "✓"
                      : f.type === "warn"
                      ? "⚠"
                      : f.type === "err"
                      ? "✗"
                      : "○"}
                    &nbsp;&nbsp;{f.msg}
                  </div>
                ))}
            </div>
          </div>

          <div className="action-bar">
            <button
              className={`btn btn-primary-${role}`}
              onClick={() =>
                !isScanning && !r.aiRun && !r.validated && runAI(role)
              }
              disabled={isScanning || r.aiRun || r.validated}
            >
              {isScanning
                ? "⟳ Claude analyse…"
                : r.aiRun
                ? "✓ IA Complète"
                : "▶ Lancer IA Claude"}
            </button>
            <button
              className="btn btn-outline"
              onClick={() => canValidate && validate(role)}
              disabled={!canValidate}
              style={canValidate ? { borderColor: color, color } : {}}
            >
              {r.validated
                ? "✓ Validé"
                : role === "bimlo"
                ? "🏆 Visa final BIMLO"
                : "Transmettre →"}
            </button>
          </div>

          {r.validated && (
            <div className="validated-banner">
              ✓{" "}
              {role === "cad"
                ? "Plans FAB transmis à SEIF"
                : role === "struct"
                ? "Note transmise à BIMLO"
                : "🏆 DOSSIER VALIDÉ — Archivé BIMLO"}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <style>{style}</style>
      <div className="app">
        <div className="header">
          <div className="header-logo">BIMLO — BIM & IA Engineering</div>
          <div className="header-title">
            SYSTÈME DE VÉRIFICATION PYLÔNES TÉLÉCOMS
            <button className="reset-btn" onClick={resetAll}>
              ↺ Nouveau projet
            </button>
          </div>
          <div className="header-sub">
            Plans Fabrication PDF · Note de Calcul · IFC · Intégration Paysagère
            · <span style={{ color: "#00c8ff" }}>IA Claude Réelle ✓</span>
          </div>
        </div>

        {/* Pipeline */}
        <div className="pipeline">
          {[
            {
              badge: "W",
              role: "cad",
              active: !state.cad.validated,
              label: "WALA",
              sub: "Ing. CAD",
            },
          ].map((p) => (
            <div key={p.role} className="pipeline-step">
              <div className="pipeline-node">
                <div
                  className={`pipeline-badge ${p.role} ${
                    p.active ? "active" : ""
                  }`}
                >
                  {p.badge}
                </div>
                <div className="pipeline-label">
                  <strong>{p.label}</strong>
                  {p.sub}
                </div>
              </div>
            </div>
          ))}
          <div className="pipeline-arrow" />
          <div className="pipeline-step">
            <div className="pipeline-node">
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 6,
                  background: "#0d1929",
                  border: "1.5px dashed #1e2d3d",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 15,
                }}
              >
                🤖
              </div>
              <div className="pipeline-label" style={{ fontSize: 9 }}>
                IA
                <br />
                FAB
              </div>
            </div>
          </div>
          <div className="pipeline-arrow" style={{ width: 28 }} />

          <div className="pipeline-step">
            <div className="pipeline-node">
              <div
                className={`pipeline-badge struct ${
                  state.cad.sentToStruct && !state.struct.validated
                    ? "active"
                    : ""
                }`}
              >
                S
              </div>
              <div className="pipeline-label">
                <strong>SEIF</strong>Ing. Structure
              </div>
            </div>
          </div>
          <div className="pipeline-arrow" />
          <div className="pipeline-step">
            <div className="pipeline-node">
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 6,
                  background: "#0d1929",
                  border: "1.5px dashed #1e2d3d",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 15,
                }}
              >
                🤖
              </div>
              <div className="pipeline-label" style={{ fontSize: 9 }}>
                IA
                <br />
                Calcul
              </div>
            </div>
          </div>
          <div className="pipeline-arrow" style={{ width: 28 }} />

          <div className="pipeline-step">
            <div className="pipeline-node">
              <div
                className={`pipeline-badge ceo ${
                  state.struct.sentToBimlo && !state.bimlo.validated
                    ? "active"
                    : ""
                }`}
              >
                B
              </div>
              <div className="pipeline-label">
                <strong>BIMLO</strong>CEO Visa
              </div>
            </div>
          </div>
          <div className="pipeline-arrow" />
          <div className="pipeline-step">
            <div className="pipeline-node">
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 6,
                  background: "#0d1929",
                  border: "1.5px dashed #1e2d3d",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 15,
                }}
              >
                🤖
              </div>
              <div className="pipeline-label" style={{ fontSize: 9 }}>
                IA
                <br />
                Synthèse
              </div>
            </div>
          </div>
          <div className="pipeline-arrow" style={{ width: 28 }} />

          <div className="pipeline-step">
            <div className="pipeline-node">
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 6,
                  background: state.bimlo.validated
                    ? "rgba(16,185,129,0.2)"
                    : "#111825",
                  border: `2px solid ${
                    state.bimlo.validated ? "#10b981" : "#1a2535"
                  }`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  transition: "all 0.4s",
                }}
              >
                {state.bimlo.validated ? "✅" : "📁"}
              </div>
              <div className="pipeline-label">
                <strong
                  style={{
                    color: state.bimlo.validated ? "#10b981" : undefined,
                  }}
                >
                  {state.bimlo.validated ? "ARCHIVÉ" : "ARCHIVE"}
                </strong>
                BIMLO
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="progress-summary">
          <div className="prog-card">
            <div className="prog-num" style={{ color: "#00c8ff" }}>
              {totalDone}/{totalItems}
            </div>
            <div className="prog-label">
              <strong>Points vérifiés</strong>toutes disciplines
            </div>
          </div>
          <div className="prog-card">
            <div className="prog-num" style={{ color: "#10b981" }}>
              {aiDone}/3
            </div>
            <div className="prog-label">
              <strong>Analyses IA Claude</strong>complétées
            </div>
          </div>
          <div className="prog-card">
            <div className="prog-num" style={{ color: "#a78bfa" }}>
              {valDone}/3
            </div>
            <div className="prog-label">
              <strong>Validations</strong>signées
            </div>
          </div>
        </div>

        <div className="grid">
          <RoleCard role="cad" cardClass="cad-card" />
          <RoleCard role="struct" cardClass="struct-card" />
          <RoleCard role="bimlo" cardClass="ceo-card" />
        </div>
      </div>
      {notification && <div className="notification">{notification}</div>}
    </>
  );
}
