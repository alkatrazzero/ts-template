const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')

module.exports = ({ stage }) => {
  return {
    mode: 'development',
    entry: path.join(__dirname, 'src', 'index.tsx'),
    output: {
      path: path.resolve(__dirname, 'build'),
      publicPath: '/',
    },
    resolve: {
      extensions: ['.js', '.ts', '.jsx', '.tsx'],
      alias: {
        '@services': path.resolve(__dirname, 'src/services/'),
        '@components': path.resolve(__dirname, 'components/'),
        '@type-defs': path.resolve(__dirname, 'src/type-defs/'),
        '@utils': path.resolve(__dirname, 'src/utils/'),
        '@hooks': path.resolve(__dirname, 'src/hooks/'),
        public: path.resolve(__dirname, 'public/'),
      },
    },
    // optimization: {
    //   splitChunks: {
    //     chunks: 'all',
    //   },
    // },
    devServer: {
      historyApiFallback: true,
      static: './build',
    },
    performance: {
      // hints: false,
      // maxEntrypointSize: 512000,
      // maxAssetSize: 512000,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: ['ts-loader'],
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src', 'index.html'),
      }),
      new Dotenv({
        path: path.resolve(__dirname, `.env${stage ? '.' + stage : ''}`),
      }),
    ],
  }
}
