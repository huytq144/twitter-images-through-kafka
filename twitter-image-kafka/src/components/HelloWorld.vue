<script setup>
defineProps({
  imageUrls: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <a v-for="url in imageUrls">
    <img :src="url" class="image-cata" />
  </a>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

figure {
  display: inline;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

.image-cata {
  width: 300px;
  height: auto;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
