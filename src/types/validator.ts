export type ValidatorFormats
  = | 'url'
    | 'email'
    | 'ipv6'
    | 'ipv4'
    | 'number'
    | 'integer'
    | 'idcard'
    | 'qq'
    | 'phone'
    | 'money'
    | 'zh'
    | 'date'
    | 'zip'
    | (string & {})

export interface IValidateResult {
  type: 'error' | 'warning' | 'success' | (string & {})
  message: string
}

export type ValidatorFunctionResponse = null | string | boolean | IValidateResult

export interface IValidatorRules<Context = any> {
  triggerType?: 'onInput' | 'onFocus' | 'onBlur' | (string & {})
  format?: ValidatorFormats
  validator?: ValidatorFunction<Context>
  required?: boolean
  pattern?: RegExp | string
  max?: number
  maximum?: number
  maxItems?: number
  minItems?: number
  maxLength?: number
  minLength?: number
  exclusiveMaximum?: number
  exclusiveMinimum?: number
  minimum?: number
  min?: number
  len?: number
  whitespace?: boolean
  enum?: any[]
  const?: any
  multipleOf?: number
  uniqueItems?: boolean
  maxProperties?: number
  minProperties?: number
  message?: string
  [key: string]: any
}

export type ValidatorFunction<Context = any> = (
  value: any,
  rule: IValidatorRules<Context>,
  ctx: Context,
  render: (message: string, scope?: any) => string,
) => ValidatorFunctionResponse | Promise<ValidatorFunctionResponse> | null

export type ValidatorDescription<Context = any>
  = | ValidatorFormats
    | ValidatorFunction<Context>
    | IValidatorRules<Context>

export type MultiValidator<Context = any> = ValidatorDescription<Context>[]

export type Validator<Context = any> = ValidatorDescription<Context> | MultiValidator<Context>
