FROM ghcr.io/navikt/modialogin/modialogin-frontend:ad55ed444cc13737f3a14a1f02c2dfc9b7485135-beta

ADD proxy-config.json /proxy-config.json
COPY build /www
