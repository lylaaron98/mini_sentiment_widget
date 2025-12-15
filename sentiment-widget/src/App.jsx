import React, { useState } from 'react'
import RatingChips from './components/RatingChips'
import CommentBox from './components/CommentBox'
import SubmitButton from './components/SubmitButton'
import SummaryPanel from './components/SummaryPanel'
import NameInput from './components/NameInput'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'

function App() {
  const [selectedRating, setSelectedRating] = useState(null)
  const [comment, setComment] = useState('')
  const [name, setName] = useState('')
  const [submissions, setSubmissions] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [validationError, setValidationError] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setValidationError('')

    // Validate that a rating has been selected
    if (selectedRating === null) {
      setValidationError('Please select a rating before submitting.')
      return
    }

    // Create new submission
    const newSubmission = {
      id: Date.now(),
      name: name.trim(),
      rating: selectedRating,
      comment: comment.trim(),
      timestamp: new Date().toISOString()
    }

    // Add to submissions
    setSubmissions([...submissions, newSubmission])

    // Show confirmation and disable for 3 seconds
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

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="container">
        <header className="app-header">
          <h1>Sentiment Widget</h1>
          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
          >
            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </button>
        </header>

        <div className="content">
          <div className="feedback-form">
            <h2>Submit Your Feedback</h2>
            
            {showConfirmation && (
              <div className="confirmation-message" role="alert">
                ✓ Thank you for your feedback!
              </div>
            )}

            {validationError && (
              <div className="validation-error" role="alert">
                {validationError}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <NameInput
                name={name}
                onNameChange={setName}
                disabled={isSubmitting}
              />

              <RatingChips
                selectedRating={selectedRating}
                onRatingChange={setSelectedRating}
                disabled={isSubmitting}
              />

              <CommentBox
                comment={comment}
                onCommentChange={setComment}
                disabled={isSubmitting}
              />

              <SubmitButton
                onClick={handleSubmit}
                disabled={isSubmitting}
              />
            </form>
          </div>

          <SummaryPanel submissions={submissions} />
        </div>
      </div>
    </div>
  )
}

export default App
