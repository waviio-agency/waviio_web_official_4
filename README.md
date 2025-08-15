waviio-agency-site

## Vercel SPA Fallback

This project uses React Router with BrowserRouter for client-side routing. The vercel.json configuration includes a rewrite rule that ensures all deep routes (like /dashboard, /services/webdesign) fallback to index.html, allowing the React Router to handle routing on the client side and preventing 404 errors when refreshing or accessing deep links directly.