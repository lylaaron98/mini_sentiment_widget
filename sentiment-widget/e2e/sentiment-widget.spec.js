import { test, expect } from '@playwright/test'

test.describe('Sentiment Widget E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('has correct title and header', async ({ page }) => {
    await expect(page).toHaveTitle(/Vite \+ React/)
    await expect(page.getByRole('heading', { name: 'Sentiment Widget' })).toBeVisible()
  })

  test('can submit feedback with rating and comment', async ({ page }) => {
    // Select rating 5
    await page.getByLabel('Rating 5').click()
    
    // Enter comment
    await page.getByPlaceholder('Enter your feedback here...').fill('This is an excellent application!')
    
    // Submit feedback
    await page.getByRole('button', { name: 'Submit Feedback' }).click()
    
    // Check confirmation message appears
    await expect(page.getByText('✓ Thank you for your feedback!')).toBeVisible()
    
    // Check that summary panel updates
    await expect(page.getByText('Total Submissions:')).toBeVisible()
    await expect(page.getByText('1')).toBeVisible()
    await expect(page.getByText('5.00')).toBeVisible()
    
    // Check recent comment appears
    await expect(page.getByText('This is an excellent application!')).toBeVisible()
  })

  test('shows validation error when submitting without rating', async ({ page }) => {
    // Try to submit without selecting rating
    await page.getByRole('button', { name: 'Submit Feedback' }).click()
    
    // Check error message
    await expect(page.getByText('Please select a rating before submitting.')).toBeVisible()
    
    // Summary should still show no data
    await expect(page.getByText('No feedback submitted yet.')).toBeVisible()
  })

  test('disables form during submission', async ({ page }) => {
    // Select rating
    await page.getByLabel('Rating 3').click()
    
    // Submit
    await page.getByRole('button', { name: 'Submit Feedback' }).click()
    
    // Check button shows submitting state
    await expect(page.getByRole('button', { name: 'Submitting...' })).toBeVisible()
    
    // Check that rating chips are disabled
    await expect(page.getByLabel('Rating 1')).toBeDisabled()
    
    // Check that textarea is disabled
    await expect(page.getByPlaceholder('Enter your feedback here...')).toBeDisabled()
    
    // Wait for form to re-enable (3 seconds)
    await page.waitForTimeout(3100)
    
    // Check form is enabled again
    await expect(page.getByRole('button', { name: 'Submit Feedback' })).toBeVisible()
    await expect(page.getByLabel('Rating 1')).not.toBeDisabled()
  })

  test('calculates average rating correctly', async ({ page }) => {
    // Submit first rating (5)
    await page.getByLabel('Rating 5').click()
    await page.getByRole('button', { name: 'Submit Feedback' }).click()
    await page.waitForTimeout(3100)
    
    // Submit second rating (3)
    await page.getByLabel('Rating 3').click()
    await page.getByRole('button', { name: 'Submit Feedback' }).click()
    await page.waitForTimeout(100)
    
    // Check average is 4.00 (5 + 3 / 2 = 4)
    await expect(page.getByText('4.00')).toBeVisible()
    await expect(page.getByText('2')).toBeVisible() // 2 submissions
  })

  test('displays only three most recent comments', async ({ page }) => {
    // Submit 4 comments
    const comments = ['First comment', 'Second comment', 'Third comment', 'Fourth comment']
    
    for (let i = 0; i < comments.length; i++) {
      await page.getByLabel(`Rating ${i + 1}`).click()
      await page.getByPlaceholder('Enter your feedback here...').fill(comments[i])
      await page.getByRole('button', { name: 'Submit Feedback' }).click()
      await page.waitForTimeout(3100)
    }
    
    // Check that only the last 3 are visible
    await expect(page.getByText('Fourth comment')).toBeVisible()
    await expect(page.getByText('Third comment')).toBeVisible()
    await expect(page.getByText('Second comment')).toBeVisible()
    await expect(page.getByText('First comment')).not.toBeVisible()
  })

  test('toggles between light and dark mode', async ({ page }) => {
    const app = page.locator('.app')
    
    // Initially light mode
    await expect(app).toHaveClass(/light-mode/)
    
    // Click theme toggle (moon icon for dark mode)
    await page.getByLabel('Switch to dark mode').click()
    
    // Check dark mode is active
    await expect(app).toHaveClass(/dark-mode/)
    
    // Click theme toggle again (sun icon for light mode)
    await page.getByLabel('Switch to light mode').click()
    
    // Check light mode is active again
    await expect(app).toHaveClass(/light-mode/)
  })

  test('visual feedback on rating selection', async ({ page }) => {
    const rating3 = page.getByLabel('Rating 3')
    
    // Initially not selected
    await expect(rating3).not.toHaveClass(/selected/)
    
    // Click rating 3
    await rating3.click()
    
    // Should have selected class
    await expect(rating3).toHaveClass(/selected/)
    
    // Click rating 5
    await page.getByLabel('Rating 5').click()
    
    // Rating 3 should no longer be selected
    await expect(rating3).not.toHaveClass(/selected/)
    
    // Rating 5 should be selected
    await expect(page.getByLabel('Rating 5')).toHaveClass(/selected/)
  })

  test('can submit feedback without comment', async ({ page }) => {
    // Select rating without entering comment
    await page.getByLabel('Rating 4').click()
    
    // Submit
    await page.getByRole('button', { name: 'Submit Feedback' }).click()
    
    // Should succeed
    await expect(page.getByText('✓ Thank you for your feedback!')).toBeVisible()
    
    // Check summary updates
    await expect(page.getByText('Total Submissions:')).toBeVisible()
    await expect(page.getByText('1')).toBeVisible()
    await expect(page.getByText('4.00')).toBeVisible()
  })

  test('form resets after successful submission', async ({ page }) => {
    // Select rating and comment
    await page.getByLabel('Rating 5').click()
    await page.getByPlaceholder('Enter your feedback here...').fill('Great app!')
    
    // Submit
    await page.getByRole('button', { name: 'Submit Feedback' }).click()
    
    // Wait for 3 second timeout
    await page.waitForTimeout(3100)
    
    // Check form is reset
    const textarea = page.getByPlaceholder('Enter your feedback here...')
    await expect(textarea).toHaveValue('')
    
    // No rating should be selected
    await expect(page.getByLabel('Rating 5')).not.toHaveClass(/selected/)
  })

  test('maintains state across multiple submissions', async ({ page }) => {
    // Submit first feedback
    await page.getByLabel('Rating 5').click()
    await page.getByPlaceholder('Enter your feedback here...').fill('Excellent!')
    await page.getByRole('button', { name: 'Submit Feedback' }).click()
    await page.waitForTimeout(3100)
    
    // Submit second feedback
    await page.getByLabel('Rating 4').click()
    await page.getByPlaceholder('Enter your feedback here...').fill('Very good!')
    await page.getByRole('button', { name: 'Submit Feedback' }).click()
    await page.waitForTimeout(3100)
    
    // Submit third feedback
    await page.getByLabel('Rating 3').click()
    await page.getByPlaceholder('Enter your feedback here...').fill('Good!')
    await page.getByRole('button', { name: 'Submit Feedback' }).click()
    await page.waitForTimeout(100)
    
    // Check all three submissions are counted
    await expect(page.getByText('3')).toBeVisible()
    
    // Check average rating (5 + 4 + 3 / 3 = 4.00)
    await expect(page.getByText('4.00')).toBeVisible()
    
    // Check all three recent comments are visible
    await expect(page.getByText('Good!')).toBeVisible()
    await expect(page.getByText('Very good!')).toBeVisible()
    await expect(page.getByText('Excellent!')).toBeVisible()
  })
})
