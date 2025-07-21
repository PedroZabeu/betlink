import { test, expect } from '@playwright/test';

test('verify playwright setup', async ({ page }) => {
  // Test that browser can open and navigate to a simple page
  await page.goto('data:text/html,<html><body><h1>Playwright Test</h1></body></html>');
  
  // Verify content is loaded
  await expect(page.locator('h1')).toHaveText('Playwright Test');
  
  console.log('✅ Playwright is working correctly!');
});