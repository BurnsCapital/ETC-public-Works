FROM node:8

WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm i -g forever
CMD ["npm","start"]

EXPOSE 8546
EXPOSE 80
EXPOSE 443
