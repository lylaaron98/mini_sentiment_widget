import React from 'react'

function SummaryPanel({ submissions }) {
  if (submissions.length === 0) {
    return (
      <div className="summary-panel">
        <h2>Feedback Summary</h2>
        <p className="no-data">No feedback submitted yet.</p>
      </div>
    )
  }

  const totalSubmissions = submissions.length
  const averageRating = (
    submissions.reduce((sum, sub) => sum + sub.rating, 0) / totalSubmissions
  ).toFixed(2)

  return (
    <div className="summary-panel">
      <h2>Feedback Summary</h2>
      
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

      <div className="feedback-logs">
        <h3>All Feedback</h3>
        <ul className="logs-list">
          {submissions.slice().reverse().map((submission) => (
            <li key={submission.id} className="log-item">
              <div className="log-header">
                <span className="log-name">
                  {submission.name || 'Anonymous'}
                </span>
                <span className="log-rating">Rating: {submission.rating}</span>
              </div>
              {submission.comment && (
                <p className="log-comment">{submission.comment}</p>
              )}
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
