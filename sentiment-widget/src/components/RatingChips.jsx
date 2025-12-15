import React from 'react'

function RatingChips({ selectedRating, onRatingChange, disabled }) {
  const ratings = [1, 2, 3, 4, 5]

  return (
    <div className="rating-chips">
      <label className="rating-label">Rating:</label>
      <div className="chips-container">
        {ratings.map((rating) => (
          <button
            key={rating}
            type="button"
            className={`rating-chip ${selectedRating === rating ? 'selected' : ''}`}
            onClick={() => onRatingChange(rating)}
            disabled={disabled}
            aria-label={`Rating ${rating}`}
            aria-pressed={selectedRating === rating}
          >
            {rating}
          </button>
        ))}
      </div>
    </div>
  )
}

export default RatingChips
