<script setup lang="tsx">
import { createForm } from '@formily/core'
import { observer } from '@formily/reactive-vue'
import { FormProvider, createSchemaField } from '@silver-formily/vue'
import { cloneVNode, defineComponent, isVNode, type PropType } from 'vue'

type SlotPayload = {
  slotProp: string
  onScopedFunc: (value: string) => void
}

const TextPreviewer = defineComponent({
  name: 'TextPreviewer',
  setup(_props, { slots }) {
    const handleScopedFunc = (value: string) => {
      // eslint-disable-next-line no-alert
      alert(value)
    }

    return () => (
      <div>
        {slots.default?.({
          slotProp: '有 default 作用域插槽组件的插槽属性值',
          onScopedFunc: handleScopedFunc,
        } as SlotPayload)}
      </div>
    )
  },
})

const ObservedComponent = observer(
  defineComponent({
    name: 'ObservedComponent',
    setup(_props, { slots }) {
      return () => (
        <TextPreviewer
          v-slots={{
            default: (payload: SlotPayload) => {
              const children = slots.default?.() ?? []
              return children.map((child) =>
                isVNode(child) ? cloneVNode(child, payload) : child,
              )
            },
          }}
        />
      )
    },
  }),
)

const ScopedSlotComponent = defineComponent({
  name: 'ScopedSlotComponent',
  props: {
    slotProp: {
      type: String,
      required: true,
    },
    onScopedFunc: {
      type: Function as PropType<(value: string) => void>,
      required: true,
    },
  },
  setup(props) {
    const handleClick = () => {
      props.onScopedFunc('作用域插槽传递事件函数，事件发生后进行值的回传')
    }

    return () => (
      <div onClick={handleClick}>
        {props.slotProp}
      </div>
    )
  },
})

const { SchemaField } = createSchemaField({
  components: {
    ObservedComponent,
  },
})

const schema = {
  type: 'object',
  properties: {
    textPreview: {
      type: 'string',
      'x-component': 'ObservedComponent',
      'x-content': {
        default: ScopedSlotComponent,
      },
    },
  },
}

const form = createForm()
</script>

<template>
  <FormProvider :form="form">
    <SchemaField :schema="schema" />
  </FormProvider>
</template>
