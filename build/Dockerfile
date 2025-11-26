FROM node:24-alpine as build
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN apk add --no-cache python3 make g++ && corepack enable && corepack prepare pnpm@10 --activate

# BEGIN: Set environment variables for the build
ARG VITE_AUTH0_DOMAIN
ARG VITE_AUTH0_AUDIENCE
ARG VITE_AUTH0_CLIENT_ID
ARG VITE_URL_SERVICE
# END: Set environment variables for the build

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build


FROM nginx:stable-alpine
COPY build/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
