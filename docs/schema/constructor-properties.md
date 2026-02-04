# 介绍

## 构造器

```ts
class Schema {
  constructor(json: ISchema, parent?: ISchema)
}
```

基于一份 json schema 数据创建一棵 Schema Tree，保证每个 schema 节点都是包含对应方法的

## 属性

| 属性                 | 描述                                              | 类型                                                                               | 字段模型映射                                                             |
| -------------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| type                 | 类型                                              | [SchemaTypes](#schematypes)                                                        | [GeneralField](https://core.formilyjs.org/api/models/field#generalfield) |
| title                | 标题                                              | React.ReactNode                                                                    | `title`                                                                  |
| description          | 描述                                              | React.ReactNode                                                                    | `description`                                                            |
| default              | 默认值                                            | Any                                                                                | `initialValue`                                                           |
| readOnly             | 是否只读                                          | Boolean                                                                            | `readOnly`                                                               |
| writeOnly            | 是否只写                                          | Boolean                                                                            | `editable`                                                               |
| enum                 | 枚举                                              | [SchemaEnum](#schemaenum)                                                          | `dataSource`                                                             |
| const                | 校验字段值是否与 const 的值相等                   | Any                                                                                | `validator`                                                              |
| multipleOf           | 校验字段值是否可被 multipleOf 的值整除            | Number                                                                             | `validator`                                                              |
| maximum              | 校验最大值(大于)                                  | Number                                                                             | `validator`                                                              |
| exclusiveMaximum     | 校验最大值（大于等于                              | Number                                                                             | `validator`                                                              |
| minimum              | 校验最小值(小于)                                  | Number                                                                             | `validator`                                                              |
| exclusiveMinimum     | 最小值（小于等于）                                | Number                                                                             | `validator`                                                              |
| maxLength            | 校验最大长度                                      | Number                                                                             | `validator`                                                              |
| minLength            | 校验最小长度                                      | Number                                                                             | `validator`                                                              |
| pattern              | 正则校验规则                                      | RegExpString                                                                       | `validator`                                                              |
| maxItems             | 最大条目数                                        | Number                                                                             | `validator`                                                              |
| minItems             | 最小条目数                                        | Number                                                                             | `validator`                                                              |
| uniqueItems          | 是否校验重复                                      | Boolean                                                                            | `validator`                                                              |
| maxProperties        | 最大属性数量                                      | Number                                                                             | `validator`                                                              |
| minProperties        | 最小属性数量                                      | Number                                                                             | `validator`                                                              |
| required             | 必填                                              | Boolean                                                                            | `validator`                                                              |
| format               | 正则校验格式                                      | [ValidatorFormats](https://core.formilyjs.org/api/models/field#fieldvalidator)     | `validator`                                                              |
| properties           | 属性描述                                          | [SchemaProperties](#schemaproperties)                                              | -                                                                        |
| items                | 数组描述                                          | [SchemaItems](#schemaitems)                                                        | -                                                                        |
| additionalItems      | 额外数组元素描述                                  | Schema                                                                             | -                                                                        |
| patternProperties    | 动态匹配对象的某个属性的 Schema                   | [SchemaProperties](#schemaproperties)                                              | -                                                                        |
| additionalProperties | 匹配对象额外属性的 Schema                         | Schema                                                                             | -                                                                        |
| x-index              | UI 展示顺序                                       | Number                                                                             | -                                                                        |
| x-pattern            | UI 交互模式                                       | [FieldPatternTypes](https://core.formilyjs.org/api/models/field#fieldpatterntypes) | `pattern`                                                                |
| x-display            | UI 展示                                           | [FieldDisplayTypes](https://core.formilyjs.org/api/models/field#fielddisplaytypes) | `display`                                                                |
| x-validator          | 字段校验器                                        | [FieldValidator](https://core.formilyjs.org/api/models/field#fieldvalidator)       | `validator`                                                              |
| x-decorator          | 字段 UI 包装器组件                                | `String \| React.FC`                                                               | `decorator`                                                              |
| x-decorator-props    | 字段 UI 包装器组件属性                            | Any                                                                                | `decorator`                                                              |
| x-component          | 字段 UI 组件                                      | `String \| React.FC`                                                               | `component`                                                              |
| x-component-props    | 字段 UI 组件属性                                  | Any                                                                                | `component`                                                              |
| x-reactions          | 字段联动协议                                      | [SchemaReactions](#schemareactions)                                                | `reactions`                                                              |
| x-content            | 字段内容，用来传入某个组件的子节点                | React.ReactNode                                                                    | ReactChildren                                                            |
| x-visible            | 字段显示隐藏                                      | Boolean                                                                            | `visible`                                                                |
| x-hidden             | 字段 UI 隐藏(保留数据)                            | Boolean                                                                            | `hidden`                                                                 |
| x-disabled           | 字段禁用                                          | Boolean                                                                            | `disabled`                                                               |
| x-editable           | 字段可编辑                                        | Boolean                                                                            | `editable`                                                               |
| x-read-only          | 字段只读                                          | Boolean                                                                            | `readOnly`                                                               |
| x-read-pretty        | 字段阅读态                                        | Boolean                                                                            | `readPretty`                                                             |
| definitions          | Schema 预定义                                     | [SchemaProperties](#schemaproperties)                                              | -                                                                        |
| $ref                 | 从 Schema 预定义中读取 Schema 并合并至当前 Schema | String                                                                             | -                                                                        |
| x-data               | 扩展属性                                          | Object                                                                             | data                                                                     |

#### 详细说明

- x-component 的组件标识与[createSchemaField](/api/components/schema-field#签名)传入的组件集合的 Key 匹配
- x-decorator 的组件标识与[createSchemaField](/api/components/schema-field#签名)传入的组件集合的 Key 匹配
- Schema 的每个属性都能使用字符串表达式<code v-pre>{{expression}}</code>，表达式变量可以从 createSchemaField 中传入，也可以从 SchemaField 组件中传入
- $ref 指定 Schema 预定义的格式必须是<code v-pre>#/definitions/address</code>这种格式，不支持加载远程 JSON Schema
