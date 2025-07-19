<template>
  <div 
    v-if="newsStore.isLoading" 
    class="loading"
  >
    載入中...
  </div>
</template>

<script setup lang="ts">
import { useNewsStore } from '../stores/news'

const newsStore = useNewsStore()
</script>

<style scoped>
.loading {
  text-align: center;
  color: white;
  font-size: 1.2rem;
  margin: 50px 0;
}
</style>