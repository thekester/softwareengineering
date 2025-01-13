const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Transpile les fichiers .js et .jsx
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Extensions à gérer
    alias: {
        '@mui/material/useLazyRipple': false, // Ignorer ce module
    },
  },
  devtool: 'source-map', // Pour faciliter le débogage
  mode: 'production', // Changez en 'development' pour du développement
};
