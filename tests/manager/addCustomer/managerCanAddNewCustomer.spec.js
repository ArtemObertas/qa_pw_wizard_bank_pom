import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('Assert manager can add new customer', async ({ page }) => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode();

  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');
  await expect(page.getByRole('button', { name: 'Bank Manager Login' })).toBeVisible();
  await page.getByRole('button', { name: 'Bank Manager Login' }).click();

  await expect(page.getByRole('button', { name: 'Add Customer' })).toBeVisible();
  await page.getByRole('button', { name: 'Add Customer' }).click();

  await page.locator('input[ng-model="fName"]').fill(firstName);
  await page.locator('input[ng-model="lName"]').fill(lastName);
  await page.locator('input[ng-model="postCd"]').fill(postCode);

  page.once('dialog', dialog => {
    expect(dialog.message()).toContain('Customer added successfully');
    dialog.accept();
  });
  await page.locator('button[type="submit"]').click();

  await page.getByRole('button', { name: 'Customers' }).click();
  await expect(page.locator('table tbody')).toBeVisible();

  const customerRow = page.locator('table tbody tr', { hasText: `${firstName} ${lastName}` });
  await expect(customerRow).toBeVisible();
  await expect(customerRow.locator('td').nth(0)).toHaveText(firstName);
  await expect(customerRow.locator('td').nth(1)).toHaveText(lastName);
  await expect(customerRow.locator('td').nth(2)).toHaveText(postCode);
  await expect(customerRow.locator('td').nth(3)).toHaveText(/^(|\s*)$/);
});