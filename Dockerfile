FROM node:17
COPY . /taiga-event
WORKDIR /taiga-event
RUN npm ci
CMD ["npm", "run", "start:server"]
