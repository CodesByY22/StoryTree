import { test, expect } from '@playwright/test';

test.describe('Story Flow', () => {
  test('should redirect to login if unauthenticated user tries to write', async ({ page }) => {
    await page.goto('/editor/new');
    
    // Depending on middleware configuration, it should redirect to login
    await expect(page).toHaveURL(/.*\/auth\/login/);
  });
});
