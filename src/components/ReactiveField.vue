<script setup lang="ts">
import type { GeneralField } from '@formily/core'
import type { PropType, Ref } from 'vue'
import type { IFieldProps, IVoidFieldProps, VueComponentProps } from '../types'
import { isVoidField } from '@formily/core'
import { autorun, toJS } from '@formily/reactive'
import { useObserver } from '@formily/reactive-vue'
import { each, FormPath } from '@formily/shared'
import {
  computed,
  Fragment,
  h,
  inject,
  onBeforeUnmount,
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

type FieldRendererProps = IFieldProps | IVoidFieldProps

const props = defineProps({
  fieldType: {
    type: String as PropType<'Field' | 'ArrayField' | 'ObjectField' | 'VoidField'>,
    default: 'Field',
  },
  fieldProps: {
    type: Object as PropType<FieldRendererProps>,
    default: () => ({} as FieldRendererProps),
  },
})

useObserver()

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
      h(extra, { props: scopedProps }),
    ]
  }
  return () => [...render(), h(extra)]
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

function resolveDecoratorBindings(field: GeneralField, options: any): ComponentBindings | null {
  if (!field?.decoratorType) {
    return null
  }
  const component = FormPath.getIn(
    options?.components,
    field.decoratorType as string,
  ) ?? field.decoratorType
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
}

function resolveComponentBindings(field: GeneralField, options: any): ComponentBindings | null {
  if (!field?.componentType) {
    return null
  }
  const component = FormPath.getIn(
    options?.components,
    field.componentType as string,
  ) ?? field.componentType
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

const mergedSlots = ref<Record<string, (...args: any) => any[]>>({})
const decoratorBindings = ref<ComponentBindings | null>(null)
const componentBindings = ref<ComponentBindings | null>(null)
const isVisible = ref(true)

const defaultOnlySlots = computed(() => ({
  default: mergedSlots.value.default ?? slots.default ?? (() => []),
}))

const hasDecorator = computed(() => Boolean(decoratorBindings.value))
const hasComponent = computed(() => Boolean(componentBindings.value))
const field = fieldRef

let stopBindingsReaction: (() => void) | null = null

function setupBindingsReaction() {
  stopBindingsReaction?.()
  stopBindingsReaction = autorun(() => {
    const fieldInstance = fieldRef.value
    const options = optionsRef.value
    if (!fieldInstance) {
      mergedSlots.value = {}
      decoratorBindings.value = null
      componentBindings.value = null
      isVisible.value = true
      return
    }
    mergedSlots.value = mergeSlots(fieldInstance, slots, fieldInstance.content)
    decoratorBindings.value = resolveDecoratorBindings(fieldInstance, options)
    componentBindings.value = resolveComponentBindings(fieldInstance, options)
    isVisible.value = fieldInstance.display === 'visible'
  })
}

watch(
  [fieldRef, optionsRef],
  () => setupBindingsReaction(),
  { immediate: true },
)

onBeforeUnmount(() => stopBindingsReaction?.())
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
      v-bind="componentBindings?.attrs"
      :style="componentBindings?.style"
      :class="componentBindings?.class"
      v-on="componentBindings?.events"
    >
      <template
        v-for="(mergedSlotFn, mergedSlotName) in mergedSlots"
        :key="mergedSlotName"
        #[mergedSlotName]="mergedSlotProps"
      >
        <component
          :is="mergedSlotFn"
          v-bind="mergedSlotProps"
        />
      </template>
    </component>
    <component
      :is="Fragment"
      v-else
    >
      <template
        v-for="(defaultSlotFn, defaultSlotName) in defaultOnlySlots"
        :key="defaultSlotName"
        #[defaultSlotName]="defaultSlotProps"
      >
        <component
          :is="defaultSlotFn"
          v-bind="defaultSlotProps"
        />
      </template>
    </component>
  </component>
  <template v-else>
    <component
      :is="componentBindings?.component"
      v-if="hasComponent"
      v-bind="componentBindings?.attrs"
      :style="componentBindings?.style"
      :class="componentBindings?.class"
      v-on="componentBindings?.events"
    >
      <template
        v-for="(mergedSlotFnFallback, mergedSlotNameFallback) in mergedSlots"
        :key="mergedSlotNameFallback"
        #[mergedSlotNameFallback]="mergedSlotPropsFallback"
      >
        <component
          :is="mergedSlotFnFallback"
          v-bind="mergedSlotPropsFallback"
        />
      </template>
    </component>
    <component
      :is="Fragment"
      v-else
    >
      <template
        v-for="(defaultSlotFnFallback, defaultSlotNameFallback) in defaultOnlySlots"
        :key="defaultSlotNameFallback"
        #[defaultSlotNameFallback]="defaultSlotPropsFallback"
      >
        <component
          :is="defaultSlotFnFallback"
          v-bind="defaultSlotPropsFallback"
        />
      </template>
    </component>
  </template>
</template>
