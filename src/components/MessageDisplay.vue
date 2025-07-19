<template>
  <div 
    v-if="uiStore.message" 
    class="message"
    :class="{ error: uiStore.message.isError }"
    @click="uiStore.hideMessage()"
  >
    {{ uiStore.message.text }}
  </div>
</template>

<script setup lang="ts">
import { useUiStore } from '../stores/ui'

const uiStore = useUiStore()
</script>

<style scoped>
.message {
  background: #4CAF50;
  color: white;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
  text-align: center;
  max-width: 600px;
  margin: 0 auto 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.message.error {
  background: #f44336;
}

.message:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}
</style>