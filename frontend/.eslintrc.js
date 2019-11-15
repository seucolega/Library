module.exports = {
    'env': {
        'browser': true,
        'es6': true
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        'sourceType': 'module',
        'ecmaVersion': 2018
    },
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ]
    },
    'globals': {
        'module': false,
        'require': false,
        '__dirname': false,
        'process': false,
        'siteVars': [],
        'TypeRocket': false,
        'Pace': false,
        'global': false,
        'google': false,
        'MarkerClusterer': false,
        'jQuery': false,
        // 'swal': false, // sweetAlert
    }
};
