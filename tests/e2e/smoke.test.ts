import { test, expect } from '@playwright/test'

test.describe('Homepage smoke test', () => {
  test('homepage loads and shows masthead', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/The New India Government/)
    // Masthead title should be visible
    await expect(page.getByText('THE NEW INDIA GOVERNMENT').first()).toBeVisible()
  })

  test('navigation links are present', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('navigation')).toBeVisible()
    await expect(page.getByText('Latest').first()).toBeVisible()
  })

  test('fact-check ticker is present', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('Fact-Check Scores')).toBeVisible()
  })

  test('vote section exists', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText("The People's Poll")).toBeVisible()
  })

  test('admin link redirects to admin', async ({ page }) => {
    await page.goto('/admin')
    // Should render Payload admin UI
    await expect(page).toHaveURL(/\/admin/)
  })
})

test.describe('Article page', () => {
  test('article page has correct structure', async ({ page }) => {
    // This test will only pass if there is seed data
    const res = await page.request.fetch('/api/articles?limit=1&where[status][equals]=published')
    const data = await res.json()
    if (!data.docs?.length) {
      test.skip()
      return
    }
    const slug = data.docs[0].slug
    await page.goto(`/article/${slug}`)
    await expect(page.locator('h1')).toBeVisible()
  })
})

test.describe('Voting', () => {
  test('vote widget shows options', async ({ page }) => {
    await page.goto('/')
    // Scroll to vote section
    await page.locator('#vote').scrollIntoViewIfNeeded()
    await expect(page.getByText('YES, time for change')).toBeVisible()
    await expect(page.getByText('NO, current is fine')).toBeVisible()
    await expect(page.getByText('UNDECIDED')).toBeVisible()
  })
})
