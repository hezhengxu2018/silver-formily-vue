/// <reference types="@formily/core" />
/// <reference types="@formily/json-schema" />
import * as Types from './types'

declare global {
  namespace Formily.Vue {
    export { Types }
  }
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, any>
  export default component
}
