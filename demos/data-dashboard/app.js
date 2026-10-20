/* The original API semantics, computed from aggregate counts and integer cents. */
(() => {
  "use strict";
  const source = window.ACHATS_DATA;
  const eur = new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2});
  const integer = new Intl.NumberFormat("fr-FR");
  const decimal = new Intl.NumberFormat("fr-FR", {maximumFractionDigits: 1});
  const monthName = (value) => new Intl.DateTimeFormat("fr-FR", {month: "short", year: "numeric", timeZone: "UTC"}).format(new Date(`${value}-01T12:00:00Z`));
  const normalize = (text) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("fr-FR").trim();
  const money = (cents) => eur.format(cents / 100);
  const escape = (text) => String(text).replace(/[&<>"']/g, (char) => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"}[char]));
  const sum = (cells, key) => cells.reduce((total, cell) => total + cell[key], 0);

  function filterCells(filters = {}) {
    return source.cells.filter((cell) => (!filters.year || cell.month.startsWith(filters.year)) && (!filters.category || cell.category === filters.category) && (!filters.supplier || normalize(cell.supplier).includes(normalize(filters.supplier))));
  }

  function calculate(cells) {
    const valid = cells.filter((cell) => cell.status === "Validé");
    const totalRows = sum(cells, "count");
    const validatedRows = sum(valid, "count");
    const total = sum(valid, "cents");
    const group = (key) => {
      const values = new Map();
      for (const cell of valid) values.set(cell[key], (values.get(cell[key]) || 0) + cell.cents);
      return Array.from(values, ([label, cents]) => ({label, cents}));
    };
    const byAmount = (a, b) => b.cents - a.cents || a.label.localeCompare(b.label, "fr");
    const category = group("category").sort(byAmount);
    const categoryAmounts = new Map(category.map((row) => [row.label, row.cents]));
    const cascade = [{label: "Budget initial", cents: source.budget_cents, type: "total"}, ...source.categories.map((label) => ({label, cents: -(categoryAmounts.get(label) || 0), type: "negative"})), {label: "Solde restant", cents: source.budget_cents-total, type: "total"}];
    return {totalRows, total, validatedRows, supplierCount: new Set(cells.map((cell) => cell.supplier)).size, rate: totalRows ? Math.round(validatedRows / totalRows * 1000) / 10 : 0, monthly: group("month").sort((a, b) => a.label.localeCompare(b.label)), category, suppliers: group("supplier").sort(byAmount).slice(0, 5), cascade};
  }

  // Exposed for deterministic checks, without running a server or the original Python.
  window.ACHATS_APP = {filterCells, calculate};
  if (typeof document === "undefined") return;
  const byId = (id) => document.getElementById(id);
  const rowHtml = (columns) => `<tr>${columns.map((value, index) => index === 0 ? `<th scope="row">${escape(value)}</th>` : `<td>${escape(value)}</td>`).join("")}</tr>`;
  const emptyTable = (colspan) => `<tr><td colspan="${colspan}">Aucun achat validé dans cette sélection.</td></tr>`;
  const compactMoney = (cents) => `${decimal.format(cents / 100000)} k€`;

  function drawMonthly(model, cells) {
    const months = [...new Set(cells.map((cell) => cell.month))].sort();
    if (!months.length || !model.monthly.length) {
      byId("monthly-chart").innerHTML = '<p class="empty-chart">Aucun achat validé pour cette sélection.</p>';
      return;
    }
    const totals = new Map(model.monthly.map((row) => [row.label, row.cents]));
    const values = months.map((label) => ({label, cents: totals.get(label) || 0}));
    const width = 560, height = 250, left = 55, right = 15, top = 15, bottom = 43;
    const max = Math.ceil(Math.max(...values.map((row) => row.cents)) / 5000000) * 5000000 || 5000000;
    const x = (i) => values.length === 1 ? (width + left-right) / 2 : left + i / (values.length-1) * (width-left-right);
    const y = (cents) => height-bottom - cents/max * (height-top-bottom);
    const grid = Array.from({length: 5}, (_, i) => {const value=max*i/4;return `<line x1="${left}" y1="${y(value)}" x2="${width-right}" y2="${y(value)}" stroke="#e8ebe7"/><text x="${left-10}" y="${y(value)+4}" text-anchor="end" font-size="10" fill="#66767b">${escape(compactMoney(value))}</text>`;}).join("");
    const points = values.map((row, i) => `${x(i)},${y(row.cents)}`).join(" ");
    const area = `${x(0)},${height-bottom} ${points} ${x(values.length-1)},${height-bottom}`;
    const step = Math.max(1, Math.ceil(values.length / 6));
    const labels = values.map((row, i) => i%step === 0 || i === values.length-1 ? `<text x="${x(i)}" y="${height-15}" text-anchor="${i === 0 ? "start" : i === values.length-1 ? "end" : "middle"}" font-size="10" fill="#66767b">${escape(monthName(row.label))}</text>` : "").join("");
    const dots = values.map((row, i) => `<circle cx="${x(i)}" cy="${y(row.cents)}" r="3.5" fill="#2848de" stroke="#fff" stroke-width="1.5"><title>${escape(monthName(row.label))} : ${escape(money(row.cents))}</title></circle>`).join("");
    byId("monthly-chart").innerHTML = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Évolution mensuelle des achats validés. Valeurs exactes dans le tableau ci-dessous."><defs><linearGradient id="monthly-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2848de" stop-opacity=".16"/><stop offset="100%" stop-color="#2848de" stop-opacity=".01"/></linearGradient></defs>${grid}<polygon points="${area}" fill="url(#monthly-fill)"/><polyline points="${points}" fill="none" stroke="#2848de" stroke-width="2.5" stroke-linejoin="round"/>${dots}${labels}</svg>`;
  }

  function drawBars(id, rows, total, category) {
    if (!rows.length) {byId(id).innerHTML = '<p class="empty-chart">Aucun achat validé pour cette sélection.</p>'; return;}
    const max = category ? total : Math.max(...rows.map((row) => row.cents));
    byId(id).innerHTML = rows.map((row, i) => `<div class="bar-row"><div class="bar-label"><span>${category ? "" : `<span aria-hidden="true" style="color:#8b989b;margin-right:10px">0${i+1}</span>`}${escape(row.label)}</span><strong>${escape(money(row.cents))}${category ? ` <span style="color:#6a787d;font-weight:400">· ${decimal.format(row.cents/total*100)} %</span>` : ""}</strong></div><div class="bar-track" aria-hidden="true"><div class="bar-fill" style="width:${max ? row.cents/max*100 : 0}%"></div></div></div>`).join("");
  }

  function drawBudget(model) {
    const rows = model.cascade;
    let current = 0;
    const bars = rows.map((row, index) => {
      if (row.type === "total") {current = row.cents; return {...row, from: 0, to: row.cents};}
      const from = current; current += row.cents; return {...row, from, to: current};
    });
    const width=560, height=225, left=54, right=10, top=17, bottom=53;
    const max=Math.max(source.budget_cents,...bars.flatMap((row)=>[row.from,row.to]));
    const min=Math.min(0,...bars.flatMap((row)=>[row.from,row.to]));
    const margin=(max-min)*.04;
    const y=(value)=>top+(max+margin-value)/(max-min+margin*2)*(height-top-bottom);
    const step=(width-left-right)/rows.length;
    const shortLabels=["Budget","Matières","Composants","Outillage","Logistique","Services","Solde"];
    const barMarkup=bars.map((row,i)=>{const x=left+step*i+step*.17; const y1=y(row.from),y2=y(row.to);return `<rect x="${x}" y="${Math.min(y1,y2)}" width="${step*.66}" height="${Math.max(1,Math.abs(y1-y2))}" rx="2" fill="${row.type === "negative" || row.cents<0 ? "#b95b3b" : "#2848de"}"><title>${escape(row.label)} : ${escape(money(row.cents))}</title></rect>${i<rows.length-1 ? `<line x1="${x+step*.66}" x2="${x+step}" y1="${y(row.to)}" y2="${y(row.to)}" stroke="#abb6b6" stroke-dasharray="3 3"/>` : ""}<text x="${x+step*.33}" y="${height-27}" font-size="9" fill="#66767b" text-anchor="middle">${shortLabels[i]}</text>`;}).join("");
    const ticks = [...new Set([min,0,max])].map((value)=>`<text x="${left-8}" y="${y(value)+3}" text-anchor="end" font-size="9" fill="#66767b">${escape(compactMoney(value))}</text>`).join("");
    byId("budget-chart").innerHTML=`<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Cascade du budget de simulation : budget initial de 500 000 euros, achats par catégorie et solde. Valeurs exactes dans le tableau ci-dessous."><line x1="${left}" x2="${width-right}" y1="${y(0)}" y2="${y(0)}" stroke="#bac4c3"/>${ticks}${barMarkup}</svg>`;
    const remaining=source.budget_cents-model.total;
    byId("budget-note").innerHTML=remaining<0 ? `Le budget fixe de simulation est dépassé de <strong>${escape(money(-remaining))}</strong> sur la sélection.` : `Solde disponible sur le budget fixe de simulation : <strong style="color:#244b58">${escape(money(remaining))}</strong>.`;
  }

  function render() {
    const filters={year:byId("year").value, category:byId("category").value, supplier:byId("supplier").value};
    const cells=filterCells(filters), model=calculate(cells);
    byId("kpi-total").textContent=money(model.total);
    byId("kpi-count").textContent=integer.format(model.validatedRows);
    byId("kpi-count-note").textContent=`Sur ${integer.format(model.totalRows)} commandes au total`;
    byId("kpi-suppliers").textContent=integer.format(model.supplierCount);
    byId("kpi-rate").textContent=`${decimal.format(model.rate)} %`;
    const selected=[filters.year || "2023–2024",filters.category,filters.supplier.trim() ? `Fournisseur contenant « ${filters.supplier.trim()} »` : ""].filter(Boolean);
    byId("filter-summary").textContent=`${integer.format(model.totalRows)} commandes dans la sélection · ${selected.join(" · ")}`;
    drawMonthly(model,cells);
    drawBars("category-chart",model.category,model.total,true);
    drawBars("supplier-chart",model.suppliers,model.total,false);
    drawBudget(model);
    byId("monthly-table").innerHTML=model.monthly.map((row)=>rowHtml([monthName(row.label),money(row.cents)])).join("") || emptyTable(2);
    byId("category-table").innerHTML=model.category.map((row)=>rowHtml([row.label,money(row.cents),`${decimal.format(row.cents/model.total*100)} %`])).join("") || emptyTable(3);
    byId("supplier-table").innerHTML=model.suppliers.map((row)=>rowHtml([row.label,money(row.cents)])).join("") || emptyTable(2);
    byId("budget-table").innerHTML=model.cascade.map((row)=>rowHtml([row.label,money(row.cents)])).join("");
  }

  for (const category of source.categories) {const option=document.createElement("option");option.value=category;option.textContent=category;byId("category").append(option);}
  for (const supplier of [...new Set(source.cells.map((cell)=>cell.supplier))].sort()) {const option=document.createElement("option");option.value=supplier;byId("supplier-list").append(option);}
  byId("filters").addEventListener("input",render);
  byId("filters").addEventListener("submit",(event)=>event.preventDefault());
  byId("filters").addEventListener("reset",()=>setTimeout(render,0));
  render();
})();
