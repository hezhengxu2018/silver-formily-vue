<script setup lang="ts">
import type { GeneralField } from '@formily/core'
import type { Ref } from 'vue'
import type { IReactiveFieldProps, VueComponentProps } from '../types'
import { isVoidField } from '@formily/core'
import { toJS } from '@formily/reactive'
import { each, FormPath } from '@formily/shared'
import {
  computed,
  Fragment,
  h,
  inject,
  provide,
  ref,
  shallowRef,
  useSlots,
  watch,
} from 'vue'
import { useField, useForm } from '../hooks'
import { useAttach } from '../hooks/useAttach'
import { FieldSymbol, SchemaOptionsSymbol } from '../shared'

defineOptions({
  name: 'ReactiveField',
})

const props = withDefaults(defineProps<IReactiveFieldProps>(), {
  fieldType: 'Field',
  fieldProps: () => ({} as IReactiveFieldProps['fieldProps']),
})

function isVueOptions(options: Record<string, unknown>) {
  return (
    typeof options.template === 'string'
    || typeof options.render === 'function'
    || typeof options.setup === 'function'
  )
}

function resolveComponent(render: () => unknown[], extra?: any) {
  if (extra === undefined || extra === null) {
    return render
  }
  if (typeof extra === 'string') {
    return () => [...render(), extra]
  }
  if (!isVueOptions(extra) && typeof extra !== 'function') {
    return render
  }
  if (extra.length > 1 || extra?.render?.length > 1) {
    return (scopedProps: VueComponentProps<any>) => [
      ...render(),
      h(extra, { props: scopedProps }, {}),
    ]
  }
  return () => [...render(), h(extra, {}, {})]
}

function mergeSlots(field: GeneralField, slots: Record<string, any>, content: any): Record<string, (...args: any) => any[]> {
  const slotNames = Object.keys(slots)
  if (!slotNames.length) {
    if (!content) {
      return {}
    }
    if (typeof content === 'string') {
      return {
        default: resolveComponent(() => [], content),
      }
    }
  }
  const patchSlot
    = (slotName: string) =>
      (...originArgs) =>
        slots[slotName]?.({ field, form: field.form, ...originArgs[0] }) ?? []

  const patchedSlots: Record<string, (...args: any) => unknown[]> = {}
  slotNames.forEach((name) => {
    patchedSlots[name] = patchSlot(name)
  })

  if (content && typeof content === 'object' && !isVueOptions(content)) {
    Object.keys(content).forEach((key) => {
      const child = content[key]
      const slot = patchedSlots[key] ?? (() => [])
      patchedSlots[key] = resolveComponent(slot, child)
    })
    return patchedSlots
  }
  patchedSlots.default = resolveComponent(
    patchedSlots.default ?? (() => []),
    content,
  )
  return patchedSlots
}

interface ComponentBindings {
  component: any
  attrs: Record<string, any>
  style?: any
  class?: any
  events: Record<string, any>
}

const slots = useSlots()
const formRef = useForm()
const parentRef = useField()
const optionsRef = inject(SchemaOptionsSymbol, ref(null))

function createField() {
  return formRef?.value?.[`create${props.fieldType}`]?.({
    ...props.fieldProps,
    basePath: props.fieldProps?.basePath ?? parentRef.value?.address,
  })
}

const fieldRef = shallowRef(createField()) as Ref<GeneralField>

watch(
  () => props.fieldProps,
  () => (fieldRef.value = createField()),
)

useAttach(fieldRef)
provide(FieldSymbol, fieldRef)

const mergedSlots = computed<Record<string, (...args: any) => any[]>>(() => {
  if (!fieldRef.value) {
    return {}
  }
  return mergeSlots(fieldRef.value, slots, fieldRef.value.content)
})

const decoratorBindings = computed<ComponentBindings | null>(() => {
  const field = fieldRef.value
  if (!field || !field.decoratorType) {
    return null
  }
  const options = optionsRef.value
  const component = FormPath.getIn(options?.components, field.decoratorType as string)
    ?? field.decoratorType
  const componentAttrs = { ...(toJS(field.decorator?.[1]) || {}) }
  const events: Record<string, any> = {}
  each(componentAttrs, (value, eventKey) => {
    const onEvent = eventKey.startsWith('on')
    const atEvent = eventKey.startsWith('@')
    if (!onEvent && !atEvent)
      return
    if (onEvent) {
      const eventName = `${eventKey[2].toLowerCase()}${eventKey.slice(3)}`
      events[eventName] = events[eventName] || value
    }
    else if (atEvent) {
      const eventName = eventKey.slice(1)
      events[eventName] = value
      delete componentAttrs[eventKey]
    }
  })

  const style = componentAttrs.style
  const klass = componentAttrs.class
  delete componentAttrs.style
  delete componentAttrs.class

  return {
    component,
    attrs: componentAttrs,
    style,
    class: klass,
    events,
  }
})

const componentBindings = computed<ComponentBindings | null>(() => {
  const field = fieldRef.value
  if (!field || !field.componentType) {
    return null
  }
  const options = optionsRef.value
  const component = FormPath.getIn(options?.components, field.componentType as string)
    ?? field.componentType
  const rawAttrs = { ...(toJS(field.component?.[1]) || {}) }
  const attrs = { ...rawAttrs }
  const events: Record<string, any> = {}
  const originChange = rawAttrs['@change'] || rawAttrs.onChange
  const originFocus = rawAttrs['@focus'] || rawAttrs.onFocus
  const originBlur = rawAttrs['@blur'] || rawAttrs.onBlur

  each(rawAttrs, (value, eventKey) => {
    const onEvent = eventKey.startsWith('on')
    const atEvent = eventKey.startsWith('@')
    if (!onEvent && !atEvent)
      return
    if (onEvent) {
      const eventName = `${eventKey[2].toLowerCase()}${eventKey.slice(3)}`
      events[eventName] = events[eventName] || value
    }
    else if (atEvent) {
      const eventName = eventKey.slice(1)
      events[eventName] = value
      delete attrs[eventKey]
    }
  })

  events.change = (...args: any[]) => {
    if (!isVoidField(field))
      field.onInput(...args)
    originChange?.(...args)
  }
  events.focus = (...args: any[]) => {
    if (!isVoidField(field))
      field.onFocus(...args)
    originFocus?.(...args)
  }
  events.blur = (...args: any[]) => {
    if (!isVoidField(field))
      field.onBlur(...args)
    originBlur?.(...args)
  }

  const attrsWithState = {
    disabled: !isVoidField(field)
      ? field.pattern === 'disabled' || field.pattern === 'readPretty'
      : undefined,
    readOnly: !isVoidField(field)
      ? field.pattern === 'readOnly'
      : undefined,
    ...attrs,
    value: !isVoidField(field) ? field.value : undefined,
  }

  const style = attrsWithState.style
  const klass = attrsWithState.class
  delete attrsWithState.style
  delete attrsWithState.class

  return {
    component,
    attrs: attrsWithState,
    style,
    class: klass,
    events,
  }
})

const defaultOnlySlots = computed(() => ({
  default: mergedSlots.value.default ?? slots.default ?? (() => []),
}))

const isVisible = computed(() => fieldRef.value?.display === 'visible')
const hasDecorator = computed(() => Boolean(decoratorBindings.value))
const hasComponent = computed(() => Boolean(componentBindings.value))
const field = fieldRef
</script>

<template>
  <slot v-if="!field" />
  <template v-else-if="!isVisible" />
  <component
    :is="decoratorBindings?.component"
    v-else-if="hasDecorator"
    v-bind="decoratorBindings?.attrs"
    :style="decoratorBindings?.style"
    :class="decoratorBindings?.class"
    v-on="decoratorBindings?.events"
  >
    <component
      :is="componentBindings?.component"
      v-if="hasComponent"
      v-slots="mergedSlots"
      v-bind="componentBindings?.attrs"
      :style="componentBindings?.style"
      :class="componentBindings?.class"
      v-on="componentBindings?.events"
    />
    <component
      :is="Fragment"
      v-else
      v-slots="defaultOnlySlots"
    />
  </component>
  <template v-else>
    <component
      :is="componentBindings?.component"
      v-if="hasComponent"
      v-slots="mergedSlots"
      v-bind="componentBindings?.attrs"
      :style="componentBindings?.style"
      :class="componentBindings?.class"
      v-on="componentBindings?.events"
    />
    <component
      :is="Fragment"
      v-else
      v-slots="defaultOnlySlots"
    />
  </template>
</template>
