# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
# FROM tiangolo/node-frontend:10 as build-stage
FROM node:18.7.0 as build-stage

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY ./ /app/

RUN npm run build

# ##################################
# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.22.1

COPY --from=build-stage /app/build/ /usr/share/nginx/html
# COPY --from=build-stage /app/config/nginx.conf /etc/nginx/conf.d/default.conf

# Copy the default nginx.conf provided by tiangolo/node-frontend
# COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=build-stage /app/config/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
