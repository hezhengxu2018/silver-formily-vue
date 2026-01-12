<script lang="ts" setup>
import { ElLink } from 'element-plus'
import { prefixCls, useArray } from './utils'

defineOptions({
  name: 'ArrayBaseSortHandle',
})

const array = useArray()
</script>

<template>
  <ElLink
    v-if="array.field.value?.pattern === 'editable'"
    :class="`${prefixCls}-sort-handle`"
    size="small"
    :underline="false"
    role="button"
    aria-label="拖拽排序"
    aria-dropeffect="move"
  />
</template>
