<script setup lang="tsx">
import { string } from 'yup'
import useAppForm from '@/composables/useAppForm'
import type { FormSchema } from '@/components/app/form/items.vue'

definePage({
  name: 'New Forms',
})

const { form, submit } = useAppForm()

const schema: FormSchema = {
  email: {
    type: 'input',
    label: 'Email address',
    rules: string().email().label('Email address').nullable(),
  },
  password: {
    type: 'input',
    label: 'Password',
    rules: string().required().min(8),
    props: {
      showPasswordOn: 'click',
      type: 'password',
    },
  },
  birthday: {
    type: 'date',
    label: 'Birthday',
    rules: date().required(),
  },
  favorite_number: {
    type: 'number',
    label: 'Favorite number',
    rules: number().max(5).notRequired().label('Favorite number'),
  },
  favorite_color: {
    type: 'select',
    label: 'Favorite color',
    options: ['Red', 'Green', 'Blue', 2].map(color => ({
      label: String(color),
      value: color,
    })),
    creatable: true,
  },
  // time: {
  //   type: 'input',
  //   label: 'Time',
  //   rules: string().time().required().label('Time'),
  // },
}
</script>

<template>
  <app-form ref="form" :schema="schema" @submit="v => console.log(v)">
    <app-form-items :schema="schema" />
  </app-form>
  <n-button @click="submit">
    Submit
  </n-button>
</template>
