<script setup lang="ts">
import type { PropType } from 'vue'
import type { ISchemaFieldProps, ISchemaFieldVueFactoryOptions, SchemaVueComponents } from '../../types'
import { Schema } from '@formily/json-schema'
import { lazyMerge } from '@formily/shared'
import { computed, onBeforeMount, onBeforeUpdate, provide } from 'vue'
import { SchemaExpressionScopeSymbol, SchemaMarkupSymbol, SchemaOptionsSymbol } from '../../shared'
import RecursionField from '../RecursionField'
import { resetNonameId, schemaFieldProps } from './shared'

defineOptions({
  name: 'SchemaField',
  inheritAttrs: false,
})

const props = defineProps({
  ...schemaFieldProps,
  factoryOptions: {
    type: Object as PropType<ISchemaFieldVueFactoryOptions<SchemaVueComponents>>,
    default: () => ({}),
  },
}) as ISchemaFieldProps & { factoryOptions: ISchemaFieldVueFactoryOptions<SchemaVueComponents> }

const schemaRef = computed(() =>
  Schema.isSchemaInstance(props.schema)
    ? props.schema
    : new Schema({
      type: 'object',
      ...props.schema,
    }),
)

const scopeRef = computed(() => lazyMerge(props.factoryOptions.scope, props.scope))

const optionsRef = computed(() => ({
  ...props.factoryOptions,
  components: {
    ...(props.factoryOptions.components || {}),
    ...(props.components || {}),
  },
}))

provide(SchemaMarkupSymbol, schemaRef)
provide(SchemaOptionsSymbol, optionsRef)
provide(SchemaExpressionScopeSymbol, scopeRef)

const recursionFieldProps = computed(() => {
  const { schema, scope, components, factoryOptions, ...rest } = props
  return rest
})

onBeforeMount(resetNonameId)
onBeforeUpdate(resetNonameId)
</script>

<template>
  <slot />
  <RecursionField
    v-bind="recursionFieldProps"
    :schema="schemaRef"
  />
</template>
