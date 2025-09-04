import { createForm } from '@formily/core'
import { markRaw } from 'vue'

function createRawForm(...args: Parameters<typeof createForm>) {
  const form = createForm(...args)
  return markRaw(form)
}

export { createRawForm as createForm }
