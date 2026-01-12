# ReactiveField 渲染层级精简方案

> 背景：当前 Demo 中的一个输入框在 Devtools 中会呈现 `FormProvider -> Field -> ReactiveField -> FInput -> ConnectedFInput -> FInput -> ElInput` 七层。以下记录了可以逐步实施的精简方案。

## 1. 合并 Field 与 ReactiveField
- **问题**：`Field.vue` 只是调用 `getFieldProps`/`getRawComponent` 再把结果传给 `ReactiveField`，没有额外逻辑。
- **改造思路**：把 `Field.vue` 中的 props 解析与计算迁移到 `ReactiveField.vue`，直接导出 `ReactiveField` 作为 `Field`。
- **收益**：移除 `Field` 这层，组件链缩短为 `FormProvider -> ReactiveField -> ...`。
- **影响范围**：`src/components/Field.vue`、`src/components/ReactiveField.vue`、`src/components/index.ts`。

## 2. 精简 connect/mapProps 生成的包装层
- **问题**：`connect.ts` 目前会先创建 `observer(defineComponent)`（命名为 `ConnectedXxx`），随后 `connect()` 又创建一个匿名 functional component，只是为了还原名称。这会制造两层额外组件。
- **改造思路**：
  1. 让 `mapProps` 返回一个纯函数（仅根据 field 计算 props），把 `observer` 包装放到 `connect()` 中。
  2. 移除 `connect()` 里最终的 functional wrapper，直接返回 `observer` 组件，并通过 `Component.displayName = target.name` 或 `defineOptions({ name })` 保留名称。
- **收益**：Demo 中 `FInput -> ConnectedFInput -> FInput` 可以收敛到单层。
- **影响范围**：`src/shared/connect.ts` 及依赖 `connect()` 的上层封装。

## 3. 让 ReactiveField 原生支持 v-model 语义
- **问题**：目前 `resolveComponentBindings` 只处理 `value/onChange`，所以像 Element Plus 这种基于 `modelValue`/`update:modelValue` 的组件必须通过 `connect(mapProps)` 做额外映射。
- **改造思路**：
  - 在 `resolveComponentBindings` 中检测 component props，如果没有 `value` 且存在 `modelValue`，则把 field 的值映射到 `modelValue`，并监听 `update:modelValue` 事件回传至 `field.onInput`。
  - 同时兼容布尔/数组等 `v-model` 语义。
- **收益**：上层可以直接传 `component: ElInput`，无需 `FInput -> ConnectedFInput` 包装。
- **影响范围**：`src/components/ReactiveField.vue` 的 `resolveComponentBindings`、`docs/demos/*.vue`（或实际业务组件的注册方式）。

## 4. （可选）减少 Demo 自定义 Input 包装
- **问题**：`docs/demos/input.vue` 只是 `ElInput` 的轻薄代理。
- **改造思路**：在完成方案 3 之后，直接在 Schema 中引用 Element Plus 组件；若仍需自定义插槽，可把逻辑放到 schema slot 中。
- **收益**：最终层级可收敛到 `FormProvider -> Field(ReactiveField) -> ElInput`。

## 落地建议
1. 按顺序实施，先完成 Field 合并，验证无回归后再处理 connect/mapProps。
2. 为 `ReactiveField` 的 v-model 兼容添加针对 Element Plus 的手动测试（当前仓库无自动化测试）。
3. Demo 中保留一份“对比”截图，展示层级优化前后的效果，便于 PR 描述。
