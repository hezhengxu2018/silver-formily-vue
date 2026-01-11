<script setup lang="ts">
import type { IFieldProps } from '../types'
import { observer } from '@formily/reactive-vue'
import { computed } from 'vue'
import { getFieldProps } from '../utils/getFieldProps'
import { getRawComponent } from '../utils/getRawComponent'
import _ReactiveField from './ReactiveField.vue'

defineOptions({
  name: 'Field',
})

const ReactiveField = observer(_ReactiveField)

const props = defineProps(getFieldProps()) as IFieldProps
const fieldProps = computed<IFieldProps>(() => ({
  ...props,
  ...getRawComponent(props),
}))
</script>

<template>
  <ReactiveField
    field-type="Field"
    :field-props="fieldProps"
  >
    <slot />
  </ReactiveField>
</template>
