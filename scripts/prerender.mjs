// Post-build step: makes the SPA readable by crawlers and LLMs that do not run JavaScript.
// Reads dist/index.html (built by Vite) and writes:
//   dist/index.html, approach.html, packages.html, platforms.html, book.html
//     -> same app shell, plus per-page <title>/meta/JSON-LD and real content inside #root
//        (React replaces it on load, so visitors still get the normal app)
//   dist/llms.txt, dist/llms-full.txt, dist/sitemap.xml
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SITE, pages } from "./site-content.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const templatePath = path.join(dist, "index.html");

if (!fs.existsSync(templatePath)) {
  console.error("prerender: dist/index.html not found. Run `vite build` first.");
  process.exit(1);
}

const template = fs.readFileSync(templatePath, "utf8");
if (!template.includes('<div id="root"></div>')) {
  console.error('prerender: expected <div id="root"></div> in dist/index.html');
  process.exit(1);
}

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const abs = (p) => `${SITE.url}${p === "/" ? "/" : p}`;
const jsonLd = (obj) => JSON.stringify(obj).replace(/</g, "\\u003c");

// ---------- structured data ----------
const organization = {
  "@type": ["ProfessionalService", "Organization"],
  "@id": `${SITE.url}/#organization`,
  name: SITE.name,
  url: SITE.url,
  description: SITE.summary,
  email: SITE.email,
  telephone: SITE.phone,
  areaServed: "Worldwide",
  serviceType: [
    "AI strategy consulting",
    "Business process automation",
    "Workflow audits",
    "AI pilot development",
    "Custom front-end and back-end systems",
    "AI deployment and scaling",
    "ROI measurement",
  ],
  founder: {
    "@type": "Person",
    "@id": `${SITE.url}/#dominique-taplin`,
    name: SITE.founder.name,
    jobTitle: SITE.founder.jobTitle,
    description: `${SITE.founder.role}. Holds an ${SITE.founder.credential}.`,
    hasCredential: { "@type": "EducationalOccupationalCredential", name: SITE.founder.credential },
    worksFor: { "@id": `${SITE.url}/#organization` },
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AI consulting packages",
    itemListElement: ["Audit", "Testing & Implementation", "Scale"].map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
  },
};

function structuredData(page) {
  const graph = [
    organization,
    {
      "@type": "WebPage",
      "@id": `${abs(page.path)}#webpage`,
      url: abs(page.path),
      name: page.title,
      description: page.description,
      isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
      about: { "@id": `${SITE.url}/#organization` },
      inLanguage: "en",
    },
  ];
  if (page.path === "/platforms") {
    const items = page.blocks[0].items;
    graph.push({
      "@type": "ItemList",
      name: "Custom platform examples",
      itemListElement: items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "SoftwareApplication",
          name: item.title.split(" — ")[0],
          description: item.text,
          url: item.url,
          applicationCategory: "BusinessApplication",
        },
      })),
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}

// ---------- HTML rendering ----------
function renderItems(items, ordered) {
  const tag = ordered ? "ol" : "ul";
  const lis = items
    .map((item) => {
      const list = item.list ? `<ul>${item.list.map((l) => `<li>${esc(l)}</li>`).join("")}</ul>` : "";
      const link = item.url ? ` <a href="${esc(item.url)}">${esc(item.url)}</a>` : "";
      return `<li><h3>${esc(item.title)}</h3><p>${esc(item.text)}${link}</p>${list}</li>`;
    })
    .join("");
  return `<${tag}>${lis}</${tag}>`;
}

function renderBlock(block) {
  let out = `<section><h2>${esc(block.h2)}</h2>`;
  (block.paragraphs || []).forEach((p) => (out += `<p>${esc(p)}</p>`));
  if (block.list) out += `<ul>${block.list.map((l) => `<li>${esc(l)}</li>`).join("")}</ul>`;
  if (block.items) out += renderItems(block.items, block.ordered);
  return out + "</section>";
}

function renderBody(page) {
  const nav = pages.map((p) => `<a href="${p.path}">${esc(p.navLabel)}</a>`).join(" | ");
  return (
    `<div data-prerendered="true" style="max-width:52rem;margin:0 auto;padding:2rem 1.25rem;font-family:system-ui,sans-serif;line-height:1.6;color:#0f172a">` +
    `<header><p><strong>${esc(SITE.name)}</strong> — ${esc(SITE.tagline)}</p><nav aria-label="Primary">${nav}</nav></header>` +
    `<main><h1>${esc(page.h1)}</h1><p>${esc(page.intro)}</p>${page.blocks.map(renderBlock).join("")}</main>` +
    `<footer><p>${esc(SITE.name)} · <a href="mailto:${SITE.email}">${SITE.email}</a> · <a href="tel:${SITE.phone}">${SITE.phoneDisplay}</a></p>` +
    `<p><a href="/llms.txt">llms.txt</a> · <a href="/llms-full.txt">llms-full.txt</a> · <a href="/sitemap.xml">sitemap.xml</a></p></footer>` +
    `</div>`
  );
}

function renderPage(page) {
  const url = abs(page.path);
  const head = [
    `<link rel="canonical" href="${url}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(SITE.name)}" />`,
    `<meta property="og:title" content="${esc(page.title)}" />`,
    `<meta property="og:description" content="${esc(page.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="twitter:title" content="${esc(page.title)}" />`,
    `<meta name="twitter:description" content="${esc(page.description)}" />`,
    `<link rel="alternate" type="text/plain" href="${SITE.url}/llms.txt" title="LLM-readable site summary" />`,
    `<script type="application/ld+json">${jsonLd(structuredData(page))}</script>`,
  ].join("\n    ");

  return template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(page.title)}</title>`)
    .replace(
      /<meta\s+name="description"[\s\S]*?\/>/,
      `<meta name="description" content="${esc(page.description)}" />`,
    )
    .replace("</head>", `    ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${renderBody(page)}</div>`);
}

// ---------- markdown / text outputs ----------
function blockToMarkdown(block) {
  let out = `## ${block.h2}\n\n`;
  (block.paragraphs || []).forEach((p) => (out += `${p}\n\n`));
  if (block.list) out += block.list.map((l) => `- ${l}`).join("\n") + "\n\n";
  if (block.items) {
    block.items.forEach((item, i) => {
      const bullet = block.ordered ? `${i + 1}.` : "-";
      out += `${bullet} **${item.title}** — ${item.text}${item.url ? ` (${item.url})` : ""}\n`;
      (item.list || []).forEach((l) => (out += `   - ${l}\n`));
    });
    out += "\n";
  }
  return out;
}

function buildLlmsTxt() {
  const lines = [
    `# ${SITE.name}`,
    "",
    `> ${SITE.summary}`,
    "",
    `Managing Partner: ${SITE.founder.name} (${SITE.founder.role}, ${SITE.founder.credential}). Contact: ${SITE.email}, ${SITE.phoneDisplay}.`,
    "",
    "## Pages",
    "",
    ...pages.map((p) => `- [${p.navLabel}](${abs(p.path)}): ${p.description}`),
    "",
    "## Optional",
    "",
    `- [Full site content as plain text](${SITE.url}/llms-full.txt)`,
    `- [Sitemap](${SITE.url}/sitemap.xml)`,
    "",
  ];
  return lines.join("\n");
}

function buildLlmsFull() {
  const parts = [`# ${SITE.name}\n\n> ${SITE.summary}\n\nWebsite: ${SITE.url}\nEmail: ${SITE.email}\nPhone: ${SITE.phoneDisplay}\n`];
  for (const page of pages) {
    parts.push(
      `\n---\n\n# ${page.h1}\n\nURL: ${abs(page.path)}\nPage: ${page.navLabel}\n\n${page.intro}\n\n` +
        page.blocks.map(blockToMarkdown).join(""),
    );
  }
  return parts.join("");
}

function buildSitemap() {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = pages
    .map(
      (p) =>
        `  <url>\n    <loc>${abs(p.path)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${p.path === "/" ? "1.0" : "0.8"}</priority>\n  </url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

// ---------- write ----------
for (const page of pages) {
  fs.writeFileSync(path.join(dist, page.file), renderPage(page));
}
fs.writeFileSync(path.join(dist, "llms.txt"), buildLlmsTxt());
fs.writeFileSync(path.join(dist, "llms-full.txt"), buildLlmsFull());
fs.writeFileSync(path.join(dist, "sitemap.xml"), buildSitemap());

console.log(`prerender: wrote ${pages.length} pages, llms.txt, llms-full.txt, sitemap.xml`);
