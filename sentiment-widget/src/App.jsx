// Main App component - manages the sentiment widget's state and layout
import React, { useState } from 'react'
import RatingChips from './components/RatingChips'
import CommentBox from './components/CommentBox'
import SubmitButton from './components/SubmitButton'
import SummaryPanel from './components/SummaryPanel'
import NameInput from './components/NameInput'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'

function App() {
  // State management for the feedback form
  const [selectedRating, setSelectedRating] = useState(null) // Currently selected rating (1-5)
  const [comment, setComment] = useState('') // User's feedback comment
  const [name, setName] = useState('') // Optional user name
  const [submissions, setSubmissions] = useState([]) // Array of all submitted feedback
  const [isSubmitting, setIsSubmitting] = useState(false) // Controls form disabled state during submission
  const [showConfirmation, setShowConfirmation] = useState(false) // Shows success message after submission
  const [validationError, setValidationError] = useState('') // Displays validation error messages
  const [isDarkMode, setIsDarkMode] = useState(false) // Toggles between light and dark theme

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault() // Prevent default form submission behavior
    setValidationError('') // Clear any previous validation errors

    // Validate that a rating has been selected
    if (selectedRating === null) {
      setValidationError('Please select a rating before submitting.')
      return
    }

    // Create new submission object with all form data
    const newSubmission = {
      id: Date.now(), // Unique identifier using timestamp
      name: name.trim(), // Remove whitespace from name
      rating: selectedRating,
      comment: comment.trim(), // Remove whitespace from comment
      timestamp: new Date().toISOString() // ISO format timestamp for consistent date handling
    }

    // Add new submission to the submissions array
    setSubmissions([...submissions, newSubmission])

    // Show confirmation message and disable form for 3 seconds
    setShowConfirmation(true)
    setIsSubmitting(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitting(false)
      setShowConfirmation(false)
      setSelectedRating(null)
      setComment('')
      setName('')
    }, 3000)
  }

  // Toggle between light and dark theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="container">
        {/* Header with app title and theme toggle button */}
        <header className="app-header">
          <h1>Sentiment Widget</h1>
          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
          >
            {/* Display sun icon in dark mode, moon icon in light mode */}
            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </button>
        </header>

        <div className="content">
          {/* Left side: Feedback submission form */}
          <div className="feedback-form">
            <h2>Submit Your Feedback</h2>
            
            {/* Success confirmation message (shown for 3 seconds after submission) */}
            {showConfirmation && (
              <div className="confirmation-message" role="alert">
                ✓ Thank you for your feedback!
              </div>
            )}

            {/* Validation error message (shown when rating is not selected) */}
            {validationError && (
              <div className="validation-error" role="alert">
                {validationError}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Name input field (optional) */}
              <NameInput
                name={name}
                onNameChange={setName}
                disabled={isSubmitting}
              />

              {/* Rating selection chips (1-5) */}
              <RatingChips
                selectedRating={selectedRating}
                onRatingChange={setSelectedRating}
                disabled={isSubmitting}
              />

              {/* Comment textarea */}
              <CommentBox
                comment={comment}
                onCommentChange={setComment}
                disabled={isSubmitting}
              />

              {/* Submit button */}
              <SubmitButton
                onClick={handleSubmit}
                disabled={isSubmitting}
              />
            </form>
          </div>

          {/* Right side: Summary statistics and feedback logs */}
          <SummaryPanel submissions={submissions} />
        </div>
      </div>
    </div>
  )
}

export default App
