FROM ghcr.io/navikt/modialogin/modialogin-frontend:ab1a1de81620b81ec001e75e12633967bc14811c

ADD proxy-config.json /proxy-config.json
COPY build /www
