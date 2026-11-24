# Ajouter une nouvelle au site

1. Dans le dépôt GitHub, ouvre le dossier `nouvelles/` → Add file → Create new file.
2. Nomme-le avec la date et un titre court, ex. `2026-11-20-mon-titre.json`, et colle le modèle (voir `nouvelles/2026-11-12-exemple-nouvelle.json`).
3. Clique sur Commit changes. Après 1 à 2 minutes (le temps que GitHub Pages republie), la nouvelle apparaît sur le site.

Aucune automatisation n’est nécessaire : le site lit lui-même la liste des fichiers du dossier `nouvelles/`.

## Champs
- `titre`, `date` (AAAA-MM-JJ), `categorie`, `resume`, `image`
- `lien` : adresse de l’article, unique (minuscules, chiffres, tirets). `mon-article` donne `…/#actualite/mon-article`
- `contenu` : texte complet. Chaque élément de la liste est un paragraphe. Une ligne qui commence par `## ` devient un intertitre.

Images : téléverse-les dans `images/` et écris le chemin dans `image` (ex. `images/photo.jpg`), ou laisse `""`.

## Mettre le site en ligne (GitHub Pages)
Settings → Pages → Deploy from a branch → `main` / `(root)` → Save.

## Version anglaise (bouton FR / EN)
Le bouton FR / EN est en haut à droite (à côté du menu sur mobile). Le choix de la personne est mémorisé dans son navigateur; le site s’ouvre en français par défaut.

- **Textes de la page** : les traductions sont dans `script.js`, dans la liste `EN` (français à gauche, anglais à droite). Pour changer une phrase anglaise, modifie la partie de droite. Si tu modifies un texte français dans `index.html`, modifie aussi la clé de gauche pour qu’elle soit identique.
- **Nouvelles** : ajoute dans le fichier JSON les champs facultatifs `titre_en`, `resume_en`, `categorie_en` et `contenu_en` (même forme que `contenu`). S’ils manquent, la nouvelle s’affiche en français aussi en mode anglais.


## Page de liens (`/liens`)
Page « Suivez-moi » dans le style Linktree, dans le dossier `liens/` : elle s’ouvre à `…/liens/`. Le titre « Suivez-moi » du pied de page y mène. Elle est référencée par Google, mais n’apparaît pas dans le menu du site. Pour changer un lien ou le texte, modifie `liens/index.html`; la photo de profil est `liens/avatar.jpg` et le fond `liens/fond.jpg`.
