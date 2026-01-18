<script>
import { createForm, onFieldReact } from '@formily/core'
import { Field, FormProvider, useFormEffects } from '@silver-formily/vue'
import { ElInput, Form } from 'element-plus'
import { defineComponent, h } from 'vue'

const Custom = defineComponent({
  setup() {
    useFormEffects(() => {
      onFieldReact('custom.bb', (field) => {
        field.value = field.query('.aa').get('value')
      })
    })
    return () =>
      h('div', {}, [
        h(
          Field,
          {
            props: {
              name: 'aa',
              decorator: [Form.Item],
              component: [ElInput, { placeholder: 'aa' }],
            },
          },
          {},
        ),
        h(
          Field,
          {
            props: {
              name: 'bb',
              decorator: [Form.Item],
              component: [ElInput, { placeholder: 'bb' }],
            },
          },
          {},
        ),
      ])
  },
})

export default {
  components: {
    FormProvider,
    Field,
  },
  data() {
    const form = createForm({
      effects() {
        onFieldReact('custom.aa', (field) => {
          field.value = field.query('input').get('value')
        })
      },
    })
    return {
      FormItem: Form.Item,
      ElInput,
      Custom,
      form,
    }
  },
}
</script>

<template>
  <FormProvider :form="form">
    <Field
      name="input"
      :decorator="[FormItem]"
      :component="[ElInput, { placeholder: 'input' }]"
    />
    <Field name="custom" :decorator="[FormItem]" :component="[Custom]" />
  </FormProvider>
</template>
