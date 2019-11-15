module.exports = {
    plugins: {
        'postcss-easy-import': {},
        'postcss-preset-env': {browsers: ['last 2 versions', '> 5%']},
        'postcss-custom-properties': {},
        'cssnano': {reduceIdents: false, zindex: false}
    }
};
