<script>
import { createForm } from '@formily/core'
import { observer } from '@formily/reactive-vue'
import {
  createSchemaField,
  FormProvider,
  RecursionField,
  useField,
  useFieldSchema,
} from '@silver-formily/vue'
import { ElButton, ElInput, ElSpace } from 'element-plus'
import { defineComponent, h } from 'vue'

const ArrayItems = observer(
  defineComponent({
    setup() {
      const fieldRef = useField()
      const schemaRef = useFieldSchema()

      return () => {
        const field = fieldRef.value
        const schema = schemaRef.value
        const items = field.value?.map((item, index) => {
          return h('div', { key: item.id, style: { marginBottom: '10px' } }, [
            h(ElSpace, [
              // params of render function is different in vue3
              h(RecursionField, {
                props: { schema: schema.items, name: index },
              }),
              h(ElButton, { on: { click: () => field.remove(index) } }, [
                'Remove',
              ]),
            ]),
          ])
        })
        const button = h(
          ElButton,
          { on: { click: () => field.push({ id: Date.now() }) } },
          ['Add'],
        )
        return h('div', [items, Elbutton])
      }
    },
  }),
)

const { SchemaField, SchemaStringField, SchemaArrayField, SchemaObjectField }
  = createSchemaField({
    components: {
      ArrayItems,
      ElInput,
    },
  })

export default {
  components: {
    FormProvider,
    SchemaField,
    SchemaStringField,
    SchemaArrayField,
    SchemaObjectField,
  },
  data() {
    return {
      form: createForm(),
    }
  },
}
</script>

<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaArrayField name="custom" x-component="ArrayItems">
        <SchemaObjectField>
          <SchemaStringField name="input" x-component="ElInput" />
        </SchemaObjectField>
      </SchemaArrayField>
    </SchemaField>
  </FormProvider>
</template>
