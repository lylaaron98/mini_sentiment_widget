import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

describe('App Integration Tests', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders the app with title and theme toggle', () => {
    render(<App />)
    
    expect(screen.getByText('Sentiment Widget')).toBeInTheDocument()
    expect(screen.getByLabelText(/Switch to/)).toBeInTheDocument()
  })

  it('shows validation error when submitting without rating', async () => {
    const user = userEvent.setup({ delay: null })
    render(<App />)
    
    const submitButton = screen.getByText('Submit Feedback')
    await user.click(submitButton)
    
    expect(screen.getByText('Please select a rating before submitting.')).toBeInTheDocument()
  })

  it('submits feedback successfully with rating and comment', async () => {
    const user = userEvent.setup({ delay: null })
    render(<App />)
    
    // Enter name
    const nameInput = screen.getByPlaceholderText('Enter your name...')
    await user.type(nameInput, 'John Doe')
    
    // Select rating
    const rating5 = screen.getByLabelText('Rating 5')
    await user.click(rating5)
    
    // Enter comment
    const textarea = screen.getByPlaceholderText('Enter your feedback here...')
    await user.type(textarea, 'Great experience!')
    
    // Submit
    const submitButton = screen.getByText('Submit Feedback')
    await user.click(submitButton)
    
    // Check confirmation message
    expect(screen.getByText('✓ Thank you for your feedback!')).toBeInTheDocument()
    
    // Check summary updates
    await waitFor(() => {
      expect(screen.getByText('Total Submissions:')).toBeInTheDocument()
      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('5.00')).toBeInTheDocument()
    })
    
    // Check feedback log appears
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Great experience!')).toBeInTheDocument()
  }, 10000)

  it('disables form during submission', async () => {
    const user = userEvent.setup({ delay: null })
    render(<App />)
    
    // Select rating and submit
    const rating4 = screen.getByLabelText('Rating 4')
    await user.click(rating4)
    
    const submitButton = screen.getByText('Submit Feedback')
    await user.click(submitButton)
    
    // Check that button shows submitting state
    expect(screen.getByText('Submitting...')).toBeInTheDocument()
    
    // Check that all inputs are disabled
    const rating1 = screen.getByLabelText('Rating 1')
    expect(rating1).toBeDisabled()
    
    const textarea = screen.getByPlaceholderText('Enter your feedback here...')
    expect(textarea).toBeDisabled()
  })

  it('updates summary panel after submission', async () => {
    const user = userEvent.setup({ delay: null })
    render(<App />)
    
    // Initially no submissions
    expect(screen.getByText('No feedback submitted yet.')).toBeInTheDocument()
    
    // Submit first feedback
    await user.type(screen.getByPlaceholderText('Enter your name...'), 'Alice')
    await user.click(screen.getByLabelText('Rating 5'))
    await user.type(screen.getByPlaceholderText('Enter your feedback here...'), 'Excellent!')
    await user.click(screen.getByText('Submit Feedback'))
    
    // Wait for submission to process
    await waitFor(() => {
      expect(screen.getByText('Total Submissions:')).toBeInTheDocument()
    })
    
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('5.00')).toBeInTheDocument()
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('Excellent!')).toBeInTheDocument()
    
    // Advance timers and submit another
    vi.advanceTimersByTime(3000)
    
    await waitFor(async () => {
      await user.type(screen.getByPlaceholderText('Enter your name...'), 'Bob')
      await user.click(screen.getByLabelText('Rating 3'))
      await user.type(screen.getByPlaceholderText('Enter your feedback here...'), 'Good')
      await user.click(screen.getByText('Submit Feedback'))
    })
    
    // Check updated stats
    await waitFor(() => {
      expect(screen.getByText('2')).toBeInTheDocument()
      expect(screen.getByText('4.00')).toBeInTheDocument()
    })
  }, 10000)

  it('toggles between light and dark mode', async () => {
    const user = userEvent.setup({ delay: null })
    render(<App />)
    
    const app = screen.getByText('Sentiment Widget').closest('.app')
    
    // Initially light mode
    expect(app).toHaveClass('light-mode')
    
    // Toggle to dark mode
    const themeToggle = screen.getByLabelText('Switch to dark mode')
    await user.click(themeToggle)
    
    expect(app).toHaveClass('dark-mode')
    
    // Toggle back to light mode
    const themeToggleDark = screen.getByLabelText('Switch to light mode')
    await user.click(themeToggleDark)
    all feedback logs in reverse chronological order', async () => {
    const user = userEvent.setup({ delay: null })
    render(<App />)
    
    // Submit multiple feedbacks
    for (let i = 1; i <= 4; i++) {
      await user.type(screen.getByPlaceholderText('Enter your name...'), `User${i}`)
      await user.click(screen.getByLabelText(`Rating ${i}`))
      await user.type(screen.getByPlaceholderText('Enter your feedback here...'), `Comment ${i}`)
      await user.click(screen.getByText('Submit Feedback'))
      vi.advanceTimersByTime(3000)
    }
    
    // Should show all feedback logs in reverse chronological order
    await waitFor(() => {
      expect(screen.getByText('Comment 4')).toBeInTheDocument()
      expect(screen.getByText('Comment 3')).toBeInTheDocument()
      expect(screen.getByText('Comment 2')).toBeInTheDocument()
      expect(screen.getByText('Comment 1')).toBeInTheDocument()
    })
    
    // Check all names appear
    expect(screen.getByText('User4')).toBeInTheDocument()
    expect(screen.getByText('User3')).toBeInTheDocument()
    expect(screen.getByText('User2')).toBeInTheDocument()
    expect(screen.getByText('User1')).toBeInTheDocument()
  }, 10000   expect(screen.getByText('Comment 3')).toBeInTheDocument()
      expect(screen.getByText('Comment 2')).toBeInTheDocument()
      expect(screen.queryByText('Comment 1')).not.toBeInTheDocument()
    })
  })
})
