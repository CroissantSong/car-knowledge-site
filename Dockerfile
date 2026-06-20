# 多阶段构建：Node 构建 VitePress 静态站 → nginx 服务
FROM node:20-alpine AS build
WORKDIR /app
# VitePress 构建会调用 git（lastUpdated），alpine 需手动装
RUN apk add --no-cache git
COPY package*.json ./
RUN npm ci || npm install
COPY . .
# 容器/隧道按根路径访问：把 base 改为 '/'（不影响仓库里的 GitHub Pages 配置）
RUN sed -i "s#base:[[:space:]]*'/car-knowledge-site/'#base: '/'#" docs/.vitepress/config.js \
 && npm run build

FROM nginx:alpine
COPY --from=build /app/docs/.vitepress/dist /usr/share/nginx/html
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
