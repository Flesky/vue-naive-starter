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
    label: renderLink('/', 'Home'),
    key: 'Home',
    icon: () => <i-table />,
  },
  {
    label: renderLink('/about', 'About'),
    key: 'About',
    icon: () => <i-help />,
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
.n-menu-item-content__icon {
  @apply !mr-3
}
</style>
