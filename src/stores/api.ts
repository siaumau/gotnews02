import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface ApiKeys {
  newsApiKey: string | null
  openRouterApiKey: string | null
}

export const useApiStore = defineStore('api', () => {
  const newsApiKey = ref<string | null>(null)
  const openRouterApiKey = ref<string | null>(null)
  const showFirstSetup = ref(false)
  const showSettings = ref(false)

  const getApiKeys = (): ApiKeys => ({
    newsApiKey: newsApiKey.value,
    openRouterApiKey: openRouterApiKey.value
  })

  const checkApiKeys = () => {
    const storedNewsApiKey = localStorage.getItem('newsApiKey')
    const storedOpenRouterApiKey = localStorage.getItem('openRouterApiKey')

    newsApiKey.value = storedNewsApiKey
    openRouterApiKey.value = storedOpenRouterApiKey

    if (!storedNewsApiKey) {
      showFirstSetup.value = true
    }
  }

  const updateApiStatus = () => {
    const storedNewsApiKey = localStorage.getItem('newsApiKey')
    const storedOpenRouterApiKey = localStorage.getItem('openRouterApiKey')

    newsApiKey.value = storedNewsApiKey
    openRouterApiKey.value = storedOpenRouterApiKey
  }

  const openSettingsModal = () => {
    updateApiStatus()
    showSettings.value = true
  }

  const closeSettingsModal = () => {
    showSettings.value = false
  }

  const saveApiKeys = (newsKey: string, openRouterKey: string) => {
    if (newsKey) {
      localStorage.setItem('newsApiKey', newsKey)
      newsApiKey.value = newsKey
    }
    if (openRouterKey) {
      localStorage.setItem('openRouterApiKey', openRouterKey)
      openRouterApiKey.value = openRouterKey
    }
  }

  const clearApiKeys = () => {
    localStorage.removeItem('newsApiKey')
    localStorage.removeItem('openRouterApiKey')
    newsApiKey.value = null
    openRouterApiKey.value = null
  }

  const saveFirstSetup = (newsKey: string, openRouterKey?: string) => {
    localStorage.setItem('newsApiKey', newsKey)
    newsApiKey.value = newsKey
    
    if (openRouterKey) {
      localStorage.setItem('openRouterApiKey', openRouterKey)
      openRouterApiKey.value = openRouterKey
    }
    
    showFirstSetup.value = false
  }

  return {
    newsApiKey,
    openRouterApiKey,
    showFirstSetup,
    showSettings,
    getApiKeys,
    checkApiKeys,
    updateApiStatus,
    openSettingsModal,
    closeSettingsModal,
    saveApiKeys,
    clearApiKeys,
    saveFirstSetup
  }
})