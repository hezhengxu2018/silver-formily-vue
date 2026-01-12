import type { SchemaTypes } from '@formily/json-schema'
import type { DefineComponent, ISchemaFieldProps, ISchemaFieldVueFactoryOptions, ISchemaMarkupFieldProps, ISchemaTypeFieldProps, SchemaVueComponents } from '../types'
import { defineComponent, h } from 'vue'
import MarkupFieldComponent from './schema-field/MarkupField.vue'
import SchemaFieldComponent from './schema-field/SchemaField.vue'
import { markupProps, schemaFieldProps } from './schema-field/shared'

interface SchemaFieldComponents {
  SchemaField: DefineComponent<ISchemaFieldProps>
  SchemaMarkupField: DefineComponent<ISchemaMarkupFieldProps>
  SchemaStringField: DefineComponent<ISchemaTypeFieldProps>
  SchemaObjectField: DefineComponent<ISchemaTypeFieldProps>
  SchemaArrayField: DefineComponent<ISchemaTypeFieldProps>
  SchemaBooleanField: DefineComponent<ISchemaTypeFieldProps>
  SchemaDateField: DefineComponent<ISchemaTypeFieldProps>
  SchemaDateTimeField: DefineComponent<ISchemaTypeFieldProps>
  SchemaVoidField: DefineComponent<ISchemaTypeFieldProps>
  SchemaNumberField: DefineComponent<ISchemaTypeFieldProps>
}

export function createSchemaField<
  Components extends SchemaVueComponents = SchemaVueComponents,
>(options: ISchemaFieldVueFactoryOptions<Components> = {}): SchemaFieldComponents {
  const SchemaField = defineComponent({
    name: 'SchemaField',
    inheritAttrs: false,
    props: {
      ...schemaFieldProps,
    },
    setup(props: ISchemaFieldProps, { slots }) {
      return () =>
        h(
          SchemaFieldComponent,
          {
            ...props,
            factoryOptions: options,
          },
          slots,
        )
    },
  }) as unknown as DefineComponent<ISchemaFieldProps>

  const SchemaFieldFactory = (type: SchemaTypes, name: string) =>
    defineComponent({
      name,
      props: { ...markupProps },
      setup(props: ISchemaTypeFieldProps, { slots }) {
        return () =>
          h(
            MarkupFieldComponent,
            {
              ...props,
              type,
            },
            slots,
          )
      },
    }) as unknown as DefineComponent<ISchemaTypeFieldProps>

  return {
    SchemaField,
    SchemaMarkupField: MarkupFieldComponent as unknown as DefineComponent<ISchemaMarkupFieldProps>,
    SchemaStringField: SchemaFieldFactory('string', 'SchemaStringField'),
    SchemaObjectField: SchemaFieldFactory('object', 'SchemaObjectField'),
    SchemaArrayField: SchemaFieldFactory('array', 'SchemaArrayField'),
    SchemaBooleanField: SchemaFieldFactory('boolean', 'SchemaBooleanField'),
    SchemaDateField: SchemaFieldFactory('date', 'SchemaDateField'),
    SchemaDateTimeField: SchemaFieldFactory('datetime', 'SchemaDatetimeField'),
    SchemaVoidField: SchemaFieldFactory('void', 'SchemaVoidField'),
    SchemaNumberField: SchemaFieldFactory('number', 'SchemaNumberField'),
  }
}
