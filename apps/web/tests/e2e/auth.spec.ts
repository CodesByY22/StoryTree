import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should navigate to login page', async ({ page }) => {
    await page.goto('/');
    
    // Check if the login link exists in the navbar (desktop)
    const loginLink = page.locator('nav').getByRole('link', { name: 'Log In' });
    if (await loginLink.isVisible()) {
        await loginLink.click();
        await expect(page).toHaveURL(/.*\/auth\/login/);
    }
  });

  test('should display login form', async ({ page }) => {
    await page.goto('/auth/login');
    
    await expect(page.getByRole('heading', { name: 'Welcome Back' })).toBeVisible();
    await expect(page.getByLabel('Email address')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
  });
});
