module.exports = {
    presets: [
      [
        "@babel/preset-env",
        {
          modules: false
        }
      ],
      "@babel/preset-react"
    ],
    plugins: [
      "@babel/plugin-transform-runtime",
      "@babel/plugin-syntax-dynamic-import",
      "@babel/plugin-proposal-class-properties"
    ],
    env: {
      production: {
        only: ["src","src/components/Main","src/components/Query"],
        plugins: [
          [
            "transform-react-remove-prop-types",
            {
              removeImport: true
            }
          ],
          "@babel/plugin-transform-react-inline-elements",
          "@babel/plugin-transform-react-constant-elements"
        ]
      }
    }
  };