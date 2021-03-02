FROM node:14.16.0
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
RUN npm install
ADD src /usr/src/app/src
ADD public /usr/src/app/public
CMD ["npm", "start"]