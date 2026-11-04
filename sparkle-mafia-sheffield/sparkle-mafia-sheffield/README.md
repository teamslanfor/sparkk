# Sparkle Mafia Cleaning Services (Sheffield): website

A 5-page website built on a new template called **"Noir Glitz"**. The design is completely different from the earlier sites: bold grotesque type, a dark-and-hot-pink palette, a floating pill-shaped navbar, a full-screen mobile menu, a spinning quote badge, service rows that show an image preview on hover, a sticky split "why us" section, a masonry gallery and a giant-wordmark footer.

It's built from the Yell listing (https://www.yell.com/biz/sparklemafiacleaningservices-sheffield-11060946/) and the details supplied by the client.

| Detail | Value |
|---|---|
| Business | Sparkle Mafia Cleaning Services (Yell: "Sparklemafiacleaningservices") |
| Address (Yell) | 8 Kyle Crescent, Sheffield S5 8HQ |
| Phone | 07502 372439 |
| Email | sparkleglitzmafia@gmail.com |
| Hours (Yell) | Open 24 hours, 7 days |
| Category (Yell) | Commercial cleaning; also appears in Yell's Sheffield searches for office cleaners and factory cleaning |

**Pages:** Home `/`, About `/about/`, Services `/services/`, Our Work `/portfolio/`, Contact `/contact/`. The site also has a custom 404 page, `sitemap.xml`, `robots.txt`, Open Graph/Twitter tags and LocalBusiness structured data.

## Folder structure

- `public/`: the finished website. Upload this folder to any web host.
  - `assets/css/styles.css`: the full Noir Glitz template styles.
  - `assets/js/main.js`: navigation, scroll animations, counters, gallery filters, lightbox and quote form.
  - `assets/js/template.js`: the hover image preview on the service rows.
  - `assets/js/chatbot.js`: the chat assistant.
- `src/site.config.js`: all the business details.
- `src/services-data.js`: the services. They feed both the Home service list and the Services page.
- `src/pages/*.html`: the content for each page.
- `build.js`: run `npm run build` to rebuild `public/`.
- `server.js`: an optional Node server, used for local preview and live AI chat.

## Run it

```bash
npm run build
npm start          # http://localhost:3000
```

## How things work

* **Quote form and chatbot enquiries** are emailed to **sparkleglitzmafia@gmail.com** through FormSubmit. The first time the form is used on the live site, FormSubmit sends a one-time **activation email** to that inbox; click its link once, or enquiries won't be delivered.
* **Chat assistant:** in demo mode (the default) it gives scripted answers and is clearly labelled "Demo assistant". Run `server.js` with `ANTHROPIC_API_KEY` set to switch it to live AI answers.
* **Contact page:** includes click-to-call, email, WhatsApp, the address with a Google Map, an "open now" badge and FAQs.

## Deploying

* **Static hosting:** publish `public/` to Netlify, Vercel, Cloudflare Pages or GitHub Pages.
* **With live AI chat:** deploy the whole folder to a Node host using `npm start`, with `ANTHROPIC_API_KEY` set.

## ⚠️ Check these before launch

1. **Click the FormSubmit activation email** after the first test submission.
2. **Services.** Commercial cleaning is from Yell. Office and factory/warehouse cleaning come from the Yell searches the business appears in. Deep cleaning, end of tenancy and home cleaning were added; confirm or remove them in `src/services-data.js`.
3. **"Open 24 hours".** This is what Yell lists; confirm it.
4. **WhatsApp.** Confirm 07502 372439 is on WhatsApp.
5. **Reviews.** Yell shows none, so the reviews section invites customers to leave one on Yell. Add genuine reviews when available.
6. **Photos** are royalty-free Unsplash stock images, labelled on the site as illustrative.
7. **Social media and domain** (`url` in `site.config.js`).
