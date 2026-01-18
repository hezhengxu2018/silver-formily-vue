<template>
  <FormProvider :form="form">
    <SchemaField :schema="schema" />
  </FormProvider>
</template>

<script>
import { ElButton } from 'element-plus'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@silver-formily/vue'


const { SchemaField } = createSchemaField({
  components: {
    ElButton,
  },
})

const schema = {
  type: 'object',
  properties: {
    button: {
      type: 'void',
      'x-component': 'ElButton',
      'x-content': '一个普通的按钮',
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
