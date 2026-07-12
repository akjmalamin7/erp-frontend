# AZM ERP — Admin Console

A modern admin panel for the **AZM-ERP** backend, built with React 18, TypeScript,
Redux Toolkit + RTK Query, Tailwind CSS, and role-based routing via
`createBrowserRouter`.

## Stack

- **React 18 + TypeScript + Vite**
- **Redux Toolkit / RTK Query** — one `api` slice (`src/services/api.ts`), split by
  domain into `authApi`, `usersApi`, `dashboardApi`, `inventoryApi`, `customersApi`,
  `ordersApi`, `accountsApi`, `smsApi` — each mapped 1:1 to the Express routes in
  `AZM-ERP/src/routers/api.ts`.
- **Tailwind CSS** — custom `ink` / `brass` / `sea` palette in `tailwind.config.ts`.
- **Recharts** — an area chart for revenue and a donut/pie chart for sales mix on
  the dashboard, plus a report breakdown pie chart.
- **react-router-dom `createBrowserRouter`** — nested routes with two guard layers:
  - `RequireRole` — hard role gate (`super_admin` / `admin` / `employee`), used for
    Staff, SMS settings, Suppliers, Accounts.
  - `RequireMenu` — soft gate driven by each employee's `allowedMenus` array from
    the backend `User` model, so `super_admin`/`admin` always pass, and employees
    only see what they've been granted.

## Getting started

```bash
cp .env.example .env      # point VITE_API_BASE_URL at your backend if needed
npm install
npm run dev
```

The dev server proxies `/api` to `http://localhost:5000` (see `vite.config.ts`) —
update the `target` there if your AZM-ERP backend runs elsewhere.

```bash
npm run build   # type-check + production build to dist/
npm run preview # preview the production build
```

## Roles & access

| Role          | Access                                                             |
|---------------|----------------------------------------------------------------------|
| `super_admin` | Everything, incl. creating admins and staff                        |
| `admin`       | Everything except creating other admins/super admins               |
| `employee`    | Only the menus in their `allowedMenus` (dashboard, category, customers, stock, mail_atleast, staff, sale, invoice, sales_report, profile) |

The sidebar (`src/routes/navConfig.ts`) and the router (`src/routes/router.tsx`)
both read from the same menu keys, so a page is never reachable by URL without
also being visible in navigation, and vice versa.

## Structure

```
src/
  app/            redux store, auth + ui slices, typed hooks
  services/       RTK Query endpoint definitions (one file per backend module)
  routes/         createBrowserRouter config + RequireAuth/RequireRole/RequireMenu
  layouts/        AuthLayout (login) and DashboardLayout (sidebar + topbar)
  components/     Sidebar, Topbar, StatCard, Modal, charts/, shared states
  pages/          one folder per module (dashboard, products, orders, ...)
  types/          shared TS types mirroring the Mongoose models
```

## Notes

- Login expects `{ token, user }` back from `POST /login`, matching
  `generate_jwt()` + the `User` model in the backend.
- The dashboard's revenue chart uses the three totals the backend's
  `/dashboard` endpoint returns (today / month / year) rather than a daily
  series, since that's what the API currently exposes.
- `GET /suppliers/all` doesn't exist yet on the backend, so the Suppliers page
  tracks newly created suppliers for the current session only — wire up a real
  list endpoint and swap in an RTK Query hook when it's available.
# erp-frontend
