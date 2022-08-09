const { ChangeJsFilename, ChangeCssFilename } = require('@navikt/craco-plugins');

module.exports = {
    plugins: [
        { plugin: ChangeCssFilename },
        { plugin: ChangeJsFilename },
    ]
};
