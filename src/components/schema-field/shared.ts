import type { PropType } from "vue"
import type { ISchemaFieldProps, ISchemaMarkupFieldProps } from "../../types"

const env = {
  nonameId: 0,
}

export function resetNonameId() {
  env.nonameId = 0
}

export function getRandomName() {
  return `NO_NAME_FIELD_$${env.nonameId++}`
}

export const schemaFieldProps = {
  schema: {},
  scope: {},
  components: {},
  name: [String, Number],
  basePath: {},
  onlyRenderProperties: { type: Boolean, default: undefined },
  onlyRenderSelf: { type: Boolean, default: undefined },
  mapProperties: {} as PropType<ISchemaFieldProps['mapProperties']>,
  filterProperties: {} as PropType<ISchemaFieldProps['filterProperties']>,
} satisfies Record<string, any>

export const markupProps = {
  version: String,
  name: [String, Number],
  title: {},
  description: {},
  default: {},
  readOnly: {
    type: Boolean,
    default: undefined,
  },
  writeOnly: {
    type: Boolean,
    default: undefined,
  },
  enum: {},
  const: {},
  multipleOf: Number,
  maximum: Number,
  exclusiveMaximum: Number,
  minimum: Number,
  exclusiveMinimum: Number,
  maxLength: Number,
  minLength: Number,
  pattern: {},
  maxItems: Number,
  minItems: Number,
  uniqueItems: {
    type: Boolean,
    default: undefined,
  },
  maxProperties: Number,
  minProperties: Number,
  required: {
    type: [Boolean, Array, String],
    default: undefined,
  },
  format: String,
  properties: {},
  items: {},
  additionalItems: {},
  patternProperties: {},
  additionalProperties: {},
  xIndex: Number,
  xPattern: {},
  xDisplay: {},
  xValidator: {},
  xDecorator: {},
  xDecoratorProps: {},
  xComponent: {},
  xComponentProps: {},
  xReactions: {},
  xContent: {},
  xVisible: {
    type: Boolean,
    default: undefined,
  },
  xHidden: {
    type: Boolean,
    default: undefined,
  },
  xDisabled: {
    type: Boolean,
    default: undefined,
  },
  xEditable: {
    type: Boolean,
    default: undefined,
  },
  xReadOnly: {
    type: Boolean,
    default: undefined,
  },
  xReadPretty: {
    type: Boolean,
    default: undefined,
  },
} satisfies Record<keyof ISchemaMarkupFieldProps | string, any>
