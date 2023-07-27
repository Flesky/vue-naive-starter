<script setup lang="tsx">
import { useForm } from 'vee-validate'
import type { Schema } from 'yup'
import type { NewFormSchema } from '@/components/app/new-form/items.vue'

const props = defineProps<{
  schema: NewFormSchema
}>()

const { defineComponentBinds, handleSubmit, resetForm, values } = useForm({
  validationSchema: object(Object.entries(props.schema).reduce((acc, [key, item]) => {
    if (!item.rules)
      return acc

    acc[key] = item.rules
    return acc
  }, {} as Record<string, Schema>)),
  initialValues: Object.entries(props.schema).reduce((acc, [key]) => {
    acc[key] = null
    return acc
  }, {} as Record<string, null>),
})

provide('defineComponentBinds', defineComponentBinds)

defineExpose({
  handleSubmit, resetForm, values,
})
</script>

<template>
  {{ values }}
  <n-form>
    <slot />
  </n-form>
</template>
