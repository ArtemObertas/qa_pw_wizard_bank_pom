import { test, expect } from '@playwright/test';

test('Assert manager can delete customer', async ({ page }) => {
  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');
  await page.getByRole('button', { name: 'Bank Manager Login' }).click();
  await page.getByRole('button', { name: 'Customers' }).click();

  const hermioneRow = page.locator('table tbody tr').filter({
    has: page.getByText('Hermione').nth(0),
    has: page.getByText('Granger').nth(0)
  });

  await expect(hermioneRow).toBeVisible();
  await hermioneRow.locator('button[ng-click="deleteCust(cust)"]').click();
  await expect(hermioneRow).not.toBeVisible();
  await page.reload();

  const hermioneRowAfterReload = page.locator('table tbody tr').filter({
    has: page.getByText('Hermione').nth(0),
    has: page.getByText('Granger').nth(0)
  });
  await expect(hermioneRowAfterReload).not.toBeVisible();
});