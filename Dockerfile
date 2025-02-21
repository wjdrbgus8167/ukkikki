# Step 1: Build React App
FROM node:22 AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

# Step 2: Setup Nginx with SSL
FROM nginx:alpine

# Certbot & Nginx 설정 파일 복사
RUN apk add --no-cache certbot

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf

# Let's Encrypt 인증서 마운트
VOLUME /etc/letsencrypt

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
