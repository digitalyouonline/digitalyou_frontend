FROM node:alpine as builder
WORKDIR /app

COPY package.json package.json
COPY yarn.lock yarn.lock 

RUN yarn install

COPY . . 
RUN yarn build


FROM nginx
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
