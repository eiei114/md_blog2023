FROM node:16 AS build
ADD . /app
WORKDIR /app
RUN npm install --production=false
RUN npm run

FROM gcr.io/distroless/nodejs:16

COPY --from=build next.config.js ./
COPY --from=build public ./public
COPY --from=build package.json ./package.json
COPY --from=build .next/static ./.next/static
COPY --from=build .next/standalone ./

CMD ["server.js"]