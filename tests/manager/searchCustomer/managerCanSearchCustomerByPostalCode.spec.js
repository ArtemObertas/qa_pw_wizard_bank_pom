import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('Assert manager can search customer by first name', async ({ page }) => {
  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');
  await page.getByRole('button', { name: 'Bank Manager Login' }).click();
  await page.getByRole('button', { name: 'Customers' }).click();

  const rowCount = await page.locator('table tbody tr').count();
  for (let i = 0; i < rowCount; i++) {
    await page.locator('table tbody tr').nth(0).locator('button').click();
  }

  await page.getByRole('button', { name: 'Add Customer' }).click();
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode();

  await page.locator('input[ng-model="fName"]').fill(firstName);
  await page.locator('input[ng-model="lName"]').fill(lastName);
  await page.locator('input[ng-model="postCd"]').fill(postCode);

  page.once('dialog', dialog => dialog.accept());
  await page.locator('button[type="submit"]').click();

  await page.getByRole('button', { name: 'Customers' }).click();
  await page.locator('[placeholder="Search Customer"]').fill(postCode);

  await expect(page.locator('table tbody tr')).toHaveCount(1);
  const firstRow = page.locator('table tbody tr').first();
  await expect(firstRow).toContainText(firstName);
  await expect(firstRow).toContainText(lastName);
  await expect(firstRow).toContainText(postCode);
});