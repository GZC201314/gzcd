module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app"
  ],
  use:[
    {
      loader:require.resolve("react-docgen-typescript-loader"),
    }
  ]
}

// const proxy = require('http-proxy-middleware')
// module.exports = function expressMiddleware(router) {
//   use:(
//       '/api',
//           proxy({
//             target: `http://locahost:5000`, // 服务器 api地址
//             changeOrigin: true
//           })
//   )
// }

