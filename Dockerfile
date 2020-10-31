FROM arangodb:3.1.28 as arangodb

FROM node:12
COPY --from=arangodb / /
RUN chown -R arangodb:arangodb /var/lib/arangodb3*
WORKDIR /home/cipes
COPY .git .git
COPY foxx foxx
COPY lib lib
COPY public public
COPY src src
COPY ui ui
COPY .cipesrc ./
COPY .eslint* ./
COPY cipes.js ./
COPY package*.json ./
COPY *.config.js* ./
COPY docker.sh ./
RUN chmod +x docker.sh
RUN BUILD_ONLY=true npm install -q nodegit@0.25.0
RUN npm install -q
ENTRYPOINT bash
