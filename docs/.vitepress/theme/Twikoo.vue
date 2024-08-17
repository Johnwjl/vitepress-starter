<script setup>
import { onMounted, nextTick } from 'vue'

const envId = 'https://comments.jellowang.cn/'

onMounted(async () => {

  await nextTick()

  if (typeof window !== 'undefined') {
    
    const twikoo = await import('twikoo');

    twikoo.init({
      envId,
      el: '#comment-container',
    });
  }

})
</script>

<template>
    <div id="comment-container"></div>
</template>
