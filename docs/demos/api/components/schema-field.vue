<script>
import { createForm } from '@formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/vue'
import { ElInput } from 'element-plus'

const { SchemaField, SchemaStringField } = createSchemaField({
  components: {
    ElInput,
  },
})

export default {
  components: { FormProvider, SchemaField, SchemaStringField },
  data() {
    return {
      form: createForm(),
    }
  },
}
</script>

<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaStringField name="input" x-component="ElInput" />
    </SchemaField>
  </FormProvider>
</template>
