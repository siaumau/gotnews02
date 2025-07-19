<template>
  <div class="header">
    <h1>🔍 AI 新聞資料抓取與呈現系統</h1>
    <p>類似 Flipboard 的卡片式新聞瀏覽器</p>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.header {
  text-align: center;
  margin-bottom: 30px;
  color: white;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .header h1 {
    font-size: 1.8rem;
  }
}
</style>