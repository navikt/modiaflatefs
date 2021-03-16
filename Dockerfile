FROM docker.pkg.github.com/navikt/modialogin/frontend:01d7dda81a8611288bf7d20b9145e35a1549346f-beta
COPY build /app/public
