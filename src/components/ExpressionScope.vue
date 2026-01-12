<script setup lang="ts">
import type { Ref } from 'vue'
import type { IExpressionScopeProps } from '../types'
import { lazyMerge } from '@formily/shared'
import { computed, inject, provide } from 'vue'
import { SchemaExpressionScopeSymbol } from '../shared'

defineOptions({
  name: 'ExpressionScope',
})

const props = defineProps<IExpressionScopeProps>()
const scopeRef = inject<Ref<Record<string, any>>>(SchemaExpressionScopeSymbol)!
const expressionScopeRef = computed(() => lazyMerge(scopeRef.value, props.value))

provide(SchemaExpressionScopeSymbol, expressionScopeRef)
</script>

<template>
  <slot />
</template>
