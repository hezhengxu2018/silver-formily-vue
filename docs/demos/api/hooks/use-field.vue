<script setup lang="ts">
import { createForm, setValidateLanguage } from '@formily/core'
import { observer } from '@formily/reactive-vue'
import { Field, FormConsumer, FormProvider, useField } from '@silver-formily/vue'
import { ElButton, ElFormItem, ElInput } from 'element-plus'
import { defineComponent, h } from 'vue'

setValidateLanguage('en')

const FormItem = observer(
  defineComponent({
    setup(props, { slots }) {
      const fieldRef = useField()
      return () => {
        const field = fieldRef.value
        return h(
          ElFormItem,
          {
            props: {
              label: field.title,
              required: field.required,
              help: field.selfErrors?.length ? field.selfErrors : undefined,
              extra: field.description,
              validateStatus: field.validateStatus,
            },
          },
          slots?.default(),
        )
      }
    },
  }),
)

const form = createForm({ validateFirst: true })

function log(values: string) {
  console.warn('Form Submitted:', values)
}
</script>

<template>
  <FormProvider :form="form">
    <Form layout="vertical">
      <Field
        name="name"
        title="Name"
        required
        :decorator="[FormItem]"
        :component="[ElInput, { placeholder: 'Please ElInput' }]"
      />
      <FormConsumer>
        <template #default="{ form }">
          <div style="white-space: pre; margin-bottom: 16px">
            {{ JSON.stringify(form.values, null, 2) }}
          </div>
          <ElButton
            type="primary"
            @click="
              () => {
                form.submit(log)
              }
            "
          >
            Submit
          </ElButton>
        </template>
      </FormConsumer>
    </Form>
  </FormProvider>
</template>
