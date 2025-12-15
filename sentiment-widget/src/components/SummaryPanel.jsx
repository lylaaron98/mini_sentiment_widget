// SummaryPanel component - displays feedback statistics and all submission logs
import React from 'react'

function SummaryPanel({ submissions }) {
  // Show empty state message when no feedback has been submitted
  if (submissions.length === 0) {
    return (
      <div className="summary-panel">
        <h2>Feedback Summary</h2>
        <p className="no-data">No feedback submitted yet.</p>
      </div>
    )
  }

  // Calculate statistics from submissions
  const totalSubmissions = submissions.length
  // Calculate average rating: sum all ratings and divide by total count, rounded to 2 decimals
  const averageRating = (
    submissions.reduce((sum, sub) => sum + sub.rating, 0) / totalSubmissions
  ).toFixed(2)

  return (
    <div className="summary-panel">
      <h2>Feedback Summary</h2>
      
      {/* Statistics section - displays total count and average rating */}
      <div className="summary-stats">
        <div className="stat-item">
          <span className="stat-label">Total Submissions:</span>
          <span className="stat-value">{totalSubmissions}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Average Rating:</span>
          <span className="stat-value">{averageRating}</span>
        </div>
      </div>

      {/* Feedback logs section - displays all submitted feedback in reverse chronological order */}
      <div className="feedback-logs">
        <h3>All Feedback</h3>
        <ul className="logs-list">
          {/* Reverse array to show most recent submissions first, without mutating original */}
          {submissions.slice().reverse().map((submission) => (
            <li key={submission.id} className="log-item">
              <div className="log-header">
                {/* Display name or 'Anonymous' if name is empty */}
                <span className="log-name">
                  {submission.name || 'Anonymous'}
                </span>
                <span className="log-rating">Rating: {submission.rating}</span>
              </div>
              {/* Only show comment if it exists */}
              {submission.comment && (
                <p className="log-comment">{submission.comment}</p>
              )}
              {/* Format timestamp as locale-specific date and time */}
              <span className="log-date">
                {new Date(submission.timestamp).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SummaryPanel
