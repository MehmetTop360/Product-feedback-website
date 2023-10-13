# Frontend Mentor - Product Feedback App Solution

This project was created as the capstone project for Module 2, Sprint 4 at Turing College. This task was open-ended, so I opted to try the [Product feedback app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/product-feedback-app-wbvUYqjR6). Frontend Mentor challenges provide opportunities to improve coding skills by building realistic projects. Click this link for a [live](https://www.frontendmentor.io/challenges/product-feedback-app-wbvUYqjR6) version 

## The Challenge

Users are be able to:

- View the optimal layout for the app depending on their device's screen size.
- See hover states for all interactive elements on the page.
- Create, read, update, and delete product feedback requests.
- Sort suggestions by most/least upvotes and most/least comments.
- Filter suggestions by category.
- Add comments and view replies to a product feedback request.
- Upvote product feedback requests.
- Keep track of any changes, even after refreshing the browser using `localStorage`.

## Links

- [Challenge URL](https://www.frontendmentor.io/challenges/product-feedback-app-wbvUYqjR6)
- [Live Site URL](https://mt-product-feedback.netlify.app)

## Built with

- Semantic HTML5 markup
- Vue 3 + Vite
- TypeScript
- CSS custom properties, Flexbox, and Grid
- Mobile-first workflow
- Local Storage for data persistence

## Testing

The application underwent only End-to-End (E2E) testing using Playwright. Note: Only E2E tests were implemented; no unit tests were created for this project.

## Project Setup

**Install the required packages:**

```sh
npm install
```
**Compile and hot-reload for development:**
```sh
npm run dev
```
**Compile and minify for production:**
```sh
npm run build
```
**Preview the production build:**

```sh
npm run preview
```
# Run E2E tests with Playwright:

 **Install browsers for the first run**
```sh
npx playwright install
```
**When testing on CI, build the project first**
```sh
npm run build
```
**Runs the E2E tests**
```sh
npx playwright test
```
# Linting and code formatting:
**Lint with ESLint**
```sh
npm run lint
```
**Format with Prettier**
```sh
npm run format
```
**Lint styles with StyleLint**
```sh
npm run stylelint
```
