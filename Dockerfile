FROM ghcr.io/navikt/modialogin/modialogin-frontend:9f5002f50fc6f7c142c250ad5d46bb6df14dc682-beta

ADD proxy-config.json /proxy-config.json
COPY build /www
