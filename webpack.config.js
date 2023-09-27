// const path = require("path");

// module.exports = {
//   // Other Webpack configuration options...

//   output: {
//     // filename: "bundle.js", // Your bundle file name
//     path: path.resolve(__dirname, "dist"), // Output directory path
//     filename: "my-first-webpack.bundle.js",
//   },
//   //   entry: "./src/app.js",
//   //   output: {
//   //     filename: "bundle.js",
//   //     path: path.resolve(__dirname, "dist"),
//   //   },

//   module: {
//     rules: [{ test: /\.txt$/, use: "raw-loader" }],
//   },
// };

// const path = require("path");

// module.exports = {
//   // Other Webpack configuration options...

//   entry: "./src/index.js", // Entry point of your application

//   output: {
//     filename: "my-first-webpack.bundle.js",
//     path: path.resolve(__dirname, "dist"),
//   },

//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /node_modules/,
//         use: {
//           loader: "babel-loader",
//         },
//       },
//     ],
//   },

//   resolve: {
//     extensions: [".js", ".jsx"], // Enable import of .jsx files without specifying the extension
//   },

//   // Other configuration options...
// };

const path = require("path");

module.exports = {
  entry: "./src/index.js", // Entry point of your application

  output: {
    filename: "my-first-webpack.bundle.js",
    path: path.resolve(__dirname, "dist"),
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader", // Add this line for PostCSS
        ],
      },
    ],
  },

  resolve: {
    extensions: [".js", ".jsx"], // Enable import of .jsx files without specifying the extension
  },

  // Other configuration options...

  // Add the postcss.config.js configuration here if it's not in a separate file.
};
