const path = require('path');
const webpack = require('webpack');

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
    // Ajouter noParse pour ignorer le parsing de Radio.js, optionnel
    noParse: /@mui\/material\/Radio\/Radio\.js/,
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Extensions à gérer
    alias: {
      '@mui/material/useLazyRipple': false, // Ignorer ce module
      '@mui/material/Radio': path.resolve(__dirname, 'emptyModule.js'),  // Rediriger vers un module vide
    },
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /^@mui\/material\/Radio$/,
    }),
  ],
  devtool: 'source-map', // Pour faciliter le débogage
  mode: 'production', // Changez en 'development' pour du développement
};
