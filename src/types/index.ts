import type {
  Field,
  FieldDisplayTypes,
  FieldValidator,
  Form,
  FormPatternTypes,
  GeneralField,
  IFieldFactoryProps,
  IVoidFieldFactoryProps,
} from '@formily/core'
import type { ISchema, Schema, SchemaKey } from '@formily/json-schema'
import type { FormPathPattern } from '@formily/shared'
import type { Validator as FormilyValidator } from '@formily/validator'
import type { Component } from 'vue'

export interface VueComponentOptionsWithProps {
  props: Record<string, unknown>
}

type ComponentPropsOrRecord<T extends Component> = T extends VueComponentOptionsWithProps
  ? T['props']
  : Record<string, unknown>

export type VueComponentProps<T extends Component> = ComponentPropsOrRecord<T> & Record<string, unknown>

export interface IProviderProps {
  form: Form
}

export type IFieldProps<
  D extends Component = Component,
  C extends Component = Component,
> = IFieldFactoryProps<D, C>

export type IVoidFieldProps<
  D extends Component = Component,
  C extends Component = Component,
> = IVoidFieldFactoryProps<D, C>

export type IArrayFieldProps = IFieldProps
export type IObjectFieldProps = IFieldProps

export interface IReactiveFieldProps {
  fieldType: 'Field' | 'ArrayField' | 'ObjectField' | 'VoidField'
  fieldProps: IFieldProps | IVoidFieldProps
}

export interface IComponentMapper<T extends Component = Component> {
  (target: T): Component
}

export type IStateMapper<Props>
  = | {
    [key in keyof Field]?: keyof Props | boolean
  }
  | ((props: Props, field: GeneralField) => Props)

export type SchemaVueComponents = Record<string, Component>
export type SchemaExpressionScope = Record<string, unknown>

export interface ISchemaFieldVueFactoryOptions<
  Components extends SchemaVueComponents = SchemaVueComponents,
> {
  components?: Components
  scope?: SchemaExpressionScope
}

export interface ISchemaFieldProps extends Omit<IRecursionFieldProps, 'name' | 'schema'> {
  schema?: ISchema
  components?: {
    [key: string]: Component
  }
  scope?: SchemaExpressionScope
  name?: SchemaKey
}

export interface ISchemaMapper {
  (schema: Schema, name: SchemaKey): Schema
}

export interface ISchemaFilter {
  (schema: Schema, name: SchemaKey): boolean
}

export interface IRecursionFieldProps {
  schema: Schema | ISchema
  name?: SchemaKey
  basePath?: FormPathPattern
  onlyRenderProperties?: boolean
  onlyRenderSelf?: boolean
  mapProperties?: ISchemaMapper
  filterProperties?: ISchemaFilter
}

export type ComponentPath<T, Key extends keyof T = keyof T> = Key extends string ? Key : never

export type ComponentPropsByPathValue<
  T extends SchemaVueComponents,
  P extends ComponentPath<T>,
> = P extends keyof T ? VueComponentProps<T[P]> : never

export type ISchemaMarkupFieldProps<
  Components extends SchemaVueComponents = SchemaVueComponents,
  Decorator extends ComponentPath<Components> = ComponentPath<Components>,
  Component extends ComponentPath<Components> = ComponentPath<Components>,
> = ISchema<
  Decorator,
  Component,
  ComponentPropsByPathValue<Components, Decorator>,
  ComponentPropsByPathValue<Components, Component>,
  FormPatternTypes,
  FieldDisplayTypes,
  FieldValidator,
  string,
  GeneralField
>

export type ISchemaTypeFieldProps<
  Components extends SchemaVueComponents = SchemaVueComponents,
  Decorator extends ComponentPath<Components> = ComponentPath<Components>,
  Component extends ComponentPath<Components> = ComponentPath<Components>,
> = Omit<ISchemaMarkupFieldProps<Components, Decorator, Component>, 'type'>

export interface IExpressionScopeProps {
  value: SchemaExpressionScope
}

export type { FormilyValidator }
