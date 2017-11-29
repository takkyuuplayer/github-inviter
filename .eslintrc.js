module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  env: {
    mocha: true,
    browser: true,
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
};
