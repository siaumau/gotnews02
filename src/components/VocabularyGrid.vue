<template>
  <div class="vocabulary-container">
    <div class="vocabulary-stats">
      <div class="stat-card">
        <div class="stat-number">{{ vocabularyStore.vocabularyList.length }}</div>
        <div class="stat-label">總單字數</div>
      </div>
      
      <div class="stat-card">
        <div class="stat-number">{{ uniqueLevels.length }}</div>
        <div class="stat-label">難度等級</div>
      </div>
      
      <div class="stat-card">
        <div class="stat-number">{{ todayAdded }}</div>
        <div class="stat-label">今日新增</div>
      </div>
    </div>

    <div class="vocabulary-filters">
      <select v-model="selectedLevel" class="filter-select">
        <option value="">所有等級</option>
        <option v-for="level in uniqueLevels" :key="level" :value="level">
          {{ level }}
        </option>
      </select>
      
      <input 
        v-model="searchQuery"
        type="text" 
        placeholder="搜尋單字..." 
        class="search-input"
      >
    </div>

    <div v-if="filteredVocabulary.length === 0 && !vocabularyStore.isLoading" class="no-vocabulary">
      <div class="empty-state">
        <span class="empty-icon">📖</span>
        <h3>沒有找到單字</h3>
        <p v-if="searchQuery || selectedLevel">
          請嘗試調整搜尋條件或選擇不同的等級
        </p>
        <p v-else>
          開始學習新聞文章來建立你的生字簿吧！
        </p>
      </div>
    </div>

    <div v-else class="vocabulary-grid">
      <VocabularyCard 
        v-for="vocab in filteredVocabulary" 
        :key="vocab.id" 
        :vocabulary="vocab"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useVocabularyStore } from '../stores/vocabulary'
import VocabularyCard from './VocabularyCard.vue'

const vocabularyStore = useVocabularyStore()

const selectedLevel = ref('')
const searchQuery = ref('')

const uniqueLevels = computed(() => {
  const levels = vocabularyStore.vocabularyList.map(vocab => vocab.level)
  return [...new Set(levels)].sort()
})

const todayAdded = computed(() => {
  const today = new Date().toDateString()
  return vocabularyStore.vocabularyList.filter(vocab => 
    new Date(vocab.created_at).toDateString() === today
  ).length
})

const filteredVocabulary = computed(() => {
  let filtered = vocabularyStore.vocabularyList

  if (selectedLevel.value) {
    filtered = filtered.filter(vocab => vocab.level === selectedLevel.value)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(vocab => 
      vocab.word.toLowerCase().includes(query) ||
      vocab.meaning.toLowerCase().includes(query)
    )
  }

  return filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
})
</script>

<style scoped>
.vocabulary-container {
  max-width: 1200px;
  margin: 0 auto;
}

.vocabulary-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  color: #2196F3;
  margin-bottom: 5px;
}

.stat-label {
  color: #666;
  font-weight: 500;
}

.vocabulary-filters {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  justify-content: center;
}

.filter-select,
.search-input {
  padding: 12px 16px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.filter-select {
  min-width: 150px;
}

.search-input {
  min-width: 250px;
}

.filter-select:focus,
.search-input:focus {
  outline: none;
  box-shadow: 0 4px 20px rgba(33, 150, 243, 0.3);
}

.vocabulary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}

.no-vocabulary {
  grid-column: 1/-1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
}

.empty-state {
  text-align: center;
  color: white;
  background: rgba(255, 255, 255, 0.1);
  padding: 40px;
  border-radius: 20px;
  max-width: 400px;
}

.empty-icon {
  font-size: 4rem;
  display: block;
  margin-bottom: 20px;
}

.empty-state h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.empty-state p {
  opacity: 0.8;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .vocabulary-filters {
    flex-direction: column;
    align-items: center;
  }
  
  .filter-select,
  .search-input {
    width: 100%;
    max-width: 300px;
  }
  
  .vocabulary-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .vocabulary-stats {
    grid-template-columns: 1fr;
    gap: 15px;
  }
}
</style>