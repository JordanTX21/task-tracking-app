<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import PopUpAlert from './components/PopUpAlert.vue';
</script>

<template>
  <main class="max-w-[1280px] mx-auto min-h-screen">
    <RouterView />
    <teleport to="body">
      <PopUpAlert />
    </teleport>
  </main>
</template>

<style scoped></style>
