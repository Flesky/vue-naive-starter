import { ref } from 'vue'
import type AppNewForm from '@/components/app/new-form/index.vue'

export default function useForm() {
  const form = ref<InstanceType<typeof AppNewForm> | null>(null)

  const resetForm = () => form.value?.resetForm()

  return {
    resetForm,
  }
}
