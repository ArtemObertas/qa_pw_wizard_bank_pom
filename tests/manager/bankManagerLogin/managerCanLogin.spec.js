import { test } from '@playwright/test';

test('Assert manager can Login', async ({ page }) => {
  /* 
  Test:
  1. Open Wizard bank home page 
    https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login
  2. Click [Bank Manager Login]
  3. Assert button [Add Customer] is visible
  4. Assert button [Open Account] is visible
  5. Assert button [Customers] is visible
  */
  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');

  await page.locator('button[ng-click="manager()"]').click();

  await test.expect(page.locator('button[ng-click="addCust()"]')).toBeVisible();
  await test.expect(page.locator('button[ng-click="openAccount()"]')).toBeVisible();
  await test.expect(page.locator('button[ng-click="showCust()"]')).toBeVisible();
});
