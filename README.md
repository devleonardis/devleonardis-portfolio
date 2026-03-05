# DevLeonardis Portfolio

Portfolio personale single-page con Next.js App Router, TypeScript, Tailwind CSS, Framer Motion e componenti shadcn/ui.

## Setup

```bash
npm install
npm run dev
```

Build produzione:

```bash
npm run build
npm run start
```

Deploy: pronto per Vercel (`next build` standard).

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

La tab `Featured` mostra solo gli elementi con `featured: true`.

## Come aggiungere nuove demo

1. Aggiungi un oggetto in `/src/data/projects.ts`.
2. Imposta `liveUrl` per il link esterno.
3. Imposta `previewUrl` per l'iframe del dialog.
4. Se vuoi evidenziarlo in alto, usa `featured: true`.

Nota: alcuni siti bloccano l'embed iframe via `X-Frame-Options` o `Content-Security-Policy`. In quel caso il dialog mostra fallback con bottone `Open in new tab`.

## Configurazione email contatto

Il form in `/src/components/Contact.tsx` usa API route server-side:

- endpoint: `/src/app/api/contact/route.ts`
- invia 2 email:
  - notifica a `info@devleonardis.com`
  - conferma al mittente con messaggio di successo
- mittente usato: `mailfrom@devleonardis.com` (configurabile)

### Variabili ambiente richieste

```bash
SMTP_HOST=smtp.tuodominio.com
SMTP_PORT=587
SMTP_USER=mailfrom@devleonardis.com
SMTP_PASS=la_tua_password_smtp
CONTACT_FROM_EMAIL=mailfrom@devleonardis.com
CONTACT_TO_EMAIL=info@devleonardis.com
```

Se `CONTACT_FROM_EMAIL` e `CONTACT_TO_EMAIL` non sono impostate, vengono usati i default in `/src/lib/site.ts`.

## WhatsApp CTA

- Configurazione numero e messaggio: `/src/lib/site.ts`
- Pulsanti WhatsApp:
  - Hero: `/src/components/Hero.tsx`
  - Navbar: `/src/components/Navbar.tsx`
  - Contact: `/src/components/Contact.tsx`
  - Floating sticky button: `/src/components/WhatsAppCTA.tsx`

## Go-Live Checklist

1. Configura tutte le env in locale e su Vercel:
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
   - `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`
2. Testa il form contatti da sito:
   - arrivo mail su `info@devleonardis.com`
   - arrivo mail di conferma al mittente
3. Verifica dominio e DNS:
   - collega `devleonardis.com` al progetto Vercel
   - abilita HTTPS e redirect `www` -> root (o viceversa)
4. Controlla SEO base in produzione:
   - `/robots.txt`
   - `/sitemap.xml`
   - meta title/description e OpenGraph
5. Verifica UX finale:
   - mobile (hero senza foto)
   - preview dialog progetti
   - pulsanti WhatsApp e link social
