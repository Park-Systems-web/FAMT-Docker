FROM node:16-alpine as build-stage

WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./

RUN npm ci
RUN npm run build

FROM nginx:stable-alpine as production-stage

RUN mkdir /var/log/server_logs/
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]