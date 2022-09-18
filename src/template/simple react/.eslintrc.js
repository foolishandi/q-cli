const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'));
const OFF = 0;
const ERROR = 2;

module.exports = {
  extends: ['plugin:react-hooks/recommended', 'airbnb', 'plugin:prettier/recommended'],

  env: {
    browser: true, // 启用浏览器中全局变量
    node: true, // 启用node中全局变量
    es6: true,
  },
  settings: {
    'import/core-module': ['components', 'api', 'utils'],
    'import/resolver': {
      alias: {
        map: [['@', './app']],
        extensions: ['.js', '.jsx'],
      },
    },
  },
  parser: '@babel/eslint-parser', // 解释器
  // 解析器
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['import', 'react-hooks', 'jsx-a11y'],
  rules: {
    'no-console': OFF,
    'no-array-constructor': ERROR,
    'no-unused-vars': OFF, // 未使用import的值
    'no-undef': ERROR, // 不允许使用未定义变量
    'no-underscore-dangle': OFF, // 不允许 '_' 开头命名
    'no-cond-assign': ERROR, // 条件语句不允许赋值
    'no-var': ERROR, // 不用var
    'no-extra-boolean-cast': ERROR, // 禁止不必要的布尔转换
    'no-undef-init': ERROR, // 禁止赋值undefined
    'no-dupe-class-members': ERROR, // 禁止类属性重载
    'no-this-before-super': ERROR, // super前不允许用this
    'no-dupe-args': ERROR,
    'no-dupe-keys': ERROR,
    'no-duplicate-case': ERROR,
    'no-shadow': ERROR,
    'brace-style': [
      ERROR,
      '1tbs',
      {
        allowSingleLine: true,
      },
    ],
    'no-const-assign': ERROR, // 禁止给const变量赋值
    'no-duplicate-imports': ERROR, // 禁止重复引入模块
    'no-mixed-spaces-and-tabs': [
      // 禁止空格和 tab 的混合缩进
      'error',
      'smart-tabs',
    ],

    'global-require': OFF,

    'import/imports-first': OFF,
    'import/newline-after-import': OFF,
    'import/no-dynamic-require': OFF,
    'import/no-extraneous-dependencies': OFF,
    'import/no-named-as-default': OFF,
    'import/no-unresolved': ERROR,
    'import/no-webpack-loader-syntax': OFF,
    'import/prefer-default-export': OFF,
    'comma-spacing': [
      ERROR,
      {
        // 控制逗号前后的空格
        before: false,
        after: true,
      },
    ],
    'max-len': [ERROR, 200, {ignoreUrls: true}], // 强制一行的最大长度

    'react/jsx-key': ERROR, // 在数组或迭代器中验证JSX具有key属性
    'react/jsx-no-duplicate-props': ERROR, // 防止JSX中重复的props
    'react/jsx-no-undef': ERROR, // 在jsx中禁止使用为申明的变量
    'react/no-unknown-property': ERROR, // 防止使用未知的dom属性
    'react/react-in-jsx-scope': ERROR, // 防止忘记引入React
    'react/jsx-filename-extension': [
      ERROR,
      {
        extensions: ['.js', '.jsx'],
      },
    ],

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    'react/prop-types': OFF,
    'react/jsx-wrap-multilines': OFF,
    'react/jsx-one-expression-per-line': OFF,
    'react/jsx-props-no-spreading': OFF,
    'react/state-in-constructor': OFF,
    'react/static-property-placement': OFF,
    'react/destructuring-assignment': OFF,
    'react/no-array-index-key': 'warn',

    'react/jsx-closing-tag-location': OFF,
    'react/function-component-definition': OFF,
    'react/forbid-prop-types': OFF,
    'react/jsx-first-prop-new-line': [ERROR, 'multiline'],
    'react/jsx-no-target-blank': OFF,
    'react/jsx-uses-vars': ERROR,
    'react/require-default-props': OFF,
    'react/require-extension': OFF,
    'react/self-closing-comp': OFF,
    'react/sort-comp': OFF,
    'react/jsx-fragments': OFF,
    'react/button-has-type': OFF,

    'require-yield': OFF,
    'css-rcurlyexpected': OFF,
  },
};
