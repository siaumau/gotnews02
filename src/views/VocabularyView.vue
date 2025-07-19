<template>
  <div id="vocabulary-app">
    <VocabularyHeader />
    <MessageDisplay />
    <LoadingSpinner />
    <VocabularyGrid />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useVocabularyStore } from '../stores/vocabulary'
import VocabularyHeader from '../components/VocabularyHeader.vue'
import MessageDisplay from '../components/MessageDisplay.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import VocabularyGrid from '../components/VocabularyGrid.vue'

const vocabularyStore = useVocabularyStore()

onMounted(() => {
  vocabularyStore.loadVocabulary()
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 20px;
}

#vocabulary-app {
  min-height: 100vh;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  touch-action: manipulation;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.btn-primary {
  background: #4CAF50;
  color: white;
}

.btn-secondary {
  background: #2196F3;
  color: white;
}

.btn-danger {
  background: #f44336;
  color: white;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

@media (max-width: 768px) {
  body {
    padding: 10px;
  }
}
</style>