<script setup lang="ts">
import { createForm, setValidateLanguage } from '@formily/core'
import {
  connect,
  Field,
  FormProvider,
  mapProps,
  mapReadPretty,
} from '@silver-formily/vue'
import { ElInput, ElFormItem, ElForm } from 'element-plus'
import { defineComponent, h } from 'vue'

setValidateLanguage('en')

const FormItem = connect(
  ElFormItem,
  mapProps(
    {
      title: 'label',
      description: 'extra',
      required: true,
      validateStatus: true,
    },
    (props, field) => ({
      ...props,
      help: field.selfErrors?.length ? field.selfErrors : undefined,
    }),
  ),
)

const ReadPrettyInput = defineComponent({
  name: 'ReadPrettyInput',
  setup(_props, { attrs }) {
    return () => h('div', {}, [attrs.value as any])
  },
})

const Input = connect(
  ElInput,
  mapReadPretty(ReadPrettyInput),
)

const form = createForm({ validateFirst: true, readPretty: true })
</script>

<template>
  <FormProvider :form="form">
    <ElForm layout="vertical">
      <Field
        name="name"
        title="Name"
        required
        initialValue="Hello world"
        :decorator="[FormItem]"
        :component="[Input, { placeholder: 'Please ElInput' }]"
      />
    </ElForm>
  </FormProvider>
</template>
