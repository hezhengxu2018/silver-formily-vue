<script>
import { createForm } from '@formily/core'
import { createSchemaField, FormProvider, RecursionField } from '@silver-formily/vue'
import { ElInput } from 'element-plus'

const Custom = {
  render(h, { props }) {
    return h(RecursionField, {
      props: {
        name: props.name,
        schema: props.schema,
        onlyRenderProperties: true,
      },
    })
  },
}

const { SchemaField, SchemaObjectField } = createSchemaField({
  components: {
    Custom,
    ElInput,
  },
})

export default {
  components: { FormProvider, SchemaField, SchemaObjectField },
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
      <SchemaObjectField
        name="custom"
        x-component="Custom"
        :x-component-props="{
          schema: {
            type: 'object',
            properties: {
              input: {
                'type': 'string',
                'x-component': 'ElInput',
              },
            },
          },
        }"
      />
    </SchemaField>
  </FormProvider>
</template>
