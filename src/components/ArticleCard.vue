<template>
  <div class="article-card">
    <img 
      :src="article.urlToImage || placeholderSvg" 
      :alt="article.title"
      class="article-image"
      @error="handleImageError"
    >
    
    <div class="article-content">
      <h3 class="article-title">{{ article.title }}</h3>
      
      <div class="article-meta">
        <span>{{ article.source_name || '未知來源' }}</span>
        <span>{{ formatDate(article.publishedAt) }}</span>
      </div>
      
      <p class="article-description">{{ article.description || '無描述' }}</p>
      
      <div class="article-actions">
        <button 
          class="action-btn favorite-btn"
          :class="{ active: article.is_favorite }"
          @click="newsStore.toggleFavorite(article.id)"
          title="收藏"
        >
          ⭐
        </button>
        
        <button 
          class="action-btn learn-btn" 
          @click="newsStore.openLearningModal(article.id)"
          title="英文學習"
        >
          📚
        </button>
        
        <button 
          class="action-btn delete-btn" 
          @click="newsStore.deleteArticle(article.id)"
          title="刪除"
        >
          🗑️
        </button>
        
        <a 
          :href="article.url" 
          target="_blank" 
          class="read-more-link"
        >
          閱讀原文 →
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useNewsStore } from '../stores/news'
import type { Article } from '../stores/news'

interface Props {
  article: Article
}

defineProps<Props>()

const newsStore = useNewsStore()

const placeholderSvg = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='24px' fill='%23aaa' dominant-baseline='middle' text-anchor='middle'%3ENo Image%3C/text%3E%3C/svg%3E`

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  if (target.src !== placeholderSvg) {
    target.src = placeholderSvg
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('zh-TW')
}
</script>

<style scoped>
.article-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  position: relative;
}

.article-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0,0,0,0.15);
}

.article-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  background: #f5f5f5;
}

.article-content {
  padding: 20px;
}

.article-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 10px;
  line-height: 1.4;
  color: #333;
}

.article-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  font-size: 0.9rem;
  color: #888;
}

.article-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.action-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.action-btn:hover {
  background: #f0f0f0;
  transform: scale(1.1);
}

.favorite-btn.active {
  color: #FFD700;
}

.delete-btn:hover {
  color: #f44336;
}

.learn-btn:hover {
  color: #4CAF50;
}

.read-more-link {
  color: #2196F3;
  text-decoration: none;
  margin-left: auto;
  font-weight: 500;
}

.read-more-link:hover {
  text-decoration: underline;
}
</style>