<template>
  <FormProvider :form="form">
    <SchemaField :schema="schema" />
  </FormProvider>
</template>

<script>
import { ElInput, Icon } from 'element-plus'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@silver-formily/vue'


const { SchemaField } = createSchemaField({
  components: {
    ElInput,
  },
})

const PrefixIcon = {
  functional: true,
  render(h) {
    return h(Icon, { props: { type: 'user' } })
  },
}

const schema = {
  type: 'object',
  properties: {
    input: {
      type: 'string',
      'x-component': 'ElInput',
      'x-content': {
        prefix: PrefixIcon,
      },
    },
  },
}

export default {
  components: { FormProvider, SchemaField },
  data() {
    return {
      form: createForm(),
      schema,
    }
  },
}
</script>
