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
import { enLocale } from './i18n/en'
import { zhLocale } from './i18n/zh'

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
    blogroll: [
      { title: 'Formily', children: [
        { text: 'Core', link: 'https://core.formilyjs.org/' },
        { text: 'Reactive', link: 'https://reactive.formilyjs.org/' },
        { text: 'Vue', link: 'https://vue.formilyjs.org/' },
      ] },
      { title: 'Silver Formily', children: [
        { text: 'Element Plus', link: 'https://element-plus.silver-formily.org' },
        { text: 'Reactive Vue', link: 'https://reactive-vue.silver-formily.org' },
      ] },
    ],
  },
  logo: '/formily-logo.svg',
  socialLinks: [
    { icon: 'github', link: 'https://github.com/hezhengxu2018/silver-formily-vue' },
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
    root: zhLocale,
    en: enLocale,
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
        demoDir: path.resolve(import.meta.dirname, '../demos'),
        autoImportWrapper: false,
        codeFold: false,
        ssg: true,
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
