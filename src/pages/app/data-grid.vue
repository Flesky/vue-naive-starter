<script setup lang="tsx">
import type { DataTableColumns } from 'naive-ui'
import { usePagination } from 'vue-request'

definePage({
  name: 'Data Grid',
})

const columns: DataTableColumns<Record<string, any>> = [
  {
    type: 'selection',
  },
  {
    key: 'name',
    title: 'Name',
  },
  {
    key: '_id',
    title: 'ID',
  },
  {
    key: 'trips',
    title: 'Trips',
  },
  {
    key: 'airline[0].country',
    title: 'Country',
    sorter: (a, b) => {
      return a.airline[0].country.localeCompare(b.airline[0].country)
    },
  },
  {
    key: 'action',
    title: 'Action',
  },
]

const { current, pageSize, total, totalPage, data, loading, refresh } = usePagination(async (pagination) => {
  const res = await axios.get('https://api.instantwebtools.net/v1/passenger', {
    params: {
      ...pagination,
    },
  })
  return res.data
}
, {
  pagination: {
    totalKey: 'totalPassengers',
    totalPageKey: 'totalPages',

    currentKey: 'page',
    pageSizeKey: 'size',
  },
})

const selection = ref([])
</script>

<template>
  <div class="p-4">
    <app-data-table v-bind="{ data: data?.data, columns, loading, refresh, total, totalPage }" id="example" v-model:current="current" v-model:page-size="pageSize" v-model:selection="selection" :row-key="row => row._id">
      <template #selectionAction>
        <n-button type="primary">
          Activate
        </n-button>
        <n-button type="error">
          Delete
        </n-button>
      </template>
    </app-data-table>
  </div>
</template>
