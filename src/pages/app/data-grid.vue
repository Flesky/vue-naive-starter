<script setup lang="tsx">
import type { DataTableColumns } from 'naive-ui'
import type { DataFilters } from '@/components/app/data/wrapper.vue'

definePage({
  name: 'Data Grid',
})

interface Vessel {
  vessel_macaddress: string
  vessel_fullemailaddress: string
  vessel_vesselid: string
  vessel_type: string
  vessel_regstatus: string
  vessel_services: string
  vessel_expire: number
  vessel_messagelimit: number
  vessel_captainemailaddress: string
  vessel_name: string
  vessel_companyfleet: string
  vessel_webshipserverversion: string
  vessel_partner: string
  vessel_created: string
}

const columns: DataTableColumns<Vessel> = [
  {
    type: 'selection',
  },
  {
    key: 'vessel_name',
    title: 'Name',
  },
  {
    key: 'vessel_vesselid',
    title: 'ID',
  },
  {
    key: 'vessel_macaddress',
    title: 'MAC Address',
  },
  {
    key: 'vessel_fullemailaddress',
    title: 'Email Address',
  },
  {
    key: 'vessel_created',
    title: 'Date Registered',
    render: row => row.vessel_created.slice(0, 10),
  }, {
    key: 'vessel_webshipserverversion',
    title: 'CCW Version',
    sorter: (a, b) => +a.vessel_webshipserverversion - +b.vessel_webshipserverversion,
  },
  {
    key: 'vessel_partner',
    title: 'Partner',
  },
  {
    key: 'vessel_captainemailaddress',
    title: 'Captain Email Address',
  },
  {
    key: 'vessel_companyfleet',
    title: 'Company Fleet',
  },
  {
    key: 'action',
    title: 'Action',
    sorter: false,
  },
]

const filterOptions: DataFilters = {
  schema: {
    name: {
      type: 'input',
      label: 'Vessel name, partner, or email',
      span: 6,
    },
  },
  validator: (row, filters) => {
    // Transform all of row's properties to have lowercase
    // so that we can do case-insensitive search.
    row = Object.fromEntries(Object.entries(row).map(([key, value]) => [key, String(value).toLowerCase()]))
    return String(row.vessel_name).includes(filters.name.toLowerCase())
      || String(row.vessel_partner).includes(filters.name.toLowerCase())
      || String(row.vessel_fullemailaddress).includes(filters.name.toLowerCase())
  },
}

const { data, loading, refresh } = useRequest(async () => {
  const res = await axios.get('/vessels')
  return res.data.results
})

const columns2: DataTableColumns = [
  {
    type: 'selection',
  },
  {
    key: 'userid',
    title: 'ID',
  },
  {
    key: 'username',
    title: 'Username',
  },
  {
    key: 'email',
    title: 'Email Address',
  },
]

const filterOptions2: DataFilters = {
  schema: {
    name: {
      type: 'input',
      label: 'Vessel name, partner, or email',
    },
  },
  validator: (row, filters) => {
    // Transform all of row's properties to have lowercase
    // so that we can do case-insensitive search.
    row = Object.fromEntries(Object.entries(row).map(([key, value]) => [key, String(value).toLowerCase()]))
    return String(row.userid).includes(filters.name.toLowerCase())
        || String(row.username).includes(filters.name.toLowerCase())
        || String(row.email).includes(filters.name.toLowerCase())
  },
}

const { data: data2, loading: loading2, refresh: refresh2, current, pageSize, total, totalPage } = usePagination(async (pagination) => {
  return await axios.get('/users/get-all', {
    params: {
      ...pagination,
    },
  })
}, {
  pagination: {
    currentKey: 'page',
    pageSizeKey: 'page_size',
    totalPageKey: 'data.pagination.total_page',
    totalKey: 'data.pagination.total_items',
  },
})

const filters = ref({})
</script>

<template>
  <div class="p-4">
    <app-data-table id="vessels" v-bind="{ data, columns, loading, refresh, filterOptions }" :row-key="row => row.vessel_vesselid" title="Vessels">
      <template #selectionAction>
        <n-button ghost type="primary">
          Activate
        </n-button>
      </template>
    </app-data-table>

    <n-divider />

    <app-data-table id="users" v-model:current="current" v-model:filters="filters" v-model:page-size="pageSize" :columns="columns2" :data="data2?.data.results" v-bind="{ total, totalPage }" :filter-options="filterOptions2" :loading="loading2" :refresh="refresh2" :row-key="row => row.userid" title="Subscribers" />
  </div>
</template>
