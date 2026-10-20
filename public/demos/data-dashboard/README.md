# Dashboard Data Achats — démonstration statique

Adaptation autonome du projet de Khayem Ben Ghorbel : [data-dashboard](https://github.com/khayem487/data-dashboard).
La version d'origine utilise Flask, Pandas, NumPy et Chart.js ; cette vitrine utilise HTML, CSS et JavaScript avec graphiques SVG natifs. Aucun CDN, aucune API externe ni aucun serveur applicatif n'est nécessaire à l'exécution.

## Provenance vérifiée

- Version source : `9727ac26a6194d307c3710c915f14e1d5d008c20`.
- Fichier : `data/achats.csv`, 200 commandes synthétiques entre janvier 2023 et décembre 2024.
- Git blob CSV : `bcf9722b68e6d84cbab72f5a20755b7eeb4c12dd`.
- SHA-256 des octets CSV : `da41b9920413136218e4f0473e47ab08abb9bd56d015d92eccf8adfd2a38df7c`.
- Inspection de `generate_data.py` : données générées avec graine 42, fournisseurs fictifs A à J, cinq catégories et trois statuts. Aucune personne ni entreprise réelle n'est publiée dans la démo. Le nom d'entreprise illustratif du template d'origine n'est pas repris.
- Le CSV n'est pas recopié. Les données publiées sont 195 cellules agrégées par mois, catégorie, fournisseur fictif et statut, contenant uniquement un effectif et une somme en centimes. Certains groupes ne contiennent qu'une commande ; ces valeurs restent celles du jeu synthétique public.

## Transformation et fidélité

`build_data.py` télécharge uniquement le CSV à la version épinglée, vérifie son identité Git, le lit avec `csv` et `Decimal` (bibliothèque standard), puis écrit `data.json` et son équivalent `data.js`. Il n'importe ni n'exécute le code source du dépôt. Il s'exécute seulement pour reconstruire les actifs ; le navigateur n'en a pas besoin.

Les cinq réponses de référence de `app.py` sont reconstruites et enregistrées sous `baseline` :

1. `kpis` : seules les commandes Validé comptent dans le total des achats et le nombre de commandes ; le nombre de fournisseurs couvre tous les statuts et le taux de validation utilise tous les effectifs.
2. `par_mois` : sommes validées par mois, ordre chronologique.
3. `par_categorie` : sommes validées par catégorie, ordre décroissant.
4. `par_fournisseur` : les cinq fournisseurs avec les plus grandes sommes validées.
5. `cascade_budget` : budget initial de 500 000 €, retraits dans l'ordre des catégories de la source, puis solde.

Les filtres année, catégorie et recherche de fournisseur recalculent ces vues à partir des agrégats. Le budget reste fixé à 500 000 € même quand les filtres changent : il n'est pas proratisé. Le taux et le nombre de commandes sont pondérés par les effectifs, pas par le nombre de cellules agrégées. Les calculs monétaires s'effectuent en centimes entiers.

Référence sans filtre : **1 604 055,78 €** d'achats validés, **137** commandes validées / **200**, **10** fournisseurs, **68,5 %** de validation ; solde **−1 104 055,78 €**. Le dépassement du budget source est explicitement affiché, sans ajustement artificiel.

## Exécution / accessibilité

Ouvrir `index.html` directement ou servir ce dossier sur n'importe quel hébergement statique. Les liens de retour relatifs `../../` visent la racine du portfolio depuis `/demos/data-dashboard/` (y compris sous un préfixe de type `/portfolio/`). Le lien d'ancre suppose `#projects` ; à adapter si l'intégration utilise une autre ancre.

Les contrôles sont des éléments natifs avec libellés, focus visible et navigation clavier. Tous les graphiques ont une alternative sous forme de tableau dépliable ; les filtres annoncent le nombre de commandes sélectionnées. La recherche est insensible à la casse et aux accents. Aucun chargement externe au dossier n'est nécessaire ; les liens vers le code source restent facultatifs.
