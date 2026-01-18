<template>
  <FormProvider :form="form">
    <ElSpace>
      <Field name="input" :component="[ElInput]" />
      <Field name="custom" :component="[Custom]" />
    </ElSpace>
  </FormProvider>
</template>

<script>
import { defineComponent, h } from 'vue'
import { createForm } from '@formily/core'
import { FormProvider, Field, useForm } from '@silver-formily/vue'
import { observer } from '@formily/reactive-vue'
import { ElInput, ElSpace } from 'element-plus'


const Custom = observer(
  defineComponent({
    setup() {
      const formRef = useForm()
      return () => {
        const form = formRef.value
        return h('div', {}, [form.values.input])
      }
    },
  })
)

export default {
  components: {
    FormProvider,
    Field,
    ElSpace,
  },
  data() {
    const form = createForm({ validateFirst: true })
    return {
      ElInput,
      Custom,
      form,
    }
  },
}
</script>
