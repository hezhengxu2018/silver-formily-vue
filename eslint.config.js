import antfu from '@antfu/eslint-config'

export default antfu({
  gitignore: true,
  stylistic: {
    indent: 2,
    quotes: 'single',
  },
  rules: {
    'vue/one-component-per-file': 'off',
  },
  formatters: {
    css: true,
    html: true,
    markdown: 'prettier',
  },
})
