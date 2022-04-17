<script setup>
import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue'

const imageUrls = ref([])

// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:8081')

// Connection opened
socket.addEventListener('open', function (event) {
  socket.send('Hello Server!')
})

// Listen for messages
socket.addEventListener('message', function (event) {
  if (imageUrls.value.length === 100) {
    imageUrls.value = []
  }
  const mediaData = JSON.parse(event.data)

  if (Array.isArray(mediaData.media)) {
    for (const image of mediaData.media) {
      if (!imageUrls.value.includes(image.media_url_https)) {
        imageUrls.value.push(image.media_url_https)
      }
    }
  }
})
</script>

<template>
  <HelloWorld :image-urls="imageUrls" />
</template>

<style>
@import './assets/base.css';

#app {
  max-width: 100%;
  margin: 0;
  padding: 2rem;
  font-weight: normal;
}
</style>
