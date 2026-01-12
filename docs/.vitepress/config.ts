import type { EPThemeConfig } from 'vitepress-theme-element-plus'
import path from 'node:path'
import vueJsx from '@vitejs/plugin-vue-jsx'
import mdContainer from 'markdown-it-container'
import VueMacros from 'unplugin-vue-macros/vite'
import { defineConfig } from 'vitepress'
import { createDemoContainer } from 'vitepress-better-demo-plugin'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'
import { mdExternalLinkIcon, mdTableWrapper, mdTag, mdTooltip } from 'vitepress-theme-element-plus/node'

const SITE_URL = 'https://silver-formily-element-plus.pages.dev'

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
    search: {
      provider: 'local',
    },
    footer: {
      message: 'Released under the MIT License.',
    },
    logo: '/formily-logo.svg',
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
        {
          find: '@formily/vue',
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
