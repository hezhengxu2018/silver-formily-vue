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

<script>
import { Form, ElInput, ElButton } from 'element-plus'
import { createForm, setValidateLanguage } from '@formily/core'
import {
  FormProvider,
  FormConsumer,
  Field,
  connect,
  mapProps,
} from '@silver-formily/vue'


setValidateLanguage('en')

const FormItem = connect(
  Form.Item,
  mapProps(
    {
      title: 'label',
      description: 'extra',
      required: true,
      validateStatus: true,
    },
    (props, field) => {
      return {
        ...props,
        help: field.selfErrors?.length ? field.selfErrors : undefined,
      }
    }
  )
)

export default {
  components: {
    FormProvider,
    FormConsumer,
    Field,
    Form,
    ElButton,
  },
  data() {
    const form = createForm({ validateFirst: true })
    return {
      FormItem,
      ElInput,
      form,
    }
  },
  methods: {
    log(...args) {
      console.log(...args)
    },
  },
}
</script>
