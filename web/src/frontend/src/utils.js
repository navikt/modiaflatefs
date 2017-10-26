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
