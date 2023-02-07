FROM ghcr.io/navikt/modialogin/modialogin-frontend:ce523106e542834f533c24878d29981bb2af3b2f-beta

ADD proxy-config.json /proxy-config.json
COPY build /www
