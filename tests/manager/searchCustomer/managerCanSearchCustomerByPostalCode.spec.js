import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('Assert manager can search customer by first name', async ({ page }) => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode();

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

  await page.getByRole('button', { name: 'Customers' }).click();
  await expect(page.locator('table tbody')).toBeVisible();
  await expect(page.locator('[placeholder="Search Customer"]')).toBeVisible();

  await page.locator('[placeholder="Search Customer"]').fill(postCode);
  await expect(page.locator('table tbody tr', { hasText: postCode })).toHaveCount(1);

  const row = page.locator('table tbody tr', { hasText: postCode }).first();
  await expect(row).toContainText(firstName);
  await expect(row).toContainText(lastName);
  await expect(row).toContainText(postCode);
});