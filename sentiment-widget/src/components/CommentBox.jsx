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
        onChange={(e) => onCommentChange(e.target.value)}
        disabled={disabled}
        placeholder="Enter your feedback here..."
        rows="4"
        aria-label="Feedback comment"
      />
    </div>
  )
}

export default CommentBox
