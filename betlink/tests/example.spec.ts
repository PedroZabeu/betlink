import { test, expect } from '@playwright/test';

test('homepage has title', async ({ page }) => {
  await page.goto('/');
  
  // Expect the page to have a title that contains "BetLink"
  await expect(page).toHaveTitle(/BetLink/);
});

test('homepage loads successfully', async ({ page }) => {
  await page.goto('/');
  
  // Wait for the page to load
  await page.waitForLoadState('networkidle');
  
  // Take a screenshot for debugging
  await page.screenshot({ path: 'tests/screenshots/homepage.png', fullPage: true });
  
  // Check that the page loaded successfully (no error messages)
  const errorMessage = page.locator('[role="alert"], .error, .error-message');
  await expect(errorMessage).toHaveCount(0);
});