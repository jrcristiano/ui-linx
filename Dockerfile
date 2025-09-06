# ===== Etapa base (Node.js) =====
FROM node:lts-alpine AS base
WORKDIR /app

# Copia dependências e instala
COPY package.json package-lock.json* ./
RUN npm install

# Copia código fonte
COPY . .

# Argumento para definir ambiente
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

# ===== Etapa build (produção) =====
FROM base AS build
RUN if [ "$NODE_ENV" = "production" ]; then npm run build; fi

# ===== Etapa final (Nginx para produção) =====
FROM nginx:stable-alpine AS final

# Copia build estático
COPY --from=build /app/dist /usr/share/nginx/html

# Configuração Nginx customizada
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe portas
EXPOSE 80 5173

# CMD condicional: dev ou prod
CMD if [ "$NODE_ENV" = "development" ]; then \
      npm run dev -- --host; \
    else \
      nginx -g "daemon off;"; \
    fi
