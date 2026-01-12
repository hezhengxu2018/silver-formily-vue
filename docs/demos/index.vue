<script lang="ts" setup>
import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import FormItem from './form-item.vue'
import Input from './index'

const form = createForm({
  initialValues: {
    input: 'Hello, Silver Formily Vue!',
  },
})
</script>

<template>
  <FormProvider :form="form">
    <Field name="input" title="输入框" :component="[Input]" :decorator="[FormItem]" />
  </FormProvider>
</template>
