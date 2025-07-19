<template>
  <div class="vocabulary-header">
    <h1>📚 生字簿管理</h1>
    <p>管理你的學習單字</p>
    
    <div class="header-actions">
      <button 
        @click="goBack" 
        class="btn btn-secondary"
      >
        ← 返回新聞
      </button>
      
      <button 
        @click="vocabularyStore.loadVocabulary()" 
        class="btn btn-primary"
        :disabled="vocabularyStore.isLoading"
      >
        🔄 重新載入
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVocabularyStore } from '../stores/vocabulary'

const vocabularyStore = useVocabularyStore()

const goBack = () => {
  window.close() // 關閉生字簿頁面
}
</script>

<style scoped>
.vocabulary-header {
  text-align: center;
  margin-bottom: 30px;
  color: white;
}

.vocabulary-header h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.vocabulary-header p {
  font-size: 1.1rem;
  margin-bottom: 20px;
  opacity: 0.9;
}

.header-actions {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .vocabulary-header h1 {
    font-size: 2rem;
  }
  
  .header-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .header-actions .btn {
    width: 200px;
  }
}

@media (max-width: 480px) {
  .vocabulary-header h1 {
    font-size: 1.8rem;
  }
}
</style>