<template>
  <FormProvider :form="form">
    <ElSpace>
      <Field
        name="name"
        title="Name"
        required
        :component="[ElInput, { placeholder: 'Please ElInput' }]"
      />
      <FormPreviewer />
    </ElSpace>
  </FormProvider>
</template>

<script>
import { defineComponent, h } from 'vue'
import { createForm } from '@formily/core'
import { FormProvider, Field, useForm } from '@silver-formily/vue'
import { observer } from '@formily/reactive-vue'
import { ElInput, ElSpace } from 'element-plus'


const FormPreviewer = observer(
  defineComponent({
    name: 'FormPreviewer',
    setup() {
      const formRef = useForm()
      return () => {
        const form = formRef.value
        return h('div', [JSON.stringify(form.values)])
      }
    },
  })
)

export default {
  components: {
    FormProvider,
    Field,
    FormPreviewer,
    ElSpace,
  },
  data() {
    const form = createForm({ validateFirst: true })
    return {
      ElInput,
      form,
    }
  },
}
</script>
