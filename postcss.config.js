module.exports = {
  plugins: [
    require("postcss-discard-comments")({
      removeAll: true, // Remove all comments
      // Add other options as needed
    }),
  ],
};
