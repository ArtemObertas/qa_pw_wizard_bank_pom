import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

let firstName;
let lastName;
let postCode;

test.beforeEach(async ({ page }) => {

  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postCode = faker.location.zipCode();

  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/addCust');

  await page.locator('input[ng-model="fName"]').fill(firstName);
  await page.locator('input[ng-model="lName"]').fill(lastName);
  await page.locator('input[ng-model="postCd"]').fill(postCode);
  await page.locator('button[type="submit"]').click();
});

test('Assert manager can add new customer and open account', async ({ page }) => {

  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/openAccount');
  const customerSelect = page.locator('#userSelect');
  await customerSelect.selectOption({ label: `${firstName} ${lastName}` });
  await page.locator('#currency').selectOption('Dollar');
  await page.locator('button[type="submit"]').click();
  await page.reload();
  await page.locator('button[ng-click="showCust()"]').click();

  const lastRow = page.locator('table tbody tr').last();
  const accountCell = lastRow.locator('td').nth(3); // 4-та колонка — номер рахунку
  const accountText = (await accountCell.innerText()).trim();
  await expect(accountCell).not.toBeEmpty();
  expect(accountText).toMatch(/^\d+$/);
});