// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    // to edit target browsers: use "browserlist" field in package.json
    "autoprefixer": {
      browsers: [
        "> 1%",
        "last 7 versions",
        "not ie <= 8",
        "ios >= 8",
        "android >= 4.0"
      ]
    },
    "postcss-pxtorem": {
      rootValue: 75,
      unitPrecision: 5,
      propList: ['*'],
      selectorBlackList: [],
      replace: true,
      mediaQuery: false,
      // minPixelValue: 12
    }
  }
}
