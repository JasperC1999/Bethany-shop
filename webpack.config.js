const path = require('path');

console.log(__dirname);

module.exports = {
  entry: path.resolve(__dirname, 'client', 'src', 'index.tsx'),
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.tsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json']
  }
};