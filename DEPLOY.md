# 🚀 Déploiement du dashboard apprentissage

## Prompt à donner à l'IA (copie-colle)

---

**Contexte :** J'ai un dashboard HTML statique (un graphe d'apprentissage 42 sous forme de carte stellaire). Tout est en HTML pur — pas de build, pas de backend, pas de DB. Le point d'entrée est `index.html` à la racine. Les liens internes sont relatifs vers `fiches/`, `exams/`, `ole/`, `skills/`.

**Structure du zip :**
```
/
├── index.html              ← dashboard (page d'accueil)
├── _template.html          ← squelette pour futures fiches
├── zine.css                ← styles partagés
├── README.md
├── fiches/                 ← fiches par projet
│   ├── push_swap/          ← gitbook + tutors + simulateurs
│   ├── so_long/
│   ├── minitalk/
│   └── skills/             ← exam, pointeurs, fondations C
├── exams/                  ← 19 fiches exam rank 02 + 2 récaps
├── ole/                    ← 6 fiches self-audit Claude
└── skills/                 ← 3 fiches agentic/skills
```

**Objectif :** L'héberger en ligne gratuitement, avec une URL publique propre, idéalement avec un déploiement automatique quand je push des changements.

**Contraintes :**
- Gratuit ou quasi (usage perso)
- URL courte et mémorisable (custom domain optionnel mais apprécié)
- HTTPS obligatoire
- Je veux pouvoir mettre à jour facilement (drag-drop ou git push)
- Pas besoin d'auth — c'est public

**Questions :**
1. Compare les options d'hébergement statique adaptées à mon cas : GitHub Pages, Cloudflare Pages, Netlify, Vercel. Donne-moi les avantages/inconvénients de chacun pour un usage perso.
2. Recommande-m'en UNE et explique pourquoi.
3. Donne-moi le guide étape par étape pour déployer, de zéro (création du compte) jusqu'à avoir l'URL qui marche.
4. Indique-moi aussi comment mettre à jour le site plus tard (workflow d'update).
5. Bonus : si je veux un custom domain (ex : `loopy.dev/apprentissage`), comment je le branche ?

**Vérifications à faire avant de déployer :**
- Tous les liens relatifs dans `index.html` pointent vers des fichiers qui existent bien
- Les fiches s'ouvrent bien via `target="_blank"`
- Aucun chemin absolu en `file://` ou en localhost
- Les polices Google Fonts et autres CDN se chargent correctement

---

## Ma reco rapide

**Cloudflare Pages** ou **Netlify** — drag-drop du zip, site en ligne en 60 secondes, URL gratuite en `*.pages.dev` ou `*.netlify.app`, HTTPS auto.

Si tu préfères git → **GitHub Pages**.
