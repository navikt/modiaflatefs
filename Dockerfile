FROM docker.pkg.github.com/navikt/modialogin/frontend:0e66ae09a2bf25beec75a1d314cbedd0dc0b55a8-beta
COPY build /app/public
