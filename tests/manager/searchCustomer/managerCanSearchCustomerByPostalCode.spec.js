import { test, expect } from '@playwright/test'; 
import { faker } from '@faker-js/faker';

let firstName;
let lastName;
let postalCode;

test.beforeEach(async ({ page }) => {
  page.on('dialog', async dialog => {
    await dialog.accept();
  });

  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/addCust');

  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postalCode = faker.location.zipCode();

  await page.locator('[placeholder="First Name"]').fill(firstName);
  await page.locator('[placeholder="Last Name"]').fill(lastName);
  await page.locator('[placeholder="Post Code"]').fill(postalCode);

  await page.click('button[type="submit"]');

  await page.waitForTimeout(1000);
});

test('Assert manager can search customer by Postal Code', async ({ page }) => {
  await page.click('button[ng-click="showCust()"]');
  await page.locator('[placeholder="Search Customer"]').fill(postalCode);

  const firstRow = page.locator('table tbody tr').first();
  await expect(firstRow).toContainText(firstName);
  await expect(firstRow).toContainText(lastName);
  await expect(firstRow).toContainText(postalCode);

  const rowCount = await page.locator('table tbody tr').count();
  await expect(rowCount).toBe(1);
});