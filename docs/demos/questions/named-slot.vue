<script setup lang="tsx">
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@silver-formily/vue'
import { ElInput, ElIcon } from 'element-plus'
import { defineComponent, h } from 'vue'
import { User } from "@element-plus/icons-vue";

const { SchemaField } = createSchemaField({
  components: {
    ElInput,
  },
})

const PrefixIcon = defineComponent({
  name: 'PrefixIcon',
  setup() {
    return () => <ElIcon>< User/></ElIcon>
  },
})

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

const form = createForm()
</script>

<template>
  <FormProvider :form="form">
    <SchemaField :schema="schema" />
  </FormProvider>
</template>
