import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('Assert manager can add new customer', async ({ page }) => {
  /* 
  Test:
  1. Open add customer page by link
    https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/addCust
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  6. Reload the page (This is a simplified step to close the popup)
  7. Click [Customers] button.
  8. Assert the customer First Name is present in the table in the last row. 
  9. Assert the customer Last Name is present in the table in the last row. 
  10. Assert the customer Postal Code is present in the table in the last row. 
  11. Assert there is no account number for the new customer in the last row. 

  Tips:
  1. Use faker for test data generation, example usage:
    const firstName = faker.person.firstName();
    const lastName = faker.person.LastName();
    const postCode = faker.location.zipCode(); 

  2. Do not rely on the customer row id for the steps 8-11. 
    Use the ".last()" locator to get the last row.
  */
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode();

  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/addCust');

  await page.locator('input[ng-model="fName"]').fill(firstName);
  await page.locator('input[ng-model="lName"]').fill(lastName);
  await page.locator('input[ng-model="postCd"]').fill(postCode);
  await page.locator('button[type="submit"]').click();

  await page.reload();

  await page.locator('button[ng-click="showCust()"]').click();
  const lastRow = page.locator('table tbody tr').last();

  await test.expect(lastRow.locator('td').nth(0)).toHaveText(firstName);
  await test.expect(lastRow.locator('td').nth(1)).toHaveText(lastName);
  await test.expect(lastRow.locator('td').nth(2)).toHaveText(postCode);
  await test.expect(lastRow.locator('td').nth(3)).toHaveText('');
});
