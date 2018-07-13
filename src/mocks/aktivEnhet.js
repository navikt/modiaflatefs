const enheter = require('./enheter').enhetliste;

function vilkarligTall(min, maks) {
    return Math.floor(Math.random() * (maks - min)) + min;
}

function vilkarligEnhet() {
    const i = vilkarligTall(0, enheter.length);
    return enheter[i].enhetId;
}

module.exports = {
    aktivEnhet: vilkarligEnhet()
};
