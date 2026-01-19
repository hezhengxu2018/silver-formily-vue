<script setup lang="tsx">
import { createForm } from '@formily/core'
import {
  FormProvider,
  ObjectField,
  VoidField,
  useParentForm,
} from '@silver-formily/vue'
import { observer } from '@formily/reactive-vue'
import { defineComponent } from 'vue'
import { ElText } from "element-plus";

const Custom = observer(
  defineComponent({
    name: 'Custom',
    setup() {
      const formRef = useParentForm()
      return () => (
        <p>
          <ElText>{formRef.value?.displayName}</ElText>
        </p>
      )
    },
  })
)

const form = createForm()
</script>

<template>
  <FormProvider :form="form">
    <ObjectField name="object">
      <Custom />
    </ObjectField>
    <Custom />
    <VoidField name="void">
      <Custom />
    </VoidField>
  </FormProvider>
</template>
