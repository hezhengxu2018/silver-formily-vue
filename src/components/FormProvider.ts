import type { DefineComponent, IProviderProps } from '../types'
import { defineComponent, Fragment, h, provide, toRef } from 'vue'
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

export default defineComponent({
  name: 'FormProvider',
  inheritAttrs: false,
  props: ['form'],
  setup(props: IProviderProps, { slots }) {
    const formRef = useAttach(toRef(props, 'form'))
    provide(FormSymbol, formRef)
    useInjectionCleaner([
      FieldSymbol,
      SchemaMarkupSymbol,
      SchemaSymbol,
      SchemaExpressionScopeSymbol,
      SchemaOptionsSymbol,
    ])

    return () => h(Fragment, slots)
  },
}) as DefineComponent<IProviderProps>
