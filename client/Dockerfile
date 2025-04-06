# Stage 1: Сборка приложения
FROM node:20.10 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . ./

RUN npm run build  

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/templates/default.conf
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
