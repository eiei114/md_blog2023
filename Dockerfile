FROM node:16 AS build
ADD . /app
WORKDIR /app
RUN npm install --production=false
RUN npm run

FROM gcr.io/distroless/nodejs:16
RUN ls -la
WORKDIR /app
COPY --from=build /app/next.config.js ./
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/package-look.json ./package-look.json
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/.next/standalone ./

CMD ["server.js"]