import type { GeneralField } from '@formily/core'
import type { Ref } from 'vue'
import { inject, ref } from 'vue'
import { FieldSymbol } from '../shared/context'

export function useField<T = GeneralField>(): Ref<T> {
  return inject(FieldSymbol, ref()) as any
}
