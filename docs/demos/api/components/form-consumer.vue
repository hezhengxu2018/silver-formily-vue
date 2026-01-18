<script>
import { createForm } from '@formily/core'
import { Field, FormConsumer, FormProvider } from '@silver-formily/vue'
import { ElInput } from 'element-plus'

export default {
  components: { FormProvider, Field, FormConsumer },
  data() {
    return {
      ElInput,
      form: createForm(),
    }
  },
}
</script>

<template>
  <FormProvider :form="form">
    <Field name="input" :component="[ElInput]" />
    <FormConsumer>
      <template #default="{ form }">
        {{ form.values.input }}
      </template>
    </FormConsumer>
  </FormProvider>
</template>
