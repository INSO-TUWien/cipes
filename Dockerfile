FROM arangodb:3.3.9
RUN apt-get update -q && apt-get upgrade -qq
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -qq git nodejs
RUN apt-get install -qq build-essential libc-dev libkrb5-dev
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
