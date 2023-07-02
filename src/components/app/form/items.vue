<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core'
import type { FormSchema } from '@/components/app/form/schema'

defineProps<{ schema: FormSchema }>()
const modelValue = defineModel<Record<string, any>>({ required: true })

const isSm = useBreakpoints(breakpointsTailwind).smaller('md')
function getSpan(span?: number) {
  if (isSm && typeof span === 'number' && span > 6)
    return 'grid-column: 1 / -1'

  return `grid-column: span ${span || 6} / span ${span || 6}`
}
</script>

<template>
  <template v-for="[path, item] in Object.entries(schema)" :key="path">
    <n-form-item v-if="item.type !== 'space'" :label="item.label" :path="path" :required="item.required" :rule="item.rules" :show-label="!!item.label" :style="getSpan(item.span)">
      <n-checkbox v-if="item.type === 'checkbox'" v-model:checked="modelValue[path]" :label="item.content" />

      <n-input v-else-if="item.type === 'input'" v-model:value="modelValue[path]" :clearable="!item.required" :placeholder="item.placeholder || ''" />

      <n-input-number v-else-if="item.type === 'number'" v-model:value="modelValue[path]" :clearable="!item.required" :placeholder="item.placeholder || ''" :show-button="false" />

      <n-select v-else-if="item.type === 'select'" v-model:value="modelValue[path]" :clearable="!item.required" :options="item.options" :placeholder="item.placeholder || ''" />
    </n-form-item>

    <div v-else :style="getSpan(item.span)" />
  </template>
</template>
