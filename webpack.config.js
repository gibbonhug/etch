const path = require('path');


module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.(jsljsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader'],
          }
        ],
      },
      resolve: {
        extensions: ['*', '.js', '.jsx'],
      }
}