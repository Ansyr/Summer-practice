FROM node:18
WORKDIR /app
COPY ./package*.json .
RUN yarn
COPY . .
EXPOSE 4000
CMD yarn run dev

