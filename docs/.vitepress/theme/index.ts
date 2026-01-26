import type { EPThemeConfig } from 'vitepress-theme-element-plus'
import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'
import ElementPlus from 'element-plus'
import {
  VitepressEpDemoBox,
  VitepressEpDemoPlaceholder,
} from 'vitepress-better-demo-plugin/theme/element-plus'
import Theme from 'vitepress-theme-element-plus'
import 'virtual:group-icons.css'
import '../styles/theme.css'
import '@shikijs/vitepress-twoslash/style.css'

export default <EPThemeConfig>{
  ...Theme,
  enhanceApp({ app }) {
    app.use(ElementPlus)
    app.use(TwoslashFloatingVue)
    app.component('VitepressDemoBox', VitepressEpDemoBox)
    app.component('VitepressDemoPlaceholder', VitepressEpDemoPlaceholder)
  },
}
