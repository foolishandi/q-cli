console.log(1);
module.exports = {
  presets: [
    '@babel/preset-env',
    [
      '@babel/preset-react',
      {
        development: true,
      },
    ],
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    [
      'import',
      {
        libraryName: 'antd',
        style: true,
      },
    ],
    [
      '@locator/babel-jsx/dist',
      {
        env: 'development',
      },
    ],
  ],
};
