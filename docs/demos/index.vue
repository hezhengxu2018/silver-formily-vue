<script lang="ts" setup>
import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { ElInput } from 'element-plus'

const form = createForm({
  initialValues: {
    input: 'Hello, Silver Formily Vue!',
  },
})
</script>

<template>
  <FormProvider :form="form">
    <Field name="input" title="输入框" :component="[ElInput]" />
  </FormProvider>
</template>
