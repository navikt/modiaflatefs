FROM ghcr.io/navikt/modialogin/modialogin-frontend:f30e5af9388282355d9e226217443208ab1f1ff2-beta

ADD proxy-config.json /proxy-config.json
COPY build /www
