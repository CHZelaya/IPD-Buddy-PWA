module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-typescript',
    'eslint:recommended',
    'plugin:prettier/recommended', // ✅ This disables ESLint formatting rules that conflict with Prettier
  ],
  plugins: ['prettier'], // Optional, helps if you want prettier-specific rules in future
  rules: {
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'prettier/prettier': 'error', // ✅ ESLint throws if Prettier formatting isn't followed
    // '@stylistic/space-before-function-paren' removed to avoid conflict with Prettier
  },
}
