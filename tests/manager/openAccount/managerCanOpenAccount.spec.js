import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('Assert manager can open account', async ({ page }) => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode();

  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');
  await page.getByRole('button', { name: 'Bank Manager Login' }).click();
  await page.getByRole('button', { name: 'Add Customer' }).click();

  await page.locator('input[ng-model="fName"]').fill(firstName);
  await page.locator('input[ng-model="lName"]').fill(lastName);
  await page.locator('input[ng-model="postCd"]').fill(postCode);

  page.once('dialog', dialog => dialog.accept());
  await page.locator('button[type="submit"]').click();

  await page.getByRole('button', { name: 'Open Account' }).click();
  await page.selectOption('#userSelect', `${firstName} ${lastName}`);
  await page.selectOption('#currency', 'Dollar');

  page.once('dialog', dialog => dialog.accept());
  await page.locator('button[type="submit"]').click();

  await page.getByRole('button', { name: 'Customers' }).click();

  const customerRow = page.locator('tr', { hasText: `${firstName} ${lastName}` });
  await expect(customerRow).toBeVisible();

  const accountCell = customerRow.locator('td').nth(3);
  await expect(accountCell).not.toBeEmpty();
  const accountText = await accountCell.textContent();
  expect(accountText.trim()).toMatch(/^\d+$/);
});