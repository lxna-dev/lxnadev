# SEO Setup Design

**Date:** 2026-04-17
**Site:** https://www.lxna.dev (canonical; `lxna.dev` redirects to `www`)
**Approach:** Next.js 15 native metadata API — zero new dependencies

---

## 1. Metadata (`src/app/layout.tsx`)

Replace the existing bare `metadata` export with a full object.

```ts
export const metadata: Metadata = {
  metadataBase: new URL("https://www.lxna.dev"),
  title: {
    default: "LXNA",
    template: "%s | LXNA",
  },
  description:
    "Full Stack Developer & GoHighLevel Technical Specialist based in the Philippines.",
  openGraph: {
    type: "website",
    url: "https://www.lxna.dev",
    siteName: "LXNA",
    title: "LXNA",
    description:
      "Full Stack Developer & GoHighLevel Technical Specialist based in the Philippines.",
    images: [{ url: "/opengraph-image" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LXNA",
    description:
      "Full Stack Developer & GoHighLevel Technical Specialist based in the Philippines.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

---

## 2. Dynamic OG Image (`src/app/opengraph-image.tsx`)

Next.js auto-serves this at `/opengraph-image` as a 1200×630 PNG via `ImageResponse`.

**Visual design:**
- Background: `#100f10` (onyx)
- Top-left: `LXNA` heavy mono white + `.DEV` in `#cd1b25` (flag-red)
- Bottom: `Full Stack Developer · GoHighLevel Specialist` small-caps, `#656465` (dim-grey)
- Pure typography — no images or icons

```ts
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
```

---

## 3. Robots (`src/app/robots.ts`)

```ts
export default function robots() {
  return {
    rules: { allow: "/" },
    sitemap: "https://www.lxna.dev/sitemap.xml",
  };
}
```

Serves at `/robots.txt`.

---

## 4. Sitemap (`src/app/sitemap.ts`)

Single-entry sitemap for the homepage.

```ts
export default function sitemap() {
  return [
    {
      url: "https://www.lxna.dev",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
```

Serves at `/sitemap.xml`.

---

## 5. JSON-LD Structured Data (`src/app/layout.tsx`)

`Person` schema injected via a `<script type="application/ld+json">` tag in the root layout's `<body>`.

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Beljohn Luna",
  "url": "https://www.lxna.dev",
  "jobTitle": "Full Stack Developer",
  "email": "beljohnluna@gmail.com",
  "sameAs": [
    "https://github.com/lxna-dev",
    "https://www.linkedin.com/in/beljohn-luna/"
  ]
}
```

---

## Files Changed / Created

| File | Action |
|------|--------|
| `src/app/layout.tsx` | Update `metadata` export + add JSON-LD `<script>` |
| `src/app/opengraph-image.tsx` | Create — dynamic OG image |
| `src/app/robots.ts` | Create — robots.txt route handler |
| `src/app/sitemap.ts` | Create — sitemap.xml route handler |

---

## Out of Scope

- Per-page metadata (only one page exists)
- `next-seo` or any third-party SEO package
- Analytics / Google Search Console setup
