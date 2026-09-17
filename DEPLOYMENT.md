# 🚀 SkyBridge Travel & Tourism — Production Deployment Guide (`skybridgetours.com`)

This project is fully prepared and optimized for zero-configuration production deployment to **Netlify** via **GitHub** with your custom domain **`https://skybridgetours.com`**.

---

## 📋 Production Specifications Summary

- **Production Domain**: `https://skybridgetours.com`
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Node.js Version**: 18+ or 20+ (Default on Netlify)
- **SPA Fallback Routing**: Pre-configured via `netlify.toml` and `public/_redirects` (`/*  /index.html  200`)
- **Direct Route Access**: Full client-side routing support on all public (`/about`, `/visa-services`, `/flights`, `/hotels`, etc.) and private (`/admin/*`, `/ceo`) routes with zero 404s on browser refresh.
- **Security & Privacy**: Private administrative routes (`/admin/*` and `/ceo*`) are shielded with `X-Robots-Tag: noindex, nofollow, noarchive` headers to prevent search engine indexing. Admin links are completely hidden from public visitors.

---

## ⚡ Option 1: Deploy with Netlify (Recommended)

Deploying via Netlify connects directly to your GitHub repository and automatically deploys your updates whenever you push code.

### Step 1: Push Code to GitHub
1. In Google AI Studio, click **Settings > Export to GitHub** (or push using git from your local terminal):
   ```bash
   git init
   git add .
   git commit -m "Production release for skybridgetours.com"
   git branch -M main
   git remote add origin https://github.com/<your-username>/skybridge-tours.git
   git push -u origin main
   ```

### Step 2: Connect Repository in Netlify
1. Log into [Netlify.com](https://www.netlify.com).
2. Click **Add new site > Import an existing project**.
3. Select **GitHub** and authorize access to your `skybridge-tours` repository.
4. Netlify will automatically detect settings from `netlify.toml`:
   - **Base directory**: *(leave blank / root)*
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click **Deploy site**.

### Step 3: Connect Your Custom Domain (`skybridgetours.com`) in Netlify
1. In your Netlify site dashboard, navigate to **Site configuration > Domain management**.
2. Click **Add a domain** and enter `skybridgetours.com`. Click **Verify** and confirm **Add domain**.
3. Netlify will recommend setting up `www.skybridgetours.com` as well.
4. In your domain registrar (e.g., Namecheap):
   - Go to **Advanced DNS > Host Records**.
   - Delete existing parking records.
   - Add the Netlify DNS records:
     - **A Record**: Host `@` → Value `75.2.60.5` (Netlify load balancer IP)
     - **CNAME Record**: Host `www` → Value `<your-site-name>.netlify.app`
   *(Alternatively, you can use Netlify DNS by pointing Namecheap nameservers to Netlify's assigned nameservers).*
5. Once DNS records resolve (typically 5–30 minutes), Netlify will automatically provision a free Let's Encrypt SSL/TLS certificate (HTTPS).

---

## 🌐 Option 2: Deploy with GitHub Pages

The repository also includes pre-configured GitHub Actions deployment (`.github/workflows/deploy.yml`) and `public/CNAME`:

1. In your GitHub repository, navigate to **Settings > Pages**.
2. Under **Build and deployment > Source**, choose **GitHub Actions**.
3. Under **Custom domain**, enter `skybridgetours.com` and save.
4. In Namecheap DNS, point your `@` host to GitHub's 4 A records (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`) and `www` CNAME to `<username>.github.io`.

---

## 🔑 Environment Variables

- **Default Static Deployment**: No mandatory environment variables are required to deploy the complete, functional public website, client quotation generators, and admin CRM system.
- **Optional Server / API Secrets**:
  - `GEMINI_API_KEY`: Only needed if you run the standalone Node/Express backend (`server.ts`) for real-time live AI grounding.
  - `NODE_ENV`: `production` (automatically set by Netlify and GitHub Actions during build).
