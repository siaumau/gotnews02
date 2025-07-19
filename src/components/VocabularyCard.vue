<template>
  <div class="vocabulary-card">
    <div class="card-header">
      <div class="word-section">
        <h3 class="vocabulary-word">
          {{ props.vocabulary.word }}
          <button 
            @click="speakWord" 
            class="speak-btn"
            title="發音"
          >
            🔊
          </button>
        </h3>
        <span class="vocabulary-level">{{ props.vocabulary.level }}</span>
      </div>
      
      <button 
        @click="handleDelete" 
        class="delete-btn"
        title="刪除"
      >
        🗑️
      </button>
    </div>
    
    <div class="card-content">
      <p class="vocabulary-meaning">{{ props.vocabulary.meaning }}</p>
      
      <div class="vocabulary-meta">
        <div class="source-info" v-if="props.vocabulary.source_article_title">
          <span class="meta-label">來源：</span>
          <span class="meta-value">{{ props.vocabulary.source_article_title }}</span>
        </div>
        
        <div class="date-info">
          <span class="meta-label">加入時間：</span>
          <span class="meta-value">{{ formatDate(props.vocabulary.created_at) }}</span>
        </div>
      </div>
    </div>
    
    <div class="card-actions">
      <button 
        @click="practiceWord" 
        class="practice-btn"
      >
        📝 練習
      </button>
      
      <button 
        @click="showExample" 
        class="example-btn"
      >
        📚 例句
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVocabularyStore } from '../stores/vocabulary'
import { useUiStore } from '../stores/ui'
import type { VocabularyItem } from '../stores/vocabulary'

interface Props {
  vocabulary: VocabularyItem
}

const props = defineProps<Props>()

const vocabularyStore = useVocabularyStore()
const uiStore = useUiStore()

const handleDelete = () => {
  vocabularyStore.deleteVocabulary(props.vocabulary.id)
}

const speakWord = () => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(props.vocabulary.word)
    utterance.lang = 'en-US'
    window.speechSynthesis.speak(utterance)
  } else {
    uiStore.showMessage('您的瀏覽器不支援語音合成功能', true)
  }
}

const practiceWord = () => {
  // 可以擴展為單字練習功能
  uiStore.showMessage('練習功能開發中...', false)
}

const showExample = () => {
  // 可以擴展為顯示例句功能
  uiStore.showMessage('例句功能開發中...', false)
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) {
    return '今天'
  } else if (diffDays === 1) {
    return '昨天'
  } else if (diffDays < 7) {
    return `${diffDays} 天前`
  } else {
    return date.toLocaleDateString('zh-TW')
  }
}
</script>

<style scoped>
.vocabulary-card {
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  position: relative;
}

.vocabulary-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0,0,0,0.15);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
}

.word-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.vocabulary-word {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2196F3;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.vocabulary-level {
  background: #4CAF50;
  color: white;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  align-self: flex-start;
}

.speak-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  transition: all 0.3s ease;
  opacity: 0.7;
}

.speak-btn:hover {
  background: #f0f0f0;
  opacity: 1;
  transform: scale(1.1);
}

.delete-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  transition: all 0.3s ease;
  opacity: 0.7;
}

.delete-btn:hover {
  background: #ffebee;
  color: #f44336;
  opacity: 1;
  transform: scale(1.1);
}

.card-content {
  margin-bottom: 20px;
}

.vocabulary-meaning {
  font-size: 1.1rem;
  color: #555;
  line-height: 1.5;
  margin-bottom: 15px;
}

.vocabulary-meta {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.source-info,
.date-info {
  font-size: 0.9rem;
}

.meta-label {
  color: #888;
  font-weight: 500;
}

.meta-value {
  color: #666;
}

.card-actions {
  display: flex;
  gap: 10px;
}

.practice-btn,
.example-btn {
  flex: 1;
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.practice-btn {
  background: #e3f2fd;
  color: #1976d2;
}

.practice-btn:hover {
  background: #bbdefb;
}

.example-btn {
  background: #f3e5f5;
  color: #7b1fa2;
}

.example-btn:hover {
  background: #e1bee7;
}

@media (max-width: 480px) {
  .vocabulary-card {
    padding: 15px;
  }
  
  .vocabulary-word {
    font-size: 1.3rem;
  }
  
  .vocabulary-meta {
    font-size: 0.8rem;
  }
  
  .card-actions {
    flex-direction: column;
  }
}
</style>