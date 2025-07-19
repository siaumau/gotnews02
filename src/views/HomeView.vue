<template>
  <div id="home">
    <AppHeader />
    <NavControls />
    <MessageDisplay />
    <LoadingSpinner />
    <ArticlesGrid />
    <LearningModal />
    <SettingsModal />
    <FirstSetupModal />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useNewsStore } from '../stores/news'
import { useApiStore } from '../stores/api'
import AppHeader from '../components/AppHeader.vue'
import NavControls from '../components/NavControls.vue'
import MessageDisplay from '../components/MessageDisplay.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import ArticlesGrid from '../components/ArticlesGrid.vue'
import LearningModal from '../components/LearningModal.vue'
import SettingsModal from '../components/SettingsModal.vue'
import FirstSetupModal from '../components/FirstSetupModal.vue'

const newsStore = useNewsStore()
const apiStore = useApiStore()

onMounted(() => {
  apiStore.checkApiKeys()
  newsStore.loadArticles()
})
</script>

<style scoped>
#home {
  min-height: 100vh;
}
</style>
