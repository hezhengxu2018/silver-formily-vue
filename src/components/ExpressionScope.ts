import type { Ref } from 'vue'
import type { IExpressionScopeProps } from '../types'
import { lazyMerge } from '@formily/shared'
import { computed, defineComponent, Fragment, h, inject, provide } from 'vue'
import { SchemaExpressionScopeSymbol } from '../shared'

export const ExpressionScope = defineComponent({
  name: 'ExpressionScope',
  props: ['value'],
  setup(props: IExpressionScopeProps, { slots }) {
    const scopeRef = inject<Ref>(SchemaExpressionScopeSymbol)
    const expressionScopeRef = computed(() =>
      lazyMerge(scopeRef.value, props.value),
    )

    provide(SchemaExpressionScopeSymbol, expressionScopeRef)

    return () => h(Fragment, slots)
  },
})
