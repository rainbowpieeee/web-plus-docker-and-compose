FROM node:16-alpine AS kpd_backend_builder
WORKDIR /app
COPY packag*.json ./
RUN npm ci
COPY . ./
RUN npm run build

FROM node:16-alpine AS kpd_backend
WORKDIR /app
COPY --from=kpd_backend_builder /app/package*.json ./
RUN npm ci --omit=dev && npm install -g pm2
COPY --from=kpd_backend_builder /app/dist ./dist
COPY ./ecosystem.config.js ./
EXPOSE 3001
CMD pm2-runtime start ecosystem.config.js
