module.exports = {
  entry: "./main.js",
  output: {
    filename: "public/bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|server.js)/,
        loader: 'babel',
        presets: ['es2015', 'stage-0', 'react']
      }
    ]
  },
  "resolve": {
    "root": "public"
  }
}
