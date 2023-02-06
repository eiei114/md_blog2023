FROM node:16 AS build
ADD . /app
WORKDIR /app
RUN npm install --production=false
RUN npm run

FROM gcr.io/distroless/nodejs:16

WORKDIR /md_blog2023

COPY --from=build /md_blog2023/next.config.js ./
COPY --from=build /md_blog2023/public ./public
COPY --from=build /md_blog2023/package.json ./package.json
COPY --from=build /md_blog2023/.next/static ./.next/static
COPY --from=build /md_blog2023/.next/standalone ./

CMD ["server.js"]