## 方法

### addProperty

#### 描述

添加属性描述

#### 签名

```ts
interface addProperty {
  (key: string | number, schema: ISchema): Schema // 返回添加后的Schema对象
}
```

### removeProperty

#### 描述

移除属性描述

#### 签名

```ts
interface removeProperty {
  (key: string | number): Schema // 返回被移除的Schema对象
}
```

### setProperties

#### 描述

覆盖式更新属性描述

#### 签名

```ts
interface setProperties {
  (properties: SchemaProperties): Schema // 返回当前Schema对象
}
```

SchemaProperties 参考 [SchemaProperties](#schemaproperties)

### addPatternProperty

#### 描述

添加正则属性描述

#### 签名

```ts
interface addPatternProperty {
  (regexp: string, schema: ISchema): Schema // 返回添加后的Schema对象
}
```

### removePatternProperty

#### 描述

移除正则属性描述

#### 签名

```ts
interface removePatternProperty {
  (regexp: string): Schema // 返回移除后的Schema对象
}
```

### setPatternProperties

#### 描述

覆盖式更新正则属性描述

#### 签名

```ts
interface setPatternProperties {
  (properties: SchemaProperties): Schema // 返回当前Schema对象
}
```

SchemaProperties 参考 [SchemaProperties](#schemaproperties)

### setAdditionalProperties

#### 描述

覆盖式更新扩展属性描述

#### 签名

```ts
interface setAdditionalProperties {
  (properties: ISchema): Schema // 返回扩展属性Schema对象
}
```

### setItems

#### 描述

覆盖式更新数组项描述

#### 签名

```ts
interface setItems {
  (items: SchemaItems): SchemaItems // 返回更新后的SchemaItems对象
}
```

SchemaItems 参考 [SchemaItems](#schemaitems)

### setAdditionalItems

#### 描述

覆盖式更新数组扩展项描述

#### 签名

```ts
interface setAdditionalItems {
  (items: ISchema): Schema // 返回更新后的Schema对象
}
```

SchemaItems 参考 [SchemaItems](#schemaitems)

### mapProperties

#### 描述

遍历并映射当前 Schema 的 properties 属性，同时会基于 x-index 顺序来遍历

#### 签名

```ts
interface mapProperties<T> {
  (mapper: (property: Schema, key: string | number) => T): T[]
}
```

### mapPatternProperties

#### 描述

遍历并映射当前 Schema 的 patternProperties 属性，同时会基于 x-index 顺序来遍历

#### 签名

```ts
interface mapPatternProperties<T> {
  (mapper: (property: Schema, key: string | number) => T): T[]
}
```

### reduceProperties

#### 描述

reduce 当前 Schema 的 properties 属性，同时会基于 x-index 顺序来遍历

#### 签名

```ts
interface reduceProperties<T> {
  (
    reducer: (value: T, property: Schema, key: string | number) => T,
    initialValue?: T
  ): T
}
```

### reducePatternProperties

#### 描述

reduce 当前 Schema 的 patternProperties 属性，同时会基于 x-index 顺序来遍历

#### 签名

```ts
interface reducePatternProperties<T> {
  (
    reducer: (value: T, property: Schema, key: string | number) => T,
    initialValue?: T
  ): T
}
```

### compile

#### 描述

深度递归当前 Schema 对象中的表达式片段，编译表达式，并返回 Schema，我们可以传入作用域对象，在表达式中即可消费作用域变量

表达式片段约定：以<code v-pre>&#123;&#123;</code> 开头， <code v-pre>&#125;&#125;</code>结尾的字符串代表一个表达式片段

#### 签名

```ts
interface compile {
  (scope: any): Schema
}
```

### fromJSON

#### 描述

将普通 json 数据转换成 Schema 对象

#### 签名

```ts
interface fromJSON {
  (json: ISchema): Schema
}
```

### toJSON

#### 描述

将当前 Schema 对象转换成普通 json 数据

#### 签名

```ts
interface toJSON {
  (): ISchema
}
```

### toFieldProps

#### 描述

将当前 Schema 对象转换成 Formily 字段模型属性，映射关系参考 [属性](#属性)

#### 签名

```ts
import { IFieldFactoryProps } from '@formily/core'

interface toFieldProps {
  (): IFieldFactoryProps
}
```

IFieldFactoryProps 参考 [IFieldFactoryProps](https://core.formilyjs.org/api/models/form#ifieldfactoryprops)

## 静态方法

### getOrderProperties

#### 描述

从 Schema 中获取排序后的 properties

#### 签名

```ts
interface getOrderProperties {
  (schema: ISchema = {}, propertiesName: keyof ISchema = 'properties'): ISchema
}
```

### compile

#### 描述

深度遍历任意对象中的表达式片段，表达式片段约定：以<code v-pre>&#123;&#123;</code> 开头， <code v-pre>&#125;&#125;</code>结尾的字符串代表一个表达式片段。

#### 签名

```ts
interface compile {
  (target: any, scope: any): any
}
```

### shallowCompile

#### 描述

浅层遍历任意对象中的表达式片段，表达式片段约定：以<code v-pre>&#123;&#123;</code> 开头， <code v-pre>&#125;&#125;</code>结尾的字符串代表一个表达式片段

#### 签名

```ts
interface shallowCompile {
  (target: any, scope: any): any
}
```

### silent

#### 描述

是否静默编译，如果是，则表达式报错不会有任何提醒

#### 签名

```ts
interface silent {
  (value?: boolean): void
}
```

### isSchemaInstance

#### 描述

判断某个对象是否为 Schema Class 的实例对象

#### 签名

```ts
interface isSchemaInstance {
  (target: any): target is Schema
}
```

### registerCompiler

#### 描述

注册表达式编译器

#### 签名

```ts
interface registerCompiler {
  (compiler: (expression: string, scope: any) => any): void
}
```

### registerPatches

#### 描述

注册 Schema 补丁，方便做不同版本的 Schema 协议兼容

#### 签名

```ts
type SchemaPatch = (schema: ISchema) => ISchema

interface registerPatches {
  (...args: SchemaPatch[]): void
}
```

### registerVoidComponents

#### 描述

给字段组件打上标识，标识该组件是虚拟组件，与 formily1.x 做兼容

#### 签名

```ts
interface registerVoidComponents {
  (components: string[]): void
}
```

#### 用例

```ts
import { Schema } from '@formily/json-schema'

Schema.registerVoidComponents(['card', 'tab', 'step'])
```

::: warning

  <p>注意，该 api 需要配合 <code>enablePolyfills(['1.0'])</code> 使用</p>
:::

### registerTypeDefaultComponents

#### 描述

给 Schema 类型标识默认组件类型

#### 签名

```ts
interface registerTypeDefaultComponents {
  (maps: Record<string, string>): void
}
```

#### 用例

```ts
import { Schema } from '@formily/json-schema'

Schema.registerTypeDefaultComponents({
  string: 'Input',
  number: 'NumberPicker',
  array: 'ArrayTable',
})
```

注意，该 api 需要配合 <code>enablePolyfills(['1.0'])</code> 使用

### registerPolyfills

#### 描述

注册协议兼容垫片

#### 签名

```ts
type SchemaPatch = (schema: ISchema) => ISchema

interface registerPolyfills {
  (version: string, patch: SchemaPatch): void
}
```

#### 用例

```ts
import { Schema } from '@formily/json-schema'

Schema.registerPolyfills('1.0', (schema) => {
  schema['x-decorator'] = 'FormItem'
  return schema
})
```

### enablePolyfills

#### 描述

开启协议垫片，默认内置 1.0 版本协议兼容垫片，主要兼容特性：

- x-decorator 不声明，自动作为 FormItem
- x-linkages 转换为 x-reactions
- x-props 自动转换为 x-decorator-props
- x-rules 转换为 x-validator
- editable 转换为 x-editable
- visible 转换为 x-visible
- x-component 为 card/block/grid-row/grid-col/grid/layout/step/tab/text-box 自动转换 VoidField，

#### 签名

```ts
interface enablePolyfills {
  (versions: string[]): void
}
```

#### 用例

```ts
import { Schema } from '@formily/json-schema'

Schema.enablePolyfills(['1.0'])
```
