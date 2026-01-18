# ============================================
# Kürdan - Metadata Cleaner Docker Image
# ============================================

# -------------------------------------------
# Stage 1: Build Frontend
# -------------------------------------------
FROM node:22-slim AS frontend-builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . . 
# Not: Tek tek dosya kopyalamak yerine (COPY index.html vb.) 
# genellikle tüm klasör (.) kopyalanır ve gereksizler .dockerignore ile engellenir.
# Bu daha temiz bir Dockerfile sağlar.
RUN npm run build

# -------------------------------------------
# Stage 2: Production Image
# -------------------------------------------
FROM node:22-slim AS production

# 1. GÜVENLİK VE BAĞIMLILIKLAR
# Sharp kütüphanesi için gerekli libvips yükleniyor
RUN apt-get update && apt-get install -y --no-install-recommends \
    libvips42 \
    && rm -rf /var/lib/apt/lists/*

# Node imajlarında varsayılan olarak 'node' adında bir kullanıcı gelir.
# Güvenlik için uygulamayı bu kullanıcı ile çalıştıracağız.
WORKDIR /app

# Backend dosyalarını kopyalarken sahipliğini 'node' kullanıcısına veriyoruz.
COPY --chown=node:node server/package.json server/package-lock.json ./server/

WORKDIR /app/server
RUN npm ci --omit=dev

# Kaynak kodları kopyala (sahiplik node kullanıcısında)
COPY --chown=node:node server/index.js ./
COPY --chown=node:node server/.env.example ./.env.example

# 2. İZİNLER VE KLASÖRLER
# Uploads klasörünü oluşturup node kullanıcısına yetki veriyoruz.
# Bunu yapmazsanız, uygulama dosya yazarken "Permission Denied" hatası alır.
RUN mkdir -p uploads && \
    echo '{"totalCleaned": 0, "lastUpdated": null}' > stats.json && \
    chown -R node:node /app/server

# Frontend build sonucunu al (sahiplik node kullanıcısında)
COPY --chown=node:node --from=frontend-builder /app/dist /app/dist

# Env değişkenleri
ENV NODE_ENV=production \
    PORT=3000 \
    ALLOWED_ORIGINS=http://localhost:3000 \
    SERVE_STATIC=true \
    STATIC_DIR=/app/dist

EXPOSE 3000

# 3. KULLANICI DEĞİŞİMİ (EN KRİTİK ADIM)
# Artık root kullanıcısını bırakıp kısıtlı yetkiye geçiyoruz.
USER node

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node -e "fetch('http://localhost:3000/').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

CMD ["node", "index.js"]