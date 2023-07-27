<script setup lang="ts">
import type { FormContext } from 'vee-validate'
import type { Schema } from 'yup'

const props = defineProps<{
  schema: NewFormSchema
}>()

interface FormItemBase {
  label: string
  placeholder?: string
  span?: number
  rules?: Schema
}

interface FormItemInput extends FormItemBase {
  type: 'input'
}

interface FormItemNumber extends FormItemBase {
  type: 'number'
}

type FormItem = FormItemInput | FormItemNumber

export interface NewFormSchema {
  [key: string]: FormItem
}

const defineComponentBinds = inject<FormContext['defineComponentBinds']>('defineComponentBinds')

const binds = reactive(Object.entries(props.schema).reduce((acc, [key, item]) => {
  acc[key] = defineComponentBinds!(key, (state) => {
    return {
      model: 'value',

      props: {
        clearable: item.rules?.spec.optional ?? true,
        placeholder: item.placeholder || '',
        validationStatus: state.touched && state.errors[0] ? 'error' : 'default',
        feedback: state.touched ? state.errors[0] : undefined,
      },
    }
  })
  return acc
}, {} as Record<string, ReturnType<FormContext['defineComponentBinds']>>))
</script>

<template>
  <n-form-item v-for="[key, item] in Object.entries(schema)" v-bind="binds[key]" :key="key" :label="item.label">
    <n-input v-if="item.type === 'input'" v-bind="binds[key]" />

    <n-input-number v-else-if="item.type === 'number'" v-bind="binds[key]" />
  </n-form-item>
</template>
