import type { DefineComponent, IVoidFieldProps } from '../types'
import { h } from 'vue'
import { getVoidFieldProps } from '../utils/getFieldProps'

import { getRawComponent } from '../utils/getRawComponent'
import ReactiveField from './ReactiveField.vue'

export default {
  name: 'VoidField',
  props: getVoidFieldProps(),
  setup(props: IVoidFieldProps, context) {
    return () => {
      const componentData = {
        fieldType: 'VoidField',
        fieldProps: {
          ...props,
          ...getRawComponent(props),
        },
      } as Record<string, unknown>
      return h(ReactiveField, componentData, context.slots)
    }
  },
} as unknown as DefineComponent<IVoidFieldProps>
