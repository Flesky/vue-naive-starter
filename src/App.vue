<script setup lang="ts">
import type { GlobalThemeOverrides } from 'naive-ui'

const themeOverrides: GlobalThemeOverrides = {
  common: {
    fontFamily: 'Inter, sans-serif',
    // inputColorDisabled: 'rgb(242, 243, 245)',
    // actionColor: 'rgb(242, 243, 245)',
    tableHeaderColor: 'rgb(242, 243, 245)',
  },
}
</script>

<template>
  <n-config-provider abstract v-bind="{ themeOverrides }">
    <n-global-style />
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-message-provider>
            <router-view />
          </n-message-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>
