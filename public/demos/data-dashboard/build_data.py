"""Rebuild the demonstrator's aggregate data. Standard library only; never runs source code."""
import csv
import hashlib
import io
import json
from collections import defaultdict
from decimal import Decimal
from pathlib import Path
from urllib.request import urlopen

ROOT = Path(__file__).resolve().parent
COMMIT = "9727ac26a6194d307c3710c915f14e1d5d008c20"
CSV_BLOB = "bcf9722b68e6d84cbab72f5a20755b7eeb4c12dd"
CATEGORIES = ["Matières premières", "Composants", "Outillage", "Logistique", "Services"]


def build():
    url = f"https://raw.githubusercontent.com/khayem487/data-dashboard/{COMMIT}/data/achats.csv"
    with urlopen(url, timeout=30) as response:
        raw = response.read()
    assert hashlib.sha1(b"blob " + str(len(raw)).encode() + b"\0" + raw).hexdigest() == CSV_BLOB
    rows = list(csv.DictReader(io.StringIO(raw.decode("utf-8-sig"))))
    assert len(rows) == 200
    # The inspected generator deliberately uses ten fictitious supplier labels.
    assert {r["fournisseur"] for r in rows} == {f"Fournisseur {chr(65+i)}" for i in range(10)}
    assert {r["categorie"] for r in rows} == set(CATEGORIES)
    assert {r["statut"] for r in rows} == {"Validé", "En cours", "Annulé"}
    cube = defaultdict(lambda: [0, 0])
    for row in rows:
        key = (row["date"], row["categorie"], row["fournisseur"], row["statut"])
        cents = int(Decimal(row["montant"]) * 100)
        cube[key][0] += 1
        cube[key][1] += cents
    cells = [dict(zip(["month", "category", "supplier", "status", "count", "cents"], [*key, *value])) for key, value in sorted(cube.items())]
    valid = [r for r in rows if r["statut"] == "Validé"]

    def totals(column):
        result = defaultdict(int)
        for row in valid:
            result[row[column]] += int(Decimal(row["montant"]) * 100)
        return result

    months = totals("date")
    cats = totals("categorie")
    suppliers = totals("fournisseur")
    total_cents = sum(int(Decimal(r["montant"]) * 100) for r in valid)
    baseline = {
        "kpis": {"total_achats": total_cents / 100, "nb_commandes": len(valid), "nb_fournisseurs": len({r["fournisseur"] for r in rows}), "taux_validation": round(len(valid) / len(rows) * 100, 1)},
        "par_mois": [{"mois": k, "total": v / 100} for k, v in sorted(months.items())],
        "par_categorie": [{"categorie": k, "total": v / 100} for k, v in sorted(cats.items(), key=lambda kv: (-kv[1], kv[0]))],
        "par_fournisseur": [{"fournisseur": k, "total": v / 100} for k, v in sorted(suppliers.items(), key=lambda kv: (-kv[1], kv[0]))[:5]],
        "cascade_budget": [{"label": "Budget initial", "value": 500000, "type": "total"}] + [{"label": cat, "value": -cats.get(cat, 0) / 100, "type": "negative"} for cat in CATEGORIES] + [{"label": "Solde restant", "value": (50000000-total_cents)/100, "type": "total"}]
    }
    assert sum(c["count"] for c in cells) == len(rows)
    assert sum(c["cents"] for c in cells if c["status"] == "Validé") == total_cents
    assert sum(round(r["total"] * 100) for r in baseline["par_mois"]) == total_cents
    assert sum(round(r["total"] * 100) for r in baseline["par_categorie"]) == total_cents
    data = {
        "provenance": {"repository": "https://github.com/khayem487/data-dashboard", "commit": COMMIT, "csv_git_blob": CSV_BLOB, "csv_sha256": hashlib.sha256(raw).hexdigest(), "source_rows": len(rows), "aggregate_cells": len(cells), "synthetic": True},
        "budget_cents": 50000000,
        "categories": CATEGORIES,
        "cells": cells,
        "baseline": baseline
    }
    serialized = json.dumps(data, ensure_ascii=False, indent=2) + "\n"
    (ROOT / "data.json").write_text(serialized, encoding="utf-8")
    # A plain script makes the showcase work from a file as well as any static host.
    (ROOT / "data.js").write_text("window.ACHATS_DATA = " + serialized.rstrip() + ";\n", encoding="utf-8")
    print(json.dumps({"provenance": data["provenance"], "kpis": baseline["kpis"], "remaining": baseline["cascade_budget"][-1]["value"]}, ensure_ascii=False))


if __name__ == "__main__":
    build()
