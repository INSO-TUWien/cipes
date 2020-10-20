module.exports = {
  pages: {
    index: {
      entry: 'ui/main.js',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  }
};
