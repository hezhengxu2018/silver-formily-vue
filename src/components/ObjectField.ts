import type { DefineComponent, IObjectFieldProps } from '../types'
import { h } from 'vue'
import { getFieldProps } from '../utils/getFieldProps'

import { getRawComponent } from '../utils/getRawComponent'
import ReactiveField from './ReactiveField'

export default {
  name: 'ObjectField',
  props: getFieldProps(),
  setup(props: IObjectFieldProps, context) {
    return () => {
      const componentData = {
        fieldType: 'ObjectField',
        fieldProps: {
          ...props,
          ...getRawComponent(props),
        },
      } as Record<string, unknown>
      return h(ReactiveField, componentData, context.slots)
    }
  },
} as unknown as DefineComponent<IObjectFieldProps>
