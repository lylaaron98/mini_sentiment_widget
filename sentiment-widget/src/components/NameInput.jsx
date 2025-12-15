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
        onChange={(e) => onNameChange(e.target.value)}
        disabled={disabled}
        placeholder="Enter your name..."
        aria-label="Your name (optional)"
      />
    </div>
  )
}

export default NameInput
