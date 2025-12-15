import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SubmitButton from '../components/SubmitButton'

describe('SubmitButton', () => {
  it('renders with default text', () => {
    const mockOnClick = vi.fn()
    render(<SubmitButton onClick={mockOnClick} disabled={false} />)
    
    expect(screen.getByText('Submit Feedback')).toBeInTheDocument()
  })

  it('shows "Submitting..." when disabled', () => {
    const mockOnClick = vi.fn()
    render(<SubmitButton onClick={mockOnClick} disabled={true} />)
    
    expect(screen.getByText('Submitting...')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const mockOnClick = vi.fn()
    render(<SubmitButton onClick={mockOnClick} disabled={false} />)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(mockOnClick).toHaveBeenCalled()
  })

  it('is disabled when disabled prop is true', () => {
    const mockOnClick = vi.fn()
    render(<SubmitButton onClick={mockOnClick} disabled={true} />)
    
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })
})
