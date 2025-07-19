<template>
  <div 
    v-if="apiStore.showFirstSetup" 
    class="modal show"
  >
    <div class="modal-content">
      <h2>🚀 歡迎使用 AI 新聞學習系統</h2>
      <p>首次使用需要設定 API 金鑰，請輸入以下資訊：</p>
      
      <div class="setup-form">
        <div class="form-group">
          <label for="firstNewsApiKey">NewsAPI 金鑰（必填）：</label>
          <input 
            id="firstNewsApiKey"
            v-model="newsApiKey"
            type="password" 
            placeholder="輸入你的 NewsAPI 金鑰"
            class="form-input"
            required
          >
        </div>

        <div class="form-group">
          <label for="firstOpenRouterApiKey">OpenRouter API 金鑰（選填）：</label>
          <input 
            id="firstOpenRouterApiKey"
            v-model="openRouterApiKey"
            type="password" 
            placeholder="輸入你的 OpenRouter API 金鑰（用於英文學習）"
            class="form-input"
          >
        </div>

        <button 
          @click="handleSave" 
          class="btn btn-primary setup-btn"
          :disabled="!newsApiKey.trim()"
        >
          開始使用
        </button>

        <div class="setup-tips">
          <p><strong>💡 提示：</strong></p>
          <ul>
            <li>NewsAPI 金鑰用於抓取新聞資料</li>
            <li>OpenRouter 金鑰用於 AI 翻譯功能（可稍後設定）</li>
            <li>所有資料都儲存在瀏覽器本地，不會上傳到伺服器</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useApiStore } from '../stores/api'
import { useUiStore } from '../stores/ui'

const apiStore = useApiStore()
const uiStore = useUiStore()

const newsApiKey = ref('')
const openRouterApiKey = ref('')

const handleSave = () => {
  if (!newsApiKey.value.trim()) {
    uiStore.showMessage('請輸入 NewsAPI 金鑰', true)
    return
  }

  apiStore.saveFirstSetup(newsApiKey.value.trim(), openRouterApiKey.value.trim())
  uiStore.showMessage('設定完成！歡迎使用 AI 新聞學習系統')
}
</script>

<style scoped>
.modal-content {
  max-width: 600px;
}

.setup-form {
  margin: 20px 0;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  margin-bottom: 10px;
}

.form-input:focus {
  outline: none;
  border-color: #2196F3;
  box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2);
}

.setup-btn {
  width: 100%;
  padding: 15px;
  font-size: 16px;
  margin-bottom: 20px;
}

.setup-tips {
  padding: 15px;
  background: #e3f2fd;
  border-radius: 5px;
  font-size: 0.9rem;
}

.setup-tips p {
  margin-bottom: 10px;
  font-weight: 600;
}

.setup-tips ul {
  margin: 0;
  padding-left: 20px;
}

.setup-tips li {
  margin-bottom: 5px;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .modal-content {
    margin: 10% auto;
    width: 95%;
  }
}
</style>