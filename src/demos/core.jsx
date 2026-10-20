import { useMemo, useState } from "react";

const text = (lang, fr, en) => (lang === "en" ? en : fr);

const handPoses = {
  A: {
    fingers: [0, 0, 0, 0],
    points: [
      [50, 91],
      [34, 74],
      [27, 59],
      [26, 45],
      [28, 34],
      [41, 64],
      [40, 49],
      [42, 45],
      [45, 53],
      [52, 62],
      [51, 47],
      [54, 43],
      [58, 51],
      [63, 64],
      [63, 50],
      [66, 47],
      [70, 55],
      [73, 69],
      [73, 57],
      [77, 56],
      [80, 64],
    ],
  },
  B: {
    fingers: [1, 1, 1, 1],
    points: [
      [50, 91],
      [36, 74],
      [32, 60],
      [43, 61],
      [56, 64],
      [41, 58],
      [39, 38],
      [38, 21],
      [38, 8],
      [53, 56],
      [52, 32],
      [52, 15],
      [52, 2],
      [65, 58],
      [66, 35],
      [67, 20],
      [68, 9],
      [76, 65],
      [79, 46],
      [81, 33],
      [82, 23],
    ],
  },
  L: {
    fingers: [1, 0, 0, 0],
    points: [
      [50, 91],
      [34, 76],
      [22, 66],
      [12, 60],
      [3, 57],
      [40, 58],
      [36, 37],
      [34, 19],
      [33, 3],
      [53, 58],
      [54, 47],
      [58, 44],
      [61, 54],
      [65, 62],
      [68, 50],
      [73, 51],
      [73, 61],
      [77, 69],
      [82, 60],
      [87, 62],
      [86, 72],
    ],
  },
  Y: {
    fingers: [0, 0, 0, 1],
    points: [
      [50, 91],
      [34, 76],
      [22, 66],
      [12, 60],
      [3, 57],
      [41, 60],
      [40, 47],
      [44, 44],
      [48, 54],
      [54, 58],
      [55, 44],
      [59, 42],
      [63, 53],
      [66, 61],
      [69, 49],
      [73, 50],
      [74, 61],
      [78, 68],
      [83, 48],
      [88, 30],
      [92, 13],
    ],
  },
};
const connections = [
  [0, 1, 2, 3, 4],
  [0, 5, 6, 7, 8],
  [5, 9, 10, 11, 12],
  [9, 13, 14, 15, 16],
  [13, 17, 18, 19, 20],
  [0, 17],
];

export function AslDemo({ lang = "fr" }) {
  const [pose, setPose] = useState("B");
  const [normalise, setNormalise] = useState(false);
  const current = handPoses[pose];
  const values = current.points.flatMap(([x, y]) => [
    Number((x / 100).toFixed(2)),
    Number((y / 100).toFixed(2)),
  ]);
  const minimum = [
    Math.min(...current.points.map((p) => p[0])) / 100,
    Math.min(...current.points.map((p) => p[1])) / 100,
  ];
  const features = values.map((v, i) =>
    Number((v - (normalise ? minimum[i % 2] : 0)).toFixed(2))
  );
  return (
    <div className="lab-panel">
      <p className="lab-muted">
        {text(
          lang,
          "Explorateur de repères synthétiques. La classification Random Forest et la webcam restent disponibles dans l’application Python liée en haut.",
          "Synthetic landmark explorer. The Random Forest classifier and webcam are available in the Python application linked above."
        )}
      </p>
      <div className="lab-grid">
        <section className="lab-card">
          <div className="lab-controls">
            {Object.keys(handPoses).map((letter) => (
              <button
                key={letter}
                className="lab-button"
                aria-pressed={pose === letter}
                onClick={() => setPose(letter)}
              >
                {letter}
              </button>
            ))}
          </div>
          <svg
            className="hand-canvas"
            viewBox="-8 -6 116 110"
            role="img"
            aria-label={text(
              lang,
              `Schéma de repères pour le geste ${pose}`,
              `Landmark diagram for gesture ${pose}`
            )}
          >
            <defs>
              <pattern
                id="hand-grid"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M10 0H0V10"
                  fill="none"
                  stroke="currentColor"
                  opacity=".1"
                  strokeWidth=".25"
                />
              </pattern>
            </defs>
            <rect
              x="-8"
              y="-6"
              width="116"
              height="110"
              fill="url(#hand-grid)"
            />
            {connections.map((chain, i) => (
              <polyline
                key={i}
                points={chain
                  .map((index) => current.points[index].join(","))
                  .join(" ")}
                fill="none"
                stroke="var(--blue)"
                strokeWidth="1.2"
              />
            ))}
            {current.points.map(([x, y], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r="1.8" fill="var(--teal)" />
                <text x={x + 2} y={y - 2} fontSize="3" fill="currentColor">
                  {i}
                </text>
              </g>
            ))}
          </svg>
          <p>
            {text(lang, "Geste sélectionné", "Selected gesture")} :{" "}
            <strong>{pose}</strong> ·{" "}
            {text(
              lang,
              "21 repères · 42 coordonnées",
              "21 landmarks · 42 coordinates"
            )}
          </p>
        </section>
        <section className="lab-card">
          <h2>
            {text(
              lang,
              "De l’image aux caractéristiques",
              "From image to features"
            )}
          </h2>
          <p>
            {text(
              lang,
              "Le projet extrait les repères de la main avec MediaPipe, puis présente leurs coordonnées à un classifieur. Ce schéma permet d’explorer cette représentation sans caméra.",
              "The project extracts hand landmarks with MediaPipe, then feeds their coordinates into a classifier. This diagram lets you explore that representation without a camera."
            )}
          </p>
          <label className="lab-checkbox">
            <input
              type="checkbox"
              checked={normalise}
              onChange={(e) => setNormalise(e.target.checked)}
            />
            {text(
              lang,
              "Soustraire les coordonnées minimales (comme dans le pipeline)",
              "Subtract minimum coordinates (as in the pipeline)"
            )}
          </label>
          <pre className="lab-code">{JSON.stringify(features, null, 1)}</pre>
          <p className="lab-muted">
            {text(
              lang,
              "Les lettres sont des exemples choisis, pas des prédictions d’un modèle.",
              "The letters are selected examples, not model predictions."
            )}
          </p>
        </section>
      </div>
    </div>
  );
}

const demoPeople = [
  { id: "DEMO-01", name: "Alex", role: "Développement", colour: "#7c9aff" },
  { id: "DEMO-02", name: "Sam", role: "Design", colour: "#7bc8b4" },
  { id: "DEMO-03", name: "Lou", role: "Data", colour: "#d8ab79" },
];
export function AttendanceDemo({ lang = "fr" }) {
  const [selected, setSelected] = useState(demoPeople[0].id);
  const [marks, setMarks] = useState([]);
  const [message, setMessage] = useState("");
  const person = demoPeople.find((p) => p.id === selected);
  function mark() {
    if (marks.some((m) => m.id === selected)) {
      setMessage(
        text(
          lang,
          "Présence déjà enregistrée pour ce profil.",
          "Attendance already recorded for this profile."
        )
      );
      return;
    }
    setMarks((previous) => [
      {
        ...person,
        time: new Date().toLocaleTimeString(lang === "en" ? "en-GB" : "fr-FR"),
      },
      ...previous,
    ]);
    setMessage(
      text(
        lang,
        `Présence de ${person.name} enregistrée dans cette session.`,
        `${person.name} checked in for this session.`
      )
    );
  }
  function download() {
    const data =
      "id,profil,heure\n" +
      marks.map((m) => [m.id, m.name, m.time].join(",")).join("\n");
    const url = URL.createObjectURL(
      new Blob([data], { type: "text/csv;charset=utf-8" })
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "pointage-fictif.csv";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <div className="lab-panel">
      <p className="lab-muted">
        {text(
          lang,
          "Parcours de pointage avec profils fictifs, conservé uniquement dans cette session. La reconnaissance par caméra appartient à la version Python liée en haut.",
          "Attendance workflow using fictional profiles, kept only in this session. Camera recognition belongs to the Python version linked above."
        )}
      </p>
      <div className="lab-grid">
        <section className="lab-card">
          <h2>
            {text(lang, "Choisir un profil de test", "Choose a test profile")}
          </h2>
          <div className="people-grid">
            {demoPeople.map((p) => (
              <button
                className="lab-person"
                key={p.id}
                aria-pressed={selected === p.id}
                onClick={() => {
                  setSelected(p.id);
                  setMessage("");
                }}
              >
                <svg viewBox="0 0 100 100" aria-hidden="true">
                  <rect
                    width="100"
                    height="100"
                    rx="20"
                    fill={p.colour}
                    opacity=".2"
                  />
                  <circle cx="50" cy="37" r="17" fill={p.colour} />
                  <path d="M17 91c0-38 66-38 66 0" fill={p.colour} />
                </svg>
                <strong>{p.name}</strong>
                <span>{p.id}</span>
              </button>
            ))}
          </div>
          <div className="lab-controls">
            <button className="lab-button primary" onClick={mark}>
              {text(lang, "Enregistrer la présence", "Check in")}
            </button>
            <button
              className="lab-button"
              onClick={() => {
                setMarks([]);
                setMessage("");
              }}
            >
              {text(lang, "Réinitialiser", "Reset")}
            </button>
          </div>
          <p role="status">{message}</p>
        </section>
        <section className="lab-card">
          <h2>
            {text(lang, "Journal de présence", "Attendance log")}{" "}
            <span className="lab-tag">{marks.length}/3</span>
          </h2>
          <div className="lab-table">
            <table>
              <thead>
                <tr>
                  <th>{text(lang, "Profil", "Profile")}</th>
                  <th>ID</th>
                  <th>{text(lang, "Heure", "Time")}</th>
                </tr>
              </thead>
              <tbody>
                {marks.map((m) => (
                  <tr key={m.id}>
                    <td>{m.name}</td>
                    <td>{m.id}</td>
                    <td>{m.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {!marks.length && (
            <p className="lab-muted">
              {text(
                lang,
                "Le premier pointage apparaîtra ici.",
                "Your first check-in will appear here."
              )}
            </p>
          )}
          <button
            className="lab-button"
            disabled={!marks.length}
            onClick={download}
          >
            {text(lang, "Exporter le CSV", "Export CSV")}
          </button>
        </section>
      </div>
    </div>
  );
}

const universities = [
  { id: "U1", name: "Université Atlas", capacity: 2 },
  { id: "U2", name: "Université Horizon", capacity: 1 },
  { id: "U3", name: "Université Nova", capacity: 1 },
];
const studentIds = ["Alex", "Sam", "Lou", "Noa", "Charlie"];
const basePreferences = {
  Alex: ["U1", "U2", "U3"],
  Sam: ["U2", "U1", "U3"],
  Lou: ["U1", "U3", "U2"],
  Noa: ["U3", "U1", "U2"],
  Charlie: ["U1", "U2", "U3"],
};
const priorities = {
  U1: ["Sam", "Alex", "Lou", "Noa", "Charlie"],
  U2: ["Lou", "Charlie", "Sam", "Alex", "Noa"],
  U3: ["Noa", "Lou", "Charlie", "Sam", "Alex"],
};
function deferredAcceptance(preferences, capacities) {
  const accepted = Object.fromEntries(universities.map((u) => [u.id, []]));
  const next = Object.fromEntries(studentIds.map((id) => [id, 0]));
  const queue = [...studentIds];
  const history = [];
  while (queue.length) {
    const student = queue.shift();
    const uni = preferences[student][next[student]++];
    if (!uni) {
      history.push({ student, uni: null, result: "unmatched" });
      continue;
    }
    const candidates = [...accepted[uni], student].sort(
      (a, b) => priorities[uni].indexOf(a) - priorities[uni].indexOf(b)
    );
    accepted[uni] = candidates.slice(0, capacities[uni]);
    const rejected = candidates.slice(capacities[uni]);
    queue.push(...rejected);
    history.push({
      student,
      uni,
      result: accepted[uni].includes(student) ? "held" : "rejected",
      rejected,
    });
  }
  return { accepted, history };
}
export function ExchangeDemo({ lang = "fr" }) {
  const [preferences, setPreferences] = useState(basePreferences);
  const [capacities, setCapacities] = useState({ U1: 2, U2: 1, U3: 1 });
  const [step, setStep] = useState(0);
  const result = useMemo(
    () => deferredAcceptance(preferences, capacities),
    [preferences, capacities]
  );
  function reorder(student, index) {
    setPreferences((prev) => {
      const order = [...prev[student]];
      [order[index - 1], order[index]] = [order[index], order[index - 1]];
      return { ...prev, [student]: order };
    });
    setStep(0);
  }
  return (
    <div className="lab-panel">
      <p className="lab-muted">
        {text(
          lang,
          "Adaptation originale du principe de Gale–Shapley, avec cinq étudiants et trois universités fictifs. Le projet collectif d’origine est attribué au dépôt basstreche9.",
          "An original adaptation of Gale–Shapley using five fictional students and three fictional universities. The original team project is credited to the basstreche9 repository."
        )}
      </p>
      <div className="lab-grid">
        <section className="lab-card">
          <h2>
            {text(lang, "Préférences des étudiants", "Student preferences")}
          </h2>
          {studentIds.map((student) => (
            <div className="preference-row" key={student}>
              <strong>{student}</strong>
              <ol>
                {preferences[student].map((id, index) => (
                  <li key={id}>
                    {universities.find((u) => u.id === id).name}
                    {index > 0 && (
                      <button
                        className="lab-button"
                        aria-label={`${text(
                          lang,
                          "Monter",
                          "Move up"
                        )} ${id} · ${student}`}
                        onClick={() => reorder(student, index)}
                      >
                        ↑
                      </button>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </section>
        <section className="lab-card">
          <h2>
            {text(lang, "Capacités & affectations", "Capacities & allocations")}
          </h2>
          {universities.map((uni) => (
            <div className="allocation-row" key={uni.id}>
              <label>
                {uni.name}
                <select
                  value={capacities[uni.id]}
                  onChange={(e) => {
                    setCapacities((previous) => ({
                      ...previous,
                      [uni.id]: Number(e.target.value),
                    }));
                    setStep(0);
                  }}
                >
                  {[0, 1, 2, 3].map((n) => (
                    <option key={n} value={n}>
                      {n} {text(lang, "places", "places")}
                    </option>
                  ))}
                </select>
              </label>
              <p>{result.accepted[uni.id].join(", ") || "—"}</p>
              <small>
                {text(lang, "Priorité", "Priority")} :{" "}
                {priorities[uni.id].join(" → ")}
              </small>
            </div>
          ))}
          <p className="lab-muted">
            {text(
              lang,
              "Les candidats non affectés ont épuisé leurs vœux. Les priorités universitaires sont fixes et visibles.",
              "Unmatched applicants have exhausted their preferences. University priorities are fixed and visible."
            )}
          </p>
        </section>
      </div>
      <section className="lab-card">
        <div className="lab-controls">
          <h2>
            {text(lang, "Observer l’algorithme", "Observe the algorithm")}
          </h2>
          <button
            className="lab-button"
            disabled={step >= result.history.length}
            onClick={() => setStep((n) => n + 1)}
          >
            {text(lang, "Étape suivante", "Next step")}
          </button>
          <button
            className="lab-button"
            onClick={() => setStep(result.history.length)}
          >
            {text(lang, "Tout dérouler", "Run all steps")}
          </button>
          <button className="lab-button" onClick={() => setStep(0)}>
            {text(lang, "Recommencer", "Restart")}
          </button>
        </div>
        <ol className="event-log" aria-live="polite">
          {result.history.slice(0, step).map((event, index) => (
            <li key={index}>
              {event.student} →{" "}
              {event.uni
                ? universities.find((u) => u.id === event.uni).name
                : text(lang, "aucun vœu restant", "no preferences left")}{" "}
              ·{" "}
              {event.result === "held"
                ? text(lang, "retenu provisoirement", "provisionally held")
                : text(lang, "non retenu", "not held")}
              {event.rejected?.length
                ? ` (${text(
                    lang,
                    "reprend ses vœux",
                    "resumes preferences"
                  )} : ${event.rejected.join(", ")})`
                : ""}
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
