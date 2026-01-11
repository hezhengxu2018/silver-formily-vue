import { connect, mapProps } from '@silver-formily/vue'
import FInput from './input.vue'

const InnerInput = connect(
  FInput,
  mapProps({
    value: 'modelValue',
    readOnly: 'readonly',
  }),
)

export default InnerInput
