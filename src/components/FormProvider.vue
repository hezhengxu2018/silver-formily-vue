<script setup lang="ts">
import type { IProviderProps } from '../types'
import { provide, toRef } from 'vue'
import { useAttach } from '../hooks/useAttach'
import { useInjectionCleaner } from '../hooks/useInjectionCleaner'
import {
  FieldSymbol,
  FormSymbol,
  SchemaExpressionScopeSymbol,
  SchemaMarkupSymbol,
  SchemaOptionsSymbol,
  SchemaSymbol,
} from '../shared/context'

const props = defineProps<{ form: IProviderProps['form'] }>()

const formRef = useAttach(toRef(props, 'form'))
provide(FormSymbol, formRef)
useInjectionCleaner([
  FieldSymbol,
  SchemaMarkupSymbol,
  SchemaSymbol,
  SchemaExpressionScopeSymbol,
  SchemaOptionsSymbol,
])
</script>

<template>
  <slot />
</template>
