export const STATUS = {
    NOT_STARTED: 'NOT_STARTED',
    PENDING: 'PENDING',
    OK: 'OK',
    ERROR: 'ERROR'
};

function finnMiljoStreng() {
    const host = window.location.host;
    const bindestrekIndex = host.indexOf('-');
    if (bindestrekIndex === -1) {
        return '';
    }
    const dotIndex = host.indexOf('.');
    return host.substring(bindestrekIndex + 1, dotIndex);
}

export function erstattMiljoPlaceholder(lenke) {
    const miljoStreng = finnMiljoStreng();
    if (miljoStreng) {
        return lenke.replace('{{miljoStreng}}', `-${miljoStreng}`);
    }
    return lenke.replace('{{miljoStreng}}', miljoStreng);
}

export function erstattMiljoPlaceholderNais(lenke) {
    const miljoStreng = finnMiljoStreng();
    if (miljoStreng) {
        return lenke.replace('{{miljoStreng}}', 'nais.preprod.local');
    }
    return lenke.replace('{{miljoStreng}}', 'nais.adeo.no');
}

export function erstattMiljoPlaceholderNaisIntern(lenke) {
    const miljoStreng = finnMiljoStreng();
    if (miljoStreng) {
        return lenke.replace('{{miljoStreng}}', 'intern.dev.nav.no');
    }
    return lenke.replace('{{miljoStreng}}', 'intern.nav.no');
}

export function erDev() {
    const host = window.location.host;
    return host.includes('localhost') || host.includes('127.0.0.1');
}
