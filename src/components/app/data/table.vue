<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui'
import type { RowKey } from 'naive-ui/lib/data-table/src/interface'
import type { DataFilters } from '@/components/app/data/wrapper.vue'

const props = defineProps<{
  id: string
  title?: string

  data?: Record<string, any>[]
  columns: DataTableColumns<any>
  loading?: boolean
  refresh?: () => void

  filterOptions?: DataFilters

  rowKey?: (row: Record<string, any>) => string

  totalPage?: number
}>()

const current = defineModel<number>('current')
const pageSize = defineModel<number>('pageSize')
const filters = defineModel<Record<string, any>>('filters')
const selection = ref<RowKey[]>([])

// Filter out non-data columns.
const columnOptions = props.columns.filter(column => !('type' in column)).map((column) => {
  return {
    // @ts-expect-error Non-data columns are already filtered out
    label: column.title,
    // @ts-expect-error Non-data columns are already filtered out
    value: column.key,
  }
})

// Save shown columns to local storage.
const shownColumns = useLocalStorage(`${props.id}-shown-columns`, columnOptions.map(column => column.value))

// Apply default sorter.
// Add "sorter: false" to disable, particularly for action columns.
const columns = computed(() => {
  return props.columns.filter(column => 'type' in column || shownColumns.value.includes(column.key)).map(column => 'type' in column
    ? column
    : {
        sorter: 'default',
        ...column,
      },
  )
})

function downloadJsonAsCsv(data: Record<string, any>[]) {
  const csv = Papa.unparse(data)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', `${props.id} ${dayjs().format('YYYY-MM-DD h:mm A')}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

<template>
  <app-data-wrapper v-model:current="current" v-model:filters="filters" v-model:page-size="pageSize" v-bind="{ data, loading, refresh, totalPage, filterOptions, title }" size-picker>
    <template #default="{ processedData }">
      <n-collapse-transition class="mb-3" :show="!!selection.length">
        <n-card>
          <slot name="selectionAction" :selection="selection" />
        </n-card>
      </n-collapse-transition>

      <n-scrollbar x-scrollable>
        <n-data-table
          v-bind="{ data: processedData, columns, rowKey }" class="min-w-max"
          @update:checked-row-keys="keys => selection = keys"
        />
      </n-scrollbar>
    </template>

    <template #footer="{ processedData }">
      <n-popselect
        v-model:value="shownColumns" multiple :options="columnOptions" trigger="click"
        @update:value="() => {
          if (shownColumns.length === 0) {
            shownColumns = columnOptions.map(column => column.value)
          }
        }"
      >
        <n-button size="small">
          <template #icon>
            <n-icon>
              <i-columns-3 />
            </n-icon>
          </template>
          {{ shownColumns.length }} column{{ shownColumns.length === 1 ? '' : 's' }}
        </n-button>
      </n-popselect>
      <n-button size="small" @click="downloadJsonAsCsv(processedData)">
        <template #icon>
          <n-icon>
            <i-download />
          </n-icon>
        </template>
        CSV
      </n-button>
    </template>
  </app-data-wrapper>
</template>
