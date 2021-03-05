FROM node:latest
WORKDIR /rombot
COPY . .
RUN npm install --save
CMD [ "npm", "run", "start" ]