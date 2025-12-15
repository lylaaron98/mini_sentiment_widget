import React from 'react'

function SubmitButton({ onClick, disabled }) {
  return (
    <button
      type="submit"
      className="submit-button"
      onClick={onClick}
      disabled={disabled}
    >
      {disabled ? 'Submitting...' : 'Submit Feedback'}
    </button>
  )
}

export default SubmitButton
