---
order: 0
---

# Field

## 描述

作为@formily/core 的 [createField](https://core.formilyjs.org/api/models/form#createfield) Vue 实现，它是专门用于将 ViewModel 与输入控件做绑定的桥接组件，Field 组件属性参考[IFieldFactoryProps](https://core.formilyjs.org/api/models/form#ifieldfactoryprops)

::: warning 注意
name 属性必填。
:::

## 用例

::: demo
api/components/field
:::

## API

### Field 属性

| 属性            | 说明                                                                                   | 类型                                                                 | 默认值         |
| --------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------- |
| name            | 字段在 Form 中的路径，必须唯一                                                         | [FormPathPattern](#FormPathPattern)                                  | —              |
| basePath        | 推导 `name` 的基准路径，常用于局部表单或数组项                                         | [FormPathPattern](#FormPathPattern)                                  | 当前表单根路径 |
| title           | 字段展示标题，通常映射到装饰器组件的 `label`                                           | `string` \| `VNode`                                                  | —              |
| description     | 字段辅助描述信息                                                                       | `string` \| `VNode`                                                  | —              |
| value           | 字段当前值（受控模式）                                                                 | `any`                                                                | —              |
| initialValue    | 字段初始值（只在首次挂载时生效）                                                       | `any`                                                                | —              |
| required        | 是否必填，会驱动校验与 UI 状态                                                         | `boolean`                                                            | `false`        |
| display         | 展示状态：`visible`、`hidden`、`none`                                                  | ^[enum]`'visible' \| 'hidden' \| 'none'`                             | `visible`      |
| pattern         | 交互模式：`editable`、`readOnly`、`disabled`、`readPretty`                             | ^[enum]`'editable' \| 'readOnly' \| 'disabled' \| 'readPretty'`      | `editable`     |
| hidden          | 强制隐藏 DOM（等价于 `display: none`）                                                 | `boolean`                                                            | `false`        |
| visible         | 控制是否渲染在 DOM 树中                                                                | `boolean`                                                            | `true`         |
| editable        | 是否允许编辑                                                                           | `boolean`                                                            | `true`         |
| disabled        | 是否禁用（组件不可交互）                                                               | `boolean`                                                            | `false`        |
| readOnly        | 是否只读（仍可聚焦但不可修改）                                                         | `boolean`                                                            | `false`        |
| readPretty      | 是否进入只读展示态（常配合 Pretty 组件）                                               | `boolean`                                                            | `false`        |
| dataSource      | 组件可选项数据源，数据结构实际上并无要求，组件能消费即可                               | `any`                                                                | -              |
| validateFirst   | 校验失败时是否立即停止后续规则                                                         | `boolean`                                                            | `false`        |
| validatePattern | 仅在指定 `pattern` 下触发的校验                                                        | ^[enum]`'editable' \| 'readOnly' \| 'disabled' \| 'readPretty'`      | —              |
| validateDisplay | 仅在指定 `display` 下触发的校验                                                        | ^[enum]`'visible' \| 'hidden' \| 'none'`                             | —              |
| validator       | 自定义校验器，签名与 Formily `validator` 一致（在本库中类型为 `SchemaFieldValidator`） | [FieldValidator](#FieldValidator)                                    | —              |
| decorator       | 装饰器组件及其 props，形如 `[Decorator, props]`                                        | `[Component, Props?]` \| `false`                                     | `false`        |
| component       | 输入组件及其 props，形如 `[Component, props]`                                          | `[Component, Props?]` \| `false`                                     | `false`        |
| reactions       | 响应式副作用，支持函数或函数数组                                                       | [FieldReaction](#FieldReaction) \| [FieldReaction](#FieldReaction)[] | —              |
| content         | 装饰器插槽内容（通常是 `default` 槽）                                                  | `any`                                                                | —              |
| data            | 透传的扩展数据，可在副作用或组件中读取                                                 | `any`                                                                | —              |

### Field 插槽

| 插槽名  | 说明     | 类型                                    |
| ------- | -------- | --------------------------------------- |
| default | 默认插槽 | ^[object]`{ form: Form, field: Field }` |

### 类型声明

#### FormPathPattern

```ts
type FormPathPattern = string | number | Array<string | number> | RegExp
```

#### FieldValidator

```ts
type FieldValidator<Context = any>
  = | ValidatorDescription<Context>
    | MultiValidator<Context>
```

```ts
// 非数组型校验器
type ValidatorDescription
  = | ValidatorFormats
    | ValidatorFunction<Context>
    | IValidatorRules<Context>

// 数组型校验器
type MultiValidator<Context = any> = ValidatorDescription<Context>[]
```

```ts
// 对象型校验器
interface IValidatorRules<Context = any> {
  triggerType?: 'onInput' | 'onFocus' | 'onBlur'
  format?: ValidatorFormats
  validator?: ValidatorFunction<Context>
  required?: boolean
  pattern?: RegExp | string
  max?: number
  maximum?: number
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
  maxItems?: number
  maxLength?: number
  minItems?: number
  minLength?: number
  message?: string
  [key: string]: any // 其他属性需要通过registerValidateRules进行注册
}
// 函数型校验器校验结果类型
type ValidatorFunctionResponse = null | string | boolean | IValidateResult

// 函数型校验器
type ValidatorFunction<Context = any> = (
  value: any,
  rule: IValidatorRules<Context>,
  ctx: Context
) => ValidatorFunctionResponse | Promise<ValidatorFunctionResponse> | null
```

```ts
// 字符串型格式校验器
type ValidatorFormats
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
    | (string & {}) // 其他格式校验器需要通过registerValidateFormats进行注册

// 对象型校验结果
interface IValidateResult {
  type: 'error' | 'warning' | 'success' | (string & {})
  message: string
}
```

#### FieldReaction

```ts
type FieldReaction = (field: GeneralField) => void
```
