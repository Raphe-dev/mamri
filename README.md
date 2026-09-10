# Maison régionale de l’industrie

Site corporatif de la MRI, reconstruit en Nuxt 4 et Tailwind CSS v3. CMS : Sanity (`studio-mamri/`, projet `u5ov5dbs`).

## Développement

```bash
npm install
npm run dev
```

Ouvre `http://localhost:3000`. Sans `SANITY_PROJECT_ID`, le site lit `app/data/`.

```bash
npm run dev:studio
```

Ouvre `http://localhost:3333/` (racine, pas `/admin`).

Pour générer le site contre le CMS :

```bash
SANITY_PROJECT_ID=u5ov5dbs npm run build
```

Simuler le build Netlify (site + Studio à `/admin`) :

```bash
SANITY_PROJECT_ID=u5ov5dbs npm run build:netlify
```

## Production (Netlify)

`netlify.toml` construit le site puis le Studio dans `dist/admin/`. Publier `dist`.

Env **obligatoire** (UI Netlify, pas git) :

| Variable | Valeur |
|---|---|
| `SANITY_PROJECT_ID` | `u5ov5dbs` |

Ne pas définir `SANITY_STUDIO_BASEPATH` dans l’UI (déjà sur la commande de build). Ne pas définir `NUXT_PUBLIC_SANITY_*`. Ne jamais mettre `SANITY_WRITE_TOKEN` sur Netlify.

## Contenu

Éditable dans le Studio : paramètres (bandeau, contact, Zoho), activités, logos, portraits, équipe, et les pages (accueil, à-propos, devenir membre, services, projets).

Reste dans git : navigation, légal, tarifs douaniers, 301 WordPress, formulaires Netlify, inscriptions Zoho.

### Seed

`importKey` est uniquement pour l’import. Ne pas relancer `npm run seed` après que les éditeurs aient créé des documents.

Break-glass Studio hébergé : `npm run deploy` dans `studio-mamri` → `https://mamri.sanity.studio/`.
