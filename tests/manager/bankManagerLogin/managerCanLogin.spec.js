import { test, expect } from '@playwright/test';

test('Assert manager can Login', async ({ page }) => {
  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');
  await page.getByRole('button', { name: 'Bank Manager Login' }).click();

  await expect(page.locator('button[ng-click="addCust()"]')).toBeVisible();
  await expect(page.locator('button[ng-click="openAccount()"]')).toBeVisible();
  await expect(page.locator('button[ng-click="showCust()"]')).toBeVisible();
});