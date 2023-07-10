<script setup lang="ts">
import type { DataTableColumns, PaginationProps } from 'naive-ui'

interface Props {
  id: string

  columns: DataTableColumns<any>
  data?: Array<Record<string, any>>
  loading?: boolean
  refresh?: () => void

  total?: number
  totalPage?: number

  rowKey?: (row: Record<string, any>) => string
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
})

const columnOptions = props.columns.filter(column => !('type' in column)).map((column) => {
  return {
    // @ts-expect-error TableSelectionColumn is already filtered out
    label: column!.title,
    // @ts-expect-error TableSelectionColumn is already filtered out
    value: column!.key,
  }
})
const shownColumns = useLocalStorage(`${props.id}-shown-columns`, columnOptions.map(column => column.value))
const columns = computed(() => {
  return props.columns.filter(column => 'type' in column || shownColumns.value.includes(column.key)).map((column) => {
    if ('type' in column)
      return column

    return {
      sorter: 'default',
      ...column,
    }
  })
})

const current = defineModel<number>('current')
const pageSize = defineModel<number>('pageSize')
const selection = defineModel<Array<string | number>>('selection')
const isSelecting = computed(() => !!selection.value?.length)

const pagination = reactive({
  page: 1,
  pageSize: 10,
})

const paginationProps: PaginationProps = {
  simple: true,
}

const paginatedData = computed(() => {
  const { data, totalPage } = props
  if (totalPage)
    return data

  const { page, pageSize } = pagination

  const start = (page - 1) * pageSize
  const end = start + pageSize
  return data.slice(start, end)
})

const { searchQuery, filteredData } = useKeywordSearch(paginatedData)
</script>

<template>
  <n-card content-style="padding: 0;" footer-style="padding: 12px;" :segmented="{ content: true }" size="small">
    <template #header>
      <n-space class="font-normal" justify="space-between">
        <n-input v-model:value="searchQuery" class="!w-56" clearable placeholder="Search...">
          <template #suffix>
            <n-icon>
              <i-search />
            </n-icon>
          </template>
        </n-input>

        <n-space v-if="!isSelecting" justify="end" size="small">
          <slot name="action" />
          <n-button v-if="refresh" :disabled="loading" @click="refresh">
            <template #icon>
              <n-icon>
                <i-reload />
              </n-icon>
            </template>
          </n-button>
        </n-space>

        <n-space v-else justify="end" size="small">
          <slot name="selectionAction" />
        </n-space>
      </n-space>
    </template>

    <n-scrollbar x-scrollable>
      <n-data-table :bordered="false" class="min-w-max" v-bind="{ data: filteredData, columns, loading, rowKey }" @update:checked-row-keys="keys => selection = keys" />
    </n-scrollbar>

    <template v-if="data.length" #action>
      <div class="flex flex-col items-center gap-2 @2xl:grid">
        <template v-if="totalPage">
          <div class="col-start-1 row-start-1 justify-self-start">
            {{ pageSize! * (current! - 1) + 1 }}-{{ pageSize! * current! }} of {{ total }} items
          </div>
          <n-pagination v-model:page="current" v-model:page-size="pageSize" class="col-start-1 row-start-1 justify-self-center" :page-count="totalPage" v-bind="paginationProps" />
        </template>

        <template v-else>
          <div class="col-start-1 row-start-1 justify-self-start">
            {{ pagination.pageSize * (pagination.page - 1) + 1 }}-{{ pagination.pageSize * pagination.page }} of {{ data.length }} items
          </div>

          <n-pagination v-model:page="pagination.page" v-model:page-size="pagination.pageSize" class="col-start-1 row-start-1 justify-self-center" :page-count="Math.ceil(data.length / pagination.pageSize)" v-bind="paginationProps" />
        </template>

        <n-space class="col-start-1 row-start-1 justify-self-end" size="small">
          <n-button>
            <template #icon>
              <n-icon>
                <i-download />
              </n-icon>
            </template>
            CSV
          </n-button>
          <n-popselect
            v-model:value="shownColumns" multiple :options="columnOptions" trigger="click" @update:value="() => {
              if (!shownColumns.length)
                shownColumns = columnOptions.map(column => column.value)
            }"
          >
            <n-button>
              <template #icon>
                <n-icon>
                  <i-columns-3 />
                </n-icon>
              </template>
            </n-button>
          </n-popselect>
          <!--          <n-button> -->
          <!--            <template #icon> -->
          <!--              <n-icon> -->
          <!--                <i-line-height /> -->
          <!--              </n-icon> -->
          <!--            </template> -->
          <!--          </n-button> -->
        </n-space>
      </div>
    </template>
  </n-card>
</template>
