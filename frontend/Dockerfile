FROM node:18
WORKDIR /app
COPY ./package*.json .
RUN yarn
EXPOSE 5173
COPY . .
CMD yarn run dev --host 0.0.0.0


