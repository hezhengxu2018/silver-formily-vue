<script setup lang="ts">
import type { IFieldProps } from '../types'
import { computed } from 'vue'
import { getFieldProps } from '../utils/getFieldProps'
import { getRawComponent } from '../utils/getRawComponent'
import ReactiveField from './ReactiveField.vue'

defineOptions({
  name: 'Field',
})

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
