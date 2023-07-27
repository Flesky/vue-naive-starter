<script setup lang="tsx">
import type { MenuOption } from 'naive-ui'

defineProps<{
  collapsed: boolean
}>()

function renderLink(to: string, label: string) {
  return () => <router-link to={to}>{label}</router-link>
}

const options: MenuOption[] = [
  {
    label: renderLink('/', 'Volant'),
    key: 'Volant',
    icon: () => <i-smart-home />,
  },
  {
    label: renderLink('/data-grid', 'Data Grid'),
    key: 'Data Grid',
    icon: () => <i-border-all />,
  },
  {
    label: renderLink('/forms', 'Forms'),
    key: 'Forms',
    icon: () => <i-float-left />,
  },
  {
    label: renderLink('/new-forms', 'New Forms'),
    key: 'New Forms',
    icon: () => <i-float-left />,
  },
]
</script>

<template>
  <n-layout-sider bordered v-bind="{ collapsed }" collapse-mode="width" :collapsed-width="64" style="padding: 1px 0" :width="240">
    <n-menu
      v-bind="{ collapsed, options }"
      :collapsed-icon-size="24"
      :collapsed-width="64" :root-indent="20" :value="$route.name"
    />
  </n-layout-sider>
</template>

<style>
</style>
