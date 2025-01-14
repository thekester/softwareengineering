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
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Extensions à gérer
    alias: {
      '@mui/material/useLazyRipple': false, 
      // Bien que IgnorePlugin ignore Radio, on peut aussi définir un alias si besoin
      '@mui/material/Radio': false,  
    },
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /^@mui\/material\/Radio$/,
    }),
  ],
  devtool: 'source-map', // Pour faciliter le débogage
  mode: 'production', // Ou 'development' selon vos besoins
};
