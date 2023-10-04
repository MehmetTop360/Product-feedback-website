import { test, expect } from '@playwright/test';

test.describe('Feedback Form', () => {

    test('should be able to submit feedback through form', async ({ page }) => {
        await page.goto('http://localhost:5173/add');

        expect(await page.isVisible('.form-title')).toBe(true);
        const titleText = await page.textContent('.form-title');
        expect(titleText).toBe(' Create New Feedback ');

        await page.getByPlaceholder('Add a short, descriptive headline ').click();
        await page.getByPlaceholder('Add a short, descriptive headline ').fill('test title');
        await page.getByTestId('category-select').selectOption('Feature');
        await page.getByPlaceholder('Include any specific comments on what should be improved, added, etc. ').click();
        await page.getByPlaceholder('Include any specific comments on what should be improved, added, etc. ').fill('test description');
        await page.getByRole('button', { name: 'Add Feedback' }).click();

        const titleValue = await page.inputValue('input[placeholder="Add a short, descriptive headline "]');
        expect(titleValue).toBe('');
        const descriptionValue = await page.inputValue('textarea[placeholder="Include any specific comments on what should be improved, added, etc. "]');
        expect(descriptionValue).toBe('');

        const productRequests = await page.evaluate(() => {
            return JSON.parse(localStorage.getItem('productRequests') || '[]');
        });

        const lastFeedback = productRequests[productRequests.length - 1];
        expect(lastFeedback.title).toBe('test title');
        expect(lastFeedback.category).toBe('Feature');
        expect(lastFeedback.description).toBe('test description');
    });
});