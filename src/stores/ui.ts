import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Message {
  text: string
  isError: boolean
  id: number
}

export const useUiStore = defineStore('ui', () => {
  const message = ref<Message | null>(null)
  const showMobileMenu = ref(false)
  let messageId = 0

  const showMessage = (text: string, isError = false) => {
    const id = ++messageId
    message.value = { text, isError, id }

    setTimeout(() => {
      if (message.value && message.value.id === id) {
        message.value = null
      }
    }, 3000)
  }

  const hideMessage = () => {
    message.value = null
  }

  const toggleMobileMenu = () => {
    showMobileMenu.value = !showMobileMenu.value
  }

  const closeMobileMenu = () => {
    showMobileMenu.value = false
  }

  return {
    message,
    showMobileMenu,
    showMessage,
    hideMessage,
    toggleMobileMenu,
    closeMobileMenu
  }
})