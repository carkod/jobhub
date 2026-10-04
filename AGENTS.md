# AGENTS.md

This repository contains three separate projects. Each project has its own `package.json`, `node_modules` and scripts. Run commands from the project folder, not from the repository root.

| Folder  | Role                           | Audience                    | Stack                                       |
| ------- | ------------------------------ | --------------------------- | ------------------------------------------- |
| `back/` | Shared REST API                | Used by `hub/` and `web/`   | Express, Mongoose (MongoDB), Node.js, Gemini |
| `hub/`  | Internal admin portal and CMS  | Internal only (login wall)  | Vite, React, Redux, Semantic UI             |
| `web/`  | Public website                 | Public, optimized for SEO   | Next.js, React, Redux                       |

## back/ - shared REST API

- This is the only back-end. Both `hub/` and `web/` read and write data through it. Do not add a second API or connect a front-end directly to the database.
- Routes are under `/api/...` and are registered in `back/src/server.js`.
- Because two clients use this API, a change to a route or a response shape can break `hub/`, `web/` or both. Before you change a response, find all callers in both front-ends.
- Data that `web/` shows to the public must be safe to make public. Do not return internal-only fields (drafts, notes, contacts, tracker data) from routes that `web/` uses.
- Scripts: `npm start` (development, nodemon and native Node.js), `npm run build` (PDF Sass assets), `npm run production`.

## hub/ - internal admin portal (CMS)

- Internal tool to manage content: CVs, cover letters, portfolio, blog, job application tracker and AI CV generation.
- It is behind a login wall and is not for public access. It does not need SEO.
- It is a client-side single-page app. It calls `back/` through `buildBackUrl().apiUrl` in `hub/src/utils.js`.
- Code in `hub/` is a client. Do not use the login wall as the only security control for an action. If a `back/` route must be internal only, the route itself must enforce that.
- Scripts: `npm run dev`, `npm run build`.

## web/ - public website

- The public site. It shows the content that is managed in `hub/`.
- It is optimized for SEO. Keep pages server-rendered or statically generated with Next.js, use semantic HTML, and give each page a title, a meta description and correct headings.
- It must only show published content. Do not show drafts or internal data.
- It only reads from `back/`. It must not call routes that change data.
- Scripts: `npm run dev` (port 8080), `npm run build`, `npm start` (port 3000), `npm test` (Jest).

## Where to make a change

- New data or business logic: `back/`, then the front-end that needs it.
- Content management or internal workflow: `hub/`.
- Public pages, SEO or public styling: `web/`.
- A feature that is used by both front-ends: change `back/` first, then update `hub/` and `web/` and keep them compatible.
