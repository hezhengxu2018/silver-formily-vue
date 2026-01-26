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
  '/zh/guide/': [
    {
      text: '指南',
      items: [
        { text: '介绍', link: '/zh/guide/' },
      ],
    },
  ],
  '/zh/api/': [
    {
      text: 'Components',
      items: [
        { text: 'Field', link: '/zh/api/components/field' },
        { text: 'ArrayField', link: '/zh/api/components/array-field' },
        { text: 'ObjectField', link: '/zh/api/components/object-field' },
        { text: 'VoidField', link: '/zh/api/components/void-field' },
        { text: 'SchemaField', link: '/zh/api/components/schema-field' },
        { text: 'RecursionField', link: '/zh/api/components/recursion-field' },
        { text: 'FormProvider', link: '/zh/api/components/form-provider' },
        { text: 'FormConsumer', link: '/zh/api/components/form-consumer' },
        { text: 'ExpressionScope', link: '/zh/api/components/expression-scope' },
      ],
    },
    {
      text: 'Hooks',
      items: [
        { text: 'useField', link: '/zh/api/hooks/use-field' },
        { text: 'useFieldSchema', link: '/zh/api/hooks/use-field-schema' },
        { text: 'useForm', link: '/zh/api/hooks/use-form' },
        { text: 'useFormEffects', link: '/zh/api/hooks/use-form-effects' },
        { text: 'useParentForm', link: '/zh/api/hooks/use-parent-form' },
      ],
    },
    {
      text: 'Shared',
      items: [
        { text: 'connect', link: '/zh/api/shared/connect' },
        { text: 'injections', link: '/zh/api/shared/injections' },
        { text: 'mapProps', link: '/zh/api/shared/map-props' },
        { text: 'mapReadPretty', link: '/zh/api/shared/map-read-pretty' },
        { text: 'observer', link: '/zh/api/shared/observer' },
        { text: 'schema', link: '/zh/api/shared/schema' },
      ],
    },
  ],
  '/zh/types/': [
    {
      text: '类型声明',
      items: [
        { text: 'Field', link: '/zh/types/field' },
        { text: 'Path', link: '/zh/types/path' },
        { text: 'FieldValidator', link: '/zh/types/validator#fieldvalidator' },
      ],
    },
  ],
}

export default defineConfig<EPThemeConfig>({
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
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/',
      title: 'Silver Formily Vue',
      description: 'Formily 的 Vue3 封装',
      themeConfig: {
        nav: [
          {
            text: '指南',
            link: '/zh/guide/',
            activeMatch: '^/zh/guide/',
          },
          {
            text: 'API',
            link: '/zh/api/components/field',
            activeMatch: '^/zh/api/',
          },
          {
            text: '类型声明',
            link: '/zh/types/',
            activeMatch: '^/zh/types/',
          },
          {
            text: 'Q&A',
            link: '/zh/questions/',
            activeMatch: '^/zh/questions/',
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
