<template>
  <div class="articles-grid">
    <div 
      v-if="newsStore.articles.length === 0 && !newsStore.isLoading" 
      class="no-articles"
    >
      沒有找到文章
    </div>
    
    <ArticleCard 
      v-for="article in newsStore.articles" 
      :key="article.id" 
      :article="article"
    />
  </div>
</template>

<script setup lang="ts">
import { useNewsStore } from '../stores/news'
import ArticleCard from './ArticleCard.vue'

const newsStore = useNewsStore()
</script>

<style scoped>
.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
  max-width: 1400px;
  margin: 0 auto;
}

.no-articles {
  grid-column: 1/-1;
  text-align: center;
  color: white;
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .articles-grid {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 0 10px;
  }
}
</style>