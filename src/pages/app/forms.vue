<script setup lang="ts">
import type { FormSchema } from '@/components/app/form/schema'

const schema: FormSchema = {
  title: {
    type: 'select',
    label: 'Title',
    span: 2,
    options: ['Mr.', 'Mrs.', 'Ms.'].map(item => ({ label: item, value: item })),
  },
  first_name: {
    type: 'input',
    label: 'First name',
    span: 4,
  },
  last_name: {
    type: 'input',
    label: 'Last name',
    span: 6,
  },
  age: {
    type: 'number',
    label: 'Age',
    span: 2,
  },
  space: {
    type: 'space',
    span: 10,
  },
  terms: {
    type: 'checkbox',
    content: 'I have read and agree to the terms',
    required: true,
  },
}

const formValue = ref({})
</script>

<template>
  <div class="p-4">
    <n-h2>Forms demo</n-h2>
    <n-form class="grid grid-cols-6 gap-x-2 md:grid-cols-12" :model="formValue">
      <app-form-items v-model="formValue" :schema="schema" />
    </n-form>
    <n-divider />
    <n-h3>Output</n-h3>
    <n-card embedded>
      <n-code>{{ formValue }}</n-code>
    </n-card>
  </div>
</template>
