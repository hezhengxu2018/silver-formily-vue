<script lang="ts" setup>
import { createForm } from '@formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/vue'
import Addition from './array-base/array-base-addition.vue'
import ArrayCards from './array-cards.vue'
import FormItem from './form-item.vue'
import Input from './input.vue'

const form = createForm()

const {
  SchemaField,
  SchemaArrayField,
  SchemaVoidField,
  SchemaStringField,
} = createSchemaField({
  components: {
    FormItem,
    Input,
    ArrayCards,
    Addition,
  },
})
</script>

<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaArrayField
        name="string_array"
        :max-items="3"
        x-decorator="FormItem"
        x-component="ArrayCards"
        :x-component-props="{
          title: '字符串数组',
        }"
      >
        <SchemaVoidField>
          <SchemaStringField
            name="input"
            x-decorator="FormItem"
            title="Input"
            required
            x-component="Input"
          />
        </SchemaVoidField>
        <SchemaVoidField x-component="Addition" title="添加条目" />
      </SchemaArrayField>
    </SchemaField>
  </FormProvider>
</template>

<style lang="scss" scoped></style>
