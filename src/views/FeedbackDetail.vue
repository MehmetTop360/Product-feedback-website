<template>
  <div class="main-container2">
    <div class="buttons-box">
      <div class="back-box2" @click.prevent="$router.go(-1)">
        <button class="back-button2">
          <img src="../assets/icon-arrow-left.svg" alt="Arrow Left Icon" class="back-icon2" />
          Go Back
        </button>
      </div>
      <div class="edit-feedback-box">
        <button class="edit-feedback-button" @click="$router.push(`/editpage/${feedbackId}`)">
          Edit Feedback
        </button>
      </div>
    </div>

    <div class="feedback-item2">
      <div class="feedback-details2">
        <div class="feedback-title">{{ feedbackDetail.title }}</div>
        <div class="description">{{ feedbackDetail.description }}</div>
        <div class="category-display">{{ feedbackDetail.category }}</div>
      </div>
    </div>

    <div class="comments-section">
      <div class="comments-header">
        <h2>{{ comments.length }} Comments</h2>
      </div>

      <div class="comment-list">
        <div v-for="comment in comments" :key="comment.id" class="comment-item">
          <div class="comment-details">
            <img :src="comment.user.image" alt="User Profile Photo" class="comment-profile-photo" />
            <div class="comment-description">
              <div class="comment-user-part">
                <span class="comment-user-name">{{ comment.user.name }}</span>
                <span class="comment-user-username"> @{{ comment.user.username }}</span>
              </div>
              <div class="comment-text">
                {{ comment.content }}
              </div>
            </div>
            <button class="reply-button">Reply</button>
          </div>
          <div class="reply-list" v-if="comment.replies && comment.replies.length">
            <div v-for="reply in comment.replies" :key="reply.id" class="comment-reply">
              <div class="reply-details">
                <img :src="reply.user.image" alt="User Profile Photo" class="reply-profile-photo" />
                <div class="reply-description">
                  <div class="reply-user-part">
                    <span class="reply-user-name">{{ reply.user.name }}</span>
                    <span class="reply-user-username"> @{{ reply.user.username }}</span>
                  </div>
                  <span class="reply-text">{{ reply.content }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="add-comment-section">
      <div class="add-comment-title">Add Comment</div>
      <div class="comment-input">
        <textarea
          v-model="newComment"
          placeholder="Type your comment here"
          required
        />
      </div>
      <div class="comment-controls">
        <div class="characters-left">
          <span>{{ updateCharacterCount }} characters left</span>
        </div>
        <div class="post-comment">
          <button class="post-comment-button" :disabled="!newComment" @click="addComment">
            Post Comment
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router'

const route = useRoute()
const feedbackId = Number(route.params.id)

const feedbackDetail = ref<any>({ title: '', description: '', category: '', comments: [] })
const comments = ref<any[]>([])
const newComment = ref<string>('')
const maxCommentLength = 200

const currentUser = ref({
  image: '../user-images/image-zena.jpg',
  name: 'Zena Kelley',
  username: 'velvetround'
})

const updateCharacterCount = computed(() => {
  return maxCommentLength - newComment.value.length;
})

const addComment = () => {
  if (feedbackDetail.value && feedbackDetail.value.comments) {
    feedbackDetail.value.comments.push({
      id: comments.value.length + 1,
      content: newComment.value,
      user: currentUser.value
    })

    const productRequests: any[] = JSON.parse(localStorage.getItem('productRequests') || '[]')
    const index = productRequests.findIndex((item) => item.id === feedbackId)
    if (index !== -1) {
      productRequests[index] = feedbackDetail.value
      localStorage.setItem('productRequests', JSON.stringify(productRequests))
    }

    newComment.value = ''
  }
}

onMounted(async () => {
  const productRequests: any[] = JSON.parse(localStorage.getItem('productRequests') || '[]')
  const foundFeedback = productRequests.find((item) => item.id === feedbackId)

  if (foundFeedback) {
    feedbackDetail.value = foundFeedback
    comments.value = foundFeedback.comments || []
  } else {
    feedbackDetail.value = null
  }
})
</script>

<style>
.main-container2 {
  align-self: center;
  width: 80%;
  max-width: 40rem;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  padding: 0 2.5rem;
  margin: 3vh 0;
}

.back-box2 {
  display: flex;
  cursor: pointer;
  width: max-content;
}
.back-icon2 {
  margin-right: 0.625rem;
  color: var(--back-icon-color);
}
.back-button2 {
  border: none;
  background-color: transparent;
  color: var(--back-icon-color);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
}
.edit-feedback-box {
  align-self: flex-end;
  width: fit-content;
}

.buttons-box {
  width: 100%;
  display: grid;
  flex-direction: column;
  justify-content: flex-start;
  grid-template-columns: 1fr 0.2fr;
  height: auto;
}

.feedback-details2 {
  color: var(--secondary-button-bg-title);
  font-size: 1.5vh;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  width: 90%;
  align-self: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  margin-left: 5vh;
  grid-area: details;
}
.feedback-item2 {
  align-content: center;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  flex-direction: row;
  margin-top: 0.625rem;
  background-color: white;
  width: 100%;
  height: 18vh;
  border-radius: 0.625rem;
  padding: 1vh 0 1vh 0;
}
.edit-feedback-button {
  border-radius: 0.625rem;
  background: var(--main-button-bg);
  color: var(--button-text-color);
  font-size: 0.875rem;
  font-weight: 700;
  text-align: center;
  align-items: center;
  border: none;
  width: max-content;
  height: 4vh;
  padding: 1vh;
  cursor: pointer;
}
.edit-feedback-button:hover {
  transition: 0.3s;
  opacity: 0.8;
}
.reply-list {
  border-width: 1%;
  border-left: 0.2px solid var(--line-color);
  width: 80%;
}

.comment-reply {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 3vh 1vh;
  justify-content: flex-start;
}

.comments-section {
  margin: 2vh 0;
  width: 90%;
  background-color: white;
  border-radius: 0.625rem;
  padding: 5%;
}
.comment-list {
  width: 100%;
}

.comments-header {
  color: #3a4374;
  font-size: 1.125rem;
  font-weight: 700;
}

.comment-item {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding: 2vh 2vh 5vh 2vh;
  margin: 3vh 0;
  justify-content: stretch;
  border-bottom: 1px solid var(--line-color);
}

.comment-list .comment-item:last-child {
  border-bottom: none;
}

.comment-profile-photo {
  width: 3.125rem;
  height: 3.125rem;
  border-radius: 50%;
  margin-right: 0.625rem;
  grid-area: photo;
}

.reply-profile-photo {
  width: 3.125rem;
  height: 3.125rem;
  border-radius: 50%;
  margin-right: 10px;
  grid-area: rphoto;
}

.reply-details {
  margin-left: 3vh;
  display: grid;
  grid-template-columns: 0.2fr 1fr;
  grid-template-areas: 'rphoto rdetails';
  width: 100%;
}

.reply-user-part {
  width: 55%;
  display: grid;
  grid-template-rows: 50% 50%;
  align-self: center;
}

.reply-user-name {
  color: var(--text-color);
  font-family: Jost;
  font-size: 0.875rem;
  font-weight: 700;
}

.reply-user-username {
  color: var(--back-icon-color);
  font-size: 0.875rem;
  font-weight: 400;
}

.reply-description {
  grid-area: rdetails;
}

.reply-text {
  color: var(--back-icon-color);
  font-size: 0.95rem;
  font-weight: 400;
}

.comment-details {
  display: grid;
  flex-direction: column;
  grid-template-columns: 0.25fr 1fr 0.1fr;
  grid-template-areas: 'photo details replybutton';
  width: 100%;
}
.comment-description {
  grid-area: details;
}

.comment-user-part {
  width: 55%;
  display: grid;
  grid-template-rows: 50% 50%;
  align-self: center;
}
.comment-user-name {
  color: var(--text-color);
  font-family: Jost;
  font-size: 0.875rem;
  font-weight: 700;
}
.comment-user-username {
  color: var(--back-icon-color);
  font-size: 0.875rem;
  font-weight: 400;
}
.comment-text {
  color: var(--back-icon-color);
  font-size: 0.95rem;
  font-weight: 400;
}
.reply-button {
  grid-area: replybutton;
  font-weight: bold;
  color: var(--main-button-bg);
  margin-left: 1.25rem;
  height: fit-content;
  cursor: pointer;
  border: none;
  background-color: white;
}
.add-comment-section {
  align-items: flex-start;
  align-content: flex-start;
  justify-content: flex-start;
  width: 90%;
  height: 90%;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 5%;
}

.add-comment-title {
  color: #3a4374;
  font-size: 1.125rem;
  font-weight: 700;
  grid-area: 'title';
}

.comment-input {
  margin: 7% 0;
  width: 100%;
  height: 9vh;
  grid-area: 'input';
  border-radius: 0.3125rem;
  border: none;
  background: none;
  box-shadow: none;
}
.comment-input textarea {
  width: 90%;
  height: inherit;
  background-clip: padding-box;
  appearance: none;
  background-color: var(--form-input-bg);
  border-radius: 0.5rem;
  border: none;
  font-size: 0.9rem;
  padding: 0.7rem 1rem 0.7rem 1rem;
  display: block;
  color: var(--text-color);
  font-weight: 400;
}

.comment-controls {
  margin-top: 1vh;
  grid-area: 'controls';
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  align-content: flex-start;
}

.characters-left {
  align-self: flex-start;
  width: 50%;
  font-size: 1rem;
}
.post-comment {
  align-self: flex-end;
  justify-self: flex-end;
}

.post-comment:hover {
  transition: 0.3s;
  opacity: 0.8;
}

.post-comment-button {
  width: fit-content;
  border-radius: 0.625rem;
  background: var(--submit-button-color);
  padding: 1vh;
  color: var(--button-text-color);
  font-size: 0.875rem;
  font-weight: 700;
  border: none;
  cursor: pointer;
}
</style>
