#!/usr/bin/env node
/**
 * Static-site builder for the "Noir Glitz" template.
 * Each file in src/pages/*.html starts with a JSON block inside <!--meta ... --> and is wrapped
 * with the shared layout below (head, floating nav, mobile overlay menu, footer, chatbot mount).
 * Output: public/<slug>/index.html (clean URLs), plus sitemap.xml, robots.txt and assets/js/site-config.js.
 *
 *   npm run build
 */
const fs = require('fs');
const path = require('path');
const site = require('./src/site.config.js');

const SRC = path.join(__dirname, 'src', 'pages');
const OUT = path.join(__dirname, 'public');

const nav = [
  { href: '/', label: 'Home', key: 'home' },
  { href: '/about/', label: 'About', key: 'about' },
  { href: '/services/', label: 'Services', key: 'services' },
  { href: '/portfolio/', label: 'Our Work', key: 'portfolio' },
  { href: '/contact/', label: 'Contact', key: 'contact' },
];

const icon = (name) => `<svg class="i" aria-hidden="true"><use href="/assets/img/icons.svg#${name}"/></svg>`;
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`;

function header(active) {
  const links = nav.map((n, i) =>
    `<li><a href="${n.href}" class="nav-link${n.key === active ? ' is-active' : ''}"${n.key === active ? ' aria-current="page"' : ''}><span class="nav-num">0${i + 1}</span>${n.label}</a></li>`).join('');
  return `
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header" id="top">
  <div class="nav-shell">
    <a href="/" class="brand" aria-label="${site.name} – home">
      <img src="/assets/img/logo-mark.svg" alt="" width="42" height="42">
      <span class="brand-text">${site.shortName}<small>${site.brandSub}</small></span>
    </a>
    <nav class="nav" aria-label="Main">
      <ul class="nav-links" id="nav-menu">${links}
        <li class="nav-mobile-extra">
          <a href="/contact/#quote" class="btn btn-pink btn-block"><span>Get a free quote</span><span class="btn-ic">${icon('arrow')}</span></a>
          <p><a href="${site.phoneHref}">${site.phone}</a><br><a href="mailto:${site.email}">${site.email}</a></p>
        </li>
      </ul>
    </nav>
    <div class="nav-actions">
      <a href="${site.phoneHref}" class="nav-call" aria-label="Call ${site.phone}">${icon('phone')}<span>${site.phone}</span></a>
      <a href="/contact/#quote" class="btn btn-pink btn-sm nav-cta"><span>Free quote</span><span class="btn-ic">${icon('arrow')}</span></a>
      <button class="nav-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="nav-menu"><span></span><span></span></button>
    </div>
  </div>
</header>`;
}

function footer() {
  const year = new Date().getFullYear();
  return `
<footer class="site-footer">
  <div class="container">
    <div class="footer-top">
      <div class="footer-cta">
        <p class="kicker">${icon('sparkle')} Ready when you are</p>
        <h2>Let’s get your place <span class="pink">sparkling.</span></h2>
        <div class="footer-cta-btns">
          <a href="/contact/#quote" class="btn btn-pink"><span>Get a free quote</span><span class="btn-ic">${icon('arrow')}</span></a>
          <a href="${site.phoneHref}" class="btn btn-ghost">${icon('phone')}<span>${site.phone}</span></a>
        </div>
      </div>
      <div class="footer-cols">
        <div>
          <h3>Pages</h3>
          <ul>${nav.map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join('')}</ul>
        </div>
        <div>
          <h3>Services</h3>
          <ul>${site.services.map((s) => `<li><a href="/services/#${s.id}">${s.title}</a></li>`).join('')}</ul>
        </div>
        <div>
          <h3>Contact</h3>
          <ul class="footer-contact">
            <li><a href="${site.phoneHref}">${icon('phone')}${site.phone}</a></li>
            <li><a href="mailto:${site.email}">${icon('mail')}${site.email}</a></li>
            <li><a href="${site.whatsapp}" target="_blank" rel="noopener">${icon('whatsapp')}WhatsApp us</a></li>
            <li><a href="${mapsLink}" target="_blank" rel="noopener">${icon('pin')}${site.addressLine}</a></li>
            <li><span>${icon('clock')}${site.hoursShort}</span></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-word" aria-hidden="true">Sparkle<span>Mafia</span></div>
    <div class="footer-bottom">
      <p>© ${year} ${site.name}. All rights reserved.</p>
      <div class="footer-social">
        <a href="${site.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp">${icon('whatsapp')}</a>
        <a href="mailto:${site.email}" aria-label="Email">${icon('mail')}</a>
        ${site.socials.map((s) => `<a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.label}">${icon(s.icon)}</a>`).join('')}
      </div>
      <a href="#top" class="to-top">Back to top ${icon('arrow-up')}</a>
    </div>
  </div>
</footer>
<a href="${site.whatsapp}" class="wa-float" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp">${icon('whatsapp')}</a>
<div class="hover-preview" aria-hidden="true"></div>
<div id="chatbot-root"></div>`;
}

function layout(meta, body) {
  const url = site.url + meta.path;
  const img = site.url + (meta.image || '/assets/img/og-image.jpg');
  const ld = {
    '@context': 'https://schema.org',
    '@type': site.schemaType,
    name: site.name,
    description: site.schemaDescription,
    url: site.url,
    telephone: site.phoneIntl,
    email: site.email,
    openingHours: site.openingHoursSchema,
    areaServed: site.area,
    address: { '@type': 'PostalAddress', streetAddress: site.address.street, addressLocality: site.address.city, postalCode: site.address.postcode, addressCountry: 'GB' },
    image: img,
    sameAs: [...new Set([site.yell, ...site.socials.map((s) => s.url)])],
  };
  return `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${meta.title}</title>
<meta name="description" content="${meta.description}">
<link rel="canonical" href="${url}">
<meta name="theme-color" content="#0e0d12">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${site.name}">
<meta property="og:title" content="${meta.title}">
<meta property="og:description" content="${meta.description}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${img}">
<meta property="og:locale" content="en_GB">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${meta.title}">
<meta name="twitter:description" content="${meta.description}">
<meta name="twitter:image" content="${img}">
<link rel="icon" href="/assets/img/logo-mark.svg" type="image/svg+xml">
<link rel="manifest" href="/site.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/styles.css">
${meta.preload ? `<link rel="preload" as="image" href="${meta.preload}">` : ''}
<script type="application/ld+json">${JSON.stringify(ld)}</script>
<script defer src="/assets/js/site-config.js"></script>
<script defer src="/assets/js/main.js"></script>
<script defer src="/assets/js/template.js"></script>
<script defer src="/assets/js/chatbot.js"></script>
</head>
<body class="page-${meta.key}${meta.dark ? ' hero-dark' : ''}">
${header(meta.key)}
<main id="main">
${body.trim()}
</main>
${footer()}
</body>
</html>
`;
}

const servicesData = require('./src/services-data.js');
const serviceRows = servicesData.map((s, i) => `
      <a href="/services/#${s.id}" class="svc-row-link reveal" data-preview="/assets/img/${s.img}.webp">
        <span class="n">0${i + 1}</span>
        <h3>${s.title}</h3>
        <p>${s.intro.split('. ')[0]}.</p>
        <span class="go">${icon('arrow')}</span>
      </a>`).join('');
const serviceBlocks = servicesData.map((s, i) => `
    <article class="svc-block reveal" id="${s.id}">
      <div class="svc-media"><img src="/assets/img/${s.img}.webp" alt="${s.alt}" loading="lazy"><span class="num">0${i + 1}</span></div>
      <div class="svc-body">
        <span class="tag">${icon(s.icon)} ${s.tag}</span>
        <h2>${s.title}</h2>
        <p>${s.intro}</p>
        <ul class="ticks">${s.points.map((p) => `<li>${icon('check')}<span>${p}</span></li>`).join('')}</ul>
        <div class="svc-actions">
          <button type="button" class="btn btn-ghost btn-sm" data-toggle-details aria-expanded="false" aria-controls="more-${s.id}"><span class="lbl">Learn more</span></button>
          <a href="/contact/?service=${s.id}#quote" class="btn btn-pink btn-sm"><span>Get a quote</span><span class="btn-ic">${icon('arrow')}</span></a>
        </div>
        <div class="details" id="more-${s.id}">${s.more.map((m) => `<p>${m}</p>`).join('')}</div>
      </div>
    </article>`).join('');
const serviceTabs = servicesData.map((s) => `<a class="svc-tab" href="#${s.id}">${icon(s.icon)} ${s.title}</a>`).join('');
const serviceOptions = servicesData.map((s) => `<option value="${s.id}">${s.title}</option>`).join('');

function render(str) {
  return str
    .replace(/\{\{serviceRows\}\}/g, serviceRows)
    .replace(/\{\{serviceBlocks\}\}/g, serviceBlocks)
    .replace(/\{\{serviceTabs\}\}/g, serviceTabs)
    .replace(/\{\{serviceOptions\}\}/g, serviceOptions)
    .replace(/\{\{icon:([\w-]+)\}\}/g, (_, n) => icon(n))
    .replace(/\{\{mapsLink\}\}/g, mapsLink)
    .replace(/\{\{site\.(\w+)\}\}/g, (_, k) => site[k]);
}

const pages = [];
for (const file of fs.readdirSync(SRC).filter((f) => f.endsWith('.html'))) {
  const raw = fs.readFileSync(path.join(SRC, file), 'utf8');
  const m = raw.match(/^<!--meta\s*([\s\S]*?)-->/);
  if (!m) throw new Error(`Missing meta block in ${file}`);
  const meta = JSON.parse(m[1]);
  const html = layout(meta, render(raw.slice(m[0].length)));
  const outFile = meta.path === '/' ? path.join(OUT, 'index.html')
    : meta.path === '/404' ? path.join(OUT, '404.html')
    : path.join(OUT, meta.path, 'index.html');
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, html);
  if (meta.path !== '/404') pages.push(meta);
  console.log('built', path.relative(__dirname, outFile));
}

const today = new Date().toISOString().slice(0, 10);
const order = ['/', '/about/', '/services/', '/portfolio/', '/contact/'];
pages.sort((a, b) => order.indexOf(a.path) - order.indexOf(b.path));
fs.writeFileSync(path.join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${site.url}${p.path}</loc><lastmod>${today}</lastmod><priority>${p.path === '/' ? '1.0' : '0.8'}</priority></url>`).join('\n')}
</urlset>
`);
fs.writeFileSync(path.join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);
fs.writeFileSync(path.join(OUT, 'assets', 'js', 'site-config.js'), `window.SITE = ${JSON.stringify({
  name: site.name, shortName: site.shortName, addressLine: site.addressLine, openFrom: site.openFrom, openTo: site.openTo,
  phone: site.phone, phoneHref: site.phoneHref, email: site.email, whatsapp: site.whatsapp, whatsappNumber: site.whatsappNumber,
  area: site.area, hours: site.hours, formEndpoint: site.formEndpoint,
  services: site.services.map(({ id, title, short }) => ({ id, title, short })),
}, null, 2)};\n`);
console.log('built sitemap.xml, robots.txt, site-config.js');
