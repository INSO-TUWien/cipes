module.exports = {
  productionSourceMap: false,
  publicPath: './',
  pages: {
    index: {
      entry: 'ui/main.js',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  chainWebpack: config => { // https://stackoverflow.com/a/61768334/2715720
    config.optimization.minimizer('terser')
      .tap((args) => {
        args[0].terserOptions.output = {
          ...args[0].terserOptions.output,
          comments: false  // exclude all comments from output
        }
        return args
      })
  }
};
