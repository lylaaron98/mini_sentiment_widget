// RatingChips component - displays clickable rating buttons (1-5)
import React from 'react'

function RatingChips({ selectedRating, onRatingChange, disabled }) {
  // Array of rating values (1 to 5)
  const ratings = [1, 2, 3, 4, 5]

  return (
    <div className="rating-chips">
      <label className="rating-label">Rating:</label>
      <div className="chips-container">
        {/* Map through ratings to create individual clickable chips */}
        {ratings.map((rating) => (
          <button
            key={rating}
            type="button"
            // Apply 'selected' class to visually highlight the chosen rating
            className={`rating-chip ${selectedRating === rating ? 'selected' : ''}`}
            onClick={() => onRatingChange(rating)}
            disabled={disabled} // Disable during form submission
            aria-label={`Rating ${rating}`} // Accessibility label for screen readers
            aria-pressed={selectedRating === rating} // Indicates pressed state for accessibility
          >
            {rating}
          </button>
        ))}
      </div>
    </div>
  )
}

export default RatingChips
