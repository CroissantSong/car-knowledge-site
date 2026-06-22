<script setup>
const githubIssuesUrl = 'https://github.com/CroissantSong/car-knowledge-site/issues'
</script>

<template>
  <div class="feedback-bar">
    <span class="feedback-icon">💬</span>
    <span class="feedback-text">有问题或建议？</span>
    <a class="feedback-link" :href="githubIssuesUrl" target="_blank" rel="noopener">
      前往 GitHub 提交反馈 →
    </a>
  </div>
</template>

<style scoped>
.feedback-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
  font-size: 13px;
  color: var(--vp-c-text-2, #4a5a70);
  background: var(--vp-c-bg-soft, #eef6f3);
  border-top: 1px solid var(--auto-border, rgba(20, 33, 61, 0.12));
}

.feedback-icon {
  font-size: 15px;
}

.feedback-text {
  font-weight: 600;
}

.feedback-link {
  font-weight: 700;
  color: var(--vp-c-brand-2, #0d9488);
  text-decoration: none;
  transition: color 0.15s;
}

.feedback-link:hover {
  color: var(--vp-c-brand-1, #0f766e);
  text-decoration: underline;
}



@media (max-width: 640px) {
  .feedback-bar {
    flex-wrap: wrap;
    gap: 4px 8px;
    padding: 12px 16px;
    font-size: 12.5px;
  }
}
</style>
