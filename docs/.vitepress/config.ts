import type { EPThemeConfig } from 'vitepress-theme-element-plus'
import path from 'node:path'
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import vueJsx from '@vitejs/plugin-vue-jsx'
import mdContainer from 'markdown-it-container'
import VueMacros from 'unplugin-vue-macros/vite'
import { defineConfig } from 'vitepress'
import { createDemoContainer } from 'vitepress-better-demo-plugin'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'
import { mdExternalLinkIcon, mdTableWrapper, mdTag, mdTooltip } from 'vitepress-theme-element-plus/node'
import pkg from '../../package.json' with { type: 'json' }

const SITE_URL = 'https://vue.silver-formily.org'

const sharedThemeConfig: EPThemeConfig = {
  version: pkg.version,
  search: {
    provider: 'local',
  },
  aside: true,
  outline: [2, 4],
  footer: {
    message: 'Released under the MIT License.',
  },
  logo: '/formily-logo.svg',
  socialLinks: [
    { icon: 'github', link: 'https://github.com/hezhengxu2018/silver-formily-vue' },
  ],
}

const zhSidebar: EPThemeConfig['sidebar'] = {
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
        { text: 'SchemaField', link: '/api/components/schema-field' },
        { text: 'RecursionField', link: '/api/components/recursion-field' },
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
  '/types/': [
    {
      text: '类型声明',
      items: [
        { text: 'Field', link: '/types/field' },
        { text: 'Path', link: '/types/path' },
        { text: 'FieldValidator', link: '/types/validator#fieldvalidator' },
      ],
    },
  ],
}

export default defineConfig<EPThemeConfig>({
  srcDir: path.resolve(import.meta.dirname, '../zh'),
  title: 'Silver Formily Vue',
  description: 'Vue 3 wrapper for Formily',
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
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'Silver Formily Vue',
      description: 'Formily 的 Vue3 封装',
      themeConfig: {
        nav: [
          {
            text: '指南',
            link: '/guide/',
            activeMatch: '^/guide/',
          },
          {
            text: 'API',
            link: '/api/components/field',
            activeMatch: '^/api/',
          },
          {
            text: '类型声明',
            link: '/types/',
            activeMatch: '^/types/',
          },
          {
            text: 'Q&A',
            link: '/questions/',
            activeMatch: '^/questions/',
          },
        ],
        sidebar: zhSidebar,
        footer: {
          blogroll: [
            { title: 'Formily 官方库', children: [
              { text: 'Formily Core', link: 'https://core.formilyjs.org/' },
              { text: 'Formily Reactive', link: 'https://reactive.formilyjs.org/' },
              { text: 'Formily Vue', link: 'https://vue.formilyjs.org/' },
            ] },
            { title: '封装组件库', children: [
              { text: 'Silver Formily Element Plus', link: 'https://element-plus.silver-formily.org' },
            ] },
          ],
        },
      },
    },
    en: {
      label: 'English',
      lang: 'en-US',
      title: 'Silver Formily Vue',
      description: 'Vue 3 wrapper for Formily',
      themeConfig: {
        nav: [
          {
            text: 'Guide',
            link: '/en/guide/',
          },
          {
            text: 'API',
            link: '/en/api/components/field',
          },
          {
            text: 'Q&A',
            link: '/en/questions/',
          },
        ],
      },
    },
  },
  themeConfig: sharedThemeConfig,
  markdown: {
    config(md) {
      md.use(groupIconMdPlugin)
      md.use(mdExternalLinkIcon)
      md.use(mdTag)
      md.use(mdTooltip)
      md.use(mdTableWrapper)
      md.use(mdContainer, 'demo', createDemoContainer(md, {
        demoDir: path.resolve(import.meta.dirname, '../zh/demos'),
        autoImportWrapper: false,
        codeFold: false,
      }))
    },
    codeTransformers: [transformerTwoslash()],
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
