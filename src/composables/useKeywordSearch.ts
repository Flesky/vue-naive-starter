import type { Ref } from 'vue'
import { computed, ref } from 'vue'

export default function useKeywordSearch(data: Ref<Record<string, any>[]>) {
  const searchQuery = ref('')
  const filteredData = computed(() => {
    if (!searchQuery.value)
      return data.value

    return data.value.filter(row => Object.values(row).some(value => String(value).toLowerCase().includes(searchQuery.value.toLowerCase())))
  })

  return { searchQuery, filteredData }
}
