<script setup lang="ts">
import type { IObjectFieldProps } from '../types'
import { computed } from 'vue'
import { getFieldProps } from '../utils/getFieldProps'
import { getRawComponent } from '../utils/getRawComponent'
import ReactiveField from './ReactiveField.vue'

defineOptions({
  name: 'ObjectField',
})

const props = defineProps(getFieldProps()) as IObjectFieldProps
const fieldProps = computed<IObjectFieldProps>(() => ({
  ...props,
  ...getRawComponent(props),
}))
</script>

<template>
  <ReactiveField
    field-type="ObjectField"
    :field-props="fieldProps"
  >
    <slot />
  </ReactiveField>
</template>
