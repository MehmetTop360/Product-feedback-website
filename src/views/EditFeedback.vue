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
        <img src="../assets/pen-icon.svg" alt="Plus Icon" class="form-img" />

        Edit Feedback
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
        <select v-model="category" class="form-input" required>
          <option v-for="(item, index) in categories" :key="index" :value="item">
            {{ item }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Update Status</label>
        <select v-model="status" class="form-input" required>
          <option value="suggestion">Suggestion</option>
          <option value="planned">Planned</option>
          <option value="in-progress">In-Progress</option>
          <option value="live">Live</option>
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
        <button type="button" class="delete-button" @click="deleteFeedback">Delete Feedback</button>
        <button type="button" class="cancel-button" @click="$router.push('/')">Cancel</button>
        <button type="submit" class="submit-button">Save Changes</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()
const feedbackId = Number(route.params.id)
const feedbackDetail = ref<any>({
  title: '',
  description: '',
  category: '',
  status: '',
  comments: []
})

const status = ref('')
const title = ref('')
const category = ref(null)
const description = ref('')
const categories = ref(['Feature', 'UI', 'UX', 'Enhancement', 'Bug'])

const submitForm = () => {
  const productRequests: any[] = JSON.parse(localStorage.getItem('productRequests') || '[]')
  const index = productRequests.findIndex((item) => item.id === feedbackId)
  if (index !== -1) {
    productRequests[index] = {
      ...productRequests[index],
      title: title.value,
      category: category.value,
      status: status.value,
      description: description.value
    }
    localStorage.setItem('productRequests', JSON.stringify(productRequests))

    // Navigate to the main page after successful submission
    router.push('/')
  }
}

const deleteFeedback = () => {
  // Remove from 'productRequests'
  const productRequests: any[] = JSON.parse(localStorage.getItem('productRequests') || '[]')
  const updatedProductRequests = productRequests.filter((item) => item.id !== feedbackId)
  localStorage.setItem('productRequests', JSON.stringify(updatedProductRequests))

  // Remove from 'upvotedItemIds'
  const upvotedItemIds: number[] = JSON.parse(localStorage.getItem('upvotedItemIds') || '[]')
  const updatedUpvotedItemIds = upvotedItemIds.filter((id) => id !== feedbackId)
  localStorage.setItem('upvotedItemIds', JSON.stringify(updatedUpvotedItemIds))

  // Redirect to the main page
  router.push('/')
}

onMounted(async () => {
  const productRequests: any[] = JSON.parse(localStorage.getItem('productRequests') || '[]')
  const foundFeedback = productRequests.find((item) => item.id === feedbackId)

  if (foundFeedback) {
    feedbackDetail.value = foundFeedback
    title.value = feedbackDetail.value.title
    category.value = feedbackDetail.value.category
    description.value = feedbackDetail.value.description
    status.value = feedbackDetail.value.status
  }
})
</script>

<style scoped>
.delete-button {
  margin-right: 1vh;
  background: var(--delete-button-bg);
}
.delete-button:hover {
  transition: 0.3s;
  opacity: 0.8;
}

@media (min-width: 768px) {
  .button-box {
    display: grid;
    grid-template-columns: 1fr 2fr 0.65fr;
    justify-content: flex-end;
  }
  .cancel-button {
    justify-self: flex-end;
    width: fit-content;
  }
  .delete-button {
    justify-self: flex-start;
    width: fit-content;
  }
  .submit-button {
    justify-self: flex-end;
    width: fit-content;
  }
}
</style>
