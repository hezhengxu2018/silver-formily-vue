<script setup lang="ts">
import { useObserver } from '@formily/reactive-vue'
import { useForm } from '../hooks'

defineOptions({
  name: 'FormConsumer',
  inheritAttrs: false,
})

useObserver({
  scheduler: update =>
    Promise.resolve().then(update),
})

const form = useForm()
</script>

<template>
  <slot :form="form" />
</template>
