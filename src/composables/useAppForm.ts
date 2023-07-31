import { ref } from 'vue'
import type AppNewForm from '@/components/app/form/index.vue'

export default function useAppForm() {
  const form = ref<InstanceType<typeof AppNewForm> | null>(null)

  function submit() {
    form.value?.submit()
  }

  function reset() {
    form.value?.reset()
  }

  return { form, submit, reset }
}
