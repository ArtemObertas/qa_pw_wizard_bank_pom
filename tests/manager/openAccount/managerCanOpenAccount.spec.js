import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('Assert manager can open account', async ({ page }) => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode();

  // Add customer
  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');
  await expect(page.getByRole('button', { name: 'Bank Manager Login' })).toBeVisible();
  await page.getByRole('button', { name: 'Bank Manager Login' }).click();

  await page.getByRole('button', { name: 'Add Customer' }).click();
  await page.locator('input[ng-model="fName"]').fill(firstName);
  await page.locator('input[ng-model="lName"]').fill(lastName);
  await page.locator('input[ng-model="postCd"]').fill(postCode);

  page.once('dialog', dialog => {
    expect(dialog.message()).toContain('Customer added successfully');
    dialog.accept();
  });
  await page.locator('button[type="submit"]').click();

  // Open account
  await page.getByRole('button', { name: 'Open Account' }).click();
  await expect(page.locator('#userSelect')).toBeVisible();
  await expect(page.locator('#currency')).toBeVisible();

  await page.selectOption('#userSelect', { label: `${firstName} ${lastName}` });
  await page.selectOption('#currency', { label: 'Dollar' });

  page.once('dialog', dialog => {
    expect(dialog.message()).toContain('Account created successfully');
    dialog.accept();
  });
  await page.locator('button[type="submit"]').click();

  // Verify
  await page.getByRole('button', { name: 'Customers' }).click();
  await expect(page.locator('table tbody')).toBeVisible();

  const customerRow = page.locator('table tbody tr', { hasText: `${firstName} ${lastName}` });
  await expect(customerRow).toBeVisible();

  const accountCell = customerRow.locator('td').nth(3);
  // ✅ Дозволяємо пробіли в кінці
  await expect(accountCell).toHaveText(/^\s*\d+\s*$/);
});