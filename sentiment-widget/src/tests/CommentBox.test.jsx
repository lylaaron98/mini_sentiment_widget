import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import CommentBox from '../components/CommentBox'

describe('CommentBox', () => {
  it('renders textarea with label', () => {
    const mockOnChange = vi.fn()
    render(<CommentBox comment="" onCommentChange={mockOnChange} disabled={false} />)
    
    expect(screen.getByLabelText('Comment:')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter your feedback here...')).toBeInTheDocument()
  })

  it('displays the current comment value', () => {
    const mockOnChange = vi.fn()
    render(<CommentBox comment="Test comment" onCommentChange={mockOnChange} disabled={false} />)
    
    const textarea = screen.getByLabelText('Comment:')
    expect(textarea).toHaveValue('Test comment')
  })

  it('calls onCommentChange when user types', () => {
    const mockOnChange = vi.fn()
    render(<CommentBox comment="" onCommentChange={mockOnChange} disabled={false} />)
    
    const textarea = screen.getByLabelText('Comment:')
    fireEvent.change(textarea, { target: { value: 'New comment' } })
    
    expect(mockOnChange).toHaveBeenCalledWith('New comment')
  })

  it('disables textarea when disabled prop is true', () => {
    const mockOnChange = vi.fn()
    render(<CommentBox comment="" onCommentChange={mockOnChange} disabled={true} />)
    
    const textarea = screen.getByLabelText('Comment:')
    expect(textarea).toBeDisabled()
  })
})
