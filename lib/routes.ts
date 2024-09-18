// routes.js

export const ROOT = "/account";
export const PUBLIC_ROUTES = [ROOT];
export const PROTECTED_ROUTES = ["/dashboard", "/dashboard/:path*"]; // Добавьте другие защищённые маршруты
export const DEFAULT_REDIRECT = ROOT; // Или другую страницу
