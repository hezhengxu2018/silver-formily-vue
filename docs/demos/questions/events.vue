<template>
  <FormProvider :form="form">
    <SchemaField :schema="schema" />
  </FormProvider>
</template>

<script>
import { ElInput } from 'element-plus'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@silver-formily/vue'


const { SchemaField } = createSchemaField({
  components: {
    ElInput,
  },
})

const schema = {
  type: 'object',
  properties: {
    input: {
      type: 'string',
      'x-component': 'ElInput',
      'x-component-props': {
        '@change': (e) => console.log(e),
        onFocus: (e) => console.log(e),
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
