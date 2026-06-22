<script setup>
import DefaultTheme from 'vitepress/theme'
import FeedbackLink from './components/FeedbackLink.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #layout-bottom>
      <FeedbackLink />
    </template>
  </Layout>
</template>
