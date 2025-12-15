// CommentBox component - multi-line textarea for user feedback
import React from 'react'

function CommentBox({ comment, onCommentChange, disabled }) {
  return (
    <div className="comment-box">
      <label htmlFor="comment-textarea" className="comment-label">
        Comment:
      </label>
      <textarea
        id="comment-textarea"
        className="comment-textarea"
        value={comment}
        onChange={(e) => onCommentChange(e.target.value)} // Update parent state on text change
        disabled={disabled} // Disable during form submission
        placeholder="Enter your feedback here..."
        rows="4" // Sets initial height to 4 rows
        aria-label="Feedback comment" // Accessibility label
      />
    </div>
  )
}

export default CommentBox
