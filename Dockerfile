from node:6.0.0

ENV wdir /app
RUN mkdir -p ${wdir}
WORKDIR ${wdir}

COPY package.json ${wdir}/
RUN npm config set registry http://registry.npmjs.org/
RUN npm install

RUN mkdir -p public/
COPY public/ public/

COPY src/ ${wdir}/src
COPY scripts/ ${wdir}/scripts
COPY webpack.config.js .babelrc ${wdir}/
ENV NODE_ENV=production
RUN mkdir -p data
RUN npm run build:server
RUN npm run build:app

EXPOSE 3000

CMD [ "npm", "start" ]
