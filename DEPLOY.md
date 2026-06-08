# Deployment Guide — Mercedes-Benz Tajikistan

## Option A: Your Own Server (VPS/Dedicated)

### Requirements
- Ubuntu 22.04+
- Node.js 20+ or Docker

### Deploy with Docker (Recommended)
```bash
# On your server
git clone <your-repo>
cd mercdesweb
docker compose up -d --build
```
Site will be live on port 3000. Put Nginx in front to serve on port 80/443.

### Nginx config (save to /etc/nginx/sites-available/mercedes-tj)
```nginx
server {
    server_name mercedes-tj.com www.mercedes-tj.com;
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
Then: `certbot --nginx -d mercedes-tj.com` for free SSL.

### Without Docker
```bash
npm install
npm run build
npm start  # runs on port 3000
# Use pm2 to keep it alive:
npm install -g pm2
pm2 start "npm start" --name mercedes-web
pm2 save && pm2 startup
```

---

## Option B: Vercel (Cloud — easiest)

1. Push repo to GitHub
2. Go to vercel.com → Import project
3. Select the repo → Deploy
4. Add custom domain in Vercel dashboard

Free tier is enough for this site.

---

## Option C: Other Cloud Options

| Provider | Notes |
|---|---|
| **Vercel** | Easiest, free tier, auto HTTPS |
| **Railway** | Simple, Docker support, $5/mo |
| **DigitalOcean App Platform** | $12/mo, managed |
| **AWS/Google Cloud** | Full control, more setup |

---

## Environment Variables
Create `.env.local` for any secrets (API keys, etc.):
```
# Example — add when needed
NEXT_PUBLIC_GOOGLE_MAPS_KEY=your-key
```
