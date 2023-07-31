<script setup lang="tsx">
import { useForm } from 'vee-validate'
import type { Schema } from 'yup'
import type { FormSchema } from '@/components/app/form/items.vue'

const props = defineProps<{
  schema: FormSchema
}>()
const emit = defineEmits<{
  (e: 'submit', v: Record<string, any>): void
}>()

const { defineComponentBinds, handleSubmit, resetForm } = useForm({
  validationSchema: object(Object.entries(props.schema).reduce((acc, [key, item]) => {
    acc[key] = item.rules?.label(item.label) || {
      'date': date(),
      'input': string(),
      'multi-select': array(),
      'number': number(),
      'radio': mixed(),
      'select': mixed(),
    }[item.type].notRequired().label(item.label)
    return acc
  }, {} as Record<string, Schema>)),
  initialValues: Object.entries(props.schema).reduce((acc, [key]) => {
    acc[key] = null
    return acc
  }, {} as Record<string, null>),
})

provide('defineComponentBinds', defineComponentBinds)

const submitForm = handleSubmit((values) => {
  emit('submit', values)
})

defineExpose({
  submit: submitForm, reset: resetForm,
})
</script>

<template>
  <div class="@container">
    <n-form class="grid grid-cols-6 gap-2 @2xl:grid-cols-12">
      <slot />
    </n-form>
  </div>
</template>
