# 总览

本章节在逻辑结构上属于 api/shared/schema。由于Schema是协议驱动最核心的部分，因此值得单独有一个章节。

## 背景

事实上 Formily 框架发布了一个单独的包来管理这部分逻辑:`@formily/json-schema`。react 的封装与 vue 的封装均基于此。 因此这部分的文档也可以当做是 `@formily/json-schema` 的文档。

## 描述

Schema 是一个通用 Class，在 SchemaField 和 RecursionField 中都有依赖它，它主要有几个核心能力：

- 解析 json-schema 的能力
- 将 json-schema 转换成 Field Model 的能力
- 编译 json-schema 表达式的能力

`@silver-formily/vue` 中移除了对 Schema 这个 Class 的导出，你需要将`@formily/json-schema` 作为 peerDependencies 安装。在引入时也需要从`@formily/json-schema`中引入。
