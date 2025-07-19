<template>
  <div 
    v-if="apiStore.showSettings" 
    class="modal show"
    @click="handleBackdropClick"
  >
    <div class="modal-content" @click.stop>
      <span class="close" @click="apiStore.closeSettingsModal()">&times;</span>
      <h2>⚙️ API 設定</h2>
      
      <div class="settings-form">
        <div class="form-group">
          <label for="newsApiKey">NewsAPI 金鑰：</label>
          <input 
            id="newsApiKey"
            v-model="newsApiKey"
            type="password" 
            placeholder="輸入你的 NewsAPI 金鑰"
            class="form-input"
          >
          <small class="form-help">
            用於抓取新聞資料，可從 
            <a href="https://newsapi.org" target="_blank">NewsAPI</a> 
            免費申請
          </small>
        </div>

        <div class="form-group">
          <label for="openRouterApiKey">OpenRouter API 金鑰：</label>
          <input 
            id="openRouterApiKey"
            v-model="openRouterApiKey"
            type="password" 
            placeholder="輸入你的 OpenRouter API 金鑰"
            class="form-input"
          >
          <small class="form-help">
            用於英文翻譯功能，可從 
            <a href="https://openrouter.ai" target="_blank">OpenRouter</a> 
            申請
          </small>
        </div>

        <div class="form-actions">
          <button @click="handleSave" class="btn btn-primary">
            💾 儲存
          </button>
          <button @click="handleClear" class="btn btn-secondary">
            🗑️ 清除
          </button>
          <button @click="apiStore.closeSettingsModal()" class="btn btn-secondary">
            ❌ 取消
          </button>
        </div>

        <div class="api-status">
          <h4>📋 API 狀態</h4>
          <p>
            NewsAPI：
            <span :class="newsApiStatusClass">
              {{ newsApiStatusText }}
            </span>
          </p>
          <p>
            OpenRouter：
            <span :class="openRouterApiStatusClass">
              {{ openRouterApiStatusText }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useApiStore } from '../stores/api'
import { useUiStore } from '../stores/ui'

const apiStore = useApiStore()
const uiStore = useUiStore()

const newsApiKey = ref('')
const openRouterApiKey = ref('')

// 監聽模態框顯示狀態，當打開時載入當前的API金鑰
watch(() => apiStore.showSettings, (show) => {
  if (show) {
    newsApiKey.value = apiStore.newsApiKey || ''
    openRouterApiKey.value = apiStore.openRouterApiKey || ''
  }
})

const newsApiStatusText = computed(() => 
  apiStore.newsApiKey ? '✅ 已設定' : '❌ 未設定'
)

const openRouterApiStatusText = computed(() => 
  apiStore.openRouterApiKey ? '✅ 已設定' : '❌ 未設定'
)

const newsApiStatusClass = computed(() => ({
  'status-success': !!apiStore.newsApiKey,
  'status-error': !apiStore.newsApiKey
}))

const openRouterApiStatusClass = computed(() => ({
  'status-success': !!apiStore.openRouterApiKey,
  'status-error': !apiStore.openRouterApiKey
}))

const handleBackdropClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    apiStore.closeSettingsModal()
  }
}

const handleSave = () => {
  apiStore.saveApiKeys(newsApiKey.value, openRouterApiKey.value)
  uiStore.showMessage('API 金鑰已儲存')
  apiStore.closeSettingsModal()
}

const handleClear = () => {
  if (confirm('確定要清除所有 API 金鑰嗎？')) {
    apiStore.clearApiKeys()
    newsApiKey.value = ''
    openRouterApiKey.value = ''
    uiStore.showMessage('API 金鑰已清除')
  }
}
</script>

<style scoped>
.settings-form {
  padding: 20px 0;
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

.form-help {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.4;
}

.form-help a {
  color: #2196F3;
  text-decoration: none;
}

.form-help a:hover {
  text-decoration: underline;
}

.form-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin: 20px 0;
}

.api-status {
  margin-top: 20px;
  padding: 15px;
  background: #f0f0f0;
  border-radius: 10px;
}

.api-status h4 {
  margin-bottom: 10px;
  color: #333;
}

.api-status p {
  margin: 5px 0;
  color: #666;
}

.status-success {
  color: #4CAF50;
  font-weight: 600;
}

.status-error {
  color: #f44336;
  font-weight: 600;
}

@media (max-width: 768px) {
  .form-actions {
    flex-direction: column;
  }
  
  .form-actions .btn {
    width: 100%;
    margin-bottom: 5px;
  }
}
</style>