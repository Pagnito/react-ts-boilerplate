const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
    "mode": "development",
    "entry": "./src/index.tsx",
    "output": {
        "path": __dirname+'/build',
        "filename": "bundle.js",
        "publicPath": '/build'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
      },
    "module": {
        "rules": [
            {
                "test": /\.tsx?$/,
                "exclude": /node_modules/,
                "use": {
                    "loader": "ts-loader",
                    "options": {
                        "transpileOnly": true
                    }
                }
            },
            {
                "test": /\.scss$/,
                "use": [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            },
          /*  {
              test: /\.(jpg|png)$/,
              use: {
                loader: "url-loader",
              }
            }*/
        ]
    },
    "plugins": [new MiniCssExtractPlugin({filename: "bundle.css"})],
    /*optimization: {
      minimizer: [new UglifyJsPlugin()]
    }*/
    devServer: {
      port: 3000,
      disableHostCheck: true,
      proxy: [
        // allows redirect of requests to webpack-dev-server to another destination
        {
          context: ["/api","/auth"], // can have multiple
          target: "http://localhost:4000", // server and port to redirect to
          secure: false
        }
      ],
      open: true,
      historyApiFallback: true,
      contentBase: "./",
      compress: true,
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      }
    },
    externals: {
        /*"react": "React",
        "react-dom": "ReactDOM"*/
    }
}
