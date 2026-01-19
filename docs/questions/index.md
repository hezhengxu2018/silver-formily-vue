---
sidebar: auto
---

# 常见问题

## 如何添加事件？

`x-component-props` 中可以用 `@` 来标识事件，同时也支持 `onXxx` 这种方式来标识事件。两者区别在于使用 `@` 标识的内容不会再作为 prop 传入组件，而 `onXxx` 这种会。这是为了兼容某些组件具有 `onXxx` 的 prop，如 ElementUI 中的 [upload 组件](https://element.eleme.cn/#/zh-CN/component/upload#attribute)。

::: warning
事件名冲突时，`@` 的优先级更高。例如同时设置了 `@change` 和 `onChange`，只有 `@change` 会生效。
:::

::: demo
questions/events
:::

## 如何使用插槽？

使用 `x-content` 可以在组件的 `default` 插槽中插入内容。可以传入文本或组件。

::: demo
questions/default-slot
:::

## 如何使用具名插槽？

`x-content` 中以键名来表示插槽名。

::: warning
注意键名不可包含 `template`、`render`、`setup` 三个关键字，否则整个 `x-content` 会被当做 vue 组件进行渲染。
:::

::: demo
questions/named-slot
:::

## 如何使用作用域插槽？

`x-content` 使用函数式组件时, 渲染函数增加第二个参数，通过其 `props` 成员访问作用域插槽传入属性，支持 observer() 和 connect() 接入组件。

::: warning
在 Vue 3 中 `x-content` 里声明的插槽节点会提前生成 VNode，后续需要通过 `cloneVNode(child, payload)` 注入作用域属性（如 `slotProp`、`onScopedFunc`），否则子组件拿不到这些必填 prop 并且控制台会提示缺少属性。示例见下方 demo。
:::

::: demo
questions/scoped-slot
:::

::: demo
questions/functional-scoped-slot
:::
