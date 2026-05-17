import { expect, test } from '@playwright/test'

const publicRoutes = ['/', '/about', '/services', '/work', '/contact']

for (const route of publicRoutes) {
  test(`smoke: ${route} renders`, async ({ page }) => {
    const response = await page.goto(route)

    expect(response?.ok()).toBeTruthy()
    await expect(page.locator('nav')).toBeVisible()
  })
}

test('smoke: /setting boots', async ({ page }) => {
  const response = await page.goto('/setting')

  expect(response?.ok()).toBeTruthy()
  await expect(page.getByText(/Owner access required|Checking access/)).toBeVisible()
})
