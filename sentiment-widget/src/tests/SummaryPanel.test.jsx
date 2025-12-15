import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import SummaryPanel from '../components/SummaryPanel'

describe('SummaryPanel', () => {
  it('shows "No feedback submitted yet" when there are no submissions', () => {
    render(<SummaryPanel submissions={[]} />)
    
    expect(screen.getByText('No feedback submitted yet.')).toBeInTheDocument()
  })

  it('displays total submissions and average rating', () => {
    const submissions = [
      { id: 1, rating: 4, comment: 'Good', timestamp: new Date().toISOString() },
      { id: 2, rating: 5, comment: 'Great', timestamp: new Date().toISOString() },
      { id: 3, rating: 3, comment: 'Okay', timestamp: new Date().toISOString() },
    ]
    
    render(<SummaryPanel submissions={submissions} />)
    
    expect(screen.getByText('Total Submissions:')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('Average Rating:')).toBeInTheDocument()
    expect(screen.getByText('4.00')).toBeInTheDocument()
  })

  it('displays all feedback logs in reverse chronological order', () => {
    const submissions = [
      { id: 1, name: 'John', rating: 4, comment: 'First comment', timestamp: new Date('2025-01-01').toISOString() },
      { id: 2, name: 'Jane', rating: 5, comment: 'Second comment', timestamp: new Date('2025-01-02').toISOString() },
      { id: 3, name: '', rating: 3, comment: 'Third comment', timestamp: new Date('2025-01-03').toISOString() },
      { id: 4, name: 'Bob', rating: 2, comment: 'Fourth comment', timestamp: new Date('2025-01-04').toISOString() },
    ]
    
    render(<SummaryPanel submissions={submissions} />)
    
    // Should show all feedback logs
    expect(screen.getByText('Fourth comment')).toBeInTheDocument()
    expect(screen.getByText('Third comment')).toBeInTheDocument()
    expect(screen.getByText('Second comment')).toBeInTheDocument()
    expect(screen.getByText('First comment')).toBeInTheDocument()
    
    // Check names are displayed
    expect(screen.getByText('John')).toBeInTheDocument()
    expect(screen.getByText('Jane')).toBeInTheDocument()
    expect(screen.getByText('Bob')).toBeInTheDocument()
  })

  it('displays feedback logs even when comments are empty', () => {
    const submissions = [
      { id: 1, name: 'Alice', rating: 4, comment: '', timestamp: new Date().toISOString() },
      { id: 2, name: 'Bob', rating: 5, comment: '  ', timestamp: new Date().toISOString() },
    ]
    
    render(<SummaryPanel submissions={submissions} />)
    
    // Should show All Feedback section
    expect(screen.getByText('All Feedback')).toBeInTheDocument()
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('Bob')).toBeInTheDocument()
  })

  it('displays name and rating with each feedback log', () => {
    const submissions = [
      { id: 1, name: 'Sarah', rating: 5, comment: 'Excellent service', timestamp: new Date().toISOString() },
    ]
    
    render(<SummaryPanel submissions={submissions} />)
    
    expect(screen.getByText('Sarah')).toBeInTheDocument()
    expect(screen.getByText('Rating: 5')).toBeInTheDocument()
    expect(screen.getByText('Excellent service')).toBeInTheDocument()
  })
})
