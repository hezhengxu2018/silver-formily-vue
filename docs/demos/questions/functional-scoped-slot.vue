<script setup lang="tsx">
import type { PropType } from 'vue'
import { createForm } from '@formily/core'
import { observer } from '@formily/reactive-vue'
import { createSchemaField, FormProvider } from '@silver-formily/vue'
import { cloneVNode, defineComponent, h, isVNode } from 'vue'

const ObservedComponent = observer(
  defineComponent({
    name: 'ObservedComponent',
    setup(_props, { slots }) {
      const SELF_STRING = 'ObservedComponent组件中定义的字符串'
      return () => {
        const children = slots.default?.() ?? []
        return (
          <span>
            ObservedComponent组件的插槽内容：
            {children.map(child =>
              isVNode(child) ? cloneVNode(child, { string: SELF_STRING }) : child,
            )}
          </span>
        )
      }
    },
  }),
)

function ScopedSlotComponent(props) {
  const handleClick = () => {
    // eslint-disable-next-line no-alert
    alert('函数式组件内部定义的方法')
  }
  return h('div', { onClick: handleClick }, props.string)
}
ScopedSlotComponent.props = ['string']

const { SchemaField } = createSchemaField({
  components: {
    ObservedComponent,
  },
})

const schema = {
  type: 'object',
  properties: {
    textPreview: {
      'type': 'string',
      'x-component': 'ObservedComponent',
      'x-content': {
        default: slotProps => h(ScopedSlotComponent, slotProps),
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
