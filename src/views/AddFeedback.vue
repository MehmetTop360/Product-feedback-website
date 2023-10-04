<template>
  <div class="form-container">
    <div class="back-box" @click.prevent="$router.go(-1)">
      <button class="back-button">
        <img src="../assets/icon-arrow-left.svg" alt="Arrow Left Icon" class="back-icon" />
        Go Back
      </button>
    </div>
    <form @submit.prevent="submitForm" class="form-box">
      <div class="form-title">
        <img src="../assets/plus-icon.svg" alt="Plus Icon" class="form-img" />
        Create New Feedback
      </div>
      <div class="form-group">
        <label class="form-label">Title</label>
        <input
          v-model="title"
          placeholder="Add a short, descriptive headline "
          class="form-input"
          required
        />
      </div>

      <div class="form-group">
        <label class="form-label">Category</label>
        <select v-model="category" class="form-input" required data-testid="category-select">
          <option v-for="(item, index) in categories" :key="index" :value="item">
            {{ item }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Feedback Description</label>
        <textarea
          v-model="description"
          placeholder="Include any specific comments on what should be improved, added, etc. "
          class="form-input"
          required
        ></textarea>
      </div>
      <div class="button-box">
        <button type="button" class="cancel-button" @click="$router.push('/')">Cancel</button>
        <button type="submit" class="submit-button">Add Feedback</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const title = ref('')
const category = ref(null)
const description = ref('')
const categories = ref(['Feature', 'UI', 'UX', 'Enhancement', 'Bug'])
const productRequests = ref<any[]>(JSON.parse(localStorage.getItem('productRequests') || '[]'))

const addFeedback = (feedback: any) => {
  productRequests.value.push(feedback)
  localStorage.setItem('productRequests', JSON.stringify(productRequests.value))
}

const currentUser = ref({
  image: '../user-images/image-zena.jpg',
  name: 'Zena Kelley',
  username: 'velvetround'
})

const submitForm = () => {
  const feedback = {
    id: productRequests.value.length
      ? productRequests.value[productRequests.value.length - 1].id + 1
      : 1,
    title: title.value,
    category: category.value,
    upvotes: 0,
    status: 'suggestion',
    description: description.value,
    comments: [],
    user: currentUser.value
  }

  addFeedback(feedback)

  // Reset form
  title.value = ''
  category.value = null
  description.value = ''
}

onMounted(async () => {
  if (!localStorage.getItem('productRequests')) {
    try {
      const response = await fetch('../data.json')
      const data = await response.json()
      localStorage.setItem('currentUser', JSON.stringify(data.currentUser))
      localStorage.setItem('productRequests', JSON.stringify(data.productRequests))
    } catch (error) {
      console.error('Error fetching data.json:', error)
    }
  } else {
    productRequests.value = JSON.parse(localStorage.getItem('productRequests') || '[]')
  }
})
</script>

<style scoped>
@media (min-width: 48rem) {
  .button-box {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
