<template>
  <FormProvider :form="form">
    <Form layout="vertical">
      <Field
        name="name"
        title="Name"
        required
        initialValue="Hello world"
        :decorator="[FormItem]"
        :component="[ElInput, { placeholder: 'Please ElInput' }]"
      />
    </Form>
  </FormProvider>
</template>

<script>
import { Form, ElInput as AntdInput } from 'element-plus'
import { createForm, setValidateLanguage } from '@formily/core'
import {
  FormProvider,
  Field,
  connect,
  mapProps,
  mapReadPretty,
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

const ElInput = connect(
  AntdInput,
  mapReadPretty({
    props: ['value'],
    // you need import "h" from "vue" in vue3
    render(h) {
      return h('div', [this.value])
    },
  })
)

export default {
  components: {
    FormProvider,
    Field,
    Form,
  },
  data() {
    const form = createForm({ validateFirst: true, readPretty: true })
    return {
      FormItem,
      ElInput,
      form,
    }
  },
}
</script>
