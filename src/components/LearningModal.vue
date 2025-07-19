<template>
  <div 
    v-if="newsStore.showLearningModal" 
    class="modal show"
    @click="handleBackdropClick"
  >
    <div class="modal-content" @click.stop>
      <span class="close" @click="newsStore.closeLearningModal()">&times;</span>
      <h2>📚 英文學習 - {{ currentLevel }} 等級</h2>
      
      <div v-if="newsStore.isTranslating" class="loading-content">
        翻譯中，請稍候...
      </div>
      
      <div v-else-if="newsStore.learningContent?.error" class="error-content">
        <div class="error-message">
          {{ newsStore.learningContent.error }}
        </div>
        <button 
          v-if="newsStore.learningContent.error.includes('OpenRouter')"
          @click="handleOpenSettings"
          class="btn btn-primary"
        >
          前往設定
        </button>
      </div>
      
      <div v-else-if="newsStore.learningContent" class="learning-content">
        <!-- 翻譯內容 -->
        <div class="translation-section">
          <h3>
            {{ translationTitle }}
            <button 
              @click="speakText(newsStore.learningContent.chinese_title || '', isChinese ? 'en-US' : 'zh-TW')"
              class="speak-btn"
              title="發音"
            >
              🔊
            </button>
          </h3>
          <h4>{{ newsStore.learningContent.chinese_title || '無標題' }}</h4>
          <p>
            {{ newsStore.learningContent.chinese_content || '無內容' }}
            <button 
              @click="speakText(newsStore.learningContent.chinese_content || '', isChinese ? 'en-US' : 'zh-TW')"
              class="speak-btn"
              title="發音"
            >
              🔊
            </button>
          </p>
        </div>

        <!-- 對話練習 -->
        <div class="dialog-section">
          <h3>{{ dialogTitle }}</h3>
          <div class="dialog-container">
            <div 
              v-for="(dialogPair, index) in dialogPairs" 
              :key="index"
              class="dialog-pair"
            >
              <div v-if="dialogPair.a" class="dialog-person dialog-person-a">
                <strong>A:</strong> {{ dialogPair.a }}
                <button 
                  @click="speakText(dialogPair.a)"
                  class="speak-btn"
                  title="發音"
                >
                  🔊
                </button>
              </div>
              <div v-if="dialogPair.b" class="dialog-person dialog-person-b">
                <strong>B:</strong> {{ dialogPair.b }}
                <button 
                  @click="speakText(dialogPair.b)"
                  class="speak-btn"
                  title="發音"
                >
                  🔊
                </button>
              </div>
            </div>
            <p v-if="dialogPairs.length === 0">無對話內容</p>
          </div>
        </div>

        <!-- 重點單字 -->
        <div class="vocabulary-section">
          <h3>📚 重點單字</h3>
          <div class="vocabulary-list">
            <div 
              v-for="(vocab, index) in newsStore.learningContent.vocabulary || []" 
              :key="index"
              class="vocabulary-item"
            >
              <div>
                <span class="vocabulary-word">
                  {{ vocab.word }}
                  <button 
                    @click="speakText(vocab.word)"
                    class="speak-btn-small"
                    title="發音"
                  >
                    🔊
                  </button>
                </span>
                <span class="vocabulary-meaning"> - {{ vocab.meaning }}</span>
              </div>
              <div>
                <span class="vocabulary-level">{{ vocab.level }}</span>
                <button 
                  :id="`vocab-btn-${newsStore.currentLearningArticle}-${index}`"
                  class="add-vocab-btn"
                  :class="{ added: addedVocab.has(`${vocab.word}-${index}`) }"
                  :disabled="addedVocab.has(`${vocab.word}-${index}`)"
                  @click="handleAddVocabulary(vocab.word, vocab.meaning, vocab.level, index)"
                >
                  {{ addedVocab.has(`${vocab.word}-${index}`) ? '已加入' : '加入生字簿' }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 簡化英文 -->
        <div class="simplified-section">
          <h3>
            {{ simplifiedTitle }}
            <button 
              @click="speakText(newsStore.learningContent.simplified_english || '')"
              class="speak-btn"
              title="發音"
            >
              🔊
            </button>
          </h3>
          <div class="simplified-content">
            {{ newsStore.learningContent.simplified_english || '無簡化版本' }}
          </div>
        </div>

        <!-- 語言檢測信息 -->
        <div class="language-info">
          <strong>💡 語言檢測：</strong>
          {{ newsStore.learningContent.is_chinese_source ? '中文 → 英文' : '英文 → 中文' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useNewsStore } from '../stores/news'
import { useApiStore } from '../stores/api'

const newsStore = useNewsStore()
const apiStore = useApiStore()

const addedVocab = ref(new Set<string>())
const currentLevel = ref('A3') // 預設等級，可以從設定中獲取

const dialogPairs = computed(() => {
  const dialog = newsStore.learningContent?.dialog
  if (!dialog || !dialog.person_a || !dialog.person_b) return []
  
  const maxLength = Math.max(dialog.person_a.length, dialog.person_b.length)
  const pairs = []
  
  for (let i = 0; i < maxLength; i++) {
    pairs.push({
      a: dialog.person_a[i],
      b: dialog.person_b[i]
    })
  }
  
  return pairs
})

const isChinese = computed(() => 
  newsStore.learningContent?.is_chinese_source || false
)

const translationTitle = computed(() => 
  isChinese.value ? '📖 英文翻譯' : '📖 中文翻譯'
)

const dialogTitle = computed(() => 
  isChinese.value ? '💬 英文對話練習' : '💬 對話練習'
)

const simplifiedTitle = computed(() => 
  isChinese.value ? '📝 簡化英文' : '📝 簡化英文'
)

const handleBackdropClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    newsStore.closeLearningModal()
  }
}

const handleOpenSettings = () => {
  apiStore.openSettingsModal()
  newsStore.closeLearningModal()
}

const handleAddVocabulary = async (word: string, meaning: string, level: string, index: number) => {
  const key = `${word}-${index}`
  
  if (addedVocab.value.has(key)) return
  
  const success = await newsStore.addToVocabulary(
    word, 
    meaning, 
    level, 
    newsStore.currentLearningArticle!
  )
  
  if (success) {
    addedVocab.value.add(key)
  }
}

const speakText = (text: string, lang = 'en-US') => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    window.speechSynthesis.speak(utterance)
  } else {
    // 可以考慮添加錯誤提示，但這裡先保持簡潔
    console.warn('您的瀏覽器不支援語音合成功能')
  }
}
</script>

<style scoped>
.loading-content {
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 1.1rem;
}

.error-content {
  text-align: center;
  padding: 20px;
}

.error-message {
  color: #f44336;
  margin-bottom: 15px;
}

.learning-content > div {
  margin-bottom: 25px;
}

.translation-section h4 {
  color: #333;
  margin-bottom: 10px;
  font-size: 1.1rem;
}

.translation-section p {
  line-height: 1.6;
  color: #555;
}

.dialog-section {
  margin: 20px 0;
}

.dialog-container {
  background: #f9f9f9;
  border-radius: 10px;
  padding: 15px;
}

.dialog-pair {
  margin-bottom: 10px;
}

.dialog-person {
  margin: 10px 0;
  padding: 10px;
  border-radius: 8px;
}

.dialog-person-a {
  background: #e3f2fd;
  margin-right: 20px;
}

.dialog-person-b {
  background: #f3e5f5;
  margin-left: 20px;
}

.vocabulary-list {
  margin: 20px 0;
}

.vocabulary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 5px 0;
  background: #f5f5f5;
  border-radius: 8px;
}

.vocabulary-word {
  font-weight: bold;
  color: #2196F3;
}

.vocabulary-meaning {
  color: #666;
}

.vocabulary-level {
  background: #4CAF50;
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  margin-right: 10px;
}

.add-vocab-btn {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.3s ease;
}

.add-vocab-btn:disabled {
  background: #ccc;
  color: #666;
  cursor: not-allowed;
}

.add-vocab-btn.added {
  background: #666;
  color: white;
}

.simplified-content {
  background: #f0f0f0;
  padding: 15px;
  border-radius: 10px;
  line-height: 1.6;
}

.language-info {
  margin-top: 15px;
  padding: 10px;
  background: #e3f2fd;
  border-radius: 5px;
  font-size: 0.9rem;
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
  margin-left: 8px;
}

.speak-btn:hover {
  background: #f0f0f0;
  opacity: 1;
  transform: scale(1.1);
}

.speak-btn-small {
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  padding: 2px;
  border-radius: 50%;
  transition: all 0.3s ease;
  opacity: 0.7;
  margin-left: 5px;
}

.speak-btn-small:hover {
  background: #f0f0f0;
  opacity: 1;
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .vocabulary-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .dialog-person-a {
    margin-right: 0;
  }
  
  .dialog-person-b {
    margin-left: 0;
  }
}
</style>