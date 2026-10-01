import jwt from "jsonwebtoken";

// Routes that web/ (the public site) uses. Every other /api and /pdf route needs a hub/ login.
// Deny by default: a new route is private until it is added here.
const PUBLIC_ROUTES = {
  GET: [
    /^\/api\/?$/,
    /^\/api\/cats\/?$/,
    /^\/api\/cvs(\/[^/]+)?\/?$/,
    /^\/api\/portfolio(\/navigation)?\/?$/,
    /^\/api\/project\/[^/]+\/?$/,
    // Also covers /blogs/name/:name and /blogs/category/:category.
    /^\/api\/blogs(\/[^/]+){0,2}\/?$/,
    /^\/api\/blog\/[^/]+\/?$/,
    /^\/pdf\/assets\//,
    /^\/pdf\/(view|generate)\/(cv|curriculum-vitae)\//,
  ],
  POST: [/^\/api\/login\/?$/],
};

const isProtectedPath = (path) => /^\/(api|pdf)(\/|$)/.test(path);

const isPublicRoute = (method, path) =>
  (PUBLIC_ROUTES[method === "HEAD" ? "GET" : method] || []).some((pattern) =>
    pattern.test(path),
  );

// hub/ stores the token with JSON.stringify, so older clients send it in quotes.
const readBearerToken = (header = "") => {
  const match = /^Bearer\s+(.+)$/i.exec(header);
  return match ? match[1].trim().replace(/^"(.*)"$/, "$1") : null;
};

export function verifyRequest(req) {
  const secret = process.env.JWT_SECRET;
  const token = readBearerToken(req.headers.authorization);
  if (!secret || !token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}

export default function requireHubLogin(req, res, next) {
  // Express matches routes case-insensitively, so the policy must too.
  const path = req.path.toLowerCase();
  if (!isProtectedPath(path) || isPublicRoute(req.method, path)) return next();

  const user = verifyRequest(req);
  if (!user) {
    return res
      .status(401)
      .json({ error: true, message: "Login required." });
  }
  req.user = user;
  return next();
}
