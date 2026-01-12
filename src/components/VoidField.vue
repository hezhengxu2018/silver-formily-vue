<script setup lang="ts">
import type { IVoidFieldProps } from '../types'
import { computed } from 'vue'
import { getVoidFieldProps } from '../utils/getFieldProps'
import { getRawComponent } from '../utils/getRawComponent'
import ReactiveField from './ReactiveField.vue'

defineOptions({
  name: 'VoidField',
})

const props = defineProps(getVoidFieldProps()) as IVoidFieldProps
const fieldProps = computed<IVoidFieldProps>(() => ({
  ...props,
  ...getRawComponent(props),
}))
</script>

<template>
  <ReactiveField
    field-type="VoidField"
    :field-props="fieldProps"
  >
    <slot />
  </ReactiveField>
</template>
