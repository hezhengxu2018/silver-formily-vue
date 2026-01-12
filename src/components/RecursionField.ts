import type { GeneralField } from '@formily/core'
import type { DefineComponent, IRecursionFieldProps } from '../types'
import { Schema } from '@formily/json-schema'
import { isFn, isValid, lazyMerge } from '@formily/shared'
import { computed, h, inject, markRaw, provide, shallowRef, watch } from 'vue'
import { useField } from '../hooks'
import {
  SchemaExpressionScopeSymbol,
  SchemaOptionsSymbol,
  SchemaSymbol,
} from '../shared'
import ArrayField from './ArrayField'
import Field from './Field.vue'
import ObjectField from './ObjectField.vue'

import VoidField from './VoidField.vue'

function resolveEmptySlot(slots: Record<any, (...args: any[]) => any[]>) {
  return Object.keys(slots).length
    ? h('div', { style: 'display:contents;' }, slots)
    : undefined
}

const RecursionField = {
  name: 'RecursionField',
  inheritAttrs: false,
  props: {
    schema: {
      required: true,
    },
    name: [String, Number],
    basePath: {},
    onlyRenderProperties: {
      type: Boolean,
      default: undefined,
    },
    onlyRenderSelf: {
      type: Boolean,
      default: undefined,
    },
    mapProperties: {},
    filterProperties: {},
  },
  setup(props: IRecursionFieldProps) {
    const parentRef = useField()
    const optionsRef = inject(SchemaOptionsSymbol)
    const scopeRef = inject(SchemaExpressionScopeSymbol)
    const createSchema = (schemaProp: IRecursionFieldProps['schema']) =>
      markRaw(new Schema(schemaProp))
    const fieldSchemaRef = computed(() => createSchema(props.schema))

    const getPropsFromSchema = (schema: Schema) =>
      schema?.toFieldProps?.({
        ...optionsRef.value,
        get scope() {
          return lazyMerge(optionsRef.value.scope, scopeRef.value)
        },
      })
    const fieldPropsRef = shallowRef(getPropsFromSchema(fieldSchemaRef.value))

    watch([fieldSchemaRef, optionsRef], () => {
      fieldPropsRef.value = getPropsFromSchema(fieldSchemaRef.value)
    })

    const getBasePath = () => {
      if (props.onlyRenderProperties) {
        return props.basePath ?? parentRef?.value?.address.concat(props.name)
      }
      return props.basePath ?? parentRef?.value?.address
    }

    provide(SchemaSymbol, fieldSchemaRef)

    return () => {
      const basePath = getBasePath()
      const fieldProps = fieldPropsRef.value
      const normalizedFieldProps = fieldProps as Record<string, any>

      const generateSlotsByProperties = (scoped = false) => {
        if (props.onlyRenderSelf)
          return {}
        const properties = Schema.getOrderProperties(fieldSchemaRef.value)
        if (!properties.length)
          return {}
        const renderMap: Record<string, ((field?: GeneralField) => unknown)[]>
          = {}
        const setRender = (
          key: string,
          value: (field?: GeneralField) => unknown,
        ) => {
          if (!renderMap[key]) {
            renderMap[key] = []
          }
          renderMap[key].push(value)
        }
        properties.forEach(({ schema: item, key: name }, index) => {
          let schema: Schema = item
          if (isFn(props.mapProperties)) {
            const mapped = props.mapProperties(item, name)
            if (mapped) {
              schema = mapped
            }
          }
          if (isFn(props.filterProperties)) {
            if (props.filterProperties(schema, name) === false) {
              return null
            }
          }
          setRender(schema['x-slot'] ?? 'default', (field?: GeneralField) =>
            h(
              RecursionField,
              {
                key: `${index}-${name}`,
                schema,
                name,
                basePath: field?.address ?? basePath,
                slot: schema['x-slot'],
              },
              {},
            ))
        })
        const slots = {}
        Object.keys(renderMap).forEach((key) => {
          const renderFns = renderMap[key]
          slots[key] = scoped
            ? ({ field }) => renderFns.map(fn => fn(field))
            : () => renderFns.map(fn => fn())
        })
        return slots
      }

      const render = () => {
        if (!isValid(props.name))
          return resolveEmptySlot(generateSlotsByProperties())
        if (fieldSchemaRef.value.type === 'object') {
          if (props.onlyRenderProperties)
            return resolveEmptySlot(generateSlotsByProperties())
          return h(
            ObjectField,
            {
              ...normalizedFieldProps,
              name: props.name,
              basePath,
            },
            generateSlotsByProperties(true),
          )
        }
        else if (fieldSchemaRef.value.type === 'array') {
          return h(
            ArrayField,
            {
              ...normalizedFieldProps,
              name: props.name,
              basePath,
            },
            {},
          )
        }
        else if (fieldSchemaRef.value.type === 'void') {
          if (props.onlyRenderProperties)
            return resolveEmptySlot(generateSlotsByProperties())
          const slots = generateSlotsByProperties(true)
          return h(
            VoidField,
            {
              ...normalizedFieldProps,
              name: props.name,
              basePath,
            },
            slots,
          )
        }

        return h(
          Field,
          {
            ...normalizedFieldProps,
            name: props.name,
            basePath,
          },
          {},
        )
      }

      if (!fieldSchemaRef.value)
        return

      return render()
    }
  },
} as unknown as DefineComponent<IRecursionFieldProps>

export default RecursionField
