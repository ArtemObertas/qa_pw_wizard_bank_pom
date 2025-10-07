import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('Assert manager can choose currencies for account', async ({ page }) => {
  /* 
  Test:
  1. Open the Open account page 
    https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/openAccount
  2. Select currency Dollar
  3. Assert the drop-dwon has value Dollar
  4. Select currency Pound
  5. Assert the drop-dwon has value Pound
  6. Select currency Rupee
  7. Assert the drop-dwon has value Rupee
  */
  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/openAccount');

  const currencySelect = page.locator('#currency');

  await currencySelect.selectOption('Dollar');
  await test.expect(currencySelect).toHaveValue('Dollar');
  await currencySelect.selectOption('Pound');
  await test.expect(currencySelect).toHaveValue('Pound');
  await currencySelect.selectOption('Rupee');
  await test.expect(currencySelect).toHaveValue('Rupee');
});
