<script setup lang="tsx">
import type { FormSchema } from '@/components/app/form/items.vue'

const router = useRouter()
const formValue = ref({
  email: '',
  password: '',
})

const schema: FormSchema = {
  email: {
    type: 'input',
    label: 'Email address',
    required: true,
  },
  password: {
    type: 'password',
    label: 'Password',
    required: true,
  },
}

function handleLogin() {
  router.push('/')
}
</script>

<template>
  <n-layout embedded position="absolute">
    <div class="flex h-full flex-col items-center justify-center">
      <n-h1>Log in</n-h1>
      <n-card class="max-w-sm">
        <app-form :model="formValue" :show-require-mark="false">
          <app-form-items v-model="formValue" :schema="schema" />
        </app-form>
        <n-button block type="primary" @click="handleLogin">
          Log in
        </n-button>
      </n-card>
    </div>
  </n-layout>
</template>
