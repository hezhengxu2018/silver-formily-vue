# 介绍

`@silver-formily/vue` 是对官方的 `@formily/vue` 的一次重新封装，主要为了解决官方依赖中由于需要兼容 Vue2 所引入的 `vue-demi` `vue-frag`等依赖。同时也消除了兼容 Vue2 渲染时产生的额外的 template 标签和使用`display: content`样式包裹的div标签。`display: content`并不能解决所有的样式问题。精简后的代码当然也具有更好的可读性，易于维护。

## 重大改动

唯一的重大改动是 `@formily/vue` 对入参和事件的映射是 `value` / `onChange` 这样的设计对react版本的组件库与封装库的对齐。现在通过 Vue3 重构后入参的事件改为了 `modelValue` / `onUpdate:modelValue` 触发。对于大部分Vue3的组件库中的大部分组件，无需额外的封装即可满足最基础的使用。
