FROM ghcr.io/navikt/modialogin/modialogin-frontend:abe33a62ce03c8599798e173d671faf8ddbd3a55-beta

ADD proxy-config.json /proxy-config.json
COPY build /www
