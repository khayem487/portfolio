import React, { useEffect, useMemo, useRef, useState } from "react";

// These browser demos use public project descriptions and synthetic inputs only.
// They do not import private models, connect to services, or access PC telemetry.
function useLanguage(props) {
  return String(props.lang || props.language || "fr").startsWith("en")
    ? "en"
    : "fr";
}

function DownloadButton({ value, filename, children }) {
  function download() {
    const url = URL.createObjectURL(
      new Blob([value], { type: "text/plain;charset=utf-8" })
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <button type="button" className="lab-button" onClick={download}>
      {children}
    </button>
  );
}

const crousSamples = {
  available:
    "<h1>Résidence des Étudiants</h1>\n<p>3 logements disponibles</p>\n<p>Studio de 18 m² · candidature ouverte.</p>",
  unavailable:
    "<h1>Résidence des Étudiants</h1>\n<p>Aucun logement disponible pour les critères sélectionnés.</p>\n<p>Vous pouvez modifier votre recherche.</p>",
  ambiguous:
    "<h1>Résidence des Étudiants</h1>\n<p>Nous mettons à jour les disponibilités.</p>\n<p>Merci de réessayer ultérieurement.</p>",
};

function classifyHousing(input) {
  const plain = input.replace(/<[^>]*>/g, " ").replace(/&nbsp;|&#160;/gi, " ");
  const value = plain
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ");
  const negative =
    /(?:aucun(?:e)?|pas de|zero|0)\s+(?:offres? de\s+)?logements?(?:\s+(?:n['’]est|ne sont))?\s*(?:disponibles?|proposes?)?|aucune offre|residence complete|logements? indisponibles?|no (?:housing|rooms?) available/.test(
      value
    );
  const withoutNegative = value.replace(
    /(?:aucun(?:e)?|pas de|zero|0)\s+(?:offres? de\s+)?logements?(?:\s+(?:n['’]est|ne sont))?\s*(?:disponibles?|proposes?)?/g,
    ""
  );
  const positive =
    /(?:[1-9]\d*)\s+logements?\s+disponibles?|logements? disponibles?|candidature ouverte|offres? disponibles?|rooms? available/.test(
      withoutNegative
    );
  if (negative && !positive)
    return { state: "unavailable", evidence: "negative" };
  if (positive && !negative)
    return { state: "available", evidence: "positive" };
  return {
    state: "ambiguous",
    evidence: negative && positive ? "conflict" : "missing",
  };
}

export function CrousDemo(props) {
  const lang = useLanguage(props);
  const en = lang === "en";
  const [input, setInput] = useState(crousSamples.available);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const lastState = useRef(null);
  const sequence = useRef(0);
  const labels = en
    ? {
        available: "Available",
        unavailable: "Unavailable",
        ambiguous: "Uncertain",
      }
    : {
        available: "Disponible",
        unavailable: "Indisponible",
        ambiguous: "Ambigu",
      };
  const explanations = en
    ? {
        positive:
          "An explicit availability signal was found in the supplied text.",
        negative:
          "An explicit unavailability signal was found in the supplied text.",
        conflict:
          "Positive and negative signals conflict: human review is needed.",
        missing: "No explicit availability signal: do not infer a result.",
      }
    : {
        positive:
          "Le texte fourni contient un signal explicite de disponibilité.",
        negative:
          "Le texte fourni contient un signal explicite d’indisponibilité.",
        conflict:
          "Des signaux contradictoires demandent une vérification humaine.",
        missing: "Aucun signal explicite : le résultat reste à vérifier.",
      };

  function analyse() {
    const next = classifyHousing(input);
    const repeat = lastState.current === next.state;
    const alert = next.state === "available" && !repeat;
    sequence.current += 1;
    setResult({ ...next, repeat, alert });
    setHistory((previous) =>
      [{ id: sequence.current, ...next, repeat, alert }, ...previous].slice(
        0,
        12
      )
    );
    lastState.current = next.state;
  }

  function reset() {
    lastState.current = null;
    sequence.current = 0;
    setHistory([]);
    setResult(null);
  }

  return (
    <div className="lab-panel">
      <p className="lab-muted">
        {en
          ? "Local text analysis · sample pages · no scraping or notifications sent."
          : "Analyse locale de texte · pages d’exemple · aucune collecte ni notification envoyée."}
      </p>
      <div
        className="lab-controls"
        aria-label={en ? "Load a sample" : "Charger un exemple"}
      >
        {Object.keys(crousSamples).map((key) => (
          <button
            type="button"
            className="lab-button"
            key={key}
            onClick={() => setInput(crousSamples[key])}
          >
            {labels[key]}
          </button>
        ))}
      </div>
      <label>
        {en ? "Page text or HTML" : "Texte ou HTML de la page"}
        <textarea
          rows={7}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          spellCheck="false"
        />
      </label>
      <div className="lab-controls">
        <button
          type="button"
          className="lab-button"
          onClick={analyse}
          disabled={!input.trim()}
        >
          {en ? "Run check" : "Lancer la vérification"}
        </button>
        <button
          type="button"
          className="lab-button"
          onClick={reset}
          disabled={!history.length}
        >
          {en ? "Reset state memory" : "Réinitialiser la mémoire"}
        </button>
      </div>
      <div aria-live="polite" role="status">
        {result && (
          <div className="lab-card">
            <h3>{labels[result.state]}</h3>
            <p>{explanations[result.evidence]}</p>
            <p className="lab-muted">
              {result.alert
                ? en
                  ? "New availability: one alert would be generated."
                  : "Nouvelle disponibilité : une alerte serait générée."
                : result.repeat
                ? en
                  ? "Same result as the previous check: duplicate suppressed."
                  : "Résultat inchangé depuis la vérification précédente : doublon évité."
                : en
                ? "State recorded. No availability alert."
                : "État mémorisé. Aucune alerte de disponibilité."}
            </p>
          </div>
        )}
      </div>
      <h3>{en ? "Check timeline" : "Historique des vérifications"}</h3>
      {history.length ? (
        <div style={{ overflowX: "auto" }}>
          <table className="lab-table">
            <thead>
              <tr>
                <th>{en ? "Check" : "Passage"}</th>
                <th>{en ? "Result" : "Résultat"}</th>
                <th>{en ? "Decision" : "Décision"}</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr key={item.id}>
                  <td>#{item.id}</td>
                  <td>{labels[item.state]}</td>
                  <td>
                    {item.alert
                      ? en
                        ? "Would alert"
                        : "Alerte simulée"
                      : item.repeat
                      ? en
                        ? "Duplicate suppressed"
                        : "Doublon évité"
                      : en
                      ? "State saved"
                      : "État mémorisé"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="lab-muted">
          {en
            ? "Try the same available sample twice, then an unavailable sample, to inspect the state transitions."
            : "Vérifie deux fois l’exemple disponible, puis l’indisponible, pour observer les changements d’état."}
        </p>
      )}
    </div>
  );
}

const telemetry = Array.from({ length: 91 }, (_, index) => {
  const load = index < 15 ? 18 : index < 55 ? 75 : index < 72 ? 93 : 26;
  const cpu = Math.round(
    Math.min(100, Math.max(0, load + Math.sin(index * 0.8) * 7))
  );
  const temperature = Math.round(35 + load * 0.42 + Math.sin(index * 0.16) * 6);
  return {
    second: index * 2,
    cpu,
    cpuTemperature: temperature,
    gpuTemperature:
      index >= 35 && index <= 39
        ? null
        : Math.round(31 + load * 0.35 + Math.cos(index * 0.21) * 4),
    memory:
      Math.round((7.2 + load * 0.045 + Math.sin(index * 0.1) * 0.4) * 10) / 10,
  };
});

function timeLabel(seconds) {
  const time = Math.max(0, Math.round(seconds));
  return `${String(Math.floor(time / 60)).padStart(2, "0")}:${String(
    time % 60
  ).padStart(2, "0")}`;
}

function TelemetryChart({ index, en }) {
  const lines = [
    {
      key: "cpu",
      label: en ? "CPU load (%)" : "Charge CPU (%)",
      colour: "#4d71ef",
    },
    { key: "cpuTemperature", label: "CPU (°C)", colour: "#dd7654" },
    { key: "gpuTemperature", label: "GPU (°C)", colour: "#148b85" },
  ];
  function paths(key) {
    const result = [];
    let current = "";
    telemetry.slice(0, index + 1).forEach((sample, offset) => {
      if (sample[key] === null) {
        if (current) result.push(current);
        current = "";
      } else {
        current += `${current ? "L" : "M"}${45 + (offset * 710) / 90},${
          210 - sample[key] * 1.8
        } `;
      }
    });
    if (current) result.push(current);
    return result;
  }
  return (
    <div className="lab-chart">
      <svg
        viewBox="0 0 800 250"
        role="img"
        aria-label={
          en
            ? "Synthetic CPU load and CPU/GPU temperatures over a three-minute session"
            : "Charge CPU et températures CPU/GPU synthétiques sur une session de trois minutes"
        }
        style={{ width: "100%", display: "block" }}
      >
        {[0, 25, 50, 75, 100].map((tick) => (
          <g key={tick}>
            <line
              x1="45"
              x2="755"
              y1={210 - tick * 1.8}
              y2={210 - tick * 1.8}
              stroke="currentColor"
              opacity="0.12"
            />
            <text x="8" y={214 - tick * 1.8} fill="currentColor" fontSize="12">
              {tick}
            </text>
          </g>
        ))}
        <rect
          x={45 + (35 * 710) / 90}
          y="30"
          width={(5 * 710) / 90}
          height="180"
          fill="#148b85"
          opacity="0.07"
        />
        {lines.flatMap((line) =>
          paths(line.key).map((path, part) => (
            <path
              key={`${line.key}-${part}`}
              d={path}
              fill="none"
              stroke={line.colour}
              strokeWidth="2.5"
            />
          ))
        )}
        <line
          x1={45 + (index * 710) / 90}
          x2={45 + (index * 710) / 90}
          y1="30"
          y2="210"
          stroke="currentColor"
          opacity="0.35"
          strokeDasharray="4 4"
        />
        {[0, 60, 120, 180].map((time) => (
          <text
            key={time}
            x={45 + (time * 710) / 180}
            y="235"
            fill="currentColor"
            fontSize="12"
            textAnchor="middle"
          >
            {timeLabel(time)}
          </text>
        ))}
      </svg>
      <div className="lab-controls">
        {lines.map((line) => (
          <span key={line.key} style={{ color: line.colour }}>
            ● {line.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function FanReplayDemo(props) {
  const en = useLanguage(props) === "en";
  const [index, setIndex] = useState(0);
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(4);
  const [snapshots, setSnapshots] = useState([]);
  const current = telemetry[index];

  useEffect(() => {
    if (!running) return undefined;
    const timer = setInterval(
      () =>
        setIndex((previous) => Math.min(telemetry.length - 1, previous + 1)),
      2000 / speed
    );
    return () => clearInterval(timer);
  }, [running, speed]);
  useEffect(() => {
    if (index === telemetry.length - 1) setRunning(false);
  }, [index]);

  function togglePlay() {
    if (index === telemetry.length - 1) setIndex(0);
    setRunning((previous) => !previous);
  }

  return (
    <div className="lab-panel">
      <p className="lab-muted">
        {en
          ? "Synthetic telemetry replay · no hardware access, live readings or fan commands."
          : "Rejeu de mesures synthétiques · aucun accès matériel, relevé réel ou commande de ventilateur."}
      </p>
      <div className="lab-controls">
        <button type="button" className="lab-button" onClick={togglePlay}>
          {running
            ? en
              ? "Pause"
              : "Pause"
            : en
            ? "Play session"
            : "Lire la session"}
        </button>
        <button
          type="button"
          className="lab-button"
          disabled={index === telemetry.length - 1}
          onClick={() => {
            setRunning(false);
            setIndex((previous) => Math.min(90, previous + 1));
          }}
        >
          {en ? "Next reading" : "Mesure suivante"}
        </button>
        <button
          type="button"
          className="lab-button"
          onClick={() => {
            setRunning(false);
            setIndex(0);
          }}
        >
          {en ? "Restart" : "Recommencer"}
        </button>
        <label>
          {en ? "Replay speed" : "Vitesse de lecture"}{" "}
          <select
            value={speed}
            onChange={(event) => setSpeed(Number(event.target.value))}
          >
            <option value={1}>1×</option>
            <option value={4}>4×</option>
            <option value={10}>10×</option>
          </select>
        </label>
      </div>
      <label>
        {en ? "Session position" : "Position dans la session"} ·{" "}
        {timeLabel(current.second)} / 03:00
        <input
          type="range"
          min="0"
          max="90"
          value={index}
          onChange={(event) => setIndex(Number(event.target.value))}
        />
      </label>
      <div className="lab-grid" aria-live="off">
        <div className="lab-stat">
          <span>{en ? "CPU load" : "Charge CPU"}</span>
          <strong>{current.cpu} %</strong>
        </div>
        <div className="lab-stat">
          <span>{en ? "CPU temperature" : "Température CPU"}</span>
          <strong>{current.cpuTemperature} °C</strong>
        </div>
        <div className="lab-stat">
          <span>{en ? "GPU temperature" : "Température GPU"}</span>
          <strong>
            {current.gpuTemperature === null
              ? "—"
              : `${current.gpuTemperature} °C`}
          </strong>
        </div>
        <div className="lab-stat">
          <span>{en ? "Memory used" : "Mémoire utilisée"}</span>
          <strong>
            {current.memory.toFixed(1)} {en ? "GB" : "Go"}
          </strong>
        </div>
      </div>
      <TelemetryChart index={index} en={en} />
      <p className="lab-muted" role="status">
        {current.gpuTemperature === null
          ? en
            ? "GPU data unavailable at this point. The gap is kept visible rather than interpolated."
            : "Mesure GPU absente à cet instant. La lacune reste visible, sans interpolation."
          : en
          ? "CPU/GPU sample available. The shaded interval contains five missing GPU samples."
          : "Mesures CPU/GPU disponibles. La zone ombrée contient cinq mesures GPU absentes."}
      </p>
      <div className="lab-controls">
        <button
          type="button"
          className="lab-button"
          onClick={() =>
            setSnapshots((previous) =>
              [
                { ...current, id: Date.now() + Math.random() },
                ...previous,
              ].slice(0, 8)
            )
          }
        >
          {en ? "Save this reading" : "Conserver cette mesure"}
        </button>
        <DownloadButton
          value={JSON.stringify(
            {
              type: "synthetic-telemetry",
              samples: telemetry,
              snapshots: snapshots.map(({ id, ...sample }) => sample),
            },
            null,
            2
          )}
          filename="synthetic-telemetry.json"
        >
          {en ? "Export JSON" : "Exporter en JSON"}
        </DownloadButton>
      </div>
      {!!snapshots.length && (
        <>
          <h3>
            {en
              ? "Saved readings · this session"
              : "Mesures conservées · cette session"}
          </h3>
          <div style={{ overflowX: "auto" }}>
            <table className="lab-table">
              <thead>
                <tr>
                  <th>{en ? "Time" : "Instant"}</th>
                  <th>CPU</th>
                  <th>CPU °C</th>
                  <th>GPU °C</th>
                  <th>{en ? "Memory" : "Mémoire"}</th>
                </tr>
              </thead>
              <tbody>
                {snapshots.map((sample) => (
                  <tr key={sample.id}>
                    <td>{timeLabel(sample.second)}</td>
                    <td>{sample.cpu} %</td>
                    <td>{sample.cpuTemperature}</td>
                    <td>{sample.gpuTemperature ?? "—"}</td>
                    <td>
                      {sample.memory.toFixed(1)} {en ? "GB" : "Go"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

function splitMessage(text, limit, delimiter) {
  if (!text.trim()) return [];
  const segments = delimiter ? text.split(delimiter) : [text];
  const result = [];
  for (const segment of segments) {
    let remaining = Array.from(segment.trim());
    while (remaining.length > limit) {
      const window = remaining.slice(0, limit);
      let cut = window.length;
      for (
        let offset = window.length - 1;
        offset >= Math.floor(limit * 0.35);
        offset -= 1
      ) {
        if (/\s/.test(window[offset])) {
          cut = offset;
          break;
        }
      }
      result.push(remaining.slice(0, cut).join("").trimEnd());
      remaining = Array.from(remaining.slice(cut).join("").trimStart());
    }
    if (remaining.length) result.push(remaining.join(""));
  }
  return result;
}

const pluginSample =
  "Un message utile mérite de rester lisible, même lorsqu’il dépasse la limite de la conversation. Le découpage privilégie les espaces pour conserver des phrases faciles à suivre.\n\n/split\nCette partie commence volontairement un nouveau message. Essaie de modifier la limite, le texte ou le délimiteur : le résultat s’adapte immédiatement. Les caractères comme 👋 restent entiers.";

export function PluginsDemo(props) {
  const en = useLanguage(props) === "en";
  const [tab, setTab] = useState("split");
  const [text, setText] = useState(pluginSample);
  const [limit, setLimit] = useState(140);
  const [delimiter, setDelimiter] = useState("/split");
  const [pdf, setPdf] = useState(null);
  const [pdfError, setPdfError] = useState("");
  const chunks = useMemo(
    () => splitMessage(text, limit, delimiter),
    [text, limit, delimiter]
  );
  useEffect(
    () => () => {
      if (pdf?.url) URL.revokeObjectURL(pdf.url);
    },
    [pdf]
  );

  function loadPdf(event) {
    const file = event.target.files?.[0];
    setPdfError("");
    if (!file) return;
    if (
      file.type !== "application/pdf" &&
      !file.name.toLowerCase().endsWith(".pdf")
    ) {
      setPdfError(en ? "Choose a PDF file." : "Choisis un fichier PDF.");
      event.target.value = "";
      return;
    }
    setPdf({
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
    });
  }

  return (
    <div className="lab-panel">
      <p className="lab-muted">
        {en
          ? "Browser adaptation of two plugin interactions · Vencord is not running here."
          : "Adaptation navigateur de deux interactions des plugins · Vencord ne s’exécute pas ici."}
      </p>
      <div className="lab-controls" aria-label={en ? "Plugin" : "Plugin"}>
        <button
          type="button"
          className="lab-button"
          aria-pressed={tab === "split"}
          onClick={() => setTab("split")}
        >
          SplitLargeMessages
        </button>
        <button
          type="button"
          className="lab-button"
          aria-pressed={tab === "pdf"}
          onClick={() => setTab("pdf")}
        >
          PdfViewer
        </button>
      </div>
      {tab === "split" ? (
        <>
          <div className="lab-controls">
            <label>
              {en
                ? "Maximum characters per message"
                : "Caractères maximum par message"}
              <input
                type="number"
                min="32"
                max="2000"
                value={limit}
                onChange={(event) =>
                  setLimit(
                    Math.max(
                      32,
                      Math.min(2000, Number(event.target.value) || 32)
                    )
                  )
                }
              />
            </label>
            <label>
              {en
                ? "Explicit delimiter (optional)"
                : "Délimiteur explicite (facultatif)"}
              <input
                value={delimiter}
                maxLength={30}
                onChange={(event) => setDelimiter(event.target.value)}
              />
            </label>
          </div>
          <label>
            {en ? "Message to split" : "Message à découper"}
            <textarea
              rows={7}
              value={text}
              maxLength={20000}
              onChange={(event) => setText(event.target.value)}
            />
          </label>
          <p className="lab-muted" aria-live="polite">
            {Array.from(text).length} {en ? "characters" : "caractères"} ·{" "}
            {chunks.length} {en ? "messages" : "messages"} ·{" "}
            {en ? "maximum" : "maximum"} {limit}
          </p>
          <div className="lab-controls">
            <button
              type="button"
              className="lab-button"
              onClick={() => setText(pluginSample)}
            >
              {en ? "Load example" : "Charger l’exemple"}
            </button>
            {!!chunks.length && (
              <DownloadButton
                value={chunks
                  .map(
                    (chunk, index) =>
                      `# ${index + 1}/${chunks.length}\n${chunk}`
                  )
                  .join("\n\n")}
                filename="split-messages.txt"
              >
                {en ? "Download messages" : "Télécharger les messages"}
              </DownloadButton>
            )}
          </div>
          <div className="lab-grid">
            {chunks.map((chunk, index) => (
              <div className="lab-card" key={`${index}-${chunk}`}>
                <h3>
                  {en ? "Message" : "Message"} {index + 1}{" "}
                  <small className="lab-muted">
                    {Array.from(chunk).length}/{limit}
                  </small>
                </h3>
                <p style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>
                  {chunk}
                </p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <label>
            {en ? "Choose a local PDF" : "Choisir un PDF local"}
            <input
              type="file"
              accept="application/pdf,.pdf"
              onChange={loadPdf}
            />
          </label>
          <p className="lab-muted">
            {en
              ? "The file stays in this browser. The preview uses your browser’s PDF viewer; nothing is uploaded."
              : "Le fichier reste dans ce navigateur. L’aperçu utilise son lecteur PDF, sans aucun envoi."}
          </p>
          {pdfError && <p role="alert">{pdfError}</p>}
          {pdf && (
            <div className="lab-card">
              <div className="lab-controls">
                <strong style={{ overflowWrap: "anywhere" }}>{pdf.name}</strong>
                <span className="lab-muted">
                  {Math.round(pdf.size / 1024)} {en ? "KB" : "Ko"}
                </span>
                <button
                  type="button"
                  className="lab-button"
                  onClick={() => setPdf(null)}
                >
                  {en ? "Close PDF" : "Fermer le PDF"}
                </button>
              </div>
              <object
                data={pdf.url}
                type="application/pdf"
                aria-label={en ? "Local PDF preview" : "Aperçu du PDF local"}
                style={{
                  display: "block",
                  width: "100%",
                  height: "min(65vh, 620px)",
                  marginTop: "1rem",
                }}
              >
                <p>
                  {en
                    ? "Your browser cannot embed the PDF."
                    : "Ton navigateur ne peut pas intégrer ce PDF."}{" "}
                  <a href={pdf.url} target="_blank" rel="noreferrer">
                    {en ? "Open local preview" : "Ouvrir l’aperçu local"}
                  </a>
                </p>
              </object>
            </div>
          )}
        </>
      )}
    </div>
  );
}

const movieDuration = 180;
const initialPlayers = {
  host: { time: 12, playing: false },
  guest: { time: 12, playing: false },
};

function SimulatedPlayer({ name, player, onToggle, onSeek, en }) {
  const progress = player.time / movieDuration;
  return (
    <div className="lab-card">
      <div className="lab-controls">
        <h3>{name}</h3>
        <span className="lab-muted">
          {player.playing
            ? en
              ? "Playing"
              : "Lecture"
            : en
            ? "Paused"
            : "En pause"}
        </span>
      </div>
      <svg
        viewBox="0 0 440 230"
        role="img"
        aria-label={
          en ? "Animated synthetic video frame" : "Image animée synthétique"
        }
        style={{
          width: "100%",
          display: "block",
          borderRadius: "12px",
          background: "#121b32",
        }}
      >
        <defs>
          <linearGradient id={`watch-sky-${name}`} x2="1" y2="1">
            <stop stopColor="#263f86" />
            <stop offset="1" stopColor="#111b32" />
          </linearGradient>
        </defs>
        <rect width="440" height="230" fill={`url(#watch-sky-${name})`} />
        <circle
          cx={65 + progress * 300}
          cy={70 + Math.sin(progress * Math.PI * 6) * 20}
          r="25"
          fill="#c6d8ff"
        />
        <path
          d="M0 210L110 92L220 210L315 116L440 220V230H0Z"
          fill="#486cad"
          opacity="0.65"
        />
        <path d="M0 230L150 140L310 230L370 183L440 225V230Z" fill="#0b1425" />
        <text x="20" y="30" fontSize="12" fill="#dce7ff">
          LOCAL FRAME · {String(Math.floor(player.time * 24)).padStart(4, "0")}
        </text>
        <rect x="0" y="224" width={440 * progress} height="6" fill="#90b0ff" />
      </svg>
      <p>
        <strong>{timeLabel(player.time)}</strong>{" "}
        <span className="lab-muted">/ 03:00</span>
      </p>
      <label>
        {en ? `Position · ${name}` : `Position · ${name}`}
        <input
          type="range"
          min="0"
          max={movieDuration}
          step="1"
          value={player.time}
          onChange={(event) => onSeek(Number(event.target.value))}
        />
      </label>
      <button type="button" className="lab-button" onClick={onToggle}>
        {player.playing ? (en ? "Pause" : "Pause") : en ? "Play" : "Lire"} ·{" "}
        {name}
      </button>
    </div>
  );
}

export function WatchPartyDemo(props) {
  const en = useLanguage(props) === "en";
  const [players, setPlayers] = useState(initialPlayers);
  const [sync, setSync] = useState(true);
  const [events, setEvents] = useState([]);
  const eventId = useRef(0);

  useEffect(() => {
    const timer = setInterval(
      () =>
        setPlayers((previous) => {
          if (!previous.host.playing && !previous.guest.playing)
            return previous;
          return Object.fromEntries(
            Object.entries(previous).map(([key, player]) => [
              key,
              {
                time: player.playing
                  ? Math.min(movieDuration, player.time + 0.25)
                  : player.time,
                playing: player.playing && player.time + 0.25 < movieDuration,
              },
            ])
          );
        }),
      250
    );
    return () => clearInterval(timer);
  }, []);

  function log(fr, english) {
    eventId.current += 1;
    const item = { id: eventId.current, fr, en: english };
    setEvents((previous) => [item, ...previous].slice(0, 8));
  }

  function command(source, patch, eventName) {
    setPlayers((previous) => {
      const next = { ...previous[source], ...patch };
      if (next.time >= movieDuration && next.playing) next.time = 0;
      return sync
        ? { host: { ...next }, guest: { ...next } }
        : { ...previous, [source]: next };
    });
    const whoFr = source === "host" ? "Hôte" : "Invité";
    const whoEn = source === "host" ? "Host" : "Guest";
    log(
      `${whoFr} : ${eventName.fr}${
        sync ? " → les deux lecteurs" : " → ce lecteur uniquement"
      }`,
      `${whoEn}: ${eventName.en}${
        sync ? " → both players" : " → this player only"
      }`
    );
  }

  function realign() {
    setPlayers((previous) => ({
      host: { ...previous.host },
      guest: { ...previous.host },
    }));
    log("Invité réaligné sur l’hôte.", "Guest realigned with host.");
  }

  const drift = Math.abs(players.guest.time - players.host.time);
  return (
    <div className="lab-panel">
      <p className="lab-muted">
        {en
          ? "Two local simulated players · generated frames · no room server, stream or WebSocket connection."
          : "Deux lecteurs simulés localement · images générées · aucun serveur de salon, flux vidéo ou WebSocket."}
      </p>
      <div className="lab-controls">
        <label>
          <input
            type="checkbox"
            checked={sync}
            onChange={(event) => {
              setSync(event.target.checked);
              log(
                event.target.checked
                  ? "Propagation des commandes activée."
                  : "Propagation des commandes désactivée.",
                event.target.checked
                  ? "Command propagation enabled."
                  : "Command propagation disabled."
              );
            }}
          />{" "}
          {en
            ? "Propagate play, pause and seek"
            : "Propager lecture, pause et déplacement"}
        </label>
        <button type="button" className="lab-button" onClick={realign}>
          {en ? "Realign with host" : "Réaligner sur l’hôte"}
        </button>
        <button
          type="button"
          className="lab-button"
          onClick={() => {
            setPlayers((previous) => ({
              ...previous,
              guest: {
                ...previous.guest,
                time: Math.min(movieDuration, previous.guest.time + 8),
              },
            }));
            log(
              "Décalage artificiel de +8 s sur l’invité.",
              "Artificial +8 s offset applied to guest."
            );
          }}
        >
          {en ? "Simulate drift" : "Simuler un décalage"}
        </button>
        <button
          type="button"
          className="lab-button"
          onClick={() => {
            setPlayers(initialPlayers);
            setSync(true);
            setEvents([]);
          }}
        >
          {en ? "Reset room" : "Réinitialiser le salon"}
        </button>
      </div>
      <p className="lab-stat" role="status">
        <span>{en ? "Player drift" : "Écart entre les lecteurs"}</span>
        <strong>{drift.toFixed(1)} s</strong>
      </p>
      <div className="lab-grid">
        {[
          ["host", en ? "Host" : "Hôte"],
          ["guest", en ? "Guest" : "Invité"],
        ].map(([key, name]) => (
          <SimulatedPlayer
            key={key}
            name={name}
            player={players[key]}
            en={en}
            onToggle={() =>
              command(
                key,
                { playing: !players[key].playing },
                {
                  fr: players[key].playing ? "pause" : "lecture",
                  en: players[key].playing ? "pause" : "play",
                }
              )
            }
            onSeek={(time) =>
              command(
                key,
                { time },
                {
                  fr: `déplacement à ${timeLabel(time)}`,
                  en: `seek to ${timeLabel(time)}`,
                }
              )
            }
          />
        ))}
      </div>
      <h3>{en ? "Event log" : "Journal des événements"}</h3>
      {events.length ? (
        <ol>
          {events.map((event) => (
            <li key={event.id}>{event[en ? "en" : "fr"]}</li>
          ))}
        </ol>
      ) : (
        <p className="lab-muted">
          {en
            ? "Start either player or move its timeline. With propagation enabled, the command updates both players."
            : "Lance un lecteur ou déplace sa timeline. Lorsque la propagation est activée, la commande met à jour les deux lecteurs."}
        </p>
      )}
    </div>
  );
}

const gameTags = {
  action: { fr: "Action", en: "Action" },
  adventure: { fr: "Aventure", en: "Adventure" },
  puzzle: { fr: "Réflexion", en: "Puzzle" },
  rpg: { fr: "RPG", en: "RPG" },
  strategy: { fr: "Stratégie", en: "Strategy" },
  simulation: { fr: "Simulation", en: "Simulation" },
  coop: { fr: "Coopération", en: "Co-op" },
  racing: { fr: "Course", en: "Racing" },
};

const gameCatalogue = [
  {
    id: "portal-2",
    name: "Portal 2",
    tags: ["puzzle", "adventure", "coop"],
    modes: ["solo", "multi"],
    colour: "#167f9a",
  },
  {
    id: "hades",
    name: "Hades",
    tags: ["action", "rpg"],
    modes: ["solo"],
    colour: "#a23d4d",
  },
  {
    id: "stardew-valley",
    name: "Stardew Valley",
    tags: ["simulation", "rpg", "coop"],
    modes: ["solo", "multi"],
    colour: "#588749",
  },
  {
    id: "hollow-knight",
    name: "Hollow Knight",
    tags: ["action", "adventure"],
    modes: ["solo"],
    colour: "#536087",
  },
  {
    id: "civilization-vi",
    name: "Civilization VI",
    tags: ["strategy", "simulation"],
    modes: ["solo", "multi"],
    colour: "#927336",
  },
  {
    id: "it-takes-two",
    name: "It Takes Two",
    tags: ["adventure", "puzzle", "coop"],
    modes: ["multi"],
    colour: "#b27137",
  },
  {
    id: "slay-the-spire",
    name: "Slay the Spire",
    tags: ["strategy", "rpg"],
    modes: ["solo"],
    colour: "#7264a0",
  },
  {
    id: "outer-wilds",
    name: "Outer Wilds",
    tags: ["adventure", "puzzle"],
    modes: ["solo"],
    colour: "#b76335",
  },
  {
    id: "forza-horizon-5",
    name: "Forza Horizon 5",
    tags: ["racing", "simulation"],
    modes: ["solo", "multi"],
    colour: "#b8507f",
  },
  {
    id: "overcooked-2",
    name: "Overcooked! 2",
    tags: ["simulation", "coop", "action"],
    modes: ["solo", "multi"],
    colour: "#bb7530",
  },
  {
    id: "baba-is-you",
    name: "Baba Is You",
    tags: ["puzzle", "strategy"],
    modes: ["solo"],
    colour: "#73835e",
  },
  {
    id: "deep-rock",
    name: "Deep Rock Galactic",
    tags: ["action", "coop"],
    modes: ["solo", "multi"],
    colour: "#96724a",
  },
  {
    id: "baldurs-gate-3",
    name: "Baldur’s Gate 3",
    tags: ["rpg", "strategy", "adventure", "coop"],
    modes: ["solo", "multi"],
    colour: "#796254",
  },
  {
    id: "factorio",
    name: "Factorio",
    tags: ["simulation", "strategy", "coop"],
    modes: ["solo", "multi"],
    colour: "#8d7351",
  },
];

function rankGames(favourites, preferences, mode, diversity) {
  const weights = Object.fromEntries(
    Object.keys(gameTags).map((tag) => [tag, preferences.includes(tag) ? 2 : 0])
  );
  gameCatalogue
    .filter((game) => favourites.includes(game.id))
    .forEach((game) =>
      game.tags.forEach((tag) => {
        weights[tag] += 1;
      })
    );
  const norm = Math.sqrt(
    Object.values(weights).reduce((total, value) => total + value * value, 0)
  );
  if (!norm) return [];
  const remaining = gameCatalogue
    .filter(
      (game) =>
        !favourites.includes(game.id) &&
        (mode === "any" || game.modes.includes(mode))
    )
    .map((game) => ({
      ...game,
      score:
        game.tags.reduce((total, tag) => total + weights[tag], 0) /
        (Math.sqrt(game.tags.length) * norm),
      matches: game.tags.filter((tag) => weights[tag] > 0),
    }))
    .filter((game) => game.score > 0);
  const selected = [];
  while (remaining.length && selected.length < 6) {
    function priority(game) {
      const similarity = selected.length
        ? Math.max(
            ...selected.map(
              (other) =>
                game.tags.filter((tag) => other.tags.includes(tag)).length /
                new Set([...game.tags, ...other.tags]).size
            )
          )
        : 0;
      return game.score - (diversity / 100) * 0.45 * similarity;
    }
    remaining.sort(
      (a, b) =>
        priority(b) - priority(a) ||
        b.score - a.score ||
        a.name.localeCompare(b.name)
    );
    selected.push(remaining.shift());
  }
  return selected;
}

export function SteamDemo(props) {
  const lang = useLanguage(props);
  const en = lang === "en";
  const [favourites, setFavourites] = useState(["portal-2"]);
  const [preferences, setPreferences] = useState(["adventure", "puzzle"]);
  const [mode, setMode] = useState("any");
  const [diversity, setDiversity] = useState(35);
  const results = useMemo(
    () => rankGames(favourites, preferences, mode, diversity),
    [favourites, preferences, mode, diversity]
  );
  function toggle(setter, item) {
    setter((previous) =>
      previous.includes(item)
        ? previous.filter((value) => value !== item)
        : [...previous, item]
    );
  }

  return (
    <div className="lab-panel">
      <p className="lab-muted">
        {en
          ? "Illustrative content-based ranking · 14 manually tagged games · deterministic logic, not the private project’s ML model or Steam API."
          : "Classement illustratif par contenu · 14 jeux étiquetés manuellement · logique déterministe, sans modèle ML privé ni API Steam."}
      </p>
      <fieldset>
        <legend>
          {en
            ? "Games you already like (excluded from recommendations)"
            : "Jeux que tu apprécies déjà (exclus des recommandations)"}
        </legend>
        <div className="lab-controls">
          {gameCatalogue.map((game) => (
            <label key={game.id}>
              <input
                type="checkbox"
                checked={favourites.includes(game.id)}
                onChange={() => toggle(setFavourites, game.id)}
              />{" "}
              {game.name}
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend>
          {en
            ? "What would you like to find?"
            : "Qu’as-tu envie de retrouver ?"}
        </legend>
        <div className="lab-controls">
          {Object.keys(gameTags).map((tag) => (
            <label key={tag}>
              <input
                type="checkbox"
                checked={preferences.includes(tag)}
                onChange={() => toggle(setPreferences, tag)}
              />{" "}
              {gameTags[tag][lang]}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="lab-controls">
        <label>
          {en ? "Play mode" : "Mode de jeu"}
          <select
            value={mode}
            onChange={(event) => setMode(event.target.value)}
          >
            <option value="any">{en ? "All modes" : "Tous les modes"}</option>
            <option value="solo">Solo</option>
            <option value="multi">
              {en ? "Multiplayer / co-op" : "Multijoueur / coopération"}
            </option>
          </select>
        </label>
        <label>
          {en ? "Diversify the selection" : "Diversifier la sélection"} ·{" "}
          {diversity} %
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={diversity}
            onChange={(event) => setDiversity(Number(event.target.value))}
          />
        </label>
        <button
          type="button"
          className="lab-button"
          onClick={() => {
            setFavourites(["portal-2"]);
            setPreferences(["adventure", "puzzle"]);
            setMode("any");
            setDiversity(35);
          }}
        >
          {en ? "Reset preferences" : "Réinitialiser les préférences"}
        </button>
      </div>
      <p className="lab-muted">
        {en
          ? "Tags from your favourite games and chosen interests form a preference vector. Cosine similarity measures the match; diversity penalises repeated tag combinations. The score is not a probability."
          : "Les tags de tes favoris et tes envies forment un vecteur de préférences. La similarité cosinus mesure la proximité ; la diversité pénalise les combinaisons répétées. Le score n’est pas une probabilité."}
      </p>
      <div aria-live="polite">
        <h3>
          {en ? "Your selection" : "Ta sélection"} · {results.length}
        </h3>
        {results.length ? (
          <div className="lab-grid">
            {results.map((game, index) => (
              <article
                className="lab-card"
                key={game.id}
                style={{ borderTop: `4px solid ${game.colour}` }}
              >
                <span className="lab-muted">#{index + 1}</span>
                <h3>{game.name}</h3>
                <div className="lab-stat">
                  <span>{en ? "Similarity / 100" : "Similarité / 100"}</span>
                  <strong>{Math.round(game.score * 100)}</strong>
                </div>
                <p>{game.tags.map((tag) => gameTags[tag][lang]).join(" · ")}</p>
                <p className="lab-muted">
                  {en ? "Matches" : "Points communs"} :{" "}
                  {game.matches.map((tag) => gameTags[tag][lang]).join(", ")}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <p>
            {en
              ? "Choose a favourite game or an interest. If all matching games are already selected, widen your preferences or play mode."
              : "Choisis un jeu favori ou une envie. Si tous les jeux correspondants sont déjà sélectionnés, élargis tes préférences ou le mode de jeu."}
          </p>
        )}
      </div>
    </div>
  );
}
