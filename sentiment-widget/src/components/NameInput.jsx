// NameInput component - optional text input for user's name
import React from 'react'

function NameInput({ name, onNameChange, disabled }) {
  return (
    <div className="name-input">
      <label htmlFor="name-input" className="name-label">
        Name (Optional):
      </label>
      <input
        type="text"
        id="name-input"
        className="name-field"
        value={name}
        onChange={(e) => onNameChange(e.target.value)} // Update parent state on input change
        disabled={disabled} // Disable during form submission
        placeholder="Enter your name..."
        aria-label="Your name (optional)" // Accessibility label
      />
    </div>
  )
}

export default NameInput
