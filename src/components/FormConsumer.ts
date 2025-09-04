import { observer } from '@formily/reactive-vue'
import { defineComponent, Fragment, h } from 'vue'
import { useForm } from '../hooks'

export default observer(
  defineComponent({
    name: 'FormConsumer',
    inheritAttrs: false,
    setup(props, { slots }) {
      const formRef = useForm()
      return () => {
        return h(
          Fragment,
          {
            default: () =>
              slots.default?.({
                form: formRef.value,
              }),
          },
        )
      }
    },
  }),
  {
    // make sure observables updated <cannot be tracked by tests>
    scheduler: /* istanbul ignore next */ update =>
      Promise.resolve().then(update),
  },
)
