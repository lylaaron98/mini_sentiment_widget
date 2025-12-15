import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import RatingChips from '../components/RatingChips'

describe('RatingChips', () => {
  it('renders five rating chips', () => {
    const mockOnChange = vi.fn()
    render(<RatingChips selectedRating={null} onRatingChange={mockOnChange} disabled={false} />)
    
    for (let i = 1; i <= 5; i++) {
      expect(screen.getByLabelText(`Rating ${i}`)).toBeInTheDocument()
    }
  })

  it('calls onRatingChange when a chip is clicked', () => {
    const mockOnChange = vi.fn()
    render(<RatingChips selectedRating={null} onRatingChange={mockOnChange} disabled={false} />)
    
    const chip3 = screen.getByLabelText('Rating 3')
    fireEvent.click(chip3)
    
    expect(mockOnChange).toHaveBeenCalledWith(3)
  })

  it('applies selected class to the selected rating', () => {
    const mockOnChange = vi.fn()
    render(<RatingChips selectedRating={3} onRatingChange={mockOnChange} disabled={false} />)
    
    const chip3 = screen.getByLabelText('Rating 3')
    expect(chip3).toHaveClass('selected')
  })

  it('disables chips when disabled prop is true', () => {
    const mockOnChange = vi.fn()
    render(<RatingChips selectedRating={null} onRatingChange={mockOnChange} disabled={true} />)
    
    const chip1 = screen.getByLabelText('Rating 1')
    expect(chip1).toBeDisabled()
  })

  it('sets aria-pressed correctly for selected chip', () => {
    const mockOnChange = vi.fn()
    render(<RatingChips selectedRating={4} onRatingChange={mockOnChange} disabled={false} />)
    
    const chip4 = screen.getByLabelText('Rating 4')
    expect(chip4).toHaveAttribute('aria-pressed', 'true')
    
    const chip2 = screen.getByLabelText('Rating 2')
    expect(chip2).toHaveAttribute('aria-pressed', 'false')
  })
})
