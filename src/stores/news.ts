import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { useApiStore } from './api'
import { useUiStore } from './ui'

export interface Article {
  id: number
  source_name?: string
  author?: string
  title: string
  description?: string
  url: string
  urlToImage?: string
  publishedAt: string
  content?: string
  is_favorite: boolean
}

export interface TranslationData {
  chinese_title?: string
  chinese_content?: string
  vocabulary?: Array<{
    word: string
    meaning: string
    level: string
  }>
  dialog?: {
    person_a: string[]
    person_b: string[]
  }
  simplified_english?: string
  is_chinese_source?: boolean
  error?: string
}

export const useNewsStore = defineStore('news', () => {
  const articles = ref<Article[]>([])
  const currentView = ref<'all' | 'favorites'>('all')
  const isLoading = ref(false)
  const showLearningModal = ref(false)
  const currentLearningArticle = ref<number | null>(null)
  const learningContent = ref<TranslationData | null>(null)
  const isTranslating = ref(false)

  const apiStore = useApiStore()
  const uiStore = useUiStore()

  const loadArticles = async () => {
    isLoading.value = true
    try {
      const url = currentView.value === 'favorites' ? '/api/articles?favorites=true' : '/api/articles'
      const response = await axios.get(url)
      articles.value = response.data
    } catch (error) {
      uiStore.showMessage('載入文章失敗：' + (error as Error).message, true)
    } finally {
      isLoading.value = false
    }
  }

  const updateNews = async () => {
    const apiKeys = apiStore.getApiKeys()
    if (!apiKeys.newsApiKey) {
      uiStore.showMessage('請先設定 NewsAPI 金鑰', true)
      apiStore.openSettingsModal()
      return
    }

    try {
      const response = await axios.post('/api/update', {
        news_api_key: apiKeys.newsApiKey
      })
      
      const data = response.data
      if (data.success) {
        uiStore.showMessage(`成功更新！獲取 ${data.total_fetched || 0} 篇文章，新增 ${data.saved_count} 篇`)
        await loadArticles()
      } else {
        uiStore.showMessage(data.message, true)
      }
    } catch (error) {
      uiStore.showMessage('更新失敗：' + (error as Error).message, true)
    }
  }

  const showArticles = (view: 'all' | 'favorites') => {
    currentView.value = view
    loadArticles()
  }

  const toggleFavorite = async (articleId: number) => {
    try {
      const response = await axios.post(`/api/articles/${articleId}/favorite`)
      const data = response.data

      if (data.success) {
        await loadArticles()
      } else {
        uiStore.showMessage(data.message, true)
      }
    } catch (error) {
      uiStore.showMessage('操作失敗：' + (error as Error).message, true)
    }
  }

  const deleteArticle = async (articleId: number) => {
    if (!confirm('確定要刪除這篇文章嗎？')) return

    try {
      const response = await axios.delete(`/api/articles/${articleId}`)
      const data = response.data

      if (data.success) {
        uiStore.showMessage('文章已刪除')
        await loadArticles()
      } else {
        uiStore.showMessage(data.message, true)
      }
    } catch (error) {
      uiStore.showMessage('刪除失敗：' + (error as Error).message, true)
    }
  }

  const openLearningModal = async (articleId: number) => {
    currentLearningArticle.value = articleId
    showLearningModal.value = true
    learningContent.value = null
    isTranslating.value = false

    try {
      // 檢查是否已有翻譯快取
      const checkResponse = await axios.get(`/api/articles/${articleId}/translation-check`)
      const checkResult = checkResponse.data

      if (checkResult.exists) {
        learningContent.value = checkResult.data
        return
      }

      // 檢查API金鑰
      const apiKeys = apiStore.getApiKeys()
      if (!apiKeys.openRouterApiKey) {
        learningContent.value = {
          error: '需要設定 OpenRouter API 金鑰才能使用翻譯功能'
        }
        return
      }

      // 開始翻譯
      isTranslating.value = true
      const response = await axios.post(`/api/articles/${articleId}/translate`, {
        openrouter_api_key: apiKeys.openRouterApiKey
      })
      
      const result = response.data
      if (result.success) {
        learningContent.value = result.data
      } else {
        learningContent.value = {
          error: result.message
        }
      }
    } catch (error) {
      learningContent.value = {
        error: (error as Error).message
      }
    } finally {
      isTranslating.value = false
    }
  }

  const closeLearningModal = () => {
    showLearningModal.value = false
    currentLearningArticle.value = null
    learningContent.value = null
  }

  const addToVocabulary = async (word: string, meaning: string, level: string, articleId: number) => {
    try {
      const response = await axios.post('/api/vocabulary', {
        word,
        meaning,
        level,
        source_article_id: articleId,
        source_article_title: '新聞文章'
      })

      const data = response.data
      if (data.success) {
        uiStore.showMessage('單字已加入生字簿！')
        return true
      } else {
        uiStore.showMessage('加入失敗：' + data.message, true)
        return false
      }
    } catch (error) {
      uiStore.showMessage('加入失敗：' + (error as Error).message, true)
      return false
    }
  }

  const clearTranslations = async () => {
    if (!confirm('確定要清除所有翻譯快取嗎？這將刪除所有已翻譯的內容，下次點擊學習時需要重新翻譯。')) return

    try {
      const response = await axios.post('/api/clear-translations')
      const data = response.data

      if (data.success) {
        uiStore.showMessage('翻譯快取已清除')
      } else {
        uiStore.showMessage('清除失敗：' + data.message, true)
      }
    } catch (error) {
      uiStore.showMessage('清除失敗：' + (error as Error).message, true)
    }
  }

  return {
    articles,
    currentView,
    isLoading,
    showLearningModal,
    currentLearningArticle,
    learningContent,
    isTranslating,
    loadArticles,
    updateNews,
    showArticles,
    toggleFavorite,
    deleteArticle,
    openLearningModal,
    closeLearningModal,
    addToVocabulary,
    clearTranslations
  }
})