<script setup lang="tsx">
import { ref } from 'vue'
import { string } from 'yup'
import AppNewForm from '@/components/app/new-form/index.vue'
import type { NewFormSchema } from '@/components/app/new-form/items.vue'

definePage({
  name: 'New Forms',
})

const schema: NewFormSchema = {
  email: {
    type: 'input',
    label: 'Email address',
    rules: string().email().label('Email address'),
  },
  password: {
    type: 'input',
    label: 'Password',
    rules: string().required().min(8).label('Password'),
  },
  minmax: {
    type: 'number',
    label: 'Min Max',
    rules: number().nullable().min(-3).max(5),
  },
}

const form = ref<InstanceType<typeof AppNewForm> | null>(null)

function onSubmit() {
  return form.value?.handleSubmit((values) => {})
}

function resetForm() {
  return form.value?.resetForm()
}
</script>

<template>
  <AppNewForm ref="form" :schema="schema">
    <app-new-form-items :schema="schema" />
    <n-button @click="onSubmit">
      Submit
    </n-button>
    <n-button @click="resetForm">
      Reset
    </n-button>
  </AppNewForm>

<!--  <n-form> -->
<!--    <n-form-item v-bind="email"> -->
<!--      <n-input v-bind="email" /> -->
<!--    </n-form-item> -->

<!--    <n-form-item v-bind="password"> -->
<!--      <n-input v-bind="password" /> -->

<!--      <n-button @click="onSubmit"> -->
<!--        Submit -->
<!--      </n-button> -->
<!--    </n-form-item> -->
<!--  </n-form> -->
</template>
