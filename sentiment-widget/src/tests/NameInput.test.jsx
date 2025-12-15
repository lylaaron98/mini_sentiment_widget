import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import NameInput from '../components/NameInput'

describe('NameInput', () => {
  it('renders input with label', () => {
    const mockOnChange = vi.fn()
    render(<NameInput name="" onNameChange={mockOnChange} disabled={false} />)
    
    expect(screen.getByLabelText('Name (Optional):')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter your name...')).toBeInTheDocument()
  })

  it('displays the current name value', () => {
    const mockOnChange = vi.fn()
    render(<NameInput name="John Doe" onNameChange={mockOnChange} disabled={false} />)
    
    const input = screen.getByLabelText('Name (Optional):')
    expect(input).toHaveValue('John Doe')
  })

  it('calls onNameChange when user types', () => {
    const mockOnChange = vi.fn()
    render(<NameInput name="" onNameChange={mockOnChange} disabled={false} />)
    
    const input = screen.getByLabelText('Name (Optional):')
    fireEvent.change(input, { target: { value: 'Jane Smith' } })
    
    expect(mockOnChange).toHaveBeenCalledWith('Jane Smith')
  })

  it('disables input when disabled prop is true', () => {
    const mockOnChange = vi.fn()
    render(<NameInput name="" onNameChange={mockOnChange} disabled={true} />)
    
    const input = screen.getByLabelText('Name (Optional):')
    expect(input).toBeDisabled()
  })

  it('has correct aria-label', () => {
    const mockOnChange = vi.fn()
    render(<NameInput name="" onNameChange={mockOnChange} disabled={false} />)
    
    const input = screen.getByLabelText('Your name (optional)')
    expect(input).toBeInTheDocument()
  })
})
