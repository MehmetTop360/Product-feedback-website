import { test, expect } from '@playwright/test';

test.describe('Page Navigation', () => {

    test('should navigate to add feedback and return', async ({ page }) => {
        await page.goto('http://localhost:5173/');
        await page.getByRole('button', { name: '+ Add Feedback' }).first().click();
        await expect(page).toHaveURL('http://localhost:5173/add');
        await page.getByRole('button', { name: 'Arrow Left Icon Go Back' }).click();
        await expect(page).toHaveURL('http://localhost:5173/');
        await page.getByRole('link', { name: 'Add tags for solutions' }).click();
        await expect(page).toHaveURL('http://localhost:5173/details/1');
        await page.getByRole('button', { name: 'Edit Feedback' }).click();
        await expect(page).toHaveURL('http://localhost:5173/editpage/1');
        await page.getByRole('button', { name: 'Arrow Left Icon Go Back' }).click();
        await expect(page).toHaveURL('http://localhost:5173/details/1');
        await page.getByRole('button', { name: 'Arrow Left Icon Go Back' }).click();
        await expect(page).toHaveURL('http://localhost:5173/');
    });
});
