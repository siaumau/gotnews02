<template>
  <div class="controls">
    <button 
      class="hamburger-btn" 
      @click="uiStore.toggleMobileMenu()"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
    
    <div 
      class="nav-links" 
      :class="{ active: uiStore.showMobileMenu }"
    >
      <button 
        class="btn btn-primary" 
        @click="handleUpdateNews"
        :disabled="isUpdating"
      >
        <span class="btn-icon">{{ isUpdating ? '🔄' : '🔄' }}</span>
        <span class="btn-text">{{ isUpdating ? '更新中...' : '更新新聞' }}</span>
      </button>
      
      <button 
        class="btn"
        :class="newsStore.currentView === 'all' ? 'btn-primary' : 'btn-secondary'"
        @click="newsStore.showArticles('all')"
      >
        <span class="btn-icon">📰</span>
        <span class="btn-text">所有新聞</span>
      </button>
      
      <button 
        class="btn"
        :class="newsStore.currentView === 'favorites' ? 'btn-primary' : 'btn-secondary'"
        @click="newsStore.showArticles('favorites')"
      >
        <span class="btn-icon">⭐</span>
        <span class="btn-text">我的收藏</span>
      </button>
      
      <button 
        class="btn btn-secondary" 
        @click="openVocabulary"
      >
        <span class="btn-icon">📚</span>
        <span class="btn-text">生字簿</span>
      </button>
      
      <button 
        class="btn btn-secondary" 
        @click="apiStore.openSettingsModal()"
      >
        <span class="btn-icon">⚙️</span>
        <span class="btn-text">設定</span>
      </button>
      
      <button 
        class="btn btn-secondary" 
        @click="newsStore.clearTranslations()"
      >
        <span class="btn-icon">🗑️</span>
        <span class="btn-text">清除翻譯</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useNewsStore } from '../stores/news'
import { useApiStore } from '../stores/api'
import { useUiStore } from '../stores/ui'

const newsStore = useNewsStore()
const apiStore = useApiStore()
const uiStore = useUiStore()

const isUpdating = ref(false)

const handleUpdateNews = async () => {
  isUpdating.value = true
  try {
    await newsStore.updateNews()
  } finally {
    isUpdating.value = false
  }
}

const openVocabulary = () => {
  window.open('/vocabulary', '_blank')
}
</script>

<style scoped>
.controls {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
  position: relative;
}

.hamburger-btn {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 30px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1010;
}

.hamburger-btn span {
  width: 30px;
  height: 3px;
  background-color: white;
  border-radius: 5px;
  transition: all 0.3s linear;
}

.nav-links {
  display: flex;
  gap: 15px;
}

@media (max-width: 768px) {
  .controls {
    justify-content: flex-end;
    padding-right: 20px;
  }

  .hamburger-btn {
    display: flex;
  }

  .nav-links {
    display: none;
    flex-direction: column;
    gap: 10px;
    position: absolute;
    top: 45px;
    right: 20px;
    background: rgba(102, 126, 234, 0.95);
    backdrop-filter: blur(5px);
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    z-index: 1000;
  }

  .nav-links.active {
    display: flex;
  }

  .nav-links .btn {
    width: 100%;
    justify-content: flex-start;
    padding: 10px 16px;
    font-size: 14px;
  }
}
</style>