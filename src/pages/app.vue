<script setup lang="tsx">
definePage({
  path: '/',
})

const collapsed = useLocalStorage('collapsed', false)
</script>

<template>
  <n-layout has-sider position="absolute">
    <app-sider v-bind="{ collapsed }" />
    <n-layout>
      <n-layout-header bordered class="flex h-14 items-center">
        <app-header-item @click="collapsed = !collapsed">
          <i-menu-2 v-if="collapsed" class="h-6 w-6" />
          <i-x v-else class="h-6 w-6" />
        </app-header-item>
        <div class="!my-0 px-3 font-medium">
          volant
        </div>
      </n-layout-header>
      <n-layout class="!top-14 @container" embedded position="absolute">
        <router-view />
      </n-layout>
    </n-layout>
  </n-layout>
</template>
