import type { EPThemeConfig } from 'vitepress-theme-element-plus'
import path from 'node:path'
import vueJsx from '@vitejs/plugin-vue-jsx'
import mdContainer from 'markdown-it-container'
import VueMacros from 'unplugin-vue-macros/vite'
import { defineConfig } from 'vitepress'
import { createDemoContainer } from 'vitepress-better-demo-plugin'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'
import { mdExternalLinkIcon, mdTableWrapper, mdTag, mdTooltip } from 'vitepress-theme-element-plus/node'
import pkg from '../../package.json' with { type: 'json' }

const SITE_URL = 'https://vue.silver-formily.org'

export default defineConfig<EPThemeConfig>({
  title: 'Silver Formily Vue',
  description: 'Formily 的 Vue3 封装',
  head: [
    ['meta', { name: 'description', content: 'Formily 的 Vue3 封装库和使用指南' }],
    ['meta', { name: 'keywords', content: 'Formily, Vue, 表单' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Silver Formily Vue' }],
    ['meta', { property: 'og:title', content: 'Silver Formily Vue' }],
    ['meta', { property: 'og:description', content: 'Formily Vue 组件库文档、示例与最佳实践' }],
    ['meta', { property: 'og:url', content: SITE_URL }],
    ['link', { rel: 'canonical', href: SITE_URL }],
  ],
  sitemap: {
    hostname: SITE_URL,
  },
  themeConfig: {
    version: pkg.version,
    search: {
      provider: 'local',
    },
    aside: false,
    footer: {
      message: 'Released under the MIT License.',
    },
    logo: '/formily-logo.svg',
    nav: [
      {
        text: '指南',
        link: '/guide/',
        activeMatch: '/guide/',
      },
      {
        text: 'API',
        link: '/api/components/field',
        activeMatch: '/api/',
      },
      {
        text: 'Q&A',
        link: '/questions/',
        activeMatch: '/questions/',
      },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '介绍', link: '/guide/' },
          ],
        },
      ],
      '/api/': [
        {
          text: 'Components',
          items: [
            { text: 'Field', link: '/api/components/field' },
            { text: 'ArrayField', link: '/api/components/array-field' },
            { text: 'ObjectField', link: '/api/components/object-field' },
            { text: 'VoidField', link: '/api/components/void-field' },
            { text: 'SchemaField (Markup Schema)', link: '/api/components/schema-field' },
            { text: 'SchemaField (JSON Schema)', link: '/api/components/schema-field-with-schema' },
            { text: 'RecursionField(简易递归)', link: '/api/components/recursion-field' },
            { text: 'RecursionField (自增列表递归)', link: '/api/components/recursion-field-with-component' },
            { text: 'FormProvider', link: '/api/components/form-provider' },
            { text: 'FormConsumer', link: '/api/components/form-consumer' },
            { text: 'ExpressionScope', link: '/api/components/expression-scope' },
          ],
        },
        {
          text: 'Hooks',
          items: [
            { text: 'useField', link: '/api/hooks/use-field' },
            { text: 'useFieldSchema', link: '/api/hooks/use-field-schema' },
            { text: 'useForm', link: '/api/hooks/use-form' },
            { text: 'useFormEffects', link: '/api/hooks/use-form-effects' },
            { text: 'useParentForm', link: '/api/hooks/use-parent-form' },
          ],
        },
        {
          text: 'Shared',
          items: [
            { text: 'connect', link: '/api/shared/connect' },
            { text: 'injections', link: '/api/shared/injections' },
            { text: 'mapProps', link: '/api/shared/map-props' },
            { text: 'mapReadPretty', link: '/api/shared/map-read-pretty' },
            { text: 'observer', link: '/api/shared/observer' },
            { text: 'schema', link: '/api/shared/schema' },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/hezhengxu2018/silver-formily-vue' },
    ],
  },
  markdown: {
    config(md) {
      md.use(groupIconMdPlugin)
      md.use(mdExternalLinkIcon)
      md.use(mdTag)
      md.use(mdTooltip)
      md.use(mdTableWrapper)
      md.use(mdContainer, 'demo', createDemoContainer(md, {
        demoDir: path.resolve(import.meta.dirname, '../demos'),
        autoImportWrapper: false,
      }))
    },
  },
  vite: {
    resolve: {
      alias: [
        {
          find: '@silver-formily/vue',
          replacement: `${path.resolve(import.meta.dirname, '../../src')}/`,
        },
      ],
    },
    plugins: [groupIconVitePlugin(), VueMacros({
      setupComponent: false,
      setupSFC: false,
      plugins: {
        vueJsx: vueJsx(),
      },
    })],
    ssr: { noExternal: [
      'vitepress-theme-element-plus',
      'vitepress-better-demo-plugin',
    ] },
    optimizeDeps: {
      include: ['@formily/core', '@formily/reactive', '@formily/shared', '@formily/json-schema', 'element-plus', '@silver-formily/element-plus', '@formily/reactive-vue', '@silver-formily/element-plus'],
      exclude: ['vitepress-theme-element-plus'],
    },
  },
})
