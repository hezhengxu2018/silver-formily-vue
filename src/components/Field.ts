import type { DefineComponent, IFieldProps } from '../types'
import { h } from 'vue'
import { getFieldProps } from '../utils/getFieldProps'

import { getRawComponent } from '../utils/getRawComponent'
import ReactiveField from './ReactiveField'

export default {
  name: 'Field',
  props: getFieldProps(),
  setup(props: IFieldProps, context) {
    return () => {
      const componentData = {
        fieldType: 'Field',
        fieldProps: {
          ...props,
          ...getRawComponent(props),
        },
      } as Record<string, unknown>
      return h(ReactiveField, componentData, context.slots)
    }
  },
} as unknown as DefineComponent<IFieldProps>
