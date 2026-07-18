FROM node:20-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

FROM nginx:alpine AS runner

COPY --from=builder /app/dist /app
RUN echo ' \
server { \
    listen 8080; \
    location / { \
        root /app; \
        index index.html; \
        try_files $uri $uri/ /index.html; \
        include /etc/nginx/mime.types; \
    } \
} \
' > /etc/nginx/conf.d/default.conf

EXPOSE 8080

RUN nginx -t
CMD ["nginx", "-g", "daemon off;"]