---
layout: home
page: true

hero:
  name: Silver Formily Vue
  image:
    src: /logo.svg
    alt: Silver Formily Vue
  tagline: Vue3 的 @formily/vue 封装
  actions:
    - theme: alt
      text: 指南
      link: ./guide/introduction
    - theme: brand
      text: 快速开始
      link: ./component/quick-start

features:
  - title: 💡 使用Vue3 重构的 Formily 封装
    details: 没有历史包袱的重构，精简源码
  - title: 📝 基于Template语法书写
    details: 成熟的编译器优化，提供更好的可读性与性能优化。
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>
