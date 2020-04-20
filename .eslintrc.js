module.exports = {
  "root": true,
  "env": {
    "node": true
  },
  "extends": [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint"
  ],
  "parserOptions": {
    "ecmaVersion": 2020
  },
  "overrides": [
    {
      "files": ["*.ts", "*.tsx", "*.vue"],
      "rules": {
        "@typescript-eslint/member-ordering": "off",
        "@typescript-eslint/interface-name-prefix": ["error"],
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/explicit-function-return-type": [
          "off",
          {
            "allowExpressions": "true"
          }
        ],
        "@typescript-eslint/camelcase": "off",
        "@typescript-eslint/consistent-type-definitions": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/ban-ts-ignore": "off"
      }
    }
  ],
  "rules": {
    "no-console": "off",
    "no-debugger": "off"
  }
}
