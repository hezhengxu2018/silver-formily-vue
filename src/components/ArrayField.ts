import type { DefineComponent, IArrayFieldProps } from '../types'
import { h } from 'vue'
import { getFieldProps } from '../utils/getFieldProps'
import { getRawComponent } from '../utils/getRawComponent'
import ReactiveField from './ReactiveField'

export default {
  name: 'ArrayField',
  props: getFieldProps(),
  setup(props: IArrayFieldProps, context) {
    return () => {
      const componentData = {
        fieldType: 'ArrayField',
        fieldProps: {
          ...props,
          ...getRawComponent(props),
        },
      } as Record<string, unknown>
      return h(ReactiveField, componentData, context.slots)
    }
  },
} as unknown as DefineComponent<IArrayFieldProps>
