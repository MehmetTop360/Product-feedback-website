import MainPage from '@/views/MainPage.vue';
<template>
  <div class="error-page">
    <img src="@/assets/illustration-empty.svg" alt="Error Illustration" />

    <div class="error-message">
      <p>Hey user! Are you lost? Click the button below to return to the main page.</p>
      <p class="error-text">Error 404: Page not found</p>
      <button class="mainpage-button" @click="$router.push('/')">Return to main page</button>
    </div>
  </div>
</template>

<style>
.error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 60vh;
}
.error-page img {
  width: 50%;
  max-width: 12.5rem;
}

.error-message {
  text-align: center;
  margin-top: 1.25rem;
  color: var(--text-color);
  font-size: 1.125rem;
  font-weight: 700;
}
.error-text {
  font-size: 0.8rem;
}

.mainpage-button {
  border-radius: 0.625rem;
  padding: 0.625rem 1.25rem;
  cursor: pointer;
  border: none;
  background-color: var(--main-button-bg);
  color: white;
  border-radius: 0.625rem;
  font-size: 1rem;
}
.mainpage-button:hover {
  transition: 0.3s;
  opacity: 0.9;
}
</style>
