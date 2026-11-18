# Ajouter une nouvelle au site

1. Crée un fichier dans le dossier `nouvelles/` (ex. `2026-11-18-mon-titre.json`) en copiant le modèle.
2. Dépose les images dans un dossier `images/` et indique le chemin dans `image`.
3. Fais un commit : la liste `nouvelles/index.json` se met à jour toute seule (GitHub Actions) et la nouvelle apparaît sur le site.

## Champs
- `titre`, `date` (AAAA-MM-JJ), `categorie`, `resume`, `image`
- `lien` : adresse de l’article. `mon-article` donne `…/#actualite/mon-article` (lettres minuscules, chiffres et tirets, unique)
- `contenu` : le texte complet. Chaque élément de la liste est un paragraphe. Une ligne qui commence par `## ` devient un intertitre.

Les filtres (Tout, Circonscription…) sont créés automatiquement à partir des valeurs de `categorie`.

## Mettre le site en ligne (GitHub Pages)
1. Dépose tout le contenu de ce dossier à la racine d’un dépôt GitHub.
2. Dans le dépôt : Settings → Pages → Source : « Deploy from a branch » → branche `main`, dossier `/ (root)`.
3. Le site est publié à l’adresse indiquée par GitHub.

Dans `nouvelles/`, mets une image dans `images/` et écris son chemin dans `image` (ex. `images/photo.jpg`). Laisse `""` s’il n’y a pas d’image.
Le dossier `.github` est caché : il faut l’inclure quand tu téléverses les fichiers.
