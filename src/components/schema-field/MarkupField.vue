<script setup lang="ts">
import type { ISchema } from '@formily/json-schema'
import { computed, inject, provide, ref, watch } from 'vue'
import { SchemaMarkupSymbol } from '../../shared'
import { resolveSchemaProps } from '../../utils/resolveSchemaProps'
import { getRandomName, markupProps } from './shared'

defineOptions({
  name: 'MarkupField',
})

const props = defineProps({
  type: String,
  ...markupProps,
})

const parentRef = inject(SchemaMarkupSymbol, null)
const schemaRef = ref<ISchema>()
const hasParent = computed(() => Boolean(parentRef?.value))
const name = props.name || getRandomName()

function appendArraySchema(schema: ISchema) {
  if (!parentRef?.value)
    return null

  if (parentRef.value.items) {
    return parentRef.value.addProperty(name, schema)
  }
  else {
    return parentRef.value.setItems(resolveSchemaProps(props))
  }
}

if (parentRef) {
  watch(
    parentRef,
    () => {
      if (!parentRef.value)
        return

      if (parentRef.value.type === 'object' || parentRef.value.type === 'void') {
        schemaRef.value = parentRef.value.addProperty(
          name,
          resolveSchemaProps(props),
        )
      }
      else if (parentRef.value.type === 'array') {
        const schema = appendArraySchema(resolveSchemaProps(props))
        schemaRef.value = Array.isArray(schema) ? schema[0] : schema
      }
    },
    { immediate: true },
  )

  provide(SchemaMarkupSymbol, schemaRef)
}
</script>

<template>
  <div
    v-if="hasParent"
    style="display: none;"
  >
    <slot />
  </div>
</template>
