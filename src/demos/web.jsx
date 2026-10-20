import { useEffect, useMemo, useState } from "react";

const copy = (lang, fr, en) => (lang === "en" ? en : fr);
const money = (value, lang) =>
  new Intl.NumberFormat(lang === "en" ? "en-IE" : "fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
const smallGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 210px), 1fr))",
  gap: 16,
};

function DownloadButton({ content, filename, children }) {
  return (
    <button
      className="lab-button"
      type="button"
      onClick={() => {
        const url = URL.createObjectURL(
          new Blob([content], { type: "text/csv;charset=utf-8" })
        );
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        link.click();
        setTimeout(() => URL.revokeObjectURL(url), 0);
      }}
    >
      {children}
    </button>
  );
}

const HOME_DEVICES = [
  {
    id: "living-light",
    room: "living",
    name: ["Lampadaire", "Floor lamp"],
    type: "light",
    on: true,
    watts: 12,
  },
  {
    id: "living-thermostat",
    room: "living",
    name: ["Thermostat", "Thermostat"],
    type: "heat",
    on: true,
    watts: 600,
  },
  {
    id: "living-tv",
    room: "living",
    name: ["Télévision", "Television"],
    type: "plug",
    on: false,
    watts: 80,
  },
  {
    id: "bed-light",
    room: "bedroom",
    name: ["Lampe de chevet", "Bedside lamp"],
    type: "light",
    on: false,
    watts: 8,
  },
  {
    id: "bed-shutter",
    room: "bedroom",
    name: ["Volet ouvert", "Open shutter"],
    type: "shutter",
    on: true,
    watts: 0,
  },
  {
    id: "kitchen-light",
    room: "kitchen",
    name: ["Éclairage", "Lighting"],
    type: "light",
    on: true,
    watts: 18,
  },
  {
    id: "kitchen-coffee",
    room: "kitchen",
    name: ["Cafetière", "Coffee machine"],
    type: "plug",
    on: false,
    watts: 900,
  },
  {
    id: "entry-lock",
    room: "entrance",
    name: ["Serrure verrouillée", "Locked door"],
    type: "lock",
    on: true,
    watts: 0,
  },
];
const HOME_ROOMS = [
  ["all", "Toute la maison", "Whole home"],
  ["living", "Salon", "Living room"],
  ["bedroom", "Chambre", "Bedroom"],
  ["kitchen", "Cuisine", "Kitchen"],
  ["entrance", "Entrée", "Entrance"],
];

export function SmartHomeDemo({ lang = "fr" }) {
  const en = lang === "en";
  const [devices, setDevices] = useState(() =>
    HOME_DEVICES.map((item) => ({ ...item }))
  );
  const [room, setRoom] = useState("all");
  const [temperature, setTemperature] = useState(20);
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");
  const record = (text) => {
    setHistory((items) =>
      [{ id: Date.now() + Math.random(), text }, ...items].slice(0, 8)
    );
    setMessage(text);
  };
  const applyScenario = (scenario) => {
    setDevices((items) =>
      items.map((device) => ({
        ...device,
        on:
          scenario === "away"
            ? device.type === "lock"
            : scenario === "morning"
            ? device.type === "shutter" ||
              device.type === "heat" ||
              device.id === "kitchen-coffee" ||
              device.id === "kitchen-light" ||
              device.type === "lock"
            : device.type === "lock" ||
              device.type === "heat" ||
              device.id === "living-light" ||
              device.id === "bed-light",
      }))
    );
    setTemperature(scenario === "away" ? 17 : scenario === "morning" ? 20 : 21);
    record(
      copy(
        lang,
        `Scénario ${
          scenario === "away"
            ? "Absence"
            : scenario === "morning"
            ? "Matin"
            : "Soirée"
        } appliqué.`,
        `${
          scenario === "away"
            ? "Away"
            : scenario === "morning"
            ? "Morning"
            : "Evening"
        } scene applied.`
      )
    );
  };
  const reset = () => {
    setDevices(HOME_DEVICES.map((item) => ({ ...item })));
    setTemperature(20);
    setRoom("all");
    setHistory([]);
    setMessage(
      copy(lang, "Maison de démonstration réinitialisée.", "Demo home reset.")
    );
  };
  return (
    <div className="lab-panel">
      <p className="lab-muted">
        {copy(
          lang,
          "Maison fictive · commandes locales au navigateur · aucun équipement connecté.",
          "Fictional home · browser-local controls · no connected hardware."
        )}
      </p>
      <div className="lab-grid" style={smallGrid}>
        <div className="lab-stat">
          <strong>
            {devices.filter((device) => device.on).length} / {devices.length}
          </strong>
          <span>{copy(lang, "équipements activés", "devices active")}</span>
        </div>
        <div className="lab-stat">
          <strong>
            {devices
              .filter((device) => device.on)
              .reduce((sum, device) => sum + device.watts, 0)}{" "}
            W
          </strong>
          <span>
            {copy(
              lang,
              "puissance théorique du scénario",
              "scenario's illustrative power"
            )}
          </span>
        </div>
        <div className="lab-stat">
          <strong>{temperature} °C</strong>
          <span>
            {copy(lang, "consigne de chauffage", "heating set point")}
          </span>
        </div>
      </div>
      <div className="lab-controls">
        <label>
          {copy(lang, "Pièce", "Room")}
          <select
            value={room}
            onChange={(event) => setRoom(event.target.value)}
          >
            {HOME_ROOMS.map(([id, fr, english]) => (
              <option key={id} value={id}>
                {en ? english : fr}
              </option>
            ))}
          </select>
        </label>
        <button
          className="lab-button"
          type="button"
          onClick={() => applyScenario("morning")}
        >
          {copy(lang, "Matin", "Morning")}
        </button>
        <button
          className="lab-button"
          type="button"
          onClick={() => applyScenario("evening")}
        >
          {copy(lang, "Soirée", "Evening")}
        </button>
        <button
          className="lab-button"
          type="button"
          onClick={() => applyScenario("away")}
        >
          {copy(lang, "Absence", "Away")}
        </button>
        <button className="lab-button" type="button" onClick={reset}>
          {copy(lang, "Réinitialiser", "Reset")}
        </button>
      </div>
      <div className="lab-grid" style={smallGrid}>
        {devices
          .filter((device) => room === "all" || room === device.room)
          .map((device) => (
            <article className="lab-card" key={device.id}>
              <p className="lab-muted">
                {HOME_ROOMS.find(([id]) => id === device.room)[en ? 2 : 1]}
              </p>
              <h3>{device.name[en ? 1 : 0]}</h3>
              <button
                type="button"
                className="lab-button"
                role="switch"
                aria-checked={device.on}
                aria-label={device.name[en ? 1 : 0]}
                onClick={() => {
                  setDevices((items) =>
                    items.map((item) =>
                      item.id === device.id ? { ...item, on: !item.on } : item
                    )
                  );
                  record(
                    `${device.name[en ? 1 : 0]} : ${copy(
                      lang,
                      device.on ? "désactivé" : "activé",
                      device.on ? "off" : "on"
                    )}.`
                  );
                }}
              >
                {device.on
                  ? copy(lang, "Activé", "On")
                  : copy(lang, "Désactivé", "Off")}{" "}
                <span aria-hidden="true">{device.on ? "●" : "○"}</span>
              </button>
              {device.type === "heat" && (
                <label style={{ display: "grid", gap: 8, marginTop: 14 }}>
                  {copy(lang, "Température", "Temperature")} · {temperature} °C
                  <input
                    type="range"
                    min="15"
                    max="25"
                    step="0.5"
                    value={temperature}
                    onChange={(event) =>
                      setTemperature(Number(event.target.value))
                    }
                  />
                </label>
              )}
            </article>
          ))}
      </div>
      <p role="status" className="lab-muted" style={{ minHeight: "1.5em" }}>
        {message}
      </p>
      <details className="lab-card">
        <summary>
          {copy(lang, "Historique des actions", "Action history")} (
          {history.length})
        </summary>
        {history.length ? (
          <>
            <ol>
              {history.map((item) => (
                <li key={item.id}>{item.text}</li>
              ))}
            </ol>
            <DownloadButton
              filename="smart-home-demo.csv"
              content={`action\n${[...history]
                .reverse()
                .map((item) => `"${item.text.replaceAll('"', '""')}"`)
                .join("\n")}`}
            >
              {copy(lang, "Exporter en CSV", "Export CSV")}
            </DownloadButton>
          </>
        ) : (
          <p className="lab-muted">
            {copy(
              lang,
              "Actionne un équipement ou lance un scénario.",
              "Toggle a device or apply a scene."
            )}
          </p>
        )}
      </details>
    </div>
  );
}

const CARS = [
  {
    id: "city",
    name: "Nova City",
    category: "compact",
    gear: "manual",
    seats: 4,
    price: 32,
    color: "#3766d6",
    range: "420 km",
  },
  {
    id: "tour",
    name: "Atlas Tour",
    category: "sedan",
    gear: "automatic",
    seats: 5,
    price: 54,
    color: "#158080",
    range: "640 km",
  },
  {
    id: "eon",
    name: "Eon Electric",
    category: "compact",
    gear: "automatic",
    seats: 5,
    price: 48,
    color: "#8755c8",
    range: "380 km",
  },
  {
    id: "family",
    name: "Terra Family",
    category: "suv",
    gear: "automatic",
    seats: 7,
    price: 76,
    color: "#b5752d",
    range: "580 km",
  },
];
function localDate(offset = 0) {
  const now = new Date();
  now.setDate(now.getDate() + offset);
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(now.getDate()).padStart(2, "0")}`;
}
const rentalDays = (start, end) =>
  Math.round(
    (Date.parse(`${end}T12:00:00Z`) - Date.parse(`${start}T12:00:00Z`)) /
      86400000
  );
function CarDrawing({ color }) {
  return (
    <svg viewBox="0 0 280 115" width="100%" height="115" aria-hidden="true">
      <path
        d="M36 75 49 54 86 46 110 23h75l32 28 22 8 10 27H32Z"
        fill={color}
      />
      <path d="m115 31-17 21h52V31Zm43 0v21h46l-24-21Z" fill="#e9f2ff" />
      <path d="M38 82h204" stroke="#16253e" strokeWidth="5" />
      <circle cx="79" cy="85" r="17" fill="#16253e" />
      <circle cx="79" cy="85" r="8" fill="#cbd5e1" />
      <circle cx="205" cy="85" r="17" fill="#16253e" />
      <circle cx="205" cy="85" r="8" fill="#cbd5e1" />
    </svg>
  );
}

export function CarRentalDemo({ lang = "fr" }) {
  const [category, setCategory] = useState("all");
  const [gear, setGear] = useState("all");
  const [selectedId, setSelectedId] = useState(CARS[0].id);
  const [start, setStart] = useState(() => localDate(1));
  const [end, setEnd] = useState(() => localDate(4));
  const [bookings, setBookings] = useState([]);
  const [notice, setNotice] = useState("");
  const car = CARS.find((item) => item.id === selectedId);
  const days = rentalDays(start, end);
  const datesValid = Boolean(
    start &&
      end &&
      Number.isFinite(days) &&
      days > 0 &&
      days <= 30 &&
      start >= localDate()
  );
  const overlaps = (id) =>
    bookings.some(
      (booking) =>
        booking.carId === id && start < booking.end && end > booking.start
    );
  const reserve = (event) => {
    event.preventDefault();
    if (!datesValid)
      return setNotice(
        copy(
          lang,
          "Choisis une période de 1 à 30 jours à partir d’aujourd’hui.",
          "Choose a rental of 1–30 days starting today or later."
        )
      );
    if (overlaps(car.id))
      return setNotice(
        copy(
          lang,
          "Ce véhicule est déjà réservé sur cette période. Change les dates ou le véhicule.",
          "This car is already booked for these dates. Choose another date range or car."
        )
      );
    const booking = {
      id: `DEMO-${String(Date.now()).slice(-7)}`,
      carId: car.id,
      start,
      end,
      days,
      total: days * car.price,
    };
    setBookings((items) => [booking, ...items]);
    setNotice(
      copy(
        lang,
        `Réservation fictive ${booking.id} enregistrée. Aucun paiement ni réservation réelle.`,
        `Fictional booking ${booking.id} saved. No payment or real reservation.`
      )
    );
  };
  const categoryLabel = (value) =>
    ({
      all: copy(lang, "Toutes", "All"),
      compact: copy(lang, "Citadine", "Compact"),
      sedan: copy(lang, "Berline", "Sedan"),
      suv: "SUV",
    }[value]);
  return (
    <div className="lab-panel">
      <p className="lab-muted">
        {copy(
          lang,
          "Catalogue fictif · parcours de réservation adapté au navigateur · données conservées dans cette session uniquement.",
          "Fictional catalogue · browser adaptation of the booking journey · session-only data."
        )}
      </p>
      <div className="lab-controls">
        <label>
          {copy(lang, "Catégorie", "Category")}
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {["all", "compact", "sedan", "suv"].map((value) => (
              <option key={value} value={value}>
                {categoryLabel(value)}
              </option>
            ))}
          </select>
        </label>
        <label>
          {copy(lang, "Boîte de vitesses", "Transmission")}
          <select
            value={gear}
            onChange={(event) => setGear(event.target.value)}
          >
            <option value="all">{copy(lang, "Toutes", "All")}</option>
            <option value="manual">{copy(lang, "Manuelle", "Manual")}</option>
            <option value="automatic">
              {copy(lang, "Automatique", "Automatic")}
            </option>
          </select>
        </label>
        <button
          className="lab-button"
          type="button"
          onClick={() => {
            setBookings([]);
            setCategory("all");
            setGear("all");
            setSelectedId(CARS[0].id);
            setStart(localDate(1));
            setEnd(localDate(4));
            setNotice(
              copy(lang, "Démonstration réinitialisée.", "Demo reset.")
            );
          }}
        >
          {copy(lang, "Réinitialiser la démo", "Reset demo")}
        </button>
      </div>
      <div className="lab-grid" style={smallGrid}>
        {CARS.filter(
          (item) =>
            (category === "all" || category === item.category) &&
            (gear === "all" || gear === item.gear)
        ).map((item) => (
          <article
            className="lab-card"
            key={item.id}
            style={{
              outline:
                selectedId === item.id
                  ? "2px solid var(--accent, #3158d9)"
                  : undefined,
            }}
          >
            <CarDrawing color={item.color} />
            <h3>{item.name}</h3>
            <p className="lab-muted">
              {categoryLabel(item.category)} · {item.seats}{" "}
              {copy(lang, "places", "seats")} ·{" "}
              {item.gear === "manual"
                ? copy(lang, "manuelle", "manual")
                : copy(lang, "automatique", "automatic")}
            </p>
            <p>
              <strong>{money(item.price, lang)}</strong> /{" "}
              {copy(lang, "jour", "day")}
            </p>
            <button
              className="lab-button"
              aria-pressed={selectedId === item.id}
              type="button"
              onClick={() => {
                setSelectedId(item.id);
                setNotice("");
              }}
            >
              {selectedId === item.id
                ? copy(lang, "Sélectionné", "Selected")
                : copy(lang, "Choisir", "Choose")}
            </button>
          </article>
        ))}
      </div>
      <form className="lab-card" onSubmit={reserve} style={{ marginTop: 20 }}>
        <h3>
          {copy(lang, "Votre réservation", "Your booking")} · {car.name}
        </h3>
        <div className="lab-controls">
          <label>
            {copy(lang, "Départ", "Pick-up")}
            <input
              type="date"
              min={localDate()}
              required
              value={start}
              onChange={(event) => {
                setStart(event.target.value);
                setNotice("");
              }}
            />
          </label>
          <label>
            {copy(lang, "Retour", "Return")}
            <input
              type="date"
              min={start || localDate()}
              required
              value={end}
              onChange={(event) => {
                setEnd(event.target.value);
                setNotice("");
              }}
            />
          </label>
          <p>
            <strong>
              {datesValid
                ? `${days} ${copy(lang, "jours", "days")} · ${money(
                    car.price * days,
                    lang
                  )}`
                : copy(lang, "Période à vérifier", "Check date range")}
            </strong>
          </p>
          <button className="lab-button" type="submit">
            {copy(
              lang,
              "Confirmer la réservation fictive",
              "Confirm fictional booking"
            )}
          </button>
        </div>
        {datesValid && overlaps(car.id) && (
          <p className="lab-muted">
            {copy(
              lang,
              "Indisponible sur les dates choisies.",
              "Unavailable for the selected dates."
            )}
          </p>
        )}
        <p role="status" className="lab-muted" style={{ minHeight: "1.5em" }}>
          {notice}
        </p>
      </form>
      <section className="lab-card" style={{ marginTop: 20 }}>
        <h3>
          {copy(lang, "Mes réservations fictives", "My fictional bookings")} (
          {bookings.length})
        </h3>
        {bookings.length === 0 ? (
          <p className="lab-muted">
            {copy(
              lang,
              "Choisis une voiture et une période pour essayer le parcours.",
              "Choose a car and date range to try the booking flow."
            )}
          </p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="lab-table">
              <thead>
                <tr>
                  <th>{copy(lang, "Référence", "Reference")}</th>
                  <th>{copy(lang, "Véhicule", "Car")}</th>
                  <th>{copy(lang, "Période", "Dates")}</th>
                  <th>Total</th>
                  <th>{copy(lang, "Action", "Action")}</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.id}</td>
                    <td>
                      {CARS.find((item) => item.id === booking.carId).name}
                    </td>
                    <td>
                      {booking.start} → {booking.end}
                    </td>
                    <td>{money(booking.total, lang)}</td>
                    <td>
                      <button
                        className="lab-button"
                        type="button"
                        aria-label={`${copy(lang, "Annuler", "Cancel")} ${
                          booking.id
                        }`}
                        onClick={() => {
                          setBookings((items) =>
                            items.filter((item) => item.id !== booking.id)
                          );
                          setNotice(
                            copy(
                              lang,
                              `Réservation ${booking.id} annulée.`,
                              `Booking ${booking.id} cancelled.`
                            )
                          );
                        }}
                      >
                        {copy(lang, "Annuler", "Cancel")}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

const HEALTH_WIDTH = 18;
const HEALTH_HEIGHT = 12;
const HEALTH_STATES = [
  { id: "S", color: "#94a3b8", fr: "Susceptibles", en: "Susceptible" },
  { id: "V", color: "#8b5cf6", fr: "Vaccinés", en: "Vaccinated" },
  { id: "E", color: "#e9a23b", fr: "Exposés", en: "Exposed" },
  { id: "I", color: "#e35164", fr: "Infectés", en: "Infected" },
  { id: "R", color: "#1c9c84", fr: "Rétablis", en: "Recovered" },
  { id: "D", color: "#334155", fr: "Décédés", en: "Deceased" },
];
function randomFrom(seed) {
  let current = seed >>> 0;
  return () => {
    current = (Math.imul(1664525, current) + 1013904223) >>> 0;
    return current / 4294967296;
  };
}
const healthCounts = (cells) =>
  cells.reduce(
    (counts, cell) => ({ ...counts, [cell.state]: counts[cell.state] + 1 }),
    { S: 0, V: 0, E: 0, I: 0, R: 0, D: 0 }
  );
function makePopulation(vaccination, initial, seed) {
  const random = randomFrom(seed);
  const cells = Array.from({ length: HEALTH_WIDTH * HEALTH_HEIGHT }, () => ({
    state: random() < vaccination / 100 ? "V" : "S",
    age: 0,
  }));
  const indices = cells
    .map((_, index) => index)
    .sort((left, right) => {
      // A stable integer hash makes initial infections reproducible without a random sort comparator.
      const hash = (value) =>
        Math.imul((value + seed) ^ 0x9e3779b9, 2654435761) >>> 0;
      return hash(left) - hash(right);
    });
  indices.slice(0, initial).forEach((index) => {
    cells[index] = { state: "I", age: index % 3 };
  });
  return { cells, tick: 0, seed, history: [healthCounts(cells)] };
}
function advancePopulation(previous, transmission) {
  const random = randomFrom(previous.seed + (previous.tick + 1) * 7919);
  const cells = previous.cells.map((cell, index) => {
    const age = cell.age + 1;
    if (cell.state === "E")
      return { state: age >= 3 ? "I" : "E", age: age >= 3 ? 0 : age };
    if (cell.state === "I")
      return age >= 8
        ? { state: random() < 0.025 ? "D" : "R", age: 0 }
        : { ...cell, age };
    if (cell.state !== "S" && cell.state !== "V") return cell;
    const x = index % HEALTH_WIDTH;
    const y = Math.floor(index / HEALTH_WIDTH);
    const neighbors = [
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
      [x, y + 1],
      [x - 1, y - 1],
      [x + 1, y + 1],
      [x - 1, y + 1],
      [x + 1, y - 1],
    ];
    const infectious = neighbors.filter(
      ([nx, ny]) =>
        nx >= 0 &&
        nx < HEALTH_WIDTH &&
        ny >= 0 &&
        ny < HEALTH_HEIGHT &&
        previous.cells[ny * HEALTH_WIDTH + nx].state === "I"
    ).length;
    const chance =
      1 -
      (1 - (transmission / 100) * (cell.state === "V" ? 0.2 : 1)) ** infectious;
    return random() < chance ? { state: "E", age: 0 } : cell;
  });
  return {
    ...previous,
    cells,
    tick: previous.tick + 1,
    history: [...previous.history, healthCounts(cells)].slice(-100),
  };
}

export function HealthRadarDemo({ lang = "fr" }) {
  const [transmission, setTransmission] = useState(28);
  const [vaccination, setVaccination] = useState(20);
  const [initial, setInitial] = useState(6);
  const [seed, setSeed] = useState(42);
  const [speed, setSpeed] = useState(550);
  const [running, setRunning] = useState(false);
  const [model, setModel] = useState(() => makePopulation(20, 6, 42));
  const counts = useMemo(() => healthCounts(model.cells), [model.cells]);
  const finished = counts.E + counts.I === 0;
  useEffect(() => {
    if (!running || finished) return undefined;
    const timer = setInterval(
      () => setModel((previous) => advancePopulation(previous, transmission)),
      speed
    );
    return () => clearInterval(timer);
  }, [running, finished, speed, transmission]);
  useEffect(() => {
    if (finished) setRunning(false);
  }, [finished]);
  const reset = () => {
    setRunning(false);
    setModel(makePopulation(vaccination, initial, seed));
  };
  const statusName = (state) =>
    HEALTH_STATES.find((item) => item.id === state)[
      lang === "en" ? "en" : "fr"
    ];
  return (
    <div className="lab-panel">
      <p className="lab-muted">
        {copy(
          lang,
          "Adaptation pédagogique SVEIRD dans le navigateur, sur une grille immobile et avec tirage reproductible. Le programme Java/JavaFX original n’est pas exécuté ici. Aucun usage prédictif ou médical.",
          "Educational browser SVEIRD adaptation: a static grid and reproducible random sequence. The original Java/JavaFX program is not executed here. Not a predictive or medical model."
        )}
      </p>
      <div className="lab-controls">
        <button
          className="lab-button"
          type="button"
          disabled={finished}
          onClick={() => setRunning((value) => !value)}
        >
          {running
            ? copy(lang, "Pause", "Pause")
            : copy(lang, "Démarrer", "Start")}
        </button>
        <button
          className="lab-button"
          type="button"
          disabled={running || finished}
          onClick={() =>
            setModel((previous) => advancePopulation(previous, transmission))
          }
        >
          {copy(lang, "Un pas", "One step")}
        </button>
        <button className="lab-button" type="button" onClick={reset}>
          {copy(lang, "Réinitialiser et appliquer", "Reset and apply")}
        </button>
        <label>
          {copy(lang, "Vitesse", "Speed")}
          <select
            value={speed}
            onChange={(event) => setSpeed(Number(event.target.value))}
          >
            <option value="1000">× 1</option>
            <option value="550">× 2</option>
            <option value="180">× 5</option>
          </select>
        </label>
        <strong role="status">
          {copy(lang, "Pas", "Step")} {model.tick}
          {finished
            ? copy(lang, " · plus de cas actifs", " · no active cases")
            : running
            ? copy(lang, " · en cours", " · running")
            : copy(lang, " · en pause", " · paused")}
        </strong>
      </div>
      <div
        className="lab-grid"
        style={{
          ...smallGrid,
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 130px), 1fr))",
        }}
      >
        {HEALTH_STATES.map((state) => (
          <div className="lab-stat" key={state.id}>
            <strong style={{ color: state.color }}>{counts[state.id]}</strong>
            <span>{state[lang === "en" ? "en" : "fr"]}</span>
          </div>
        ))}
      </div>
      <div className="lab-grid" style={{ ...smallGrid, marginTop: 20 }}>
        <section className="lab-card" style={{ gridColumn: "1 / -1" }}>
          <h3>
            {copy(lang, "Population · 216 cellules", "Population · 216 cells")}
          </h3>
          <p className="lab-muted">
            {copy(
              lang,
              "En pause, touche une cellule grise pour la vacciner, ou une violette pour annuler la vaccination.",
              "While paused, click a grey cell to vaccinate it, or a purple one to reverse vaccination."
            )}
          </p>
          <div
            role="group"
            aria-label={copy(
              lang,
              "Grille de la population",
              "Population grid"
            )}
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${HEALTH_WIDTH}, minmax(0, 1fr))`,
              gap: 3,
              maxWidth: 720,
              marginInline: "auto",
            }}
          >
            {model.cells.map((cell, index) => (
              <button
                key={index}
                type="button"
                disabled={running || !["S", "V"].includes(cell.state)}
                aria-label={`${copy(lang, "Cellule", "Cell")} ${
                  index + 1
                } : ${statusName(cell.state)}`}
                title={`${index + 1} · ${statusName(cell.state)}`}
                style={{
                  aspectRatio: "1",
                  padding: 0,
                  minHeight: 0,
                  border: 0,
                  borderRadius: 3,
                  background: HEALTH_STATES.find(
                    (item) => item.id === cell.state
                  ).color,
                  opacity: 1,
                  cursor:
                    !running && ["S", "V"].includes(cell.state)
                      ? "pointer"
                      : "default",
                }}
                onClick={() =>
                  setModel((previous) => {
                    const cells = previous.cells.map((item, idx) =>
                      idx === index
                        ? { state: item.state === "S" ? "V" : "S", age: 0 }
                        : item
                    );
                    return {
                      ...previous,
                      cells,
                      history: [
                        ...previous.history.slice(0, -1),
                        healthCounts(cells),
                      ],
                    };
                  })
                }
              />
            ))}
          </div>
        </section>
        <section className="lab-card">
          <h3>{copy(lang, "Paramètres du scénario", "Scenario settings")}</h3>
          <div
            className="lab-controls"
            style={{ flexDirection: "column", alignItems: "stretch" }}
          >
            <label>
              {copy(
                lang,
                "Transmission par voisin / pas",
                "Transmission per neighbour / step"
              )}{" "}
              · {transmission}%
              <input
                type="range"
                min="1"
                max="70"
                value={transmission}
                onChange={(event) =>
                  setTransmission(Number(event.target.value))
                }
              />
            </label>
            <label>
              {copy(lang, "Vaccination initiale", "Initial vaccination")} ·{" "}
              {vaccination}%
              <input
                type="range"
                min="0"
                max="85"
                step="5"
                value={vaccination}
                onChange={(event) => setVaccination(Number(event.target.value))}
              />
            </label>
            <label>
              {copy(lang, "Infectés au départ", "Initially infected")} ·{" "}
              {initial}
              <input
                type="range"
                min="1"
                max="25"
                value={initial}
                onChange={(event) => setInitial(Number(event.target.value))}
              />
            </label>
            <label>
              {copy(lang, "Graine reproductible", "Reproducible seed")}
              <input
                type="number"
                min="1"
                max="99999"
                value={seed}
                onChange={(event) =>
                  setSeed(
                    Math.min(
                      99999,
                      Math.max(1, Number(event.target.value) || 1)
                    )
                  )
                }
              />
            </label>
          </div>
          <p className="lab-muted">
            {copy(
              lang,
              "La transmission change immédiatement. Vaccination, cas initiaux et graine s’appliquent à la réinitialisation. Les règles fixes sont simplifiées : exposition 3 pas, infection 8 pas, protection vaccinale partielle.",
              "Transmission changes immediately. Initial vaccination, cases and seed apply on reset. Fixed rules are simplified: 3-step exposure, 8-step infection, partial vaccine protection."
            )}
          </p>
        </section>
        <section className="lab-card">
          <h3>
            {copy(lang, "Évolution des cas actifs", "Active cases over time")}
          </h3>
          <svg
            className="lab-chart"
            viewBox="0 0 480 220"
            role="img"
            aria-label={copy(
              lang,
              "Courbe des cellules exposées et infectées sur les 100 derniers pas.",
              "Exposed and infected cells over the last 100 steps."
            )}
            style={{ width: "100%", minHeight: 180 }}
          >
            {[0, 54, 108, 162, 216].map((value) => (
              <g key={value}>
                <line
                  x1="38"
                  y1={190 - (value / 216) * 160}
                  x2="466"
                  y2={190 - (value / 216) * 160}
                  stroke="currentColor"
                  opacity="0.12"
                />
                <text
                  x="30"
                  y={194 - (value / 216) * 160}
                  fontSize="11"
                  fill="currentColor"
                  textAnchor="end"
                >
                  {value}
                </text>
              </g>
            ))}
            {["E", "I"].map((state) => (
              <polyline
                key={state}
                fill="none"
                stroke={HEALTH_STATES.find((item) => item.id === state).color}
                strokeWidth="3"
                points={model.history
                  .map(
                    (sample, index) =>
                      `${
                        38 +
                        (index / Math.max(1, model.history.length - 1)) * 428
                      },${190 - (sample[state] / 216) * 160}`
                  )
                  .join(" ")}
              />
            ))}
            <text x="38" y="212" fontSize="11" fill="currentColor">
              {Math.max(0, model.tick - 99)}
            </text>
            <text
              x="466"
              y="212"
              fontSize="11"
              fill="currentColor"
              textAnchor="end"
            >
              {model.tick} {copy(lang, "pas", "steps")}
            </text>
          </svg>
          <p className="lab-muted">
            <span style={{ color: "#e9a23b" }}>● {statusName("E")}</span> ·{" "}
            <span style={{ color: "#e35164" }}>● {statusName("I")}</span>
          </p>
          <DownloadButton
            filename="healthradar-browser-demo.csv"
            content={`step,S,V,E,I,R,D\n${model.history
              .map(
                (sample, index) =>
                  `${Math.max(0, model.tick - 99) + index},${HEALTH_STATES.map(
                    (state) => sample[state.id]
                  ).join(",")}`
              )
              .join("\n")}`}
          >
            {copy(lang, "Exporter la courbe", "Export chart data")}
          </DownloadButton>
        </section>
      </div>
    </div>
  );
}

const GAME_LEVELS = [
  ["#######", "#P..C.#", "#.#.#.#", "#..K..#", "#.#E#.#", "#H...X#", "#######"],
  ["#######", "#P#..X#", "#.#.#.#", "#C.E#.#", "###...#", "#H..K.#", "#######"],
  ["#######", "#P..E.#", "#.#.#K#", "#C#...#", "#.#E#.#", "#H...X#", "#######"],
];
function makeLevel(level = 0, score = 0, hp = 5) {
  const map = GAME_LEVELS[level].map((row) => [...row]);
  let player = { x: 1, y: 1, hp, score, hasKey: false };
  map.forEach((row, y) =>
    row.forEach((tile, x) => {
      if (tile === "P") {
        player = { ...player, x, y };
        map[y][x] = ".";
      }
    })
  );
  return { level, map, player, turns: 0, message: "ready", won: false };
}
function moveGame(previous, dx, dy) {
  if (previous.won || previous.player.hp <= 0) return previous;
  const { player } = previous;
  const x = player.x + dx;
  const y = player.y + dy;
  const tile = previous.map[y]?.[x];
  if (!tile || tile === "#") return { ...previous, message: "wall" };
  if (tile === "X" && !player.hasKey) return { ...previous, message: "locked" };
  const next = {
    ...previous,
    turns: previous.turns + 1,
    map: previous.map.map((row) => [...row]),
    player: { ...player, x, y },
    message: "move",
  };
  if (tile === "C") {
    next.player.score += 10;
    next.message = "coin";
  }
  if (tile === "K") {
    next.player.hasKey = true;
    next.message = "key";
  }
  if (tile === "H") {
    next.player.hp = Math.min(5, player.hp + 2);
    next.message = "heal";
  }
  if (tile === "E") {
    next.player.hp -= 2;
    next.player.score += 5;
    next.message = next.player.hp <= 0 ? "lost" : "enemy";
  }
  if (tile === "X") {
    if (previous.level < GAME_LEVELS.length - 1)
      return {
        ...makeLevel(
          previous.level + 1,
          next.player.score + 20,
          next.player.hp
        ),
        turns: next.turns,
        message: "next",
      };
    return {
      ...next,
      won: true,
      message: "won",
      player: { ...next.player, score: next.player.score + 20 },
    };
  }
  next.map[y][x] = ".";
  return next;
}

export function OopGameDemo({ lang = "fr" }) {
  const [game, setGame] = useState(() => makeLevel());
  const move = (dx, dy) => setGame((previous) => moveGame(previous, dx, dy));
  const messages = {
    ready: [
      "Trouve la clé puis rejoins la sortie. Les murs bloquent le passage.",
      "Find the key and reach the exit. Walls block your path.",
    ],
    wall: ["Un mur bloque le passage.", "A wall blocks the way."],
    locked: [
      "La sortie est verrouillée : il faut la clé.",
      "The exit is locked: find the key first.",
    ],
    move: ["À toi de jouer.", "Your move."],
    coin: ["Pièce trouvée : +10 points.", "Coin collected: +10 points."],
    key: [
      "Clé récupérée : sortie déverrouillée.",
      "Key collected: exit unlocked.",
    ],
    heal: [
      "Potion : +2 points de vie, maximum 5.",
      "Potion: +2 health, capped at 5.",
    ],
    enemy: [
      "Obstacle franchi : −2 vies, +5 points.",
      "Obstacle cleared: −2 health, +5 points.",
    ],
    lost: [
      "Partie terminée. Recommence pour essayer un autre chemin.",
      "Game over. Restart and try another route.",
    ],
    next: [
      "Niveau suivant ! La vie et le score sont conservés.",
      "Next level! Health and score carry over.",
    ],
    won: ["Les trois niveaux sont terminés !", "All three levels completed!"],
  };
  const tiles = {
    "#": ["■", "Mur", "Wall"],
    ".": ["", "Sol", "Floor"],
    C: ["◆", "Pièce", "Coin"],
    K: ["⚿", "Clé", "Key"],
    H: ["+", "Potion", "Potion"],
    E: ["!", "Obstacle", "Obstacle"],
    X: ["↗", "Sortie", "Exit"],
  };
  return (
    <div className="lab-panel">
      <p className="lab-muted">
        {copy(
          lang,
          "Mini-jeu original pour le navigateur, inspiré des classes Player et Level du dépôt Java. Il illustre le modèle objet et la progression ; ce n’est pas une exécution ou un port fidèle du programme Java.",
          "An original browser mini-game inspired by the Java repository’s Player and Level classes. It demonstrates objects and progression; it does not execute or faithfully port the Java program."
        )}
      </p>
      <div className="lab-grid" style={smallGrid}>
        <div className="lab-stat">
          <strong>
            {game.level + 1} / {GAME_LEVELS.length}
          </strong>
          <span>{copy(lang, "niveau", "level")}</span>
        </div>
        <div className="lab-stat">
          <strong>{game.player.hp} / 5</strong>
          <span>{copy(lang, "points de vie", "health")}</span>
        </div>
        <div className="lab-stat">
          <strong>{game.player.score}</strong>
          <span>{copy(lang, "score", "score")}</span>
        </div>
        <div className="lab-stat">
          <strong>{game.turns}</strong>
          <span>{copy(lang, "tours joués", "turns played")}</span>
        </div>
      </div>
      <div className="lab-grid" style={{ ...smallGrid, marginTop: 20 }}>
        <section className="lab-card">
          <div
            tabIndex="0"
            role="group"
            aria-label={copy(
              lang,
              "Plateau de jeu. Utilise les flèches, ZQSD ou WASD.",
              "Game board. Use arrow keys or WASD."
            )}
            onKeyDown={(event) => {
              const key = event.key.toLowerCase();
              const directions = {
                arrowup: [0, -1],
                w: [0, -1],
                z: [0, -1],
                arrowdown: [0, 1],
                s: [0, 1],
                arrowleft: [-1, 0],
                a: [-1, 0],
                q: [-1, 0],
                arrowright: [1, 0],
                d: [1, 0],
              };
              if (directions[key]) {
                event.preventDefault();
                move(...directions[key]);
              }
            }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
              gap: 4,
              maxWidth: 385,
              marginInline: "auto",
              padding: 4,
              borderRadius: 10,
            }}
          >
            {game.map.flatMap((row, y) =>
              row.map((tile, x) => {
                const isPlayer = game.player.x === x && game.player.y === y;
                return (
                  <div
                    key={`${x}-${y}`}
                    aria-label={
                      isPlayer
                        ? copy(lang, "Joueur", "Player")
                        : tiles[tile][lang === "en" ? 2 : 1]
                    }
                    style={{
                      aspectRatio: "1",
                      display: "grid",
                      placeItems: "center",
                      borderRadius: 6,
                      fontSize: "clamp(18px, 4vw, 27px)",
                      fontWeight: 800,
                      background: isPlayer
                        ? "#3158d9"
                        : tile === "#"
                        ? "#334155"
                        : "var(--surface-alt, #e7edf5)",
                      color: isPlayer
                        ? "white"
                        : tile === "#"
                        ? "#64748b"
                        : tile === "E"
                        ? "#c74459"
                        : tile === "C" || tile === "K"
                        ? "#a46a00"
                        : tile === "H"
                        ? "#16816c"
                        : "#334155",
                    }}
                  >
                    {isPlayer ? "●" : tiles[tile][0]}
                  </div>
                );
              })
            )}
          </div>
          <p className="lab-muted">
            {copy(
              lang,
              "Clique le plateau puis utilise les flèches ou ZQSD. Les boutons fonctionnent aussi sur mobile.",
              "Focus the board, then use arrows or WASD. Buttons also work on mobile."
            )}
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 48px)",
              gap: 6,
              justifyContent: "center",
              marginBlock: 14,
            }}
          >
            <span />
            <button
              className="lab-button"
              type="button"
              disabled={game.won || game.player.hp <= 0}
              aria-label={copy(lang, "Monter", "Move up")}
              onClick={() => move(0, -1)}
            >
              ↑
            </button>
            <span />
            <button
              className="lab-button"
              type="button"
              disabled={game.won || game.player.hp <= 0}
              aria-label={copy(lang, "Aller à gauche", "Move left")}
              onClick={() => move(-1, 0)}
            >
              ←
            </button>
            <button
              className="lab-button"
              type="button"
              disabled={game.won || game.player.hp <= 0}
              aria-label={copy(lang, "Descendre", "Move down")}
              onClick={() => move(0, 1)}
            >
              ↓
            </button>
            <button
              className="lab-button"
              type="button"
              disabled={game.won || game.player.hp <= 0}
              aria-label={copy(lang, "Aller à droite", "Move right")}
              onClick={() => move(1, 0)}
            >
              →
            </button>
          </div>
          <p role="status">{messages[game.message][lang === "en" ? 1 : 0]}</p>
          <button
            className="lab-button"
            type="button"
            onClick={() => setGame(makeLevel())}
          >
            {copy(lang, "Recommencer", "Restart")}
          </button>
        </section>
        <section className="lab-card">
          <h3>{copy(lang, "Règles et objets", "Rules and objects")}</h3>
          <p>
            ◆ {copy(lang, "Pièce : +10 points", "Coin: +10 points")}
            <br />⚿{" "}
            {copy(lang, "Clé : ouvre la sortie", "Key: unlocks the exit")}
            <br />+ {copy(lang, "Potion : +2 vies", "Potion: +2 health")}
            <br />! {copy(lang, "Obstacle : −2 vies", "Obstacle: −2 health")}
            <br />↗ {copy(lang, "Sortie : niveau suivant", "Exit: next level")}
          </p>
          <h3>{copy(lang, "État de l’objet Player", "Player object state")}</h3>
          <pre
            style={{ whiteSpace: "pre-wrap", fontSize: 13, lineHeight: 1.7 }}
          >
            {JSON.stringify(game.player, null, 2)}
          </pre>
          <p className="lab-muted">
            {copy(
              lang,
              "Chaque déplacement transforme l’état du joueur et du niveau. La carte et ses règles appartiennent à cette adaptation.",
              "Each move updates the player and level state. The map and rules belong to this browser adaptation."
            )}
          </p>
        </section>
      </div>
    </div>
  );
}
