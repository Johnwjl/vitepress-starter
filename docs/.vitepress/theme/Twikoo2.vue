<script setup>
import { onMounted, nextTick } from 'vue'

const envId = 'https://comments.jellowang.cn/'

onMounted(async () => {

  console.log('twikoo onMounted')

  await nextTick()

  if (typeof window !== 'undefined') {
    
    const twikoo = await import('twikoo');

    twikoo.init({
      envId,
      el: '#twikoo',
    });
  }

})
</script>

<template>
    <div id="comment-container vp-raw">
      <div id="twikoo"></div>  
    </div>
</template>
