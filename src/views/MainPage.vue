<template>
  <div class="main-container">
    <div class="left-container">
      <div class="header">
        <div class="title">
          <h1 class="title-text">Feedback Board</h1>
        </div>

        <button class="mobile-menu-toggle" @click="toggleNav">
          <img src="../assets/mobile/icon-hamburger.svg" alt="Menu" />
        </button>
      </div>

      <nav :class="{ open: isNavOpen }">
        <button class="nav-close-button" @click="toggleNav">
          <img src="../assets/mobile/icon-close.svg" alt="Close" />
        </button>
        <div class="category-selection">
          <button
            v-for="(item, index) in categories"
            :key="index"
            :class="['category-button', { 'category-button-active': activeCategory === item }]"
            @click="filterByCategory(item)"
          >
            {{ item }}
          </button>
        </div>
        <div class="status-indicator">
          <div class="status-item">
            <img class="status-img" src="../assets/orange-dot.svg" alt="Orange Dot" />
            <span class="status-name">Planned: </span>
            <span class="status-count">{{ statusCounts.planned || 0 }}</span>
          </div>
          <div class="status-item">
            <img class="status-img" src="../assets/purple-dot.svg" alt="Purple Dot" />
            <span class="status-name">In-Progress: </span
            ><span class="status-count">{{ statusCounts['in-progress'] || 0 }}</span>
          </div>
          <div class="status-item">
            <img class="status-img" src="../assets/blue-dot.svg" alt="Blue Dot" />
            <span class="status-name">Live: </span
            ><span class="status-count">{{ statusCounts.live || 0 }}</span>
          </div>
        </div>
      </nav>
    </div>
    <div class="right-container">
      <div class="top-bar">
        <div class="feedback-count">
          <img src="../assets/bulb-topbar.svg" alt="Bulb Icon" class="bulb-icon" />
          {{ feedbackCount }} Suggestions
        </div>
        <div class="sort-options">
          <span class="sort-text">Sort by:</span>
          <select @change="sortFeedbacks" class="sort-select">
            <option value="none" selected>None</option>
            <option value="most-upvotes">Most Upvotes</option>
            <option value="least-upvotes">Least Upvotes</option>
            <option value="most-comments">Most Comments</option>
            <option value="least-comments">Least Comments</option>
          </select>
        </div>
        <button class="add-feedback-button" @click="$router.push('/add')">+ Add Feedback</button>
      </div>

      <div class="feedback-list">
        <div v-if="filteredFeedbackItems.length === 0" class="no-feedback">
          <img src="../assets/illustration-empty.svg" alt="Inspector Gadget" />
          <h2>There is no feedback yet.</h2>
          <p>
            Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas
            to improve our app.
          </p>
          <button class="add-feedback-button" @click="$router.push('/add')">+ Add Feedback</button>
        </div>

        <div v-for="(item, index) in filteredFeedbackItems" :key="index" class="feedback-item">
          <button
            class="upvote-button"
            :class="{ 'upvote-button-active': isUpvoted(item).value }"
            @click="increaseUpvotes(item)"
          >
            <img v-if="!isUpvoted(item).value" src="../assets/icon-arrow-up.svg" alt="Upvote" />
            <img v-else src="../assets/icon-arrow-up-white.svg" alt="Upvote" />
            <span>{{ item.upvotes }}</span>
          </button>

          <div class="feedback-details">

              <div class="feedback-title">
                <router-link :to="`/details/${item.id}`" class="feedback-link">
                {{ item.title }}
              </router-link>
            </div>


            <div class="description">{{ item.description }}</div>
            <div class="category-display">{{ item.category }}</div>
          </div>
          <!-- Comments -->
          <div class="comment-section">
            <img src="../assets/icon-comments.svg" alt="Comments" />
            {{ item.comments.length }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const isNavOpen = ref(false)

function toggleNav() {
  isNavOpen.value = !isNavOpen.value
  document.body.style.overflow = isNavOpen.value ? 'hidden' : 'auto'
}

interface FeedbackItem {
  id: number
  status: 'planned' | 'in-progress' | 'live'
  upvotes: number
  title: string
  description: string
  category: string
  comments: Comment[]
}

interface StatusCounts {
  planned: number
  'in-progress': number
  live: number
}

function sortFeedbacks(event: Event) {
  const sortOption = (event.target as HTMLSelectElement).value
  switch (sortOption) {
    case 'none':
      filteredFeedbackItems.value = [...feedbackItems.value]
      break
    case 'most-upvotes':
      filteredFeedbackItems.value.sort((a, b) => b.upvotes - a.upvotes)
      break
    case 'least-upvotes':
      filteredFeedbackItems.value.sort((a, b) => a.upvotes - b.upvotes)
      break
    case 'most-comments':
      filteredFeedbackItems.value.sort((a, b) => b.comments.length - a.comments.length)
      break
    case 'least-comments':
      filteredFeedbackItems.value.sort((a, b) => a.comments.length - b.comments.length)
      break
  }
}

// Categories array
const categories = ref<string[]>(['All', 'Feature', 'UI', 'UX', 'Bug', 'Enhancement'])

const feedbackItems = ref<FeedbackItem[]>([
  // feedback items
])

// Computed property to calculate status counts
const statusCounts = computed<StatusCounts>(() => {
  return feedbackItems.value.reduce<StatusCounts>(
    (acc, item) => {
      acc[item.status] = acc[item.status] ? acc[item.status] + 1 : 1
      return acc
    },
    { planned: 0, 'in-progress': 0, live: 0 }
  )
})

const activeCategory = ref('All') // Variable to keep track of the active category

function filterByCategory(category: string): void {
  activeCategory.value = category // Updating active category when a category button is clicked
  if (category === 'All') {
    filteredFeedbackItems.value = feedbackItems.value
  } else {
    filteredFeedbackItems.value = feedbackItems.value.filter((item) => item.category === category)
  }
}

const filteredFeedbackItems = ref<FeedbackItem[]>([])

const feedbackCount = computed(() => {
  return feedbackItems.value.length
})

// Creating a new ref to store upvoted item IDs
const upvotedItemIds = ref<number[]>(JSON.parse(localStorage.getItem('upvotedItemIds') || '[]'))

function increaseUpvotes(feedbackItem: FeedbackItem) {
  const index = upvotedItemIds.value.indexOf(feedbackItem.id)
  if (index === -1) {
    // Not upvoted yet, add to upvotes and add ID to upvotedItemIds
    feedbackItem.upvotes += 1
    upvotedItemIds.value.push(feedbackItem.id)
  } else {
    // Already upvoted, remove upvote and remove ID from upvotedItemIds
    feedbackItem.upvotes = Math.max(feedbackItem.upvotes - 1, 0)
    upvotedItemIds.value.splice(index, 1)
  }
  // Save the upvoted item IDs to local storage
  localStorage.setItem('upvotedItemIds', JSON.stringify(upvotedItemIds.value))

  // Update the productRequests in local storage
  localStorage.setItem('productRequests', JSON.stringify(feedbackItems.value))
}

function isUpvoted(feedbackItem: FeedbackItem) {
  return computed(() => upvotedItemIds.value.includes(feedbackItem.id))
}

onMounted(() => {
  let productRequests = JSON.parse(localStorage.getItem('productRequests') || '[]')
  feedbackItems.value = productRequests.map((item: any) => {
    if (!item.comments) {
      item.comments = []
    }
    return item
  })
  filteredFeedbackItems.value = feedbackItems.value
})
</script>

<style>
.main-container {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
}

.left-container {
  width: 100%;
  align-content: space-evenly;
  display: flex;
  flex-direction: column;
}

.right-container {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.header {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-width: 100%;
}

.title-text {
  font-size: 2.5vh;
  font-weight: bolder;
  text-align: start;
  margin-left: 1%;
  padding: 2rem 0rem 0.8rem 0rem;
  color: white;
  max-width: 100%;
}

.title {
  background-image: url('../assets/desktop/background-header.png');
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  min-width: 0;
}

.category-selection {
  margin: 4vh;
  border-radius: 0.5rem;
  background-color: white;
  width: 70%;
  height: 15%;
  font-size: 0.2rem;
  align-items: flex-start;
  justify-content: space-between;
}

.status-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2vh;
  height: 15%;
  border-radius: 0.5rem;
  background-color: white;
  width: 70%;
}

.mobile-menu-toggle {
  display: none;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.625rem;
  background-color: var(--topbar-color);
}

.feedback-count {
  display: none;
}

.mobile-menu-toggle {
  display: block;
  position: absolute;
  top: 0.938rem;
  right: 0.938rem;
  background: transparent;
  border: none;
  cursor: pointer;
}

.whitetext {
  color: #fff;
}

.status-item {
  position: relative;
  align-items: center;
  justify-content: space-between;
  display: flex;
  align-content: end;
  align-items: flex-end;
  margin: 1.5vh 1vh 0.25vh 1vh;
  width: 100%;
}

.status-img {
  width: 0.75vh;
  margin: 1vh 1vh 1vh 1.5vh;
}

.category-button {
  border: none;
  border-radius: 0.625rem;
  background: var(--button-text-color);
  color: var(--main-button-bg);
  font-size: 0.8125rem;
  font-weight: 600;
  margin: 0.5rem;
  padding: 1vh 2vh;
  cursor: pointer;
}

.category-button:hover {
  transition: 0.3s;
  background-color: var(--category-hover-color);
  opacity: 0.9;
}

.category-button-active {
  background: var(--main-button-bg);
  color: white;
}

.category-button-active:hover {
  transition: 0.3s;
  opacity: 0.9;
}

.status-name {
  color: var(--back-icon-color);
  font-size: 1rem;
  font-weight: 400;
  align-items: flex-start;
  align-content: flex-start;
  text-align: left;
  width: 100%;
}

.status-count {
  color: var(--back-icon-color);
  display: flex;
  align-items: end;
  align-self: flex-end;
  text-align: end;
  font-size: 1rem;
  font-weight: 700;
  display: inline-block;
  width: 10%;
  margin-right: 5%;
}

nav {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: var(--nav-bar-color);
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;
  margin-top: calc(11vh + -2.2%);
}

nav.open {
  margin-top: calc(11vh + -2.2%);
  transform: translateX(0);
}

.nav-close-button {
  background: none;
  border: none;
  cursor: pointer;
  align-self: flex-end;
}

.sort-text {
  color: var(--button-text-color);
  font-size: 0.875rem;
  font-weight: 400;
  margin-right: 0.5vh;
}

.sort-select {
  color: var(--button-text-color);
  font-size: 0.875rem;
  font-weight: 700;
  border: none;
  background: #373f68;
}

.sort-select option {
  color: var(--back-icon-color);
  border-radius: 0.625rem;
  background: #fff;
  color: var(--back-icon-color);
  font-size: 1rem;
  font-weight: 400;
  padding: 0.625rem;
  appearance: none;
}

.sort-select option:hover {
  color: var(--primary-button-bg);
}

.add-feedback-button {
  color: var(--button-text-color);
  font-size: 0.875rem;
  font-weight: 700;
  background-color: var(--primary-button-bg);
  border-radius: 0.625rem;
  padding: 1vh;
  border: none;
  cursor: pointer;
}
.add-feedback-button:hover {
  transition: 0.3s;
  opacity: 0.8;
}

.upvote-button {
  align-self: flex-end;
  justify-self: flex-start;
  display: flex;
  border-radius: 0.625rem;
  background: #f2f4fe;
  border: none;
  cursor: pointer;
  gap: 0.3vh;
  width: 35%;
  height: 70%;
  align-items: center;
  justify-content: center;
  align-content: flex-start;
  padding: 1vh 0;
  margin-left: 4vh;
  margin-bottom: 0.3vh;
  grid-area: upvote;
}
.upvote-button:hover {
  transition: 0.3s;
  background-color: var(--category-hover-color);
  opacity: 0.9;
}
.upvote-button-active {
  border-radius: 0.625rem;
  width: 35%;
  height: 70%;
  padding: 1vh 0;
  margin-left: 4vh;
  margin-bottom: 0.3vh;
  background: var(--main-button-bg);
  grid-area: inherit;
  color: white;
}
.upvote-button-active:hover {
  transition: 0.3s;
  opacity: 0.8;
}

.upvote-button-active img {
  color-scheme: white;
  accent-color: white;
  color: white;
}

.upvote-button span {
  color: #3a4374;
  text-align: right;
  font-size: 1.3vh;
  font-weight: bold;
}

.upvote-button-active span {
  color: white;
}

.feedback-list {
  display: flex;
  flex-direction: column;
  padding: 0.625rem 0;
  border-radius: 0.5rem;
  align-items: center;
}

.feedback-item {
  align-content: center;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    'details details'
    'upvote comment';
  justify-content: flex-start;
  flex-wrap: wrap;
  flex-direction: row;
  margin-top: 0.625rem;
  background-color: #ffffff80;
  width: 80%;
  height: 18vh;
  border-radius: 0.5rem;
  padding: 1vh 0 1vh 0;
}

.feedback-title {
  font-size: 2vh;
  text-align: flex-start;
  padding: 1vh;
  width: fit-content;
}

.feedback-link {
  text-decoration: none;
  color: inherit;
  inline-size: inherit;
}

.feedback-details {
  color: var(--text-color);
  font-size: 1.5vh;
  font-weight: bold;
  width: 100%;
  align-self: flex-start;
  font-display: flex;
  flex-direction: column;
  flex-direction: row;
  align-items: flex-start;
  align-content: flex-start;
  grid-area: details;
  margin: 0 3vh;
}

.description {
  color: var(--back-icon-color);
  font-size: 1.4vh;
  font-weight: 400;
  margin-left: 1vh;
}

.category-display {
  border-radius: 0.625rem;
  background: #f2f4fe;
  padding: 0.5rem 1rem;
  color: var(--main-button-bg);
  width: fit-content;
  margin-top: 2vh;
  margin-left: 1vh;
}

.comment-section {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  justify-self: flex-end;
  height: 25%;
  width: 25%;
  grid-area: comment;
  margin: 1vh 3vh 1vh 1vh;
}

.comment-section img {
  margin-right: 0.5rem;
}

.comment-section span {
  color: var(--text-color);
  text-align: center;
  font-size: 1rem;
  font-weight: 700;
}

.no-feedback {
  text-align: center;
  padding: 1.25rem;
}

.no-feedback h2 {
  margin-bottom: 0.625rem;
}

.no-feedback p {
  margin-bottom: 1.25rem;
}

.no-feedback img {
  max-width: 6.25rem;
  margin-bottom: 1.25rem;
}

@media (min-width: 768px) {
  .main-container {
    flex-direction: row;
    align-items: flex-start;
    padding: 0 5% 0 5%;
    width: 85%;
  }
  .left-container {
    width: 25%;
    align-content: flex-start;
    height: 100%;
  }
  .right-container {
    margin-left: 2%;
    margin-bottom: 4rem;
    width: 75%;
  }
  .header {
    width: 100%;
  }
  .title {
    border-radius: 0.5rem;
    width: auto;
    max-width: 100%;
    padding: 0 1rem 0 0.5rem;
    margin-bottom: 1rem;
  }
  .top-bar {
    border-radius: 0.5rem;
  }
  .feedback-item {
    height: 15vh;
    width: 100%;
    grid-template-columns: 1.3fr 6fr 1fr;
    grid-template-areas: 'upvote details comment';
  }
  .mobile-menu-toggle {
    display: none;
  }
  .category-selection {
    width: 100%;
    margin: 1vh 0;
    padding: 2vh 0;
  }
  .status-indicator {
    width: 100%;
    margin: 1vh 0;
    padding: 3vh 0;
  }
  nav {
    position: static;
    transform: none;
    box-shadow: none;
    width: 100%;
    height: 40%;
    display: flex;
    transition: none;
    margin-top: 0;
  }
  nav.open {
    margin-top: 0;
    transform: none;
    width: 100%;
  }
  .nav-close-button {
    display: none;
  }
  .bulb-icon {
    margin: 1vh;
  }
  .feedback-count {
    color: #fff;
    font-size: 1.25rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    margin: 1vh;
    color: #fff;
  }
  .feedback-details {
    align-self: flex-start;
    width: 80%;
    font-display: flex;
    align-items: flex-start;
    align-content: flex-start;
  }
  .comment-section {
    height: 10%;
    align-self: center;
  }
  .upvote-button {
    align-self: flex-start;
    align-items: center;
    flex-direction: column;
    width: 50%;
    height: 5vh;
    margin: 1vh 2.5vh;
  }
}
</style>
