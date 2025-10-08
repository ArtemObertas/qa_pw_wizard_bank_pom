import { test, expect } from '@playwright/test';

test('Assert manager can choose currencies for account', async ({ page }) => {
  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/openAccount');

  const currencySelect = page.locator('#currency');

  await currencySelect.selectOption('Dollar');
  await expect(currencySelect).toHaveValue('Dollar');

  await currencySelect.selectOption('Pound');
  await expect(currencySelect).toHaveValue('Pound');

  await currencySelect.selectOption('Rupee');
  await expect(currencySelect).toHaveValue('Rupee');
});