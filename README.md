# DevLeonardis Portfolio

Portfolio personale single-page con Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, three.js (React Three Fiber) e componenti shadcn/ui.

## Esperienze interattive

| Cosa | Dove |
| --- | --- |
| Orb 3D nell'hero (shader GLSL a curve di livello, reagisce a mouse, scroll e hover sulle CTA) | `src/components/three/Orb.tsx` |
| Sequenza 3D guidata dallo scroll: cubi che passano da caos a `</>` a globo | `src/components/BuildSequence.tsx`, `src/components/three/VoxelScene.tsx` |
| Gioco 3D "Pausa deploy" (Stack), record salvato in `localStorage` | `src/components/Playground.tsx`, `src/components/three/stackGame.ts` |
| Caccia ai 5 bug nascosti nelle sezioni + toast | `src/components/BugHunt.tsx` |
| Command palette `⌘K` / `Ctrl+K` | `src/components/CommandPalette.tsx` |
| Smooth scroll (Lenis, disattivato con reduced motion) | `src/components/SmoothScroll.tsx` |
| Snake easter egg: digita `nardi` o usa la palette | `src/components/EasterEggSnake.tsx` |
| Agentation (feedback visuale per agenti AI), solo in `npm run dev` | `src/components/DevTools.tsx` |

Palette e font sono definiti in `src/app/globals.css` (token `ink`, `surface`, `limestone`, `steel`, `phosphor`, `sodium`) e `src/app/layout.tsx` (Martian Mono + IBM Plex Sans). I testi IT/EN sono in `src/data/copy.ts`.

## Setup

```bash
npm install
npm run dev
```

## Hosting: Cloudflare Workers

Il sito è un export statico di Next.js (`output: "export"`, cartella `out/`) servito da Cloudflare Workers Static Assets.
Il Worker in `worker/index.ts` gestisce `/api/contact` e reindirizza `www.devleonardis.com` sul dominio principale (308).
La configurazione è in `wrangler.jsonc`.

Deploy automatico: il repo GitHub è collegato al Worker tramite Cloudflare Workers Builds.
Ogni push su `main` esegue `npm run build` e `npx wrangler deploy`; i log sono nella tab Deployments del Worker.

```bash
npm run preview   # build + wrangler dev su http://localhost:8787 (form contatti incluso)
npm run deploy    # deploy manuale da locale (build + wrangler deploy)
```

Con `npm run dev` il form contatti non ha backend: per provarlo usa `npm run preview`.

## SEO (metadata, sitemap, robots)

- Metadata principale: `/src/app/layout.tsx`
- Structured data JSON-LD: `/src/app/page.tsx`
- Sitemap automatica: `/src/app/sitemap.ts`
- Robots: `/src/app/robots.ts`

## Dove cambiare i progetti

Modifica il file:

`/src/data/projects.ts`

Ogni progetto usa questo tipo:

- `id`
- `title`
- `description`
- `tags[]`
- `liveUrl`
- `previewUrl`
- `year`
- `featured`

## Come aggiungere nuove demo

1. Aggiungi un oggetto in `/src/data/projects.ts`.
2. Imposta `liveUrl` per il link esterno.
3. Imposta `previewUrl` per l'iframe del dialog.

Nota: alcuni siti bloccano l'embed iframe via `X-Frame-Options` o `Content-Security-Policy`. In quel caso il dialog mostra fallback con bottone `Open in new tab`.

## Configurazione email contatto

Il form in `/src/components/Contact.tsx` chiama `POST /api/contact`, gestito dal Worker:

- endpoint: `/worker/index.ts` (SMTP via `worker-mailer`, porte 587 o 465; la 25 è bloccata su Workers)
- invia 2 email:
  - notifica a `info@devleonardis.com`
  - conferma al mittente con messaggio di successo
- mittente usato: `mailfrom@devleonardis.com` (configurabile)

### Variabili ambiente

`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `CONTACT_FROM_EMAIL` e `CONTACT_TO_EMAIL` sono in `wrangler.jsonc` (`vars`).
La password SMTP (password per le app di Google) va salvata come secret del Worker:

```bash
npx wrangler secret put SMTP_PASS
```

In locale (`npm run preview`) mettile in un file `.dev.vars` (già in `.gitignore`).

## WhatsApp CTA

- Configurazione numero e messaggio: `/src/lib/site.ts`
- Pulsanti WhatsApp:
  - Hero: `/src/components/Hero.tsx`
  - Navbar: `/src/components/Navbar.tsx`
  - Contact: `/src/components/Contact.tsx`
  - Floating sticky button: `/src/components/WhatsAppCTA.tsx`

## Go-Live Checklist

1. Configura il secret `SMTP_PASS` del Worker e controlla i `vars` in `wrangler.jsonc`.
2. Testa il form contatti da sito:
   - arrivo mail su `info@devleonardis.com`
   - arrivo mail di conferma al mittente
3. Verifica dominio e DNS:
   - `devleonardis.com` e `www.devleonardis.com` sono Custom Domains del Worker (Cloudflare crea i record DNS)
   - `www` viene reindirizzato dal Worker sul dominio principale
4. Controlla SEO base in produzione:
   - `/robots.txt`
   - `/sitemap.xml`
   - meta title/description e OpenGraph
5. Verifica UX finale:
   - mobile (hero senza foto)
   - preview dialog progetti
   - pulsanti WhatsApp e link social
