import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { useUiStore } from './ui'

export interface VocabularyItem {
  id: number
  word: string
  meaning: string
  level: string
  source_article_id?: number
  source_article_title?: string
  created_at: string
}

export const useVocabularyStore = defineStore('vocabulary', () => {
  const vocabularyList = ref<VocabularyItem[]>([])
  const isLoading = ref(false)

  const uiStore = useUiStore()

  const loadVocabulary = async () => {
    isLoading.value = true
    try {
      const response = await axios.get('/api/vocabulary')
      vocabularyList.value = response.data
    } catch (error) {
      uiStore.showMessage('載入生字簿失敗：' + (error as Error).message, true)
    } finally {
      isLoading.value = false
    }
  }

  const addVocabulary = async (word: string, meaning: string, level: string, sourceArticleId?: number, sourceArticleTitle?: string) => {
    try {
      const response = await axios.post('/api/vocabulary', {
        word,
        meaning,
        level,
        source_article_id: sourceArticleId,
        source_article_title: sourceArticleTitle
      })

      const data = response.data
      if (data.success) {
        uiStore.showMessage('單字已加入生字簿！')
        await loadVocabulary() // 重新載入列表
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

  const deleteVocabulary = async (id: number) => {
    if (!confirm('確定要刪除這個單字嗎？')) return

    try {
      const response = await axios.delete(`/api/vocabulary/${id}`)
      const data = response.data

      if (data.success) {
        uiStore.showMessage('單字已刪除')
        await loadVocabulary() // 重新載入列表
      } else {
        uiStore.showMessage('刪除失敗：' + data.message, true)
      }
    } catch (error) {
      uiStore.showMessage('刪除失敗：' + (error as Error).message, true)
    }
  }

  return {
    vocabularyList,
    isLoading,
    loadVocabulary,
    addVocabulary,
    deleteVocabulary
  }
})