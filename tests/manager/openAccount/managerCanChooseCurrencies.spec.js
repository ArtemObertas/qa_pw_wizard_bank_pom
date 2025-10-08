import { test, expect } from '@playwright/test';

test('Assert manager can choose currencies for account', async ({ page }) => {
  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');
  await expect(page.getByRole('button', { name: 'Bank Manager Login' })).toBeVisible();
  await page.getByRole('button', { name: 'Bank Manager Login' }).click();

  await page.getByRole('button', { name: 'Open Account' }).click();
  const currencySelect = page.locator('#currency');
  await expect(currencySelect).toBeVisible();

  await currencySelect.selectOption({ label: 'Dollar' });
  await expect(currencySelect.locator('option:checked')).toHaveText('Dollar');

  await currencySelect.selectOption({ label: 'Pound' });
  await expect(currencySelect.locator('option:checked')).toHaveText('Pound');

  await currencySelect.selectOption({ label: 'Rupee' });
  await expect(currencySelect.locator('option:checked')).toHaveText('Rupee');
});