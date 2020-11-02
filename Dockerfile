FROM arangodb:3.1.28 as arangodb

FROM node:12
COPY --from=arangodb / /
RUN chown -R arangodb:arangodb /var/lib/arangodb3*
WORKDIR /home/cipes
COPY package*.json ./
RUN BUILD_ONLY=true npm install -q nodegit@0.25.0
RUN npm install -q
COPY foxx foxx
COPY lib lib
COPY public public
COPY src src
COPY ui ui
COPY .eslint* ./
COPY cipes.js ./
COPY *.config.js* ./
COPY docker-init.sh /root/.bashrc
COPY docker.sh /root/alias.sh
ENTRYPOINT bash
