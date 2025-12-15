// SubmitButton component - form submission button with dynamic text
import React from 'react'

function SubmitButton({ onClick, disabled }) {
  return (
    <button
      type="submit"
      className="submit-button"
      onClick={onClick}
      disabled={disabled} // Disable button during form submission
    >
      {/* Change button text to 'Submitting...' when disabled */}
      {disabled ? 'Submitting...' : 'Submit Feedback'}
    </button>
  )
}

export default SubmitButton
