<script setup lang="tsx">
import type { FormSchema } from '@/components/app/form/types'

definePage({
  name: 'Forms',
})

const schema: FormSchema = {
  name: {
    type: 'input',
    label: 'Your name',
    required: true,
    span: 12,
  },
  birthday: {
    type: 'date',
    label: 'Birthday',
    span: 3,
  },
  time: {
    type: 'time',
    label: 'Time',
    span: 3,
  },
  fruit: {
    type: 'select',
    label: 'Favorite fruit',
    placeholder: 'Must not be Cherry',
    options: ['Apple', 'Banana', 'Cherry'].map(item => ({ label: item, value: item })),
  },
  vegetables: {
    type: 'select',
    label: 'Favorite vegetable',
    placeholder: 'Must not be Tomato',
    multiple: true,
    options: ['Carrot', 'Tomato', 'Potato'].map(item => ({ label: item, value: item })),
  },
  bank_balance: {
    type: 'number',
    label: 'Bank balance',
    required: true,
    span: 3,
    prefix: 'USD',
    min: 0,
  },
  payment: {
    type: 'number',
    label: 'Payment',
    required: true,
    span: 3,
    suffix: 'PHP',
    buttons: true,
    min: 0,
  },
  seed_phrase: {
    type: 'textarea',
    label: 'Seed phrase?',
    placeholder: 'honor dream forest lunar melody blanket wisdom mirror orange galaxy kitten language',
    mono: true,
  },
  terms: {
    type: 'checkbox',
    content: 'I agree to sell my soul to the devil',
  },
}
const { formRef, formValue, handleSubmit, feedback, setFeedback } = useForm()

// Mock service request. Reject if fruit is Cherry or vegetables include Tomato
const { run } = useRequest(
  () => {
    const form = formValue.value
    const errors: Record<string, string> = {}
    if (form.fruit === 'Cherry')
      errors.fruit = 'Must not be Cherry'
    if (form.vegetables && form.vegetables.includes('Tomato'))
      errors.vegetables = 'Must not include Tomato'

    if (Object.keys(errors).length)
      return Promise.reject(errors)

    return Promise.resolve(formValue.value)
  },
  {
    manual: true,
    onError: (err) => {
      setFeedback(err as unknown as Record<string, Array<string>>)
    },
  })
</script>

<template>
  <div class="p-4">
    <n-h2>Forms</n-h2>
    <n-p>
      Forms are created using the <n-text code>
        app-form
      </n-text> and <n-text code>
        app-form-items
      </n-text> components and <n-text code>
        useForm()
      </n-text> composables.
    </n-p>
    <n-divider />
    <n-h3>Demo</n-h3>
    <app-form ref="formRef" :model="formValue">
      <app-form-items v-model="formValue" v-bind="{ feedback, schema }" />
    </app-form>
    <n-space class="mt-4">
      <n-button type="primary" @click="handleSubmit(run)">
        Submit
      </n-button>
    </n-space>
    <n-divider />
    <n-h3>Output</n-h3>
    <n-card class="font-mono" embedded>
      {{ formValue }}
    </n-card>
  </div>
</template>
